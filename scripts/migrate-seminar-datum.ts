/**
 * Migration: Seminartermin "datum" -> "datumVon"
 *
 * Das alte Feld "datum" wird als "datumVon" uebernommen.
 * "datumBis" bleibt leer (eintaegige Seminare).
 *
 * Voraussetzung: SANITY_WRITE_TOKEN in .env.local
 * Ausfuehren:    npm run migrate:seminare
 */

import { createClient } from "@sanity/client"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local")
  if (!existsSync(envPath)) return
  const lines = readFileSync(envPath, "utf-8").split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "")
    if (key && !(key in process.env)) process.env[key] = val
  }
}

loadEnvLocal()

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID nicht gesetzt.")
    process.exit(1)
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("FEHLER: SANITY_WRITE_TOKEN nicht gesetzt. Bitte in .env.local eintragen.")
    process.exit(1)
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  // Alle Seminare holen die noch das alte "datum" Feld haben
  const seminare = await client.fetch<Array<{ _id: string; datum?: string; datumVon?: string }>>(
    `*[_type == "seminartermin" && defined(datum) && !defined(datumVon)]{ _id, datum, datumVon }`
  )

  console.log(`\nGefunden: ${seminare.length} Seminare mit altem "datum"-Feld.\n`)

  if (seminare.length === 0) {
    console.log("Keine Migration noetig. Alle Seminare haben bereits das neue Format.")
    console.log("(Oder es existieren noch keine Seminartermine in Sanity.)\n")
    return
  }

  let erfolgreich = 0
  let fehlgeschlagen = 0

  for (const seminar of seminare) {
    if (!seminar.datum) {
      console.log(`  SKIP  ${seminar._id} (kein datum-Wert)`)
      continue
    }

    try {
      await client
        .patch(seminar._id)
        .set({ datumVon: seminar.datum })
        .unset(["datum"])
        .commit()

      console.log(`  OK  ${seminar._id} -> datumVon: ${seminar.datum}`)
      erfolgreich++
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  XX  ${seminar._id} -> ${msg}`)
      fehlgeschlagen++
    }

    await new Promise((r) => setTimeout(r, 150))
  }

  console.log("\n----------------------------------------")
  console.log("Migration abgeschlossen")
  console.log(`  Gesamt:         ${seminare.length}`)
  console.log(`  Erfolgreich:    ${erfolgreich}`)
  console.log(`  Fehlgeschlagen: ${fehlgeschlagen}`)
  console.log("----------------------------------------\n")
}

main().catch((err) => {
  console.error("Unerwarteter Fehler:", err)
  process.exit(1)
})
