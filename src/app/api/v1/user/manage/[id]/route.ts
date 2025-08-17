import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import UserModel from "@/models/user.model";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    console.error("GET user error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    const body = await request.json();
    const allowedFields = [
      "email",
      "number",
      "username",
      "role",
      "status",
      "isActive",
      "isDeleted",
    ];
    const updateData: Partial<typeof body> = {};
    for (const key of allowedFields) {
      if (key in body) {
        updateData[key] = body[key];
      }
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("PATCH user error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  try {
    await connectDb();
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("PATCH user error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
}
