'use client'

import { useEffect, useMemo, useState } from 'react'

type Device = 'android' | 'ios'

const ACCENT = '#820ad1'
const BG = '#000000'

const VALID_KEYS = [
  "k1ng", "K1NG", "NUBANK-MOD", "123456", "MAJESTIC-PRO", "CLISHA-091", 
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
  const [showResult, setShowResult] = useState(false)

  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(true)
  const [c3, setC3] = useState(false)
  const [c4, setC4] = useState(false)

  const configResult = useMemo(() => [
    { label: 'Geral', value: 94 },
    { label: 'Mira 2x', value: 100 },
    { label: 'Mira 4x', value: 98 },
    { label: 'DPI', value: 590 },
  ], [])

  function handleLogin() {
    const val = key.trim()
    if (!VALID_KEYS.includes(val) && !VALID_KEYS.includes(val.toUpperCase())) {
      alert('Erro de autenticação: Esta KEY não está vinculada.')
      return
    }
    setStage('loading')
    setTimeout(() => setStage('app'), 1500)
  }

  async function runLogs() {
    const messages = [
      "> [SISTEMA] Iniciando protocolo...",
      `> [AUTH] Key validada: ${key.toUpperCase()}`,
      "> [BYPASS] Desativando detecção...",
      "> [SUCCESS] Injeção aplicada!"
    ]
    for (const msg of messages) {
      setLogs(prev => [...prev, msg])
      await new Promise(r => setTimeout(r, 450))
    }
  }

  function handleApply() {
    if (injecting) return
    setInjecting(true)
    setLogs([])
    runLogs()
    setTimeout(() => {
      setInjecting(false)
      setShowResult(true)
      setTimeout(() => {
        window.location.href = device === 'android' 
          ? 'intent://#Intent;package=com.dts.freefireth;scheme=android-app;end'
          : 'https://apps.apple.com/br/app/id1300146617'
      }, 3500)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 flex flex-col text-white select-none overflow-hidden"
      style={{ 
        background: BG, 
        fontFamily: '-apple-system, system-ui, sans-serif',
        touchAction: 'none' // Impede o "puxar para baixo" no iOS
      }}>
      
      {/* Correção do topo branco e comportamento de puxar */}
      <style jsx global>{`
        html, body {
          background-color: #000000 !important;
          margin: 0;
          padding: 0;
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      {/* Botão Pânico */}
      <button onClick={() => window.location.replace("https://www.nubank.com.br")} 
        className="absolute right-5 top-12 z-[20000] grid h-[35px] w-[35px] place-items-center rounded-full border bg-white/5 border-white/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
      </button>

      {stage === 'login' && (
        <div className="flex-1 flex flex-col px-6 pb-8 pt-20 animate-in fade-in duration-500">
          <img src="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-3.png" alt="Nu" style={{ width: 45, marginBottom: 40, filter: 'brightness(10)' }} />
          <h1 className="mb-9 text-[26px] font-medium leading-tight">Olá, qual é o seu CPF?</h1>
          <div className="mb-1 text-[13px] font-medium" style={{ color: ACCENT }}>CPF</div>
          <div className="mb-6 border-b-[1.5px]" style={{ borderColor: ACCENT }}>
            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="000.000.000-00" className="w-full bg-transparent py-2 text-[18px] outline-none" />
          </div>
          <button onClick={handleLogin} className="mt-auto w-full rounded-full py-[18px] font-semibold" style={{ background: ACCENT }}>Continuar</button>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex-1 grid place-items-center"><Spinner /></div>
      )}

      {stage === 'app' && (
        <div className="flex-1 flex flex-col px-5 pb-10 pt-20 overflow-y-auto">
          <div className="mb-7">
            <div className="text-[18px] font-semibold">Painel Majestic</div>
            <div className="text-[12px] text-white/50 italic">Conexão segura ativa</div>
          </div>

          <div className="mb-6 flex gap-1 rounded-xl border p-1 bg-[#111] border-[#222]">
            <button onClick={() => setDevice('android')} className={cn('flex-1 rounded-[10px] py-2 text-[12px] font-semibold', device === 'android' ? 'bg-[#222] text-[#820ad1]' : 'text-white/35')}>ANDROID</button>
            <button onClick={() => setDevice('ios')} className={cn('flex-1 rounded-[10px] py-2 text-[12px] font-semibold', device === 'ios' ? 'bg-[#222] text-[#820ad1]' : 'text-white/35')}>iOS</button>
          </div>

          <div className="mb-5 rounded-2xl border p-5 bg-[#111] border-[#1a1a1a]">
            <ToggleRow label="Assist Lock (Fov)" checked={c1} onChange={setC1} />
            <ToggleRow label="No Recoil (Safety)" checked={c2} onChange={setC2} />
            <ToggleRow label="FPS Boost 120Hz" checked={c3} onChange={setC3} />
            <ToggleRow label="Precision AIM" checked={c4} onChange={setC4} noDivider />
          </div>

          {(injecting || logs.length > 0) && (
            <div className="mb-5 rounded-lg bg-black/80 p-3 font-mono text-[10px] text-green-500 border border-green-500/20">
              {logs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
          )}

          <button onClick={handleApply} disabled={injecting} className="w-full rounded-full py-[18px] font-semibold" style={{ background: ACCENT, opacity: injecting ? 0.6 : 1 }}>
            {injecting ? 'INJETANDO...' : showResult ? 'SUCESSO!' : 'Autorizar e Injetar'}
          </button>

          {showResult && (
            <div className="mt-4 rounded-2xl border p-4 bg-[#111] border-[#820ad1]">
              {configResult.map((item) => (
                <div key={item.label} className="flex justify-between border-b border-[#222] py-1 text-[13px] text-[#888]">
                  <span>{item.label}</span><b className="text-white">{item.value}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ToggleRow({ label, checked, onChange, noDivider }: any) {
  return (
    <div className={cn('flex items-center justify-between py-4', !noDivider && 'border-b border-[#222]')}>
      <label className="text-[14px] text-white/90">{label}</label>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-[20px] w-[20px]" style={{ accentColor: ACCENT }} />
    </div>
  )
}
