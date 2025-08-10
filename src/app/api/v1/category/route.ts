/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import Category from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

// Create Category
export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    const createdCategory = await Category.create(category);

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

    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
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

// Update Category
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) throw new Error("Category ID is required");

    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedCategory,
        message: "Category updated successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PATCH Category error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update category" },
      { status: 400 }
    );
  }
}

// Soft Delete / Restore Category
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) throw new Error("Category ID is required");

    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    category.isDeleted = !category.isDeleted;
    await category.save();

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: category.isDeleted
          ? "Category deleted successfully"
          : "Category restored successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE Category error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete category" },
      { status: 400 }
    );
  }
}
