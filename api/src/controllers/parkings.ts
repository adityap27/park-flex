/**
 * Author : Ketul Patel
 */
import { Request, Response } from "express";
import { dataBase } from "../dao/connection";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authenticateToken";

/**
 * This method queries database to find all available parking spots and give it as a response.
 * @param req
 * @param res
 */
export const getAllParkingSpot = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: await dataBase.listings
        .find()
        .populate({
          path: "owner",
          select: "-password -__v",
        })
        .select("-createdAt -updatedAt -__v")
        .exec(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "System not able to fetch listings",
    });
  }
};

/**
 * This method finds a particular parking spot based on given id with it's existing booking dates, reviews and wish list details.
 * @param req
 * @param res
 */
export const getParkingSpotById = async (req: AuthRequest, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let userId = undefined;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (user) {
        // @ts-ignore
        userId = user._id;
      }
    });
  }

  let parkingSpot = await dataBase.listings
    .findOne({
      _id: req.params.id,
    })
    .populate({
      path: "owner",
      select: "-password -__v",
    })
    .select("-createdAt -updatedAt -__v")
    .exec();

  const totalReviews = await dataBase.reviews.countDocuments({
    listing: req.params.id,
  });

  const sum = await dataBase.reviews
    .find({
      listing: req.params.id,
    })
    .select("rating")
    .exec();

  let totalRating = 0;
  sum !== undefined &&
    sum.length > 0 &&
    sum.forEach((item) => (totalRating += item.rating));

  const existingBookings = await dataBase.bookings
    .find({
      listingId: req.params.id,
    })
    .select("startDate endDate")
    .exec();

  let isWishListed = false;
  if (userId) {
    const result = await dataBase.wishlists.findOne({
      user: userId,
      listing: req.params.id,
    });
    if (result) {
      isWishListed = true;
    }
  }

  try {
    res.status(200).json({
      success: true,
      data: {
        parkingSpot: parkingSpot,
        totalReviews: totalReviews,
        reviewAverage: totalReviews !== 0 ? totalRating / totalReviews : 0,
        existingBookings: existingBookings,
        isWishListed: isWishListed,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "System not able to fetch details",
    });
  }
};
