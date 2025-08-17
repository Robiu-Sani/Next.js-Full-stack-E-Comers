"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricingAndOffers from "./ProductPricingAndOffers";

interface PriceVariant {
  regularPrice: number;
  salePrice?: number;
  quentity: number;
  sku: string;
}

interface Specification {
  key: string;
  value: string;
}

interface Coupon {
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

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("productFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, [form]);

  // Save data to localStorage on form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("productFormData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

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

      const res = await fetch("/api/v1/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully!");
      form.reset();
      localStorage.removeItem("productFormData");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="p-0 border-0 shadow-none py-6">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ProductBasicInfo form={form} />
              <ProductPricingAndOffers form={form} />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    localStorage.removeItem("productFormData");
                  }}
                >
                  Reset Form
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
