"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  id: string;
  children: {
    name: string;
    id: string;
  }[];
}

export default function SmallScreenNav({ navItems }: { navItems: NavItem[] }) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <div className="h-full flex flex-col">
            {/* Header */}
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle className="text-left text-xl font-bold">
                Menu
              </SheetTitle>
            </SheetHeader>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {/* Home Link */}
              <div className="mb-2">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 h-auto rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link href="/" className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-primary" />
                    <span className="text-base font-medium">Home</span>
                  </Link>
                </Button>
              </div>

              <Separator className="my-2" />

              {/* Categories */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.id} className="group">
                    {/* Category Item */}
                    <div
                      className={cn(
                        "flex items-center rounded-lg transition-colors",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        expandedCategories[item.id] &&
                          "bg-gray-50 dark:bg-gray-800/50"
                      )}
                    >
                      <Button
                        asChild={item.children.length === 0}
                        variant="ghost"
                        className={cn(
                          "max-w-full justify-start px-4 py-3 h-auto rounded-lg",
                          "text-base font-medium",
                          item.children.length > 0 && "pr-2"
                        )}
                        onClick={() => {
                          if (item.children.length > 0) {
                            toggleCategory(item.id);
                          }
                        }}
                      >
                        {item.children.length === 0 ? (
                          <Link
                            href={`/products/${item.id}`}
                            className="flex-1 text-left flex items-center gap-3"
                          >
                            <span className="w-5 h-5 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                            </span>
                            {item.name}
                          </Link>
                        ) : (
                          <div className="flex-1 flex items-center gap-3">
                            <span className="w-5 h-5 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                            </span>
                            {item.name}
                          </div>
                        )}
                      </Button>

                      {item.children.length > 0 && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 mr-2 text-muted-foreground transition-transform",
                            expandedCategories[item.id] && "rotate-90"
                          )}
                        />
                      )}
                    </div>

                    {/* Subcategories */}
                    {item.children.length > 0 &&
                      expandedCategories[item.id] && (
                        <div className="ml-8 pl-2 space-y-1 my-1 border-l-2 border-gray-200 dark:border-gray-700">
                          {item.children.map((child) => (
                            <Button
                              key={child.id}
                              asChild
                              variant="ghost"
                              className="w-full justify-start px-4 py-2 h-auto rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Link
                                href={`/products/${item.id}/${child.id}`}
                                className="flex items-center gap-3 text-sm"
                              >
                                <span className="text-muted-foreground">-</span>
                                {child.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
