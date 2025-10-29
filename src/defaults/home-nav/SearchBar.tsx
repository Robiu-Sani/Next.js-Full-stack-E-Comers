"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { Search, X, Package, Folder, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  brand: string;
  images: string[];
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
  averageRating: number;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

interface SearchResults {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
}

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
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
          `/api/v1/search?search=${encodeURIComponent(
            debouncedSearch
          )}&limit=10`
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

  const SearchResultsContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!searchResults) return null;

    const totalResults =
      searchResults.products.length +
      searchResults.categories.length +
      searchResults.subCategories.length;

    if (totalResults === 0) {
      return (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No results found for &quot;{debouncedSearch}&quot;
          </p>
        </div>
      );
    }

    return (
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
          <TabsTrigger value="products">
            Products ({searchResults.products.length})
          </TabsTrigger>
          <TabsTrigger value="categories">
            Categories ({searchResults.categories.length})
          </TabsTrigger>
          <TabsTrigger value="subcategories">
            Sub Categories ({searchResults.subCategories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Products */}
          {searchResults.products.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Products
              </h3>
              <div className="space-y-2">
                {searchResults.products.map((product) => (
                  <Card
                    key={product._id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={product.images[0] || "/placeholder-product.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {product.brand}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-bold text-sm">
                            ${product.generalPrice.currentPrice}
                          </span>
                          {product.generalPrice.discountPercentage > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {product.generalPrice.discountPercentage}% off
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {searchResults.categories.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center mt-4">
                <Folder className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {searchResults.categories.map((category) => (
                  <Card
                    key={category._id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={category.image || "/placeholder-category.jpg"}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{category.name}</h4>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sub Categories */}
          {searchResults.subCategories.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center mt-4">
                <Tag className="h-4 w-4 mr-2" />
                Sub Categories
              </h3>
              <div className="space-y-2">
                {searchResults.subCategories.map((subCategory) => (
                  <Card
                    key={subCategory._id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSubCategoryClick(subCategory._id)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                        <Tag className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {subCategory.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          in {subCategory.category.name}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Individual tabs for each type */}
        <TabsContent value="products">
          <div className="space-y-2">
            {searchResults.products.map((product) => (
              <Card
                key={product._id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleProductClick(product._id)}
              >
                <CardContent className="p-3 flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder-product.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {product.brand}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-sm">
                        ${product.generalPrice.currentPrice}
                      </span>
                      {product.generalPrice.discountPercentage > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {product.generalPrice.discountPercentage}% off
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="space-y-2">
            {searchResults.categories.map((category) => (
              <Card
                key={category._id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleCategoryClick(category._id)}
              >
                <CardContent className="p-3 flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={category.image || "/placeholder-category.jpg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{category.name}</h4>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subcategories">
          <div className="space-y-2">
            {searchResults.subCategories.map((subCategory) => (
              <Card
                key={subCategory._id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSubCategoryClick(subCategory._id)}
              >
                <CardContent className="p-3 flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <Tag className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{subCategory.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      in {subCategory.category.name}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const DesktopSearch = () => (
    <div className="hidden md:flex relative flex-1 lg:w-xl max-w-xl mx-4">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search products, categories, sub-categories..."
          className="pr-10 w-full"
          value={searchValue}
          onChange={handleInputChange}
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
          <SearchResultsContent />
        </div>
      )}
    </div>
  );

  const MobileSearch = () => (
    <div className="md:hidden mx-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearchToggle}
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
                onChange={handleInputChange}
                ref={mobileSearchInputRef}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseMobileSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {searchValue && (
            <div className="flex-1 overflow-y-auto">
              <SearchResultsContent />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <DesktopSearch />
      <MobileSearch />
    </>
  );
}
