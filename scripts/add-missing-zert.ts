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
  const alle = await client.fetch(`*[_type == "zertifikat"]{_id, name}`)

  const items = [
    { file: "zert_01.jpg", name: "Vorsitzender Meisterpruefungsausschuss" },
    { file: "zert_15.jpg", name: "Maurer Gesellenpruefung" },
  ]

  for (const item of items) {
    const imgPath = path.join(process.cwd(), "scripts", item.file)
    const zert = alle.find((z: any) => z.name === item.name)
    if (!zert) { console.log(`Nicht gefunden: ${item.name}`); continue }

    const buffer = fs.readFileSync(imgPath)
    const asset = await client.assets.upload("image", buffer, { filename: item.file, contentType: "image/jpeg" })
    await client.patch(zert._id).set({
      bild: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
    }).commit()
    console.log(`Zugewiesen: ${item.name}`)
  }
  console.log("Fertig!")
}

main().catch(console.error)