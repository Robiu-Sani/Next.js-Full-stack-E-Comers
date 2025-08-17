import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import SubCategory from "@/models/sub-category.model";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(request: NextRequest) {
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const query: any = { isDeleted: false };

    // Handle search filter
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    console.log("👉 FINAL QUERY:", query);

    const total = await SubCategory.countDocuments(query);
    const subCategories = await SubCategory.find(query)
      .populate({
        path: "category",
        select: "name _id",
      })
      .select("name category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category", "name"); // populate to show category name

    return NextResponse.json(
      {
        success: true,
        data: subCategories,
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
    console.error("❌ GET SubCategory error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to fetch subcategories",
      },
      { status: 400 }
    );
  }
}
