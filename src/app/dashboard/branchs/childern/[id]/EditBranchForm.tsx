/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  code: z.string().optional(),
  manager: z.object({
    name: z.string().optional(),
    contact: z.string().optional(),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
  }),
  contactNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.object({
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    town: z.string().optional(),
    thana: z.string().optional(),
    addressLine: z.string().min(1, "Address line is required"),
    postalCode: z.string().optional(),
  }),
  openingHours: z.object({
    open: z.string().optional(),
    close: z.string().optional(),
  }),
  establishedAt: z.string().optional(),
  locationCoordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ApiResponse {
  message?: string;
  error?: string;
  data?: any;
}

export default function EditBranchForm() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      manager: {
        name: "",
        contact: "",
        email: "",
      },
      contactNumber: "",
      email: "",
      address: {
        district: "",
        city: "",
        town: "",
        thana: "",
        addressLine: "",
        postalCode: "",
      },
      openingHours: {
        open: "",
        close: "",
      },
      establishedAt: "",
      locationCoordinates: {
        lat: undefined,
        lng: undefined,
      },
    },
  });

  React.useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const res = await fetch(`/api/v1/branch/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data: ApiResponse = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch branch data");
        }

        if (data.data) {
          const branch = data.data;
          form.reset({
            name: branch.name,
            code: branch.code,
            manager: {
              name: branch.manager?.name || "",
              contact: branch.manager?.contact || "",
              email: branch.manager?.email || "",
            },
            contactNumber: branch.contactNumber,
            email: branch.email,
            address: {
              district: branch.address?.district || "",
              city: branch.address?.city || "",
              town: branch.address?.town || "",
              thana: branch.address?.thana || "",
              addressLine: branch.address?.addressLine || "",
              postalCode: branch.address?.postalCode || "",
            },
            openingHours: {
              open: branch.openingHours?.open || "",
              close: branch.openingHours?.close || "",
            },
            establishedAt: branch.establishedAt
              ? new Date(branch.establishedAt).toISOString().split("T")[0]
              : "",
            locationCoordinates: {
              lat: branch.locationCoordinates?.lat || undefined,
              lng: branch.locationCoordinates?.lng || undefined,
            },
          });
        }
      } catch (error) {
        toast.error("Failed to load branch data", {
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranchData();
  }, [id, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Format the data to match IBranch interface
      const formattedData = {
        ...values,
        establishedAt: values.establishedAt
          ? new Date(values.establishedAt)
          : undefined,
        locationCoordinates: {
          lat: values.locationCoordinates.lat
            ? Number(values.locationCoordinates.lat)
            : undefined,
          lng: values.locationCoordinates.lng
            ? Number(values.locationCoordinates.lng)
            : undefined,
        },
      };

      const res = await fetch(`/api/v1/branch/${id}`, {
        method: "PATCH", // Changed to PUT for update
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
        cache: "no-store",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update branch");
      }

      toast.success("Branch updated successfully", {
        description: data.message || "Your branch has been updated",
      });
    } catch (error) {
      toast.error("Failed to update branch", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none p-0 w-full mx-auto mt-6">
      <CardHeader>
        <CardTitle>Edit Branch</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Manager Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="manager.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Manager Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manager.contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Manager Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manager.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Manager Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Branch Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="address.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District *</FormLabel>
                    <FormControl>
                      <Input placeholder="District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.town"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town</FormLabel>
                    <FormControl>
                      <Input placeholder="Town" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.thana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thana</FormLabel>
                    <FormControl>
                      <Input placeholder="Thana" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.addressLine"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address Line *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Address Line" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Opening Hours */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="openingHours.open"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openingHours.close"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Close Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Other Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="establishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established At</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationCoordinates.lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationCoordinates.lng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Branch"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
