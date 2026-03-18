import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})

async function main() {
  const z = await client.fetch(`*[_type == "zertifikat"]{name, "hasBild": defined(bild)}`)
  console.log(z)
}

main().catch(console.error)