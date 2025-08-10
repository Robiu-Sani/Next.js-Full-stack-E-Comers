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

// Get Categories with Search & Pagination
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

    const total = await SubCategory.countDocuments(query);
    const categories = await SubCategory.find(query)
      .populate({
        path: "category",
        select: "name -_id",
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: categories,
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
    console.error("GET Category error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch categories" },
      { status: 400 }
    );
  }
}
