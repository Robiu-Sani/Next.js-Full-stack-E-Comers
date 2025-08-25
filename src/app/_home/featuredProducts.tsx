"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/shired-component/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Timer, Crown, Zap, ArrowRight } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  images: string[];
  featuredExpiry?: string;
  stock?: number;
  sold?: number;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
          if (data.products.length > 0 && data.products[0].featuredExpiry) {
            startCountdown(data.products[0].featuredExpiry);
          }
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const startCountdown = (expiryDate: string) => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const distance = expiry - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  };

  return (
    <section className="w-full py-12 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10"></div>

      <div className="container mx-auto px-4 relative">
        {/* Header section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-primary rounded-full">
                <Crown className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground">
                  Limited time exclusive offers
                </p>
              </div>
            </div>

            {countdown.days +
              countdown.hours +
              countdown.minutes +
              countdown.seconds >
              0 && (
              <Card className="bg-background">
                <CardContent className="p-3 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-destructive" />
                  <span className="font-mono text-sm">
                    {countdown.days}d : {countdown.hours}h : {countdown.minutes}
                    m : {countdown.seconds}s
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    Ending Soon
                  </Badge>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/10"
              >
                <div className="relative">
                  <Badge className="absolute top-2 left-2 z-10 bg-destructive">
                    <Zap className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <ProductCard product={product} />

                  {/* Stock progress bar for urgency */}
                  {product.stock && product.sold !== undefined && (
                    <div className="p-3 pt-0">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Sold: {product.sold}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <Progress
                        value={
                          (product.sold / (product.sold + product.stock)) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No featured products available at the moment.
              </p>
            </CardContent>
          </Card>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => router.push("/featured")}
            className="gap-2"
            size="lg"
          >
            View All Featured Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
