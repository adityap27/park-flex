import mongoose, { Schema, Document } from "mongoose";

// Notification interface for type support
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
