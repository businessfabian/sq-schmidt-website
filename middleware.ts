import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Exakte 301-Redirects fuer alte Jimdo-URLs.
// String-Vergleich ist immer case-sensitive -- kein Loop-Risiko.
const REDIRECTS: Record<string, string> = {
  // Top-Level-Seiten
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
  // Leistungs-URLs
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

// Praefix-Redirects (alte Jimdo-Verzeichnisse)
const PREFIX_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: "/unser-b%C3%BCro",                         to: "/ueber-uns" },
  { from: "/unser-buero",                             to: "/ueber-uns" },
  { from: "/das-leistungsspektrum-im-%C3%BCberblick", to: "/leistungen" },
  { from: "/das-leistungsspektrum-im-ueberblick",     to: "/leistungen" },
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exakter Match
  const destination = REDIRECTS[pathname]
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 301)
  }

  // Praefix-Match
  for (const { from, to } of PREFIX_REDIRECTS) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      return NextResponse.redirect(new URL(to, request.url), 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Nur auf diesen Pfaden ausfuehren -- nicht auf API, _next, Dateien
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|icon|apple-icon|sitemap|robots|studio).*)",
  ],
}
