import React from "react";
import ProductHeader from "./children/ProductHeader";
import ProductsTable from "./children/ProductsTable";

export default function ProductParent() {
  return (
    <div>
      <ProductHeader />
      <ProductsTable />
    </div>
  );
}
