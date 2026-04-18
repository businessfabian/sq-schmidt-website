import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sq-sv.de"
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/dashboard", "/studio"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}