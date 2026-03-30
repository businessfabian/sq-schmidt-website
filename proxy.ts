import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Next.js 16 Proxy: Schützt /admin und /api/admin Routen.
 * Prüft ob ein gültiger Session-Cookie vorhanden ist.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Login-Seite und Login-API durchlassen
  if (pathname === "/admin" || pathname === "/api/admin/login") {
    return NextResponse.next()
  }

  // /admin und /api/admin schützen
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get("admin_session")?.value
    const legacyCookie = request.cookies.get("admin_auth")?.value

    if (!sessionCookie && !legacyCookie) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Sanity Studio schützen
  if (pathname.startsWith("/studio")) {
    const sessionCookie = request.cookies.get("admin_session")?.value
    const legacyCookie = request.cookies.get("admin_auth")?.value
    if (!sessionCookie && !legacyCookie) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/studio/:path*",
  ],
}
