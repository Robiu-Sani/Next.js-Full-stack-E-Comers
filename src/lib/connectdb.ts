/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.NEXT_PUBLIC_MONGODBURI as string;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected.");
      return;
    }
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message || error);
  } finally {
    console.log("🔄 Connection attempt complete");
  }
};

export default connectDb;
