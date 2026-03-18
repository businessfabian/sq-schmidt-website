import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getEinstellungen } from "@/sanity/lib/queries"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEinstellungen()
  return {
    title: e?.seoTitel ?? e?.firmenname ?? "SQ Schmidt Qualitaetssicherung",
    description: e?.seoBeschreibung ?? "Oeffentlich bestellter und vereidigter Sachverstaendiger fuer Schaeden an Gebaeuden.",
    generator: "Meyso",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}