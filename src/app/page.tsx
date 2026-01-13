'use client'

import { useState, useEffect, useMemo } from 'react'

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

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

  const VALID_KEYS = useMemo(() => [
  "XXXX", "NUBANK-MOD", "256", "MAJESTIC-PRO", "CLISHA-091",
  "NU-FAST-01", "NU-FAST-02", "NU-FAST-03", "MAJ-PRO-X1", "MAJ-PRO-X2",
  "MAJ-PRO-X3", "SAFE-INJ-77", "SAFE-INJ-88", "SAFE-INJ-99", "VIP-BLOCK-0",
  "VIP-BLOCK-1", "VIP-BLOCK-2", "GOLD-NU-55", "SILVER-NU-44", "SHIELD-99",
  "SHIELD-88", "BZ-33-MOD", "BZ-44-MOD", "ACCESS-FULL", "MAJ-WEEK-01",
  "MAJ-WEEK-02", "MAJ-WEEK-03", "VIP-SENSE-10", "VIP-SENSE-20",
  "PRO-FLOW-77", "PRO-FLOW-88", "SHIELD-XP-01", "SHIELD-XP-02",
  "SHIELD-XP-03", "ACCESS-PREMIUM", "ULTRA-V1-MOD", "ULTRA-V2-MOD",
  "ALPHA-SHIELD-1", "ALPHA-SHIELD-2", "BETA-FLOW-X", "DELTA-VIP-99",
  "ZETA-PRO-55", "SIGMA-MOD-44", "FAST-TRACK-07", "FAST-TRACK-08",
  "GLOBAL-ACCESS-1", "GLOBAL-ACCESS-2", "ELITE-XP-500", "ELITE-XP-600",
  "MASTER-INJ-01", "MASTER-INJ-02", "FORCE-MOD-X", "TITAN-PRO-V9",
  "LEGEND-FAST-0",

  "PAINELVIP-A9F7Q2KX8M4ZP", "PAINELVIP-7MZ4Q8K2F9XP",
  "PAINELVIP-XP4F9M7Q2KZ8", "PAINELVIP-2K7Z9XPQ4M8F",
  "PAINELVIP-Q8FZK9M47XP2", "PAINELVIP-9XP7K4ZQ8M2F",
  "PAINELVIP-KF9M8XPZ247Q", "PAINELVIP-Z7Q4XP2K9M8F",
  "PAINELVIP-M9F7ZXP4K2Q8", "PAINELVIP-X2KZ9QF7M4P8",
  "PAINELVIP-4XP8M9QZK27F", "PAINELVIP-F7QXPZ4K8M92",
  "PAINELVIP-9KXPQ2M7F4Z8", "PAINELVIP-ZXP2F9M8QK47",
  "PAINELVIP-8M4QZKX9F7P2", "PAINELVIP-Q9XP4KZ8M27F",
  "PAINELVIP-K2XPZ9M7QF48", "PAINELVIP-7ZQXP4M8F2K9",
  "PAINELVIP-4K8XPZ7F9QM2", "PAINELVIP-MXP9QFZ27K84",
  "PAINELVIP-ZF9XPQ4K8M27", "PAINELVIP-2XP7Q9FZMK84",
  "PAINELVIP-QK4XPZ9M8F27", "PAINELVIP-8ZXPQ7M4K9F2",
  "PAINELVIP-7XPZQF4K9M28", "PAINELVIP-M4XP9ZKQF287",
  "PAINELVIP-QXP8Z4M2K9F7", "PAINELVIP-9ZXP7QF8MK24",
  "PAINELVIP-XP4MZ8F2QK97", "PAINELVIP-KXPZ9QF247M8",
  "PAINELVIP-8XPZK9QF42M7", "PAINELVIP-FXPQZK94M827",
  "PAINELVIP-9QXPZKM4F827", "PAINELVIP-XPZ9FQK47M28",
  "PAINELVIP-4XPZKQ9F728M", "PAINELVIP-QXP4Z9KMF827",
  "PAINELVIP-ZXP9F4KQ2M87", "PAINELVIP-XPZ7F9QK42M8",
  "PAINELVIP-KZXP9FQ8M247", "PAINELVIP-2XPQFZ9K47M8",
  "PAINELVIP-XPZ9QF2KM748", "PAINELVIP-FXPZKQ9472M8",
  "PAINELVIP-9XPZQF4K28M7", "PAINELVIP-9XPZKQF7M248A", "PAINELVIP-XPZQK9F472M8",
  "PAINELVIP-QXPZK9F4M728"
], []);


  useEffect(() => {
    const timer = setTimeout(() => setView('error'), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    if (VALID_KEYS.includes(password.toUpperCase())) setView('os')
    else alert("CHAVE INVÁLIDA")
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
