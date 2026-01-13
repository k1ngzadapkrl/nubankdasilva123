import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

const WEBHOOK = process.env.DISCORD_WEBHOOK!

export async function POST(req: Request) {
  const { key, deviceId } = await req.json()

  if (!key || !deviceId) {
    return NextResponse.json({ error: "INVALID_DATA" }, { status: 400 })
  }

  const { data } = await supabase
    .from("keys")
    .select("*")
    .eq("key", key)
    .single()

  if (!data || data.banned) {
    return NextResponse.json({ error: "INVALID_KEY" }, { status: 401 })
  }

  let devices = data.devices || []

  if (!devices.includes(deviceId)) {
    devices.push(deviceId)
  }

  // 🚫 mais de 2 dispositivos → BAN
  if (devices.length > 2) {
    await supabase
      .from("keys")
      .update({ banned: true })
      .eq("key", key)

    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚨 **KEY BANIDA**
Key: ${key}
Dispositivos detectados: ${devices.length}`
      })
    })

    return NextResponse.json({ error: "BANNED" }, { status: 403 })
  }

  await supabase
    .from("keys")
    .update({ devices })
    .eq("key", key)

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `✅ Login autorizado
Key: ${key}
Device: ${deviceId}
Total devices: ${devices.length}`
    })
  })

  return NextResponse.json({ ok: true })
}
