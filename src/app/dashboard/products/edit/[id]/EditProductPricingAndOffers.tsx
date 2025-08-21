/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface PriceVariant {
  _id?: string;
  regularPrice: number;
  salePrice?: number;
  quentity: number;
  sku: string;
}

interface Coupon {
  _id?: string;
  name: string;
  Type: "parcent" | "offer" | "freeDelevery";
  totalOffer: number;
}

interface GeneralPrice {
  currentPrice: number;
  prevPrice: number;
  discountPercentage: number;
}

interface ProductFormData {
  name: string;
  images: string[];
  priceVariants: PriceVariant[];
  quickOverview: string[];
  specifications: any[];
  details: string;
  category: string;
  subCategory: string;
  coupon: Coupon[];
  tags: string[];
  brand?: string;
  quentity: number;
  isFeatured: boolean;
  isDeleted: boolean;
  hasOffer: boolean;
  offerEndDate?: Date;
  offerPercentage?: number;
  generalPrice: GeneralPrice;
}

interface ProductPricingAndOffersProps {
  form: ReturnType<typeof useForm<ProductFormData>>;
}

const EditProductPricingAndOffers = ({
  form,
}: ProductPricingAndOffersProps) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: "priceVariants",
  });

  const {
    fields: couponFields,
    append: appendCoupon,
    remove: removeCoupon,
  } = useFieldArray({
    control,
    name: "coupon",
  });

  const watchedHasOffer = watch("hasOffer");
  const watchedGeneralPrice = watch("generalPrice");
  const watchedOfferEndDate = watch("offerEndDate");
  const watchedIsFeatured = watch("isFeatured");

  // Calculate discount percentage when prices change
  useEffect(() => {
    if (
      watchedGeneralPrice?.prevPrice > 0 &&
      watchedGeneralPrice?.currentPrice > 0
    ) {
      const discount =
        ((watchedGeneralPrice.prevPrice - watchedGeneralPrice.currentPrice) /
          watchedGeneralPrice.prevPrice) *
        100;
      setValue("generalPrice.discountPercentage", Math.round(discount));
    }
  }, [
    watchedGeneralPrice?.prevPrice,
    watchedGeneralPrice?.currentPrice,
    setValue,
  ]);

  // Format date for input field
  const formatDateForInput = (date: Date | string | undefined) => {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Offers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Variants */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Price Variants</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendPrice({
                  regularPrice: 0,
                  salePrice: 0,
                  quentity: 1,
                  sku: "",
                })
              }
            >
              Add Variant
            </Button>
          </div>
          <div className="space-y-4">
            {priceFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`priceVariants.${index}.regularPrice`}>
                      Regular Price
                    </Label>
                    <Input
                      type="number"
                      id={`priceVariants.${index}.regularPrice`}
                      {...register(`priceVariants.${index}.regularPrice`, {
                        required: "Regular price is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Price must be positive" },
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`priceVariants.${index}.salePrice`}>
                      Sale Price
                    </Label>
                    <Input
                      type="number"
                      id={`priceVariants.${index}.salePrice`}
                      {...register(`priceVariants.${index}.salePrice`, {
                        valueAsNumber: true,
                        min: { value: 0, message: "Price must be positive" },
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`priceVariants.${index}.quentity`}>
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      id={`priceVariants.${index}.quentity`}
                      {...register(`priceVariants.${index}.quentity`, {
                        required: "Quantity is required",
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                      })}
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex-1">
                      <Label htmlFor={`priceVariants.${index}.sku`}>SKU</Label>
                      <Input
                        id={`priceVariants.${index}.sku`}
                        {...register(`priceVariants.${index}.sku`, {
                          required: "SKU is required",
                        })}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePrice(index)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.priceVariants && (
            <p className="text-sm text-red-500 mt-1">
              {errors.priceVariants.message}
            </p>
          )}
        </div>

        {/* General Price */}
        <div>
          <Label htmlFor="quentity">Total Quantity</Label>
          <Input
            type="number"
            id="quentity"
            {...register("quentity", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: { value: 0, message: "Quantity must be positive" },
            })}
          />
        </div>

        <div>
          <Label>General Pricing</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <Label htmlFor="generalPrice.currentPrice">Current Price</Label>
              <Input
                type="number"
                id="generalPrice.currentPrice"
                {...register("generalPrice.currentPrice", {
                  required: "Current price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be positive" },
                })}
              />
            </div>
            <div>
              <Label htmlFor="generalPrice.prevPrice">Previous Price</Label>
              <Input
                type="number"
                id="generalPrice.prevPrice"
                {...register("generalPrice.prevPrice", {
                  required: "Previous price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be positive" },
                })}
              />
            </div>
            <div>
              <Label htmlFor="generalPrice.discountPercentage">
                Discount %
              </Label>
              <Input
                type="number"
                id="generalPrice.discountPercentage"
                {...register("generalPrice.discountPercentage", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Discount must be positive" },
                  max: { value: 100, message: "Discount cannot exceed 100%" },
                })}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Coupons */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Coupons</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendCoupon({ name: "", Type: "parcent", totalOffer: 0 })
              }
            >
              Add Coupon
            </Button>
          </div>
          <div className="space-y-4">
            {couponFields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`coupon.${index}.name`}>Coupon Name</Label>
                    <Input
                      id={`coupon.${index}.name`}
                      {...register(`coupon.${index}.name`, {
                        required: "Coupon name is required",
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`coupon.${index}.Type`}>Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(`coupon.${index}.Type`, value as any)
                      }
                      defaultValue={field.Type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parcent">Percentage</SelectItem>
                        <SelectItem value="offer">Fixed Amount</SelectItem>
                        <SelectItem value="freeDelevery">
                          Free Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`coupon.${index}.totalOffer`}>
                      Offer Value
                    </Label>
                    <Input
                      type="number"
                      id={`coupon.${index}.totalOffer`}
                      {...register(`coupon.${index}.totalOffer`, {
                        required: "Offer value is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Value must be positive" },
                      })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCoupon(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Flags */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFeatured"
              {...register("isFeatured")}
              checked={watchedIsFeatured}
              onCheckedChange={(checked) => setValue("isFeatured", !!checked)}
            />
            <Label htmlFor="isFeatured">Featured Product</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasOffer"
              {...register("hasOffer")}
              checked={watchedHasOffer}
              onCheckedChange={(checked) => setValue("hasOffer", !!checked)}
            />
            <Label htmlFor="hasOffer">Has Offer</Label>
          </div>
        </div>

        {/* Offer Settings */}
        {watchedHasOffer && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="offerPercentage">Offer Percentage</Label>
              <Input
                type="number"
                id="offerPercentage"
                {...register("offerPercentage", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Percentage must be positive" },
                  max: { value: 100, message: "Percentage cannot exceed 100" },
                })}
              />
            </div>
            <div>
              <Label htmlFor="offerEndDate">Offer End Date</Label>
              <Input
                type="date"
                id="offerEndDate"
                {...register("offerEndDate", {
                  valueAsDate: true,
                })}
                defaultValue={formatDateForInput(watchedOfferEndDate)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditProductPricingAndOffers;
