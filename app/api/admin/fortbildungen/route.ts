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
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }
  const fortbildungen = await getClient().fetch(
    `*[_type == "fortbildung"] | order(datum desc) {
      _id, titel, datum, veranstalter, themenbereich
    }`
  )
  return NextResponse.json(fortbildungen)
}
