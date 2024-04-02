/**
 * Author : Neel Patel
 */
import { Request, Response } from "express";
import Booking from "../models/Bookings";
import { Listing } from "../models/Listing";
import {
  addMoneyToOwner,
  deductMoneyFromSeeker,
} from "../controllers/walletController";

/**
 * This method queries database to insert all information required for booking with listing and owner information.
 * @param req
 * @param res
 */
export const addBooking = async (req: Request, res: Response) => {
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
    
        await addMoneyToOwner(ownerId, bookingPrice);
        await deductMoneyFromSeeker(seekerId, bookingPrice);
        const savedBooking = await newBooking.save();
    
        res.status(201).json(savedBooking);
        
      } catch (error) {
        res.status(400).json({ message: "Error creating booking", error });
      }
};


/**
 * Get all bookings information, with listing and user information.
 * @param req
 * @param res
 */
export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving bookings", error });
      }
};

/**
 * Get all bookings information of a particular user.
 * @param req
 * @param res
 */
export const getBookingByUserId = async (req: Request, res: Response) => {
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
};

/**
 * This method queries database to update exisiting booking.
 *  * Criteria:
 * - had a booking
 * @param req
 * @param res
 */
export const editBookingById = async (req: Request, res: Response) => {
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
};

/**
 * This method queries database to delete particular booking.
 * @param req
 * @param res
 */
export const deleteBookingById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

      // Check for presence of booking id in request body
      const deletedBooking = await Booking.findByIdAndDelete(id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(204).json({ message: "Booking deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting booking", error });
    }
};