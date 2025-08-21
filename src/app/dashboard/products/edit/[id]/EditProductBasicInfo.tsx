/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import MultipleImageUpload from "@/shired-component/MultipleImageUpload";
import EditCategorySelector from "./EditCategorySelector";

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
  quentity: number;
  isFeatured: boolean;
  isDeleted: boolean;
  hasOffer: boolean;
  offerEndDate?: Date;
  offerPercentage?: number;
  generalPrice: GeneralPrice;
}

interface ProductBasicInfoProps {
  form: ReturnType<typeof useForm<ProductFormData>>;
  images: string[];
}

const EditProductBasicInfo = ({ form, images }: ProductBasicInfoProps) => {
  const [tagInput, setTagInput] = useState("");
  const [initialImages, setInitialImages] = useState<string[]>(images);
  console.log(form);
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
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
  const watchedImages = watch("images");

  useEffect(() => {
    // Initialize with empty arrays if they're undefined
    if (!watchedTags) {
      setValue("tags", []);
    }

    // Set initial images when component mounts
    const currentImages = getValues("images");
    if (currentImages && currentImages.length > 0) {
      setInitialImages(currentImages);
    }
  }, [watchedTags, setValue, getValues]);

  const handleAddTag = () => {
    const currentTags = watchedTags || [];
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = watchedTags || [];
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const handleImageUpload = (urls: string[]) => {
    setValue("images", urls);
  };

  const handleQuickOverviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const points = e.target.value
      .split("\n")
      .filter((point) => point.trim() !== "");
    setValue("quickOverview", points);
  };

  const getQuickOverviewText = () => {
    const quickOverview = watch("quickOverview") || [];
    return quickOverview.join("\n");
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
          <MultipleImageUpload
            onUpload={handleImageUpload}
            initialImages={initialImages}
          />
          {errors.images && (
            <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
          )}
        </div>

        {/* Quick Overview */}
        <div>
          <Label htmlFor="quickOverview">Quick Overview</Label>
          <Textarea
            id="quickOverview"
            value={getQuickOverviewText()}
            onChange={handleQuickOverviewChange}
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
                  defaultValue={field.key}
                />
                <Input
                  {...register(`specifications.${index}.value`, {
                    required: "Value is required",
                  })}
                  placeholder="Value"
                  className="col-span-3"
                  defaultValue={field.value}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpec(index)}
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
        <EditCategorySelector form={form} />

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
            {(watchedTags || []).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <X
                  className="h-4 w-4 cursor-pointer"
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

export default EditProductBasicInfo;
