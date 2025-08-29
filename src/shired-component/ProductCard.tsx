/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AddCart from "./add-cart";
import AddWishlist from "./add-wishlist";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddCompaire from "./add-compaire";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();

  const firstImage = product?.images?.[0];
  const secondImage =
    product?.images?.length > 1 ? product?.images?.[1] : product?.images?.[0];

  const compaireData = {
    id: product._id,
    name: product.name,
    image: firstImage,
    image2: secondImage,
    price: product.generalPrice.currentPrice,
  };

  return (
    <Card className="relative group flex flex-col justify-between cursor-pointer p-0 overflow-hidden border rounded-xl shadow-md hover:shadow-lg transition-all">
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <AddWishlist product={compaireData} />
        <AddCart product={compaireData} />
        <AddCompaire product={compaireData} />
      </div>

      {/* Product Image */}
      <div
        onClick={() => router.push(`/products/product-details/${product._id}`)}
        className="relative w-full aspect-square overflow-hidden"
      >
        <Image
          width={300}
          height={300}
          src={firstImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          width={300}
          height={300}
          src={secondImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Product Info */}
      <CardContent
        onClick={() => router.push(`/products/product-details/${product._id}`)}
        className="px-3 -mt-4"
      >
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-primary">
            ৳{product.generalPrice.currentPrice.toLocaleString()}
          </span>
          {product.generalPrice.prevPrice && (
            <span className="text-xs line-through text-gray-400">
              ৳{product.generalPrice.prevPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.generalPrice.discountPercentage > 0 && (
          <span className="text-xs text-green-600 font-medium">
            -{product.generalPrice.discountPercentage}% off
          </span>
        )}
      </CardContent>

      {/* Footer with Button */}
      <CardFooter className="p-3 -mt-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/product-details/${product._id}`);
          }}
          className="w-full cursor-pointer"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
