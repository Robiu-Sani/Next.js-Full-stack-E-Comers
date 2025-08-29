/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Heart } from "lucide-react";
import useContextData from "../custom-component/useContextData";
import WishlistListHandle from "./childrens/WishlistListHandle";

export default function WishList() {
  const { wishlistData } = useContextData();
  const products: any = wishlistData.map((item) => item.product);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="w-5 h-5" />
          {wishlistData.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {wishlistData.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Wishlist</SheetTitle>
          <SheetDescription></SheetDescription>
          <WishlistListHandle products={products} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
