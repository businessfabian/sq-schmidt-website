import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"

export async function POST() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }
  revalidatePath("/", "layout")
  return NextResponse.json({ revalidated: true })
}
