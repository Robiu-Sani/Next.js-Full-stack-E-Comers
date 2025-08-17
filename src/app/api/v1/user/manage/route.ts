/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import UserModel from "@/models/user.model";
import OtpModel from "@/models/otp.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { sendSMS } from "@/lib/send-sms";
import jwt from "jsonwebtoken";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(request: NextRequest) {
  try {
    const signUpData = await request.json();
    const { email, number, isSocial } = signUpData;

    await connectDb();

    if (isSocial) {
      signUpData.password = "password";
      signUpData.isSocial = true;
      signUpData.isActive = true;
    }

    const newUser = new UserModel(signUpData);
    const savedUser = await newUser.save();

    if (!isSocial) {
      const identifier = email || number;
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await OtpModel.create({ identifier, code: otp, expiresAt });

      if (email) {
        await sendEmail({
          to: email,
          subject: "Verify Your Account",
          text: `Your verification code is ${otp}`,
        });
      } else if (number) {
        await sendSMS({
          to: number,
          message: `Your verification code is ${otp}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "User created",
      user: savedUser,
    });
  } catch (err) {
    console.error("User registration error:", err);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { identifier, code } = await request.json();
    await connectDb();
    console.log(identifier, code);

    const otpEntry = await OtpModel.findOne({ identifier, code });

    if (!otpEntry) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (otpEntry.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, message: "OTP expired" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOneAndUpdate(
      { $or: [{ email: identifier }, { number: identifier }] },
      { isActive: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    await OtpModel.deleteOne({ _id: otpEntry._id });

    // Create JWT tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET!,
      {
        expiresIn: process.env.NEXT_PUBLIC_EXPIRE_ACCESS_TOKEN_IN || "5h",
      } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET!,
      {
        expiresIn: process.env.NEXT_PUBLIC_EXPIRE_REFRESH_TOKEN_IN || "90d",
      } as jwt.SignOptions
    );

    const response = NextResponse.json({
      success: true,
      message: "User verified successfully",
      role: user.role,
      user,
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 5,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
    });

    return response;
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";

    const limit = 50;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { number: { $regex: search, $options: "i" } },
      ];
    }

    const users = await UserModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-password");

    const total = await UserModel.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Fetch users error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
