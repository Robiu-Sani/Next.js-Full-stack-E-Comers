/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import UserModel from "@/models/user.model";
import OtpModel from "@/models/otp.model";
import { NextRequest, NextResponse } from "next/server";
import { EmailTemplates } from "@/lib/send-email";
import { sendSMS } from "@/lib/send-sms";
import jwt from "jsonwebtoken";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(request: NextRequest) {
  try {
    const signUpData = await request.json();
    const { email, number, password, isSocial = false } = signUpData;

    await connectDb();

    // Validate input
    if (!email && !number) {
      return NextResponse.json(
        { success: false, error: "Email or number is required" },
        { status: 400 }
      );
    }

    if (!isSocial && !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Password is required for non-social signups",
        },
        { status: 400 }
      );
    }

    // Check if user exists with email or number
    let existingUser;
    if (email) {
      existingUser = await UserModel.findOne({
        $or: [
          { email: email.toLowerCase().trim(), isDeleted: false },
          { email: email.toLowerCase().trim(), isDeleted: { $exists: false } },
        ],
      });
    } else if (number) {
      existingUser = await UserModel.findOne({
        $or: [
          { number: number.trim(), isDeleted: false },
          { number: number.trim(), isDeleted: { $exists: false } },
        ],
      });
    }

    if (existingUser) {
      if (existingUser.isActive) {
        // User exists and is active
        return NextResponse.json(
          {
            success: false,
            error: "User already exists with this email/number",
            user: {
              _id: existingUser._id,
              email: existingUser.email,
              number: existingUser.number,
              isActive: existingUser.isActive,
            },
          },
          { status: 409 }
        );
      } else {
        // User exists but is inactive - delete and create new account
        await UserModel.findByIdAndDelete(existingUser._id);

        // Also delete any pending OTPs for this identifier
        const identifier = email || number;
        await OtpModel.deleteMany({ identifier });
      }
    }

    // Prepare user data
    const userData: any = {
      email: email ? email.toLowerCase().trim() : undefined,
      number: number ? number.trim() : undefined,
      password: password || undefined,
      isSocial,
      isActive: isSocial, // Social users are active immediately
      status: "in-progress",
    };

    // Create new user
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();

    if (!isSocial) {
      // Generate and send OTP for non-social signups
      const otp = generateOTP();
      const identifier = email || number;

      await OtpModel.create({
        identifier,
        code: otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
      });

      if (email) {
        await EmailTemplates.sendOtpEmail(
          email,
          otp,
          email || email.split("@")[0]
        );
      } else if (number) {
        await sendSMS({
          to: number,
          message: `Your verification code is ${otp}. This code will expire in 15 minutes.`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: isSocial
        ? "User created successfully"
        : "User created successfully. Please verify your account.",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        number: savedUser.number,
        isActive: savedUser.isActive,
      },
    });
  } catch (err: any) {
    console.error("User registration error:", err);

    // Handle duplicate key error (unique constraint violation)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return NextResponse.json(
        {
          success: false,
          error: `User with this ${field} already exists`,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
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
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        number: user.number,
      },
      process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string,
      {
        expiresIn: process.env.NEXT_PUBLIC_EXPIRE_ACCESS_TOKEN_IN || "5h",
      } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        number: user.number,
      },
      process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET as string,
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

