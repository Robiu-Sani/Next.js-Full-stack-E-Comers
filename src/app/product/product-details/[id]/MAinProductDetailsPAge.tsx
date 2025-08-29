/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ImageParts from "./ImageParts";
import ProductIntroduce from "./ProductIntroduce";
import BasicInfo from "./BasicInfo";

interface GeneralPrice {
  currentPrice: number;
  prevPrice: number;
  discountPercentage: number;
}

interface PriceVariant {
  _id: string;
  regularPrice: number;
  salePrice: number;
  quentity: number;
  sku: string;
}

interface Specification {
  _id: string;
  key: string;
  value: string;
}

interface Coupon {
  _id: string;
  name: string;
  Type: string;
  totalOffer: number;
}

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

interface Product {
  generalPrice: GeneralPrice;
  _id: string;
  name: string;
  images: string[];
  priceVariants: PriceVariant[];
  quickOverview: string[];
  specifications: Specification[];
  details: string;
  questionsAndAnswers: any[];
  quentity: number;
  reviews: any[];
  totalReviewCount: number;
  averageRating: number;
  category: Category;
  subCategory: SubCategory;
  coupon: Coupon[];
  tags: string[];
  brand: string;
  isFeatured: boolean;
  isDeleted: boolean;
  hasOffer: boolean;
  offerEndDate: string;
  offerPercentage: number;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Product;
}

// Skeleton Components
const ImageSkeleton = () => (
  <div className="space-y-4">
    <div className="aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    <div className="grid grid-cols-4 gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

const ProductInfoSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-4"></div>
    <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
  </div>
);

const BasicInfoSkeleton = () => (
  <div className="space-y-6 mt-8">
    <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function MainProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/v1/product/status/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data: ApiResponse = await res.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Error loading product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageSkeleton />
          <ProductInfoSkeleton />
        </div>
        <BasicInfoSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-xl font-semibold mb-4">
            {error || "Product not found"}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageParts images={product.images} />
        <ProductIntroduce
          data={{
            quentity: product.quentity,
            offerPercentage: product.offerPercentage,
            generalPrice: product.generalPrice,
            name: product.name,
            priceVariants: product.priceVariants,
            details: product.details,
          }}
        />
      </div>
      <BasicInfo
        data={{
          quickOverview: product.quickOverview,
          offerPercentage: product.offerPercentage,
          tags: product.tags,
          brand: product.brand,
          specifications: product.specifications,
          category: product.category.name,
          subCategory: product.subCategory.name,
        }}
      />
    </div>
  );
}
