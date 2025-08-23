/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const publicRoutes = ["/signin", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;
  let userInfo: any = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      // ✅ Check if expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      userInfo = decoded;
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // If not logged in → redirect
  if (!userInfo) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Profile: any logged-in user
  if (pathname.startsWith("/profile")) {
    return NextResponse.next();
  }

  // Dashboard: only admin/manager/super-admin
  if (pathname.startsWith("/dashboard")) {
    if (userInfo.role === "user") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
