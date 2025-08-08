import { IBranch } from "@/interface/branch.interface";
import { Schema, model, models } from "mongoose";

const BranchSchema: Schema = new Schema<IBranch>(
  {
    name: { type: String, required: true },
    code: { type: String },
    manager: {
      name: { type: String },
      contact: { type: String },
      email: { type: String },
    },
    contactNumber: { type: String },
    email: { type: String },
    address: {
      district: { type: String, required: true },
      city: { type: String, required: true },
      town: { type: String },
      thana: { type: String },
      addressLine: { type: String, required: true },
      postalCode: { type: String },
    },
    openingHours: {
      open: { type: String },
      close: { type: String },
    },
    establishedAt: { type: Date },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    locationCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Branch = models.Branch || model<IBranch>("Branch", BranchSchema);

export default Branch;
