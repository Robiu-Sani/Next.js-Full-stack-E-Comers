/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a new Order
 */
export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    await connectDb();

    const createdOrder = await OrderModel.create(order);

    return NextResponse.json(
      {
        success: true,
        data: createdOrder,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("POST Order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create order" },
      { status: 400 }
    );
  }
}

/**
 * Get Orders with search, filter & pagination
 * Search fields: orderId, name, number
 * Filters: paymentStatus, orderStatus
 */
export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const orderStatus = searchParams.get("orderStatus");
    const paymentStatus = searchParams.get("paymentStatus");
    const paymentMethod = searchParams.get("paymentMethod");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 50);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const query: any = { isDeleted: { $ne: true } };

    // 🔍 Search by orderId, trackingId, name, number, or address
    if (search && search.trim() !== "") {
      query.$or = [
        { orderId: { $regex: search.trim(), $options: "i" } },
        { trackingId: { $regex: search.trim(), $options: "i" } },
        { name: { $regex: search.trim(), $options: "i" } },
        { number: { $regex: search.trim(), $options: "i" } },
        { address: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // 🎯 Filter by status and payment method - handle empty strings and "all" values
    if (orderStatus && orderStatus.trim() !== "" && orderStatus !== "all") {
      query.orderStatus = orderStatus.trim();
    }
    
    if (paymentStatus && paymentStatus.trim() !== "" && paymentStatus !== "all") {
      query.paymentStatus = paymentStatus.trim();
    }
    
    if (paymentMethod && paymentMethod.trim() !== "" && paymentMethod !== "all") {
      query.paymentMethod = paymentMethod.trim();
    }

    // Validate pagination parameters
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page

    // Calculate pagination
    const skip = (validatedPage - 1) * validatedLimit;

    // Build sort object with validation
    const allowedSortFields = ['createdAt', 'updatedAt', 'grandTotal', 'orderId'];
    const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const validatedSortOrder = sortOrder === 'asc' ? 1 : -1;

    const sort: any = {};
    sort[validatedSortBy] = validatedSortOrder;

    // Get total count for pagination
    const total = await OrderModel.countDocuments(query);

    // Validate if page exists
    const totalPages = Math.ceil(total / validatedLimit);
    if (validatedPage > totalPages && totalPages > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Page ${validatedPage} does not exist. Total pages: ${totalPages}`,
          pagination: {
            total,
            page: validatedPage,
            limit: validatedLimit,
            totalPages,
            hasNextPage: false,
            hasPrevPage: validatedPage > 1,
          }
        },
        { status: 400 }
      );
    }

    // Fetch orders with population and pagination
    const orders = await OrderModel.find(query)
      .populate('products', 'images generalPrice name')
      .sort(sort)
      .skip(skip)
      .limit(validatedLimit)
      .select("-__v") // Exclude version key
      .lean(); // Convert to plain JavaScript objects for better performance

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          total,
          page: validatedPage,
          limit: validatedLimit,
          totalPages,
          hasNextPage: validatedPage < totalPages,
          hasPrevPage: validatedPage > 1,
        },
        filters: {
          search: search.trim(),
          orderStatus: orderStatus && orderStatus !== "all" ? orderStatus.trim() : null,
          paymentStatus: paymentStatus && paymentStatus !== "all" ? paymentStatus.trim() : null,
          paymentMethod: paymentMethod && paymentMethod !== "all" ? paymentMethod.trim() : null,
          sortBy: validatedSortBy,
          sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
        }
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET Orders error:", err);
    
    // More specific error handling
    let errorMessage = "Failed to fetch orders";
    let statusCode = 500;
    
    if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
      errorMessage = "Database connection error. Please try again later.";
      statusCode = 503; // Service Unavailable
    } else if (err.name === 'ValidationError') {
      errorMessage = "Invalid query parameters";
      statusCode = 400;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? {
          message: err.message,
          stack: err.stack
        } : undefined
      },
      { status: statusCode }
    );
  }
}

/**
 * Update an existing Order
 */
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) throw new Error("Order ID is required");

    await connectDb();

    const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) throw new Error("Order not found");

    return NextResponse.json(
      {
        success: true,
        data: updatedOrder,
        message: "Order updated successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("PATCH Order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update order" },
      { status: 400 }
    );
  }
}

/**
 * Soft Delete / Restore an Order
 * Toggle isDeleted flag
 */
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) throw new Error("Order ID is required");

    await connectDb();

    const order = await OrderModel.findById(id);
    if (!order) throw new Error("Order not found");

    // Add soft delete flag dynamically if not defined in schema
    (order as any).isDeleted = !(order as any).isDeleted;
    await order.save();

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: (order as any).isDeleted
          ? "Order deleted successfully"
          : "Order restored successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("DELETE Order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete order" },
      { status: 400 }
    );
  }
}
