'use client'

export default function ErrorView({ setView }: { setView: (v: any) => void }) {
  return (
    <div className="fixed inset-0 bg-[#070707] flex flex-col items-center justify-center p-8 text-center">
      {/* Ícone de Alerta Discreto */}
      <div className="w-16 h-16 bg-zinc-900 rounded-full mb-6 flex items-center justify-center text-zinc-700 font-bold text-2xl">
        !
      </div>
      
      <h2 className="text-white text-xl font-bold mb-2">Sistema Indisponível</h2>
      
      <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
        Ocorreu um erro de conexão com nossos servidores. <br />
        Por favor, tente novamente mais <span 
          onClick={() => setView('login')} 
          className="text-zinc-800 cursor-default active:text-zinc-700"
        >tarde</span>.
      </p>

      <button 
        onClick={() => window.location.reload()}
        className="w-full py-4 bg-[#111] border border-zinc-900 rounded-2xl text-zinc-400 font-bold text-xs uppercase"
      >
        TENTAR RECONECTAR
      </button>
    </div>
  )
}
