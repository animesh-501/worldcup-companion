import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const favoriteTeam = request.cookies.get("favorite_team")?.value;

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(favoriteTeam ? "/home" : "/onboarding", request.url));
  }

  if (!favoriteTeam && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*"]
};
