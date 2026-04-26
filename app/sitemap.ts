import { MetadataRoute } from "next"
import { getLeistungen, getSeminare, getProjekte } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sq-sv.de"

  const [leistungen, seminare, projekte] = await Promise.all([getLeistungen(), getSeminare(), getProjekte()])

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,            lastModified: new Date(), priority: 1.0,  changeFrequency: "weekly" },
    { url: `${baseUrl}/leistungen`,  lastModified: new Date(), priority: 0.9,  changeFrequency: "monthly" },
    { url: `${baseUrl}/kontakt`,     lastModified: new Date(), priority: 0.9,  changeFrequency: "yearly" },
    { url: `${baseUrl}/seminare`,    lastModified: new Date(), priority: 0.8,  changeFrequency: "weekly" },
    { url: `${baseUrl}/ueber-uns`,   lastModified: new Date(), priority: 0.8,  changeFrequency: "monthly" },
    { url: `${baseUrl}/partner`,     lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${baseUrl}/zertifikate`, lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${baseUrl}/vita`,        lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${baseUrl}/fortbildungen`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/aktuelles`,   lastModified: new Date(), priority: 0.6,  changeFrequency: "weekly" },
    { url: `${baseUrl}/referenzen`,  lastModified: new Date(), priority: 0.8,  changeFrequency: "weekly" },
    { url: `${baseUrl}/impressum`,   lastModified: new Date(), priority: 0.3,  changeFrequency: "yearly" },
    { url: `${baseUrl}/datenschutz`, lastModified: new Date(), priority: 0.3,  changeFrequency: "yearly" },
  ]

  const leistungsPages: MetadataRoute.Sitemap = leistungen
    .filter((l: any) => l.aktiv !== false)
    .map((l: any) => {
      const slug = l.slug?.current ?? l.slug
      return slug ? {
        url: `${baseUrl}/leistungen/${slug}`,
        lastModified: new Date(),
        priority: 0.9,
        changeFrequency: "monthly" as const,
      } : null
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  const seminarPages: MetadataRoute.Sitemap = seminare
    .map((s: any) => {
      const slug = s.slug?.current ?? s.slug
      return slug ? {
        url: `${baseUrl}/seminare/${slug}`,
        lastModified: new Date(),
        priority: 0.6,
        changeFrequency: "weekly" as const,
      } : null
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  const projektPages: MetadataRoute.Sitemap = (projekte as any[])
    .map((p: any) => {
      const slug = p.slug?.current ?? p.slug
      return slug ? {
        url: `${baseUrl}/referenzen/${slug}`,
        lastModified: new Date(),
        priority: 0.7,
        changeFrequency: "monthly" as const,
      } : null
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  return [...staticPages, ...leistungsPages, ...seminarPages, ...projektPages]
}
