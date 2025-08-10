"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EditSubCategory from "./EditSubCategory";

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

export default function SubCategoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subCategoriesData, setSubCategoriesData] = useState<ISubCategory[]>(
    []
  );
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const itemsPerPage = 50;

  // Fetch sub-categories data
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/v1/sub-category?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();
        if (data.success) {
          setSubCategoriesData(data.data);
          setTotalSubCategories(data.pagination.total);
        } else {
          toast.error("Failed to fetch sub-categories");
        }
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
        toast.error("Failed to fetch sub-categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategories();
  }, [searchTerm, currentPage]);

  // Filter sub-categories based on search term
  const filteredSubCategories = subCategoriesData.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(totalSubCategories / itemsPerPage);

  const handleEdit = (id: string) => {
    setSelectedSubCategoryId(id);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string, info: boolean) => {
    setSelectedSubCategoryId(id);
    setDeleteDialogOpen(true);
    setDeleteInfo(info);
  };

  const confirmDelete = async () => {
    if (!selectedSubCategoryId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/v1/sub-category/${selectedSubCategoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(
          deleteInfo
            ? "Sub-category restored successfully"
            : "Sub-category deleted successfully"
        );
        // Refresh the data
        const res = await fetch(
          `/api/v1/sub-category?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );
        const updatedData = await res.json();
        if (updatedData.success) {
          setSubCategoriesData(updatedData.data);
          setTotalSubCategories(updatedData.pagination.total);
        }
      } else {
        toast.error(data.message || "Failed to delete sub-category");
      }
    } catch (error) {
      console.error("Error deleting sub-category:", error);
      toast.error("Failed to delete sub-category");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedSubCategoryId(null);
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="w-full  space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search sub-categories..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Button variant="secondary">Total Data {totalSubCategories}</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your product sub-categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="w-full flex justify-center items-center">
                    <RefreshCw className="animate-spin w-12" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredSubCategories.length > 0 ? (
              filteredSubCategories.map((subCategory) => (
                <TableRow key={subCategory._id}>
                  <TableCell className="font-medium">
                    {subCategory.name}
                  </TableCell>
                  <TableCell>{subCategory.category.name}</TableCell>
                  <TableCell className="text-gray-600 line-clamp-1">
                    {subCategory.note || "No description"}
                  </TableCell>
                  <TableCell>
                    {new Date(subCategory.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subCategory.isDeleted ? "destructive" : "default"
                      }
                    >
                      {subCategory.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-[1000]">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(subCategory._id)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            handleDeleteClick(
                              subCategory._id,
                              subCategory.isDeleted
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          {subCategory.isDeleted ? "Restore" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No sub-categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalSubCategories)} of{" "}
          {totalSubCategories} sub-categories
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] z-[1001]">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {deleteInfo ? "restore" : "delete"} this
              sub-category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <RefreshCw className="animate-spin text-white" />
              ) : (
                ""
              )}
              {deleteInfo ? "Restore" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Sub-Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px] z-[1001]">
          <DialogHeader>
            <DialogTitle>Edit Sub-Category</DialogTitle>
          </DialogHeader>
          {selectedSubCategoryId && (
            <EditSubCategory
              subCategoryId={selectedSubCategoryId}
              onSuccess={() => {
                setEditDialogOpen(false);
                // Refresh data after successful edit
                fetch(
                  `/api/v1/sub-category?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
                  {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      setSubCategoriesData(data.data);
                      setTotalSubCategories(data.pagination.total);
                    }
                  });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
