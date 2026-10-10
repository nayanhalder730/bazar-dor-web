
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  console.log("PROXY RUNNING:", request.nextUrl.pathname);

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("SESSION:", session ? "Logged in" : "Not logged in");

  if (!session) {
    const signInUrl = new URL("/signIn", request.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/productDetail/:path*",
    "/profile",
  ],
};