import React from "react";
import ProductBanner from "./ProductBanner";
import AllProducts from "./AllProducts";

export default function page() {
  return (
    <div className="top-padding">
      <ProductBanner />
      <AllProducts />
    </div>
  );
}
