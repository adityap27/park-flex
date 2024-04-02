import express, { Request, Response } from "express";
import { dataBase } from "../dao/connection";
import { authenticateToken } from "../middleware/authenticateToken";
const router = express.Router();

router.post("/add", authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.body.userId || !req.body.listingId) {
      res
        .status(400)
        .json({ success: false, message: "User ID or Listing ID missing" });
      return;
    }

    const newWishlist = new dataBase.wishlists({
      user: req.body.userId,
      listing: req.body.listingId,
    });

    await newWishlist.save();
    res
      .status(201)
      .json({ success: true, message: "Wishlist created successfully" });
  } catch (error) {
    console.error("Error creating wishlist: ", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to create wishlist" });
  }
});

router.get(
  "/get-all",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.query.userId) {
        res.status(400).json({ success: false, message: "User ID missing" });
        return;
      }

      const wishlists = await dataBase.wishlists.find({
        user: req.query.userId,
      });
      let wishlistData: any = [];
      for (const wishlist of wishlists) {
        let data = await dataBase.listings.findOne({ _id: wishlist.listing });
        wishlistData.push(data);
      }
      res.status(201).json({
        success: true,
        message: "Wishlists fetched successfully",
        data: wishlistData,
      });
    } catch (error) {
      console.error("Error fetching wishlists: ", error);
      res
        .status(500)
        .json({ success: true, message: "Failed to fetch wishlists" });
    }
  }
);

router.post(
  "/delete",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.body.userId || !req.body.listingId) {
        res
          .status(400)
          .json({ success: false, message: "User ID or Listing ID missing" });
        return;
      }

      await dataBase.wishlists.deleteOne({
        user: req.body.userId,
        listing: req.body.listingId,
      });
      res
        .status(201)
        .json({ success: true, message: "Wishlist deleted successfully" });
    } catch (error) {
      console.error("Error deleting wishlist: ", error);
      res
        .status(500)
        .json({ success: true, message: "Failed to delete wishlist" });
    }
  }
);

export default router;
