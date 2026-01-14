'use client'

import { useState, useEffect, useMemo } from 'react'

const NUBANK_LOGO =
  "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

export default function NubankVipSystem() {
  const [view, setView] = useState<'splash' | 'error' | 'login' | 'os' | 'panel'>('splash')
  const [password, setPassword] = useState('')
  const [selectedOs, setSelectedOs] = useState<'android' | 'ios'>('android')
  const [isInjecting, setIsInjecting] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showConsole, setShowConsole] = useState(false)

  const [opts, setOpts] = useState({
    assistLock: true,
    noRecoil: true,
    fpsBoost: false,
    precisionAim: false
  })

  // =========================
  // 🔑 KEYS (INALTERADAS)
  // =========================
   const VALID_KEYS = useMemo(() => [
    // --- ORIGINAIS & ESPECIAIS ---
    "PAINELVIP-Q9XP4KZ8M27F", "PAINELVIP-A9F7Q2KX8M4ZP", "NUBANK-MOD", "PAINELVIP-7Q9FZK2M8XP4A", "256", "MAJESTIC-PRO", "CLISHA-091", "ACCESS-FULL", "ACCESS-PREMIUM",
    "NU-FAST-01", "NU-FAST-02", "NU-FAST-03", "SAFE-INJ-77", "SAFE-INJ-88", "SAFE-INJ-99", "GOLD-NU-55", "SILVER-NU-44", "SHIELD-99", "SHIELD-88",

    // --- PAINEL VIP SERIES ---
    "PAINELVIP-7MZ4Q8K2F9XP", "PAINELVIP-M4ZQ7KXP9F82A", "PAINELVIP-ZXP2F9M8QK47", "PAINELVIP-XP4F9M7Q2KZ8", "PAINELVIP-X9KQFZ72MP48A", "PAINELVIP-2K7Z9XPQ4M8F", "PAINELVIP-2ZQ9XP7FKM48A",
    "PAINELVIP-Q8FZK9M47XP2", "PAINELVIP-QF7MZ9XP2K48A", "PAINELVIP-9XP7K4ZQ8M2F", "PAINELVIP-KF9M8XPZ247Q", "PAINELVIP-K9ZXPQF724M8A", "PAINELVIP-Z7Q4XP2K9M8F",
    "PAINELVIP-Z7XPQ9F2KM48A", "PAINELVIP-M9F7ZXP4K2Q8", "PAINELVIP-M9XPZQF7K248A", "PAINELVIP-X2KZ9QF7M4P8", "PAINELVIP-XZ9QF7M2KP48A", "PAINELVIP-4XP8M9QZK27F",
    "PAINELVIP-4XPZ9MFKQ728A", "PAINELVIP-F7QXPZ4K8M92", "PAINELVIP-F7QXPZ94KM28A", "PAINELVIP-9KXPQ27MFZ48A", "PAINELVIP-ZXP29FQKM748A", "PAINELVIP-8M4QZKXP9F72A",

    // --- VIP SHORT CODES ---
    "VIP-A9F7K2QX", "VIP-7M4ZQ8KP", "VIP-X9QF72MA", "VIP-K2XPZ9M7", "VIP-2K7Z9XPM", "VIP-7MZ4Q8KP", "VIP-Q8FZK947", "VIP-F7MZ92KP", "VIP-9XP7K4ZQ", "VIP-ZKQF724M", "VIP-KF9M8XPZ",
    "VIP-7Q4XP2K9", "VIP-M9F7ZXP4", "VIP-X2KZ9QF7", "VIP-XZ9QF72K", "VIP-F7QXPZ4K", "VIP-Q9XP4KZ8", "VIP-9KXPQ27M", "VIP-ZXP29FQK", "VIP-8M4QZKXP", "VIP-Q9XP4ZK8",

    // --- MAJESTIC & NUBANK LONG SERIES ---
    "MAJESTIC-Q9X2P4Z7K8M5F", "MAJESTIC-A1F9Q2KX3M7ZP", "MAJESTIC-7Q3FZK9M2XP1A", "MAJESTIC-M2ZQ9KXP4F72A", "NUBANK-A1F9Q2KX3M7ZP6L", "NUBANK-7Q3FZK9M2XP1A8D",
    "NUBANK-XP7F2M9Q3KZ1J4L", "NUBANK-X4KQFZ12MP98A5N", "NUBANK-Z9Q1XP4K2M7F8D2", "NUBANK-X9KZ1QF2M7P4L2K", "NUBANK-2K9Z3XPQ7M1F8B2", "NUBANK-2ZQ1XP9FKM78A6P", "NUBANK-Q1FZK7M27XP9R3T", "NUBANK-QF2MZ1XP9K38A4V",
    "NUBANK-1Q2W3E4R5T6Y7U8I9", "NUBANK-A1S2D3F4G5H6J7K8L", "NUBANK-7ZQXP1MF92K4D7H", "NUBANK-Z7QXP2F1K9M8B3D", "NUBANK-Z9X8C7V6B5N4M3Q2W", "NUBANK-Q1W2E3R4T5Y6U7I8O", "AUXILIOZICA-2K5M1Q8XP9", "NUBANK-L1K2J3H4G5F6D7S8A",

    // --- AUXILIO ZICA SERIES ---
    "AUXILIOZICA-1F9K2Q4M7X", "AUXILIOZICA-8ZP3M6K2QY", "AUXILIOZICA-5Q1K7M4XP9", "AUXILIOZICA-4Q7X2M9KP3", "AUXILIOZICA-9F2Z6M1Q8X", "AUXILIOZICA-2K8Q7M4XP9", "AUXILIOZICA-5M9X2Q8KF7",
    "AUXILIOZICA-7Q1M4K9XP2", "AUXILIOZICA-3Z7F2Q9MK6", "AUXILIOZICA-6P4X9K2QM8", "AUXILIOZICA-1M7Q3Z9KF5", "AUXILIOZICA-8K2M5Q7XP4", "AUXILIOZICA-4F9Z3M2QK6",
    "AUXILIOZICA-2Q8K7M1XP5", "AUXILIOZICA-9M4P2Q8KF3", "AUXILIOZICA-5Q7K9M2XP1", "AUXILIOZICA-4K9M5Q2XP6", "AUXILIOZICA-3Z2F8M4QK9", "AUXILIOZICA-7M1Q5K9XP8", "AUXILIOZICA-1K5Q9M3XP6",
     "AUXILIO-SENSI-K9F2Q-X7M110", "AUXILIO-SENSI-7M2QP-KF8110", "AUXILIO-SENSI-X4Q9M-2KF710", "AUXILIO-SENSI-P8M2K-Q9F710",
"AUXILIO-SENSI-Q7M4X-9K2F10", "AUXILIO-SENSI-2KQ9F-MX7810", "AUXILIO-SENSI-M8XQ4-KF2910", "AUXILIO-SENSI-F7KQM-2X8910",
"AUXILIO-SENSI-XM4K9-QF2710", "AUXILIO-SENSI-Q9K2X-MF7810", "AUXILIO-SENSI-4XKMF-Q2910", "AUXILIO-SENSI-KF9M2-XQ7810",

"AUXILIO-SENSI-9QMX4-K2F710", "AUXILIO-SENSI-2FQ7K-MX8910", "AUXILIO-SENSI-MQK94-X2F710", "AUXILIO-SENSI-X7F2M-QK9810",
"AUXILIO-SENSI-QM8X7-KF2910", "AUXILIO-SENSI-K2MXQ-9F7810", "AUXILIO-SENSI-7XQF4-MK2910", "AUXILIO-SENSI-MF9Q2-XK7810",
"AUXILIO-SENSI-QK7MX-2F9810", "AUXILIO-SENSI-X2F9M-QK7810", "AUXILIO-SENSI-K9MFX-Q2710", "AUXILIO-SENSI-4QXK2-MF7910",

"AUXILIO-SENSI-XQM29-KF4710", "AUXILIO-SENSI-7KFXQ-M2910", "AUXILIO-SENSI-Q4M9K-XF2710", "AUXILIO-SENSI-M2QF7-XK9810",
"AUXILIO-SENSI-KXQ94-MF2710", "AUXILIO-SENSI-FQ7X2-KM9810", "AUXILIO-SENSI-XF2KQ-M9710", "AUXILIO-SENSI-MK9Q4-XF2710",
"AUXILIO-SENSI-Q2XFM-K7910", "AUXILIO-SENSI-9MFXQ-K2710", "AUXILIO-SENSI-XQF7M-2K9810", "AUXILIO-SENSI-KQX29-MF4710",

"AUXILIO-SENSI-2XM9Q-KF710", "AUXILIO-SENSI-FKQX7-M2910", "AUXILIO-SENSI-QM2X9-KF4710", "AUXILIO-SENSI-X7QFM-K2910",
"AUXILIO-SENSI-MKQ9X-F2710", "AUXILIO-SENSI-QX7K2-MF9810", "AUXILIO-SENSI-F9XQM-K2710", "AUXILIO-SENSI-K2Q7X-MF9810"
  ], [])

  // =========================
  // 🧬 Fingerprint simples
  // =========================
  function getFingerprint() {
    if (typeof window === 'undefined') return 'server'
    return btoa(
      [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ].join('|')
    )
  }

  // =========================
  // 📡 Envia aviso (webhook)
  // =========================
  async function sendAuthLog(key: string) {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          fingerprint: getFingerprint()
        })
      })
    } catch {
      // não quebra login
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setView('error'), 5000)
    return () => clearTimeout(timer)
  }, [])

  // =========================
  // 🔐 LOGIN (inalterado visual)
  // =========================
  const handleLogin = async () => {
    const key = password.toUpperCase()
    if (!VALID_KEYS.includes(key)) {
      alert("CHAVE INVÁLIDA")
      return
    }

    await sendAuthLog(key)
    setView('os')
  }

  const startInjection = () => {
    setIsInjecting(true)
    setShowConsole(true)
    setLogs([])
    const sequence = ["Conectando ao Core...", "Bypass Anticheat...", "Sincronizando...", "FINALIZADO!"]
    sequence.forEach((t, i) => {
      setTimeout(() => {
        setLogs(p => [...p, t])
        if (i === 3) setTimeout(() => {
          window.location.href = selectedOs === 'android' ? "https://play.google.com/store/apps/details?id=com.dts.freefireth" : "https://apps.apple.com/br/app/free-fire/id1300146617"
        }, 1000)
      }, (i + 1) * 800)
    })
  }

  if (view === 'splash') return (
    <div className="fixed inset-0 bg-[#820AD1] flex flex-col items-center justify-center z-50">
      <img src={NUBANK_LOGO} className="w-24 object-contain" alt="Nubank" />
      <div className="mt-10 w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )

  if (view === 'error') return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-10 text-center z-40">
      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">!</div>
      <h2 className="text-zinc-900 text-xl font-bold mb-2">Ocorreu um erro</h2>
      <p className="text-zinc-500 text-sm">Tente novamente mais <span onClick={() => setView('login')} className="cursor-default">tarde</span>.</p>
      <button onClick={() => window.location.reload()} className="mt-8 px-10 py-3 bg-[#820AD1] text-white rounded-full font-bold text-xs uppercase">REENTRAR</button>
    </div>
  )

  if (view === 'login') return (
    <div className="fixed inset-0 bg-[#070707] flex flex-col p-8 z-30">
      <div className="mt-12 mb-12"><img src={NUBANK_LOGO} className="w-12" /></div>
      <h1 className="text-2xl font-bold text-white mb-2">Olá, VIP</h1>
      <input type="text" placeholder="CHAVE DE ACESSO" className="w-full bg-transparent border-b border-zinc-800 p-4 text-white outline-none uppercase" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-[#820AD1] text-white font-bold py-4 rounded-full mt-10 uppercase text-xs">AUTENTICAR</button>
    </div>
  )

  if (view === 'os') return (
    <div className="fixed inset-0 bg-[#070707] flex flex-col justify-center p-8 z-25">
      <div className="space-y-4">
        <button onClick={() => { setSelectedOs('android'); setView('panel'); }} className="w-full bg-[#111] p-6 rounded-2xl flex justify-between text-white font-bold"><span>Android</span><span>→</span></button>
        <button onClick={() => { setSelectedOs('ios'); setView('panel'); }} className="w-full bg-[#111] p-6 rounded-2xl flex justify-between text-white font-bold"><span>iOS</span><span>→</span></button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black flex flex-col text-white z-20 overflow-y-auto">
      <header className="p-6 border-b border-zinc-900 flex justify-between items-center">
        <img src={NUBANK_LOGO} className="w-10" />
        <span className="text-[10px] bg-[#820AD1]/20 text-[#a33df5] px-3 py-1 rounded-full font-bold">{selectedOs.toUpperCase()}</span>
      </header>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Configurações <span className="text-[#820AD1]">Pro</span></h2>
        <div className="space-y-4">
          {Object.keys(opts).map((key) => (
            <div key={key} onClick={() => setOpts(p => ({...p, [key]: !p[key as keyof typeof opts]}))} className="bg-[#111] p-5 rounded-2xl border border-zinc-900 flex justify-between items-center transition-all">
              <span className="text-sm font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className={`w-6 h-6 rounded-md border-2 ${opts[key as keyof typeof opts] ? 'bg-[#820AD1] border-[#820AD1]' : 'border-zinc-800'}`}>{opts[key as keyof typeof opts] && "✓"}</div>
            </div>
          ))}
        </div>
        <button onClick={startInjection} disabled={isInjecting} className="w-full bg-[#820AD1] text-white font-bold py-5 rounded-3xl mt-10 text-xs uppercase">{isInjecting ? 'INJETANDO...' : 'INJETAR NO DISPOSITIVO'}</button>
        {showConsole && <div className="mt-6 bg-[#0a0a0a] p-4 font-mono text-[9px] text-zinc-500 rounded-xl">{logs.map((l, i) => <div key={i}># {l}</div>)}</div>}
      </div>
    </div>
  )
}
