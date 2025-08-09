"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ICategory } from "@/interface/category.interface";
import Image from "next/image";
import SingleImageUpload from "@/shired-component/SingleImageUpload";
import { toast } from "sonner";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: ICategory;
  error?: string;
}

export default function AddCategoryForm() {
  const [formData, setFormData] = useState<Omit<ICategory, "id">>({
    name: "",
    image: "",
    note: "",
    isDeleted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const res = await fetch("/api/v1/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create category");
      }

      toast.success("Category created successfully", {
        description: data.message || "Your category has been added",
      });

      setFormData({
        name: "",
        image: "",
        note: "",
        isDeleted: false,
      });
    } catch (error: unknown) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category", {
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Category..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
