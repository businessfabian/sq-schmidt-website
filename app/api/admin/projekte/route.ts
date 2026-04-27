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

function slugify(input: string): string {
  return input.toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/ß/g, "ss").replace(/Ä/g, "ae").replace(/Ö/g, "oe").replace(/Ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96)
}

function normalizePayload(data: Record<string, unknown>) {
  return {
    titel: data.titel,
    projektDatum: data.projektDatum ?? null,
    kategorie: data.kategorie ?? null,
    ort: data.ort ?? null,
    kurzbeschreibung: data.kurzbeschreibung ?? null,
    beschreibung: data.beschreibung ?? null,
    aufgabenstellung: data.aufgabenstellung ?? null,
    loesung: data.loesung ?? null,
    ergebnis: data.ergebnis ?? null,
  }
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await getClient().fetch(`*[_type == "projekt"] | order(projektDatum desc) {
    _id, titel, slug, projektDatum, kategorie, ort, kurzbeschreibung,
    beschreibung, aufgabenstellung, loesung, ergebnis,
    "titelbildUrl": titelbild.asset->url,
    galerie[] { _key, "url": asset->url, alt, caption }
  }`)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await req.json()
  const result = await getClient().create({
    _type: "projekt",
    ...normalizePayload(data),
    slug: { _type: "slug", current: slugify(String(data.titel ?? "")) },
  })
  return NextResponse.json(result)
}

export async function PATCH(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id, ...data } = await req.json()
  const result = await getClient().patch(_id).set({
    ...normalizePayload(data),
    slug: { _type: "slug", current: slugify(String(data.titel ?? "")) },
  }).commit()
  return NextResponse.json(result)
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id } = await req.json()
  await getClient().delete(_id)
  return NextResponse.json({ success: true })
}
