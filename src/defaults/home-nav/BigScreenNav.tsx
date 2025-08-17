"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  id: string;
  children: {
    name: string;
    id: string;
  }[];
}

export default function BigScreenNav({ navItems }: { navItems: NavItem[] }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Calculate columns based on children count
  const getColumns = (childrenCount: number) => {
    if (childrenCount <= 6) return 1;
    if (childrenCount <= 12) return 2;
    return 3;
  };

  return (
    <nav className="w-full max-w-screen-xl mx-auto px-2 py-0">
      <div className="flex items-center justify-center">
        {/* Home Link */}
        <Link href="/" className="mr-4 shrink-0">
          <Button variant="ghost" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Button>
        </Link>

        {/* Category Links */}
        <div className="flex flex-wrap justify-center items-center gap-1 relative">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Button
                variant="ghost"
                asChild
                className="flex items-center gap-1 px-1 py-1"
              >
                <Link href={`/products/${item.id}`}>
                  {item.name}
                  {item.children.length > 0 && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
              </Button>

              {/* Subcategory Dropdown */}
              {item.children.length > 0 && (
                <div
                  className={cn(
                    "absolute top-full z-50 mt-1 max-h-[350px] overflow-y-auto rounded-md border bg-popover p-1 shadow-lg transition-opacity",
                    hoveredItem === item.id
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none",
                    // Position dropdown to left when near right screen edge
                    index > navItems.length / 2 ? "right-0" : "left-0"
                  )}
                  style={{
                    width: "max-content",
                    maxWidth: "min(90vw, 600px)",
                  }}
                >
                  <div
                    className={`grid gap-1`}
                    style={{
                      gridTemplateColumns: `repeat(${getColumns(
                        item.children.length
                      )}, minmax(150px, 1fr))`,
                    }}
                  >
                    {item.children.map((child) => (
                      <Button
                        key={child.id}
                        variant="ghost"
                        asChild
                        className="w-full justify-start text-left whitespace-nowrap"
                      >
                        <Link
                          href={`/products/${item.id}/${child.id}`}
                          className="hover:bg-accent hover:text-accent-foreground px-3 py-2"
                        >
                          {child.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
