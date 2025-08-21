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
  Filter,
  PawPrintIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export interface IProduct {
  _id: string;
  name: string;
  images: string[];
  quentity: number;
  brand: string;
  isDeleted: boolean;
  hasOffer: boolean;
  generalPrice?: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [offerFilter, setOfferFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 50;

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let url = `/api/v1/product?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`;

        // Add filters to URL if they're not "all"
        if (statusFilter !== "all") {
          url += `&isDeleted=${statusFilter === "deleted"}`;
        }

        if (offerFilter !== "all") {
          url += `&hasOffer=${offerFilter === "hasOffer"}`;
        }

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        if (data.success) {
          setProductsData(data.data);
          setTotalProducts(data.pagination.total);
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage, statusFilter, offerFilter]);

  // Pagination logic
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleDeleteClick = (id: string, info: boolean) => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
    setDeleteInfo(info);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    setIsSubmiting(true);
    try {
      const response = await fetch(
        `/api/v1/product/status/${selectedProductId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted successfully");
        // Refresh the data
        let url = `/api/v1/product?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`;

        if (statusFilter !== "all") {
          url += `&isDeleted=${statusFilter === "deleted"}`;
        }

        if (offerFilter !== "all") {
          url += `&hasOffer=${offerFilter === "hasOffer"}`;
        }

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const updatedData = await res.json();
        if (updatedData.success) {
          setProductsData(updatedData.data);
          setTotalProducts(updatedData.pagination.total);
        }
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedProductId(null);
      setIsSubmiting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BTD",
    }).format(price);
  };

  return (
    <div className="w-full mt-4 scrollHidden space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="secondary">Total Data {totalProducts}</Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-4 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="offer-filter">Offer</Label>
            <Select value={offerFilter} onValueChange={setOfferFilter}>
              <SelectTrigger id="offer-filter" className="w-[180px]">
                <SelectValue placeholder="Filter by offer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="hasOffer">Has Offer</SelectItem>
                <SelectItem value="noOffer">No Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Offer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="w-full flex justify-center items-center">
                    <RefreshCw className="animate-spin w-12" />
                  </div>
                </TableCell>
              </TableRow>
            ) : productsData.length > 0 ? (
              productsData.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium w-[200px]">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images[0] || "/placeholder-image.jpg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    {product.generalPrice ? (
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {formatPrice(product.generalPrice.currentPrice)}
                        </span>
                        {product.generalPrice.prevPrice >
                          product.generalPrice.currentPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.generalPrice.prevPrice)}
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{product.quentity}</TableCell>
                  <TableCell>
                    <Badge variant={product.hasOffer ? "default" : "secondary"}>
                      {product.hasOffer ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.isDeleted ? "destructive" : "default"}
                    >
                      {product.isDeleted ? "Deleted" : "Active"}
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
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/products/details/${product._id}`}
                            className="flex items-center gap-2"
                          >
                            <PawPrintIcon className="h-4 w-4" />
                            Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/products/edit/${product._id}`}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            handleDeleteClick(product._id, product.isDeleted)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          {product.isDeleted ? "Restore" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
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
          {Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
          {totalProducts} products
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
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to {deleteInfo ? "Restore" : "Delete"} this
              product? This action cannot be undone.
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
              {isSubmiting ? (
                <RefreshCw className="animate-spin text-white" />
              ) : (
                ""
              )}
              {deleteInfo ? "Restore" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
