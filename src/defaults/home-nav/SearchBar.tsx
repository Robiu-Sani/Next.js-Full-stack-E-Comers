"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the input when mobile search is opened
  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchValue("");
  };

  return (
    <>
      {/* Desktop Search - Always visible */}
      <div className="hidden md:flex flex-1 lg:w-xl max-w-xl mx-4 relative">
        <Input
          type="text"
          placeholder="Search products..."
          className="pr-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={searchInputRef}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />

        {searchValue && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-800 shadow-lg mt-1 rounded-md p-4 z-50 max-h-[450px] overflow-y-auto">
            <div className="text-sm text-gray-700 dark:text-gray-200">
              Search results for: <strong>{searchValue}</strong>
            </div>
            {/* Add your actual search results here */}
          </div>
        )}
      </div>

      {/* Mobile Search Icon - Only visible on small screens */}
      <div className="md:hidden mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearchToggle}
          aria-label="Search products"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Search Overlay - Appears when icon is clicked */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="text"
              placeholder="Search products..."
              className="flex-1 "
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              ref={searchInputRef}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseMobileSearch}
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {searchValue && (
            <div className="flex-1 overflow-y-auto">
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                Search results for: <strong>{searchValue}</strong>
              </div>
              {/* Add your actual search results here */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
