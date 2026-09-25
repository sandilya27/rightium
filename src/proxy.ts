import { NextResponse, type NextRequest } from "next/server";

/**
 * Preview mode: until the database is connected (DATABASE_URI), the
 * Payload admin, its API and draft preview are closed, so a client demo
 * never shows a half-configured admin or a server error. The contact
 * endpoint stays open.
 */
export function proxy(request: NextRequest) {
  if (process.env.DATABASE_URI) return NextResponse.next();
  if (request.nextUrl.pathname === "/api/contact") return NextResponse.next();
  return new NextResponse("Not found", {
    status: 404,
    headers: { "X-Robots-Tag": "noindex, nofollow" },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/next/:path*"],
};
