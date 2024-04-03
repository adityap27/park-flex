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
 * This method queries database to insert all information required for booking including listing and owner information.
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

      // Check if the listing exists.
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
    
        // If any exisiting booking for the same date, not allowed to book for the same date
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
    
        // Updating transactions: credit owner and debit seeker.
        await addMoneyToOwner(ownerId, bookingPrice);
        await deductMoneyFromSeeker(seekerId, bookingPrice);

        // Save the new booking to the database.
        const savedBooking = await newBooking.save();
    
        // Return the saved booking.
        res.status(201).json(savedBooking);
        
      } catch (error) {
        // Handling any errors.
        res.status(400).json({ message: "Error creating booking", error });
      }
};


/**
 * Get all bookings information, including listing and user information.
 * @param req
 * @param res
 */
export const getAllBookings = async (req: Request, res: Response) => {
    try {

      // Get all bookings from the bookings database.
        const bookings = await Booking.find({});

        // All Bookings info as json
        res.status(200).json(bookings);
      } catch (error) {
        // Handling any errors.
        res.status(500).json({ message: "Error retrieving bookings", error });
      }
};

/**
 * Get all bookings information of a particular user.
 * @param req
 * @param res
 */
export const getBookingByUserId = async (req: Request, res: Response) => {

  // Extracts user ID from URL parameters.
    const { userId } = req.params;

    try {
      // Get bookings where the 'seekerId' matches the 'userId'.
      const userBookings = await Booking.find({ seekerId: userId });

      // If no bookings are found, returns an empty array.
      if (userBookings.length === 0) {
        return res.status(200).json([]);
      }

      // Success
      res.status(200).json(userBookings);

      // Handling any errors.
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

  // Extracting the booking ID from the request parameters
    const { id } = req.params;
    try {

      // Updates booking with given data, return updated data.
      const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      // Checks if booking exists.
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

    // Returns updated booking.
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

  // Extracting the booking ID from the request parameters
    const { id } = req.params;
    try {

      // Check for presence of booking with given Id
      const deletedBooking = await Booking.findByIdAndDelete(id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Confirms booking deletion.
      res.status(204).json({ message: "Booking deleted" });
    } catch (error) {

      // Handling any errors.
      res.status(400).json({ message: "Error deleting booking", error });
    }
};