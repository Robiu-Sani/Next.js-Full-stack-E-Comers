/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ListProductCard from "../shaire-component/ListProductCard";

interface CompaireListHandleProps {
  products: any[];
}

export default function CompaireListHandle({
  products,
}: CompaireListHandleProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const handleCompare = () => {
    if (selectedProducts.length === 2) {
      console.log("Comparing products:", selectedProducts);
      // Add your comparison logic here
    }
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 h-full gap-2">
      {/* Header with selection info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Select 2 products to compare
        </p>
        <Badge variant="secondary">{selectedProducts.length}/2 selected</Badge>
      </div>

      {/* Products list with scroll */}
      <div className="space-y-2 h-[calc(100vh-180px)] pb-10 scrollHidden overflow-y-auto">
        {products.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              No products in your compare list
            </p>
          </div>
        ) : (
          products.map((product) => (
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

      {/* Compare button - fixed at bottom */}
      {selectedProducts.length === 2 && (
        <div className="sticky bottom-0 bg-background pt-4 border-t">
          <Button className="w-full" size="lg" onClick={handleCompare}>
            Compare Selected Products
          </Button>
        </div>
      )}
    </div>
  );
}
