/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import LogedUser from "../functions/LogedUser";

type ContextValue = {
  test: string;
  handleTest: (data: string) => void;
  navItems: NavItem[];
  loading: boolean;
  error: string | null;
  UserData: any;
  handleUser: any;
  compareData: CompareProduct[];
  handleAddCompare: (product: any) => void;
  wishlistData: WishlistProduct[];
  handleAddWishlist: (product: any) => void;
  cartData: CartProduct[];
  handleAddCart: (product: any) => void;
};

export const ContextData = createContext<ContextValue | undefined>(undefined);

type ContextProviderProps = {
  children: ReactNode;
};

interface CompareProduct {
  product: any;
  expiresAt: number;
}

interface WishlistProduct {
  product: any;
  expiresAt: number;
}

interface CartProduct {
  product: any;
  expiresAt: number;
  quantity: number;
}

interface NavItem {
  name: string;
  id: string;
  children: {
    name: string;
    id: string;
  }[];
}

export default function Context({ children }: ContextProviderProps) {
  const [test, setTest] = useState<string>("hello world");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [UserData, setUserData] = useState();
  const [compareData, setCompareData] = useState<CompareProduct[]>([]);
  const [wishlistData, setWishlistData] = useState<WishlistProduct[]>([]);
  const [cartData, setCartData] = useState<CartProduct[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch navigation data
        const res = await fetch("/api/v1/nav", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.status === "success") {
          setNavItems(data.navItems);
        } else {
          throw new Error(data.message || "Failed to fetch navigation data");
        }

        // Fetch user data
        const userinfo: any = await LogedUser();
        setUserData(userinfo);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Load compare data
    const storedCompare = localStorage.getItem("compareProducts");
    if (storedCompare) {
      const parsedData = JSON.parse(storedCompare);
      const now = Date.now();
      const validProducts = parsedData.filter(
        (item: any) => item.expiresAt > now
      );
      setCompareData(validProducts);
    }

    // Load wishlist data
    const storedWishlist = localStorage.getItem("WishlistProducts");
    if (storedWishlist) {
      const parsedData = JSON.parse(storedWishlist);
      const now = Date.now();
      const validProducts = parsedData.filter(
        (item: any) => item.expiresAt > now
      );
      setWishlistData(validProducts);
    }

    // Load cart data
    const storedCart = localStorage.getItem("cartProducts");
    if (storedCart) {
      const parsedData = JSON.parse(storedCart);
      const now = Date.now();
      const validProducts = parsedData.filter(
        (item: any) => item.expiresAt > now
      );
      setCartData(validProducts);
    }
  }, []);

  // Compare functions
  const handleAddCompare = (product: any) => {
    setCompareData(product);
  };

  // Wishlist functions
  const handleAddWishlist = (product: any) => {
    setWishlistData(product);
  };

  // Cart functions
  const handleAddCart = (product: any) => {
    setCartData(product);
  };

  const handleTest = (data: string) => {
    setTest(data);
  };

  const handleUser = (data: any) => {
    setUserData(data);
  };

  const value: ContextValue = {
    test,
    handleTest,
    navItems,
    loading,
    error,
    UserData,
    handleUser,
    compareData,
    handleAddCompare,
    wishlistData,
    handleAddWishlist,
    cartData,
    handleAddCart,
  };

  return <ContextData.Provider value={value}>{children}</ContextData.Provider>;
}
