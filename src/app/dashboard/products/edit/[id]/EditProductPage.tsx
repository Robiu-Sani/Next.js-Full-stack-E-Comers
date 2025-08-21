/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import EditProductBasicInfo from "./EditProductBasicInfo";
import EditProductPricingAndOffers from "./EditProductPricingAndOffers";

interface PriceVariant {
  _id?: string;
  regularPrice: number;
  salePrice?: number;
  quentity: number;
  sku: string;
}

interface Specification {
  _id?: string;
  key: string;
  value: string;
}

interface Coupon {
  _id?: string;
  name: string;
  Type: "parcent" | "offer" | "freeDelevery";
  totalOffer: number;
}

interface GeneralPrice {
  currentPrice: number;
  prevPrice: number;
  discountPercentage: number;
}

interface ProductFormData {
  name: string;
  images: string[];
  priceVariants: PriceVariant[];
  quickOverview: string[];
  specifications: Specification[];
  details: string;
  category: string;
  subCategory: string;
  coupon: Coupon[];
  tags: string[];
  brand?: string;
  quentity: number;
  isFeatured: boolean;
  isDeleted: boolean;
  hasOffer: boolean;
  offerEndDate?: Date;
  offerPercentage?: number;
  generalPrice: GeneralPrice;
}

export default function EditProductPage() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultImage, setDafaultImage] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      images: [],
      priceVariants: [{ regularPrice: 0, salePrice: 0, quentity: 1, sku: "" }],
      quickOverview: [],
      specifications: [{ key: "", value: "" }],
      details: "",
      category: "",
      subCategory: "",
      coupon: [],
      tags: [],
      brand: "",
      quentity: 0,
      isFeatured: false,
      isDeleted: false,
      hasOffer: false,
      offerEndDate: undefined,
      offerPercentage: 0,
      generalPrice: { currentPrice: 0, prevPrice: 0, discountPercentage: 0 },
    },
  });

  // Fetch product data on mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/product/status/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await res.json();

        if (data.success && data.data) {
          const productData = data.data;
          setDafaultImage(productData.images);

          // Format the data for the form
          const formattedData: ProductFormData = {
            name: productData.name || "",
            images: productData.images || [],
            priceVariants: productData.priceVariants || [],
            quickOverview: productData.quickOverview || [],
            specifications: productData.specifications || [],
            details: productData.details || "",
            category: productData.category || "",
            subCategory: productData.subCategory || "",
            coupon: productData.coupon || [],
            tags: productData.tags || [],
            brand: productData.brand || "",
            quentity: productData.quentity || 0,
            isFeatured: productData.isFeatured || false,
            isDeleted: productData.isDeleted || false,
            hasOffer: productData.hasOffer || false,
            offerEndDate: productData.offerEndDate
              ? new Date(productData.offerEndDate)
              : undefined,
            offerPercentage: productData.offerPercentage || 0,
            generalPrice: productData.generalPrice || {
              currentPrice: 0,
              prevPrice: 0,
              discountPercentage: 0,
            },
          };

          setInitialData(formattedData);
          form.reset(formattedData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Format data for API
      const formattedData = {
        ...data,
        offerEndDate: data.offerEndDate
          ? new Date(data.offerEndDate)
          : undefined,
      };

      const res = await fetch(`/api/v1/product/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (initialData) {
      form.reset(initialData);
      toast.success("Form reset to original values");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-0 border-0 shadow-none py-6">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <EditProductBasicInfo form={form} images={defaultImage} />
              <EditProductPricingAndOffers form={form} />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!initialData}
                >
                  Reset Changes
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
