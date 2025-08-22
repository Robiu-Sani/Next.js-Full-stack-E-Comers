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
  Shield,
  ShieldAlert,
  User,
  UserCog,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface IUser {
  _id: string;
  email?: string;
  number?: string;
  username?: string;
  role: "user" | "admin" | "menager" | "super-admin";
  status: "in-progress" | "blocked";
  isSocial: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const itemsPerPage = 50;

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/v1/user/manage?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();
        if (data.success) {
          setUsersData(data.data);
          setTotalUsers(data.pagination.total);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, currentPage]);

  // Filter users based on search term
  const filteredUsers = usersData.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.email && user.email.toLowerCase().includes(searchLower)) ||
      (user.number && user.number.toLowerCase().includes(searchLower)) ||
      (user.username && user.username.toLowerCase().includes(searchLower))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleEdit = (user: IUser) => {
    setSelectedUserId(user._id);
    setEditingUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string, isDeleted: boolean) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
    setDeleteInfo(isDeleted);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/user/manage/${selectedUserId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User status updated successfully");
        // Refresh the data
        const res = await fetch(
          `/api/v1/user/manage?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );
        const updatedData = await res.json();
        if (updatedData.success) {
          setUsersData(updatedData.data);
          setTotalUsers(updatedData.pagination.total);
        }
      } else {
        toast.error(data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !selectedUserId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/user/manage/${selectedUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          role: editingUser.role,
          status: editingUser.status,
          isActive: editingUser.isActive,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("User updated successfully");
        setEditDialogOpen(false);
        // Refresh the data
        const res = await fetch(
          `/api/v1/user/manage?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );
        const updatedData = await res.json();
        if (updatedData.success) {
          setUsersData(updatedData.data);
          setTotalUsers(updatedData.pagination.total);
        }
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "super-admin":
        return <ShieldAlert className="h-4 w-4" />;
      case "menager":
        return <UserCog className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
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
          placeholder="Search users by email, number or username..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Button variant="secondary">Total Data {totalUsers}</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email/Number</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Social</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="w-full flex justify-center items-center">
                    <RefreshCw className="animate-spin w-12" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    {user.email || user.number || "N/A"}
                  </TableCell>
                  <TableCell>{user.username || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getRoleVariant(user.role)}
                      className="flex items-center gap-1"
                    >
                      {getRoleIcon(user.role)}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "blocked" ? "destructive" : "default"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isSocial ? "default" : "outline"}>
                      {user.isSocial ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
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
                          onClick={() => handleEdit(user)}
                          disabled={user.isSocial}
                        >
                          <Edit className="h-4 w-4" />
                          Edit{" "}
                          {user.isSocial && "(Not available for social users)"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600"
                          onClick={() =>
                            handleDeleteClick(user._id, user.isDeleted)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          {user.isDeleted ? "Restore" : "Soft Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No users found.
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
          {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers}{" "}
          users
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
              Are you sure you want to {deleteInfo ? "restore" : "soft delete"}{" "}
              this user? This action can be reversed later.
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

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px] z-[1001]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user permissions and status.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value: IUser["role"]) =>
                      setEditingUser({ ...editingUser, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="menager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingUser.status}
                    onValueChange={(value: IUser["status"]) =>
                      setEditingUser({ ...editingUser, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isActive">Active Status</Label>
                  <Select
                    value={editingUser.isActive ? "true" : "false"}
                    onValueChange={(value) =>
                      setEditingUser({
                        ...editingUser,
                        isActive: value === "true",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select active status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex justify-center items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <RefreshCw className="animate-spin" /> : ""}
                  Update User
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
