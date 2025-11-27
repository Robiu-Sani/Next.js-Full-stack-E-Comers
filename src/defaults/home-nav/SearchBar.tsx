"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchResults } from "@/interface/types";
import DesktopSearch from "./DesktopSearch";
import MobileSearch from "./MobileSearch";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults(null);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/v1/search?search=${encodeURIComponent(debouncedSearch)}&limit=10`
        );
        const data = await res.json();

        if (data.success) {
          setSearchResults(data.data);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  // Focus the input when mobile search is opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setSearchValue("");
      setSearchResults(null);
    }
  };

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchValue("");
    setSearchResults(null);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/product-details/${productId}`);
    handleCloseMobileSearch();
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products/${categoryId}`);
    handleCloseMobileSearch();
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    router.push(`/products/sub-category/${subCategoryId}`);
    handleCloseMobileSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <DesktopSearch
        searchValue={searchValue}
        onInputChange={handleInputChange}
        searchInputRef={searchInputRef}
        searchResults={searchResults}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductClick={handleProductClick}
        onCategoryClick={handleCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
      />
      <MobileSearch
        searchValue={searchValue}
        onInputChange={handleInputChange}
        mobileSearchInputRef={mobileSearchInputRef}
        isMobileSearchOpen={isMobileSearchOpen}
        onSearchToggle={handleSearchToggle}
        onCloseMobileSearch={handleCloseMobileSearch}
        searchResults={searchResults}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductClick={handleProductClick}
        onCategoryClick={handleCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
      />
    </>
  );
}