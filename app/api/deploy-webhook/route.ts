import { NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8586313601:AAGCuAZHi0I_uCmMLuAyfJHdRYbWaCL17zM"
const TELEGRAM_CHAT_ID = "711529048"

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
  })
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const type = data.type || ""
    const deployment = data.payload?.deployment || {}
    const name = deployment.name || "unbekannt"
    const state = deployment.state || deployment.readyState || ""
    const url = deployment.url || ""
    const errorMessage = deployment.errorMessage || ""

    if (type === "deployment.succeeded" || state === "READY") {
      await sendTelegram(`Deploy OK: ${name}`)
    } else if (type === "deployment.error" || state === "ERROR" || state === "CANCELED") {
      let msg = `Deploy FEHLGESCHLAGEN\n${"=".repeat(25)}\nProjekt: ${name}\nStatus: ${state}`
      if (errorMessage) msg += `\nFehler: ${errorMessage}`
      if (url) msg += `\nURL: ${url}`
      await sendTelegram(msg)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}
