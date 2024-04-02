/**
 * Author: Neel Patel
 *
 * This file declares all routes required for manage bookings like Add, Update, Delete, Get all and Get by Id Bookings
 */
import express from "express";
import { addBooking, getAllBookings, getBookingByUserId, editBookingById, deleteBookingById  } from "../controllers/manageBooking";

const router = express.Router();

router.post("/add-booking", addBooking);
router.get("/bookings", getAllBookings);
router.get("/bookings/user/:userId", getBookingByUserId);
router.put("/bookings/:id", editBookingById);
router.delete("/bookings/:id", deleteBookingById);

export default router;