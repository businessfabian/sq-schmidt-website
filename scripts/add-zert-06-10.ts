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
  const items = [
    { file: "zert_06.jpg", name: "Ingenieurkammer BW Mitglied", beschreibung: "Freiwilliges Mitglied der Ingenieurkammer Baden-Wuerttemberg Nr. 4856 — November 2009", reihenfolge: 10 },
    { file: "zert_10.jpg", name: "TUeV SUeD Sachkundenachweis", beschreibung: "Sachkundenachweis zur Schimmelpilzsanierung — TUeV SUeD Akademie, April 2008", reihenfolge: 11 },
  ]

  for (const item of items) {
    const imgPath = path.join(process.cwd(), "scripts", item.file)
    const buffer = fs.readFileSync(imgPath)
    const asset = await client.assets.upload("image", buffer, { filename: item.file, contentType: "image/jpeg" })

    await client.create({
      _type: "zertifikat",
      name: item.name,
      beschreibung: item.beschreibung,
      reihenfolge: item.reihenfolge,
      aktiv: true,
      bild: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
    })
    console.log(`Angelegt: ${item.name}`)
  }
  console.log("Fertig!")
}

main().catch(console.error)