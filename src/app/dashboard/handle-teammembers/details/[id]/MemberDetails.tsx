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
  Building,
  Award,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

interface Contact {
  contactName: string;
  contact: string;
  _id: string;
}

interface Address {
  addressName: string;
  district: string;
  city: string;
  addressLine: string;
  _id: string;
}

interface UserData {
  _id: string;
  email: string;
  role: string;
  status: string;
  isSocial: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MemberData {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  number?: string;
  dateOfBirth?: string;
  branch: string;
  contacts: Contact[];
  address: Address[];
  image?: string;
  orders: any[];
  isDeleted: boolean;
  bio?: string;
  referralCode?: string;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
  user: UserData | null;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: MemberData;
  error?: string;
}

export default function MemberDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<MemberData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/management/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data: ApiResponse = await res.json();
        if (data.success && data.data) {
          setMember(data.data);
        } else {
          toast.error("Failed to fetch member details");
        }
      } catch (error) {
        console.error("Error fetching member:", error);
        toast.error("Failed to fetch member details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/v1/management/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data: ApiResponse = await res.json();
      if (data.success) {
        toast.success("Member deleted successfully");
        router.push("/dashboard/management");
      } else {
        toast.error(data.message || "Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Member not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/handle-teammembers">Back to Members</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/handle-teammembers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Member Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
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
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>
                  {member.username || member.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant={member.isDeleted ? "destructive" : "default"}>
                {member.isDeleted ? "Deleted" : "Active"}
              </Badge>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link
                    href={`/dashboard/handle-teammembers/edit/${member._id}`}
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
              {member.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.email}</span>
                </div>
              )}

              {member.number && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.number}</span>
                </div>
              )}

              {member.dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatDate(member.dateOfBirth)}
                  </span>
                </div>
              )}

              {member.branch && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Branch: {member.branch}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Loyalty Points: {member.loyaltyPoints}
                </span>
              </div>

              {member.referralCode && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Referral: {member.referralCode}
                  </span>
                </div>
              )}
            </div>

            {member.bio && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Created: {formatDate(member.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated: {formatDate(member.updatedAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Member Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Account Info */}
          {member.user && (
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
                      {member.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <Badge variant="secondary">{member.user.role}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge
                      variant={
                        member.user.status === "blocked"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {member.user.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active</p>
                    <Badge
                      variant={member.user.isActive ? "default" : "secondary"}
                    >
                      {member.user.isActive ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Social Login</p>
                    <Badge
                      variant={member.user.isSocial ? "default" : "outline"}
                    >
                      {member.user.isSocial ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(member.user.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          {member.contacts && member.contacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Additional contact methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {member.contacts.map((contact) => (
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
          {member.address && member.address.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Member addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {member.address.map((addr) => (
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
              <CardDescription>Member order history</CardDescription>
            </CardHeader>
            <CardContent>
              {member.orders && member.orders.length > 0 ? (
                <div className="space-y-2">
                  {member.orders.map((order) => (
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
              Are you sure you want to delete this member? This action cannot be
              undone. The member will be soft deleted and can be restored later
              if needed.
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
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
