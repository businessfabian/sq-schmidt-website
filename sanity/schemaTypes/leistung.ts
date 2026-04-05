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
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
    defineField({ name: "aktiv", title: "Aktiv (auf Website anzeigen)", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "titel", subtitle: "kurzBeschreibung" },
  },
})