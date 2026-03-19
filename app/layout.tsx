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
  const title = e?.seoTitel ?? e?.firmenname ?? "SQ Schmidt Qualitaetssicherung"
  const description = e?.seoBeschreibung ?? "Oeffentlich bestellter und vereidigter Sachverstaendiger der IHK Konstanz. Gerichtsfeste Gutachten und professionelle Baubegleitung."
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
      siteName: "SQ Schmidt Qualitaetssicherung",
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
      <body className="font-sans antialiased">
        <GoogleAnalytics gaId={einstellungen?.googleAnalyticsId} />
        {children}
        {(einstellungen?.cookieBannerAktiv !== false) && (
          <CookieBanner text={einstellungen?.cookieBannerText} />
        )}
        <Analytics />
      </body>
    </html>
  )
}