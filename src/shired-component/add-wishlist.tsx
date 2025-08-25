"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function AddWishlist({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full cursor-pointer shadow-md bg-white hover:bg-red-50 hover:text-red-500 transition-colors ${className}`}
    >
      <Heart className="w-4 h-4" />
    </Button>
  );
}
