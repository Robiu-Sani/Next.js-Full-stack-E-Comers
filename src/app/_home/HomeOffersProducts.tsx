"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/shired-component/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Tag } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  images: string[];
  offerEndDate?: string;
  offerPercentage?: number;
}

export default function HomeOffersProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/v1/home/offer-product`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching offer products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full ">
      <div className="container mx-auto rounded-2xl p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 shadow-inner">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tag className="w-4 h-4 text-primary" />
            <span>Special Offers</span>
          </div>
          <Button
            variant="outline"
            className="rounded-xl text-sm"
            onClick={() => router.push("/offers")}
          >
            View All
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000, // 3 seconds
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {products.length > 0 ? (
              products.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10 w-full">
                No offer products available.
              </p>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
