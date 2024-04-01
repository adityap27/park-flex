import express from "express";
import Booking from "../models/Bookings";
import { Listing } from "../models/Listing";
import {
  addMoneyToOwner,
  deductMoneyFromSeeker,
} from "../controllers/walletController";

const router = express.Router();

// POST for confirm a booking
router.post("/add-booking", async (req, res) => {
  const {
    listingId,
    seekerId,
    startDate,
    endDate,
    vehicleType,
    specialRequests,
    bookingPrice,
  } = req.body;
  const listing = await Listing.findById(listingId);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  const ownerId = listing.owner;
  // Convert startDate and endDate to Date objects to ensure correct comparison
  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    // Check for existing bookings with overlapping dates for the same listing
    const existingBooking = await Booking.findOne({
      listingId,
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
        { startDate: { $gte: start, $lte: end } },
        { endDate: { $gte: start, $lte: end } },
      ],
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({
          message:
            "This listing is already booked for the selected dates. Please select different dates.",
        });
    }

    const newBooking = new Booking({
      listingId,
      seekerId,
      startDate: start,
      endDate: end,
      vehicleType,
      specialRequests,
      bookingPrice,
    });
    const savedBooking = await newBooking.save();

    
    res.status(201).json(savedBooking);
    await addMoneyToOwner(ownerId, bookingPrice);
    await deductMoneyFromSeeker(seekerId, bookingPrice);

  } catch (error) {
    res.status(400).json({ message: "Error creating booking", error });
  }
});

// GET for Retrieve all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookings", error });
  }
});

//GET for retriving all booking for logged-In
router.get("/bookings/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userBookings = await Booking.find({ seekerId: userId });
    if (userBookings.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(userBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user's bookings", error });
  }
});

// PUT for Update a booking
router.put("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: "Error updating booking", error });
  }
});

// DELETE for Delete a booking
router.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(204).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting booking", error });
  }
});

export default router;
