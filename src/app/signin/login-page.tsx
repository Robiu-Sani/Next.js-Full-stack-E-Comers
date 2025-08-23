"use client";
import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import useContextData from "@/defaults/custom-component/useContextData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { UserData } = useContextData();
  const router = useRouter();
  useEffect(() => {
    if (UserData) {
      router.push(UserData.role == "user" ? "/profile" : "/dashboard");
    }
  }, [UserData, router]);

  return (
    <div className="grid min-h-svh mt-5 container mx-auto rounded-xl border-0 sm:border overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-gray-100  hidden  lg:block !z-10">
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
