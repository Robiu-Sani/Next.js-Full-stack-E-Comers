"use client";
import { useContext } from "react";
import { ContextData } from "../context/Context";

export default function useContextData() {
  const context = useContext(ContextData);
  if (!context) {
    throw new Error(
      "useContextData must be used within a ContextData.Provider"
    );
  }
  const {
    test,
    handleTest,
    navItems,
    loading,
    error,
    UserData,
    handleUser,
    compareData,
    handleAddCompare,
    wishlistData,
    handleAddWishlist,
    cartData,
    handleAddCart,
    removeCartItem,
    removeWishList,
    removeCompaire,
    handlePurchasedData,
    purchasesData
  } = context;
  return {
    test,
    handleTest,
    navItems,
    loading,
    error,
    UserData,
    handleUser,
    compareData,
    handleAddCompare,
    wishlistData,
    handleAddWishlist,
    cartData,
    handleAddCart,
    removeCartItem,
    removeWishList,
    removeCompaire,
    handlePurchasedData,
    purchasesData
  };
}
