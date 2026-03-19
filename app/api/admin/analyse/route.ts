import { NextResponse } from "next/server"
import { cookies } from "next/headers"

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_auth")?.value === "true"
}

export async function GET(req: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const siteUrl = searchParams.get("url") || process.env.NEXT_PUBLIC_SITE_URL || "https://sq-schmidt-website.vercel.app"
  const strategy = searchParams.get("strategy") || "mobile"

  try {
    const apiKey = process.env.GOOGLE_PAGESPEED_KEY || ""
    const keyParam = apiKey ? `&key=${apiKey}` : ""
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(siteUrl)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices${keyParam}`
    const res = await fetch(apiUrl, { next: { revalidate: 0 } })
    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const cats = data.lighthouseResult?.categories || {}
    const audits = data.lighthouseResult?.audits || {}

    // Core Web Vitals
    const fcp = audits["first-contentful-paint"]
    const lcp = audits["largest-contentful-paint"]
    const cls = audits["cumulative-layout-shift"]
    const tbt = audits["total-blocking-time"]
    const si = audits["speed-index"]

    // Suggestions from failed audits
    const suggestions: { title: string; description: string; score: number }[] = []
    for (const [, audit] of Object.entries(audits) as any) {
      if (audit.score !== null && audit.score < 0.9 && audit.description && audit.title) {
        suggestions.push({
          title: audit.title,
          description: (audit.description || "").slice(0, 200),
          score: audit.score,
        })
      }
    }
    suggestions.sort((a, b) => a.score - b.score)

    return NextResponse.json({
      scores: {
        performance: Math.round((cats.performance?.score || 0) * 100),
        seo: Math.round((cats.seo?.score || 0) * 100),
        accessibility: Math.round((cats.accessibility?.score || 0) * 100),
        bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
      },
      vitals: {
        fcp: { value: fcp?.displayValue, score: fcp?.score },
        lcp: { value: lcp?.displayValue, score: lcp?.score },
        cls: { value: cls?.displayValue, score: cls?.score },
        tbt: { value: tbt?.displayValue, score: tbt?.score },
        si: { value: si?.displayValue, score: si?.score },
      },
      suggestions: suggestions.slice(0, 8),
      strategy,
      url: siteUrl,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "PageSpeed API nicht erreichbar" }, { status: 500 })
  }
}
