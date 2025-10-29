"use client";
import SignupForm from "@/components/signup-form";
import useContextData from "@/defaults/custom-component/useContextData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const { UserData } = useContextData();
  const router = useRouter();

  useEffect(() => {
    if (UserData) {
      router.push(UserData.role == "user" ? "/profile" : "/dashboard");
    }
  }, [UserData, router]);
  return (
    <div className="grid mb-5 min-h-svh container mx-auto rounded-xl mt-5 overflow-hidden border-0 sm:border lg:grid-cols-2">
      <div className="bg-gray-100 dark:bg-zinc-900  hidden  justify-center items-center lg:flex w-full h-full !z-10">
        <Image width={500} height={650}
          src="/side.png"
          alt="Image"
          className="inset-0 max-h-full max-w-full  dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image src='/logo.png' alt='shop logo' className="w-auto h-8" width={70} height={50} />
            Online Shop
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
