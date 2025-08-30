/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard from "@/shired-component/ProductCard";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, RotateCw } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  images: string[];
  generalPrice: {
    currentPrice: number;
  };
  brand: string;
  tags: string[];
  specifications: any[];
  averageRating: number;
  totalReviewCount: number;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface Filters {
  searchTerm: string;
  sortBy: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
}

interface ApiResponse {
  status: string;
  products: Product[];
  pagination: PaginationInfo;
  filters: Filters;
  message: string;
}

export default function MenageFeatureProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    minPrice: 0,
    maxPrice: 9999999999,
    brand: "",
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);

  // Fetch products function - use ref to avoid recreation
  const fetchProducts = useCallback(
    async (
      page: number = 1,
      reset: boolean = false,
      currentFilters = filters
    ) => {
      if (!hasMore && page > 1 && !reset) return;

      try {
        setLoading(true);
        if (reset) {
          setInitialLoading(true);
        }

        const params = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          search: currentFilters.searchTerm,
          sort: currentFilters.sortBy,
          order: currentFilters.sortOrder,
          minPrice: currentFilters.minPrice.toString(),
          maxPrice: currentFilters.maxPrice.toString(),
          brand: currentFilters.brand,
        });

        const res = await fetch(`/api/v1/product/featured?${params}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data: ApiResponse = await res.json();

        if (data.status === "success") {
          if (reset) {
            setProducts(data.products);
          } else {
            setProducts((prev) => [...prev, ...data.products]);
          }
          setPagination(data.pagination);
          setHasMore(data.pagination.hasNextPage);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [hasMore] // Only include hasMore as dependency
  );

  // Initial load
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchProducts(1, true);
    }
  }, []); // Empty dependency array for initial load only

  // Filter changes - use debounce to prevent too many API calls
  useEffect(() => {
    if (!isMounted.current) return;

    const handler = setTimeout(() => {
      setProducts([]);
      setHasMore(true);
      fetchProducts(1, true, filters);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [
    filters.searchTerm,
    filters.sortBy,
    filters.sortOrder,
    filters.minPrice,
    filters.maxPrice,
    filters.brand,
  ]); // Only specific filter properties

  // Infinite scroll setup
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchProducts((pagination?.currentPage || 0) + 1, false, filters);
      }
    });

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, pagination, fetchProducts]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      minPrice: 0,
      maxPrice: 9999999999,
      brand: "",
    });
  };

  // Skeleton loader component
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>

      {/* Filters Section */}
      <div className="bg-muted p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          <Select
            value={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortOrder}
            onValueChange={(value) => handleFilterChange("sortOrder", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Min Price</label>
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                handleFilterChange("minPrice", Number(e.target.value))
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Max Price</label>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", Number(e.target.value))
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Brand</label>
            <Input
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              placeholder="Filter by brand"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-lg mb-8">
          <p>{error}</p>
          <Button
            onClick={() => fetchProducts(1, true, filters)}
            variant="outline"
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {initialLoading ? (
          // Show skeleton loaders for initial load
          Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          // Show products
          products.map((product, index) => {
            if (products.length === index + 1) {
              // Last product - attach ref for infinite scroll
              return (
                <div ref={lastProductElementRef} key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={product._id} product={product} />;
            }
          })
        ) : (
          // No products found
          <div className="col-span-full text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter parameters
            </p>
          </div>
        )}

        {/* Loading more skeletons */}
        {loading &&
          !initialLoading &&
          hasMore &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {/* No more products message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center mt-8 text-muted-foreground">
          You`ve reached the end of the product list
        </div>
      )}
    </div>
  );
}
