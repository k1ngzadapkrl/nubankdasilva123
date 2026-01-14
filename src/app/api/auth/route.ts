import { NextResponse } from 'next/server'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000 // 7 dias exatos

type GeoData = {
  ip?: string
  city?: string
  region?: string
  country_name?: string
  org?: string
}

type KeySession = {
  ips: Set<string>
  fingerprints: Set<string>
  firstIp: string
  firstGeo?: GeoData
  firstSeen: number
}

const keySessions = new Map<string, KeySession>()

function getWebhookUrl() {
  const b64 = process.env.DISCORD_WEBHOOK_B64
  if (!b64) throw new Error('WEBHOOK NÃO CONFIGURADA')
  return Buffer.from(b64, 'base64').toString('utf-8')
}

async function getGeo(ip: string): Promise<GeoData | null> {
  if (!ip || ip === 'unknown') return null

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { key, fingerprint } = body

    if (!key || !fingerprint) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const userAgent = req.headers.get('user-agent') || 'unknown'
    const now = Date.now()

    const geo = await getGeo(ip)

    // =========================
    // 🧠 REGISTRO DA KEY
    // =========================
    if (!keySessions.has(key)) {
      keySessions.set(key, {
        ips: new Set([ip]),
        fingerprints: new Set([fingerprint]),
        firstIp: ip,
        firstGeo: geo || undefined,
        firstSeen: now
      })
    }

    const session = keySessions.get(key)!
    const expiresAt = session.firstSeen + WEEK_MS
    const expired = now > expiresAt

    session.ips.add(ip)
    session.fingerprints.add(fingerprint)

    const ipChanged = ip !== session.firstIp
    const multipleIps = session.ips.size > 1
    const multipleFingerprints = session.fingerprints.size > 1

    const geoChanged =
      geo &&
      session.firstGeo &&
      (
        geo.city !== session.firstGeo.city ||
        geo.region !== session.firstGeo.region ||
        geo.country_name !== session.firstGeo.country_name
      )

    const sharedDetected =
      ipChanged ||
      multipleIps ||
      multipleFingerprints ||
      geoChanged

    const webhookUrl = getWebhookUrl()

    // =========================
    // 🚫 KEY EXPIRADA
    // =========================
    if (expired) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '⛔ **KEY EXPIRADA (7 DIAS)** @everyone',
          embeds: [
            {
              title: '⏱️ KEY SEMANAL EXPIRADA',
              color: 15158332,
              fields: [
                { name: 'Key', value: `\`${key}\`` },
                { name: 'IP Atual', value: `\`${ip}\`` },
                {
                  name: 'Local Atual',
                  value: geo
                    ? `${geo.city ?? '??'}, ${geo.region ?? '??'} - ${geo.country_name ?? '??'}`
                    : 'Desconhecida'
                },
                {
                  name: 'Expirou em',
                  value: `<t:${Math.floor(expiresAt / 1000)}:F>`
                }
              ],
              footer: {
                text: new Date().toLocaleString('pt-BR')
              }
            }
          ]
        })
      })

      return NextResponse.json(
        { success: false, expired: true },
        { status: 403 }
      )
    }

    // =========================
    // 📡 WEBHOOK NORMAL / WARNING
    // =========================
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
              {
                name: 'Local Atual',
                value: geo
                  ? `${geo.city ?? '??'}, ${geo.region ?? '??'} - ${geo.country_name ?? '??'}`
                  : 'Desconhecida'
              },
              {
                name: 'Local Original',
                value: session.firstGeo
                  ? `${session.firstGeo.city ?? '??'}, ${session.firstGeo.region ?? '??'} - ${session.firstGeo.country_name ?? '??'}`
                  : 'Desconhecida'
              },
              { name: 'IPs únicos', value: `\`${session.ips.size}\`` },
              { name: 'Fingerprints únicos', value: `\`${session.fingerprints.size}\`` },
              {
                name: 'Expira em',
                value: `<t:${Math.floor(expiresAt / 1000)}:R>`
              },
              { name: 'User-Agent', value: userAgent }
            ],
            footer: {
              text: new Date().toLocaleString('pt-BR')
            }
          }
        ]
      })
    })

    return NextResponse.json({
      success: true,
      sharedDetected,
      expiresAt
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
