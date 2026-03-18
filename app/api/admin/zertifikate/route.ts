import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { cookies } from "next/headers"

function getClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })
}

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_auth")?.value === "true"
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await getClient().fetch(`*[_type == "zertifikat"] | order(reihenfolge asc) { _id, name, beschreibung, aktiv, reihenfolge }`)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const data = await req.json()
  const result = await getClient().create({ _type: "zertifikat", ...data })
  return NextResponse.json(result)
}

export async function PATCH(req: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id, ...data } = await req.json()
  const result = await getClient().patch(_id).set(data).commit()
  return NextResponse.json(result)
}

export async function DELETE(req: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  const { _id } = await req.json()
  await getClient().delete(_id)
  return NextResponse.json({ success: true })
}