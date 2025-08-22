/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SingleImageUpload from "@/shired-component/SingleImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

interface Branch {
  _id: string;
  name: string;
  code: string;
}

interface Contact {
  contactName: string;
  contact: string;
  _id?: string;
}

interface Address {
  addressName: string;
  district: string;
  city: string;
  addressLine: string;
  _id?: string;
}

interface FormData {
  name: string;
  username: string;
  email: string;
  number: string;
  dateOfBirth?: string;
  contacts: Contact[];
  address: Address[];
  image: string;
  bio: string;
  referralCode: string;
  loyaltyPoints: number;
  branch: string;
}

export default function MemberEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    number: "",
    dateOfBirth: "",
    contacts: [{ contactName: "", contact: "" }],
    address: [{ addressName: "", district: "", city: "", addressLine: "" }],
    image: "",
    bio: "",
    referralCode: "",
    loyaltyPoints: 0,
    branch: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchSearch, setBranchSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // Fetch member data
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
          const member = data.data;
          setFormData({
            name: member.name || "",
            username: member.username || "",
            email: member.email || "",
            number: member.number || "",
            dateOfBirth: member.dateOfBirth
              ? new Date(member.dateOfBirth).toISOString().split("T")[0]
              : "",
            contacts:
              member.contacts.length > 0
                ? member.contacts
                : [{ contactName: "", contact: "" }],
            address:
              member.address.length > 0
                ? member.address
                : [
                    {
                      addressName: "",
                      district: "",
                      city: "",
                      addressLine: "",
                    },
                  ],
            image: member.image || "",
            bio: member.bio || "",
            referralCode: member.referralCode || "",
            loyaltyPoints: member.loyaltyPoints || 0,
            branch: member.branch || "",
          });
        } else {
          toast.error("Failed to fetch member data");
        }
      } catch (error) {
        console.error("Error fetching member:", error);
        toast.error("Failed to fetch member data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true);
        const res = await fetch(`/api/v1/branch?search=${branchSearch}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.data) {
          setBranches(data.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Failed to load branches");
      } finally {
        setLoadingBranches(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (branchSearch.length > 0 || branchSearch.length === 0) {
        fetchBranches();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [branchSearch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "loyaltyPoints" ? Number(value) : value,
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
    if (formData.contacts.length <= 1) return;
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
    if (formData.address.length <= 1) return;
    const newAddresses = formData.address.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, address: newAddresses }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Member name is required");
      return;
    }
    if (!formData.email && !formData.number) {
      toast.error("Either email or phone number is required");
      return;
    }
    if (!formData.branch) {
      toast.error("Branch is required");
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
          ? new Date(formData.dateOfBirth).toISOString()
          : undefined,
      };

      const res = await fetch(`/api/v1/management/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submitData),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update member");
      }

      toast.success("Member updated successfully", {
        description: data.message || "Your member has been updated",
      });

      router.push("/dashboard/management");
    } catch (error: unknown) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/management">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Member</h1>
      </div>

      <Card className="w-full shadow-none p-0 border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Edit Member Information
          </CardTitle>
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
                  <Label htmlFor="branch">Branch *</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={isSubmitting}
                      >
                        {formData.branch
                          ? branches.find(
                              (branch) => branch._id === formData.branch
                            )?.name
                          : "Select branch..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search branch..."
                          value={branchSearch}
                          onValueChange={setBranchSearch}
                        />
                        <CommandEmpty>
                          {loadingBranches ? "Loading..." : "No branch found."}
                        </CommandEmpty>
                        <ScrollArea className="h-48">
                          <CommandGroup>
                            {branches.map((branch) => (
                              <CommandItem
                                key={branch._id}
                                value={branch._id}
                                onSelect={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    branch: branch._id,
                                  }));
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.branch === branch._id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{branch.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {branch.code}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
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

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Image</h3>
              <Separator />
              <SingleImageUpload
                onUpload={handleImageUpload}
                initialImage={formData.image}
              />
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
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
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/management")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Updating Member...
                  </>
                ) : (
                  "Update Member"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
