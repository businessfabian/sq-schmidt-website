import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_auth")?.value !== "true") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }
  revalidatePath("/", "layout")
  return NextResponse.json({ revalidated: true })
}
