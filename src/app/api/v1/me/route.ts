import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function GET() {
  try {
     const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwtDecode(token);
    return NextResponse.json({ user: decoded }, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=10800', 
        }
      });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
