"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function HomeCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/v1/home-category`, { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setMaxScroll(
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      );
    }
  }, [categories]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const newPosition = Math.max(scrollPosition - 250, 0);
      carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const newPosition = Math.min(scrollPosition + 250, maxScroll);
      carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const handleCardClick = (categoryId: string) => {
    router.push(`/products/${categoryId}`);
  };

  return (
    <div className="container max-w-7xl mx-auto px-2 pb-2">
      <h2 className="text-lg font-semibold text-gray-700 ">
        Explore Categories
      </h2>

      <div className="relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-4 -mx-2 px-2"
          whileTap={{ cursor: "grabbing" }}
          style={{ scrollbarWidth: "none" }} // hide Firefox scrollbar
        >
          {categories.map((category) => (
            <motion.div
              key={category._id}
              className="flex-shrink-0 w-[120px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCardClick(category._id)}
            >
              <Card className="overflow-hidden p-0 rounded-xl shadow-lg relative h-[140px]">
                <CardContent className="p-0 relative w-full h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill={true}
                    className="object-cover w-full h-full"
                  />

                  {/* Bottom Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent" />

                  {/* Category Name */}
                  <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-center">
                    {category.name}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Left Scroll Button */}
        {scrollPosition > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full border-none p-2 z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </Button>
        )}

        {/* Right Scroll Button */}
        {scrollPosition < maxScroll && maxScroll > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full border-none p-2 z-10"
            onClick={scrollRight}
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </Button>
        )}
      </div>
    </div>
  );
}
