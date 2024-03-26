import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

export const Users = mongoose.model<IUser>("User", UsersSchema);
export {IUser};
