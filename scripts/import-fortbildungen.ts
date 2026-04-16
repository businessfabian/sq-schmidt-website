/**
 * Import-Script: Fortbildungen aus JSON nach Sanity
 *
 * Voraussetzung: SANITY_WRITE_TOKEN und NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * Ausfuehren:    npm run import:fortbildungen
 *                (oder: tsx scripts/import-fortbildungen.ts)
 */

import { createClient } from "@sanity/client"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

// .env.local manuell laden (tsx laedt es nicht automatisch)
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
    if (key && !(key in process.env)) {
      process.env[key] = val
    }
  }
}

loadEnvLocal()

// Themenbereich-Mapping: JSON-Label -> Sanity-Slug
const THEMENBEREICH_MAP: Record<string, string> = {
  "Feuchte & Schimmel": "feuchte-schimmel",
  "Abdichtung": "abdichtung",
  "WDVS & Fassade": "wdvs-fassade",
  "Energieeffizienz": "energieeffizienz",
  "Recht & Sachverstaendigenwesen": "recht-sachverstaendigenwesen",
  // Mit originalem Umlaut (wie in der JSON)
  "Recht & Sachverst\u00e4ndigenwesen": "recht-sachverstaendigenwesen",
}

interface FortbildungJSON {
  titel: string
  datum: string
  veranstalter: string
  ort?: string
  themenbereich?: string
  unterrichtseinheiten?: number
  hervorgehoben?: boolean
}

async function main() {
  // Vorab-Pruefungen
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID nicht gesetzt.")
    console.error("Bitte in .env.local eintragen.")
    process.exit(1)
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("FEHLER: SANITY_WRITE_TOKEN nicht gesetzt.")
    console.error("Bitte in .env.local eintragen: SANITY_WRITE_TOKEN=sk...")
    process.exit(1)
  }

  // Client erst nach Env-Check erstellen
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  })

  // JSON einlesen
  const jsonPath = join(process.cwd(), "scripts", "import-fortbildungen.json")
  if (!existsSync(jsonPath)) {
    console.error(`FEHLER: JSON nicht gefunden unter ${jsonPath}`)
    process.exit(1)
  }

  const raw = readFileSync(jsonPath, "utf-8")
  const eintraege: FortbildungJSON[] = JSON.parse(raw)
  console.log(`\n${eintraege.length} Fortbildungen geladen.\n`)

  // Sanity-Verbindung pruefen
  try {
    await client.fetch(`*[_type == "fortbildung"][0]{ _id }`)
  } catch (err) {
    console.error('FEHLER: Sanity nicht erreichbar oder Schema "fortbildung" fehlt.')
    console.error(err)
    process.exit(1)
  }

  let erfolgreich = 0
  let fehlgeschlagen = 0
  const fehlerListe: string[] = []

  for (const eintrag of eintraege) {
    const themenbereichtSlug = eintrag.themenbereich
      ? (THEMENBEREICH_MAP[eintrag.themenbereich] ?? null)
      : null

    if (eintrag.themenbereich && !themenbereichtSlug) {
      console.warn(
        `  WARN: Unbekannter Themenbereich "${eintrag.themenbereich}" bei "${eintrag.titel}", wird ohne Themenbereich importiert`
      )
    }

    const dokument = {
      _type: "fortbildung" as const,
      titel: eintrag.titel,
      datum: eintrag.datum,
      veranstalter: eintrag.veranstalter,
      ...(eintrag.ort ? { ort: eintrag.ort } : {}),
      ...(themenbereichtSlug ? { themenbereich: themenbereichtSlug } : {}),
      ...(eintrag.unterrichtseinheiten != null
        ? { unterrichtseinheiten: eintrag.unterrichtseinheiten }
        : {}),
      hervorgehoben: eintrag.hervorgehoben ?? false,
    }

    try {
      await client.create(dokument)
      console.log(`  OK  ${eintrag.titel} (${eintrag.datum})`)
      erfolgreich++
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  XX  ${eintrag.titel} -> ${msg}`)
      fehlgeschlagen++
      fehlerListe.push(`${eintrag.titel}: ${msg}`)
    }

    // Rate Limiting: 200ms Pause zwischen Creates
    await new Promise((r) => setTimeout(r, 200))
  }

  // Zusammenfassung
  console.log("\n----------------------------------------")
  console.log("Import abgeschlossen")
  console.log(`  Gesamt:         ${eintraege.length}`)
  console.log(`  Erfolgreich:    ${erfolgreich}`)
  console.log(`  Fehlgeschlagen: ${fehlgeschlagen}`)

  if (fehlerListe.length > 0) {
    console.log("\nFehler-Details:")
    fehlerListe.forEach((f) => console.log(`  - ${f}`))
  }

  console.log("----------------------------------------\n")
}

main().catch((err) => {
  console.error("Unerwarteter Fehler:", err)
  process.exit(1)
})
