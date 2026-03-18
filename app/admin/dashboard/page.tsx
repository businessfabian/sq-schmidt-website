import { getEinstellungen } from "@/sanity/lib/queries"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function DashboardPage() {
  const einstellungen = await getEinstellungen()
  return <AdminDashboard einstellungen={einstellungen} />
}