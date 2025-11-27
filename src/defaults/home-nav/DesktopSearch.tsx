import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DesktopSearchProps } from "@/interface/types";
import SearchResultsContent from "./SearchResultsContent";

const DesktopSearch: React.FC<DesktopSearchProps> = ({
  searchValue,
  onInputChange,
  searchInputRef,
  searchResults,
  isLoading,
  debouncedSearch,
  onProductClick,
  onCategoryClick,
  onSubCategoryClick,
}) => {
  return (
    <div className="hidden md:flex relative flex-1 lg:w-xl max-w-xl mx-4">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search products, categories, sub-categories..."
          className="pr-10 w-full"
          value={searchValue}
          onChange={onInputChange}
          ref={searchInputRef}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {searchValue && (
        <div className="absolute top-full left-0 w-full bg-background border shadow-lg mt-1 rounded-md p-4 z-50 max-h-[450px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Search results for: <strong>{searchValue}</strong>
            </p>
          </div>
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
  );
};

export default DesktopSearch;