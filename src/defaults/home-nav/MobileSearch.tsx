import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { MobileSearchProps } from "@/interface/types";
import SearchResultsContent from "./SearchResultsContent";

const MobileSearch: React.FC<MobileSearchProps> = ({
  searchValue,
  onInputChange,
  mobileSearchInputRef,
  isMobileSearchOpen,
  onSearchToggle,
  onCloseMobileSearch,
  searchResults,
  isLoading,
  debouncedSearch,
  onProductClick,
  onCategoryClick,
  onSubCategoryClick,
}) => {
  return (
    <div className="md:hidden mx-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchToggle}
        aria-label="Search products"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-background z-50 p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search products, categories, sub-categories..."
                className="pr-10 w-full"
                value={searchValue}
                onChange={onInputChange}
                ref={mobileSearchInputRef}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" onClick={onCloseMobileSearch}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {searchValue && (
            <div className="flex-1 overflow-y-auto">
              <SearchResultsContent
                searchResults={searchResults}
                isLoading={isLoading}
                debouncedSearch={debouncedSearch}
                onProductClick={onProductClick}
                onCategoryClick={onCategoryClick}
                onSubCategoryClick={onSubCategoryClick}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;