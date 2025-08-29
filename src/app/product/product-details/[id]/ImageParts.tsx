"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ImagePartsProps {
  images: string[];
}

export default function ImageParts({ images }: ImagePartsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleZoomClick = () => {
    setShowZoomModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible py-2 md:py-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-16 w-16 min-w-16 cursor-pointer rounded-md border-2 overflow-hidden ${
              selectedImageIndex === index ? "border-primary" : "border-muted"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="150px"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 order-1 md:order-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative aspect-square">
            <Image
              src={images[selectedImageIndex]}
              alt={`Product image ${selectedImageIndex + 1}`}
              fill
              className="object-contain cursor-zoom-in"
              sizes="(max-width: 768px) 100vw, 50vw"
              onClick={handleZoomClick}
            />

            {/* Zoom button */}
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
                onClick={handleZoomClick}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Zoom Modal */}
      <Dialog open={showZoomModal} onOpenChange={setShowZoomModal}>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-4xl max-h-screen p-0">
          <div className="relative h-[80vh] w-full">
            <Image
              src={images[selectedImageIndex]}
              alt={`Zoomed product image ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="80vh"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
