'use client'

import { useState } from 'react'
import { haptics } from '../utils/haptics'
import { toggleBackgroundMusic } from '../utils/backgroundMusic'

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

export default function Login({ password, setPassword, handleLogin }: any) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)

  const handleMusicToggle = () => {
    haptics.light()
    toggleBackgroundMusic()
    setIsMusicPlaying(!isMusicPlaying)
  }

  return (
    <div className="fixed inset-0 bg-[#070707] flex flex-col p-8 z-30 overflow-y-auto animate-in fade-in duration-500">
      {/* Botão de Som no canto superior direito */}
      <button
        onClick={handleMusicToggle}
        className="absolute top-8 right-8 text-zinc-500 hover:text-[#820AD1] transition-colors text-lg"
        title={isMusicPlaying ? 'Desativar música' : 'Ativar música'}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      <div className="mt-12 mb-10 animate-in slide-in-from-top duration-700">
        <img src={NUBANK_LOGO} className="w-12 animate-pulse" alt="Nu" />
      </div>

      {/* --- INÍCIO DO ALERTA DE GOLPE --- */}
      <div className="bg-[#1a0524] border border-[#820AD1] p-5 rounded-2xl mb-8 shadow-[0_0_25px_rgba(130,10,209,0.15)] animate-in fade-in zoom-in duration-500 delay-100">
        <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          ⚠️ ALERTA DE SEGURANÇA
        </p>
        <p className="text-zinc-300 text-[11px] leading-relaxed font-medium">
          Se você comprou em outro lugar a não ser a <strong className="text-[#820AD1] font-black">MAJESTIC</strong> você foi roubado e será banido em breve de todos os produtos.
        </p>
        <div className="mt-4 pt-3 border-t border-zinc-800/50">
          <p className="text-zinc-500 text-[9px] uppercase font-bold mb-2">Denuncie e ganhe uma key correta:</p>
          <a 
            href="https://discord.gg/majesticos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#820AD1] text-xs font-black underline decoration-2 underline-offset-4"
          >
            discord.gg/majesticos
          </a>
        </div>
      </div>
      {/* --- FIM DO ALERTA --- */}

      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight animate-in slide-in-from-left duration-700 delay-200">Olá, VIP</h1>
      <p className="text-zinc-500 text-xs mb-6 animate-in slide-in-from-left duration-700 delay-300">Insira sua credencial para acessar o painel.</p>

      <input 
        type="text" 
        placeholder="CHAVE DE ACESSO" 
        className="w-full bg-transparent border-b border-zinc-800 p-4 text-white outline-none uppercase font-mono tracking-widest focus:border-[#820AD1] transition-colors animate-in fade-in duration-700 delay-400" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />

      <button 
        onClick={() => {
          haptics.medium();
          handleLogin();
        }} 
        className="w-full bg-[#820AD1] hover:bg-[#9414e4] text-white font-black py-5 rounded-full mt-10 uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all hover:shadow-[0_10px_30px_-10px_rgba(130,10,209,0.5)] animate-in slide-in-from-bottom duration-700 delay-500"
      >
        AUTENTICAR SISTEMA
      </button>

      <p className="mt-auto pt-10 text-center text-zinc-700 text-[9px] font-bold uppercase tracking-[0.3em] animate-in fade-in duration-1000 delay-700">
        Majestic Security System v4.0
      </p>
    </div>
  )
}
