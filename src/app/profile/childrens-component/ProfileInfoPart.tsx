/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Phone,
  User,
  FileText,
  Gift,
  Shield,
  Edit,
  Plus,
  AlertCircle,
  Home,
  Briefcase,
  Heart,
  ShoppingBag,
  Crown,
  Star,
} from "lucide-react";

interface UserData {
  _id: string;
  email: string;
  number?: string;
  password: string;
  role: string;
  status: string;
  isSocial: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

interface ProfileData {
  _id: string;
  name: string;
  username: string;
  email: string;
  user: UserData;
  number: string;
  dateOfBirth: string;
  contacts: Contact[];
  address: Address[];
  image: string;
  orders: any[];
  isDeleted: boolean;
  bio: string;
  referralCode: string;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OverViewPartProps {
  profileData: ProfileData | null;
}

export default function ProfileInfoPart({ profileData }: OverViewPartProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleDetails = (role: string | null) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <Shield className="h-4 w-4" />,
        };
      case "super-admin":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <Crown className="h-4 w-4" />,
        };
      case "moderator":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Star className="h-4 w-4" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <User className="h-4 w-4" />,
        };
    }
  };

  const roleDetails = getRoleDetails(profileData?.user?.role || null);

  if (!profileData) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Profile Incomplete
            </h3>
            <p className="text-gray-600 mb-6">
              Your profile information is missing. Please complete your profile
              to access all features.
            </p>
            <Link href="/complete-account">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Complete Your Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasMissingInfo =
    !profileData.bio ||
    !profileData.dateOfBirth ||
    !profileData.contacts?.length ||
    !profileData.address?.length;

  return (
    <div className="space-y-6">
      {/* Missing Info Alert */}
      {hasMissingInfo && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <h4 className="font-semibold text-yellow-800">
                  Profile Incomplete
                </h4>
                <p className="text-yellow-700 text-sm">
                  Some information is missing from your profile
                </p>
              </div>
            </div>
            <Link href="/complete-account">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-yellow-300"
              >
                <Edit className="h-4 w-4" />
                Complete Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Bio Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profileData.bio ? (
            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="mb-3">No bio added yet</p>
              <Link href="/complete-account">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Bio
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <p className="text-gray-900 font-medium">
                {profileData.name || "Not set"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username
              </label>
              <p className="text-gray-900 font-medium">
                @{profileData.username || "Not set"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <p className="text-gray-900 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDate(profileData.dateOfBirth)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <Badge
                variant="outline"
                className={`${roleDetails.color} border px-3 py-1 rounded-full flex items-center gap-1 w-fit`}
              >
                {roleDetails.icon}
                <span className="text-xs font-medium capitalize">
                  {profileData.user?.role?.replace("-", " ") || "user"}
                </span>
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Member Since
              </label>
              <p className="text-gray-900 font-medium">
                {new Date(profileData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Loyalty Points
              </label>
              <p className="text-gray-900 font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-purple-500" />
                {profileData.loyaltyPoints || 0} points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profileData.contacts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.contacts.map((contact) => (
                <div key={contact._id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium capitalize">
                      {contact.contactName}
                    </span>
                  </div>
                  <p className="text-gray-700">{contact.contact}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Phone className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="mb-3">No contact information added</p>
              <Link href="/complete-account">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Contacts
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profileData.address?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.address.map((address) => (
                <div key={address._id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      {address.addressName.toLowerCase() === "home" ? (
                        <Home className="h-4 w-4 text-green-600" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <span className="font-medium capitalize">
                      {address.addressName}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">{address.addressLine}</p>
                    <p className="text-gray-600">
                      {address.district}, {address.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="mb-3">No address information added</p>
              <Link href="/complete-account">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Address
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Account Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">0</div>
              <div className="text-sm text-blue-600">Total Orders</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">0</div>
              <div className="text-sm text-green-600">Wishlist Items</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">0</div>
              <div className="text-sm text-purple-600">Reviews</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Gift className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">
                {profileData.loyaltyPoints || 0}
              </div>
              <div className="text-sm text-orange-600">Loyalty Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add missing icon component
function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
