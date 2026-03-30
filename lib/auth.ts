import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/session"

/**
 * Check if the current request is authenticated as admin.
 * Accepts both the new signed session token and the legacy cookie
 * for backwards compatibility.
 */
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()

  // Check new signed session cookie first
  const session = cookieStore.get("admin_session")?.value
  if (session && verifySessionToken(session)) {
    return true
  }

  // Fallback: legacy cookie (will be removed in the future)
  const legacy = cookieStore.get("admin_auth")?.value
  return legacy === "true"
}
