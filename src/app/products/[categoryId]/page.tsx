import React from "react";
import ProductBanner from "../ProductBanner";
import CategoryProduct from "./CategoryProduct";
import Products from "@/app/_home/Products";

export default function page() {
  return (
    <div className="top-padding">
      <ProductBanner />
      <CategoryProduct />
      <Products />
    </div>
  );
}
