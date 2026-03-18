import { createClient } from "@sanity/client"
import fs from "fs"
import path from "path"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// Mapping: Seite -> Zertifikat Name
const mapping = [
  { page: 3, name: "Beratender Ingenieur" },
  { page: 4, name: "IQ-ZERT Sachverstaendiger" },
  { page: 8, name: "TUeV Rheinland" },
  { page: 9, name: "TUeV Schimmelpilzsanierung" },
  { page: 11, name: "SiGeKo" },
  { page: 12, name: "Dipl.-Ing. (FH) Baubetrieb" },
  { page: 7, name: "Sachverstaendigen Akademie Aachen" },
]

async function uploadZertifikate() {
  for (const item of mapping) {
    const imgPath = path.join(process.cwd(), `zert_${String(item.page).padStart(2,'0')}.jpg`)
    if (!fs.existsSync(imgPath)) {
      console.log(`Bild nicht gefunden: ${imgPath}`)
      continue
    }
    
    // Bild zu Sanity hochladen
    const buffer = fs.readFileSync(imgPath)
    const asset = await client.assets.upload("image", buffer, {
      filename: `zertifikat-${item.page}.jpg`,
      contentType: "image/jpeg",
    })
    console.log(`Hochgeladen: ${item.name} -> ${asset._id}`)
    
    // Passendes Zertifikat in Sanity finden und Bild zuweisen
    const zert = await client.fetch(
      `*[_type == "zertifikat" && name match $name][0]`,
      { name: item.name + "*" }
    )
    
    if (zert) {
      await client.patch(zert._id).set({
        bild: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
      }).commit()
      console.log(`Zugewiesen: ${item.name}`)
    } else {
      console.log(`Zertifikat nicht gefunden: ${item.name}`)
    }
  }
  console.log("Fertig!")
}

uploadZertifikate().catch(console.error)
