/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import SubCategory from "@/models/sub-category.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "30");

    // Build search query for all models
    const searchQuery: any = { isDeleted: false };

    if (search) {
      // For Products: search in name, brand, and tags
      const productSearchQuery = {
        ...searchQuery,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } }, // Search in tags array
        ],
      };

      // For Categories and SubCategories: search only in name
      const categorySearchQuery = {
        ...searchQuery,
        name: { $regex: search, $options: "i" },
      };

      // Execute all queries in parallel for better performance
      const [products, categories, subCategories] = await Promise.all([
        Product.find(productSearchQuery)
          .select("images name brand generalPrice averageRating tags")
          .select({ images: { $slice: 1 } })
          .limit(limit),

        Category.find(categorySearchQuery).select("image name").limit(limit),

        SubCategory.find(categorySearchQuery)
          .select("name")
          .populate("category", "name")
          .limit(limit),
      ]);

      return NextResponse.json(
        {
          success: true,
          data: {
            products,
            categories,
            subCategories,
          },
          meta: {
            totalResults:
              products.length + categories.length + subCategories.length,
            searchTerm: search,
            limit,
          },
          message: "Search results fetched successfully",
        },
        { status: 200 }
      );
    } else {
      // If no search term, return empty results
      return NextResponse.json(
        {
          success: true,
          data: {
            products: [],
            categories: [],
            subCategories: [],
          },
          meta: {
            totalResults: 0,
            searchTerm: search,
            limit,
          },
          message: "No search term provided",
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.error("GET Search error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to fetch search results",
      },
      { status: 500 }
    );
  }
}
