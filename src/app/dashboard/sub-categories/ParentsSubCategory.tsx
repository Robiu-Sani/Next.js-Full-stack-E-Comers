"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddSubCategoryForm from "./children/AddSubCategoryForm";
import SubCategoryTable from "./children/SubCategoryTable";

export default function ParentsSubCategory() {
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  return (
    <div className="pt-4">
      <div className="flex items-center mb-6 justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Sub Category Management
          </h1>
          <p className="text-muted-foreground">
            Manage your product sub categories and organization
          </p>
        </div>

        {/* Add Category Button with Dialog */}
        <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Sub Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
              <DialogTitle>Create New Sub Category</DialogTitle>
            </DialogHeader>
            <AddSubCategoryForm />
          </DialogContent>
        </Dialog>
      </div>
      <SubCategoryTable />
    </div>
  );
}
