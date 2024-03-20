import mongoose from "mongoose";
import { Users, IUser } from "../models/Users";
import { Listings, IListing } from "../models/Listings";

// export const getConnection = async () => {
//   return await mongoose.connect(
//     "mongodb+srv://group_user:Cy3H6QjOnrZ8XGYu@webgroupproject.dhqv6jf.mongodb.net/?retryWrites=true&w=majority&appName=WebGroupProject"
//   );
// };

mongoose.connect("mongodb+srv://group_user:Cy3H6QjOnrZ8XGYu@webgroupproject.dhqv6jf.mongodb.net/?retryWrites=true&w=majority&appName=WebGroupProject")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

const dataBase = {
  "listings": Listings,
  "users": Users 
};

export {dataBase};