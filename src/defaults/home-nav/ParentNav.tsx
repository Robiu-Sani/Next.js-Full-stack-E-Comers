"use client";
import React, { useEffect, useState } from "react";
import NavTopSection from "./NavTopSection";
import BigScreenNav from "./BigScreenNav";
import SmallScreenNav from "./SmallScreenNav";

interface NavItem {
  name: string;
  id: string;
  children: {
    name: string;
    id: string;
  }[];
}

export default function ParentNav() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const res = await fetch("/api/v1/nav", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.status === "success") {
          setNavItems(data.navItems);
        } else {
          throw new Error(data.message || "Failed to fetch navigation data");
        }
      } catch (err) {
        console.error("Failed to fetch navigation data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNavData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex fixed top-0 z-[498] justify-center items-center flex-col bg-white dark:bg-zinc-900 shadow-md">
        <NavTopSection />
        <div className="container mx-auto px-2 py-4">
          <div className="animate-pulse flex justify-center">
            <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex fixed top-0 z-[498] justify-center items-center flex-col bg-white dark:bg-zinc-900 shadow-md">
        <NavTopSection />
        <div className="container mx-auto px-2 py-4 text-center text-red-500 dark:text-red-400">
          Failed to load navigation: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex fixed top-0 z-[498] justify-center items-center flex-col bg-white dark:bg-zinc-900 shadow-md">
      <NavTopSection />
      <div className="w-full">
        <div className="md:hidden block">
          <SmallScreenNav navItems={navItems} />
        </div>
        <div className="hidden md:block">
          <BigScreenNav navItems={navItems} />
        </div>
      </div>
    </div>
  );
}
