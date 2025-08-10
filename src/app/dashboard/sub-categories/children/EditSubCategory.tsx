"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ISubCategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  note?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ICategory {
  _id: string;
  name: string;
}

export default function EditSubCategory({
  subCategoryId,
  onSuccess,
}: {
  subCategoryId: string;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categorySearch, setCategorySearch] = useState("");

  // Fetch sub-category data and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsSubmitting(true);
      try {
        // Fetch sub-category data
        const subCatRes = await fetch(`/api/v1/sub-category/${subCategoryId}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const subCatData = await subCatRes.json();

        if (subCatData.success) {
          setFormData({
            name: subCatData.data.name,
            category: subCatData.data.category._id,
            note: subCatData.data.note || "",
          });
        }

        // Fetch categories
        setIsLoadingCategories(true);
        const catRes = await fetch(
          `/api/v1/category?search=${categorySearch}&limit=10&page=1`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );
        const catData = await catRes.json();
        if (catData.success) {
          setCategories(catData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsSubmitting(false);
        setIsLoadingCategories(false);
      }
    };

    fetchData();
  }, [subCategoryId, categorySearch]);

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
      const res = await fetch(`/api/v1/sub-category/${subCategoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update sub-category");
      }

      toast.success("Sub-category updated successfully");
      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating sub-category:", error);
      toast.error("Failed to update sub-category", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                categories.find((c) => c._id === formData.category)?.name ||
                "Select category"
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
              categories.map((cat) => (
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
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Sub-category...
          </span>
        ) : (
          "Update Sub-category"
        )}
      </Button>
    </form>
  );
}
