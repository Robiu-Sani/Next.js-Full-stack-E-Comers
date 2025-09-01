/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    // Get pagination parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "24");

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build base query - only get products from this category that aren't deleted
    const searchQuery: any = { isDeleted: false, subCategory: id };

    // Get total count for pagination info
    const totalCount = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // For better performance with random sorting, we'll use a computed random field
    // instead of $sample which is inefficient for large collections
    const products = await Product.aggregate([
      { $match: searchQuery },
      {
        $project: {
          name: 1,
          images: {
            $cond: [
              { $gte: [{ $size: "$images" }, 2] },
              { $slice: ["$images", 2] },
              "$images",
            ],
          },
          generalPrice: 1,
          brand: 1,
          tags: 1,
          specifications: 1,
          averageRating: 1,
          totalReviewCount: 1,
          createdAt: 1,
          // Add a random field for sorting
          randomField: { $rand: {} },
        },
      },
      { $sort: { randomField: 1 } }, // Sort by the random field
      { $skip: skip },
      { $limit: limit },
      { $project: { randomField: 0 } }, // Remove the random field from final results
    ]);

    return NextResponse.json(
      {
        status: "success",
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET products error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to fetch products",
      },
      { status: 400 }
    );
  }
}
