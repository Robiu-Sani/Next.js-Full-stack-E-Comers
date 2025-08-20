"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Crown,
  User,
  Shield,
  Edit,
  Camera,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";

interface ProfileImagePartProps {
  image: string | null;
  name: string | null;
  email: string | null;
  number: string | null;
  role: string | null;
}

export default function ProfileImagePart({
  image,
  name,
  email,
  number,
  role,
}: ProfileImagePartProps) {
  const defaultProfileImage = "https://i.postimg.cc/XJDtkf1V/images.jpg";
  const coverImage =
    "https://i.postimg.cc/FH556xrz/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg";

  // Get initials from name
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge color and icon
  const getRoleDetails = (role: string | null) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <Shield className="h-3 w-3" />,
        };
      case "super-admin":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <Crown className="h-3 w-3" />,
        };
      case "moderator":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Star className="h-3 w-3" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <User className="h-3 w-3" />,
        };
    }
  };

  const roleDetails = getRoleDetails(role);

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      {/* Cover Image */}
      <div className="relative h-32 md:h-40 bg-gradient-to-r from-blue-600 to-purple-600">
        <Image
          width={1000}
          height={100}
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* ------------- Edit Cover Button ------------------- */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute hidden top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm"
        >
          <Camera className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </div>

      <CardContent className="p-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative -mt-16 md:-mt-20">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
              <AvatarImage
                src={image || defaultProfileImage}
                alt={name || "User"}
              />
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>

            {/* Edit Profile Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white shadow-md border"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {/* Name and Role */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {name || "Unknown User"}
                </h1>
                {role && (
                  <Badge
                    variant="outline"
                    className={`${roleDetails.color} border px-3 py-1 rounded-full flex items-center gap-1 w-fit mx-auto md:mx-0`}
                  >
                    {roleDetails.icon}
                    <span className="text-xs font-medium capitalize">
                      {role.replace("-", " ")}
                    </span>
                  </Badge>
                )}
              </div>

              {/* Username */}
              <p className="text-gray-600 text-sm">
                @{name ? name.toLowerCase().replace(/\s+/g, "") : "username"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              {email && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="truncate">{email}</span>
                </div>
              )}

              {number && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span>{number}</span>
                </div>
              )}
            </div>

            {/* Missing Info Alert */}
            {(!email || !number) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {!email && !number
                    ? "Add your email and phone number to complete your profile"
                    : !email
                    ? "Add your email address to complete your profile"
                    : "Add your phone number to complete your profile"}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Wishlist</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
