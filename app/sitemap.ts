import { MetadataRoute } from "next"
import { getLeistungen, getSeminare } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sq-schmidt-website.vercel.app"

  const [leistungen, seminare] = await Promise.all([getLeistungen(), getSeminare()])

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/leistungen`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ueber-uns`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/partner`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/zertifikate`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/vita`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/fortbildungen`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/aktuelles`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/seminare`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), priority: 0.9 },
  ]

  const leistungsPages = leistungen
    .filter((l: any) => l.aktiv !== false)
    .map((l: any) => ({
      url: `${baseUrl}/leistungen/${l.slug?.current ?? l.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    }))

  const seminarPages = seminare.map((s: any) => ({
    url: `${baseUrl}/seminare/${s.slug?.current}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  return [...staticPages, ...leistungsPages, ...seminarPages]
}