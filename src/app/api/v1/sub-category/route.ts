/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import SubCategory from "@/models/sub-category.model";
import { NextRequest, NextResponse } from "next/server";

// Create Category
export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    console.log(category);
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    const createdCategory = await SubCategory.create(category);

    return NextResponse.json(
      {
        success: true,
        data: createdCategory,
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST Category error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create category" },
      { status: 400 }
    );
  }
}
