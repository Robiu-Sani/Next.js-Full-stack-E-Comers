/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import Product from "@/models/product.model";

const STEADFAST_BASE_URL = "https://portal.packzy.com/api/v1";
const STEADFAST_API_KEY = "f4bwzpolj2inirf3wcxjmfxv46heg3sa";
const STEADFAST_SECRET_KEY = "ew5p0oh9eaq3buedaftzqwx6";

interface BulkOrderItem {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  total_lot?: number;
  delivery_type?: 0 | 1;
}

interface SteadfastBulkOrderResponse {
  invoice: string;
  recipient_name: string;
  recipient_address: string;
  recipient_phone: string;
  cod_amount: string;
  note: string | null;
  consignment_id: number | null;
  tracking_code: string | null;
  status: "success" | "error";
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const body = await request.json();
    const { orderIds } = body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order IDs array is required" },
        { status: 400 }
      );
    }

    if (orderIds.length > 500) {
      return NextResponse.json(
        { success: false, message: "Maximum 500 orders allowed per bulk request" },
        { status: 400 }
      );
    }

    // Fetch orders from database
    const orders = await OrderModel.find({
      _id: { $in: orderIds },
      isDeleted: false,
    }).populate("products");

    if (orders.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid orders found" },
        { status: 404 }
      );
    }

    // Prepare bulk order data for Steadfast
    const bulkOrders: BulkOrderItem[] = orders.map(order => ({
      invoice: order.orderId,
      recipient_name: order.name,
      recipient_phone: order.number,
      recipient_address: order.address,
      cod_amount: order.paymentMethod === "cash-on-delivery" ? order.grandTotal : 0,
      note: order.note || `Order ${order.orderId}`,
      item_description: order.products.map((product: any) => product.name).join(", "),
      total_lot: order.products.length,
      delivery_type: 0, // 0 = home delivery, 1 = point delivery
    }));

    // Send bulk order to Steadfast
    const response = await fetch(`${STEADFAST_BASE_URL}/create_order/bulk-order`, {
      method: "POST",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: JSON.stringify(bulkOrders),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Steadfast bulk API error:", errorText);
      throw new Error(`Steadfast bulk API returned ${response.status}: ${errorText}`);
    }

    const steadfastResponse: SteadfastBulkOrderResponse[] = await response.json();

    // Process responses and update orders
    const results = await processBulkResponses(orders, steadfastResponse);

    return NextResponse.json({
      success: true,
      message: `Bulk order processed. ${results.successful} successful, ${results.failed} failed.`,
      data: {
        total: orders.length,
        successful: results.successful,
        failed: results.failed,
        details: results.details,
      },
    });

  } catch (err) {
    console.error("Steadfast bulk order creation error:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: err instanceof Error ? err.message : "Failed to create bulk steadfast orders" 
      },
      { status: 500 }
    );
  }
}

async function processBulkResponses(
  orders: any[], 
  steadfastResponses: SteadfastBulkOrderResponse[]
) {
  const results = {
    successful: 0,
    failed: 0,
    details: [] as any[],
  };

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const steadfastResponse = steadfastResponses[i];

    if (steadfastResponse.status === "success" && steadfastResponse.consignment_id && steadfastResponse.tracking_code) {
      // Update order with tracking information
      try {
        await OrderModel.findByIdAndUpdate(
          order._id,
          {
            trackingId: steadfastResponse.tracking_code,
            orderStatus: "confirmed",
          },
          { new: true }
        );

        results.successful++;
        results.details.push({
          orderId: order._id,
          orderNumber: order.orderId,
          status: "success",
          trackingCode: steadfastResponse.tracking_code,
          consignmentId: steadfastResponse.consignment_id,
          message: "Order created successfully in Steadfast",
        });
      } catch (updateError) {
        results.failed++;
        results.details.push({
          orderId: order._id,
          orderNumber: order.orderId,
          status: "error",
          message: "Failed to update order with tracking information",
          error: updateError instanceof Error ? updateError.message : "Unknown error",
        });
      }
    } else {
      results.failed++;
      results.details.push({
        orderId: order._id,
        orderNumber: order.orderId,
        status: "error",
        message: steadfastResponse.status === "error" ? "Steadfast API error" : "Invalid response from Steadfast",
        steadfastResponse: steadfastResponse,
      });
    }
  }

  return results;
}