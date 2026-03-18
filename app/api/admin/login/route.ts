import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123"
  if (password !== adminPassword) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}