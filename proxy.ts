 // mobile-site/proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ← "proxy" naam ka function export karo (middleware nahi!)
export async function proxy(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isLoggedIn = !!token;

  // Login nahi kiya aur protected page pe ja raha hai
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};