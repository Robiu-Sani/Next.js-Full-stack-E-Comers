/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import Product from "@/models/product.model";

const STEADFAST_BASE_URL = "https://portal.packzy.com/api/v1";
const STEADFAST_API_KEY = "f4bwzpolj2inirf3wcxjmfxv46heg3sa";
const STEADFAST_SECRET_KEY = "ew5p0oh9eaq3buedaftzqwx6";

interface SteadfastCreateOrderRequest {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  alternative_phone?: string;
  recipient_email?: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  total_lot?: number;
  delivery_type?: 0 | 1;
}

interface SteadfastCreateOrderResponse {
  status: number;
  message: string;
  consignment: {
    consignment_id: number;
    invoice: string;
    tracking_code: string;
    recipient_name: string;
    recipient_phone: string;
    recipient_address: string;
    cod_amount: number;
    status: string;
    note?: string;
    created_at: string;
    updated_at: string;
  };
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
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    // Fetch order from database
    const order = await OrderModel.findById(orderId).populate("products");
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Order is deleted" },
        { status: 400 }
      );
    }

    // Prepare steadfast order data
    const steadfastOrder: SteadfastCreateOrderRequest = {
      invoice: order.orderId,
      recipient_name: order.name,
      recipient_phone: order.number,
      recipient_address: order.address,
      cod_amount: order.paymentMethod === "cash-on-delivery" ? order.grandTotal : 0,
      note: order.note || `Order ${order.orderId}`,
      item_description: order.products.map((product: any) => product.name).join(", "),
      total_lot: order.products.length,
      delivery_type: 0, // 0 = home delivery, 1 = point delivery
    };

    // Create order in Steadfast
    const response = await fetch(`${STEADFAST_BASE_URL}/create_order`, {
      method: "POST",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(steadfastOrder),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Steadfast API error:", errorText);
      throw new Error(`Steadfast API returned ${response.status}: ${errorText}`);
    }

    const steadfastResponse: SteadfastCreateOrderResponse = await response.json();
console.log(steadfastResponse)
    if (steadfastResponse.status !== 200) {
      return NextResponse.json(
        { 
          success: false, 
          message: steadfastResponse.message || "Failed to create order in Steadfast" 
        },
        { status: 400 }
      );
    }

    // Update order with tracking information
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        trackingId: steadfastResponse.consignment.tracking_code,
        orderStatus: "confirmed", // Update order status to confirmed
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Order created successfully in Steadfast",
      data: {
        order: updatedOrder,
        steadfast: steadfastResponse.consignment,
      },
    });

  } catch (err) {
    console.error("Steadfast order creation error:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: err instanceof Error ? err.message : "Failed to create steadfast order" 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");

    switch (action) {
      case "balance":
        return await getBalance();
      case "status":
        const trackingCode = url.searchParams.get("trackingCode");
        const invoice = url.searchParams.get("invoice");
        const consignmentId = url.searchParams.get("consignmentId");
        
        if (trackingCode) {
          return await getStatusByTrackingCode(trackingCode);
        } else if (invoice) {
          return await getStatusByInvoice(invoice);
        } else if (consignmentId) {
          return await getStatusByConsignmentId(consignmentId);
        } else {
          return NextResponse.json(
            { success: false, message: "Tracking code, invoice, or consignment ID is required" },
            { status: 400 }
          );
        }
      default:
        return NextResponse.json(
          { success: false, message: "Valid action parameter is required" },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error("Steadfast GET error:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: err instanceof Error ? err.message : "Failed to fetch steadfast data" 
      },
      { status: 500 }
    );
  }
}

async function getBalance() {
  try {
    const response = await fetch(`${STEADFAST_BASE_URL}/get_balance`, {
      method: "GET",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Steadfast API returned ${response.status}`);
    }

    const balanceData = await response.json();
    return NextResponse.json({
      success: true,
      data: balanceData,
    });
  } catch (err) {
    throw err;
  }
}

async function getStatusByTrackingCode(trackingCode: string) {
  try {
    const response = await fetch(`${STEADFAST_BASE_URL}/status_by_trackingcode/${trackingCode}`, {
      method: "GET",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Steadfast API returned ${response.status}`);
    }

    const statusData = await response.json();
    return NextResponse.json({
      success: true,
      data: statusData,
    });
  } catch (err) {
    throw err;
  }
}

async function getStatusByInvoice(invoice: string) {
  try {
    const response = await fetch(`${STEADFAST_BASE_URL}/status_by_invoice/${invoice}`, {
      method: "GET",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Steadfast API returned ${response.status}`);
    }

    const statusData = await response.json();
    return NextResponse.json({
      success: true,
      data: statusData,
    });
  } catch (err) {
    throw err;
  }
}

async function getStatusByConsignmentId(consignmentId: string) {
  try {
    const response = await fetch(`${STEADFAST_BASE_URL}/status_by_cid/${consignmentId}`, {
      method: "GET",
      headers: {
        "Api-Key": STEADFAST_API_KEY,
        "Secret-Key": STEADFAST_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Steadfast API returned ${response.status}`);
    }

    const statusData = await response.json();
    return NextResponse.json({
      success: true,
      data: statusData,
    });
  } catch (err) {
    throw err;
  }
}