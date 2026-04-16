import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createClient } from "@sanity/client"
import { isAdmin } from "@/lib/auth"

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  const formData = await req.formData()
  const file = formData.get("file") as File
  const type = formData.get("type") as string // "partner" | "zertifikat" | "hero" | "leistung" | "ueber"
  const id = formData.get("id") as string

  if (!file) return NextResponse.json({ error: "Keine Datei" }, { status: 400 })

  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
  const ALLOWED_UPLOAD_TYPES = ["partner", "zertifikat", "hero", "leistung", "ueber"]

  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Datei zu gross (max. 5MB)" }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Nur JPG, PNG, WebP oder SVG erlaubt" }, { status: 400 })
  if (!ALLOWED_UPLOAD_TYPES.includes(type)) return NextResponse.json({ error: "Ungueltiger Upload-Typ" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const sanitizedFilename = file.name.replace(/[^a-z0-9._-]/gi, "_")
  const asset = await client.assets.upload("image", buffer, {
    filename: sanitizedFilename,
    contentType: file.type,
  })

  // Bild direkt dem Dokument zuweisen
  const imageRef = { _type: "image", asset: { _type: "reference", _ref: asset._id } }
  const fieldMap: Record<string, string> = { partner: "logo", zertifikat: "bild", hero: "heroBild", leistung: "bild", ueber: "uebermichBild" }
  const field = fieldMap[type]
  if (field && id) {
    await client.patch(id).set({ [field]: imageRef }).commit()
    revalidatePath("/", "layout")
  }

  return NextResponse.json({ url: asset.url, assetId: asset._id })
}