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
import { ArrowLeftRight } from "lucide-react";
import CompaireListHandle from "./childrens/CompaireListHandle";
import useContextData from "../custom-component/useContextData";

export default function CompareList() {
  const { compareData } = useContextData();

  const products = compareData.map((item) => item.product);

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ArrowLeftRight className="w-5 h-5" />
            {compareData.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {compareData.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="mb-4">
            <SheetTitle>Your Compare List</SheetTitle>
            <SheetDescription>
              Select two products to compare with each other
            </SheetDescription>
          </SheetHeader>
          <CompaireListHandle products={products} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
