"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function AddCart({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full shadow-md bg-white hover:bg-green-50 hover:text-green-600 transition-colors ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
    </Button>
  );
}
