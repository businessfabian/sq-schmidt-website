import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getEinstellungen } from "@/sanity/lib/queries"
import { GoogleAnalytics } from "@/components/google-analytics"
import { CookieBanner } from "@/components/cookie-banner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEinstellungen()
  return {
    title: e?.seoTitel ?? e?.firmenname ?? "SQ Schmidt Qualitaetssicherung",
    description: e?.seoBeschreibung ?? "Oeffentlich bestellter und vereidigter Sachverstaendiger.",
    generator: "Meyso",
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const einstellungen = await getEinstellungen()
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        <GoogleAnalytics gaId={einstellungen?.googleAnalyticsId} />
        {children}
        {einstellungen?.cookieBannerAktiv && (
          <CookieBanner text={einstellungen?.cookieBannerText} />
        )}
        <Analytics />
      </body>
    </html>
  )
}