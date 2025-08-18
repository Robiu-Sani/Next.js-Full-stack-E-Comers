/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

type ContextValue = {
  test: string;
  handleTest: (data: string) => void;
  navItems: NavItem[];
  loading: boolean;
  error: string | null;
};

export const ContextData = createContext<ContextValue | undefined>(undefined);

type ContextProviderProps = {
  children: ReactNode;
};

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

  useEffect(() => {
    const fetchNavData = async () => {
      try {
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
      } catch (err) {
        console.error("Failed to fetch navigation data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNavData();
  }, []);

  const handleTest = (data: string) => {
    setTest(data);
  };

  const value: ContextValue = {
    test,
    handleTest,
    navItems,
    loading,
    error,
  };

  return <ContextData.Provider value={value}>{children}</ContextData.Provider>;
}
