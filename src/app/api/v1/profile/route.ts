/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    // Authenticate the user
    const { user } = await auth(
      USER_ROLE.ADMIN,
      USER_ROLE.MENAGER,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.USER
    );

    // Parse the request body
    const body = await request.json();

    // Check if customer profile already exists for this user
    const existingCustomer = await CustomerModel.findOne({ user: user._id });

    if (existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer profile already exists" },
        { status: 400 }
      );
    }

    // Create new customer profile
    const customerData = {
      ...body,
      user: user._id,
    };

    const result = await CustomerModel.create(customerData);

    return NextResponse.json(
      {
        success: true,
        message: "Profile created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating customer profile:", err);

    let statusCode = 500;
    let errorMessage = "Internal server error";

    if (err.message.includes("not authorized")) {
      statusCode = 401;
      errorMessage = err.message;
    } else if (err.message.includes("User not found")) {
      statusCode = 404;
      errorMessage = err.message;
    } else if (err.message.includes("account has been")) {
      statusCode = 403;
      errorMessage = err.message;
    } else if (err.name === "ValidationError") {
      statusCode = 400;
      errorMessage = Object.values(err.errors)
        .map((val: any) => val.message)
        .join(", ");
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    // Authenticate the user
    const { user } = await auth(
      USER_ROLE.ADMIN,
      USER_ROLE.MENAGER,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.USER
    );

    // Find customer profile for this user
    const customer = await CustomerModel.findOne({ user: user._id })
      .populate("user")
      .lean();

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: customer,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error fetching customer profile:", err);

    let statusCode = 500;
    let errorMessage = "Internal server error";

    if (err.message.includes("not authorized")) {
      statusCode = 401;
      errorMessage = err.message;
    } else if (err.message.includes("User not found")) {
      statusCode = 404;
      errorMessage = err.message;
    } else if (err.message.includes("account has been")) {
      statusCode = 403;
      errorMessage = err.message;
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDb();

    // Authenticate the user
    const { user } = await auth(
      USER_ROLE.ADMIN,
      USER_ROLE.MENAGER,
      USER_ROLE.SUPER_ADMIN,
      USER_ROLE.USER
    );

    // Parse the request body
    const body = await request.json();

    // Find and update customer profile
    const updatedCustomer = await CustomerModel.findOneAndUpdate(
      { user: user._id },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: updatedCustomer,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error updating customer profile:", err);

    let statusCode = 500;
    let errorMessage = "Internal server error";

    if (err.message.includes("not authorized")) {
      statusCode = 401;
      errorMessage = err.message;
    } else if (err.message.includes("User not found")) {
      statusCode = 404;
      errorMessage = err.message;
    } else if (err.message.includes("account has been")) {
      statusCode = 403;
      errorMessage = err.message;
    } else if (err.name === "ValidationError") {
      statusCode = 400;
      errorMessage = Object.values(err.errors)
        .map((val: any) => val.message)
        .join(", ");
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: statusCode }
    );
  }
}
