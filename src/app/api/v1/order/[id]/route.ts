/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};

/**
 * 🟢 GET: Get single order by ID
 */
export async function GET(req: NextRequest, { params }: ParamsType) {
  const { id } = params;

  try {
    await connectDb();

    const order = await OrderModel.findById(id);

    if (!order || (order as any).isDeleted) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch order",
      },
      { status: 500 }
    );
  }
}

/**
 * 🟡 PATCH: Update order by ID
 */
export async function PATCH(req: NextRequest, { params }: ParamsType) {
  const { id } = params;

  try {
    await connectDb();
    const body = await req.json();

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update order",
      },
      { status: 500 }
    );
  }
}

/**
 * 🔴 DELETE: Soft delete or restore order by ID
 */
export async function DELETE(req: NextRequest, { params }: ParamsType) {
  const { id } = params;

  try {
    await connectDb();

    const order = await OrderModel.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Add a soft delete flag if not defined in schema
    if ((order as any).isDeleted === undefined) {
      (order as any).isDeleted = false;
    }

    (order as any).isDeleted = !(order as any).isDeleted;
    await order.save();

    return NextResponse.json(
      {
        success: true,
        message: (order as any).isDeleted
          ? "Order soft deleted successfully"
          : "Order restored successfully",
        data: order,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete or restore order",
      },
      { status: 500 }
    );
  }
}
