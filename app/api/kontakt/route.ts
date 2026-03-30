import { NextResponse } from "next/server"
import { sendMail } from "@/lib/mail"
import { rateLimit } from "@/lib/rate-limit"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255
}

export async function POST(req: Request) {
  try {
    // Rate limit: 5 requests per minute per IP
    const forwarded = req.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"
    const { success, remaining } = rateLimit(ip, 5, 60 * 1000)
    if (!success) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": String(remaining) } }
      )
    }

    const body = await req.json()
    const vorname = String(body.vorname || "").slice(0, 100).trim()
    const nachname = String(body.nachname || "").slice(0, 100).trim()
    const email = String(body.email || "").slice(0, 255).trim()
    const telefon = String(body.telefon || "").slice(0, 30).trim()
    const leistung = String(body.leistung || "").slice(0, 100).trim()
    const nachricht = String(body.nachricht || "").slice(0, 5000).trim()

    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 })
    }

    const safeVorname = escapeHtml(vorname)
    const safeNachname = escapeHtml(nachname)
    const safeEmail = escapeHtml(email)
    const safeTelefon = escapeHtml(telefon)
    const safeLeistung = escapeHtml(leistung)
    const safeNachricht = escapeHtml(nachricht)

    await sendMail({
      to: "sqs@sq-sv.de",
      replyTo: email,
      subject: `Neue Anfrage von ${vorname} ${nachname}${leistung ? ` - ${leistung}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${safeVorname} ${safeNachname}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            ${safeTelefon ? `<tr><td style="padding: 8px 0; color: #666;">Telefon</td><td style="padding: 8px 0;">${safeTelefon}</td></tr>` : ""}
            ${safeLeistung ? `<tr><td style="padding: 8px 0; color: #666;">Leistung</td><td style="padding: 8px 0;">${safeLeistung}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #1a1a1a;">Nachricht</h3>
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${safeNachricht}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Gesendet über sq-schmidt-website.vercel.app</p>
        </div>
      `,
      category: "transactional",
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Kontakt-Fehler:", (error as Error).message)
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 })
  }
}
