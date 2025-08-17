/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: Category;
}

interface ProductFormData {
  name: string;
  images: string[];
  priceVariants: any[];
  quickOverview: string[];
  specifications: any[];
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
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
}

interface CategorySelectorProps {
  form: ReturnType<typeof useForm<ProductFormData>>;
}

const CategorySelector = ({ form }: CategorySelectorProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategorySearch, setSubCategorySearch] = useState("");
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] =
    useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);

  const watchedSubCategory = watch("subCategory");

  // Fetch all subcategories with their categories
  useEffect(() => {
    const fetchSubCategories = async () => {
      setIsLoadingSubCategories(true);
      try {
        const res = await fetch(
          `/api/v1/sub-category?search=${subCategorySearch}&page=1&limit=20`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setSubCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setIsLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [subCategorySearch]);

  // Set initial value from form
  useEffect(() => {
    if (watchedSubCategory && !selectedSubCategory) {
      setSelectedSubCategory(watchedSubCategory);
    }
  }, [watchedSubCategory]);

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory._id);
    setValue("subCategory", subCategory._id);
    setValue("category", subCategory.category._id); // Set category from subcategory
    setIsSubCategoryDropdownOpen(false);
  };

  const getSelectedSubCategoryName = () => {
    const subCategory = subCategories.find(
      (sc) => sc._id === selectedSubCategory
    );
    return subCategory
      ? `${subCategory.category.name} - ${subCategory.name}`
      : "Select a subcategory";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Subcategory Selection */}
          <div>
            <Label htmlFor="subCategory">Subcategory</Label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full p-2 border rounded-md cursor-pointer"
                onClick={() =>
                  setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen)
                }
              >
                <span>{getSelectedSubCategoryName()}</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {isSubCategoryDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search subcategories..."
                        value={subCategorySearch}
                        onChange={(e) => setSubCategorySearch(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {isLoadingSubCategories ? (
                      <div className="p-4 text-center">
                        Loading subcategories...
                      </div>
                    ) : subCategories.length > 0 ? (
                      subCategories.map((subCategory) => (
                        <div
                          key={subCategory._id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSubCategorySelect(subCategory)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {subCategory.category.name}
                            </span>
                            <span className="font-medium">
                              {subCategory.name}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        No subcategories found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors.subCategory && (
              <p className="text-sm text-red-500 mt-1">
                {errors.subCategory.message}
              </p>
            )}
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelector;
