/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OtpForm() {
  const router = useRouter();
  const params = useParams();
  const identifier = params.identifier as string;

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast("Invalid OTP", {
        description: "Please enter a valid 6-digit code",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/user/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code: otp }),
        credentials: "include",
      });

      console.log(res);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

      toast("Verification Successful", {
        description: "You have been verified successfully",
      });

      router.push("/");
    } catch (err: any) {
      toast("Error", {
        description: err.message || "OTP verification failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen flex flex-col items-center justify-center py-10 space-y-6"
    >
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={otp}
        onChange={(value) => setOtp(value)}
      >
        <InputOTPGroup>
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}
