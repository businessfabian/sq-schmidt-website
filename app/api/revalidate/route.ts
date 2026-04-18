import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret")
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  revalidatePath("/", "layout")

  // Sitemap auto-submission an Google
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sq-sv.de"
  fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${siteUrl}/sitemap.xml`)}`).catch(() => {})

  return NextResponse.json({ revalidated: true })
}