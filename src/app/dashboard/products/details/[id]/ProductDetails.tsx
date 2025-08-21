/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Define TypeScript interfaces for the product data
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
  category: string;
  subCategory: string;
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

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/product/status/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Product deleted successfully");
        router.push("/dashboard/products");
      } else {
        throw new Error(result.message || "Failed to delete product");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error deleting product"
      );
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/products/edit/${id}`);
  };

  const nextImage = () => {
    if (product) {
      setSelectedImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you`re looking for doesn`t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-white dark:bg-zinc-900 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            {product.hasOffer && (
              <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
                {product.offerPercentage}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-muted"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.totalReviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-3xl font-bold">
                BTD{product.generalPrice.currentPrice.toLocaleString()}
              </span>
              {product.generalPrice.prevPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  BTD{product.generalPrice.prevPrice.toLocaleString()}
                </span>
              )}
              {product.generalPrice.discountPercentage > 0 && (
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save {product.generalPrice.discountPercentage}%
                </span>
              )}
            </div>

            {product.hasOffer && (
              <div className="text-sm text-muted-foreground">
                Special offer ends{" "}
                {new Date(product.offerEndDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Quick Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Overview</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.quickOverview.map((item, index) => (
                <li key={index} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stock Status */}
          <div>
            <p className="text-sm">
              <span
                className={
                  product.quentity > 0
                    ? "text-green-600 font-medium"
                    : "text-destructive font-medium"
                }
              >
                {product.quentity > 0
                  ? `In Stock (${product.quentity} available)`
                  : "Out of Stock"}
              </span>
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.specifications.map((spec) => (
                <div key={spec._id} className="flex">
                  <span className="font-medium text-sm w-32 flex-shrink-0">
                    {spec.key}:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.details}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              product ``{product.name}`` from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
