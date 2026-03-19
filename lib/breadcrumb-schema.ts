type BreadcrumbItem = {
  name: string
  url?: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sq-schmidt-website.vercel.app"

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: siteUrl,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: `${siteUrl}${item.url}` } : {}),
      })),
    ],
  }
}
