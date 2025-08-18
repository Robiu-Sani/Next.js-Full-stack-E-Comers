/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

export default function useGetWebsiteInfo() {
  const [data, setData] = useState<any>(null);
  const [bannerData, setBannerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/web-info", {
        method: "GET",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch website info");
      }

      setData(result.data);
      setBannerData(result.data.banner);
    } catch (error: any) {
      console.error("Fetch error:", error);
      setError(
        error?.message || "An error occurred while fetching website info"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to refetch data if needed
  const refetch = () => {
    fetchData();
  };

  return {
    data,
    bannerData,
    isLoading,
    error,
    refetch,
  };
}
