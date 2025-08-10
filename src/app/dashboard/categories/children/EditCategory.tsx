"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SingleImageUpload from "@/shired-component/SingleImageUpload";
import { toast } from "sonner";

interface ICategory {
  name: string;
  image: string;
  note: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: ICategory;
  error?: string;
}

interface EditCategoryProps {
  categoryId: string;
  onSuccess: () => void;
}

export default function EditCategory({
  categoryId,
  onSuccess,
}: EditCategoryProps) {
  const [formData, setFormData] = useState<Omit<ICategory, "_id">>({
    name: "",
    image: "",
    note: "",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/v1/category/${categoryId}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data: ApiResponse = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch category");
        }

        if (data.success && data.data) {
          setFormData({
            name: data.data.name,
            image: data.data.image || "",
            note: data.data.note || "",
            isDeleted: data.data.isDeleted || false,
            createdAt: new Date(data.data.createdAt),
            updatedAt: new Date(data.data.updatedAt),
          });
        }
      } catch (error: unknown) {
        console.error("Error fetching category:", error);
        toast.error("Failed to load category", {
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/v1/category/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update category");
      }

      toast.success("Category updated successfully", {
        description: data.message || "Your changes have been saved",
      });

      onSuccess();
    } catch (error: unknown) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full border-0 shadow-none mb-0 pb-0 max-w-2xl mx-auto">
        <CardContent className="border-0 shadow-none p-0">
          <div className="flex justify-center items-center h-40">
            <p>Loading category data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none mb-0 pb-0 max-w-2xl mx-auto">
      <CardContent className="border-0 shadow-none p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Image</Label>
            <SingleImageUpload
              onUpload={handleImageUpload}
              disabled={isSubmitting}
              initialImage={formData.image}
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <div className="w-20 h-20 relative">
                  <Image
                    fill
                    src={formData.image}
                    alt="Category preview"
                    className="object-cover rounded-md border"
                  />
                </div>
              </div>
            )}
          </div>

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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
