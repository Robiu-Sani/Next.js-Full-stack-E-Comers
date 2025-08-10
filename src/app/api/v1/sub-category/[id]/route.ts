/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import SubCategory from "@/models/sub-category.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

// GET: Get category by ID
export async function GET(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);

    const category = await SubCategory.findById(id);

    if (!category || category.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PATCH: Update category by ID
export async function PATCH(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);

    const body = await req.json();

    const updatedCategory = await SubCategory.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete category by ID
export async function DELETE(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    // Find category first
    const category = await SubCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Toggle isDeleted value
    category.isDeleted = !category.isDeleted;
    await category.save();

    return NextResponse.json({
      success: true,
      message: category.isDeleted
        ? "Category soft deleted successfully"
        : "Category restored successfully",
      data: category,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to toggle delete status",
      },
      { status: 500 }
    );
  }
}
