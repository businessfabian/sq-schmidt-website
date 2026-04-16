import type { Metadata } from "next"
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getEinstellungen } from "@/sanity/lib/queries"
import { GoogleAnalytics } from "@/components/google-analytics"
import { CookieBanner } from "@/components/cookie-banner"
import { TawkChat } from "@/components/tawk-chat"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
})

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEinstellungen()
  const title = e?.seoTitel ?? e?.firmenname ?? "SQ Schmidt Qualitätssicherung"
  const description = e?.seoBeschreibung ?? "Öffentlich bestellter und vereidigter Sachverständiger der IHK Konstanz. Gerichtsfeste Gutachten und professionelle Baubegleitung."
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sq-schmidt-website.vercel.app"

  return {
    title,
    description,
    generator: "Meyso",
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "SQ Schmidt Qualitätssicherung",
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const einstellungen = await getEinstellungen()
  return (
    <html lang="de">
      <body className={`font-sans antialiased ${barlowCondensed.variable}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-medium">Zum Inhalt springen</a>
        <GoogleAnalytics gaId={einstellungen?.googleAnalyticsId} />
        {children}
        {(einstellungen?.cookieBannerAktiv !== false) && (
          <CookieBanner text={einstellungen?.cookieBannerText} />
        )}
        {einstellungen?.chatWidgetAktiv && einstellungen?.tawkPropertyId && (
          <TawkChat propertyId={einstellungen.tawkPropertyId} />
        )}
        <Analytics />
      </body>
    </html>
  )
}