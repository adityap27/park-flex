import express, { Request, Response } from "express";
import { dataBase } from "../dao/connection";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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
});

router.get("/:id", async (req: Request, res: Response) => {
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

  try {
    res.status(200).json({
      success: true,
      data: {
        parkingSpot: parkingSpot,
        totalReviews: totalReviews,
        reviewAverage: totalReviews !== 0 ? totalRating / totalReviews : 0,
        existingBookings: existingBookings,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "System not able to fetch details",
    });
  }
});

export default router;
