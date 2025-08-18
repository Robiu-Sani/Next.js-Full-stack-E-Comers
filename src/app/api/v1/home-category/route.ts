/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const categories = await Category.find({ isDeleted: false })
      .select("name image")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET Category error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch categories" },
      { status: 400 }
    );
  }
}
