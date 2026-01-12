'use client'

import { useState } from 'react'

const ICON_MUSIC = "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"

export default function MusicFree() {
  const [step, setStep] = useState('login')
  const [password, setPassword] = useState('')
  const [aimValue, setAimValue] = useState(15)
  const [os, setOs] = useState<'android' | 'ios'>('ios')
  const [isInjecting, setIsInjecting] = useState(false)
  const [logs, setLogs] = useState(['> Player carregado...', '> Aguardando login...'])

  const handleLogin = () => {
    // Mantendo a lógica de acesso da versão Free
    if (password.toUpperCase() === 'ACESSO-FREE') {
      setStep('home')
      setLogs(prev => [...prev, '> Sessão iniciada (Versão Free)'])
    } else {
      alert('Chave inválida!')
    }
  }

  const handleInject = () => {
    setIsInjecting(true)
    setLogs(prev => [...prev, '> Iniciando injeção lite...'])
    
    // Simulação de passos de injeção
    const steps = [
      "> Otimizando buffer de áudio...",
      "> Ajustando latência de entrada...",
      "> SUCESSO! Abrindo aplicação..."
    ]

    steps.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
        if (i === steps.length - 1) {
          setTimeout(() => {
            // Redirecionamento automático após os logs
            if (os === 'android') {
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
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
      <head>
        <title>Music Player</title>
        <meta name="apple-mobile-web-app-title" content="Music" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
      </head>

      {step === 'login' ? (
        <div className="flex flex-col h-full items-center justify-center p-8 text-center animate-in fade-in">
          <img src={ICON_MUSIC} className="w-20 h-20 mb-8 opacity-50" />
          <h1 className="text-2xl font-black mb-10 tracking-tighter uppercase">Music Booster</h1>
          <input 
            type="password" placeholder="Chave de Acesso" 
            className="w-full bg-[#121212] border border-[#333] p-4 rounded-xl mb-4 outline-none focus:border-[#1DB954] text-center"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-[#1DB954] text-black font-bold py-4 rounded-full uppercase text-xs tracking-widest active:scale-95 transition-all">
            Entrar
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full pt-12 px-6 animate-in fade-in">
           <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
               <img src={ICON_MUSIC} className="w-10 h-10 opacity-50" />
               <h1 className="text-xl font-bold">Performance LITE</h1>
             </div>
             {/* Seletor simples de OS para saber qual loja abrir */}
             <select 
              value={os} 
              onChange={(e) => setOs(e.target.value as any)}
              className="bg-transparent text-[10px] font-bold uppercase border border-white/10 rounded px-2 py-1 outline-none"
             >
               <option value="ios" className="bg-black">iOS</option>
               <option value="android" className="bg-black">Android</option>
             </select>
           </div>
           
           <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Aimlock Soft</span>
                <span className="text-[#1DB954] font-bold">{aimValue}%</span>
              </div>
              <input type="range" min="0" max="100" value={aimValue} onChange={(e) => {
                const v = parseInt(e.target.value);
                setAimValue(v > 30 ? 30 : v);
              }} className="w-full h-1 bg-[#333] appearance-none accent-[#1DB954]" />
           </div>

           {/* Botão Injetar Adicionado */}
           <button 
             onClick={handleInject}
             disabled={isInjecting}
             className="w-full bg-[#1DB954] text-black font-black py-5 rounded-2xl uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-[#1DB954]/20 active:scale-95 transition-all mb-6 disabled:opacity-50"
           >
             {isInjecting ? 'Processando...' : 'Injetar no Jogo'}
           </button>

           {/* Console de Logs para passar credibilidade */}
           <div className="bg-[#080808] p-4 rounded-xl border border-white/5 font-mono text-[9px] text-gray-500 space-y-1 mb-4 h-24 overflow-y-auto">
             {logs.map((log, i) => <div key={i}>{log}</div>)}
           </div>
           
           <p className="text-[9px] text-gray-500 text-center uppercase tracking-widest mt-auto pb-10">Versão Free: Recursos Limitados</p>
        </div>
      )}
    </div>
  )
}
