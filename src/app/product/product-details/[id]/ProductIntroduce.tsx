/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tag, CheckCircle } from "lucide-react";
import ActionsButtonComponent from "./ActionsButtonComponent";

interface PriceVariant {
  regularPrice: number;
  salePrice: number;
  quentity: number;
  sku: string;
}

interface ProductIntroduceProps {
  data: {
    quentity: any;
    name: string;
    offerPercentage?: number;
    generalPrice: {
      currentPrice: number;
      prevPrice: number;
      discountPercentage: number;
    };
    priceVariants: PriceVariant[];
    details: string;
  };
}

export default function ProductIntroduce({
  data,
  infoData,
}: {
  data: ProductIntroduceProps["data"];
  infoData: any;
}) {
  const { name, offerPercentage, generalPrice, priceVariants, details } = data;

  // Find the variant with the lowest price
  const lowestPriceVariant =
    priceVariants.length > 0
      ? priceVariants.reduce((lowest, variant) => {
          return variant.salePrice < lowest.salePrice ? variant : lowest;
        }, priceVariants[0])
      : null;

  return (
    <Card className="w-full shadow-none border-0 overflow-hidden">
      <CardContent className="p-6">
        {/* Product Name and Badges */}
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

          <div className="flex flex-wrap gap-2">
            {offerPercentage && offerPercentage > 0 && (
              <Badge variant="destructive" className="px-2 py-1">
                <Tag className="h-3 w-3 mr-1" />
                {offerPercentage}% OFF
              </Badge>
            )}

            {generalPrice.discountPercentage > 0 && (
              <Badge variant="outline" className="px-2 py-1 bg-primary/10">
                Save {generalPrice.discountPercentage}%
              </Badge>
            )}

            <Badge variant="secondary" className="px-2 py-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              In Stock
            </Badge>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Pricing Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-primary">
              BDT: {generalPrice.currentPrice.toFixed(2)}
            </span>

            {generalPrice.prevPrice > generalPrice.currentPrice && (
              <span className="text-lg text-muted-foreground line-through">
                BDT: {generalPrice.prevPrice.toFixed(2)}
              </span>
            )}

            {generalPrice.discountPercentage > 0 && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Save {generalPrice.discountPercentage}%
              </span>
            )}
          </div>

          {priceVariants.length > 1 && lowestPriceVariant && (
            <p className="text-sm text-muted-foreground">
              From ${lowestPriceVariant.salePrice.toFixed(2)}
              {lowestPriceVariant.regularPrice >
                lowestPriceVariant.salePrice && (
                <span className="line-through ml-1">
                  ${lowestPriceVariant.regularPrice.toFixed(2)}
                </span>
              )}
            </p>
          )}
        </div>

        <Separator className="my-6" />

        {/* Product Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Product Details</h3>
          <p className="text-muted-foreground leading-relaxed">{details}</p>
        </div>

        {priceVariants.length > 1 && (
          <>
            <Separator className="my-6" />

            {/* Variants Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Available Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priceVariants.map((variant, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer transition-all hover:border-primary"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{variant.sku}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {variant.quentity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${variant.salePrice.toFixed(2)}
                          </p>
                          {variant.regularPrice > variant.salePrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ${variant.regularPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        <ActionsButtonComponent product={infoData} />
      </CardContent>
    </Card>
  );
}
