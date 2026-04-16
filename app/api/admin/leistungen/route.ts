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

type ProzessSchritt = { titel: string; beschreibung: string }

function normalizePayload(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {
    titel: data.titel,
    kurzBeschreibung: data.kurzBeschreibung,
    beschreibung: data.beschreibung,
    icon: data.icon ?? "ShieldCheck",
    reihenfolge: data.reihenfolge ?? 99,
    aktiv: data.aktiv ?? true,
  }

  // Leistungsumfang: leere Strings rausfiltern
  if (Array.isArray(data.leistungsumfang)) {
    out.leistungsumfang = (data.leistungsumfang as unknown[])
      .map(v => String(v ?? "").trim())
      .filter(Boolean)
  }

  // Prozess: leere Schritte rausfiltern und keyed-Objekte setzen
  if (Array.isArray(data.prozess)) {
    out.prozess = (data.prozess as ProzessSchritt[])
      .filter(p => p && (String(p.titel ?? "").trim() || String(p.beschreibung ?? "").trim()))
      .map((p, i) => ({
        _type: "prozessSchritt",
        _key: `ps_${Date.now()}_${i}`,
        titel: String(p.titel ?? "").trim(),
        beschreibung: String(p.beschreibung ?? "").trim(),
      }))
  }

  return out
}

// GET - alle Leistungen laden
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const leistungen = await client.fetch(`*[_type == "leistung"] | order(reihenfolge asc){
    _id, titel, slug, kurzBeschreibung, beschreibung, icon, reihenfolge, aktiv,
    "bildUrl": bild.asset->url,
    leistungsumfang,
    prozess[]{ _key, titel, beschreibung }
  }`)
  return NextResponse.json(leistungen)
}

// POST - neue Leistung erstellen
export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const data = await req.json()
  const slugCurrent = String(data.titel ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
  const result = await client.create({
    _type: "leistung",
    ...normalizePayload(data),
    slug: { _type: "slug", current: slugCurrent },
  })
  return NextResponse.json(result)
}

// PATCH - Leistung aktualisieren
export async function PATCH(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const client = getClient()
  const { _id, ...data } = await req.json()
  const slugCurrent = String(data.titel ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
  const result = await client.patch(_id).set({
    ...normalizePayload(data),
    slug: { _type: "slug", current: slugCurrent },
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
