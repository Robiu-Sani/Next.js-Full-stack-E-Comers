/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const searchTerm = searchParams.get("search") || "";
    const sortBy = searchParams.get("sort") || "createdAt";
    const sortOrder = searchParams.get("order") === "asc" ? 1 : -1;
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
    const brand = searchParams.get("brand") || "";

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery: any = { isDeleted: false };

    // Add search term filter
    if (searchTerm) {
      searchQuery.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
        { "specifications.value": { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Add price range filter
    if (minPrice > 0 || maxPrice < 999999) {
      searchQuery["generalPrice.currentPrice"] = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    // Add brand filter
    if (brand) {
      searchQuery.brand = { $regex: brand, $options: "i" };
    }

    // Build sort object
    const sortOptions: any = {};
    if (sortBy === "price") {
      sortOptions["generalPrice.currentPrice"] = sortOrder;
    } else if (sortBy === "name") {
      sortOptions.name = sortOrder;
    } else if (sortBy === "rating") {
      sortOptions.averageRating = sortOrder;
    } else {
      sortOptions.createdAt = sortOrder;
    }

    // Execute query with pagination
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
        },
      },
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Get total count for pagination info
    const totalCount = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

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
        filters: {
          searchTerm,
          sortBy,
          sortOrder: sortOrder === 1 ? "asc" : "desc",
          minPrice,
          maxPrice,
          brand,
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
