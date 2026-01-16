'use client'
import { useState } from 'react'

export default function SenseSelect({ setView }: any) {
  const [showResult, setShowResult] = useState(false);
  const [selectedFamoso, setSelectedFamoso] = useState('Fantasma');
  const [selectedPrioridade, setSelectedPrioridade] = useState('Mais capa');

  // Banco de dados das sensibilidades
  const sensiData: any = {
    "Fantasma": { geral: 191, redDot: 166, m2x: 175, m4x: 149, awm: 165, olhadinha: 169, extra: "DPI: 600" },
    "Nobru": { geral: 94, redDot: 101, m2x: 90, m4x: 114, awm: 40, olhadinha: 40, extra: "DPI: 720" },
    "Two9": { geral: 100, redDot: 95, m2x: 88, m4x: 92, awm: 50, olhadinha: 50, extra: "DPI: 800" },
    "Marechal": { geral: 98, redDot: 92, m2x: 94, m4x: 100, awm: 30, olhadinha: 45, extra: "DPI: 550" },
  };

  const famosos = Object.keys(sensiData);
  const prioridades = ["Balanceada", "Mais capa", "Mais controle", "Muito rápida"];

  const currentSensi = sensiData[selectedFamoso] || sensiData["Fantasma"];

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] text-white p-6 z-50 overflow-y-auto">
        <button onClick={() => setShowResult(false)} className="mb-6 text-zinc-500 text-sm">← Voltar</button>
        
        <h2 className="text-[#ff6b00] font-bold text-xl mb-1">Sensi: {selectedFamoso}</h2>
        <p className="text-zinc-500 text-xs mb-6 font-medium">Estilo: {selectedPrioridade}</p>

        <div className="bg-[#1a1a1a] rounded-3xl p-2 border border-zinc-800/50">
          {[
            { label: "Geral", val: currentSensi.geral },
            { label: "Red Dot", val: currentSensi.redDot },
            { label: "Mira 2x", val: currentSensi.m2x },
            { label: "Mira 4x", val: currentSensi.m4x },
            { label: "AWM / Sniper", val: currentSensi.awm },
            { label: "Olhadinha", val: currentSensi.olhadinha },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 border-b border-zinc-800/30 last:border-0">
              <span className="text-zinc-300 font-medium">{item.label}</span>
              <span className="text-[#ff6b00] font-bold text-lg">{item.val}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#ff6b00]/10 border border-[#ff6b00]/20 rounded-2xl text-center">
          <p className="text-[#ff6b00] text-xs font-bold uppercase tracking-widest">Configuração Extra</p>
          <p className="text-white font-mono mt-1">{currentSensi.extra}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <button onClick={() => setShowResult(false)} className="bg-zinc-800 py-4 rounded-2xl font-bold text-xs uppercase">Gerar de novo</button>
          <button className="bg-zinc-800 py-4 rounded-2xl font-bold text-xs uppercase">Copiar tudo</button>
        </div>
        <button className="w-full bg-[#ff6b00] text-black font-bold py-4 rounded-2xl mt-3 uppercase text-xs">Salvar Sensi</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] text-[#e5e5e5] flex flex-col p-6 z-40 overflow-y-auto">
      <button onClick={() => setView('os')} className="mb-6 text-zinc-500 text-sm">← Voltar</button>
      <h2 className="text-zinc-400 text-sm mb-4 font-medium uppercase tracking-tighter">Configurações inspiradas nos pros</h2>

      {/* Seletor de Famoso */}
      <div className="bg-[#1a1a1a] p-5 rounded-3xl mb-4 border border-zinc-800/50 shadow-xl">
        <label className="text-[10px] text-zinc-500 mb-4 block uppercase font-bold">Sugestões rápidas:</label>
        <div className="flex flex-wrap gap-2">
          {famosos.map((nome) => (
            <button
              key={nome}
              onClick={() => setSelectedFamoso(nome)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedFamoso === nome 
                ? 'bg-[#ff6b00] border-[#ff6b00] text-black scale-105' 
                : 'bg-[#262626] border-zinc-800 text-zinc-400'
              }`}
            >
              {nome}
            </button>
          ))}
        </div>
      </div>

      {/* Seletor de Prioridade */}
      <div className="bg-[#1a1a1a] p-5 rounded-3xl mb-8 border border-zinc-800/50 shadow-xl">
        <label className="text-[10px] text-zinc-500 mb-4 block uppercase font-bold">O que você quer priorizar?</label>
        <div className="flex flex-wrap gap-2">
          {prioridades.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedPrioridade(item)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedPrioridade === item 
                ? 'bg-[#ff6b00] border-[#ff6b00] text-black scale-105' 
                : 'bg-[#262626] border-zinc-800 text-zinc-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setShowResult(true)}
        className="w-full bg-[#ff6b00] text-black font-extrabold py-5 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,107,0,0.3)] active:scale-95 transition-all mt-auto mb-4"
      >
        <span>✨</span> GERAR SENSI
      </button>
    </div>
  );
}
