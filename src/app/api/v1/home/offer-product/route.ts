/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    // Fetch 20 random products that have offers
    const products = await Product.aggregate([
      { $match: { isDeleted: false, hasOffer: true } },
      { $sample: { size: 20 } }, // Randomly select 20 docs
      {
        $project: {
          name: 1,
          images: {
            $cond: [
              { $gte: [{ $size: "$images" }, 2] },
              { $slice: ["$images", 2] }, // If 2+ images, take first 2
              "$images", // Else return all (1 or 0)
            ],
          },
          generalPrice: 1,
          offerEndDate: 1,
          offerPercentage: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        status: "success",
        products,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET products with offer error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to fetch products with offer",
      },
      { status: 400 }
    );
  }
}
