import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { vorname, nachname, email, telefon, leistung, nachricht } = await req.json()
    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 })
    }
    await resend.emails.send({
      from: "SQ Schmidt Kontaktformular <noreply@meyso.de>",
      to: ["sqs@sq-sv.de"],
      replyTo: email,
      subject: `Neue Anfrage von ${vorname} ${nachname}${leistung ? ` - ${leistung}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${vorname} ${nachname}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telefon ? `<tr><td style="padding: 8px 0; color: #666;">Telefon</td><td style="padding: 8px 0;">${telefon}</td></tr>` : ""}
            ${leistung ? `<tr><td style="padding: 8px 0; color: #666;">Leistung</td><td style="padding: 8px 0;">${leistung}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #1a1a1a;">Nachricht</h3>
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${nachricht}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Gesendet ueber sq-schmidt-website.vercel.app</p>
        </div>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Fehler beim Senden" }, { status: 500 })
  }
}