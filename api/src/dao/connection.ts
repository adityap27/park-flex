import mongoose from "mongoose";
import { User } from "../models/User";
import { Listing } from "../models/Listing";

mongoose
  .connect(
    "mongodb+srv://group_user:Cy3H6QjOnrZ8XGYu@webgroupproject.dhqv6jf.mongodb.net/?retryWrites=true&w=majority&appName=WebGroupProject"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const dataBase = {
  listings: Listing,
  users: User,
};

export { dataBase };
