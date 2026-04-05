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
    const session = request.cookies.get("admin_session")?.value || request.cookies.get("admin_auth")?.value

    if (!session) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Sanity Studio schützen
  if (pathname.startsWith("/studio")) {
    const session = request.cookies.get("admin_session")?.value || request.cookies.get("admin_auth")?.value
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url))
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
