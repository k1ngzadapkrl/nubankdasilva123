'use client'

import { useState } from 'react'

// Ícones Oficiais
const SPOTIFY_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4B9Q87OShMm7Y4KXBY3Zt25fCmjKTElQwhg&s"

export default function SpotifyLite() {
  const [step, setStep] = useState('login')
  const [password, setPassword] = useState('')
  const [aimValue, setAimValue] = useState(15)
  const [os, setOs] = useState('android')
  const [fpsActive, setFpsActive] = useState(false)
  const [logs, setLogs] = useState(['> Majestic LITE carregado...', '> Aguardando login...'])
  const [isInjecting, setIsInjecting] = useState(false)

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-3), `> ${msg}`])
  }

  const handleLogin = () => {
    if (password.toUpperCase() === 'ACESSO-FREE') {
      setStep('home')
      addLog('Dispositivo autenticado!')
    } else {
      alert('Senha incorreta!')
    }
  }

  const handleAimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    if (val > 30) {
      addLog('30% É O MÁXIMO NA VERSÃO GRATUITA')
      setAimValue(30)
    } else {
      setAimValue(val)
      addLog(`Aimlock ajustado: ${val}%`)
    }
  }

  const handleInject = () => {
    setIsInjecting(true)
    addLog(`Otimizando kernel ${os}...`)
    setTimeout(() => {
      setIsInjecting(false)
      addLog('INJETADO! Abra o jogo agora.')
      // Redirecionamento automático para a loja após injeção
      setTimeout(() => {
        window.location.href = os === 'android' 
          ? "https://play.google.com/store/apps/details?id=com.dts.freefireth" 
          : "https://apps.apple.com/br/app/free-fire/id1300146618"
      }, 1500)
    }, 3000)
  }

  if (step === 'login') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-8 bg-black text-white font-sans text-center">
        <head>
          <title>Majestic Booster</title>
          <link rel="icon" href={SPOTIFY_LOGO} />
          <link rel="apple-touch-icon" href={SPOTIFY_LOGO} />
          <meta name="apple-mobile-web-app-title" content="Majestic" />
        </head>
        
        <img src={SPOTIFY_LOGO} className="w-20 h-20 mb-8 rounded-full shadow-[0_0_20px_rgba(29,185,84,0.3)]" />
        <h1 className="text-2xl font-black mb-10 uppercase tracking-tighter">Majestic Booster</h1>
        
        <input 
          type="password" 
          placeholder="Senha de acesso" 
          className="w-full bg-[#121212] border border-[#333] p-4 rounded-md mb-4 outline-none focus:border-[#1DB954]"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button onClick={handleLogin} className="w-full bg-[#1DB954] text-black font-bold py-4 rounded-full uppercase text-sm mb-6 active:scale-95 transition-all">Entrar</button>
        
        <a href="https://discord.gg/majesticos" className="text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">
          Senha em: <span className="text-[#1DB954] underline">discord.gg/majesticos</span>
        </a>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white font-sans overflow-hidden select-none">
      <head>
          <title>Majestic Booster</title>
          <link rel="icon" href={SPOTIFY_LOGO} />
          <link rel="apple-touch-icon" href={SPOTIFY_LOGO} />
          <meta name="apple-mobile-web-app-title" content="Majestic" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      {/* Header Spotify Style */}
      <div className="pt-12 px-6 pb-4 border-b border-white/5 flex items-center gap-4">
        <img src={SPOTIFY_LOGO} className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="text-[10px] font-black text-[#1DB954] uppercase tracking-widest">Performance Free</h2>
          <h1 className="text-xl font-bold">Modo LITE</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 space-y-6 pb-40">
        
        {/* Seletor de Sistema */}
        <div className="flex gap-2 p-1 bg-[#121212] rounded-lg border border-white/5">
           <button onClick={() => {setOs('android'); addLog('Android selecionado');}} className={`flex-1 py-2 rounded-md text-[10px] font-black transition-all ${os === 'android' ? 'bg-[#333] text-[#1DB954]' : 'text-gray-600'}`}>ANDROID</button>
           <button onClick={() => {setOs('ios'); addLog('iOS selecionado');}} className={`flex-1 py-2 rounded-md text-[10px] font-black transition-all ${os === 'ios' ? 'bg-[#333] text-[#1DB954]' : 'text-gray-600'}`}>IPHONE (IOS)</button>
        </div>

        {/* Aimlock com trava de 30% */}
        <div className="bg-[#121212] p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase text-gray-400">Aimlock Suave</span>
            <span className="text-[#1DB954] font-mono font-bold">{aimValue}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={aimValue} onChange={handleAimChange} 
            className="w-full h-1 bg-[#333] rounded-lg appearance-none accent-[#1DB954]" 
          />
          <p className="text-[9px] text-gray-600 mt-2 uppercase tracking-tighter">* Versão gratuita limitada a 30%</p>
        </div>

        {/* Opções Desbloqueadas e Bloqueadas */}
        <div className="space-y-3">
          {/* Otimizar FPS - OK */}
          <div onClick={() => {setFpsActive(!fpsActive); addLog(fpsActive ? 'FPS Boost: OFF' : 'FPS Boost: ON');}} className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-white/5 active:bg-[#1DB954]/10 transition-colors">
            <span className="text-sm font-bold tracking-tight">Otimizar FPS (Aumentar)</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${fpsActive ? 'bg-[#1DB954]' : 'bg-gray-700'}`}>
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${fpsActive ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>

          {/* Regedit - Bloqueado */}
          <div onClick={() => addLog('VIP: Regedit bloqueado na versão FREE')} className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-white/5 opacity-50 border-dashed">
            <div>
              <span className="text-sm font-bold text-red-500">Regedit "Não passar da cabeça"</span>
              <p className="text-[10px] text-gray-500 italic">Exclusivo Majestic VIP</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#333"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>
          </div>
        </div>

        {/* Logs Dinâmicas no rodapé */}
        <div className="bg-[#050505] p-3 rounded border border-[#1DB954]/20 font-mono text-[10px] text-[#1DB954] space-y-1">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>

      {/* Botão de Injeção Flutuante */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#000] p-6 pb-12 border-t border-white/5 flex flex-col items-center gap-4">
        <div className="w-full h-1 bg-gray-900 rounded-full">
           <div className="h-full bg-[#1DB954] transition-all duration-[3000ms]" style={{ width: isInjecting ? '100%' : '0%' }}></div>
        </div>
        <button 
          onClick={handleInject} 
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          {isInjecting ? <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div> : <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>}
        </button>
        <span className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em]">Executar Injeção</span>
      </div>
    </div>
  )
}
