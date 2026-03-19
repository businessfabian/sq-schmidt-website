import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: "Server-Konfigurationsfehler" }, { status: 500 })
  }
  if (password !== adminPassword) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}