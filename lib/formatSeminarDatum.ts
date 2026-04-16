/**
 * Formatiert ein Seminar-Datum als deutschen String.
 *
 * Sanity speichert Daten als "YYYY-MM-DD". Um Timezone-Probleme zu vermeiden
 * (UTC-Mitternacht koennte in DE als Vortag erscheinen), werden die Teile
 * manuell geparst und als lokale Zeit erstellt.
 *
 * Beispiele:
 *   formatSeminarDatum("2026-09-21")              -> "21. September 2026"
 *   formatSeminarDatum("2026-09-21", "2026-09-22") -> "21. bis 22. September 2026"
 *   formatSeminarDatum("2026-09-28", "2026-10-02") -> "28.09. bis 02.10.2026"
 */
export function formatSeminarDatum(datumVon: string, datumBis?: string | null): string {
  const von = parseDatum(datumVon)

  if (!datumBis) {
    return von.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const bis = parseDatum(datumBis)
  const gleichesJahr = von.getFullYear() === bis.getFullYear()
  const gleichesMonat = gleichesJahr && von.getMonth() === bis.getMonth()

  if (gleichesMonat) {
    // Gleicher Monat: "21. bis 22. September 2026"
    const vonTag = von.toLocaleDateString("de-DE", { day: "2-digit" })
    const bisVoll = bis.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    return `${vonTag}. bis ${bisVoll}`
  }

  // Unterschiedlicher Monat: "28.09. bis 02.10.2026"
  const vonKurz = von.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })
  const bisKurz = bis.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  return `${vonKurz} bis ${bisKurz}`
}

/** Parst "YYYY-MM-DD" als lokale Zeit (verhindert UTC-Offset-Fehler). */
function parseDatum(datum: string): Date {
  const [year, month, day] = datum.split("-").map(Number)
  return new Date(year, month - 1, day)
}
