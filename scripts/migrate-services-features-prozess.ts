/**
 * Migration: Features + Prozess aus lib/services-data.ts in die Sanity-Dokumente
 * vom Typ "leistung" uebertragen.
 *
 * Matcht per normalisiertem Titel (ae/oe/ue == ä/ö/ü).
 *
 * Usage (dry run):
 *   npx tsx scripts/migrate-services-features-prozess.ts
 *
 * Usage (tatsaechlich schreiben):
 *   APPLY=1 npx tsx scripts/migrate-services-features-prozess.ts
 *
 * Env required:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN
 */
import { createClient } from "@sanity/client"
import { servicesData } from "../lib/services-data"

const DRY = process.env.APPLY !== "1"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

function normalize(s: string): string {
  return s.toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

type SanityLeistung = { _id: string; titel: string; slug?: { current?: string } }

async function main() {
  console.log(`\nMigration services-data.ts, Sanity Leistungen ${DRY ? "(DRY RUN)" : "(APPLY)"}\n`)

  const leistungen = await client.fetch<SanityLeistung[]>(
    `*[_type == "leistung"]{ _id, titel, slug }`,
  )
  console.log(`${leistungen.length} Leistungen in Sanity gefunden`)
  console.log(`${servicesData.length} Services in services-data.ts\n`)

  const byNormalizedTitle = new Map<string, SanityLeistung>()
  for (const l of leistungen) byNormalizedTitle.set(normalize(l.titel), l)

  let applied = 0
  let skipped = 0
  let notFound = 0

  for (const svc of servicesData) {
    const key = normalize(svc.title)
    const match = byNormalizedTitle.get(key)
    if (!match) {
      console.log(`✗ NICHT GEFUNDEN: "${svc.title}" (key="${key}")`)
      notFound++
      continue
    }

    const prozess = svc.process.map((p, i) => ({
      _type: "prozessSchritt",
      _key: `mig_${match._id}_${i}`,
      titel: p.title,
      beschreibung: p.description,
    }))

    const patch = {
      leistungsumfang: svc.features,
      prozess,
    }

    console.log(`→ ${svc.title}`)
    console.log(`  Match: ${match.titel} (${match._id})`)
    console.log(`  leistungsumfang: ${svc.features.length} Eintraege`)
    console.log(`  prozess: ${prozess.length} Schritte`)

    if (DRY) {
      skipped++
      continue
    }

    try {
      await client.patch(match._id).set(patch).commit()
      applied++
      console.log(`  ✓ gepatcht`)
    } catch (err) {
      console.error(`  ✗ Fehler:`, err)
    }
  }

  console.log(`\nZusammenfassung:`)
  console.log(`  Gefunden+gepatcht: ${applied}`)
  console.log(`  Gefunden+DRY:      ${skipped}`)
  console.log(`  Nicht gefunden:    ${notFound}`)
  if (DRY) console.log(`\nDas war ein DRY RUN. Mit APPLY=1 erneut ausfuehren zum Schreiben.\n`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
