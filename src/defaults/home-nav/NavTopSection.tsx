"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import WishList from "./WishList";
import CartList from "./CartList";

export default function NavTopSection() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="w-full  py-2 ">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src={`/logo.png`}
            alt="logo"
            width={120}
            height={50}
            className="h-10 drop-shadow-md w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="pr-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-800 shadow-lg mt-1 rounded-md p-2 z-50">
              <div className="text-sm text-gray-700 dark:text-gray-200">
                Search result for: <strong>{searchValue}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          {/* Wishlist Sheet */}
          <WishList />

          {/* Cart Sheet */}
          <CartList />

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Profile Button */}
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
