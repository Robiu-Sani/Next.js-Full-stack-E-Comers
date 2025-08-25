/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function AddCompare({
  className,
  product,
}: {
  className?: string;
  product: any;
}) {
  const handleCompare = () => {
    if (!product) return;

    // Get current compare list from localStorage
    const existing = localStorage.getItem("compareProducts");
    const compareList: (typeof product)[] = existing
      ? JSON.parse(existing)
      : [];

    // Check if product already exists
    const alreadyExists = compareList.some((item) => item.id === product.id);
    if (alreadyExists) {
      toast.error("This product is already in your compare list!");
      return;
    }

    // Add product to compare list
    compareList.push(product);
    localStorage.setItem("compareProducts", JSON.stringify(compareList));

    toast.success("Product added to compare successfully!");
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
