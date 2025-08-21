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

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 50);
    const isDeleted = searchParams.get("isDeleted");
    const hasOffer = searchParams.get("hasOffer");

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Add isDeleted filter if provided
    if (isDeleted !== null) {
      query.isDeleted = isDeleted === "true";
    }

    // Add hasOffer filter if provided
    if (hasOffer !== null) {
      query.hasOffer = hasOffer === "true";
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select("images name quentity brand hasOffer isDeleted generalPrice")
      .select({ images: { $slice: 1 } })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: products,
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
    console.error("GET Products error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch products" },
      { status: 400 }
    );
  }
}
