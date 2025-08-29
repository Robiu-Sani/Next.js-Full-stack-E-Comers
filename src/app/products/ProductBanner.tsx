import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function ProductBanner() {
  return (
    <div className="container mx-auto  p-4">
      <Card className="relative  overflow-hidden border-0 bg-gradient-to-br from-purple-600/10 to-blue-600/5 dark:from-purple-600/20 dark:to-blue-600/10">
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 dark:bg-purple-600/20"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/5 dark:bg-blue-600/10"></div>

        {/* Animated elements */}
        <Sparkles className="absolute top-6 right-20 h-6 w-6 animate-pulse text-purple-400/60" />
        <Zap className="absolute bottom-10 left-24 h-5 w-5 animate-ping text-blue-400/40" />
        <Star className="absolute top-1/2 right-1/4 h-4 w-4 animate-bounce text-purple-400/50 delay-300" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>

        {/* Content */}
        <CardContent className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Premium Collection
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Store to Your Doorstep!
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-muted-foreground">
                Discover exclusive products with exceptional quality and style
                for every occasion.
              </p>
              <div className="h-1 w-8 rounded-full bg-purple-600/30"></div>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-purple-600/10 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-600/20 dark:text-purple-400">
                  New Arrivals
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
                  Limited Stock
                </span>
              </div>
            </div>
          </div>
          <Link href={"/offers"}>
            <Button
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-purple-500/25"
              size="lg"
            >
              Offers Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
