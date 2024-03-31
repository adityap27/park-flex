import express, { Request, Response } from "express";
import manageListings from "./manage-listings";
import parkingListings from "./parking-listings";
import manageBookings from './manage-bookings';
import authRoutes from './authRoutes';
import reviewRoutes from './reviews';
import manageWishlists from './manage-wishlists';

const router = express.Router();

router.use("/manage-listings", manageListings);
router.use('/manage-bookings', manageBookings);
router.use("/parking-listings", parkingListings);
router.use('/auth', authRoutes);
router.use('/listings/:listingId/reviews', reviewRoutes);
router.use('/manage-wishlists', manageWishlists);

export default router;