import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
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

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  try {
    const client = getClient()
    const formData = await req.formData()
    const file = formData.get("file") as File
    const projektId = formData.get("projektId") as string
    const alt = (formData.get("alt") as string) || ""
    const caption = (formData.get("caption") as string) || ""

    if (!file || !projektId) return NextResponse.json({ error: "Datei und Projekt-ID erforderlich" }, { status: 400 })

    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "Datei zu groß (max. 5MB)" }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const sanitizedFilename = file.name.replace(/[^a-z0-9._-]/gi, "_")
    const asset = await client.assets.upload("image", buffer, {
      filename: sanitizedFilename,
      contentType: file.type,
    })

    const galerieItem = {
      _type: "image",
      _key: `gal_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      asset: { _type: "reference", _ref: asset._id },
      alt,
      caption,
    }

    await client
      .patch(projektId)
      .setIfMissing({ galerie: [] })
      .append("galerie", [galerieItem])
      .commit()

    revalidatePath("/", "layout")
    return NextResponse.json({ url: asset.url, assetId: asset._id, key: galerieItem._key })
  } catch {
    return NextResponse.json({ error: "Upload fehlgeschlagen" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  try {
    const client = getClient()
    const { projektId, imageKey } = await req.json()
    if (!projektId || !imageKey) return NextResponse.json({ error: "Projekt-ID und Bild-Key erforderlich" }, { status: 400 })

    await client
      .patch(projektId)
      .unset([`galerie[_key=="${imageKey}"]`])
      .commit()

    revalidatePath("/", "layout")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Löschen fehlgeschlagen" }, { status: 500 })
  }
}
