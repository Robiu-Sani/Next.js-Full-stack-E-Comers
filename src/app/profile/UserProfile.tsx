/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProfileImagePart from "./childrens-component/ProfileImagePart";
import ProfileInfoPart from "./childrens-component/ProfileInfoPart";
import OverViewPart from "./childrens-component/OverViewPart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Heart, ShoppingCart, Home } from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const searchParams = useSearchParams();

  // Sync tab with URL query parameter
  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
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
      id: "profile",
      label: "Profile",
      icon: User,
      component: (
        <div className="space-y-6">
          <ProfileImagePart />
          <ProfileInfoPart />
          <OverViewPart />
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {" "}
      {/* Added padding for mobile bottom nav */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Left Side - 3/5 width */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <ProfileImagePart />
            <OverViewPart />
          </div>

          {/* Right Side - 2/5 width */}
          <div className="md:col-span-2 lg:col-span-2">
            <ProfileInfoPart />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Tab Contents */}
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

        {/* Desktop Tabs */}
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
                    <Link href="/">{tab.label}</Link>
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary bg-primary/10"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <tab.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">
                {tab.id === "home" ? (
                  <Link href="/">{tab.label}</Link>
                ) : (
                  tab.label
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
