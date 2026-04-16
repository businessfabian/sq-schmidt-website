import { defineType, defineField } from "sanity"

export default defineType({
  name: "leistung",
  title: "Leistung",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "slug", title: "URL-Slug", type: "slug", options: { source: "titel" } }),
    defineField({ name: "kurzBeschreibung", title: "Kurzbeschreibung", type: "text", rows: 2 }),
    defineField({ name: "beschreibung", title: "Vollständige Beschreibung", type: "text", rows: 5 }),
    defineField({ name: "icon", title: "Icon Name (lucide-react)", type: "string",
      description: "z.B. ShieldCheck, FileSearch, Wrench, Scale..." }),
    defineField({ name: "bild", title: "Bild", type: "image",
      description: "Wird auf der Detailseite als Header-Bild angezeigt" }),
    defineField({
      name: "leistungsumfang",
      title: "Leistungsumfang",
      type: "array",
      of: [{ type: "string" }],
      description: "Einzelne Punkte, die auf der Detailseite als Haekchen-Liste angezeigt werden",
    }),
    defineField({
      name: "prozess",
      title: "Prozess-Schritte",
      type: "array",
      description: "Die 4-Schritt-Grafik auf der Detailseite. Reihenfolge bestimmt die Nummerierung.",
      of: [
        {
          type: "object",
          name: "prozessSchritt",
          title: "Schritt",
          fields: [
            defineField({ name: "titel", title: "Titel", type: "string" }),
            defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "titel", subtitle: "beschreibung" },
          },
        },
      ],
    }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
    defineField({ name: "aktiv", title: "Aktiv (auf Website anzeigen)", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "titel", subtitle: "kurzBeschreibung", media: "bild" },
  },
})
