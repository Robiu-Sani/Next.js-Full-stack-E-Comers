export interface Product {
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

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

export interface SearchResults {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
}

export interface SearchResultsContentProps {
  searchResults: SearchResults | null;
  isLoading: boolean;
  debouncedSearch: string;
  onProductClick: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (subCategoryId: string) => void;
}

export interface DesktopSearchProps {
  searchValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchResults: SearchResults | null;
  isLoading: boolean;
  debouncedSearch: string;
  onProductClick: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (subCategoryId: string) => void;
}

export interface MobileSearchProps {
  searchValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileSearchInputRef: React.RefObject<HTMLInputElement | null>;
  isMobileSearchOpen: boolean;
  onSearchToggle: () => void;
  onCloseMobileSearch: () => void;
  searchResults: SearchResults | null;
  isLoading: boolean;
  debouncedSearch: string;
  onProductClick: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (subCategoryId: string) => void;
}