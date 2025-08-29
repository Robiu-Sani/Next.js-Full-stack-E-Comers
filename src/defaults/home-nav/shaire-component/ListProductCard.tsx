/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

export default function ListProductCard({ product }: { product: any }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start gap-3">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
          <p className="text-primary font-semibold mt-1">
            ৳{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
