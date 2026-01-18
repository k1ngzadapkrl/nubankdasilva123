'use client'
import { useState } from 'react'

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

export default function InjectionPanel({ 
  selectedOs, 
  selectedGame, 
  opts, 
  setOpts, 
  startInjection, 
  isInjecting, 
  showConsole, 
  logs,
  showFinalButton 
}: any) {

  const [activeTab, setActiveTab] = useState('aimbot')

  return (
    // Fundo Escuro com degradê sutil roxo
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#820AD1]/10 via-black to-black">
      
      {/* CARD FLUTUANTE */}
      <div className="w-full max-w-[360px] bg-[#0c0c0c] border border-zinc-800 rounded-[35px] p-6 shadow-2xl shadow-purple-900/20 relative overflow-hidden">
        
        {/* Badges de Status (Canto Superior Direito) */}
        <div className="absolute top-6 right-6 flex gap-2">
          <span className="bg-[#820AD1]/10 text-[#820AD1] text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-[#820AD1]/20">
            {selectedOs}
          </span>
          <span className="bg-zinc-900 text-zinc-500 text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-zinc-800">
            {selectedGame === 'max' ? 'MAX' : 'NORMAL'}
          </span>
        </div>

        {/* Cabeçalho com Logo */}
        <div className="flex items-center gap-3 mb-6 mt-1">
          <div className="w-11 h-11 bg-[#820AD1] rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(130,10,209,0.4)]">
             <img src={NUBANK_LOGO} className="w-6 invert brightness-0" alt="Nu" />
          </div>
          <div>
            <h2 className="text-white font-black text-lg leading-none">AUXILIO</h2>
            <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">By @SleepFFZ</span>
          </div>
        </div>

        {/* Abas (Visual) */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-[#111] p-1 rounded-xl border border-zinc-900">
          <button 
            onClick={() => setActiveTab('aimbot')}
            className={`py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'aimbot' ? 'bg-[#820AD1] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Aimbot
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'info' ? 'bg-[#820AD1] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Info
          </button>
        </div>

        {/* Conteúdo das Opções */}
        <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {activeTab === 'aimbot' ? (
            Object.keys(opts).map((key) => (
              <div 
                key={key} 
                onClick={() => !isInjecting && !showFinalButton && setOpts((p: any) => ({...p, [key]: !p[key]}))} 
                className={`group flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer ${opts[key] ? 'bg-[#151515] border-[#820AD1]/40' : 'bg-[#0f0f0f] border-zinc-900 hover:border-zinc-700'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${opts[key] ? 'bg-[#820AD1]' : 'bg-zinc-900'}`}>
                    {opts[key] && <span className="text-white text-[9px] font-bold">✓</span>}
                  </div>
                  <span className={`text-xs font-bold capitalize ${opts[key] ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500 text-xs py-10">
              Informações do script v2.0<br/>Status: <span className="text-emerald-500">Undetected</span>
            </div>
          )}
        </div>

        {/* Console de Logs (Integrado ao Card) */}
        {showConsole && (
          <div className="mb-4 bg-black/50 p-3 rounded-xl border border-dashed border-zinc-800 font-mono text-[9px] h-24 overflow-y-auto">
             {logs.map((l: string, i: number) => (
              <div key={i} className={`mb-1 truncate ${l.includes('sucesso') ? 'text-emerald-400' : 'text-zinc-400'}`}>
                {l}
              </div>
            ))}
            {isInjecting && <span className="animate-pulse text-[#820AD1]">_</span>}
          </div>
        )}

        {/* ÁREA DOS BOTÕES DE AÇÃO */}
        <div className="mt-auto">
          {!showFinalButton ? (
            <button 
              onClick={startInjection} 
              disabled={isInjecting} 
              className="w-full bg-[#820AD1] hover:bg-[#991ee8] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_-10px_rgba(130,10,209,0.5)]"
            >
              {isInjecting ? 'Injetando...' : 'Injetar Funções'}
            </button>
          ) : (
            // BOTÃO VERDE FINAL (Sua lógica exata aqui)
            <div className="animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => {
                  if (typeof window === 'undefined') return;

                  // Lógica ANDROID
                  if (selectedOs === 'android') {
                    const pkg = selectedGame === 'max' ? 'com.dts.freefiremax' : 'com.dts.freefireth';
                    
                    // URL Intent Específica
                    window.location.href = `intent://launch/#Intent;scheme=${pkg.includes('max') ? 'freefiremax' : 'freefireth'};package=${pkg};end`;
                    return;
                  }

                  // Lógica iOS
                  const iosScheme = selectedGame === 'max' ? 'freefiremax://' : 'freefireth://';
                  window.location.href = iosScheme;
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] active:scale-95 transition-all"
              >
                <span className="text-sm uppercase tracking-widest">ABRIR FREE FIRE</span>
                <span className="text-[9px] opacity-80 font-normal mt-0.5">Clique para finalizar</span>
              </button>
              
              <p className="text-center text-zinc-600 text-[8px] mt-3 uppercase font-bold tracking-widest opacity-60">
                Sincronização 100% Concluída
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
