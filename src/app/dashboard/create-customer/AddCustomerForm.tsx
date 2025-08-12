"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICustomer } from "@/interface/customer.interface";
import Image from "next/image";
import SingleImageUpload from "@/shired-component/SingleImageUpload"; // Assuming this is the correct path
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: ICustomer;
  error?: string;
}

interface Contact {
  contactName: string;
  contact: string;
}

interface Address {
  addressName: string;
  district: string;
  city: string;
  addressLine: string;
}

interface FormData
  extends Omit<ICustomer, "id" | "user" | "orders" | "isDeleted"> {
  password: string;
  contacts: Contact[];
  address: Address[];
}

export default function AddCustomerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    number: "",
    password: "",
    dateOfBirth: undefined,
    contacts: [{ contactName: "", contact: "" }],
    address: [{ addressName: "", district: "", city: "", addressLine: "" }],
    image: "",
    bio: "",
    referralCode: "",
    loyaltyPoints: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "loyaltyPoints" ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: e.target.value ? new Date(e.target.value) : undefined,
    }));
  };

  const handleContactChange = (
    index: number,
    field: keyof Contact,
    value: string
  ) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    setFormData((prev) => ({ ...prev, contacts: newContacts }));
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { contactName: "", contact: "" }],
    }));
  };

  const removeContact = (index: number) => {
    const newContacts = formData.contacts.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, contacts: newContacts }));
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    const newAddresses = [...formData.address];
    newAddresses[index][field] = value;
    setFormData((prev) => ({ ...prev, address: newAddresses }));
  };

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: [
        ...prev.address,
        { addressName: "", district: "", city: "", addressLine: "" },
      ],
    }));
  };

  const removeAddress = (index: number) => {
    const newAddresses = formData.address.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, address: newAddresses }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Customer name is required");
      return;
    }
    if (!formData.email && !formData.number) {
      toast.error("Either email or phone number is required");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    // Validate contacts and addresses
    for (const contact of formData.contacts) {
      if (!contact.contactName || !contact.contact) {
        toast.error("All contact fields are required");
        return;
      }
    }
    for (const addr of formData.address) {
      if (
        !addr.addressName ||
        !addr.district ||
        !addr.city ||
        !addr.addressLine
      ) {
        toast.error("All address fields are required");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : undefined,
      };

      const res = await fetch("/api/v1/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submitData),
        cache: "no-store",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create customer");
      }

      toast.success("Customer created successfully", {
        description: data.message || "Your customer has been added",
      });

      // Reset form
      setFormData({
        name: "",
        username: "",
        email: "",
        number: "",
        password: "",
        dateOfBirth: undefined,
        contacts: [{ contactName: "", contact: "" }],
        address: [{ addressName: "", district: "", city: "", addressLine: "" }],
        image: "",
        bio: "",
        referralCode: "",
        loyaltyPoints: 0,
      });
    } catch (error: unknown) {
      console.error("Error creating customer:", error);
      toast.error("Failed to create customer", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full  shadow-none p-0 border-0 py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Image</h3>
            <Separator />
            <SingleImageUpload onUpload={handleImageUpload} />
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative w-32 h-32">
                  <Image
                    fill
                    src={formData.image}
                    alt="Profile preview"
                    className="object-cover rounded-lg border"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacts</h3>
            <Separator />
            {formData.contacts.map((contact, index) => (
              <div
                key={index}
                className="space-y-2 border p-4 rounded-md relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`contactName-${index}`}>
                      Contact Name *
                    </Label>
                    <Input
                      id={`contactName-${index}`}
                      value={contact.contactName}
                      onChange={(e) =>
                        handleContactChange(
                          index,
                          "contactName",
                          e.target.value
                        )
                      }
                      placeholder="Enter contact name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`contact-${index}`}>Contact *</Label>
                    <Input
                      id={`contact-${index}`}
                      value={contact.contact}
                      onChange={(e) =>
                        handleContactChange(index, "contact", e.target.value)
                      }
                      placeholder="Enter contact details"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                {formData.contacts.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeContact(index)}
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addContact}
              disabled={isSubmitting}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>

          {/* Addresses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Addresses</h3>
            <Separator />
            {formData.address.map((addr, index) => (
              <div
                key={index}
                className="space-y-2 border p-4 rounded-md relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`addressName-${index}`}>
                      Address Name *
                    </Label>
                    <Input
                      id={`addressName-${index}`}
                      value={addr.addressName}
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "addressName",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Home, Office"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`district-${index}`}>District *</Label>
                    <Input
                      id={`district-${index}`}
                      value={addr.district}
                      onChange={(e) =>
                        handleAddressChange(index, "district", e.target.value)
                      }
                      placeholder="Enter district"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`city-${index}`}>City *</Label>
                    <Input
                      id={`city-${index}`}
                      value={addr.city}
                      onChange={(e) =>
                        handleAddressChange(index, "city", e.target.value)
                      }
                      placeholder="Enter city"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`addressLine-${index}`}>
                      Address Line *
                    </Label>
                    <Input
                      id={`addressLine-${index}`}
                      value={addr.addressLine}
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "addressLine",
                          e.target.value
                        )
                      }
                      placeholder="Enter full address"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                {formData.address.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeAddress(index)}
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addAddress}
              disabled={isSubmitting}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Address
            </Button>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter bio"
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Enter referral code"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loyaltyPoints">Loyalty Points</Label>
                <Input
                  id="loyaltyPoints"
                  name="loyaltyPoints"
                  type="number"
                  min={0}
                  value={formData.loyaltyPoints}
                  onChange={handleInputChange}
                  placeholder="Enter loyalty points"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Customer..." : "Add Customer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
