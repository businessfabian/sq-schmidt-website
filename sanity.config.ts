import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"

export default defineConfig({
  name: "sq-schmidt",
  title: "SQ Schmidt Admin",
  projectId: "cbnefaat",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
