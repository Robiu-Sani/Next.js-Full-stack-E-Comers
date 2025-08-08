"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface ICategory {
  _id: string;
  name: string;
  image?: string;
  note?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dummy data
const categoriesData: ICategory[] = [
  {
    _id: "1",
    name: "Electronics",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "All electronic devices",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "Clothing",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Men's and women's clothing",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    name: "Home & Garden",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Furniture and home decor",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    name: "Books",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Fiction and non-fiction",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5",
    name: "Sports",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Sports equipment",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "6",
    name: "Toys",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Children's toys",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "7",
    name: "Beauty",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Cosmetics and skincare",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "8",
    name: "Food & Beverage",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Groceries and drinks",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "9",
    name: "Health",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Health supplements",
    isDeleted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "10",
    name: "Automotive",
    image:
      "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    note: "Car parts and accessories",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CategoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter categories based on search term
  const filteredCategories = categoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentItems = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id: string) => {
    console.log("Edit category with id:", id);
    // Add your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete category with id:", id);
    // Add your delete logic here
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="max-w-sm"
        />
        <Button variant="secondary">Total Data 30</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your product categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={category.image || "/placeholder-image.jpg"}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 line-clamp-1">
                    {category.note || "No description"}
                  </TableCell>
                  <TableCell>
                    {category.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.isDeleted ? "destructive" : "default"}
                    >
                      {category.isDeleted ? "Deleted" : "Active"}
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
                          onClick={() => handleEdit(category._id)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() => handleDelete(category._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No categories found.
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
          {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of{" "}
          {filteredCategories.length} categories
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
    </div>
  );
}
