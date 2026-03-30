import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { isAdmin } from "@/lib/auth"

export async function POST(req: Request) {
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
  const data = await req.json()
  try {
    const existing = await client.fetch(`*[_type == "einstellungen"][0]._id`)
    if (existing) {
      await client.patch(existing).set(data).commit()
    } else {
      await client.create({ _type: "einstellungen", ...data })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 })
  }
}