import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sq-schmidt-website.vercel.app"
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