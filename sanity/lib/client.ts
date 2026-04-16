import { createClient } from "next-sanity"

// useCdn:false, damit Aenderungen im Admin direkt ohne Sanity-CDN-Delay (1-5s)
// auf der Website sichtbar sind. Next.js cached SSR weiterhin per revalidate
// bzw. revalidatePath, daher entsteht kaum Mehrlast bei Sanity.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
})