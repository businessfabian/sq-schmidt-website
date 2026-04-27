import { defineType, defineField } from "sanity"

export default defineType({
  name: "referenz",
  title: "Referenz",
  type: "document",
  fields: [
    defineField({ name: "titel", title: "Titel", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "text" }),
    defineField({ name: "bild", title: "Bild", type: "image", options: { hotspot: true } }),
    defineField({ name: "kategorie", title: "Kategorie", type: "string" }),
    defineField({ name: "aktiv", title: "Aktiv", type: "boolean", initialValue: true }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number", initialValue: 99 }),
  ],
  preview: { select: { title: "titel", subtitle: "kategorie" } },
})
