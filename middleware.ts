import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value

  // Also accept legacy cookie for backwards compatibility during transition
  const legacyAuth = request.cookies.get("admin_auth")?.value

  if (!token && legacyAuth !== "true") {
    const loginUrl = new URL("/admin", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
