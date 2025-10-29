/* eslint-disable react-hooks/exhaustive-deps */
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
  Eye,
  User,
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
import { useRouter } from "next/navigation";

export interface ICustomer {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  number?: string;
  image?: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AllCustomersTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersData, setCustomersData] = useState<ICustomer[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const itemsPerPage = 50;

  // Fetch customers data
  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/v1/customer?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();
      if (data.success) {
        setCustomersData(data.data);
        setTotalCustomers(data.pagination.total);
      } else {
        toast.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, currentPage]);

  // Filter customers based on search term
  const filteredCustomers = customersData.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      (customer.email && customer.email.toLowerCase().includes(searchLower)) ||
      (customer.number &&
        customer.number.toLowerCase().includes(searchLower)) ||
      (customer.username &&
        customer.username.toLowerCase().includes(searchLower)) ||
      customer.user.email.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/handle-customers/edit/${id}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/handle-customers/details/${id}`);
  };

  const handleDeleteClick = (id: string, isDeleted: boolean) => {
    setSelectedCustomerId(id);
    setDeleteDialogOpen(true);
    setDeleteInfo(isDeleted);
  };

  const confirmDelete = async () => {
    if (!selectedCustomerId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/customer/${selectedCustomerId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Customer ${deleteInfo ? "restored" : "deleted"} successfully`
        );

        // Update the local state instead of refetching to immediately reflect the change
        setCustomersData((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === selectedCustomerId
              ? { ...customer, isDeleted: !deleteInfo }
              : customer
          )
        );

        // Also update the total count if needed
        if (deleteInfo) {
          setTotalCustomers((prev) => prev + 1);
        } else {
          setTotalCustomers((prev) => prev - 1);
        }
      } else {
        toast.error(
          data.message ||
            `Failed to ${deleteInfo ? "restore" : "delete"} customer`
        );
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error(`Failed to ${deleteInfo ? "restore" : "delete"} customer`);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedCustomerId(null);
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "secondary";
      case "super-admin":
        return "destructive";
      case "menager":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search customers by name, email, or number..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Button variant="secondary">Total Data {totalCustomers}</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of all customers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>User Role</TableHead>
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
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        {customer.image ? (
                          <Image
                            src={customer.image || "/placeholder-user.jpg"}
                            alt={customer.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        {customer.username && (
                          <p className="text-sm text-gray-500">
                            @{customer.username}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {customer.email && (
                        <p className="text-sm">{customer.email}</p>
                      )}
                      {customer.number && (
                        <p className="text-sm">{customer.number}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(customer.user?.role)}>
                      {customer.user?.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.isDeleted === true ? "destructive" : "default"
                      }
                    >
                      {customer.isDeleted === true ? "Deleted" : "Active"}
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
                          onClick={() => handleViewDetails(customer._id)}
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(customer._id)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            handleDeleteClick(customer._id, customer.isDeleted)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          {customer.isDeleted ? "Restore" : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
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
          {Math.min(currentPage * itemsPerPage, totalCustomers)} of{" "}
          {totalCustomers} customers
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
              customer?{" "}
              {deleteInfo
                ? "They will be accessible again."
                : "This action will soft delete the customer."}
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
    </div>
  );
}
