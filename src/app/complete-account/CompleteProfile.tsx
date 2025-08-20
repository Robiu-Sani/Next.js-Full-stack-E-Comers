"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Plus, Trash2, User } from "lucide-react";
import SingleImageUpload from "@/shired-component/SingleImageUpload";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IContact {
  contactName: string;
  contact: string;
}

interface IAddress {
  addressName: string;
  district: string;
  city: string;
  addressLine: string;
}

interface IProfileForm {
  name: string;
  username: string;
  email: string;
  number?: string;
  dateOfBirth?: Date;
  contacts: IContact[];
  address: IAddress[];
  image?: string;
  bio?: string;
  referralCode?: string;
}

const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize form
  const form = useForm<IProfileForm>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      number: "",
      dateOfBirth: undefined,
      contacts: [{ contactName: "", contact: "" }],
      address: [{ addressName: "", district: "", city: "", addressLine: "" }],
      image: "",
      bio: "",
      referralCode: "",
    },
    mode: "onChange", // Validate on change
  });

  // Field arrays for dynamic contacts and addresses
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "address",
  });

  // Handle form submission
  const onSubmit = async (data: IProfileForm) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : null,
      };

      const res = await fetch("/api/v1/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (res.ok) {
        console.log("Profile updated successfully");
        router.push("/profile");
      } else {
        console.error("Failed to update profile");
        // Handle error
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-start items-center p-2">
        <Link href={`/`}>
          <Button className="cursor-pointer">Go Home</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    rules={{ required: "Username is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          //   disabled
                          className="bg-gray-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? format(field.value, "yyyy-MM-dd")
                                : ""
                            }
                            onChange={(e) => {
                              const date = e.target.value
                                ? new Date(e.target.value)
                                : undefined;
                              field.onChange(date);
                            }}
                            max={new Date().toISOString().split("T")[0]}
                            min="1900-01-01"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Profile Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Image</h3>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SingleImageUpload
                          onUpload={(url: string) => field.onChange(url)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contacts */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Contacts</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendContact({ contactName: "", contact: "" })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Contact
                  </Button>
                </div>

                {contactFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg"
                  >
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.contactName`}
                      rules={{ required: "Contact name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Work, Home, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`contacts.${index}.contact`}
                      rules={{ required: "Contact is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Info</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-1">
                              <Input placeholder="Email or phone" {...field} />
                            </FormControl>
                            {contactFields.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeContact(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* Addresses */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Addresses</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendAddress({
                        addressName: "",
                        district: "",
                        city: "",
                        addressLine: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Address
                  </Button>
                </div>

                {addressFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`address.${index}.addressName`}
                        rules={{ required: "Address name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Home, Work, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`address.${index}.city`}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`address.${index}.district`}
                        rules={{ required: "District is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>
                            <FormControl>
                              <Input placeholder="Manhattan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`address.${index}.addressLine`}
                        rules={{ required: "Address line is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {addressFields.length > 1 && (
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAddress(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Referral Code */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Referral Information</h3>
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter referral code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
