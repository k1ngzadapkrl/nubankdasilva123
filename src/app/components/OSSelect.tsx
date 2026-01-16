'use client'

export default function OSSelect({ setSelectedOs, setView }: any) {
  return (
    <div className="fixed inset-0 bg-[#070707] flex flex-col justify-center p-8 z-25">
      <h2 className="text-white text-center mb-8 font-bold text-xl uppercase tracking-widest">Selecione o Sistema</h2>
      <div className="space-y-4">
        <button onClick={() => { setSelectedOs('android'); setView('version_select'); }} className="w-full bg-[#111] p-6 rounded-2xl flex justify-between text-white font-bold border border-zinc-900 active:bg-[#1a1a1a]">
          <span>ANDROID</span><span>→</span>
        </button>
        <button onClick={() => { setSelectedOs('ios'); setView('version_select'); }} className="w-full bg-[#111] p-6 rounded-2xl flex justify-between text-white font-bold border border-zinc-900 active:bg-[#1a1a1a]">
          <span>IOS</span><span>→</span>
        </button>
        
        {/* NOVO BOTÃO DE SENSIBILIDADE */}
        <button onClick={() => setView('sense_select')} className="w-full bg-[#820AD1]/10 p-6 rounded-2xl flex justify-between text-[#a33df5] font-bold border border-[#820AD1]/30 active:bg-[#820AD1]/20">
          <span>SENSIBILIDADE DOS FAMOSOS</span><span>⭐</span>
        </button>
      </div>
    </div>
  )
}
