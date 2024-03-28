import mongoose from "mongoose";

interface IReview extends mongoose.Document {
  listing: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  description: string;
}

const ReviewSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
export { IReview };
