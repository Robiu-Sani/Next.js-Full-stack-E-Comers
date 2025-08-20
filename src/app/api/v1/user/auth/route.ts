import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "@/models/user.model";
import connectDb from "@/lib/connectdb";

const accessSecret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET as string;
const accessExpiresIn = process.env.NEXT_PUBLIC_EXPIRE_ACCESS_TOKEN_IN || "5h";
const refreshExpiresIn =
  process.env.NEXT_PUBLIC_EXPIRE_REFRESH_TOKEN_IN || "90d";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Email/Number and password are required." },
        { status: 400 }
      );
    }

    await connectDb();

    // Check by email or number
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { number: identifier }],
    });

    console.log(user);

    if (!user || user.isDeleted) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: "Account not verified." },
        { status: 403 }
      );
    }

    if (user.status === "blocked") {
      return NextResponse.json(
        { success: false, message: "This account is blocked." },
        { status: 403 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    // Generate tokens
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
      number: user.number,
    };

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: accessExpiresIn,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: refreshExpiresIn,
    } as jwt.SignOptions);

    // Set cookies
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      role: user.role,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 5, // 5 hours
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
