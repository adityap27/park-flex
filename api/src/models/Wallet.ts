/**
 * Author: Mann Patel 
 * Defines the schema and model for wallets in the database.
 */
import mongoose from "mongoose";

interface IWallet extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
}

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);


