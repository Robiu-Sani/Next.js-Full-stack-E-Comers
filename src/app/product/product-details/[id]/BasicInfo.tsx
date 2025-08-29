import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tag, Award, List, Grid3X3 } from "lucide-react";

interface Specification {
  key: string;
  value: string;
}

interface BasicInfoProps {
  data: {
    quickOverview: string[];
    offerPercentage?: number;
    tags: string[];
    brand: string;
    specifications: Specification[];
    category: string;
    subCategory: string;
  };
}

export default function BasicInfo({ data }: BasicInfoProps) {
  const { quickOverview, tags, brand, specifications, category, subCategory } =
    data;

  return (
    <Card className="w-full border-0 shadow-none overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Grid3X3 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Product Information</h2>
        </div>

        {/* Quick Overview */}
        {quickOverview && quickOverview.length > 0 && (
          <>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <List className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Quick Overview</h3>
              </div>
              <ul className="space-y-2 pl-6 list-disc">
                {quickOverview.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {/* Category Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Category
            </h4>
            <p className="font-medium">{category}</p>
          </div>

          {subCategory && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Subcategory
              </h4>
              <p className="font-medium">{subCategory}</p>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Brand */}
        {brand && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Brand</h3>
              </div>
              <p className="text-muted-foreground">{brand}</p>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {/* Specifications */}
        {specifications && specifications.length > 0 && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <List className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Specifications</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-muted"
                  >
                    <span className="text-muted-foreground font-medium">
                      {spec.key}:
                    </span>
                    <span className="text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Product Tags</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
