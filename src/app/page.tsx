'use client'

import { useState, useEffect, useMemo } from 'react'

const NUBANK_ICON = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/1200px-Nubank_logo_2021.svg.png"

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
    "MAJ-WEEK-02", "MAJ-WEEK-03", "VIP-SENSE-10", "VIP-SENSE-20", "PRO-FLOW-77",
    "PRO-FLOW-88", "SHIELD-XP-01", "SHIELD-XP-02", "SHIELD-XP-03", "ACCESS-PREMIUM",
    "ULTRA-V1-MOD", "ULTRA-V2-MOD", "ALPHA-SHIELD-1", "ALPHA-SHIELD-2",
    "BETA-FLOW-X", "DELTA-VIP-99", "ZETA-PRO-55", "SIGMA-MOD-44", "FAST-TRACK-07",
    "FAST-TRACK-08", "GLOBAL-ACCESS-1", "GLOBAL-ACCESS-2", "ELITE-XP-500",
    "ELITE-XP-600", "MASTER-INJ-01", "MASTER-INJ-02", "FORCE-MOD-X",
    "TITAN-PRO-V9", "LEGEND-FAST-0",
    "PAINELVIP-A9F7Q2KX8M4ZP", "PAINELVIP-7MZ4Q8K2F9XP", "PAINELVIP-XP4F9M7Q2KZ8",
    "PAINELVIP-2K7Z9XPQ4M8F", "PAINELVIP-Q8FZK9M47XP2", "PAINELVIP-9XP7K4ZQ8M2F",
    "PAINELVIP-KF9M8XPZ247Q", "PAINELVIP-Z7Q4XP2K9M8F", "PAINELVIP-M9F7ZXP4K2Q8",
    "PAINELVIP-X2KZ9QF7M4P8", "PAINELVIP-4XP8M9QZK27F", "PAINELVIP-F7QXPZ4K8M92",
    "PAINELVIP-9KXPQ2M7F4Z8", "PAINELVIP-ZXP2F9M8QK47", "PAINELVIP-8M4QZKX9F7P2",
    "PAINELVIP-Q9XP4KZ8M27F", "PAINELVIP-K2XPZ9M7QF48", "PAINELVIP-7ZQXP4M8F2K9",
    "PAINELVIP-4K8XPZ7F9QM2", "PAINELVIP-MXP9QFZ27K84", "PAINELVIP-ZF9XPQ4K8M27",
    "PAINELVIP-2XP7Q9FZMK84", "PAINELVIP-QK4XPZ9M8F27", "PAINELVIP-8ZXPQ7M4K9F2",
    "PAINELVIP-7XPZQF4K9M28", "PAINELVIP-M4XP9ZKQF287", "PAINELVIP-QXP8Z4M2K9F7",
    "PAINELVIP-9ZXP7QF8MK24", "PAINELVIP-XP4MZ8F2QK97", "PAINELVIP-KXPZ9QF247M8",
    "PAINELVIP-8XPZK9QF42M7", "PAINELVIP-FXPQZK94M827", "PAINELVIP-9QXPZKM4F827",
    "PAINELVIP-XPZ9FQK47M28", "PAINELVIP-4XPZKQ9F728M", "PAINELVIP-QXP4Z9KMF827",
    "PAINELVIP-ZXP9F4KQ2M87", "PAINELVIP-XPZ7F9QK42M8", "PAINELVIP-KZXP9FQ8M247",
    "PAINELVIP-2XPQFZ9K47M8", "PAINELVIP-XPZ9QF2KM748", "PAINELVIP-FXPZKQ9472M8",
    "PAINELVIP-9XPZQF4K28M7", "PAINELVIP-XPZQK9F472M8", "PAINELVIP-QXPZK9F4M728"
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setView('error'), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    if (VALID_KEYS.includes(password.toUpperCase())) {
      setView('os')
    } else {
      alert("CHAVE DE ACESSO INVÁLIDA")
    }
  }

  const startInjection = () => {
    setIsInjecting(true)
    setShowConsole(true)
    setLogs([])

    const sequence = [
      `Iniciando Kernel ${selectedOs.toUpperCase()}...`,
      "Limpando caches de sistema...",
      "Bypass Anticheat v4.1: ATIVADO",
      "Sincronizando configurações VIP...",
      "INJEÇÃO CONCLUÍDA!"
    ]

    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
        if (i === sequence.length - 1) {
          setTimeout(() => {
            const link = selectedOs === 'android' 
              ? "https://play.google.com/store/apps/details?id=com.dts.freefireth" 
              : "https://apps.apple.com/br/app/free-fire/id1300146617"
            window.location.href = link
          }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  // 1. SPLASH
  if (view === 'splash') {
    return (
      <div className="fixed inset-0 bg-[#820AD1] flex flex-col items-center justify-center z-50">
        <img src={NUBANK_ICON} className="w-20 invert brightness-0 animate-pulse" alt="Nubank" />
        <div className="mt-8 w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // 2. ERROR DISGUISE
  if (view === 'error') {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-10 text-center z-40">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-zinc-400 text-3xl font-light italic">!</span>
        </div>
        <h2 className="text-zinc-900 text-xl font-bold mb-2">Ocorreu um erro</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Não foi possível carregar as informações. Por favor, tente novamente mais <span onClick={() => setView('login')} className="cursor-default select-none">tarde</span>.
        </p>
        <button onClick={() => window.location.reload()} className="mt-8 px-10 py-3 bg-[#820AD1] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">REENTRAR</button>
      </div>
    )
  }

  // 3. LOGIN NUBANK
  if (view === 'login') {
    return (
      <div className="fixed inset-0 bg-[#070707] flex flex-col p-8 z-30 animate-in fade-in duration-500">
        <div className="mt-12 mb-12"><img src={NUBANK_ICON} className="w-12" alt="Nubank" /></div>
        <h1 className="text-2xl font-bold text-white mb-2">Olá, VIP</h1>
        <p className="text-zinc-500 text-sm mb-10">Autentique-se para acessar o painel de finanças seguro.</p>
        <input 
          type="text" placeholder="CHAVE DE ACESSO" 
          className="w-full bg-transparent border-b border-zinc-800 p-4 text-white outline-none font-mono tracking-widest uppercase focus:border-[#820AD1]"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-[#820AD1] text-white font-bold py-4 rounded-full mt-10 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-xl">AUTENTICAR</button>
      </div>
    )
  }

  // 4. OS SELECTION
  if (view === 'os') {
    return (
      <div className="fixed inset-0 bg-[#070707] flex flex-col justify-center p-8 z-25 animate-in slide-in-from-bottom-10">
        <h2 className="text-white text-xs font-black mb-8 text-center uppercase tracking-[0.4em] text-zinc-400">Ambiente de Operação</h2>
        <div className="space-y-4 font-bold uppercase tracking-widest text-[11px]">
          <button onClick={() => { setSelectedOs('android'); setView('panel'); }} className="w-full bg-[#111] border border-zinc-800 p-6 rounded-2xl flex justify-between items-center active:bg-zinc-800 transition-all text-white">
            <span>Android Core</span><span className="text-[#820AD1]">→</span>
          </button>
          <button onClick={() => { setSelectedOs('ios'); setView('panel'); }} className="w-full bg-[#111] border border-zinc-800 p-6 rounded-2xl flex justify-between items-center active:bg-zinc-800 transition-all text-white">
            <span>iOS System</span><span className="text-[#820AD1]">→</span>
          </button>
        </div>
      </div>
    )
  }

  // 5. PAINEL VIP
  return (
    <div className="fixed inset-0 bg-black flex flex-col text-white z-20 overflow-y-auto animate-in fade-in">
      <header className="p-6 flex justify-between items-center border-b border-zinc-900">
        <img src={NUBANK_ICON} className="w-10" alt="Nubank" />
        <div className="bg-[#820AD1]/20 text-[#a33df5] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#820AD1]/30">
          {selectedOs.toUpperCase()} ACTIVE
        </div>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 italic tracking-tight uppercase">Painel <span className="text-[#820AD1]">VIP</span></h2>
        
        <div className="space-y-4">
          {[
            { id: 'assistLock', label: 'Assist lock (safe)', sub: 'Trava de mira suave' },
            { id: 'noRecoil', label: 'No recoil 35% (safe)', sub: 'Redução de recuo estável' },
            { id: 'fpsBoost', label: 'Fps Boost 120Hz', sub: 'Otimização de hardware' },
            { id: 'precisionAim', label: 'Precision AIM', sub: 'Precisão longa distância' }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => setOpts(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof prev]}))}
              className="bg-[#111111] p-5 rounded-2xl border border-zinc-900 flex items-center justify-between active:bg-[#1a1a1a] transition-all"
            >
              <div>
                <p className="text-sm font-bold text-zinc-100">{item.label}</p>
                <p className="text-[9px] text-zinc-600 uppercase font-black">{item.sub}</p>
              </div>
              <div className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${opts[item.id as keyof typeof opts] ? 'bg-[#820AD1] border-[#820AD1]' : 'border-zinc-800'}`}>
                {opts[item.id as keyof typeof opts] && <span className="text-white text-[10px]">✓</span>}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={startInjection}
          disabled={isInjecting}
          className={`w-full ${isInjecting ? 'bg-zinc-800' : 'bg-[#820AD1] shadow-[0_10px_30px_rgba(130,10,209,0.3)]'} text-white font-bold py-5 rounded-3xl mt-10 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]`}
        >
          {isInjecting ? 'INJETANDO...' : 'INJETAR NO DISPOSITIVO'}
        </button>

        {showConsole && (
          <div className="mt-6 bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-4 font-mono text-[9px] text-zinc-500 min-h-32">
            {logs.map((log, i) => (
              <div key={i} className="mb-1 animate-in slide-in-from-left-2">
                <span className="text-[#820AD1] mr-2">#</span>{log}
              </div>
            ))}
          </div>
        )}
        
        <p className="text-center text-[10px] text-zinc-700 mt-12 uppercase tracking-[0.4em] font-black pb-10">Nubank Security v4.1</p>
      </div>
    </div>
  )
}
