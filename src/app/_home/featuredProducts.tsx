"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Crown,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  images: string[];
  rating?: number;
  isBestSeller?: boolean;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/v1/home/featured-product`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (currentIndex < Math.ceil(products.length / 2) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get products for current slide (2 products per slide)
  const currentProducts = products.slice(
    currentIndex * 2,
    currentIndex * 2 + 2
  );

  return (
    <section className="w-full py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl mb-8 border border-border/50 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Premium Featured Products
                </h2>
                <p className="text-sm text-muted-foreground">
                  Curated selection of our best items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full border">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
              <span className="text-sm font-medium">Trending Now</span>
            </div>
          </div>
        </div>

        {/* Content Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left Side - Gradient Card with Carousel */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-border/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Featured Collection</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  disabled={currentIndex >= Math.ceil(products.length / 2) - 1}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-muted/30 rounded-xl h-40 animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  ></div>
                ))}
              </div>
            ) : currentProducts.length > 0 ? (
              <div ref={carouselRef} className="space-y-6">
                {currentProducts.map((product) => (
                  <div
                    onClick={() =>
                      router.push(`/product/product-details/${product._id}`)
                    }
                    key={product._id}
                    className="transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative bg-background rounded-xl border overflow-hidden shadow-md p-4 flex">
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            width={100}
                            height={100}
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          {product.rating && (
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">
                                {product.rating}
                              </span>
                            </div>
                          )}
                          {product.isBestSeller && (
                            <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              Best Seller
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="font-bold text-foreground">
                            ${product.generalPrice.currentPrice}
                          </span>
                          {product.generalPrice.prevPrice >
                            product.generalPrice.currentPrice && (
                            <span className="ml-2 text-xs text-muted-foreground line-through">
                              ${product.generalPrice.prevPrice}
                            </span>
                          )}
                          {product.generalPrice.discountPercentage > 0 && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                              Save {product.generalPrice.discountPercentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Featured Products
                </h3>
                <p className="text-muted-foreground">
                  Check back later for our featured selections
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary flex items-center gap-1"
                onClick={() => router.push("/featured-products")}
              >
                View all featured products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Side - Creative Design */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full translate-y-16 -translate-x-16"></div>

              {/* Content */}
              <div className="relative z-20">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Exclusive Collection
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">
                    Why Our Featured Products?
                  </h3>
                  <p className="text-muted-foreground">
                    Each product in our featured collection is handpicked by our
                    experts for exceptional quality, design, and value.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Premium Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Rigorous quality standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Trending Designs</h4>
                      <p className="text-sm text-muted-foreground">
                        Most popular choices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <Crown className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Exclusive Deals</h4>
                      <p className="text-sm text-muted-foreground">
                        Special offers just for you
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25"
                  onClick={() => router.push("/featured-products")}
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
