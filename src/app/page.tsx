'use client'

import { useState } from 'react'

export default function PortalPerformance() {
  const [stage, setStage] = useState<'login' | 'select-os' | 'panel'>('login')
  const [key, setKey] = useState('')
  const [os, setOs] = useState<'ANDROID' | 'IOS'>('IOS')
  const [intensity, setIntensity] = useState<'ALTA' | 'BAIXA'>('ALTA')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isInjecting, setIsInjecting] = useState(false)
  const [senseResult, setSenseResult] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  
  const [opts, setOpts] = useState({
    estabilizar: false,
    otimizar: false,
    semTremer: false
  })

  const VALID_KEYS = [
   "NUBANK-MOD", "123456", "MAJESTIC-PRO", "CLISHA-091", 
  "NU-FAST-01", "NU-FAST-02", "NU-FAST-03", "MAJ-PRO-X1", "MAJ-PRO-X2", 
  "MAJ-PRO-X3", "SAFE-INJ-77", "SAFE-INJ-88", "SAFE-INJ-99", "VIP-BLOCK-0", 
  "VIP-BLOCK-1", "VIP-BLOCK-2", "GOLD-NU-55", "SILVER-NU-44", "SHIELD-99", 
  "SHIELD-88", "BZ-33-MOD", "BZ-44-MOD", "ACCESS-FULL",
  "MAJ-WEEK-01", "MAJ-WEEK-02", "MAJ-WEEK-03", "VIP-SENSE-10", 
  "VIP-SENSE-20", "PRO-FLOW-77", "PRO-FLOW-88", "SHIELD-XP-01", 
  "SHIELD-XP-02", "SHIELD-XP-03", "ACCESS-PREMIUM", "ULTRA-V1-MOD", 
  "ULTRA-V2-MOD", "ALPHA-SHIELD-1", "ALPHA-SHIELD-2", "BETA-FLOW-X", 
  "DELTA-VIP-99", "ZETA-PRO-55", "SIGMA-MOD-44", "FAST-TRACK-07", 
  "FAST-TRACK-08", "GLOBAL-ACCESS-1", "GLOBAL-ACCESS-2", "ELITE-XP-500", 
  "ELITE-XP-600", "MASTER-INJ-01", "MASTER-INJ-02", "FORCE-MOD-X", 
  "TITAN-PRO-V9", "LEGEND-FAST-0"
  ];

  const handleLogin = () => {
    const inputKey = key.trim().toUpperCase();
    if (VALID_KEYS.includes(inputKey)) {
      setStage('select-os')
    } else {
      alert("CHAVE DE ACESSO INVÁLIDA!")
      setKey('')
    }
  }

  const generateConfig = () => {
    setIsProcessing(true)
    setLogs([])
    setSenseResult(null)
    setTimeout(() => {
      const base = intensity === 'ALTA' ? 95 : 85
      setSenseResult({
        geral: base + Math.floor(Math.random() * 3),
        dpi: os === 'ANDROID' ? '720 DPI' : 'iOS Otimizado'
      })
      setIsProcessing(false)
      setLogs(["> Configurações de sensibilidade geradas com sucesso!"])
    }, 1500)
  }

  const handleInject = () => {
    setIsInjecting(true)
    setLogs(["> Iniciando protocolo de injeção..."])
    
    const steps = [
      "> Criando ponte de dados segura...",
      "> Injetando scripts de estabilização...",
      "> Bypass de segurança concluído...",
      "> SUCESSO! Abrindo o jogo..."
    ]

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step])
        if (i === steps.length - 1) {
          setTimeout(() => {
            if (os === 'ANDROID') {
              window.location.href = "https://play.google.com/store/apps/details?id=com.dts.freefireth"
            } else {
              window.location.href = "https://apps.apple.com/br/app/free-fire/id1300146617"
            }
          }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans select-none overflow-x-hidden">
      {/* LOGIN */}
      {stage === 'login' && (
        <div className="flex flex-col pt-24 animate-in fade-in duration-500">
          <h1 className="text-3xl font-black tracking-tighter mb-2 italic">MAJESTIC <span className="text-[#820ad1]">VIP</span></h1>
          <p className="text-gray-500 text-sm mb-12">Portal de performance e calibração.</p>
          <input 
            type="text" value={key} onChange={(e) => setKey(e.target.value)}
            placeholder="Digite sua KEY"
            className="w-full bg-[#111] border border-white/5 p-4 rounded-2xl mb-4 outline-none focus:border-[#820ad1] text-center font-mono tracking-widest"
          />
          <button onClick={handleLogin} className="w-full bg-[#820ad1] py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em]">
            Verificar Acesso
          </button>
        </div>
      )}

      {/* SELEÇÃO OS */}
      {stage === 'select-os' && (
        <div className="flex flex-col pt-20 animate-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold mb-10 text-center uppercase tracking-tighter italic">Selecione seu <span className="text-[#820ad1]">Sistema</span></h2>
          <div className="space-y-4">
            <button onClick={() => { setOs('ANDROID'); setStage('panel') }} className="w-full bg-[#111] border border-white/5 p-6 rounded-3xl flex justify-between items-center active:scale-95 transition-all">
              <span className="font-black tracking-[0.2em] italic">ANDROID</span>
              <div className="w-10 h-10 rounded-full bg-[#820ad1]/20 flex items-center justify-center text-[#820ad1]">→</div>
            </button>
            <button onClick={() => { setOs('IOS'); setStage('panel') }} className="w-full bg-[#111] border border-white/5 p-6 rounded-3xl flex justify-between items-center active:scale-95 transition-all">
              <span className="font-black tracking-[0.2em] italic">IOS BRASIL</span>
              <div className="w-10 h-10 rounded-full bg-[#820ad1]/20 flex items-center justify-center text-[#820ad1]">→</div>
            </button>
          </div>
        </div>
      )}

      {/* PAINEL FINAL */}
      {stage === 'panel' && (
        <div className="flex flex-col animate-in fade-in">
          <header className="flex justify-between items-center mb-8 mt-4">
             <h2 className="text-lg font-black italic tracking-tighter uppercase">{os} PERFORMANCE</h2>
             <button onClick={() => setStage('select-os')} className="text-[9px] text-gray-500 uppercase border border-white/10 px-3 py-1 rounded-full">Voltar</button>
          </header>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 mb-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setIntensity('ALTA')} className={`py-4 rounded-2xl text-[10px] font-black border transition-all ${intensity === 'ALTA' ? 'bg-[#820ad1] border-[#820ad1]' : 'border-white/5 text-gray-600'}`}>SENSE ALTA</button>
              <button onClick={() => setIntensity('BAIXA')} className={`py-4 rounded-2xl text-[10px] font-black border transition-all ${intensity === 'BAIXA' ? 'bg-[#820ad1] border-[#820ad1]' : 'border-white/5 text-gray-600'}`}>SENSE BAIXA</button>
            </div>

            <div className="space-y-3 mb-6">
              {['estabilizar', 'otimizar', 'semTremer'].map((opt) => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" checked={(opts as any)[opt]} onChange={() => setOpts({...opts, [opt]: !(opts as any)[opt]})} className="hidden" />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${(opts as any)[opt] ? 'bg-[#820ad1] border-[#820ad1]' : 'border-white/20'}`}>
                    {(opts as any)[opt] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${(opts as any)[opt] ? 'text-white' : 'text-gray-500'}`}>
                    {opt === 'estabilizar' ? 'Estabilizar Mira' : opt === 'otimizar' ? 'Otimizar Free Fire' : 'Tela sem Tremer'}
                  </span>
                </label>
              ))}
            </div>

            {!senseResult ? (
              <button onClick={generateConfig} disabled={isProcessing} className="w-full bg-white text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest active:scale-95 transition-all">
                {isProcessing ? 'CALIBRANDO...' : `GERAR SENSE ${os}`}
              </button>
            ) : (
              <div className="animate-in zoom-in-95">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase font-black">GERAL</p>
                    <p className="text-xl font-black text-[#820ad1]">{senseResult.geral}</p>
                  </div>
                  <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase font-black">DPI</p>
                    <p className="text-[10px] font-black text-[#820ad1]">{senseResult.dpi}</p>
                  </div>
                </div>
                <button onClick={handleInject} disabled={isInjecting} className="w-full bg-[#820ad1] text-white font-black py-5 rounded-2xl text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-[#820ad1]/30 active:scale-95 transition-all">
                  {isInjecting ? 'INJETANDO...' : 'INJETAR NO JOGO'}
                </button>
              </div>
            )}
          </div>

          {logs.length > 0 && (
            <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 font-mono text-[9px] text-gray-500 space-y-2 mb-8 animate-in fade-in">
              {logs.map((log, i) => <div key={i} className="animate-in slide-in-from-left-2 tracking-tight">{log}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
