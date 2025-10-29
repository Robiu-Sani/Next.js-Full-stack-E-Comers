export interface IOrder {
  orderId: string; // Auto-generated unique order ID (e.g., ORD-20251028-XYZ)
  name: string; // Customer name
  number: string; // Customer phone number
  address: string; // Shipping address as string
  products: string[]; // Array of product ObjectIds (as strings)
  totalAmount: number; // Total price
  deliveryCharge: number; // Delivery cost
  discount?: number; // Optional discount
  grandTotal: number; // totalAmount + deliveryCharge - discount
  paymentMethod: "cash-on-delivery" | "bkash" | "nagad" | "rocket" | "card";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  trackingId?: string; // Courier tracking number
  note?: string; // Optional order note
  isDelivered: boolean;
  isPaid: boolean;
  isDeleted:boolean;
}
