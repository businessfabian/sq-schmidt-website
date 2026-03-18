import { defineType, defineField } from "sanity"

export default defineType({
  name: "seminartermin",
  title: "Seminartermin",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "slug", title: "URL-Slug", type: "slug", options: { source: "titel" } }),
    defineField({ name: "kategorie", title: "Kategorie", type: "string",
      options: { list: [
        { title: "Alle", value: "alle" },
        { title: "Bau", value: "bau" },
        { title: "Recht", value: "recht" },
        { title: "Technik", value: "technik" },
        { title: "Sonstiges", value: "sonstiges" },
      ]}
    }),
    defineField({ name: "datum", title: "Datum", type: "date" }),
    defineField({ name: "uhrzeit", title: "Uhrzeit", type: "string", description: "z.B. 09:00 - 17:00 Uhr" }),
    defineField({ name: "ort", title: "Ort", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 4 }),
    defineField({ name: "preis", title: "Preis", type: "string", description: "z.B. 299,00 EUR" }),
    defineField({ name: "anmeldeLink", title: "Anmelde-Link (optional)", type: "url" }),
    defineField({ name: "aktiv", title: "Aktiv", type: "boolean", initialValue: true }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "titel", subtitle: "datum" },
  },
})