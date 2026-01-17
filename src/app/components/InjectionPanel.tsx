'use client'

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

export default function InjectionPanel({ selectedOs, selectedGame, opts, setOpts, startInjection, isInjecting, showConsole, logs }: any) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col text-white z-20 overflow-y-auto">
      <header className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0">
        <img src={NUBANK_LOGO} className="w-10" alt="Nu" />
        <div className="flex gap-2">
           <span className="text-[10px] bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full font-bold uppercase">{selectedOs}</span>
           <span className="text-[10px] bg-[#820AD1]/20 text-[#a33df5] px-3 py-1 rounded-full font-bold uppercase">{selectedGame}</span>
        </div>
      </header>
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 italic uppercase tracking-tighter">
          MENU <span className="text-[#820AD1]">INJECTOR</span>
        </h2>
        
        <div className="space-y-4">
          {Object.keys(opts).map((key) => (
            <div 
              key={key} 
              onClick={() => setOpts((p: any) => ({...p, [key]: !p[key]}))} 
              className="bg-[#111] p-5 rounded-2xl border border-zinc-900 flex justify-between items-center transition-all cursor-pointer active:scale-95"
            >
              <span className="text-sm font-bold capitalize text-zinc-300">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${opts[key] ? 'bg-[#820AD1] border-[#820AD1]' : 'border-zinc-800'}`}>
                {opts[key] && <span className="text-white text-xs">✓</span>}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={startInjection} 
          disabled={isInjecting} 
          className="w-full bg-[#820AD1] text-white font-bold py-5 rounded-3xl mt-10 text-xs uppercase active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(130,10,209,0.3)]"
        >
          {isInjecting ? 'EXECUTANDO BYPASS...' : 'ATIVAR TRAPAÇAS'}
        </button>

        {showConsole && (
          <div className="mt-6 bg-[#0a0a0a] p-4 font-mono text-[10px] rounded-xl border border-zinc-900 shadow-inner">
            {logs.map((l: string, i: number) => (
              <div key={i} className={`mb-1 font-bold tracking-tight ${l.includes('sucesso') ? 'text-emerald-500' : 'text-zinc-400'}`}>
                {l.includes('sucesso') ? "[COMPLETO]" : "[OK]"} # {l}
              </div>
            ))}
            {isInjecting && <div className="animate-pulse text-[#820AD1] mt-2">_ SYSTEM PROCESSING...</div>}
          </div>
        )}
      </div>
    </div>
  )
}
