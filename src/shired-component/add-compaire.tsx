/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import useContextData from "@/defaults/custom-component/useContextData";

// Interface for individual compare product with expiration
interface CompareProduct {
  product: any;
  expiresAt: number; // Individual expiration timestamp
}

export default function AddCompare({
  className,
  product,
}: {
  className?: string;
  product: any;
}) {
  const { handleAddCompare } = useContextData();

  const handleCompare = () => {
    if (!product) return;

    // Get current compare list from localStorage
    const existing = localStorage.getItem("compareProducts");
    const compareData: CompareProduct[] = existing ? JSON.parse(existing) : [];

    // Clean up expired products first
    const now = Date.now();
    const validProducts = compareData.filter((item) => item.expiresAt > now);

    // Check if product already exists in valid products
    const alreadyExists = validProducts.some(
      (item) => item.product.id === product.id
    );

    if (alreadyExists) {
      toast.error("This product is already in your compare list!");
      return;
    }

    // Check if maximum limit reached
    if (validProducts.length >= 4) {
      toast.error("You can only compare up to 4 products at a time!");
      return;
    }

    // Add product with individual expiration (3 days from now)
    const newCompareProduct: CompareProduct = {
      product: product,
      expiresAt: now + 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    };

    // Update with cleaned products and new product
    const updatedCompareData = [...validProducts, newCompareProduct];

    // Update localStorage
    localStorage.setItem("compareProducts", JSON.stringify(updatedCompareData));

    handleAddCompare(updatedCompareData);

    toast.success(
      "Product added to compare successfully! This item will be available for comparison for 3 days."
    );
  };

  return (
    <Button
      onClick={handleCompare}
      variant="outline"
      size="icon"
      className={`rounded-full cursor-pointer shadow-md bg-white hover:bg-green-50 hover:text-green-600 transition-colors ${className}`}
    >
      <ArrowLeftRight className="w-4 h-4" />
    </Button>
  );
}
