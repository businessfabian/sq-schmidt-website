import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { cookies } from "next/headers"

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_auth")?.value === "true"
}

export async function POST(req: Request) {
  if (!await checkAuth()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  const formData = await req.formData()
  const file = formData.get("file") as File
  const type = formData.get("type") as string // "partner" | "zertifikat"
  const id = formData.get("id") as string

  if (!file) return NextResponse.json({ error: "Keine Datei" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const asset = await client.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type,
  })

  // Bild direkt dem Dokument zuweisen
  await client.patch(id).set({
    logo: type === "partner" ? { _type: "image", asset: { _type: "reference", _ref: asset._id } } : undefined,
    bild: type === "zertifikat" ? { _type: "image", asset: { _type: "reference", _ref: asset._id } } : undefined,
  }).commit()

  return NextResponse.json({ url: asset.url, assetId: asset._id })
}