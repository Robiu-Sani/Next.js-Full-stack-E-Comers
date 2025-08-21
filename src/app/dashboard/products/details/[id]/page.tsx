import DownloadPdfWrapper from "@/defaults/DownloadWrapper";
import React from "react";
import ProductDetails from "./ProductDetails";

export default function page() {
  return (
    <div>
      <DownloadPdfWrapper>
        <ProductDetails />
      </DownloadPdfWrapper>
    </div>
  );
}
