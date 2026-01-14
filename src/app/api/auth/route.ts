import { NextResponse } from 'next/server'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000
const FAST_IP_CHANGE_MS = 5 * 60 * 1000 // 5 minutos
const BLOCK_SCORE = 70

type KeySession = {
  ips: Set<string>
  fingerprints: Set<string>
  firstIp: string
  firstSeen: number
  lastSeen: number
  lastIp: string
}

const keySessions = new Map<string, KeySession>()

function getWebhookUrl() {
  const b64 = process.env.DISCORD_WEBHOOK_B64
  if (!b64) throw new Error('WEBHOOK NÃO CONFIGURADA')
  return Buffer.from(b64, 'base64').toString('utf-8')
}

function getClientIp(req: Request) {
  const xff = req.headers.get('x-forwarded-for')
  return xff ? xff.split(',')[0].trim() : 'unknown'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { key, fingerprint } = body

    const ip = getClientIp(req)
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const now = Date.now()

    if (!key || !fingerprint) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // =========================
    // 🧠 REGISTRO DA KEY
    // =========================
    if (!keySessions.has(key)) {
      keySessions.set(key, {
        ips: new Set([ip]),
        fingerprints: new Set([fingerprint]),
        firstIp: ip,
        firstSeen: now,
        lastSeen: now,
        lastIp: ip
      })
    }

    const session = keySessions.get(key)!
    const expiresAt = session.firstSeen + WEEK_MS
    const expired = now > expiresAt

    // =========================
    // 🚫 KEY EXPIRADA
    // =========================
    if (expired) {
      await fetch(getWebhookUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '⛔ **KEY EXPIRADA (7 DIAS)** @everyone',
          embeds: [
            {
              title: '⏱️ KEY EXPIRADA',
              color: 15158332,
              fields: [
                { name: 'Key', value: `\`${key}\`` },
                { name: 'IP', value: `\`${ip}\`` }
              ]
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
    // 🔎 DETECÇÃO AVANÇADA
    // =========================
    let score = 0
    const reasons: string[] = []

    const ipChanged = ip !== session.firstIp
    const fingerprintChanged = !session.fingerprints.has(fingerprint)
    const fastIpChange =
      session.lastIp !== ip &&
      now - session.lastSeen < FAST_IP_CHANGE_MS

    if (fingerprintChanged) {
      score += 40
      reasons.push('Fingerprint diferente')
    }

    if (ipChanged) {
      score += 30
      reasons.push('IP diferente do original')
    }

    if (fastIpChange) {
      score += 30
      reasons.push('Troca rápida de IP (<5 min)')
    }

    if (session.ips.size >= 2) {
      score += 20
      reasons.push('Múltiplos IPs')
    }

    const blocked = score >= BLOCK_SCORE

    // =========================
    // 🧾 ATUALIZA SESSÃO
    // =========================
    session.ips.add(ip)
    session.fingerprints.add(fingerprint)
    session.lastSeen = now
    session.lastIp = ip

    // =========================
    // 📡 WEBHOOK
    // =========================
    await fetch(getWebhookUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: blocked
          ? '🚨 **KEY BLOQUEADA – COMPARTILHAMENTO CONFIRMADO** @everyone'
          : score >= 40
          ? '⚠️ **ATIVIDADE SUSPEITA DETECTADA**'
          : null,
        embeds: [
          {
            title: blocked
              ? '⛔ BLOQUEIO AUTOMÁTICO'
              : score >= 40
              ? '⚠️ WARNING'
              : '🔐 LOGIN COM KEY',
            color: blocked ? 15158332 : score >= 40 ? 16705372 : 3447003,
            fields: [
              { name: 'Key', value: `\`${key}\`` },
              { name: 'IP Atual', value: `\`${ip}\`` },
              { name: 'IP Original', value: `\`${session.firstIp}\`` },
              { name: 'IPs únicos', value: `${session.ips.size}` },
              { name: 'Fingerprints únicos', value: `${session.fingerprints.size}` },
              { name: 'Score de Risco', value: `${score}/100` },
              {
                name: 'Motivos',
                value: reasons.length ? reasons.join(', ') : 'Nenhum'
              },
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

    if (blocked) {
      return NextResponse.json(
        { success: false, blocked: true },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      score,
      expiresAt
    })
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
