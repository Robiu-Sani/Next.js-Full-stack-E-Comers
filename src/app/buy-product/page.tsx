import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles, Star, Zap, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ParchessProducts from './ParchessProducts'

export default function page() {
  return (
    <div className="top-padding ">
      <div className="container mx-auto mt-4">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-pink-600/10 dark:from-purple-600/20 dark:via-blue-600/10 dark:to-pink-600/20">
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 dark:bg-purple-600/20"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/5 dark:bg-blue-600/10"></div>
          <div className="absolute top-1/4 -right-4 h-16 w-16 rounded-full bg-pink-600/10 dark:bg-pink-600/20"></div>

          {/* Animated elements */}
          <Sparkles className="absolute top-6 right-20 h-6 w-6 animate-pulse text-purple-400/60" />
          <Zap className="absolute bottom-10 left-24 h-5 w-5 animate-ping text-blue-400/40" />
          <Star className="absolute top-1/2 right-1/4 h-4 w-4 animate-bounce text-purple-400/50 delay-300" />
          <ShoppingBag className="absolute bottom-16 right-32 h-5 w-5 animate-pulse text-pink-400/60 delay-700" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>

          {/* Content */}
          <CardContent className="relative z-10  flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="space-y-4 flex-1">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                Your Ultimate Shopping Destination
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Premium Products Delivered!
                </span>
              </h3>


              {/* Badges */}
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center rounded-full bg-purple-600/10 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-600/20 dark:text-purple-400">
                  🚀 New Arrivals
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
                  ⚡ Limited Time Offers
                </span>
                <span className="inline-flex items-center rounded-full bg-pink-600/10 px-3 py-1 text-xs font-medium text-pink-600 dark:bg-pink-600/20 dark:text-pink-400">
                  🔥 Best Sellers
                </span>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col gap-4">
              <Link href={"/products"}>
                <Button
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <p className="text-xs text-center text-muted-foreground">
                Join 10,000+ satisfied customers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <ParchessProducts />
    </div>
  )
}