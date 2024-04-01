/**
 * Author: Aditya Purohit
 */
import { Request, Response } from "express";
import { dataBase } from "../dao/connection";
import { AuthRequest } from "../middleware/authenticateToken";

/**
 * Get all reviews of a particular listing, with listing and owner information.
 */
export const getReviewsByListingId = async (req: Request, res: Response) => {
  try {
    // Extract listing ID from request.
    const listingId = req.params.listingId;
    if (!listingId) {
      return res.status(400).json({ error: "Listing ID is required" });
    }

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
    res.status(500).json({ error: "Something went wrong." });
  }
};

/**
 * Add a review for a listing if satisfies below criteria.
 * Criteria:
 * - not owner of this listing
 * - had a booking
 * - only 1 review per user per listing.
 */
export const addReviewForListing = async (req: AuthRequest, res: Response) => {
  try {

    // Get the userId from JWT payload
    const userId = req.user._id;

    // Validate Inputs.
    const listingId = req.params.listingId;
    const { rating, description } = req.body;
    if (!listingId) {
      return res.status(400).json({ error: "Listing ID is required." });
    }
    if (!rating || !description) {
      return res
        .status(400)
        .json({ error: "rating and description both are required." });
    }
    if (typeof rating != "number") {
      return res.status(400).json({ error: "rating should be a number." });
    }
    if (!(rating <= 5 && rating >= 1)) {
      return res
        .status(400)
        .json({ error: "rating should be a number between 1 and 5." });
    }
    if (typeof description != "string") {
      return res.status(400).json({ error: "description should be a string." });
    }
    if (description.length < 5) {
      return res.status(400).json({ error: "description should atleast contain 5 characters." });
    }

    // Check if the user is not the owner of the listing
    const listing = await dataBase.listings.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: `Listing ${listingId} not found.` });
    }
    if (listing.owner.toString() === userId) {
      return res
        .status(400)
        .json({ error: "Owners cannot review their own listing." });
    }

    // Check if the user had a booking
    const booking = await dataBase.bookings.findOne({
      listingId,
      seekerId: userId,
    });
    if (!booking) {
      return res
        .status(400)
        .json({
          error:
            "To add your own review, you need a previous booking with this parking spot.",
        });
    }

    // Check if the user has not already reviewed this listing
    const existingReview = await dataBase.reviews.findOne({
      listing: listingId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({
          error: "You have already reviewed this parking spot listing.",
        });
    }

    // Create and save review in database.
    const newReview = new dataBase.reviews({
      listing: req.params.listingId,
      user: userId,
      rating: req.body.rating,
      description: req.body.description,
    });
    await newReview.save();
    res.status(200).json({ message: "Review added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." + error });
  }
};
