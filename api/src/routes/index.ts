import express, { Request, Response } from "express";
import manageListings from "./manage-listings";
import parkingListings from "./parking-listings";
import manageBookings from './manage-bookings';
import authRoutes from './authRoutes';

const router = express.Router();

router.use("/manage-listings", manageListings);
router.use('/manage-bookings', manageBookings);
router.use("/parking-listings", parkingListings);
router.use('/auth', authRoutes);
export default router;

