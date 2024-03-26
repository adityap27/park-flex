import express, { Request, Response } from "express";
import manageListings from "./manage-listings";
import parkingListings from "./parking-listings";

const router = express.Router();

router.use("/manage-listings", manageListings);
router.use("/parking-listings", parkingListings);

export default router;
