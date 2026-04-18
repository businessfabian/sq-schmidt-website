import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Exakte 301-Redirects fuer alte Jimdo-URLs.
// String-Vergleich ist case-sensitive -- kein Loop-Risiko.
const REDIRECTS: Record<string, string> = {
  "/UeberUns":            "/ueber-uns",
  "/Ueber-Uns":           "/ueber-uns",
  "/Kontakt":             "/kontakt",
  "/Partner":             "/partner",
  "/Zertifikate":         "/zertifikate",
  "/Vita":                "/vita",
  "/Fortbildungen":       "/fortbildungen",
  "/Aktuelles":           "/aktuelles",
  "/Impressum":           "/impressum",
  "/Datenschutz":         "/datenschutz",
  "/kooperationspartner": "/partner",
  "/kostenangaben":       "/kontakt",
  "/Bauabnahme":          "/leistungen/baucontrolling-bauabnahmen",
  "/Baucontrolling":      "/leistungen/baucontrolling-bauabnahmen",
  "/BlowerDoorTest":      "/leistungen/blower-door-tests",
  "/Baubegleitung":       "/leistungen/baubegleitende-qualitaetssicherung",
  "/Baumediation":        "/leistungen/baumediation",
  "/Maengelmanagement":   "/leistungen/maengelmanagement",
  "/Schadensgutachten":   "/leistungen/schadensgutachten",
  "/Beweissicherung":     "/leistungen/beweissicherungsverfahren",
  "/Sanierungskonzepte":  "/leistungen/sanierungskonzepte",
}

const PREFIX_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: "/unser-b%C3%BCro",                         to: "/ueber-uns" },
  { from: "/unser-buero",                             to: "/ueber-uns" },
  { from: "/das-leistungsspektrum-im-%C3%BCberblick", to: "/leistungen" },
  { from: "/das-leistungsspektrum-im-ueberblick",     to: "/leistungen" },
]

/**
 * Next.js 16 Proxy: Redirects + Admin/Studio Auth
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- 1. Alte Jimdo-URLs weiterleiten ---
  const redirectDest = REDIRECTS[pathname]
  if (redirectDest) {
    return NextResponse.redirect(new URL(redirectDest, request.url), 301)
  }

  for (const { from, to } of PREFIX_REDIRECTS) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      return NextResponse.redirect(new URL(to, request.url), 301)
    }
  }

  // --- 2. Admin-Auth ---
  if (pathname === "/admin" || pathname === "/api/admin/login") {
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const session = request.cookies.get("admin_session")?.value || request.cookies.get("admin_auth")?.value
    if (!session) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // --- 3. Sanity Studio schützen ---
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
    // Alte Jimdo-Pfade
    "/UeberUns",
    "/Ueber-Uns",
    "/Kontakt",
    "/Partner",
    "/Zertifikate",
    "/Vita",
    "/Fortbildungen",
    "/Aktuelles",
    "/Impressum",
    "/Datenschutz",
    "/kooperationspartner",
    "/kostenangaben",
    "/Bauabnahme",
    "/Baucontrolling",
    "/BlowerDoorTest",
    "/Baubegleitung",
    "/Baumediation",
    "/Maengelmanagement",
    "/Schadensgutachten",
    "/Beweissicherung",
    "/Sanierungskonzepte",
    "/unser-buero/:path*",
    "/das-leistungsspektrum-im-ueberblick/:path*",
  ],
}
