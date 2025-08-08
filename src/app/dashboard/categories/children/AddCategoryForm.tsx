import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ICategory } from "@/interface/category.interface";
import Image from "next/image";
import SingleImageUpload from "@/shired-component/SingleImageUpload";

export default function AddCategoryForm() {
  const [formData, setFormData] = useState<Partial<ICategory>>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Log form data to console
    console.log("Form Data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Category added successfully! Check console for data.");

      // Reset form
      setFormData({
        name: "",
        image: "",
        note: "",
        isDeleted: false,
      });
    }, 1000);
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
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Category Image</Label>
            <SingleImageUpload onUpload={handleImageUpload} />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <Image
                  width={100}
                  height={100}
                  src={formData.image}
                  alt="Category preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Notes</Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note || ""}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Adding Category..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
