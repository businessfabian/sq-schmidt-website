import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { isAdmin } from "@/lib/auth"

function getClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await getClient().fetch(`*[_type == "navigation"][0]`)
  return NextResponse.json(data ?? { punkte: [] })
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const { punkte } = await req.json()
  const existing = await client.fetch(`*[_type == "navigation"][0]._id`)
  if (existing) {
    await client.patch(existing).set({ punkte }).commit()
  } else {
    await client.create({ _type: "navigation", punkte })
  }
  return NextResponse.json({ success: true })
}