'use client'

import { useState, useMemo } from 'react'

const ICON_MUSIC = "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"

export default function MusicPerformancePRO() {
  const [step, setStep] = useState<'login' | 'os' | 'panel'>('login')
  const [password, setPassword] = useState('')
  const [os, setOs] = useState<'android' | 'ios'>('android')
  const [aimValue, setAimValue] = useState(15)
  const [isInjecting, setIsInjecting] = useState(false)
  const [showMiniPanel, setShowMiniPanel] = useState(false)
  const [logs, setLogs] = useState(['> System Kernel Ready...', '> Waiting Authentication...'])
  
  const [opts, setOpts] = useState({
    estabilizar: false,
    otimizar: false,
    semTremer: false
  })

  // TODAS AS KEYS (50+)
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
      setStep('os')
    } else {
      alert('ERRO: CHAVE DE ACESSO INVÁLIDA!')
      setPassword('')
    }
  }

  const handleInject = () => {
    setIsInjecting(true)
    setLogs(prev => [...prev, '> Iniciando Protocolo de Injeção...'])
    
    // Dispara alerta simulando notificação de sistema
    if ("Notification" in window) {
      alert("⚠️ INJECTION ALERT: Otimização de Kernel iniciada em segundo plano.");
    }

    const steps = [
      "> Alocando buffer em memória RAM...",
      "> Aplicando patches de interpolação...",
      "> Bypass de integridade concluído.",
      "> SUCESSO! Módulo ativo."
    ]

    steps.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
        if (i === steps.length - 1) {
          setShowMiniPanel(true)
          setIsInjecting(false)
          setTimeout(() => {
            const url = os === 'android' 
              ? "https://play.google.com/store/apps/details?id=com.dts.freefireth"
              : "https://apps.apple.com/br/app/free-fire/id1300146617"
            window.open(url, '_blank')
          }, 1500)
        }
      }, (i + 1) * 900)
    })
  }

  return (
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
      
      {/* MINI PAINEL DE STATUS (FINGE QUE ESTÁ ATIVO) */}
      {showMiniPanel && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-[#0a0a0a]/90 border border-[#1DB954] rounded-2xl p-3 z-50 shadow-[0_0_20px_rgba(29,185,84,0.3)] animate-in slide-in-from-top-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black text-[#1DB954] italic">MAJESTIC PRO</span>
            <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 p-1 rounded text-center">
              <p className="text-[6px] text-gray-500 uppercase">Aimlock</p>
              <p className="text-[8px] font-bold text-[#1DB954]">ACTIVE</p>
            </div>
            <div className="bg-white/5 p-1 rounded text-center">
              <p className="text-[6px] text-gray-500 uppercase">Sense</p>
              <p className="text-[8px] font-bold text-[#1DB954]">MAX</p>
            </div>
          </div>
        </div>
      )}

      {/* TELA DE LOGIN */}
      {step === 'login' && (
        <div className="flex flex-col h-full items-center justify-center p-8 animate-in fade-in">
          <img src={ICON_MUSIC} className="w-16 h-16 mb-6 opacity-30" />
          <h1 className="text-xl font-black mb-8 tracking-[0.3em] uppercase italic">Performance <span className="text-[#1DB954]">Login</span></h1>
          <input 
            type="text" placeholder="INSIRA SUA KEY" 
            className="w-full bg-[#111] border border-white/10 p-5 rounded-2xl mb-4 outline-none focus:border-[#1DB954] text-center font-mono tracking-widest"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-[#1DB954] text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em]">Autenticar Acesso</button>
        </div>
      )}

      {/* SELEÇÃO DE SISTEMA */}
      {step === 'os' && (
        <div className="flex flex-col h-full justify-center px-8 animate-in slide-in-from-bottom-6">
          <h2 className="text-sm font-black mb-10 text-center uppercase tracking-widest text-gray-500 italic">Arquitetura de Dispositivo</h2>
          <button onClick={() => { setOs('android'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] mb-4 flex justify-between items-center active:scale-95 transition-all">
            <span className="font-black tracking-widest text-sm uppercase italic">Android Core</span>
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">→</div>
          </button>
          <button onClick={() => { setOs('ios'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] flex justify-between items-center active:scale-95 transition-all">
            <span className="font-black tracking-widest text-sm uppercase italic">iOS Mobile</span>
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">→</div>
          </button>
        </div>
      )}

      {/* PAINEL PRINCIPAL */}
      {step === 'panel' && (
        <div className="flex flex-col h-full pt-14 px-7 animate-in fade-in">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-xs font-black uppercase italic tracking-widest text-gray-400">Control <span className="text-[#1DB954]">Panel</span></h1>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954] shadow-[0_0_5px_#1DB954]" />
               <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Server Connected</span>
            </div>
          </header>

          <div className="bg-[#0a0a0a] p-6 rounded-[2.5rem] border border-white/5 mb-5 shadow-2xl">
            <div className="flex justify-between mb-5">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Aimlock Tuning</span>
              <span className="text-[#1DB954] font-mono font-bold text-xs">{aimValue}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={aimValue} 
              onChange={(e) => setAimValue(parseInt(e.target.value))} 
              className="w-full h-1 bg-[#222] appearance-none accent-[#1DB954] rounded-full mb-6" 
            />

            <div className="space-y-4 mb-2">
              {[
                { id: 'estabilizar', label: 'Smooth Aim Response' },
                { id: 'otimizar', label: 'Optimize Buffer' },
                { id: 'semTremer', label: 'Anti-Shake Screen' }
              ].map(item => (
                <label key={item.id} className="flex items-center space-x-4 cursor-pointer">
                  <input type="checkbox" checked={(opts as any)[item.id]} onChange={() => setOpts({...opts, [item.id]: !(opts as any)[item.id]})} className="hidden" />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${(opts as any)[item.id] ? 'bg-[#1DB954] border-[#1DB954]' : 'border-white/10 bg-black'}`}>
                    {(opts as any)[item.id] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${(opts as any)[item.id] ? 'text-white' : 'text-gray-600'}`}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={handleInject}
            disabled={isInjecting}
            className="w-full bg-white text-black font-black py-5 rounded-[1.5rem] uppercase text-[11px] tracking-[0.3em] active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            {isInjecting ? 'EXECUTANDO...' : 'INJETAR AGORA'}
          </button>

          <div className="mt-6 p-5 bg-[#080808] rounded-2xl border border-white/5 font-mono text-[8px] text-gray-600 space-y-1 h-28 overflow-y-auto">
            {logs.map((log, i) => <div key={i} className="animate-in fade-in slide-in-from-left-2">{log}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}
