import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
  identifier: string;
  code: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    identifier: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Otp || mongoose.model<IOtp>("Otp", otpSchema);
