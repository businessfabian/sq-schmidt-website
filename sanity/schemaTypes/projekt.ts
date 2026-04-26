import { defineType, defineField } from "sanity"

export default defineType({
  name: "projekt",
  title: "Projekt / Referenz",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "titel",
      title: "Projekt Titel",
      type: "string",
      description: 'Z.B. "Schadensgutachten Mehrfamilienhaus Villingen"',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: {
        source: "titel",
        slugify: (input: string) =>
          input.toLowerCase()
            .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
            .replace(/ß/g, "ss").replace(/Ä/g, "ae").replace(/Ö/g, "oe").replace(/Ü/g, "ue")
            .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96),
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "projektDatum",
      title: "Projekt Datum",
      type: "date",
      description: "Fuer chronologische Sortierung",
      options: { dateFormat: "YYYY-MM" },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Schadensgutachten", value: "schadensgutachten" },
          { title: "Baubegleitung", value: "baubegleitung" },
          { title: "Beweissicherung", value: "beweissicherung" },
          { title: "Schimmelpilzgutachten", value: "schimmel" },
          { title: "Sanierungskonzept", value: "sanierung" },
          { title: "Baumediation", value: "baumediation" },
          { title: "Bauleitung", value: "bauleitung" },
          { title: "Sonstiges", value: "sonstiges" },
        ],
      },
    }),
    defineField({
      name: "ort",
      title: "Ort / Region",
      type: "string",
      description: 'Z.B. "Villingen-Schwenningen" oder "Schwarzwald-Baar-Kreis"',
    }),
    defineField({
      name: "kurzbeschreibung",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
      description: "Ein bis zwei Saetze fuer die Uebersichtskarte (max. 200 Zeichen)",
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: "titelbild",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "galerie",
      title: "Bildergalerie (optional)",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", type: "string", title: "Alt Text" }),
          defineField({ name: "caption", type: "string", title: "Bildunterschrift" }),
        ],
      }],
    }),
    defineField({
      name: "beschreibung",
      title: "Beschreibung",
      type: "text",
      rows: 8,
      description: "Ausfuehrlicher Projekttext",
    }),
    defineField({
      name: "aufgabenstellung",
      title: "Aufgabenstellung",
      type: "text",
      rows: 4,
      description: "Was war das Problem / der Auftrag?",
    }),
    defineField({
      name: "loesung",
      title: "Vorgehen / Loesung",
      type: "text",
      rows: 4,
      description: "Was haben wir konkret gemacht?",
    }),
    defineField({
      name: "ergebnis",
      title: "Ergebnis",
      type: "text",
      rows: 4,
      description: "Was kam dabei raus?",
    }),
    defineField({
      name: "verlinkteLeistungen",
      title: "Verlinkte Leistungen",
      type: "array",
      of: [{ type: "reference", to: [{ type: "leistung" }] }],
      description: "Welche Leistungen wurden hier erbracht?",
    }),
    defineField({
      name: "seoTitel",
      title: "SEO Titel (optional)",
      type: "string",
      group: "seo",
      description: "Wenn leer, wird automatisch generiert. Max. 60 Zeichen.",
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: "seoBeschreibung",
      title: "SEO Beschreibung (optional)",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Wenn leer, wird die Kurzbeschreibung verwendet. Max. 160 Zeichen.",
      validation: Rule => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Datum, neueste zuerst",
      name: "datumDesc",
      by: [{ field: "projektDatum", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titel",
      ort: "ort",
      datum: "projektDatum",
      media: "titelbild",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, ort, datum, media }: { title: string; ort?: string; datum?: string; media?: any }) {
      const datumStr = datum
        ? new Date(datum).toLocaleDateString("de-DE", { year: "numeric", month: "long" })
        : ""
      return {
        title,
        subtitle: [ort, datumStr].filter(Boolean).join(" · "),
        media,
      }
    },
  },
})
