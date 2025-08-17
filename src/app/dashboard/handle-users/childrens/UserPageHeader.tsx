import React from "react";
import { Card, CardHeader } from "@/components/ui/card";

export default function UsersTableHeaderAlt() {
  return (
    <Card className="relative mt-4 overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-primary/5">
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10"></div>
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5"></div>

      {/* Content */}
      <CardHeader className="relative z-10 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            User Directory
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-lg text-muted-foreground">
              All registered system users
            </p>
            <div className="h-1 w-8 rounded-full bg-primary/30"></div>
            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Secure Access
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Admin View
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
