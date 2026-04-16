import { defineType, defineField } from "sanity"
import { GraduationCap } from "lucide-react"

export default defineType({
  name: "fortbildung",
  title: "Fortbildung",
  type: "document",
  icon: GraduationCap,
  preview: {
    select: { title: "titel", subtitle: "datum" },
    prepare(selection: Record<string, string>) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
          : "Kein Datum",
      }
    },
  },
  orderings: [
    {
      title: "Datum absteigend",
      name: "datumDesc",
      by: [{ field: "datum", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "datum",
      title: "Datum",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "veranstalter",
      title: "Veranstalter",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ort",
      title: "Ort (optional)",
      type: "string",
    }),
    defineField({
      name: "themenbereich",
      title: "Themenbereich",
      type: "string",
      options: {
        list: [
          { title: "Feuchte & Schimmel", value: "feuchte-schimmel" },
          { title: "Abdichtung", value: "abdichtung" },
          { title: "WDVS & Fassade", value: "wdvs-fassade" },
          { title: "Energieeffizienz", value: "energieeffizienz" },
          { title: "Recht & Sachverstaendigenwesen", value: "recht-sachverstaendigenwesen" },
        ],
      },
    }),
    defineField({
      name: "unterrichtseinheiten",
      title: "Unterrichtseinheiten",
      type: "number",
    }),
    defineField({
      name: "hervorgehoben",
      title: "Hervorgehoben",
      type: "boolean",
      initialValue: false,
      description: "Erscheint im Top-Grid der Seite",
    }),
    defineField({
      name: "seoTitel",
      title: "SEO Titel",
      type: "string",
    }),
    defineField({
      name: "seoBeschreibung",
      title: "SEO Beschreibung",
      type: "text",
      rows: 2,
    }),
  ],
})
