'use client'

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
  showFinalButton // Certifique-se de passar isso do page.tsx
}: any) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col text-white z-20 overflow-y-auto pb-20">
      {/* Cabeçalho Profissional */}
      <header className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-30">
        <img src={NUBANK_LOGO} className="w-10" alt="Nu" />
        <div className="flex gap-2">
           <span className="text-[10px] bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full font-bold uppercase">{selectedOs}</span>
           <span className="text-[10px] bg-[#820AD1]/20 text-[#a33df5] px-3 py-1 rounded-full font-bold uppercase">{selectedGame === 'max' ? 'FF MAX' : 'FF NORMAL'}</span>
        </div>
      </header>
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 italic uppercase tracking-tighter">
          MENU <span className="text-[#820AD1]">INJECTOR</span>
        </h2>
        
        {/* Lista de Opções */}
        <div className="space-y-4">
          {Object.keys(opts).map((key) => (
            <div 
              key={key} 
              onClick={() => !isInjecting && !showFinalButton && setOpts((p: any) => ({...p, [key]: !p[key]}))} 
              className={`bg-[#111] p-5 rounded-2xl border border-zinc-900 flex justify-between items-center transition-all cursor-pointer ${isInjecting ? 'opacity-50' : 'active:scale-95'}`}
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

        {/* Botão de Ativação Principal */}
        <button 
          onClick={startInjection} 
          disabled={isInjecting || showFinalButton} 
          className="w-full bg-[#820AD1] text-white font-bold py-5 rounded-3xl mt-10 text-xs uppercase active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(130,10,209,0.3)]"
        >
          {isInjecting ? 'EXECUTANDO BYPASS...' : showFinalButton ? 'INJEÇÃO CONCLUÍDA' : 'ATIVAR TRAPAÇAS'}
        </button>

        {/* Console de Logs Estilizado */}
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

        {/* BOTÃO FINAL: Abre o jogo diretamente para resolver o bug do Android */}
        {showFinalButton && (
          <div className="mt-8 animate-in fade-in zoom-in duration-500 pb-10">
            <button 
onClick={() => {
  if (typeof window === 'undefined') return;

  // ================= ANDROID =================
  if (selectedOs === 'android') {
    const pkg =
      selectedGame === 'max'
        ? 'com.dts.freefiremax'
        : 'com.dts.freefireth';

    window.location.href = `intent://#Intent;package=${pkg};end`;

    setTimeout(() => {
      window.location.href =
        `https://play.google.com/store/apps/details?id=${pkg}`;
    }, 1500);

    return;
  }

  // ================= iOS =================
  const iosScheme =
    selectedGame === 'max'
      ? 'freefiremax://'
      : 'freefireth://';

  window.location.href = iosScheme;

  setTimeout(() => {
    window.location.href =
      selectedGame === 'max'
        ? 'https://apps.apple.com/app/id1480516829'
        : 'https://apps.apple.com/app/id1300146617';
  }, 1200);
}}
