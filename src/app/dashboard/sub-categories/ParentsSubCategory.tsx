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
import { Card, CardHeader } from "@/components/ui/card";

export default function ParentsSubCategory() {
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  return (
    <div className="pt-4">
      <Card className="relative my-4 overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-primary/5">
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5"></div>

        {/* Content */}
        <CardHeader className="relative z-10 p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              All Sub Category
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-lg text-muted-foreground">
                  All registered system sub category
                </p>
                <div className="h-1 w-8 rounded-full bg-primary/30"></div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Secure Access
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Admin View
                  </span>
                </div>
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
          </div>
        </CardHeader>
      </Card>

      <SubCategoryTable />
    </div>
  );
}
