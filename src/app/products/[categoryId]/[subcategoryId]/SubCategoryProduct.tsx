"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/shired-component/ProductCard";
import { Button } from "@/components/ui/button";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  images: string[];
  averageRating: number;
  totalReviewCount: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export default function SubCategoryProduct() {
  const params = useParams();
  const id = params.subcategoryId as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 24,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/v1/product/sub-category/${id}?page=${page}&limit=24`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id, page]);

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const ProductSkeleton = () => (
    <Card className="h-full p-0 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-6 w-1/3" />
      </CardContent>
    </Card>
  );

  return (
    <section className="w-full py-6">
      {/* Header */}
      <div className="container mx-auto flex justify-between items-center px-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4 text-primary" />
          <span>Sub Category Products</span>
        </div>

        {/* Pagination Info */}
        {!loading && products.length > 0 && (
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * pagination.limit + 1} -{" "}
            {Math.min(page * pagination.limit, pagination.totalCount)} of{" "}
            {pagination.totalCount} products
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {loading ? (
          Array.from({ length: 24 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No products found in this category
            </p>
            <Link href="/products">
              <Button variant="outline" className="mt-4">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && products.length > 0 && (
        <div className="container mx-auto flex justify-center items-center mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Page</span>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md">
              {pagination.currentPage}
            </span>
            <span className="text-gray-500">of {pagination.totalPages}</span>
          </div>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Back to All Products */}
      <div className="flex justify-center mt-8">
        <Link href="/products">
          <Button variant="default" className="shadow-md px-6">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
