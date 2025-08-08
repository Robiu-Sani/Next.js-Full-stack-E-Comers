import React from "react";
import NavTopSection from "./NavTopSection";

export default function ParentNav() {
  return (
    <div className="w-full flex fixed top-0 z-[498] justify-center items-center flex-col bg-white dark:bg-zinc-900 shadow-md">
      <NavTopSection />
      <div className="container mx-auto px-2">
        <h1>main nav bar</h1>
      </div>
    </div>
  );
}
