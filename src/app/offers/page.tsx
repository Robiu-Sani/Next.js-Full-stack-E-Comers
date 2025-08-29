import React from "react";
import OffersBanner from "./OffersBanner";
import AllOffersProduct from "./AllOffersProduct";

export default function page() {
  return (
    <div className="top-padding">
      <OffersBanner />
      <AllOffersProduct />
    </div>
  );
}
