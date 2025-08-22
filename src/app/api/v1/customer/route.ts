/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import CustomerModel from "@/models/customer.model";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Create Customer + User
export async function POST(request: NextRequest) {
  await connectDb();
  const session = await mongoose.startSession();

  try {
    const data = await request.json();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN);

    let createdCustomer: any = null;

    await session.withTransaction(async () => {
      // 1️⃣ Create the User
      const newUser = await UserModel.create(
        [
          {
            email: data.email,
            number: data.number,
            username: data?.username || "",
            password: data.password,
            role: "user",
            isActive: true,
          },
        ],
        { session }
      );

      // 2️⃣ Create the Customer linked to the user
      createdCustomer = await CustomerModel.create(
        [
          {
            ...data,
            user: newUser[0]._id,
          },
        ],
        { session }
      );
    });

    session.endSession();

    return NextResponse.json(
      {
        success: true,
        data: createdCustomer[0],
        message: "Customer & User created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("POST Customer error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create Customer" },
      { status: 400 }
    );
  }
}

// Get Customers with Search & Pagination
export async function GET(request: NextRequest) {
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 50);

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const total = await CustomerModel.countDocuments(query);
    const customers = await CustomerModel.find(query)
      .populate("user", "email number username role")
      .select("name image createdAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: customers,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET Customers error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch customers" },
      { status: 400 }
    );
  }
}

// Update Customer
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();
    if (!id) throw new Error("Customer ID is required");

    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN);

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedCustomer,
        message: "Customer updated successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PATCH Customer error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update customer" },
      { status: 400 }
    );
  }
}

// Soft Delete / Restore Customer
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error("Customer ID is required");

    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN);

    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }

    customer.isDeleted = !customer.isDeleted;
    await customer.save();

    return NextResponse.json(
      {
        success: true,
        data: customer,
        message: customer.isDeleted
          ? "Customer deleted successfully"
          : "Customer restored successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE Customer error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete customer" },
      { status: 400 }
    );
  }
}
