/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import useContextData from "@/defaults/custom-component/useContextData";

interface WishlistProduct {
  product: any;
  expiresAt: number;
}

export default function AddWishlist({
  className,
  product,
}: {
  className?: string;
  product: any;
}) {
  const { handleAddWishlist } = useContextData();

  const handleAddWishlistData = () => {
    if (!product) return;
    const existing = localStorage.getItem("WishlistProducts");
    const wishlistProducts: WishlistProduct[] = existing
      ? JSON.parse(existing)
      : [];

    const now = Date.now();
    const validProducts = wishlistProducts.filter(
      (item) => item.expiresAt > now
    );

    const alreadyExists = validProducts.some(
      (item) => item.product.id === product.id
    );

    if (alreadyExists) {
      toast.error("This product is already in your wishlist!");
      return;
    }

    // Add product with individual expiration (30 days from now)
    const newProduct: WishlistProduct = {
      product: product,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    };

    const updatedWishlistProducts = [...validProducts, newProduct];

    // Update localStorage
    localStorage.setItem(
      "WishlistProducts",
      JSON.stringify(updatedWishlistProducts)
    );

    handleAddWishlist(updatedWishlistProducts);

    toast.success(
      "Product added to wishlist successfully! This item will expire in 30 days."
    );
  };

  return (
    <Button
      onClick={handleAddWishlistData}
      variant="outline"
      size="icon"
      className={`rounded-full cursor-pointer shadow-md bg-white hover:bg-red-50 hover:text-red-500 transition-colors ${className}`}
    >
      <Heart className="w-4 h-4" />
    </Button>
  );
}
