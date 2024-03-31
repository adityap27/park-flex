import mongoose from "mongoose";

interface IWishlist extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  listing: mongoose.Types.ObjectId;
}

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing"
    }
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export { IWishlist };
