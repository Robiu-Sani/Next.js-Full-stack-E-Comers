"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  ShoppingBag,
  Sparkles,
  Package,
  Truck,
  RefreshCw,
} from "lucide-react";
import Products from "./_home/Products";

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

  return (
    <div className="min-h-screen pt-[200px] flex flex-col bg-gradient-to-br from-slate-200 to-indigo-100 relative overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-9xl font-bold text-indigo-600/20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Package className="h-24 w-24 text-indigo-600 mx-auto mb-4" />
                  <h1 className="text-4xl font-bold text-slate-800 mb-2">
                    Page Not Found
                  </h1>
                  <p className="text-xl text-slate-600 max-w-md mx-auto">
                    Oops! The page you`re looking for seems to have wandered
                    off.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex mt-20 flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 "
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
              className="px-8  border-indigo-300 text-indigo-600"
            >
              <Link href="/products" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="px-8 ">
              <Link href="/templates/support" className="flex items-center">
                Contact Support
              </Link>
            </Button>
          </div>

          {/* Popular products section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Popular Products You Might Like
            </h2>
            <Products />
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
