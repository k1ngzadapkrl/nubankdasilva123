import { NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1398843508525240433/SyW660--JdYoM5LSIYR_21BEOjpnu8rgzp1n6ZeAuve1kQFdaVHdhPyW49gajDwF4cQH";

// memória simples (em produção o ideal é banco)
const keyMap = new Map<string, Set<string>>();

export async function POST(req: Request) {
  try {
    const { key, fingerprint } = await req.json();

    if (!key || !fingerprint) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (!keyMap.has(key)) {
      keyMap.set(key, new Set());
    }

    const devices = keyMap.get(key)!;
    devices.add(fingerprint);

    // SE PASSAR DE 2 DISPOSITIVOS → AVISA
    if (devices.size > 2) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **COMPARTILHAMENTO DETECTADO**\n🔑 Key: ${key}\n📱 Dispositivos: ${devices.size}`,
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      devices: devices.size,
    });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
