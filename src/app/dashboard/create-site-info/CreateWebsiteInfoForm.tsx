"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PlusIcon, Trash2Icon } from "lucide-react";
import SingleImageUpload from "@/shired-component/SingleImageUpload";

// Define validation schema
const formSchema = z.object({
  number: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  name: z.string().min(1, "Website name is required"),
  logo: z.string().min(1, "Logo URL is required"),
  banner: z.object({
    carousel: z.array(
      z.object({
        image: z.string().min(1, "Image URL is required"),
        link: z.string().min(1, "Link is required"),
      })
    ),
    firstImage: z.object({
      image: z.string().min(1, "Image URL is required"),
      link: z.string().min(1, "Link is required"),
    }),
    secondImage: z.object({
      image: z.string().min(1, "Image URL is required"),
      link: z.string().min(1, "Link is required"),
    }),
  }),
  socialContact: z.object({
    facebook: z.string().min(1, "Facebook link is required"),
    youtube: z.string().optional(),
    instagrame: z.string().optional(),
    linkedIn: z.string().optional(),
    whatsApp: z.string().optional(),
    twitter: z.string().optional(),
  }),
  addresses: z.array(
    z.object({
      name: z.string().min(1, "Address name is required"),
      address: z.string().min(1, "Address is required"),
    })
  ),
  mapLink: z.string().min(1, "Map link is required"),
  footerLinks: z.array(
    z.object({
      name: z.string().min(1, "Link name is required"),
      url: z.string().min(1, "URL is required"),
    })
  ),
  marqueeText: z.string().min(1, "Marquee text is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateWebsiteInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      email: "",
      name: "",
      logo: "",
      banner: {
        carousel: [{ image: "", link: "" }],
        firstImage: { image: "", link: "" },
        secondImage: { image: "", link: "" },
      },
      socialContact: {
        facebook: "",
        youtube: "",
        instagrame: "",
        linkedIn: "",
        whatsApp: "",
        twitter: "",
      },
      addresses: [{ name: "", address: "" }],
      mapLink: "",
      footerLinks: [{ name: "", url: "" }],
      marqueeText: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/v1/web-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create website info");
      }

      toast.success("Website information created successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to create website info", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-none p-0 w-full mx-auto mt-6">
      <CardHeader>
        <CardTitle>Create Website Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Website Name" {...field} />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+880..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo *</FormLabel>
                  <FormControl>
                    <SingleImageUpload
                      onUpload={(url: string) => field.onChange(url)}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Banner Images */}
            <div className="space-y-4">
              <h3 className="font-medium">Banner Images</h3>

              {/* First Image */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">First Banner</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="banner.firstImage.image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image *</FormLabel>
                        <FormControl>
                          <SingleImageUpload
                            onUpload={(url: string) => field.onChange(url)}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="banner.firstImage.link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link *</FormLabel>
                        <FormControl>
                          <Input placeholder="Link URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Second Image */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Second Banner</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="banner.secondImage.image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image *</FormLabel>
                        <FormControl>
                          <SingleImageUpload
                            onUpload={(url: string) => field.onChange(url)}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="banner.secondImage.link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link *</FormLabel>
                        <FormControl>
                          <Input placeholder="Link URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Carousel Images */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Carousel Banners</h4>
                {form.watch("banner.carousel").map((_, index) => (
                  <div key={index} className="space-y-4 border p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`banner.carousel.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image {index + 1} *</FormLabel>
                            <FormControl>
                              <SingleImageUpload
                                onUpload={(url: string) => field.onChange(url)}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`banner.carousel.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link {index + 1} *</FormLabel>
                            <FormControl>
                              <Input placeholder="Link URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const carousel = form.getValues("banner.carousel");
                          form.setValue(
                            "banner.carousel",
                            carousel.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Remove Carousel
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    form.setValue("banner.carousel", [
                      ...form.getValues("banner.carousel"),
                      { image: "", link: "" },
                    ]);
                  }}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Carousel Image
                </Button>
              </div>
            </div>

            {/* Social Contacts */}
            <div className="space-y-4">
              <h3 className="font-medium">Social Contacts</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="socialContact.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook *</FormLabel>
                      <FormControl>
                        <Input placeholder="Facebook URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialContact.youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input placeholder="YouTube URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialContact.instagrame"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="Instagram URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialContact.linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialContact.whatsApp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="WhatsApp number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialContact.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="Twitter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-4">
              <h3 className="font-medium">Addresses</h3>
              {form.watch("addresses").map((_, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Head Office" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const addresses = form.getValues("addresses");
                        form.setValue(
                          "addresses",
                          addresses.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Remove Address
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  form.setValue("addresses", [
                    ...form.getValues("addresses"),
                    { name: "", address: "" },
                  ]);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>

            {/* Map Link */}
            <FormField
              control={form.control}
              name="mapLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Link *</FormLabel>
                  <FormControl>
                    <Input placeholder="Google Maps embed URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Links */}
            <div className="space-y-4">
              <h3 className="font-medium">Footer Links</h3>
              {form.watch("footerLinks").map((_, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`footerLinks.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., About Us" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`footerLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link URL *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/about"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const footerLinks = form.getValues("footerLinks");
                        form.setValue(
                          "footerLinks",
                          footerLinks.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Remove Footer Link
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  form.setValue("footerLinks", [
                    ...form.getValues("footerLinks"),
                    { name: "", url: "" },
                  ]);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Footer Link
              </Button>
            </div>

            {/* Marquee Text */}
            <FormField
              control={form.control}
              name="marqueeText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marquee Text *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Text to display in the marquee"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Website Info"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
