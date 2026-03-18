import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret")
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  revalidatePath("/", "layout")
  return NextResponse.json({ revalidated: true })
}