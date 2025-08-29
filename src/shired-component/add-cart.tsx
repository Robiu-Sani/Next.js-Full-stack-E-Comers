/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import useContextData from "@/defaults/custom-component/useContextData";

interface CartProduct {
  product: any;
  expiresAt: number;
  quantity: number;
}

export default function AddCart({
  className,
  product,
}: {
  className?: string;
  product: any;
}) {
  const { handleAddCart } = useContextData();

  const handleAddCartData = () => {
    if (!product) return;
    const existing = localStorage.getItem("cartProducts");
    const cartProducts: CartProduct[] = existing ? JSON.parse(existing) : [];
    const now = Date.now();
    const validProducts = cartProducts.filter((item) => item.expiresAt > now);

    const existingProductIndex = validProducts.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingProductIndex !== -1) {
      validProducts[existingProductIndex].quantity += 1;
      toast.success("Product quantity increased in your cart!");
    } else {
      const newProduct: CartProduct = {
        product: product,
        expiresAt: now + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        quantity: 1,
      };
      validProducts.push(newProduct);
      toast.success(
        "Product added to cart successfully! This item will expire in 30 days."
      );
    }

    localStorage.setItem("cartProducts", JSON.stringify(validProducts));
    handleAddCart(validProducts);
  };

  return (
    <Button
      onClick={handleAddCartData}
      variant="outline"
      size="icon"
      className={`rounded-full cursor-pointer shadow-md bg-white hover:bg-green-50 hover:text-green-600 transition-colors ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
    </Button>
  );
}
