import { Schema, model, models } from "mongoose";
import { IOrder } from "@/interface/order.interface";

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    address: {
      addressName: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      thana: { type: String },
      addressLine: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["cash-on-delevery", "online-payment", "bank-transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    transactionId: { type: String },
    paymentDate: { type: Date },

    deliveryMethod: {
      type: String,
      enum: ["steadFast", "pathao", "Paperfly", "eCourier"],
      required: true,
    },
    deliveryCharge: { type: Number, required: true },
    deliveryStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "in-transit",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },
    trackingId: { type: String },
    expectedDeliveryDate: { type: Date },
    deliveredAt: { type: Date },

    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number },
    couponCode: { type: String },

    isCancelled: { type: Boolean, default: false },
    cancellationReason: { type: String },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
