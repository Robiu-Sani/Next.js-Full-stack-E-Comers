/* eslint-disable @typescript-eslint/no-explicit-any */
import LogedUser from "@/defaults/functions/LogedUser";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = {
  "/profile": ["user", "admin", "menager", "super-admin"],
  "/dashboard": ["admin", "menager", "super-admin"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = Object.keys(protectedRoutes).some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const userinfo: any = await LogedUser();

    if (!userinfo) {
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(loginUrl);
    }

    let requiredRole: string[] = [];

    if (pathname === "/profile" || pathname.startsWith("/profile/")) {
      requiredRole = protectedRoutes["/profile"];
    } else if (
      pathname === "/dashboard" ||
      pathname.startsWith("/dashboard/")
    ) {
      requiredRole = protectedRoutes["/dashboard"];
    }

    if (requiredRole.length > 0 && !requiredRole.includes(userinfo.role)) {
      if (userinfo.role === "user" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }

      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
