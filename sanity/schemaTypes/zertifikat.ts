import { defineType, defineField } from "sanity"

export default defineType({
  name: "zertifikat",
  title: "Zertifikate",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "string" }),
    defineField({ name: "bild", title: "Bild", type: "image", options: { hotspot: true } }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "reihenfolgeAsc", by: [{ field: "reihenfolge", direction: "asc" }] }],
})