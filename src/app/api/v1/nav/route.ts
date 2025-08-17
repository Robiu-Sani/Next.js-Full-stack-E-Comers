/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Category from "@/models/category.model";
import SubCategory from "@/models/sub-category.model";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

interface CategoryType {
  _id: Types.ObjectId;
  name: string;
}

interface SubCategoryType {
  _id: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
}

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    // Fetch all non-deleted categories
    const categories = await Category.find({ isDeleted: false })
      .select("name _id")
      .lean<CategoryType[]>();

    // Fetch all non-deleted subcategories
    const subCategories = await SubCategory.find({ isDeleted: false })
      .select("name _id category")
      .lean<SubCategoryType[]>();

    // Map categories to the desired structure with their subcategories
    const navItems = categories.map((category: CategoryType) => ({
      name: category.name,
      id: category._id.toString(),
      children: subCategories
        .filter(
          (subCat: SubCategoryType) =>
            subCat.category.toString() === category._id.toString()
        )
        .map((subCat: SubCategoryType) => ({
          name: subCat.name,
          id: subCat._id.toString(),
        })),
    }));

    return NextResponse.json(
      {
        status: "success",
        navItems,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET categories error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to fetch categories",
      },
      { status: 400 }
    );
  }
}
