import React from "react";
import AllBranch from "./childern/AllBranch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ParentBranche() {
  return (
    <div className="space-y-4 mt-6">
      {/* Header Part */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold">Branches</h1>
        <Link href="/dashboard/create-branch">
          <Button>Add Branch</Button>
        </Link>
      </div>

      {/* Main Content */}
      <AllBranch />
    </div>
  );
}
