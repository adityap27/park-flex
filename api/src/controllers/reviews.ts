/**
* Author: Aditya Purohit
*/
import { Request, Response } from "express";
import { dataBase } from "../dao/connection";

/**
 * Get all reviews of a particular listing, with listing and owner information.
 */
export const getReviewsByListingId = async (req: Request, res: Response) => {
  try {
    const { listingId } = req.params;

    let listing;
    try {
      // Find the listing by ID
      listing = await dataBase.listings
        .findById(listingId)
        .populate("owner", "-password -__v");
      if (!listing) {
        return res
          .status(404)
          .json({ error: `Listing ${listingId} not found.` });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: `Unable to get listing ${listingId}.` });
    }

    // Find reviews for the listing
    const reviews = await dataBase.reviews
      .find({ listing: listingId }, "-listing -__v")
      .populate("user", "-password -__v");

    // Map through each review to find the corresponding booking and calculate duration
    const reviewsWithDuration = await Promise.all(
      reviews.map(async (review) => {
        const booking = await dataBase.bookings.findOne({
          listingId,
          seekerId: review.user,
        });
        const durationInDays = booking
          ? 1 +
            Math.ceil(
              (booking.endDate.getTime() - booking.startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : null;
        return {
          ...review.toObject(),
          durationInDays,
        };
      })
    );

    // Calculate total reviews and average ratings of this listing.
    const listingTotalReviews = reviewsWithDuration.length;
    const listingAverageRating =
      listingTotalReviews > 0
        ? reviewsWithDuration.reduce((sum, cur) => sum + cur.rating, 0) /
          listingTotalReviews
        : 0;

    // Calculate total reviews and average ratings of the owner.
    const ownerListings = await dataBase.listings.find({
      owner: listing.owner?._id,
    });
    const ownerReviews = await dataBase.reviews.find({
      listing: { $in: ownerListings.map((listing) => listing._id) },
    });
    const ownerTotalReviews = ownerReviews.length;
    const ownerAverageRating =
      ownerTotalReviews > 0
        ? ownerReviews.reduce((sum, cur) => sum + cur.rating, 0) /
          ownerTotalReviews
        : 0;

    // Combine reviews, listing and owner information in the response.
    return res.status(200).json({
      listing: {
        ...listing.toObject(),
        owner: {
          ...listing.toObject().owner,
          totalReviews: ownerTotalReviews,
          avgRating: parseFloat(ownerAverageRating.toFixed(1)),
        },
        totalReviews: listingTotalReviews,
        avgRating: parseFloat(listingAverageRating.toFixed(1)),
      },
      reviews: reviewsWithDuration,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." + error });
  }
};

/**
 * Add a review for a listing.
 */
export const addReviewForListing = async (req: Request, res: Response) => {};
