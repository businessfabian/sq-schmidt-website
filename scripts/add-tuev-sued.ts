import { createClient } from "@sanity/client"
import fs from "fs"
import path from "path"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

async function main() {
  // Neues Zertifikat anlegen
  const buffer = fs.readFileSync(path.join(process.cwd(), "scripts", "zert_09.jpg"))
  const asset = await client.assets.upload("image", buffer, { filename: "zert_09.jpg", contentType: "image/jpeg" })

  await client.create({
    _type: "zertifikat",
    name: "TÜV SÜD Schimmelpilzsanierung",
    beschreibung: "Fachkraft zur Sanierung von Schimmelpilzschäden — TÜV SÜD Akademie, April 2008",
    reihenfolge: 9,
    aktiv: true,
    bild: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
  })

  console.log("TÜV SÜD Zertifikat angelegt!")
}

main().catch(console.error)