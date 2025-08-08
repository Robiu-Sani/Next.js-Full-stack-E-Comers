import { IManagement } from "@/interface/menagement.interface";
import { Schema, model, models } from "mongoose";

const ManagementSchema: Schema = new Schema<IManagement>(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    number: { type: String },
    dateOfBirth: { type: Date },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    contacts: [
      {
        contactName: { type: String, required: true },
        contact: { type: String, required: true },
      },
    ],
    address: [
      {
        addressName: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        addressLine: { type: String, required: true },
      },
    ],
    image: { type: String },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    bio: { type: String },
    referralCode: { type: String },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Management =
  models.Management || model<IManagement>("Management", ManagementSchema);

export default Management;
