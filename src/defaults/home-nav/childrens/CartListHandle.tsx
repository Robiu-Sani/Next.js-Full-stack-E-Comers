/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ListProductCard from "../shaire-component/ListProductCard";
import { Checkbox } from "@/components/ui/checkbox";

interface Product {
  id: string;
  name: string;
  image: string;
  image2: string;
  price: number;
}

export default function CartListHandle({ products }: { products: Product[] }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      // If all are selected, deselect all
      setSelectedProducts([]);
    } else {
      // Select all products
      setSelectedProducts(products.map((item) => item.id));
    }
  };

  // const handleRemoveProduct = (productId: string) => {
  //   const updatedCart = cartItems.filter(
  //     (item) => item.product.id !== productId
  //   );
  //   setCartItems(updatedCart);
  //   setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  //   localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  // };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, productId) => {
      const item = products.find((item) => item.id === productId);
      return total + (item ? item.price : 0);
    }, 0);
  };

  const handleCheckout = () => {
    if (selectedProducts.length > 0) {
      console.log("Processing order for products:", selectedProducts);
      // Add your checkout logic here
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header with selection info and select all option */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={
              selectedProducts.length === products.length && products.length > 0
            }
            onCheckedChange={handleSelectAll}
            disabled={products.length === 0}
          />
          <p className="text-sm text-muted-foreground">
            Select all ({products.length} items)
          </p>
        </div>
        <Badge variant="secondary">{selectedProducts.length} selected</Badge>
      </div>

      {/* Products list with scroll */}
      <div className="space-y-3 h-[calc(100vh-200px)] pb-20 overflow-y-auto">
        {products.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          products.map((product: any) => (
            <Card
              key={product.id}
              className={`cursor-pointer p-0 rounded-md transition-all ${
                selectedProducts.includes(product.id)
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
              onClick={() => handleSelectProduct(product.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleSelectProduct(product.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  <ListProductCard product={product} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Checkout section - fixed at bottom */}
      {selectedProducts.length > 0 && (
        <div className="sticky bottom-0 bg-background py-2 border-t">
          <div className="mb-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total: </span>
              <span className="font-bold text-lg">
                ৳{calculateTotal().toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedProducts.length} item
              {selectedProducts.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <Button className="w-full" size="lg" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
