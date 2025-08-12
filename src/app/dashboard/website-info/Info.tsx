/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WebsiteInfo {
  _id: string;
  number: string;
  email: string;
  name: string;
  logo: string;
  banner: {
    firstImage: { image: string; link?: string };
    secondImage: { image: string; link?: string };
    carousel: Array<{ image: string; link?: string; _id: string }>;
  };
  socialContact: {
    facebook: string;
    youtube?: string;
    instagrame?: string;
    linkedIn?: string;
    whatsApp?: string;
    twitter?: any;
  };
  addresses: Array<{ name: string; address: string; _id: string }>;
  mapLink: string;
  footerLinks: Array<{ name: string; url?: string; _id: string }>;
  marqueeText: string;
  createdAt: string;
  updatedAt: string;
}

export default function Info() {
  const [data, setData] = useState<WebsiteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/web-info", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch website info");
        }

        setData(result.data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load website info", {
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/v1/web-info", {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to delete website info");
      }

      toast.success("Website information deleted successfully");
      setData(null); // Clear data after deletion
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete website info", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    // Assuming an edit page exists at this route
    router.push("/dashboard/website-info/edit");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="w-full border-0 shadow-none p-0 mt-6">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No website information available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none p-0 mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Website Information</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this website information?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Website Name</p>
              <p>{data.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p>{data.number}</p>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Logo</h3>
          <div className="relative w-24 h-24 rounded-md overflow-hidden border">
            <Image
              src={data.logo}
              alt="Website Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Banner Images */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Banner Images</h3>
          <div className="space-y-4">
            {/* First Image */}
            <div>
              <p className="text-sm text-muted-foreground">First Banner</p>
              <div className="flex items-center gap-4">
                <div className="relative w-48 h-24 rounded-md overflow-hidden border">
                  <Image
                    src={data.banner.firstImage.image}
                    alt="First Banner"
                    fill
                    className="object-cover"
                  />
                </div>
                {data.banner.firstImage.link && (
                  <Link
                    href={data.banner.firstImage.link}
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </Link>
                )}
              </div>
            </div>
            {/* Second Image */}
            <div>
              <p className="text-sm text-muted-foreground">Second Banner</p>
              <div className="flex items-center gap-4">
                <div className="relative w-48 h-24 rounded-md overflow-hidden border">
                  <Image
                    src={data.banner.secondImage.image}
                    alt="Second Banner"
                    fill
                    className="object-cover"
                  />
                </div>
                {data.banner.secondImage.link && (
                  <Link
                    href={data.banner.secondImage.link}
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </Link>
                )}
              </div>
            </div>
            {/* Carousel Images */}
            <div>
              <p className="text-sm text-muted-foreground">Carousel Banners</p>
              <ScrollArea className="h-32 w-full">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {data.banner.carousel.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex flex-col items-center gap-2 min-w-[200px]"
                    >
                      <div className="relative w-48 h-24 rounded-md overflow-hidden border">
                        <Image
                          src={item.image}
                          alt={`Carousel Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="text-blue-600 hover:underline"
                        >
                          Link {index + 1}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Social Contacts */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Social Contacts</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(data.socialContact).map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key}
                    </p>
                    <Link
                      href={value}
                      className="text-blue-600 hover:underline break-all"
                    >
                      {value}
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Addresses</h3>
          <div className="space-y-4">
            {data.addresses.map((address) => (
              <div key={address._id}>
                <p className="text-sm text-muted-foreground">{address.name}</p>
                <p className="whitespace-pre-line">{address.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Link */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Map</h3>
          <iframe
            src={data.mapLink}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Footer Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Footer Links</h3>
          <div className="flex flex-wrap gap-2">
            {data.footerLinks.map((link) => (
              <Badge key={link._id} variant="secondary">
                <Link href={link.url || "#"} className="hover:underline">
                  {link.name}
                </Link>
              </Badge>
            ))}
          </div>
        </div>

        {/* Marquee Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Marquee Text</h3>
          <p className="text-sm">{data.marqueeText}</p>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Metadata</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p>{new Date(data.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p>{new Date(data.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
