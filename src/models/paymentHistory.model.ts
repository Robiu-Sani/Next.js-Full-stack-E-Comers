import { Schema, model, models } from "mongoose";
import { IPaymentHistory } from "@/interface/paymentHistory.interface";

const PaymentHistorySchema = new Schema<IPaymentHistory>(
  {
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
    notes: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
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

const PaymentHistory =
  models.PaymentHistory ||
  model<IPaymentHistory>("PaymentHistory", PaymentHistorySchema);

export default PaymentHistory;
