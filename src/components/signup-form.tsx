/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [method, setMethod] = useState<"email" | "number">("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (password && value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign up using email or mobile number
        </p>
      </div>

      <Tabs
        value={method}
        onValueChange={(v) => setMethod(v as any)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="number">Phone Number</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="grid gap-4 pt-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="number" className="grid gap-4 pt-4">
          <div className="grid gap-3">
            <Label htmlFor="number">Phone Number</Label>
            <Input id="number" type="tel" placeholder="01XXXXXXXXX" required />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            if (confirmPassword && e.target.value !== confirmPassword) {
              setPasswordError("Passwords do not match");
            } else {
              setPasswordError("");
            }
          }}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          required
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={!!passwordError}>
        Create Account
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
