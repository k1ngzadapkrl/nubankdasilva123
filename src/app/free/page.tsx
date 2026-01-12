'use client'

import { useState } from 'react'

const SPOTIFY_GREEN = '#1DB954'
const BG_GRADIENT = 'linear-gradient(180deg, #222222 0%, #121212 100%)'

export default function SpotifyLite() {
  const [injections, setInjections] = useState(0)
  const [isInjecting, setIsInjecting] = useState(false)

  function handleAction() {
    if (injections >= 1) {
      alert("LIMITE DE TESTE: Sua demonstração gratuita expirou. Adquira a versão PRO para continuar.")
      window.location.href = "https://discord.gg/majesticos"
      return
    }

    setIsInjecting(true)
    setTimeout(() => {
      setIsInjecting(false)
      setInjections(1)
      alert("OTIMIZAÇÃO LITE APLICADA: FPS Boost ativado com sucesso!")
    }, 2500)
  }

  return (
    <div className="fixed inset-0 flex flex-col text-white select-none overflow-hidden"
      style={{ background: BG_GRADIENT, fontFamily: 'sans-serif' }}>
      
      {/* Header Estilo Spotify */}
      <div className="pt-12 px-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2">
          <svg viewBox="0 0 24 24" fill={SPOTIFY_GREEN}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.491 17.293c-.215.354-.675.465-1.028.249-2.858-1.746-6.456-2.14-10.704-1.166-.406.092-.812-.163-.905-.569-.092-.405.163-.811.569-.904 4.643-1.063 8.625-.611 11.819 1.341.353.216.464.676.249 1.029zm1.465-3.264c-.269.437-.837.581-1.275.312-3.269-2.008-8.254-2.592-12.118-1.419-.49.149-1.01-.131-1.159-.621-.149-.491.131-1.01.621-1.159 4.417-1.34 9.907-.692 13.62 1.587.437.269.582.838.312 1.275zm.128-3.414c-3.92-2.327-10.379-2.541-14.135-1.401-.601.182-1.238-.166-1.42-.767-.182-.601.166-1.238.767-1.42 4.316-1.309 11.45-1.053 15.961 1.624.54.32.715 1.014.395 1.554-.319.54-1.013.715-1.554.395z"/></svg>
        </div>
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-widest text-gray-400">Playlist</h2>
          <h1 className="text-2xl font-bold">Majestic Audio Booster</h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-[14px] font-bold mb-4">Configurações de Reprodução (LITE)</div>
        
        {/* Itens que parecem áudio, mas são o painel */}
        <div className="space-y-6">
          <div className="flex justify-between items-center opacity-40">
            <div>
              <div className="font-medium text-[15px]">Aim-Assist (High Fidelity)</div>
              <div className="text-[12px] text-gray-400">Somente para usuários Premium</div>
            </div>
            <div className="w-10 h-5 bg-gray-600 rounded-full relative">
               <div className="absolute left-1 top-1 w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-[15px]">Equalizador de FPS (Turbo)</div>
              <div className="text-[12px] text-gray-400">Melhora a fluidez do motor gráfico</div>
            </div>
            <div className="w-10 h-5 bg-[#1db954]/20 rounded-full relative border border-[#1db954]/50">
               <div className="absolute right-1 top-1 w-3 h-3 bg-[#1db954] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Player de Música fake que é o botão de Injetar */}
      <div className="bg-[#181818] p-6 pb-12 border-t border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-800 rounded shadow-lg overflow-hidden">
             <img src="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-3.png" className="w-full h-full object-cover grayscale opacity-30" alt="" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold truncate">Injeção Majestic Lite.exe</div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
              {isInjecting ? 'Sincronizando...' : injections > 0 ? 'Sessão Expirada' : 'Aguardando Play'}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-white transition-all duration-[2500ms]" style={{ width: isInjecting ? '100%' : '0%' }}></div>
          </div>
          
          <button 
            onClick={handleAction}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-xl"
          >
            {isInjecting ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          
          <div className="text-[11px] text-gray-500 font-bold uppercase mt-2">
            {injections > 0 ? 'Clique para adquirir o PRO' : 'Toque no Play para testar'}
          </div>
        </div>
      </div>
    </div>
  )
}
