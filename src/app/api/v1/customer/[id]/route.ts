/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import CustomerModel from "@/models/customer.model";
import { auth } from "@/lib/auth";
import { USER_ROLE } from "@/interface/auth.constent";
import UserModel from "@/models/user.model";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    const customer = await CustomerModel.findById(id)
      .select("-password")
      .populate("user", "-password");
    // Removed .populate("orders") to avoid MissingSchemaError

    if (!customer || customer.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: customer });
  } catch (err) {
    console.error("GET customer error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const { user, orders, isDeleted, ...updateData } = body;

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-password")
      .populate("user", "-password");
    // Removed .populate("orders") to avoid MissingSchemaError

    if (!updatedCustomer || updatedCustomer.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (err) {
    console.error("PATCH customer error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update customer" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    // Toggle isDeleted value (true becomes false, false becomes true)
    const newIsDeletedValue = !customer.isDeleted;

    await UserModel.findByIdAndUpdate(
      customer.user,
      { isDeleted: newIsDeletedValue },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      { isDeleted: newIsDeletedValue },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-password")
      .populate("user", "-password");
    // Removed .populate("orders") to avoid MissingSchemaError

    const actionMessage = newIsDeletedValue
      ? "Customer deleted successfully"
      : "Customer restored successfully";

    return NextResponse.json({
      success: true,
      message: actionMessage,
      data: updatedCustomer,
    });
  } catch (err) {
    console.error("DELETE customer error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update customer status" },
      { status: 500 }
    );
  }
}
