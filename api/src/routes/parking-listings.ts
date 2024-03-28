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
  sum.forEach((item) => (totalRating += item.rating));

  try {
    res.status(200).json({
      success: true,
      data: {
        parkingSpot: parkingSpot,
        totalReviews: totalReviews,
        reviewAverage: totalRating / totalReviews,
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
