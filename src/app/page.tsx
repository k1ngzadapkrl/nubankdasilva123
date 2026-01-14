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
    "PAINELVIP-Q9XP4KZ8M27F",
    "PAINELVIP-A9F7Q2KX8M4ZP",
    "NUBANK-MOD",
    "PAINELVIP-7Q9FZK2M8XP4A",
    "256",
    "MAJESTIC-PRO",
    "PAINELVIP-7MZ4Q8K2F9XP",
    "CLISHA-091",
    "PAINELVIP-M4ZQ7KXP9F82A",
    "NU-FAST-01",
    "PAINELVIP-XP4F9M7Q2KZ8",
    "NU-FAST-02",
    "PAINELVIP-X9KQFZ72MP48A",
    "NU-FAST-03",
    "MAJ-PRO-X1",
    "PAINELVIP-2K7Z9XPQ4M8F",
    "MAJ-PRO-X2",
    "PAINELVIP-2ZQ9XP7FKM48A",
    "MAJ-PRO-X3",
    "SAFE-INJ-77",
    "PAINELVIP-Q8FZK9M47XP2",
    "SAFE-INJ-88",
    "PAINELVIP-QF7MZ9XP2K48A",
    "SAFE-INJ-99",
    "VIP-BLOCK-0",
    "PAINELVIP-9XP7K4ZQ8M2F",
    "VIP-BLOCK-1",
    
    "VIP-BLOCK-2",
    "GOLD-NU-55",
    "PAINELVIP-KF9M8XPZ247Q",
    "SILVER-NU-44",
    "PAINELVIP-K9ZXPQF724M8A",
    "SHIELD-99",
    "SHIELD-88",
    "PAINELVIP-Z7Q4XP2K9M8F",
    "BZ-33-MOD",
    "PAINELVIP-Z7XPQ9F2KM48A",
    "BZ-44-MOD",
    "ACCESS-FULL",
    "PAINELVIP-M9F7ZXP4K2Q8",
    "MAJ-WEEK-01",
    "PAINELVIP-M9XPZQF7K248A",
    "MAJ-WEEK-02",
    "MAJ-WEEK-03",
    "PAINELVIP-X2KZ9QF7M4P8",
    "VIP-SENSE-10",
    "PAINELVIP-XZ9QF7M2KP48A",
    "VIP-SENSE-20",
    "PRO-FLOW-77",
    "PAINELVIP-4XP8M9QZK27F",
    "PRO-FLOW-88",
    "SHIELD-XP-01",
    "PAINELVIP-4XPZ9MFKQ728A",
    "SHIELD-XP-02",
    "SHIELD-XP-03",
    "PAINELVIP-F7QXPZ4K8M92",
    "ACCESS-PREMIUM",
    "ULTRA-V1-MOD",
    "PAINELVIP-F7QXPZ94KM28A",
    "ULTRA-V2-MOD",
    "ALPHA-SHIELD-1",
    "PAINELVIP-9KXPQ27MFZ48A",
    "ALPHA-SHIELD-2",
    "BETA-FLOW-X",
    "PAINELVIP-ZXP29FQKM748A",
    "DELTA-VIP-99",
    "ZETA-PRO-55",
    "PAINELVIP-8M4QZKXP9F72A",
    "SIGMA-MOD-44",
    "FAST-TRACK-07",
    "PAINELVIP-Q9XP4ZK8MF72A",
    "FAST-TRACK-08",
    "GLOBAL-ACCESS-1",
    "PAINELVIP-K2XPZ9M7QF48A",
    "GLOBAL-ACCESS-2",
    "ELITE-XP-500",
    "PAINELVIP-7ZQXP4MF82K9A",
    "ELITE-XP-600",
    "MASTER-INJ-01",
    "PAINELVIP-4K8XPZ7FQ9M2A",
    "MASTER-INJ-02",
    "FORCE-MOD-X",
    
    "TITAN-PRO-V9",
    "LEGEND-FAST-0",
    "PAINELVIP-ZF9XPQ48KM27A",
    "PAINELVIP-2XP7Q9FZK48MA",
    "PAINELVIP-QK4XPZ9MF827A",
    "PAINELVIP-8ZXPQ7M4K9F2A",
    "PAINELVIP-7XPZQF4K9M28A",
    "PAINELVIP-M4XP9ZKQF287A",
    "PAINELVIP-QXP8Z4M2K9F7A",
    "PAINELVIP-9ZXP7QF8MK24A",
    "PAINELVIP-XP4MZ8F2QK97A",
    "PAINELVIP-KXPZ9QF247M8A",
    "PAINELVIP-9KXPQ2M7F4Z8",
    "PAINELVIP-9ZXP7QF8MK24",
    "PAINELVIP-ZXP2F9M8QK47",
    "VIP-A9F7K2QX",
    "VIP-7MZ4Q8KP",
    "VIP-XP4F9M7Q",
    "VIP-2K7Z9XPQ",
    "VIP-Q8FZK947",
    "VIP-9XP7K4ZQ",
    "VIP-KF9M8XPZ",
    "VIP-Z7Q4XP2K",
    
  
    "VIP-4XP8M9QZ",
    "VIP-9KXPQ2M7",
    "VIP-ZXP2F9M8",
    "VIP-8M4QZKX9",
    "VIP-Q9XP4KZ8",
    "VIP-K2XPZ9M7",
    "VIP-7ZQXP4M8",
    "VIP-4K8XPZ7F",
    "VIP-MXP9QFZ2",
    "VIP-ZF9XPQ4K",
    
    "VIP-QK4XPZ9M",
    "VIP-8ZXPQ7M4",
    "VIP-7XPZQF4K",
    "VIP-M4XP9ZKQ",
    "VIP-QXP8Z4M2",
    "VIP-9ZXP7QF8",
    "VIP-XP4MZ8F2",
    "VIP-KXPZ9QF2",
    "VIP-A9F7K2QX",
"VIP-7M4ZQ8KP",
"VIP-X9QF72MA",
"VIP-2K7Z9XPM",
"VIP-Q8FZK947",
"VIP-F7MZ92KP",
"VIP-9XP7K4ZQ",
"VIP-ZKQF724M",
"VIP-KF9M8XPZ",
"VIP-7Q4XP2K9",
"VIP-M9F7ZXP4",
"VIP-X2KZ9QF7",
"VIP-XZ9QF72K",
"VIP-4XP8M9QZ",
"VIP-F7QXPZ4K",
"VIP-9KXPQ27M",
"VIP-ZXP29FQK",
"VIP-8M4QZKXP",
"VIP-Q9XP4ZK8",
"VIP-K2XPZ9M7",
"VIP-7ZQXP4MF",
"VIP-4K8XPZ7F",
"VIP-MXP9QFZ2",
"VIP-ZF9XPQ48",
"VIP-2XP7Q9FZ",
"VIP-QK4XPZ9M",
"VIP-8ZXPQ7M4",
"VIP-7XPZQF4K",
"VIP-M4XP9ZKQ",
"VIP-QXP8Z4M2",
    "MAJESTIC-Q9X2P4Z7K8M5F",
    "MAJESTIC-A1F9Q2KX3M7ZP",
    "MAJESTIC-7Q3FZK9M2XP1A",
    "MAJESTIC-7MZ1Q4K8F2XP9",
    "MAJESTIC-M2ZQ9KXP4F72A",
    "MAJESTIC-XP7F2M9Q3KZ1",
    "MAJESTIC-X4KQFZ12MP98A",
    "MAJESTIC-2K9Z3XPQ7M1F",
    "MAJESTIC-2ZQ1XP9FKM78A",
    "MAJESTIC-Q1FZK7M27XP9",
    "MAJESTIC-QF2MZ1XP9K38A",
    "MAJESTIC-9XP2K7ZQ1M4F",
    "MAJESTIC-KF1M7XPZ942Q",
    "MAJESTIC-K2ZXPQF124M9A",
    "MAJESTIC-Z9Q1XP4K2M7F",
    "MAJESTIC-Z2XPQ1F9KM38A",
    "MAJESTIC-M1F9ZXP2K4Q7",
    "MAJESTIC-M2XPZQF1K948A",
    "MAJESTIC-X9KZ1QF2M7P4",
    "MAJESTIC-XZ2QF1M9KP38A",
    "MAJESTIC-4XP1M2QZK97F",
    "MAJESTIC-4XPZ1MFKQ928A",
    "MAJESTIC-F2QXPZ1K7M94",
    "MAJESTIC-F9QXPZ24KM18A",
    "MAJESTIC-9KXPQ17MFZ28A",
    "MAJESTIC-ZXP19FQKM248A",
    "MAJESTIC-8M1QZKXP2F92A",
    "MAJESTIC-Q2XP9ZK8MF12A",
    "MAJESTIC-K1XPZ2M9QF38A",
    "NUBANK-A1F9Q2KX3M7ZP6L",
"NUBANK-7Q3FZK9M2XP1A8D",
"NUBANK-7MZ1Q4K8F2XP9C3",
"NUBANK-M2ZQ9KXP4F72AGH",
"NUBANK-XP7F2M9Q3KZ1J4L",
"NUBANK-X4KQFZ12MP98A5N",
"NUBANK-2K9Z3XPQ7M1F8B2",
"NUBANK-2ZQ1XP9FKM78A6P",
"NUBANK-Q1FZK7M27XP9R3T",
"NUBANK-QF2MZ1XP9K38A4V",
"NUBANK-9XP2K7ZQ1M4F5X9",
"NUBANK-KF1M7XPZ942Q6L1",
"NUBANK-K2ZXPQF124M9A7C",
"NUBANK-Z9Q1XP4K2M7F8D2",
"NUBANK-Z2XPQ1F9KM38A9F",
"NUBANK-M1F9ZXP2K4Q7G3H",
"NUBANK-M2XPZQF1K948A6J",
"NUBANK-X9KZ1QF2M7P4L2K",
"NUBANK-XZ2QF1M9KP38A5N",
"NUBANK-4XP1M2QZK97F8M1",
"NUBANK-4XPZ1MFKQ928A3B",
"NUBANK-F2QXPZ1K7M944C8",
"NUBANK-F9QXPZ24KM18A2D",
"NUBANK-9KXPQ17MFZ28A5E",
"NUBANK-ZXP19FQKM248A6G",
"NUBANK-8M1QZKXP2F92A7H",
"NUBANK-Q2XP9ZK8MF12A4J",
"NUBANK-K1XPZ2M9QF38A8K",
"NUBANK-7ZQXP1MF92K4A5L",
"NUBANK-A8Q1ZKXP3M7F9B2",
"NUBANK-M9XPZQF1K28A6C3",
"NUBANK-X2KQFZ1M7P4A5D8",
"NUBANK-Q7XP1M9ZK2F3G6H",
"NUBANK-F1KZ2QXP9M4L7J5",
"NUBANK-3XPQ1M2F9K8Z4C6",
"NUBANK-Z7QXP2F1K9M8B3D",
"NUBANK-5M1QZKXP2F9A7E4",
"NUBANK-Q8XP9ZK3MF12B5F",
"NUBANK-K9XPZ2M1QF38C6G",
"NUBANK-7ZQXP1MF92K4D7H",
"NUBANK-A2QXP9M7KF4Z1L5",
"NUBANK-M8XPZQF2K9A3C7J",
"NUBANK-X1KZQF9M2P4H6N8",
"NUBANK-Q5XP1M7ZK3F2B9D",
"NUBANK-F2KQXP4M9Z1C6G3",
"NUBANK-6XPQZ1KF9M2A7H5",
"NUBANK-Z4QXP3M1KF8L6B2",
"NUBANK-9M1QZKXP2F4A8C7",
"NUBANK-Q3XP7ZK9MF12D6E",
"NUBANK-K2XPZ1M4QF38B5G",
"NUBANK-7ZQXP1MF92K4C8H",
    "MAJESTIC-7ZQXP1MF92K4A"
    
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
