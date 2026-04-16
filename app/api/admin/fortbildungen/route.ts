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
  const data = await getClient().fetch(
    `*[_type == "fortbildung"] | order(datum desc) {
      _id, titel, datum, veranstalter, ort, themenbereich, unterrichtseinheiten, hervorgehoben
    }`
  )
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await req.json()
  const result = await getClient().create({
    _type: "fortbildung",
    titel: data.titel,
    datum: data.datum,
    veranstalter: data.veranstalter,
    ...(data.ort ? { ort: data.ort } : {}),
    ...(data.themenbereich ? { themenbereich: data.themenbereich } : {}),
    ...(data.unterrichtseinheiten ? { unterrichtseinheiten: Number(data.unterrichtseinheiten) } : {}),
    hervorgehoben: data.hervorgehoben ?? false,
  })
  return NextResponse.json(result)
}

export async function PATCH(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id, ...data } = await req.json()
  const result = await getClient().patch(_id).set({
    titel: data.titel,
    datum: data.datum,
    veranstalter: data.veranstalter,
    ort: data.ort ?? "",
    themenbereich: data.themenbereich ?? "",
    unterrichtseinheiten: data.unterrichtseinheiten ? Number(data.unterrichtseinheiten) : undefined,
    hervorgehoben: data.hervorgehoben ?? false,
  }).commit()
  return NextResponse.json(result)
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id } = await req.json()
  await getClient().delete(_id)
  return NextResponse.json({ success: true })
}
