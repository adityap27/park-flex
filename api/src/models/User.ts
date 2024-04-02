/* Author: Jay Rana */
import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// User interface extending Mongoose Document for type support
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

// User schema definition with field validations and settings
const UsersSchema: Schema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  resetToken: String,
  resetTokenExpiry: Number,
});

// Pre-save hook for password hashing on new or modified passwords
UsersSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password hasn't changed

  // Hash new or modified passwords before saving
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});


export const Users = mongoose.model<IUser>('User', UsersSchema);
