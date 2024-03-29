import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  listingId: mongoose.Types.ObjectId;
  seekerId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  vehicleType: string;
  specialRequests?: string;
  bookingPrice: number;
}

const BookingSchema: Schema = new Schema(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    seekerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      required: false,
    },
    bookingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
