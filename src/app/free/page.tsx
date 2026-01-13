'use client'

import { useState } from 'react'

const MUSIC_ICON = "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"

export default function MusicaBoosterFree() {
  const [step, setStep] = useState<'login' | 'os' | 'panel'>('login')
  const [password, setPassword] = useState('')
  const [os, setOs] = useState<'android' | 'ios'>('android')
  const [isInjecting, setIsInjecting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fpsStable, setFpsStable] = useState(false)
  const [logs, setLogs] = useState(['> MUSIC_ENGINE_READY', '> BITRATE: 320kbps'])

  const handleLogin = () => {
    if (password.toUpperCase() === "ACESSO-FREE") {
      setStep('os')
    } else {
      alert('KEY FREE INVÁLIDA!')
    }
  }

  const handleInject = () => {
    setIsInjecting(true)
    setProgress(0)
    const sequence = [
      `> Sincronizando Core ${os.toUpperCase()}...`,
      "> Ajustando Aimlock Free (Limiting 30%)...",
      fpsStable ? "> Otimizando Estabilidade de FPS..." : "> Ignorando Otimização de FPS...",
      "> INJEÇÃO FREE CONCLUÍDA!"
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
    <div className="fixed inset-0 bg-[#070707] flex flex-col text-zinc-100 font-mono overflow-hidden select-none">
      
      <head>
        <title>MUSICA BOOSTER</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MUSICA BOOSTER" />
        <link rel="apple-touch-icon" href={MUSIC_ICON} />
        {/* APONTA PARA O MANIFESTO QUE FORÇA ABERTURA NESTA PÁGINA */}
        <link rel="manifest" href="/manifest-free.json" />
      </head>

      {/* TELA DE LOGIN FREE */}
      {step === 'login' && (
        <div className="flex flex-col h-full items-center justify-center p-8 animate-in fade-in">
          <div className="w-24 h-24 mb-6 rounded-full bg-blue-600/10 border-2 border-blue-600/30 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.1)]">
             <img src={MUSIC_ICON} alt="Music Icon" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-xl font-black italic mb-1 tracking-tighter uppercase">Music <span className="text-blue-600">Booster</span></h1>
          <p className="text-[8px] text-zinc-600 mb-10 tracking-[0.5em] uppercase font-bold text-center">Versão Gratuita - Equalizador</p>
          
          <input 
            type="text" placeholder="CHAVE FREE" 
            className="w-full bg-[#111] border border-white/5 p-5 rounded-2xl mb-4 text-center font-bold tracking-widest outline-none focus:border-blue-600/50 uppercase text-white"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em] active:scale-95 transition-all">Acessar Free</button>
        </div>
      )}

      {/* SELEÇÃO DE SISTEMA FREE */}
      {step === 'os' && (
        <div className="flex flex-col h-full justify-center px-8 animate-in slide-in-from-bottom-10">
          <h2 className="text-[10px] font-black mb-8 text-center uppercase tracking-[0.5em] text-zinc-500">Selecione o Sistema</h2>
          <div className="space-y-4">
            <button onClick={() => { setOs('android'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] flex justify-between items-center group active:scale-95 transition-all">
              <span className="font-black italic uppercase tracking-widest text-xs text-white">Android Core</span>
              <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => { setOs('ios'); setStep('panel') }} className="w-full bg-[#111] border border-white/5 p-7 rounded-[2rem] flex justify-between items-center group active:scale-95 transition-all">
              <span className="font-black italic uppercase tracking-widest text-xs text-white">iOS System</span>
              <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      )}

      {/* PAINEL FREE */}
      {step === 'panel' && (
        <div className="flex flex-col h-full pt-12 px-6 animate-in fade-in overflow-y-auto">
          <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
               <img src={MUSIC_ICON} className="w-6 h-6 object-contain" />
               <h1 className="text-[10px] font-black italic text-zinc-400 uppercase">Booster <span className="text-blue-600">FREE</span></h1>
            </div>
          </header>

          <div className="bg-[#111] p-6 rounded-[2.5rem] border border-white/5 mb-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-tight">Aimlock (Free)</span>
              <span className="text-[9px] font-black text-red-500">TRAVADO 30%</span>
            </div>
            
            <div className="flex items-center justify-between cursor-pointer group" onClick={() => setFpsStable(!fpsStable)}>
              <span className="text-[10px] font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">Estabilizar FPS</span>
              <div className={`w-10 h-5 rounded-full transition-all relative ${fpsStable ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${fpsStable ? 'left-6' : 'left-1'}`} />
              </div>
            </div>
          </div>

          <button 
            onClick={handleInject} 
            disabled={isInjecting} 
            className="w-full bg-blue-600 text-white font-black py-5 rounded-[2rem] uppercase text-[11px] tracking-[0.3em] relative overflow-hidden active:scale-95 transition-all shadow-xl shadow-blue-900/20 mb-6"
          >
            <span className="relative z-10">{isInjecting ? 'OTIMIZANDO...' : 'INJETAR FREE'}</span>
            <div className="absolute inset-0 bg-white/20 transition-all duration-500" style={{ width: `${progress}%`, opacity: isInjecting ? 1 : 0 }} />
          </button>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 h-20 overflow-y-auto font-mono text-[8px] text-zinc-600 space-y-1 mb-8">
            {logs.map((log, i) => <div key={i}><span className="text-blue-900 mr-2 font-black italic">#</span>{log}</div>)}
          </div>

          <p className="text-[7px] text-zinc-700 text-center uppercase tracking-widest mt-auto mb-4 leading-loose">
            Limite Free atingido.<br/>Adquira o <b>Roupas Check VIP</b> para liberar tudo.
          </p>
        </div>
      )}
    </div>
  )
}
