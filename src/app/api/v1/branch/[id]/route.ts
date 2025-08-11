/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/interface/auth.constent";
import { auth } from "@/lib/auth";
import connectDb from "@/lib/connectdb";
import Branch from "@/models/branch.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

// GET: Get branch by ID
export async function GET(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);

    const branch = await Branch.findById(id);

    if (!branch || branch.isDeleted) {
      return NextResponse.json(
        { success: false, message: "branch not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: branch });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch branch" },
      { status: 500 }
    );
  }
}

// PATCH: Update branch by ID
export async function PATCH(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  console.log("branch id", id);
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MENAGER);

    const body = await req.json();

    const updatedbranch = await Branch.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedbranch) {
      return NextResponse.json(
        { success: false, message: "branch not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "branch updated successfully",
      data: updatedbranch,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update branch" },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete branch by ID
export async function DELETE(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    await auth(USER_ROLE.SUPER_ADMIN);

    // Find branch first
    const branch = await Branch.findById(id);

    if (!branch) {
      return NextResponse.json(
        { success: false, message: "branch not found" },
        { status: 404 }
      );
    }

    // Toggle isDeleted value
    branch.isDeleted = !branch.isDeleted;
    await branch.save();

    return NextResponse.json({
      success: true,
      message: branch.isDeleted
        ? "branch soft deleted successfully"
        : "branch restored successfully",
      data: branch,
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
