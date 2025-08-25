"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/shired-component/ProductCard";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  images: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/v1/home/product`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full py-6">
      {/* Header */}
      <div className="container mx-auto flex justify-between items-center px-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4 text-primary" />
          <span>Featured Products</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            Loading products...
          </p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* Footer Button */}
      <div className="flex justify-center mt-6">
        <Link href={"/products"}>
          <Button variant="default" className=" shadow-md px-6">
            All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
