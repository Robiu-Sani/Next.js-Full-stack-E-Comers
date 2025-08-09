/* eslint-disable @typescript-eslint/no-explicit-any */
import { Iuser } from "@/interface/user.interface";
import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Define schema
const userSchema: Schema<Iuser> = new Schema<Iuser>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    number: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.isSocial; // required only if NOT social user
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "menager", "super-admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isSocial: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    activationExpiresAt: {
      type: Date,
      default: undefined,
      index: { expireAfterSeconds: 0 }, // TTL index to delete after expiry
    },
  },
  {
    timestamps: true,
  }
);

// 2. Hash password before saving, only if modified and password is provided
userSchema.pre("save", async function (next) {
  const user = this as any;

  if (!user.isModified("password")) {
    return next();
  }

  if (!user.password) {
    // No password to hash (social login user)
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

const UserModel: Model<Iuser> =
  mongoose.models.User || mongoose.model<Iuser>("User", userSchema);

export default UserModel;
