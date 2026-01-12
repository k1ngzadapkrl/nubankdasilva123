'use client'

import { useEffect, useMemo, useState } from 'react'

type Device = 'android' | 'ios'

const ACCENT = '#820ad1'
const BG = '#000000'
const NU_ICON = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSBqotrU4emvswOB389weXcAHPuGe1tffJw&s"

const VALID_KEYS = [
  "aura2", "NUBANK-MOD", "123456", "MAJESTIC-PRO", "CLISHA-091", 
  "NU-FAST-01", "NU-FAST-02", "NU-FAST-03", "MAJ-PRO-X1", "MAJ-PRO-X2", 
  "MAJ-PRO-X3", "SAFE-INJ-77", "SAFE-INJ-88", "SAFE-INJ-99", "VIP-BLOCK-0", 
  "VIP-BLOCK-1", "VIP-BLOCK-2", "GOLD-NU-55", "SILVER-NU-44", "SHIELD-99", 
  "SHIELD-88", "BZ-33-MOD", "BZ-44-MOD", "ACCESS-FULL", "ACCESS-FREE"
];

function Spinner() {
  return (
    <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-t-transparent"
      style={{ borderColor: 'rgba(130,10,209,0.12)', borderTopColor: ACCENT }} />
  )
}

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

export default function Page() {
  const [stage, setStage] = useState<'login' | 'loading' | 'app'>('login')
  const [key, setKey] = useState('')
  const [device, setDevice] = useState<Device>('ios')
  const [logs, setLogs] = useState<string[]>([])
  const [injecting, setInjecting] = useState(false)
  
  // Estados da IA de Sensibilidade
  const [phoneModel, setPhoneModel] = useState('')
  const [senseType, setSenseType] = useState<'ALTA' | 'BAIXA'>('ALTA')
  const [generatedSense, setGeneratedSense] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const [c1, setC1] = useState(true)
  const [c2, setC2] = useState(true)
  const [c3, setC3] = useState(false)

  function handleLogin() {
    const val = key.trim().toUpperCase();
    if (!VALID_KEYS.includes(val)) {
      alert('Erro de autenticação: Esta KEY não está vinculada.');
      return;
    }
    setStage('loading')
    setTimeout(() => setStage('app'), 1500)
  }

  // IA SENSE PARA NUBANK
  const generateIAConfig = () => {
    if (!phoneModel) return alert("Digite o modelo do aparelho!")
    setIsGenerating(true)
    setTimeout(() => {
      const base = senseType === 'ALTA' ? 94 : 82
      const random = () => Math.floor(Math.random() * 6)
      setGeneratedSense({
        geral: base + random(),
        redDot: base + 3 + random(),
        mira2x: 98 + random(),
        mira4x: 100,
        dpi: device === 'android' ? (senseType === 'ALTA' ? 720 + random() : 411) : 'Otimizada iOS'
      })
      setIsGenerating(false)
    }, 1800)
  }

  function handleApply() {
    if (injecting) return
    setInjecting(true)
    setLogs(["> [SISTEMA] Iniciando bypass...", "> [DATA] Sincronizando Hardware ID...", "> [SUCCESS] Injeção completa!"])
    setTimeout(() => {
      window.location.href = device === 'android' 
        ? 'intent://#Intent;package=com.dts.freefireth;scheme=android-app;end'
        : 'https://apps.apple.com/br/app/free-fire/id1300146617'
    }, 3000)
  }

  return (
    <div className="fixed inset-0 flex flex-col text-white select-none overflow-hidden bg-black">
      <head>
        <title>Nubank</title>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href={NU_ICON} />
      </head>

      <style jsx global>{`
        :root { --sat: env(safe-area-inset-top); }
        .app-container { padding-top: var(--sat); }
      `}</style>

      {stage === 'login' && (
        <div className="flex-1 flex flex-col px-6 pb-12 pt-24 animate-in fade-in duration-500">
          <img src={NU_ICON} alt="Nu" style={{ width: 50, marginBottom: 40, borderRadius: '10px' }} />
          <h1 className="mb-9 text-[26px] font-medium leading-tight tracking-tight">Olá, qual é o seu CPF?</h1>
          <div className="mb-1 text-[13px] font-medium" style={{ color: ACCENT }}>CPF</div>
          <div className="mb-6 border-b-[1.5px]" style={{ borderColor: ACCENT }}>
            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="000.000.000-00" className="w-full bg-transparent py-2 text-[18px] outline-none" />
          </div>
          <button onClick={handleLogin} className="mt-auto w-full rounded-full py-[18px] font-semibold active:scale-95 transition-transform" style={{ background: ACCENT }}>Continuar</button>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex-1 grid place-items-center"><Spinner /></div>
      )}

      {stage === 'app' && (
        <div className="flex-1 flex flex-col app-container overflow-y-auto px-5 pb-10">
          <div className="mt-8 mb-7 flex justify-between items-end">
            <div>
              <div className="text-[20px] font-bold">Painel Majestic VIP</div>
              <div className="text-[11px] text-[#820ad1] font-bold uppercase tracking-widest">Hardware ID Ativo</div>
            </div>
            <img src={NU_ICON} className="w-8 h-8 rounded-lg" />
          </div>

          {/* IA DE SENSIBILIDADE VIP */}
          <div className="mb-6 rounded-2xl border border-[#820ad1]/30 bg-[#111] p-5">
            <h3 className="text-[10px] font-black text-[#820ad1] mb-4 uppercase tracking-[0.2em]">IA Sense Generator Pro</h3>
            <input 
              type="text" placeholder="Modelo do Aparelho..." 
              className="w-full bg-black border border-[#222] p-3 rounded-xl text-sm mb-3 outline-none focus:border-[#820ad1]"
              value={phoneModel} onChange={(e) => setPhoneModel(e.target.value)}
            />
            <div className="flex gap-2 mb-4">
              <button onClick={() => setSenseType('ALTA')} className={`flex-1 py-2 rounded-xl text-[10px] font-black border transition-all ${senseType === 'ALTA' ? 'bg-[#820ad1] border-[#820ad1] text-white' : 'border-[#222] text-gray-500'}`}>SENSE ALTA</button>
              <button onClick={() => setSenseType('BAIXA')} className={`flex-1 py-2 rounded-xl text-[10px] font-black border transition-all ${senseType === 'BAIXA' ? 'bg-[#820ad1] border-[#820ad1] text-white' : 'border-[#222] text-gray-500'}`}>SENSE BAIXA</button>
            </div>
            <button onClick={generateIAConfig} disabled={isGenerating} className="w-full bg-white text-black font-black py-3 rounded-xl text-[11px] uppercase hover:opacity-90 active:scale-95 transition-all">
              {isGenerating ? 'PROCESSANDO IA...' : 'GERAR CONFIGURAÇÃO VIP'}
            </button>

            {generatedSense && (
              <div className="mt-5 grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-2">
                {Object.entries(generatedSense).map(([k, v]: any) => (
                  <div key={k} className="bg-black/60 p-3 rounded-xl border border-white/5">
                    <div className="text-[9px] text-gray-500 uppercase font-bold">{k}</div>
                    <div className="text-md font-black text-white">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BOTÕES DE SISTEMA */}
          <div className="mb-6 flex gap-1 rounded-xl border p-1 bg-[#111] border-[#222]">
            <button onClick={() => setDevice('android')} className={cn('flex-1 rounded-[10px] py-2 text-[12px] font-bold', device === 'android' ? 'bg-[#222] text-[#820ad1]' : 'text-white/35')}>ANDROID</button>
            <button onClick={() => setDevice('ios')} className={cn('flex-1 rounded-[10px] py-2 text-[12px] font-bold', device === 'ios' ? 'bg-[#222] text-[#820ad1]' : 'text-white/35')}>IOS (BRASIL)</button>
          </div>

          {/* Toggles */}
          <div className="mb-6 rounded-2xl border p-2 bg-[#111] border-[#222]">
            <ToggleRow label="Aimlock 100% (Headshot)" checked={c1} onChange={setC1} />
            <ToggleRow label="Anti-Ban Security" checked={c2} onChange={setC2} />
            <ToggleRow label="FPS Boost Ultra" checked={c3} onChange={setC3} noDivider />
          </div>

          <button onClick={handleApply} disabled={injecting} className="w-full rounded-full py-[20px] font-black uppercase tracking-widest text-[13px] transition-all active:scale-95" style={{ background: ACCENT, opacity: injecting ? 0.6 : 1 }}>
            {injecting ? 'INJETANDO...' : 'ATIVAR NO JOGO'}
          </button>
          
          {logs.length > 0 && (
            <div className="mt-4 p-3 bg-black rounded border border-[#820ad1]/20 font-mono text-[9px] text-[#820ad1]">
              {logs.map((l, i) => <div key={i} className="animate-pulse">{l}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ToggleRow({ label, checked, onChange, noDivider }: any) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-4', !noDivider && 'border-b border-white/5')}>
      <label className="text-[14px] font-medium text-white/90">{label}</label>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-[18px] w-[18px]" style={{ accentColor: ACCENT }} />
    </div>
  )
}
