import { ObjectId } from "mongoose";

export interface IOrder {
  user?: ObjectId;
  products: ObjectId[];
  address: {
    addressName: string;
    district: string;
    city: string;
    thana?: string;
    addressLine: string;
    phoneNumber: string;
  };
  paymentMethod: "cash-on-delevery" | "online-payment" | "bank-transfer";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  transactionId?: string;
  paymentDate?: Date;
  deliveryMethod: "steadFast" | "pathao" | "Paperfly" | "eCourier";
  deliveryCharge: number;
  deliveryStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "in-transit"
    | "delivered"
    | "cancelled"
    | "returned";
  trackingId?: string;
  expectedDeliveryDate?: Date;
  deliveredAt?: Date;
  subtotal: number;
  total: number;
  discount?: number;
  couponCode?: string;
  isCancelled?: boolean;
  cancellationReason?: string;
  notes?: string;
  isDeleted?: boolean;
}
