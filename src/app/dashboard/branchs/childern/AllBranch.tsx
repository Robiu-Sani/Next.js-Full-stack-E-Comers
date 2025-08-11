/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  Trash2Icon,
  SearchIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

interface Branch {
  _id: string;
  name: string;
  code: string;
  contactNumber: string;
  email: string;
  manager: {
    name: string;
    contact: string;
    email: string;
  };
  address: {
    district: string;
    city: string;
    town: string;
    thana: string;
    addressLine: string;
    postalCode: string;
  };
  openingHours: {
    open: string;
    close: string;
  };
  locationCoordinates: {
    lat: number;
    lng: number;
  };
  establishedAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface ApiResponse {
  success: boolean;
  data: Branch[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function AllBranch() {
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchBranches();
  }, [searchTerm, currentPage]);

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/v1/branch?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch branches");
      }

      setBranches(data.data);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    } catch (error) {
      toast.error("Failed to fetch branches", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!branchToDelete) return;

    try {
      const res = await fetch(`/api/v1/branch/${branchToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete branch");
      }

      toast.success("Branch deleted successfully");
      fetchBranches();
    } catch (error) {
      toast.error("Failed to delete branch", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBranchToDelete(null);
    }
  };

  const handlePageChange: any = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Branches</h1>
        <div className="relative w-full md:w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search branches..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : branches.length === 0 ? (
        <div className="text-center py-8">
          <p>No branches found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {branches.map((branch) => (
              <Card
                key={branch._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{branch.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {branch.code}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          router.push(
                            `/dashboard/branchs/childern/${branch._id}`
                          )
                        }
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Dialog
                        open={deleteDialogOpen && branchToDelete === branch._id}
                        onOpenChange={(open) => {
                          setDeleteDialogOpen(open);
                          setBranchToDelete(open ? branch._id : null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this branch? This
                              action cannot be undone.
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
                              onClick={handleDelete}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Manager Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Manager</h3>
                    </div>
                    <div className="pl-6 space-y-1">
                      <p>{branch.manager.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PhoneIcon className="h-3 w-3" />
                        <span>{branch.manager.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        <span>{branch.manager.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Contact</h3>
                    </div>
                    <div className="pl-6 space-y-1">
                      <p>{branch.contactNumber}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        <span>{branch.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Address</h3>
                    </div>
                    <div className="pl-6 space-y-1">
                      <p>{branch.address.addressLine}</p>
                      <p className="text-sm text-muted-foreground">
                        {branch.address.town && `${branch.address.town}, `}
                        {branch.address.thana && `${branch.address.thana}, `}
                        {branch.address.city}, {branch.address.district}
                      </p>
                      {branch.address.postalCode && (
                        <p className="text-sm text-muted-foreground">
                          Postal Code: {branch.address.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Opening Hours</h3>
                    </div>
                    <div className="pl-6">
                      <p>
                        {branch.openingHours.open} -{" "}
                        {branch.openingHours.close || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Established</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(branch.establishedAt)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {branch.locationCoordinates.lat.toFixed(4)},{" "}
                        {branch.locationCoordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </strong>{" "}
              of <strong>{totalItems}</strong> branches
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <div
                    className={
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                    />
                  </div>
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <div
                    className={
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  >
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                    />
                  </div>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
