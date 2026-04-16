import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Next.js 16 Proxy: Wartungsmodus + Schutz fuer /admin und /api/admin Routen.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Wartungsmodus ───────────────────────────────────────────────────────
  if (process.env.MAINTENANCE_MODE === "true") {
    // Ausnahmen: Next-Assets, API-Routen, Wartungsseite selbst, statische Files
    const isExcluded =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname === "/wartung" ||
      pathname === "/favicon.ico" ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml" ||
      /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|css|js|map)$/i.test(pathname)

    if (!isExcluded) {
      const url = request.nextUrl.clone()
      url.pathname = "/wartung"
      const res = NextResponse.rewrite(url, { status: 503 })
      res.headers.set("Retry-After", "86400")
      res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
      return res
    }
  }

  // ── Admin-Schutz ────────────────────────────────────────────────────────
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
  // Matcher leer lassen bzw. alle Routen matchen, damit Wartungsmodus global greift.
  // Die Ausnahmen werden innerhalb der Funktion geprueft.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    "/((?!_next/static|_next/image).*)",
  ],
}
