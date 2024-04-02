import mongoose from "mongoose";
import { Users } from "../models/User";
import { Listing } from "../models/Listing";
import { Review } from "../models/Review";
import { Wallet } from "../models/Wallet";
import Transaction from "../models/Transaction";
import Booking from "../models/Bookings";
import { Wishlist } from "../models/WishList";
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOSTNAME}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority&appName=WebGroupProject`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const dataBase = {
  listings: Listing,
  users: Users,
  reviews: Review,
  wallets: Wallet,
  transactions: Transaction,
  bookings: Booking,
  wishlists: Wishlist
};

export { dataBase };
