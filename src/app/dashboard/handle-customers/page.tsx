import React from "react";
import CustomerHandleParents from "./CustomerHandleParents";
import AllCustomersTable from "./childrens/AllCustomersTable";

export default function page() {
  return (
    <div>
      <CustomerHandleParents />
      <AllCustomersTable />
    </div>
  );
}
