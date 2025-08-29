/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import ListProductCard from "../shaire-component/ListProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import useContextData from "@/defaults/custom-component/useContextData";
import { toast } from "sonner";

interface CartProduct {
  product: any;
  expiresAt: number;
  quantity: number;
}

export default function WishlistListHandle({ products }: { products: any }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { handleAddCart } = useContextData();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else if (prev.length < 2) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const handleAddCartData = () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product to add to cart");
      return;
    }

    const getSelectProducts = products.filter((product: any) =>
      selectedProducts.includes(product.id)
    );

    const existing = localStorage.getItem("cartProducts");
    const cartProducts: CartProduct[] = existing ? JSON.parse(existing) : [];
    const now = Date.now();

    // Filter out expired products
    const validProducts = cartProducts.filter((item) => item.expiresAt > now);

    let addedCount = 0;

    // Add each selected product to cart
    getSelectProducts.forEach((product: any) => {
      const existingProductIndex = validProducts.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Product already in cart, increase quantity
        validProducts[existingProductIndex].quantity += 1;
      } else {
        // Add new product to cart
        const newProduct: CartProduct = {
          product: product,
          expiresAt: now + 30 * 24 * 60 * 60 * 1000, // 30 days from now
          quantity: 1,
        };
        validProducts.push(newProduct);
      }
      addedCount++;
    });

    // Save updated cart to localStorage
    localStorage.setItem("cartProducts", JSON.stringify(validProducts));
    handleAddCart(validProducts);

    if (addedCount === 1) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.success(`${addedCount} products added to cart successfully!`);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col p-2 h-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            <h2 className="text-lg font-semibold">My Wishlist</h2>
          </div>
          <Badge variant="secondary">0 items</Badge>
        </div>
        <div className="flex items-center justify-center h-full">
          <p>Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 h-full gap-2">
      {/* Header with item count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" fill="currentColor" />
          <h2 className="text-lg font-semibold">My Wishlist</h2>
        </div>
        <Badge variant="secondary">{products.length} items</Badge>
      </div>

      {/* Products list with scroll */}
      <div className="space-y-2 h-[calc(100vh-180px)] pb-10 scrollHidden overflow-y-auto">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <Heart className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Your wishlist is empty. <br />
              Start adding items you love!
            </p>
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
                    disabled={
                      selectedProducts.length === 2 &&
                      !selectedProducts.includes(product.id)
                    }
                    className="mt-1"
                  />
                  <ListProductCard product={product} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Action buttons - fixed at bottom */}
      {products.length > 0 && (
        <div className="sticky bottom-0 bg-background pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Share Wishlist
            </Button>
            <Button
              className="flex-1"
              onClick={handleAddCartData}
              disabled={selectedProducts.length === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {selectedProducts.length > 0
                ? `Add ${selectedProducts.length} to Cart`
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
