import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Mail-Kategorien für Kill-Switch Steuerung:
 *
 * - auth:          Magic Link, Passwort-Reset – gehen IMMER durch
 * - transactional: Kontaktformular, Bestätigungen – nur wenn MAIL_ENABLED=true
 * - notification:  Marketing, Erinnerungen – nur wenn MAIL_ENABLED=true
 */
export type MailCategory = "auth" | "transactional" | "notification"

interface SendMailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  category?: MailCategory
}

export async function sendMail({ to, subject, html, replyTo, category = "transactional" }: SendMailOptions) {
  // Auth-Mails gehen IMMER durch – kein Kill-Switch
  if (category !== "auth" && process.env.MAIL_ENABLED !== "true") {
    console.log(`[mail] Kill-Switch aktiv (${category}). Mail an ${to} nicht gesendet: ${subject}`)
    return
  }

  await resend.emails.send({
    from: "SQ Schmidt Kontaktformular <noreply@meyso.de>",
    to: Array.isArray(to) ? to : [to],
    replyTo,
    subject,
    html,
  })
}
