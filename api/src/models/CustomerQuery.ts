import mongoose, { Schema, Document } from "mongoose";

interface ICustomerQuery extends Document {
  name: String;
  email: String;
  message: String;
  isComplete: boolean;
}

const CustomerQuerySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CustomerQuery = mongoose.model<ICustomerQuery>(
  "CustomerQuery",
  CustomerQuerySchema
);
