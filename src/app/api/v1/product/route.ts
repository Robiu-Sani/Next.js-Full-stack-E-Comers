/* eslint-disable @typescript-eslint/no-explicit-any */

import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN);

    const createdProduct = await Product.create(payload);

    return NextResponse.json(
      {
        success: true,
        data: createdProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST Product error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create Product" },
      { status: 400 }
    );
  }
}
