import { createClient } from "next-sanity"
import { AdminDashboard } from "@/components/admin-dashboard"

// Admin muss immer fresh sehen, kein Next-Cache, kein Sanity CDN.
// Sonst wirken Speicherungen als waeren sie nicht uebernommen (CDN-Delay 1-5s).
export const dynamic = "force-dynamic"

const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export default async function DashboardPage() {
  const einstellungen = await adminClient.fetch(`*[_type == "einstellungen"][0]{
    ...,
    "heroBildUrl": heroBild.asset->url
  }`)
  return <AdminDashboard einstellungen={einstellungen} />
}
