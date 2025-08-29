import React from "react";
import FeaturedBanner from "./FeaturedBanner";
import AllFeaturedProduct from "./AllFeaturedProduct";

export default function page() {
  return (
    <div className="top-padding">
      <FeaturedBanner />
      <AllFeaturedProduct />
    </div>
  );
}
