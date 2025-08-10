/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ICategory } from "@/interface/category.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ISubCategory {
  name: string;
  category: string;
  note: string;
  isDeleted: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function AddSubCategoryForm() {
  const [formData, setFormData] = useState<Omit<ISubCategory, "id">>({
    name: "",
    category: "",
    note: "",
    isDeleted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categorySearch, setCategorySearch] = useState("");

  // Fetch categories when search changes
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const url = new URL("/api/v1/category", window.location.origin);
        url.searchParams.append("search", categorySearch);
        url.searchParams.append("limit", "10");
        url.searchParams.append("page", "1");

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data: ApiResponse<ICategory[]> = await res.json();
        if (res.ok && data.success && data.data) {
          setCategories(data.data);
        } else {
          toast.error(data.message || "Failed to load categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Error fetching categories", {
          description:
            err instanceof Error ? err.message : "An unknown error occurred",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [categorySearch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (catId: string) => {
    setFormData((prev) => ({
      ...prev,
      category: catId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Sub-category name is required");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/sub-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const data: ApiResponse<ISubCategory> = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create sub-category");
      }

      toast.success("Sub-category created successfully", {
        description:
          data.message || `Sub-category "${formData.name}" has been added`,
      });

      setFormData({
        name: "",
        category: "",
        note: "",
        isDeleted: false,
      });
      setCategorySearch("");
    } catch (error: unknown) {
      console.error("Error creating sub-category:", error);
      toast.error("Failed to create sub-category", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-none mb-0 pb-0 max-w-2xl mx-auto">
      <CardContent className="border-0 shadow-none p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sub-category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Sub-category Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter sub-category name"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Select Category *</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={isSubmitting}
                >
                  {isLoadingCategories ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading categories...
                    </span>
                  ) : formData.category ? (
                    categories.find((c: any) => c._id === formData.category)
                      ?.name || "Select category"
                  ) : (
                    "Select category"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-72 overflow-auto p-2">
                <div className="mb-2">
                  <Input
                    placeholder="Search category..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="h-8"
                  />
                </div>

                {isLoadingCategories ? (
                  <div className="flex items-center justify-center p-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : categories.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    No categories found.
                  </div>
                ) : (
                  categories.map((cat: any) => (
                    <DropdownMenuItem
                      key={cat._id}
                      onSelect={() => handleCategorySelect(cat._id)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          formData.category === cat._id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {cat.name}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="note">Notes</Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || isLoadingCategories}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Sub-category...
              </span>
            ) : (
              "Add Sub-category"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
