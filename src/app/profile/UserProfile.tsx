/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileImagePart from "./childrens-component/ProfileImagePart";
import ProfileInfoPart from "./childrens-component/ProfileInfoPart";
import OverViewPart from "./childrens-component/OverViewPart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Home,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import useContextData from "@/defaults/custom-component/useContextData";

interface UserData {
  _id: string;
  email: string;
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

interface ApiResponse {
  success: boolean;
  data: ProfileData;
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { UserData } = useContextData();
  useEffect(() => {
    if (!UserData) {
      router.push("/");
    }
  }, [UserData, router]);

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/v1/profile`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (res.statusText == "Not Found" || res.status == 404) {
        router.push("/complete-account");
      }
      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
      }

      const data: ApiResponse = await res.json();

      if (data.success && data.data) {
        setProfileData(data.data);
      } else {
        router.push("/complete-account");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Sync tab with URL query parameter and fetch data
  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }

    fetchProfileData();
  }, [searchParams]);

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      component: (
        <div className="p-6 text-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go to Home Page
            </Button>
          </Link>
        </div>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      component: <div className="p-6 text-center">Orders Content</div>,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      component: <div className="p-6 text-center">Wishlist Content</div>,
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      component: <div className="p-6 text-center">Cart Content</div>,
    },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.replaceState({}, "", url.toString());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchProfileData} className="gap-2">
            <Loader2 className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Desktop Layout - Always show profile info on desktop */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Left Side - 3/5 width */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <ProfileImagePart
              image={profileData?.image || null}
              name={profileData?.name || null}
              email={profileData?.email || profileData?.user?.email || null}
              number={profileData?.number || null}
              role={profileData?.user?.role || null}
            />
            <OverViewPart />
          </div>

          {/* Right Side - 2/5 width */}
          <div className="md:col-span-2 lg:col-span-2">
            <ProfileInfoPart profileData={profileData || null} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Mobile Tab Contents - Include profile tab */}
            <TabsContent value="profile" className="mt-0">
              <div className="space-y-6">
                <ProfileImagePart
                  image={profileData?.image || null}
                  name={profileData?.name || null}
                  email={profileData?.email || profileData?.user?.email || null}
                  number={profileData?.number || null}
                  role={profileData?.user?.role || null}
                />
                <ProfileInfoPart profileData={profileData || null} />
                <OverViewPart />
              </div>
            </TabsContent>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {tab.id === "home" ? (
                  <Link href="/">{tab.component}</Link>
                ) : (
                  tab.component
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop Tabs - Only show non-profile tabs */}
        <div className="hidden md:block mt-8">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full justify-start bg-muted/50 mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.id === "home" ? (
                    <Link href="/" className="hover:underline">
                      {tab.label}
                    </Link>
                  ) : (
                    tab.label
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {tab.id === "home" ? (
                  <Link href="/">{tab.component}</Link>
                ) : (
                  tab.component
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-5 h-16">
          {/* Mobile tabs including profile */}
          <button
            onClick={() => handleTabChange("profile")}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              activeTab === "profile"
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </button>

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                tab.id === "home"
                  ? (window.location.href = "/")
                  : handleTabChange(tab.id)
              }
              className={`flex flex-col items-center justify-center p-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary bg-primary/10"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <tab.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
