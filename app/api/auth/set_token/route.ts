import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();
  console.log(token);
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: false,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
