import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_auth")?.value !== "true") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  const result = await client.fetch(`*[_type == "einstellungen"][0]{ _id, "url": heroBild.asset->url }`)

  return NextResponse.json({
    id: result?._id ?? null,
    url: result?.url ?? null,
  })
}
