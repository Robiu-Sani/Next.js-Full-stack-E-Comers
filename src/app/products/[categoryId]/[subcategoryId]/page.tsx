import React from "react";
import ProductBanner from "../../ProductBanner";
import Products from "@/app/_home/Products";
import SubCategoryProduct from "./SubCategoryProduct";

export default function page() {
  return (
    <div className="top-padding">
      <ProductBanner />
      <SubCategoryProduct />
      <Products />
    </div>
  );
}
