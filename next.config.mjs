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
    return [
      // Alte defekte Slugs
      {
        source: "/leistungen/baubegleitende-qualittssicherung",
        destination: "/leistungen/baubegleitende-qualitaetssicherung",
        permanent: true,
      },
      {
        source: "/leistungen/mngelmanagement",
        destination: "/leistungen/maengelmanagement",
        permanent: true,
      },
      // Grossgeschriebene URLs von alter Website (301 = Ranking bleibt erhalten)
      { source: "/Kontakt",      destination: "/kontakt",      permanent: true },
      { source: "/Leistungen",   destination: "/leistungen",   permanent: true },
      { source: "/Partner",      destination: "/partner",      permanent: true },
      { source: "/Zertifikate",  destination: "/zertifikate",  permanent: true },
      { source: "/Vita",         destination: "/vita",         permanent: true },
      { source: "/Seminare",     destination: "/seminare",     permanent: true },
      { source: "/Fortbildungen",destination: "/fortbildungen",permanent: true },
      { source: "/Aktuelles",    destination: "/aktuelles",    permanent: true },
      { source: "/Impressum",    destination: "/impressum",    permanent: true },
      { source: "/Datenschutz",  destination: "/datenschutz",  permanent: true },
      { source: "/Ueber-uns",    destination: "/ueber-uns",    permanent: true },
      { source: "/Ueber-Uns",    destination: "/ueber-uns",    permanent: true },
      // Leistungs-Unterseiten grossgeschrieben
      { source: "/Leistungen/:slug", destination: "/leistungen/:slug", permanent: true },
      { source: "/Seminare/:slug",   destination: "/seminare/:slug",   permanent: true },
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
