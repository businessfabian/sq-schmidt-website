import { NextRequest, NextResponse } from "next/server"

/**
 * Edge Middleware: Schuetzt /admin Seiten und /api/admin Routes.
 * Prueft ob ein gueltiger admin_session Cookie vorhanden ist.
 * Die eigentliche Token-Validierung passiert in den Route Handlers (isAdmin).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Login-Route durchlassen
  if (pathname === "/api/admin/login") {
    return NextResponse.next()
  }

  const hasSession = req.cookies.has("admin_session") || req.cookies.has("admin_auth")

  if (!hasSession) {
    // API-Routes: 401
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Admin-Seiten: Redirect zum Login
    return NextResponse.redirect(new URL("/admin?login=required", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/admin/:path*",
  ],
}
