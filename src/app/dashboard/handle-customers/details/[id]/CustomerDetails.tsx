/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  RefreshCw,
  Home,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

interface Customer {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  number?: string;
  dateOfBirth?: string;
  contacts: {
    contactName: string;
    contact: string;
    _id: string;
  }[];
  address: {
    addressName: string;
    district: string;
    city: string;
    addressLine: string;
    _id: string;
  }[];
  image?: string;
  orders: any[];
  isDeleted: boolean;
  bio?: string;
  referralCode?: string;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    role: string;
    status: string;
    isSocial: boolean;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export default function CustomerDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/customer/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        if (data.success) {
          setCustomer(data.data);
        } else {
          toast.error("Failed to fetch customer details");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
        toast.error("Failed to fetch customer details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/v1/customer/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Customer deleted successfully");
        router.push("/dashboard/handle-customers");
      } else {
        toast.error(data.message || "Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Customer not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/handle-customers">Back to Customers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/handle-customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Customer Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                {customer.image ? (
                  <Image
                    src={customer.image}
                    alt={customer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle>{customer.name}</CardTitle>
                <CardDescription>
                  {customer.username || customer.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant={customer.isDeleted ? "destructive" : "default"}>
                {customer.isDeleted ? "Deleted" : "Active"}
              </Badge>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link
                    href={`/dashboard/handle-customers/edit/${customer._id}`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.email || "No email"}</span>
              </div>

              {customer.number && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.number}</span>
                </div>
              )}

              {customer.dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatDate(customer.dateOfBirth)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Loyalty Points: {customer.loyaltyPoints}
                </span>
              </div>
            </div>

            {customer.bio && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">
                    {customer.bio}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Customer Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>User Account Information</CardTitle>
              <CardDescription>Linked user account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <Badge variant="secondary">{customer.user.role}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge
                    variant={
                      customer.user.status === "blocked"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {customer.user.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <Badge
                    variant={customer.user.isActive ? "default" : "secondary"}
                  >
                    {customer.user.isActive ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Social Login</p>
                  <Badge
                    variant={customer.user.isSocial ? "default" : "outline"}
                  >
                    {customer.user.isSocial ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(customer.user.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          {customer.contacts && customer.contacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Additional contact methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {customer.contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {contact.contactName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contact.contact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Address Information */}
          {customer.address && customer.address.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Customer addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {customer.address.map((addr) => (
                    <div key={addr._id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">{addr.addressName}</h4>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{addr.addressLine}</p>
                        <p>
                          {addr.district}, {addr.city}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders Information */}
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Customer order history</CardDescription>
            </CardHeader>
            <CardContent>
              {customer.orders && customer.orders.length > 0 ? (
                <div className="space-y-2">
                  {customer.orders.map((order) => (
                    <div key={order._id} className="p-3 border rounded-lg">
                      <p className="text-sm font-medium">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Status: {order.status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No orders found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot
              be undone. The customer will be soft deleted and can be restored
              later if needed.
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
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting && <RefreshCw className="h-4 w-4 animate-spin" />}
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
