import { NextResponse } from 'next/server'

/**
 * Estrutura por key:
 * - IPs usados
 * - Fingerprints usados
 * - IP original
 */
type KeySession = {
  ips: Set<string>
  fingerprints: Set<string>
  firstIp: string
  firstSeen: number
}

const keySessions = new Map<string, KeySession>()

function getWebhookUrl() {
  const b64 = process.env.DISCORD_WEBHOOK_B64
  if (!b64) throw new Error('WEBHOOK NÃO CONFIGURADA')
  return Buffer.from(b64, 'base64').toString('utf-8')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { key, fingerprint } = body

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const userAgent = req.headers.get('user-agent') || 'unknown'

    // =========================
    // 🔎 CONTROLE DA KEY
    // =========================
    if (!keySessions.has(key)) {
      keySessions.set(key, {
        ips: new Set([ip]),
        fingerprints: new Set([fingerprint]),
        firstIp: ip,
        firstSeen: Date.now()
      })
    }

    const session = keySessions.get(key)!
    session.ips.add(ip)
    session.fingerprints.add(fingerprint)

    const ipChanged = ip !== session.firstIp
    const multipleIps = session.ips.size > 1
    const multipleFingerprints = session.fingerprints.size > 1

    const sharedDetected =
      ipChanged || multipleIps || multipleFingerprints

    // =========================
    // 📡 WEBHOOK
    // =========================
    const webhookUrl = getWebhookUrl()

    const message: any = {
      content: sharedDetected
        ? '⚠️ **KEY COMPARTILHADA DETECTADA** @everyone'
        : null,
      embeds: [
        {
          title: sharedDetected
            ? '🚨 WARNING – POSSÍVEL COMPARTILHAMENTO'
            : '🔐 LOGIN COM KEY',
          color: sharedDetected ? 15158332 : 3447003,
          fields: [
            { name: 'Key', value: `\`${key}\`` },
            { name: 'IP Atual', value: `\`${ip}\`` },
            { name: 'IP Original', value: `\`${session.firstIp}\`` },
            { name: 'IPs únicos', value: `\`${session.ips.size}\`` },
            { name: 'Fingerprints únicos', value: `\`${session.fingerprints.size}\`` },
            { name: 'Fingerprint atual', value: `\`${fingerprint}\`` },
            { name: 'User-Agent', value: userAgent }
          ],
          footer: {
            text: new Date().toLocaleString('pt-BR')
          }
        }
      ]
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    })

    return NextResponse.json({
      success: true,
      sharedDetected
    })
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
