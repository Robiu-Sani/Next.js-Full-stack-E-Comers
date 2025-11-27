/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Package, Folder, Tag, ArrowRight, ShoppingBasket, PackageSearch, Locate, WalletCards } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { SearchResultsContentProps } from "@/interface/types";

const SearchResultsContent: React.FC<SearchResultsContentProps> = ({
  searchResults,
  isLoading,
  debouncedSearch,
  onProductClick,
  onCategoryClick,
  onSubCategoryClick,
}) => {
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
    <Tabs defaultValue="all" className="w-full overflow-y-hidden">
      <TabsList className="grid w-full grid-cols-4 mb-4 gap-1">
  <TabsTrigger value="all" className="flex items-center gap-2 px-2 sm:px-3">
    <WalletCards className="h-4 w-4 flex-shrink-0" />
    <span className="hidden sm:inline">All</span>
    <span className="hidden sm:inline">({totalResults})</span>
    {/* Mobile badge */}
    <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs h-4 w-4 flex items-center justify-center">
      {totalResults}
    </span>
  </TabsTrigger>
  
  <TabsTrigger value="products" className="flex items-center gap-2 px-2 sm:px-3 relative">
    <ShoppingBasket className="h-4 w-4 flex-shrink-0" />
    <span className="hidden sm:inline">Products</span>
    <span className="hidden sm:inline">({searchResults.products.length})</span>
    {/* Mobile badge */}
    <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs h-4 w-4 flex items-center justify-center">
      {searchResults.products.length}
    </span>
  </TabsTrigger>
  
  <TabsTrigger value="categories" className="flex items-center gap-2 px-2 sm:px-3 relative">
    <PackageSearch className="h-4 w-4 flex-shrink-0" />
    <span className="hidden sm:inline">Categories</span>
    <span className="hidden sm:inline">({searchResults.categories.length})</span>
    {/* Mobile badge */}
    <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs h-4 w-4 flex items-center justify-center">
      {searchResults.categories.length}
    </span>
  </TabsTrigger>
  
  <TabsTrigger value="subcategories" className="flex items-center gap-2 px-2 sm:px-3 relative">
    <Locate className="h-4 w-4 flex-shrink-0" />
    <span className="hidden sm:inline">Subcategory</span>
    <span className="hidden sm:inline">({searchResults.subCategories.length})</span>
    {/* Mobile badge */}
    <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs h-4 w-4 flex items-center justify-center">
      {searchResults.subCategories.length}
    </span>
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
              {searchResults.products.map((product:any) => (
                <Card
                  key={product._id}
                  className="cursor-pointer hover:bg-accent py-0 rounded-sm transition-colors"
                  onClick={() => onProductClick(product._id)}
                >
                  <CardContent className="flex p-2 items-center space-x-3">
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
              {searchResults.categories.map((category:any) => (
                <Card
                  key={category._id}
                  className="cursor-pointer  py-0 rounded-sm hover:bg-accent transition-colors"
                  onClick={() => onCategoryClick(category._id)}
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
              {searchResults.subCategories.map((subCategory:any) => (
                <Card
                  key={subCategory._id}
                  className="cursor-pointer  py-0 rounded-sm hover:bg-accent transition-colors"
                  onClick={() => onSubCategoryClick(subCategory._id)}
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
          {searchResults.products.map((product:any) => (
            <Card
              key={product._id}
              className="cursor-pointer  py-0 rounded-sm hover:bg-accent transition-colors"
              onClick={() => onProductClick(product._id)}
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
          {searchResults.categories.map((category:any) => (
            <Card
              key={category._id}
              className="cursor-pointer  py-0 rounded-sm hover:bg-accent transition-colors"
              onClick={() => onCategoryClick(category._id)}
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
          {searchResults.subCategories.map((subCategory:any) => (
            <Card
              key={subCategory._id}
              className="cursor-pointer  py-0 rounded-sm hover:bg-accent transition-colors"
              onClick={() => onSubCategoryClick(subCategory._id)}
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

export default SearchResultsContent;