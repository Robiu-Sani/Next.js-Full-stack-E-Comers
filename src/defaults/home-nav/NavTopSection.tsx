"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import WishList from "./WishList";
import CartList from "./CartList";
import SearchBar from "./SearchBar";
import useContextData from "../custom-component/useContextData";
import CpmpaireList from "./CpmpaireList";

export default function NavTopSection() {
  const { UserData } = useContextData();

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
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-0">
          <div className="block md:hidden">
            <SearchBar />
          </div>

          {/* Wishlist Sheet */}
          <WishList />

          {/* Cart Sheet */}
          <CartList />

          {/* compaire sheet  */}
          <CpmpaireList />

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Profile Button */}
          {UserData ? (
            <Link href={UserData?.role == "user" ? "/profile" : "/dashboard"}>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button variant="ghost" size="icon">
                <LogIn className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
