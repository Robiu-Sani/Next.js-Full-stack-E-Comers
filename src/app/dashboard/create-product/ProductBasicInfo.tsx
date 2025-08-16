/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import MultipleImageUpload from "@/shired-component/MultipleImageUpload";
import CategorySelector from "./CategorySelector";

interface PriceVariant {
  regularPrice: number;
  salePrice?: number;
  quentity: number;
  sku: string;
}

interface Specification {
  key: string;
  value: string;
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
  specifications: Specification[];
  details: string;
  category: string;
  subCategory: string;
  coupon: any[];
  tags: string[];
  brand?: string;
  isFeatured: boolean;
  isDeleted: boolean;
  hasOffer: boolean;
  offerEndDate?: Date;
  offerPercentage?: number;
  generalPrice: GeneralPrice;
}

interface ProductBasicInfoProps {
  form: ReturnType<typeof useForm<ProductFormData>>;
}

const ProductBasicInfo = ({ form }: ProductBasicInfoProps) => {
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const watchedTags = watch("tags");
  const watchedCategory = watch("category");

  const handleAddTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      watchedTags.filter((t) => t !== tag)
    );
  };

  const handleImageUpload = (urls: string[]) => {
    setValue("images", urls);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Product Name */}
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <Label>Product Images</Label>
          <MultipleImageUpload onUpload={handleImageUpload} />
          {errors.images && (
            <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
          )}
        </div>

        {/* Quick Overview */}
        <div>
          <Label htmlFor="quickOverview">Quick Overview</Label>
          <Textarea
            id="quickOverview"
            {...register("quickOverview")}
            placeholder="Enter quick overview points (one per line)"
            rows={3}
          />
        </div>

        {/* Specifications */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Specifications</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSpec({ key: "", value: "" })}
            >
              Add Specification
            </Button>
          </div>
          <div className="space-y-3">
            {specFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-5 gap-2">
                <Input
                  {...register(`specifications.${index}.key`, {
                    required: "Key is required",
                  })}
                  placeholder="Key"
                />
                <Input
                  {...register(`specifications.${index}.value`, {
                    required: "Value is required",
                  })}
                  placeholder="Value"
                  className="col-span-3"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpec(index)}
                  disabled={specFields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <Label htmlFor="details">Product Details</Label>
          <Textarea
            id="details"
            {...register("details", {
              required: "Product details are required",
            })}
            placeholder="Enter detailed product description"
            rows={5}
          />
          {errors.details && (
            <p className="text-sm text-red-500 mt-1">
              {errors.details.message}
            </p>
          )}
        </div>

        {/* Category and Subcategory */}
        <CategorySelector form={form} />

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {watchedTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            {...register("brand")}
            placeholder="Enter product brand"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBasicInfo;
