import { NextResponse } from "next/server"
import { createSessionToken } from "@/lib/session"

export async function POST(req: Request) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: "Server-Konfigurationsfehler" }, { status: 500 })
  }
  if (password !== adminPassword) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 })
  }
  const token = createSessionToken()
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
  // Clear legacy cookie if present
  res.cookies.delete("admin_auth")
  return res
}
