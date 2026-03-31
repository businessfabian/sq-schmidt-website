import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { isAdmin } from "@/lib/auth"

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  try {
    const result = await client.fetch(`*[_type == "einstellungen"][0]{ _id, "url": heroBild.asset->url }`)
    return NextResponse.json({
      id: result?._id ?? null,
      url: result?.url ?? null,
    })
  } catch {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 })
  }
}
