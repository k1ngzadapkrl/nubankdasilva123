import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { key, fingerprint } = body

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown'

    const userAgent = req.headers.get('user-agent') || 'unknown'

    const webhookUrl = "https://discord.com/api/webhooks/1398843508525240433/SyW660--JdYoM5LSIYR_21BEOjpnu8rgzp1n6ZeAuve1kQFdaVHdhPyW49gajDwF4cQH"

    const message = {
      content: null,
      embeds: [
        {
          title: "🔐 LOGIN COM KEY",
          color: 3447003,
          fields: [
            { name: "Key", value: `\`${key}\`` },
            { name: "Fingerprint", value: `\`${fingerprint}\`` },
            { name: "IP", value: `\`${ip}\`` },
            { name: "User-Agent", value: userAgent }
          ],
          footer: {
            text: new Date().toLocaleString("pt-BR")
          }
        }
      ]
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
