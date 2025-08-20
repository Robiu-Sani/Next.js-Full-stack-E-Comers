"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Home,
  ShoppingBag,
  Heart,
  User,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  Package,
  Truck,
  RefreshCw,
} from "lucide-react";

const NotFoundPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Floating particles animation
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    // Colors from your e-commerce theme
    const colors = [
      "rgba(99, 102, 241, 0.6)", // indigo
      "rgba(139, 92, 246, 0.6)", // purple
      "rgba(236, 72, 153, 0.6)", // pink
      "rgba(249, 115, 22, 0.6)", // orange
    ];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Draw particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Popular products data
  const popularProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$129.99",
      image: "/placeholder-headphones.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$199.99",
      image: "/placeholder-watch.jpg",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: "$89.99",
      image: "/placeholder-shoes.jpg",
    },
    {
      id: 4,
      name: "Backpack",
      price: "$59.99",
      image: "/placeholder-backpack.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-200 to-indigo-100 relative overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-indigo-600">
              StyleShop
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              Deals
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-indigo-600 font-medium"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-700">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-700">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-700">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-700">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8 relative">
            <div className="text-9xl font-bold text-indigo-600/10">404</div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Sparkles className="h-16 w-16 text-amber-400 mb-4" />
              <h1 className="text-5xl font-bold text-slate-800 mb-4">
                Page Not Found
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Oops! The page you`re looking for seems to have wandered off.
                Let`s get you back to shopping!
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="What are you looking for?"
                className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-200 focus:border-indigo-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700">
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-6 text-lg"
            >
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-indigo-300 text-indigo-600"
            >
              <Link href="/products" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="px-8 py-6 text-lg"
            >
              <Link href="/contact" className="flex items-center">
                Contact Support
              </Link>
            </Button>
          </div>

          {/* Popular products section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Popular Products You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-slate-200 flex items-center justify-center">
                    <Package className="h-12 w-12 text-slate-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 font-bold">{product.price}</p>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Free Shipping
              </h3>
              <p className="text-slate-600">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <RefreshCw className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Easy Returns
              </h3>
              <p className="text-slate-600">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-slate-600">Premium products</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
