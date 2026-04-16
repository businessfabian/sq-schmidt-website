import { defineType, defineField } from "sanity"

export default defineType({
  name: "seminartermin",
  title: "Seminartermin",
  type: "document",
  fieldsets: [
    {
      name: "zeitraum",
      title: "Zeitraum",
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "slug", title: "URL-Slug", type: "slug", options: { source: "titel" } }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Alle", value: "alle" },
          { title: "Bau", value: "bau" },
          { title: "Recht", value: "recht" },
          { title: "Technik", value: "technik" },
          { title: "Sonstiges", value: "sonstiges" },
        ],
      },
    }),
    defineField({
      name: "datumVon",
      title: "Von",
      type: "date",
      validation: (r) => r.required(),
      fieldset: "zeitraum",
    }),
    defineField({
      name: "datumBis",
      title: "Bis (optional)",
      type: "date",
      description: "Nur bei mehrtaegigen Seminaren ausfullen",
      fieldset: "zeitraum",
      validation: (r) =>
        r.custom((datumBis: string | undefined, context) => {
          if (!datumBis) return true
          const datumVon = (context.document as Record<string, unknown>)?.datumVon as
            | string
            | undefined
          if (!datumVon) return true
          if (datumBis <= datumVon) return "Enddatum muss nach dem Startdatum liegen"
          return true
        }),
    }),
    defineField({
      name: "uhrzeit",
      title: "Uhrzeit",
      type: "string",
      description: "z.B. 09:00 - 17:00 Uhr",
    }),
    defineField({ name: "ort", title: "Ort", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text", rows: 4 }),
    defineField({
      name: "preis",
      title: "Preis",
      type: "string",
      description: "z.B. 299,00 EUR",
    }),
    defineField({ name: "anmeldeLink", title: "Anmelde-Link (optional)", type: "url" }),
    defineField({ name: "aktiv", title: "Aktiv", type: "boolean", initialValue: true }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "titel", subtitle: "datumVon" },
  },
})
