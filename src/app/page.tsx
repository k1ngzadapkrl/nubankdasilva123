'use client'

import { useState, useMemo } from 'react'

// URL DO ÍCONE QUE VOCÊ ENVIOU
const ICON_URL = "https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg"

export default function AimAssistElite() {
  const [step, setStep] = useState<'login' | 'os' | 'panel'>('login')
  const [password, setPassword] = useState('')
  const [os, setOs] = useState<'android' | 'ios'>('android')
  const [senseType, setSenseType] = useState<'baixa' | 'alta'>('alta')
  const [isInjecting, setIsInjecting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState(['> KERNEL_READY', '> ENCRYPTION: AES-256'])

  const [sensi, setSensi] = useState({ dpi: 600, geral: 95, redDot: 85 })
  const [opts, setOpts] = useState({ antiShake: true, noRecoil: true, headLimit: true })

  const VALID_KEYS = useMemo(() => [
    "xxxx", "NUBANK-MOD", "256", "MAJESTIC-PRO", "CLISHA-091", 
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
    "TITAN-PRO-V9", "LEGEND-FAST-0"
  ], []);

  const handleLogin = () => {
    if (VALID_KEYS.includes(password.trim().toUpperCase())) {
      setStep('os')
    } else {
      alert('KEY INVÁLIDA!')
    }
  }

  const generateSensi = () => {
    if (senseType === 'baixa') {
      setSensi({
        dpi: Math.floor(Math.random() * (600 - 400) + 400),
        geral: Math.floor(Math.random() * (70 - 50) + 50),
        redDot: Math.floor(Math.random() * (65 - 45) + 45)
      })
    } else {
      setSensi({
        dpi: Math.floor(Math.random() * (1200 - 800) + 800),
        geral: Math.floor(Math.random() * (150 - 80) + 80),
        redDot: Math.floor(Math.random() * (98 - 85) + 85)
      })
    }
    setLogs(prev => [...prev, `> Nova Sensibilidade ${senseType.toUpperCase()} Gerada`])
  }

  const handleInject = () => {
    setIsInjecting(true)
    setProgress(0)
    const sequence = [
      `> Detectando core ${os.toUpperCase()}...`,
      "> Calibrando Anti-Shake...",
      "> NoRecoil 35% aplicado...",
      "> INJEÇÃO CONCLUÍDA!"
    ]
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
        setProgress((i + 1) * 25)
        if (i === sequence.length - 1) {
          setIsInjecting(false)
          setTimeout(() => { 
            const link = os === 'android' 
              ? "https://play.google.com/store/apps/details?id=com.dts.freefireth" 
              : "https://apps.apple.com/br/app/free-fire/id1300146617"
            window.location.href = link 
          }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  return (
<div className="fixed inset-0 bg-[#070707] text-zinc-100 font-mono overflow-hidden select-none">
      
      {/* --- CONFIGURAÇÃO DO ÍCONE E PWA NO HEAD --- */}
     <head>
  <title>ROUPAS CHECK</title>
  <meta name="theme-color" content="#070707" />
  <link rel="manifest" href="/manifest.json" />
  
  {/* Configurações para iPhone reconhecer o ícone e nome */}
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="ROUPAS CHECK" />
  <link rel="apple-touch-icon" href="https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg" />
</head>

      {step === 'login' && (
        <div className="flex flex-col h-full items-center justify-center p-8 animate-in fade-in">
          {/* O ÍCONE QUE VOCÊ MANDOU APLICADO NA TELA DE LOGIN */}
          <div className="w-24 h-24 mb-6 rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
             <img src={ICON_URL} alt="Icon" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-black italic mb-1 tracking-tighter uppercase">Painel <span className="text-blue-600">VIP</span></h1>
          <p className="text-[8px] text-zinc-600 mb-10 tracking-[0.5em] uppercase font-bold text-center">Injeção de Sensibilidade e Auxílio</p>
          
          <input 
            type="text" placeholder="DIGITE SUA KEY" 
            className="w-full bg-[#111] border border-white/5 p-5 rounded-2xl mb-4 text-center font-bold tracking-widest outline-none focus:border-blue-600/50 uppercase"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em]">Entrar no Sistema</button>
        </div>
      )}

      {step === 'os' && (
        <div className="flex flex-col h-full justify-center px-8 animate-in slide-in-from-bottom-10">
          <h2 className="text-[10px] font-black mb-8 text-center uppercase tracking-[0.5em] text-zinc-500">Escolha seu Sistema</h2>
          <div className="space-y-4">
            <button onClick={() => { setOs('android'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] flex justify-between items-center group active:scale-95 transition-all">
              <span className="font-black italic uppercase tracking-widest text-xs">Android Core</span>
              <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => { setOs('ios'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] flex justify-between items-center group active:scale-95 transition-all">
              <span className="font-black italic uppercase tracking-widest text-xs">iOS System</span>
              <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      )}

      {step === 'panel' && (
        <div className="flex flex-col h-full pt-12 px-6 animate-in fade-in">
          <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
               <img src={ICON_URL} className="w-6 h-6 rounded-md object-cover" />
               <h1 className="text-[10px] font-black italic text-zinc-400 uppercase">Aim Assist <span className="text-blue-600">{os}</span></h1>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          </header>

          <div className="bg-[#111] p-2 rounded-2xl border border-white/5 mb-4 flex">
            <button onClick={() => setSenseType('baixa')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${senseType === 'baixa' ? 'bg-blue-600 text-white' : 'text-zinc-600'}`}>Sense Baixa</button>
            <button onClick={() => setSenseType('alta')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all ${senseType === 'alta' ? 'bg-blue-600 text-white' : 'text-zinc-600'}`}>Sense Alta</button>
          </div>

          <div className="bg-[#111] p-5 rounded-3xl border border-white/5 mb-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Calculadora Sensi</span>
              <button onClick={generateSensi} className="text-[8px] bg-white text-black px-3 py-1 rounded-lg font-black uppercase">Gerar</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[7px] text-zinc-600 mb-1">DPI</p>
                <p className="text-xs font-black text-blue-500">{sensi.dpi}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[7px] text-zinc-600 mb-1">GERAL</p>
                <p className="text-xs font-black text-blue-500">{sensi.geral}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[7px] text-zinc-600 mb-1">RED DOT</p>
                <p className="text-xs font-black text-blue-500">{sensi.redDot}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111] p-6 rounded-[2.5rem] border border-white/5 mb-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-tight">Anti-Shake Mira</span>
              <span className="text-[9px] font-black text-blue-500">ESTÁVEL</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-tight">NoRecoil (35%)</span>
              <span className="text-[9px] font-black text-blue-500">ATIVO</span>
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-tight">Não passar da cabeça</span>
              <input type="checkbox" checked={opts.headLimit} onChange={() => setOpts({...opts, headLimit: !opts.headLimit})} className="w-5 h-5 rounded bg-black border-white/10 accent-blue-600" />
            </label>
          </div>

          <button onClick={handleInject} disabled={isInjecting} className="w-full bg-blue-600 text-white font-black py-5 rounded-[2rem] uppercase text-[11px] tracking-[0.3em] relative overflow-hidden active:scale-95 transition-all shadow-xl shadow-blue-900/20">
            <span className="relative z-10">{isInjecting ? 'EXECUTANDO...' : 'INJETAR AGORA'}</span>
            <div className="absolute inset-0 bg-white/20 transition-all duration-500" style={{ width: `${progress}%`, opacity: isInjecting ? 1 : 0 }} />
          </button>

          <div className="mt-5 bg-black/40 p-4 rounded-2xl border border-white/5 h-20 overflow-y-auto font-mono text-[8px] text-zinc-600 space-y-1">
            {logs.map((log, i) => <div key={i}><span className="text-blue-900 mr-2 font-black italic">#</span>{log}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}
