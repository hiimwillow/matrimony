import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization") || null;
  console.log("authorization ->", authorization);

  const response = NextResponse.next();

  const userId = cookies().get("userID");
}

export const config = {
  matcher: ["/onboarding/:path*", "/dashboard/:path*"],
};
