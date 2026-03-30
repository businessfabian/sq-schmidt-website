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

// GET - alle Leistungen laden
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const leistungen = await client.fetch(`*[_type == "leistung"] | order(reihenfolge asc)`)
  return NextResponse.json(leistungen)
}

// POST - neue Leistung erstellen
export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const data = await req.json()
  const result = await client.create({
    _type: "leistung",
    titel: data.titel,
    slug: { _type: "slug", current: data.titel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-") },
    kurzBeschreibung: data.kurzBeschreibung,
    beschreibung: data.beschreibung,
    icon: data.icon ?? "ShieldCheck",
    reihenfolge: data.reihenfolge ?? 99,
    aktiv: data.aktiv ?? true,
  })
  return NextResponse.json(result)
}

// PATCH - Leistung aktualisieren
export async function PATCH(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const { _id, ...data } = await req.json()
  const result = await client.patch(_id).set({
    ...data,
    slug: { _type: "slug", current: data.titel.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-") },
  }).commit()
  return NextResponse.json(result)
}

// DELETE - Leistung loeschen
export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const { _id } = await req.json()
  await client.delete(_id)
  return NextResponse.json({ success: true })
}