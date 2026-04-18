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
    // caseSensitive: true ist PFLICHT -- sonst matcht Next.js /kontakt gegen /Kontakt → Loop.
    const cs = { permanent: true, caseSensitive: true }
    return [
      // --- Defekte Slugs ---
      { source: "/leistungen/baubegleitende-qualittssicherung", destination: "/leistungen/baubegleitende-qualitaetssicherung", ...cs },
      { source: "/leistungen/mngelmanagement",                  destination: "/leistungen/maengelmanagement",                  ...cs },

      // --- Alte Jimdo Top-Level-Seiten ---
      { source: "/UeberUns",            destination: "/ueber-uns",     ...cs },
      { source: "/Ueber-Uns",           destination: "/ueber-uns",     ...cs },
      { source: "/Kontakt",             destination: "/kontakt",        ...cs },
      { source: "/Partner",             destination: "/partner",        ...cs },
      { source: "/Zertifikate",         destination: "/zertifikate",    ...cs },
      { source: "/Vita",                destination: "/vita",           ...cs },
      { source: "/Fortbildungen",       destination: "/fortbildungen",  ...cs },
      { source: "/Aktuelles",           destination: "/aktuelles",      ...cs },
      { source: "/Impressum",           destination: "/impressum",      ...cs },
      { source: "/Datenschutz",         destination: "/datenschutz",    ...cs },
      { source: "/kooperationspartner", destination: "/partner",        ...cs },
      { source: "/kostenangaben",       destination: "/kontakt",        ...cs },

      // --- Alte Jimdo Leistungs-URLs ---
      { source: "/Bauabnahme",          destination: "/leistungen/baucontrolling-bauabnahmen",         ...cs },
      { source: "/Baucontrolling",      destination: "/leistungen/baucontrolling-bauabnahmen",         ...cs },
      { source: "/BlowerDoorTest",      destination: "/leistungen/blower-door-tests",                  ...cs },
      { source: "/Baubegleitung",       destination: "/leistungen/baubegleitende-qualitaetssicherung", ...cs },
      { source: "/Baumediation",        destination: "/leistungen/baumediation",                       ...cs },
      { source: "/Maengelmanagement",   destination: "/leistungen/maengelmanagement",                  ...cs },
      { source: "/Schadensgutachten",   destination: "/leistungen/schadensgutachten",                  ...cs },
      { source: "/Beweissicherung",     destination: "/leistungen/beweissicherungsverfahren",          ...cs },
      { source: "/Sanierungskonzepte",  destination: "/leistungen/sanierungskonzepte",                 ...cs },

      // --- Alte Jimdo Verzeichnisse (Catch-All) ---
      { source: "/unser-b%C3%BCro/:path*",                         destination: "/ueber-uns",  ...cs },
      { source: "/unser-buero/:path*",                             destination: "/ueber-uns",  ...cs },
      { source: "/das-leistungsspektrum-im-%C3%BCberblick/:path*", destination: "/leistungen", ...cs },
      { source: "/das-leistungsspektrum-im-ueberblick/:path*",     destination: "/leistungen", ...cs },
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
