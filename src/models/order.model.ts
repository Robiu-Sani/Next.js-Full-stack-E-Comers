import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "@/interface/order.interface";

// Helper function for orderId generation
function generateOrderId(): string {
  const date = new Date();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${random}`;
}

// Define schema
const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
      default: generateOrderId,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash-on-delivery", "bkash", "nagad", "rocket", "card"],
      default: "cash-on-delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    trackingId: {
      type: String,
    },
    note: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically calculate grandTotal before saving
orderSchema.pre("save", function (next) {
  this.grandTotal = this.totalAmount + this.deliveryCharge - (this.discount || 0);
  next();
});

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
