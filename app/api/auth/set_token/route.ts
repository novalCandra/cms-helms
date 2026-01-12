"use server";
import { NextResponse } from "next/server";

export default function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "user-login", {
    httpOnly: true,
    path: "/",
  });

  return response;
}
