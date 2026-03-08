import { defineType, defineField } from "sanity"

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "beschreibung", title: "Beschreibung", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "webseite", title: "Webseite URL", type: "url" }),
    defineField({ name: "reihenfolge", title: "Reihenfolge", type: "number" }),
  ],
  orderings: [{ title: "Reihenfolge", name: "reihenfolgeAsc", by: [{ field: "reihenfolge", direction: "asc" }] }],
})
