/**
 * Author: Mann Patel 
 * Defines the schema and model for transactions in the database.
 */

import mongoose from "mongoose";

interface ITransaction extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: string;
  bookingId?: mongoose.Types.ObjectId; 
  createdAt: Date;
}

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['top-up', 'withdrawal', 'earning', 'payment'],
    required: true,
  },
  bookingId: {
    type: mongoose.Types.ObjectId,
    ref: "Booking",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
