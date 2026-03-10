 import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const { pathname } = request.nextUrl;

  // ── API Protection ──────────────────────────────────────────
  // GET requests public hain (site pe data dikhana hai)
  // POST, PATCH, DELETE sirf logged in users ke liye
  if (pathname.startsWith("/api/mobiles") || pathname.startsWith("/api/categories")) {
    if (request.method !== "GET" && !isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Admin Panel Protection ───────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/zm-secure-entry", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/mobiles/:path*",
    "/api/categories/:path*",
  ],
};