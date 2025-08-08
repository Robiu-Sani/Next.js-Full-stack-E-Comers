import { ICustomer } from "@/interface/customer.interface";
import mongoose, { Schema, Model } from "mongoose";

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, trim: true },
    username: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    number: { type: String, trim: true },
    dateOfBirth: { type: Date },

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
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    isDeleted: { type: Boolean, default: false },
    bio: { type: String },
    referralCode: { type: String },
    loyaltyPoints: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const CustomerModel: Model<ICustomer> =
  mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", customerSchema);

export default CustomerModel;
