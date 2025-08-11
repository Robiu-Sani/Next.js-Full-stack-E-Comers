/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import Branch from "@/models/branch.model";
import { NextRequest, NextResponse } from "next/server";

// Create branch
export async function POST(request: NextRequest) {
  try {
    const branch = await request.json();

    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    const createdbranch = await Branch.create(branch);

    return NextResponse.json(
      {
        success: true,
        data: createdbranch,
        message: "branch created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("POST branch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create branch" },
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
    const limit = Number(searchParams.get("limit") || 10);

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Branch.countDocuments(query);
    const categories = await Branch.find(query)
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
    console.error("GET branch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch categories" },
      { status: 400 }
    );
  }
}
