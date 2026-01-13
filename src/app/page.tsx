'use client'

import { useState, useMemo } from 'react'

export default function AimAssistElite() {
  const [step, setStep] = useState<'login' | 'panel'>('login')
  const [password, setPassword] = useState('')
  const [isInjecting, setIsInjecting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState(['> SYSTEM_READY', '> ENCRYPTION: AES-256'])

  // Configurações Técnicas Solicitadas
  const [sensi, setSensi] = useState({ dpi: 600, geral: 95, redDot: 85 })
  const [opts, setOpts] = useState({
    antiShake: true,
    noRecoil: true, // Travado em 35% internamente
    headLimit: false
  })

  const VALID_KEYS = useMemo(() => [
    "ACESSO-FREE", "NUBANK-MOD", "123456", "MAJESTIC-PRO", "CLISHA-091", 
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
      setStep('panel')
    } else {
      alert('KEY INVÁLIDA!')
    }
  }

  const generateSensi = () => {
    setSensi({
      dpi: Math.floor(Math.random() * (900 - 400) + 400),
      geral: Math.floor(Math.random() * (100 - 88) + 88),
      redDot: Math.floor(Math.random() * (95 - 70) + 70)
    })
    setLogs(prev => [...prev, '> Nova Sensibilidade Calculada'])
  }

  const handleInject = () => {
    setIsInjecting(true)
    setProgress(0)
    const sequence = [
      "> Calibrando Anti-Shake...",
      "> Ajustando NoRecoil p/ 35%...",
      "> Aplicando Limitador de Altura (Head)...",
      "> INJEÇÃO CONCLUÍDA!"
    ]
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
        setProgress((i + 1) * 25)
        if (i === sequence.length - 1) {
          setIsInjecting(false)
          setTimeout(() => { window.location.href = "https://play.google.com/store/apps/details?id=com.dts.freefireth" }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-zinc-100 font-mono overflow-hidden select-none">
      {step === 'login' ? (
        <div className="flex flex-col h-full items-center justify-center p-8 animate-in fade-in">
          <h1 className="text-2xl font-black italic mb-2 tracking-tighter">AIM<span className="text-blue-600">ASSIST</span> PRO</h1>
          <p className="text-[9px] text-zinc-600 mb-10 tracking-[0.4em]">ENCRYPTED TERMINAL v4.2</p>
          <input 
            type="text" placeholder="INSIRA SUA KEY" 
            className="w-full bg-[#111] border border-white/5 p-5 rounded-2xl mb-4 text-center font-bold tracking-widest outline-none focus:border-blue-600/50"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase text-[11px] tracking-[0.2em]">Autenticar</button>
        </div>
      ) : (
        <div className="flex flex-col h-full pt-12 px-6 animate-in fade-in">
          <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <span className="text-[10px] font-black italic">PERFORMANCE_TAB</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[8px] text-zinc-500 uppercase">Acesso VIP Ativo</span>
            </div>
          </header>

          {/* Gerador de Sensibilidade */}
          <div className="bg-[#111] p-5 rounded-3xl border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Calculadora de Sensi</span>
              <button onClick={generateSensi} className="text-[9px] bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full font-bold">GERAR NOVA</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[8px] text-zinc-600 mb-1">DPI</p>
                <p className="text-xs font-black text-blue-500">{sensi.dpi}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[8px] text-zinc-600 mb-1">GERAL</p>
                <p className="text-xs font-black text-blue-500">{sensi.geral}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl text-center border border-white/5">
                <p className="text-[8px] text-zinc-600 mb-1">R.DOT</p>
                <p className="text-xs font-black text-blue-500">{sensi.redDot}</p>
              </div>
            </div>
          </div>

          {/* Opções de Injeção */}
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 mb-6 space-y-5">
            {[
              { id: 'antiShake', label: 'Anti-Shake (Mira Estável)', value: 'ON' },
              { id: 'noRecoil', label: 'NoRecoil (Fixado 35%)', value: '35%' },
              { id: 'headLimit', label: 'Não passar muito da cabeça', type: 'checkbox' }
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-tight">{item.label}</span>
                  <span className="text-[8px] text-zinc-600 font-mono">Status: ACTIVE</span>
                </div>
                {item.type === 'checkbox' ? (
                  <input 
                    type="checkbox" 
                    checked={opts.headLimit} 
                    onChange={() => setOpts({...opts, headLimit: !opts.headLimit})}
                    className="w-5 h-5 rounded bg-black border-white/10 accent-blue-600"
                  />
                ) : (
                  <span className="text-[10px] font-black text-blue-500">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={handleInject} disabled={isInjecting}
            className="w-full bg-white text-black font-black py-5 rounded-3xl uppercase text-[11px] tracking-[0.3em] relative overflow-hidden active:scale-95 transition-all"
          >
            <span className="relative z-10">{isInjecting ? 'PATCHEANDO...' : 'INJETAR NO JOGO'}</span>
            <div className="absolute inset-0 bg-blue-600 transition-all duration-500" style={{ width: `${progress}%`, opacity: isInjecting ? 1 : 0 }} />
          </button>

          <div className="mt-6 bg-black/40 p-4 rounded-2xl border border-white/5 h-24 overflow-y-auto font-mono text-[9px] text-zinc-600 space-y-1">
            {logs.map((log, i) => <div key={i}><span className="text-blue-900 mr-2">#</span>{log}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}
