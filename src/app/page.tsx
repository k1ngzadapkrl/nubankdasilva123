'use client'

import { useState } from 'react'

export default function PortalPerformance() {
  const [stage, setStage] = useState<'login' | 'select-os' | 'panel'>('login')
  const [key, setKey] = useState('')
  const [os, setOs] = useState<'ANDROID' | 'IOS'>('IOS')
  const [intensity, setIntensity] = useState<'ALTA' | 'BAIXA'>('ALTA')
  const [isProcessing, setIsProcessing] = useState(false)
  const [senseResult, setSenseResult] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])

  const handleLogin = () => {
    if (key.trim() !== "") setStage('select-os')
  }

  const selectOS = (selected: 'ANDROID' | 'IOS') => {
    setOs(selected)
    setStage('panel')
  }

  const generateConfig = () => {
    setIsProcessing(true)
    setLogs([])
    setSenseResult(null)

    const steps = [
      `> Reconhecendo arquitetura ${os}...`,
      "> Limpando arquivos de cache temporário...",
      "> Calibrando taxa de amostragem do touch...",
      "> Aplicando filtro anti-overhead (Mira não passa da cabeça)...",
      "> Otimização concluída com sucesso!"
    ]

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step])
        if (i === steps.length - 1) {
          const base = intensity === 'ALTA' ? 94 : 84
          setSenseResult({
            geral: base + Math.floor(Math.random() * 4),
            redDot: base + 2,
            mira2x: 98,
            dpi: os === 'ANDROID' ? '720' : 'Otimização iOS'
          })
          setIsProcessing(false)
        }
      }, i * 600)
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans select-none">
      <head>
        <title>Portal de Acessos</title>
      </head>

      {/* ETAPA 1: LOGIN */}
      {stage === 'login' && (
        <div className="flex flex-col pt-24 animate-in fade-in duration-500">
          <h1 className="text-3xl font-black tracking-tighter mb-2">PORTAL <span className="text-[#820ad1]">VIP</span></h1>
          <p className="text-gray-500 text-sm mb-12">Insira sua credencial para continuar.</p>
          <input 
            type="password" value={key} onChange={(e) => setKey(e.target.value)}
            placeholder="Chave de Acesso"
            className="w-full bg-[#111] border border-white/5 p-4 rounded-2xl mb-4 outline-none focus:border-[#820ad1] transition-all"
          />
          <button onClick={handleLogin} className="w-full bg-[#820ad1] py-4 rounded-2xl font-bold uppercase text-[11px] tracking-widest shadow-lg shadow-[#820ad1]/20">
            Acessar Sistema
          </button>
        </div>
      )}

      {/* ETAPA 2: SELEÇÃO DE SISTEMA */}
      {stage === 'select-os' && (
        <div className="flex flex-col pt-20 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-2">Selecione seu <span className="text-[#820ad1]">Sistema</span></h2>
          <p className="text-gray-500 text-sm mb-10">Otimização específica por hardware.</p>
          
          <div className="space-y-4">
            <button onClick={() => selectOS('ANDROID')} className="w-full bg-[#111] border border-white/5 p-6 rounded-3xl flex items-center justify-between group active:scale-95 transition-all">
              <span className="font-bold tracking-widest">ANDROID</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#820ad1] transition-colors">→</div>
            </button>
            <button onClick={() => selectOS('IOS')} className="w-full bg-[#111] border border-white/5 p-6 rounded-3xl flex items-center justify-between group active:scale-95 transition-all">
              <span className="font-bold tracking-widest">IOS (BRASIL)</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#820ad1] transition-colors">→</div>
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 3: PAINEL DE GERAÇÃO */}
      {stage === 'panel' && (
        <div className="flex flex-col animate-in fade-in duration-500">
          <header className="flex justify-between items-center mb-10 mt-4">
            <div>
              <p className="text-[10px] font-bold text-[#820ad1] uppercase tracking-widest">Sistema: {os}</p>
              <h2 className="text-xl font-black italic tracking-tighter uppercase">Majestic VIP</h2>
            </div>
            <button onClick={() => setStage('select-os')} className="text-[10px] text-gray-500 underline">Trocar Sistema</button>
          </header>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 mb-6">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-4 text-center tracking-[0.2em]">Configuração de Entrada</p>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button onClick={() => setIntensity('ALTA')} className={`py-3 rounded-xl text-[10px] font-bold border transition-all ${intensity === 'ALTA' ? 'bg-[#820ad1] border-[#820ad1]' : 'border-white/5 text-gray-600'}`}>SENSE ALTA</button>
              <button onClick={() => setIntensity('BAIXA')} className={`py-3 rounded-xl text-[10px] font-bold border transition-all ${intensity === 'BAIXA' ? 'bg-[#820ad1] border-[#820ad1]' : 'border-white/5 text-gray-600'}`}>SENSE BAIXA</button>
            </div>

            <button onClick={generateConfig} disabled={isProcessing} className="w-full bg-white text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50">
              {isProcessing ? 'CALIBRANDO HARDWARE...' : `GERAR SENSE ${os}`}
            </button>

            {senseResult && (
              <div className="mt-8 grid grid-cols-2 gap-3 animate-in zoom-in-95">
                <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Geral</p>
                  <p className="text-xl font-black text-[#820ad1]">{senseResult.geral}</p>
                </div>
                <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">DPI</p>
                  <p className="text-xl font-black text-[#820ad1] text-xs leading-tight">{senseResult.dpi}</p>
                </div>
              </div>
            )}
          </div>

          {logs.length > 0 && (
            <div className="p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 font-mono text-[9px] text-gray-400 space-y-2 mb-6">
              {logs.map((log, i) => <div key={i} className="animate-in fade-in slide-in-from-left-2 tracking-tight">{log}</div>)}
            </div>
          )}
          
          <p className="text-[9px] text-center text-gray-700 uppercase font-bold tracking-[0.3em]">Hardware ID: 8688-META-PRO</p>
        </div>
      )}
    </div>
  )
}
