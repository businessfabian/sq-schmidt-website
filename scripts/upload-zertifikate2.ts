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

const mapping = [
  { file: "zert_03.jpg", name: "Beratender Ingenieur" },
  { file: "zert_04.jpg", name: "IQ-ZERT Sachverstaendiger" },
  { file: "zert_07.jpg", name: "Sachverstaendigen Akademie Aachen" },
  { file: "zert_08.jpg", name: "TUeV Rheinland" },
  { file: "zert_11.jpg", name: "SiGeKo" },
  { file: "zert_12.jpg", name: "Dipl.-Ing. (FH) Baubetrieb" },
]

async function main() {
  const alle = await client.fetch(`*[_type == "zertifikat"]{_id, name}`)
  console.log("Gefunden:", alle.map((z: any) => z.name))

  for (const item of mapping) {
    const imgPath = path.join(process.cwd(), "scripts", item.file)
    if (!fs.existsSync(imgPath)) { console.log(`Bild fehlt: ${imgPath}`); continue }

    const zert = alle.find((z: any) => z.name === item.name)
    if (!zert) { console.log(`Zertifikat nicht gefunden: ${item.name}`); continue }

    const buffer = fs.readFileSync(imgPath)
    const asset = await client.assets.upload("image", buffer, {
      filename: item.file,
      contentType: "image/jpeg",
    })

    await client.patch(zert._id).set({
      bild: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
    }).commit()

    console.log(`Zugewiesen: ${item.name}`)
  }
  console.log("Fertig!")
}

main().catch(console.error)