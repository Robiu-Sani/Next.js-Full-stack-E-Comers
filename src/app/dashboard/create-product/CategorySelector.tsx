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

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [subCategorySearch, setSubCategorySearch] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);

  const watchedCategory = watch("category");
  const watchedSubCategory = watch("subCategory");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await fetch(
          `/api/v1/product/category?search=${categorySearch}&page=1&limit=20`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [categorySearch]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory) return;

      setIsLoadingSubCategories(true);
      try {
        const res = await fetch(
          `/api/v1/sub-category?category=${selectedCategory}&search=${subCategorySearch}&page=1&limit=20`,
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
  }, [selectedCategory, subCategorySearch]);

  // Set initial values from form
  useEffect(() => {
    if (watchedCategory) {
      setSelectedCategory(watchedCategory);
    }
    if (watchedSubCategory) {
      setSelectedSubCategory(watchedSubCategory);
    }
  }, [watchedCategory, watchedSubCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setValue("category", categoryId);
    setValue("subCategory", ""); // Reset subcategory when category changes
    setSelectedSubCategory("");
    setIsCategoryDropdownOpen(false);
  };

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
    setValue("subCategory", subCategoryId);
    setIsSubCategoryDropdownOpen(false);
  };

  const getSelectedCategoryName = () => {
    const category = categories.find((c) => c._id === selectedCategory);
    return category ? category.name : "Select a category";
  };

  const getSelectedSubCategoryName = () => {
    const subCategory = subCategories.find(
      (sc) => sc._id === selectedSubCategory
    );
    return subCategory ? subCategory.name : "Select a subcategory";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Selection */}
          <div>
            <Label htmlFor="category">Category</Label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full p-2 border rounded-md cursor-pointer"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <span>{getSelectedCategoryName()}</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {isCategoryDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search categories..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {isLoadingCategories ? (
                      <div className="p-4 text-center">
                        Loading categories...
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <div
                          key={category._id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect(category._id)}
                        >
                          {category.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center">No categories found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

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
                          onClick={() =>
                            handleSubCategorySelect(subCategory._id)
                          }
                        >
                          {subCategory.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        {selectedCategory
                          ? "No subcategories found for this category"
                          : "Select a category first"}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelector;
