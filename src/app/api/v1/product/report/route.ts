/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";

interface ProductResponse {
  _id: string;
  name: string;
  images: string[];
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  priceVariants: Array<{
    _id: string;
    regularPrice: number;
    salePrice: number;
    quentity: number;
    sku: string;
  }>;
  brand: string;
  quentity: number;
  category: string;
  isFeatured: boolean;
  hasOffer: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: ProductResponse[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message?: string;
}

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const search = url.searchParams.get("search") || "";
    const sortBy = url.searchParams.get("sortBy") || "quentity";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const category = url.searchParams.get("category") || "";
    const reportType = url.searchParams.get("reportType") || ""; // Add reportType parameter

    // Handle different report types
    if (reportType === "statistics") {
      return await getLowStockStatistics();
    } else if (reportType === "critical") {
      return await getCriticalStock(request);
    }

    // Default: Get low stock products with pagination
    return await getLowStockProducts(request);

  } catch (error: any) {
    console.error("GET low stock products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch low stock products",
        data: []
      },
      { status: 500 }
    );
  }
}

// Main function to get low stock products
async function getLowStockProducts(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sortBy") || "quentity";
  const sortOrder = url.searchParams.get("sortOrder") || "asc";
  const category = url.searchParams.get("category") || "";

  // Calculate skip for pagination
  const skip = (page - 1) * limit;

  // Build filter for low stock products (quantity < 30)
  const filter: any = {
    quentity: { $lt: 30 },
    isDeleted: false
  };

  // Add search filter if provided
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { "priceVariants.sku": { $regex: search, $options: "i" } }
    ];
  }

  // Add category filter if provided
  if (category) {
    filter.category = category;
  }

  // Build sort object
  const sort: any = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Execute query with population
  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter)
  ]);

  // Transform products for table response
  const transformedProducts = products.map((product:any) => ({
    _id: product._id.toString(),
    name: product.name,
    images: product.images,
    generalPrice: product.generalPrice,
    priceVariants: product.priceVariants || [],
    brand: product.brand || "No Brand",
    quentity: product.quentity || 0,
    category: (product.category as any)?.name || "Uncategorized",
    isFeatured: product.isFeatured || false,
    hasOffer: product.hasOffer || false,
    isDeleted: product.isDeleted || false,
    createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString() || new Date().toISOString()
  }));

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const response: ApiResponse = {
    success: true,
    data: transformedProducts,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage
    }
  };

  return NextResponse.json(response, { status: 200 });
}

// Function to get low stock statistics
async function getLowStockStatistics() {
  const stats = await Product.aggregate([
    {
      $match: {
        isDeleted: false,
        quentity: { $lt: 30 }
      }
    },
    {
      $group: {
        _id: null,
        totalLowStockProducts: { $sum: 1 },
        criticalStock: {
          $sum: {
            $cond: [{ $lt: ["$quentity", 10] }, 1, 0]
          }
        },
        warningStock: {
          $sum: {
            $cond: [
              { $and: [{ $gte: ["$quentity", 10] }, { $lt: ["$quentity", 30] }] },
              1,
              0
            ]
          }
        },
        averageQuantity: { $avg: "$quentity" },
        minQuantity: { $min: "$quentity" },
        maxQuantity: { $max: "$quentity" },
        totalValue: {
          $sum: {
            $multiply: ["$quentity", "$generalPrice.currentPrice"]
          }
        }
      }
    }
  ]);

  const categoryStats = await Product.aggregate([
    {
      $match: {
        isDeleted: false,
        quentity: { $lt: 30 }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo"
      }
    },
    {
      $unwind: {
        path: "$categoryInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$categoryInfo.name",
        count: { $sum: 1 },
        averageQuantity: { $avg: "$quentity" }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 10
    }
  ]);

  return NextResponse.json(
    {
      success: true,
      data: {
        overview: stats[0] || {
          totalLowStockProducts: 0,
          criticalStock: 0,
          warningStock: 0,
          averageQuantity: 0,
          minQuantity: 0,
          maxQuantity: 0,
          totalValue: 0
        },
        byCategory: categoryStats
      }
    },
    { status: 200 }
  );
}

// Function to get critical stock products
async function getCriticalStock(request: NextRequest) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const criticalProducts = await Product.find({
    quentity: { $lt: 10 },
    isDeleted: false
  })
  .populate("category", "name")
  .sort({ quentity: 1 }) // Sort by lowest quantity first
  .limit(limit)
  .lean();

  const transformedProducts = criticalProducts.map((product:any) => ({
    _id: product._id.toString(),
    name: product.name,
    images: product.images,
    generalPrice: product.generalPrice,
    priceVariants: product.priceVariants || [],
    brand: product.brand || "No Brand",
    quentity: product.quentity || 0,
    category: (product.category as any)?.name || "Uncategorized",
    isFeatured: product.isFeatured || false,
    hasOffer: product.hasOffer || false,
    isDeleted: product.isDeleted || false,
    createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString() || new Date().toISOString()
  }));

  return NextResponse.json(
    {
      success: true,
      data: transformedProducts,
      message: `Found ${transformedProducts.length} critically low stock products`
    },
    { status: 200 }
  );
}

// POST endpoint to update product quantities
export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { productId, newQuantity } = await request.json();

    if (!productId || newQuantity === undefined) {
      return NextResponse.json(
        { success: false, message: "Product ID and new quantity are required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { 
        $set: { 
          quentity: newQuantity,
          updatedAt: new Date()
        } 
      },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product quantity updated successfully",
        data: {
          _id: updatedProduct._id.toString(),
          name: updatedProduct.name,
          quentity: updatedProduct.quentity,
          category: (updatedProduct.category as any)?.name || "Uncategorized"
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("POST update product quantity error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update product quantity"
      },
      { status: 500 }
    );
  }
}