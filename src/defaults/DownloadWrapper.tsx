"use client";
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { FileText, ImageDown, LoaderCircle } from "lucide-react";

export default function DownloadPdfWrapper({
  children,
  filename = "document",
}: {
  children: React.ReactNode;
  filename?: string;
}) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      if (targetRef.current) {
        const doc = new jsPDF();
        const dataUrl = await toPng(targetRef.current, { cacheBust: true });
        const imgProps = doc.getImageProperties(dataUrl);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save("document.pdf");
      }
    } catch (err) {
      console.log(err);
      toast.error("Try Again!! Download faield!");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);
      if (targetRef.current) {
        const dataUrl = await toPng(targetRef.current, { cacheBust: true });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${filename}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Download buttons with loading indicators */}
      <div className="absolute top-0 right-0 z-10 px-3 py-1 flex gap-4">
        {/* PDF Download Button */}
        <div className="group relative md:block hidden cursor-pointer">
          <button
            onClick={downloadAsPDF}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download as PDF"
          >
            {isGeneratingPdf ? (
              <LoaderCircle className="animate-spin w-5" />
            ) : (
              <FileText className="w-5" />
            )}
          </button>
          <span className="absolute z-[9999] bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Download as PDF
          </span>
        </div>

        {/* Image Download Button */}
        <div className="group relative md:block hidden cursor-pointer">
          <button
            onClick={handleDownloadImage}
            disabled={isGeneratingImage}
            className="flex items-center gap-2  disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download as Image"
          >
            {isGeneratingImage ? (
              <LoaderCircle className="animate-spin w-5" />
            ) : (
              <ImageDown className="w-5" />
            )}
          </button>
          <span className="absolute z-[9999] bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Download as Image
          </span>
        </div>
      </div>

      {/* Hidden content for PDF/Image generation with forced safe colors */}
      <div ref={targetRef} className="w-full  pt-10">
        <div
          style={{
            all: "unset",
            color: "#000000",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
