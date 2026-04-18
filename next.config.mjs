/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    // Hinweis: Next.js Redirects sind standardmaessig case-insensitive.
    // /Bauabnahme matcht also auch /bauabnahme -- kein Doppeleintrag noetig.
    return [
      // --- Defekte Slugs (Encoding-Fehler alte Sanity-Eintraege) ---
      { source: "/leistungen/baubegleitende-qualittssicherung", destination: "/leistungen/baubegleitende-qualitaetssicherung", permanent: true },
      { source: "/leistungen/mngelmanagement",                  destination: "/leistungen/maengelmanagement",                  permanent: true },

      // --- Alte Jimdo Top-Level-Seiten (CamelCase) ---
      { source: "/UeberUns",           destination: "/ueber-uns",    permanent: true },
      { source: "/Ueber-Uns",          destination: "/ueber-uns",    permanent: true },
      { source: "/Kontakt",            destination: "/kontakt",       permanent: true },
      { source: "/Partner",            destination: "/partner",       permanent: true },
      { source: "/Zertifikate",        destination: "/zertifikate",   permanent: true },
      { source: "/Vita",               destination: "/vita",          permanent: true },
      { source: "/Fortbildungen",      destination: "/fortbildungen", permanent: true },
      { source: "/Aktuelles",          destination: "/aktuelles",     permanent: true },
      { source: "/Impressum",          destination: "/impressum",     permanent: true },
      { source: "/Datenschutz",        destination: "/datenschutz",   permanent: true },
      { source: "/kooperationspartner",destination: "/partner",       permanent: true },
      { source: "/kostenangaben",      destination: "/kontakt",       permanent: true },

      // --- Alte Jimdo Leistungs-URLs → neue Leistungs-Unterseiten ---
      { source: "/Bauabnahme",         destination: "/leistungen/baucontrolling-bauabnahmen",          permanent: true },
      { source: "/Baucontrolling",     destination: "/leistungen/baucontrolling-bauabnahmen",          permanent: true },
      { source: "/BlowerDoorTest",     destination: "/leistungen/blower-door-tests",                   permanent: true },
      { source: "/Baubegleitung",      destination: "/leistungen/baubegleitende-qualitaetssicherung",  permanent: true },
      { source: "/Baumediation",       destination: "/leistungen/baumediation",                        permanent: true },
      { source: "/Maengelmanagement",  destination: "/leistungen/maengelmanagement",                   permanent: true },
      { source: "/Schadensgutachten",  destination: "/leistungen/schadensgutachten",                   permanent: true },
      { source: "/Beweissicherung",    destination: "/leistungen/beweissicherungsverfahren",           permanent: true },
      { source: "/Sanierungskonzepte", destination: "/leistungen/sanierungskonzepte",                 permanent: true },

      // --- Alte Jimdo Verzeichnisse (Catch-All, Ziel ist feste URL → kein Loop-Risiko) ---
      { source: "/unser-b%C3%BCro/:path*",                         destination: "/ueber-uns", permanent: true },
      { source: "/unser-buero/:path*",                             destination: "/ueber-uns", permanent: true },
      { source: "/das-leistungsspektrum-im-%C3%BCberblick/:path*", destination: "/leistungen", permanent: true },
      { source: "/das-leistungsspektrum-im-ueberblick/:path*",     destination: "/leistungen", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://www.sq-sv.de" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://embed.tawk.to",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.sanity.io",
              "font-src 'self'",
              "connect-src 'self' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://embed.tawk.to",
              "frame-src 'self' https://embed.tawk.to",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig
