/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import useGetWebsiteInfo from "../custom-hooks/useGetWebsiteInfo";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeBanner() {
  const { data, isLoading, error } = useGetWebsiteInfo();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract banner data with fallback defaults
  const bannerData = data?.banner || {
    firstImage: { image: "", link: "#" },
    secondImage: { image: "", link: "#" },
    carousel: [],
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (bannerData.carousel.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.carousel.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerData.carousel.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.carousel.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + bannerData.carousel.length) % bannerData.carousel.length
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="w-full md:w-2/3 h-[400px]" />
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <Skeleton className="h-[192px] w-full" />
            <Skeleton className="h-[192px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !bannerData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-4 text-center text-destructive">
          Failed to load banner data
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4 max-w-7xl">
      <div className="flex flex-col md:h-[400px] md:flex-row gap-2">
        {/* Carousel Section - 2/3 width on desktop */}
        <div className="w-full md:w-2/3 relative group">
          {bannerData.carousel.length > 0 ? (
            <>
              <Card className="overflow-hidden md:h-[400px] h-auto min-h-[200px] sm:h-[320px] relative">
                <a href={bannerData.carousel[currentSlide]?.link || "#"}>
                  <Image
                    src={bannerData.carousel[currentSlide]?.image}
                    alt={`Banner Slide ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </a>

                {/* Indicators - Overlay on image */}
                {bannerData.carousel.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {bannerData.carousel.map((_: any, index: number) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${
                          currentSlide === index
                            ? "bg-white w-4"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </Card>

              {/* Navigation Arrows */}
              {bannerData.carousel.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      prevSlide();
                    }}
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      nextSlide();
                    }}
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Card className="h-[500px] flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">
                No carousel images available
              </p>
            </Card>
          )}
        </div>

        {/* Side Banners - 1/3 width on desktop */}
        <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-2">
          <Card className="flex-1 justify-center items-center p-0 overflow-hidden">
            <a href={bannerData.firstImage.link}>
              <Image
                src={bannerData.firstImage.image || "/placeholder-banner.jpg"}
                alt="First Banner"
                width={600}
                height={500}
                className="object-cover w-full max-h-full min-h-full"
              />
            </a>
          </Card>
          <Card className="flex-1 justify-center items-center  p-0 overflow-hidden">
            <a href={bannerData.secondImage.link}>
              <Image
                src={bannerData.secondImage.image || "/placeholder-banner.jpg"}
                alt="Second Banner"
                width={600}
                height={500}
                className="object-cover w-full max-h-[100%] min-h-[100%]"
              />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
