"use server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  //   proteksi semua Router
  if (
    request.nextUrl.pathname.startsWith("/user/home") ||
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}
