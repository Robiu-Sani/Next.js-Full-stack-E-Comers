/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { toast } from "sonner";

interface RegisterPayload {
  email?: string;
  number?: string;
  password: string;
  isSocial: boolean;
}

interface RegisterResponse {
  success: boolean;
  error?: string;
  data?: any;
}

const registerData = async (
  path: string,
  data: RegisterPayload
): Promise<Response> => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Registration failed");
  }

  return response;
};

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [method, setMethod] = useState<"email" | "number">("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (password && value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordError || !password || !confirmPassword) return;

    setLoading(true);

    try {
      const payload: RegisterPayload = {
        password,
        isSocial: false,
      };

      if (method === "email") {
        if (!email) {
          toast.error("Email is required");
          return;
        }
        payload.email = email;
      } else {
        if (!number) {
          toast.error("Phone number is required");
          return;
        }
        payload.number = number;
      }

      const res = await registerData("/api/v1/user/manage", payload);
      const data: RegisterResponse = await res.json();

      if (data.success) {
        toast.success("Account created!", {
          description: "Please verify your account",
        });
        const identifier = email || number;
        router.push(`/sign-up/${encodeURIComponent(identifier)}`);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign up using email or mobile number
        </p>
      </div>

      <Tabs
        value={method}
        onValueChange={(v) => setMethod(v as "email" | "number")}
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
              required={method === "email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="number" className="grid gap-4 pt-4">
          <div className="grid gap-3">
            <Label htmlFor="number">Phone Number</Label>
            <Input
              id="number"
              type="tel"
              placeholder="01XXXXXXXXX"
              required={method === "number"}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
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
          value={password}
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
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!!passwordError || loading || !password || !confirmPassword}
      >
        {loading ? "Creating..." : "Create Account"}
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
