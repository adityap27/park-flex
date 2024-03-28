import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

const UsersSchema: Schema = new Schema({
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
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpiry: {
    type: Number,
    required: false,
  },
});

UsersSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const Users = mongoose.model<IUser>('User', UsersSchema);
