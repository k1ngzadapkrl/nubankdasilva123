'use client'
import { useState, useEffect } from 'react'
import { haptics } from '../utils/haptics'

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png"

// Função para reproduzir som de sucesso (com suporte para iOS)
const playSuccessSound = () => {
  try {
    // Tenta usar Web Audio API
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) throw new Error('AudioContext não suportado');
    
    const audioContext = new AudioContext();
    
    // Resume context se necessário (iOS requer interação do usuário)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const now = audioContext.currentTime;
    
    // Cria osciladores
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';
    
    // Frequências para som de sucesso maior (acordes em C maior)
    osc1.frequency.setValueAtTime(261.63, now); // Dó (C4)
    osc2.frequency.setValueAtTime(329.63, now); // Mi (E4)
    osc3.frequency.setValueAtTime(392.00, now); // Sol (G4)
    
    // Volume mais alto para iOS
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    // Conecta ao destino
    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(audioContext.destination);
    
    // Toca o som
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
    osc3.stop(now + 0.6);
    
  } catch (webAudioError) {
    // Fallback: Tenta usar áudio externo
    try {
      // Som hospedado online (sucesso genérico)
      const audio = new Audio();
      audio.volume = 0.7;
      // Usando um som sucesso do OpenGameArt (CC0)
      audio.src = 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_76dac7aa70.mp3';
      audio.play().catch(() => {
        // Se falhar, usa vibração como feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([150, 100, 150]);
        }
      });
    } catch (audioError) {
      // Último fallback: vibração forte
      if ('vibrate' in navigator) {
        navigator.vibrate([150, 100, 150]);
      }
    }
  }
};

export default function InjectionPanel({ 
  selectedOs, 
  selectedGame, 
  opts, 
  setOpts, 
  startInjection, 
  isInjecting, 
  showConsole, 
  logs,
  showFinalButton,
  setView 
}: any) {

  const [activeTab, setActiveTab] = useState('aimbot')

  // Efeito para carregar as partículas
  useEffect(() => {
    const loadParticles = async () => {
      // Verifica se o script já existe para não carregar 2x
      if (!document.getElementById('particles-lib')) {
        const script = document.createElement('script');
        script.id = 'particles-lib';
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
          // @ts-ignore
          if (window.particlesJS) {
            // @ts-ignore
            window.particlesJS("particles-js", {
              "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#820AD1" }, // COR ROXA DAS BOLINHAS
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#820AD1", // COR ROXA DAS LINHAS
                  "opacity": 0.4,
                  "width": 1
                },
                "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": { "enable": true, "mode": "grab" },
                  "onclick": { "enable": true, "mode": "push" },
                  "resize": true
                },
                "modes": {
                  "grab": { "distance": 140, "line_linked": { "opacity": 1 } }
                }
              },
              "retina_detect": true
            });
          }
        };
        document.body.appendChild(script);
      }
    };

    loadParticles();
  }, []);

  // Toca som quando o botão final aparece
  useEffect(() => {
    if (showFinalButton) {
      // Pequeno delay para deixar mais fluido
      setTimeout(() => playSuccessSound(), 100);
    }
  }, [showFinalButton]);

  return (
    // Container Principal (Tela Inteira)
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      
      {/* 1. FUNDO PRETO SÓLIDO (Para tapar o site atrás) */}
      <div className="absolute inset-0 bg-black/95 z-0 animate-in fade-in duration-300" />

      {/* 2. FUNDO DE PARTÍCULAS (ID particles-js é obrigatório) */}
      <div id="particles-js" className="absolute inset-0 z-0 opacity-60 animate-in fade-in duration-700" />

      {/* 3. CARD FLUTUANTE (Conteúdo) */}
      <div className="relative z-10 w-full max-w-[360px] bg-[#0c0c0c]/90 backdrop-blur-xl border border-zinc-800 rounded-[35px] p-6 shadow-[0_0_50px_rgba(130,10,209,0.15)] overflow-hidden m-4 animate-in zoom-in slide-in-from-bottom duration-500">
        
        {/* Badges de Status */}
        <div className="absolute top-6 right-6 flex gap-2">
          <span className="bg-[#820AD1]/10 text-[#820AD1] text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-[#820AD1]/20">
            {selectedOs}
          </span>
          <span className="bg-zinc-900 text-zinc-500 text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-zinc-800">
            {selectedGame === 'max' ? 'MAX' : 'NORMAL'}
          </span>
        </div>

        {/* Botão Voltar */}
        {!isInjecting && !showFinalButton && (
          <button 
            onClick={() => { haptics.light(); setView('version_select'); }} 
            className="absolute top-6 left-6 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold hover:scale-110 duration-200 animate-in fade-in slide-in-from-left"
          >
            <span>←</span> Voltar
          </button>
        )}

        {/* Cabeçalho com Logo */}
        <div className="flex items-center gap-3 mb-6 mt-1 animate-in slide-in-from-top duration-500 delay-100">
          <div className="w-11 h-11 bg-[#820AD1] rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(130,10,209,0.4)]">
             <img src={NUBANK_LOGO} className="w-6 invert brightness-0" alt="Nu" />
          </div>
          <div>
            <h2 className="text-white font-black text-lg leading-none">AUXILIO</h2>
            {/* NOME ATUALIZADO AQUI */}
            <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">By @MAJESTIC</span>
          </div>
        </div>

        {/* Abas */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-[#111] p-1 rounded-xl border border-zinc-900 animate-in fade-in duration-500 delay-200">
          <button 
            onClick={() => {
              haptics.light();
              setActiveTab('aimbot');
            }}
            className={`py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'aimbot' ? 'bg-[#820AD1] text-white shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Aimbot
          </button>
          <button 
            onClick={() => {
              haptics.light();
              setActiveTab('info');
            }}
            className={`py-2.5 rounded-lg font-bold text-xs transition-all ${activeTab === 'info' ? 'bg-[#820AD1] text-white shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Info
          </button>
        </div>

        {/* Lista de Opções */}
        <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {activeTab === 'aimbot' ? (
            Object.keys(opts).map((key, index) => (
              <div 
                key={key} 
                onClick={() => {
                  if (!isInjecting && !showFinalButton) {
                    haptics.light();
                    setOpts((p: any) => ({...p, [key]: !p[key]}));
                  }
                }} 
                className={`group flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer animate-in fade-in duration-300 ${opts[key] ? 'bg-[#151515] border-[#820AD1]/40 scale-102' : 'bg-[#0f0f0f] border-zinc-900 hover:border-zinc-700'}`}
                style={{ animationDelay: `${index * 50}ms` }}
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
              Versão Privada v3.0<br/>
              Developed by <span className="text-[#820AD1] font-bold">MAJESTIC</span>
            </div>
          )}
        </div>

        {/* Console */}
        {showConsole && (
          <div className="mb-4 bg-black/50 p-3 rounded-xl border border-dashed border-zinc-800 font-mono text-[9px] h-24 overflow-y-auto animate-in slide-in-from-bottom duration-500">
             {logs.map((l: string, i: number) => (
              <div key={i} className={`mb-1 truncate animate-in slide-in-from-left duration-300 ${l.includes('sucesso') || l.includes('✅') ? 'text-emerald-400' : l.includes('❌') ? 'text-red-400' : l.includes('⚠️') ? 'text-yellow-400' : 'text-zinc-400'}`}>
                {l}
              </div>
            ))}
            {isInjecting && <span className="animate-pulse text-[#820AD1]">_</span>}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-auto">
          {!showFinalButton ? (
            <button 
              onClick={() => {
                haptics.heavy();
                startInjection();
              }} 
              disabled={isInjecting} 
              className="w-full bg-[#820AD1] hover:bg-[#991ee8] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_-10px_rgba(130,10,209,0.5)] z-20 relative hover:shadow-[0_15px_40px_-5px_rgba(130,10,209,0.6)] animate-in slide-in-from-bottom duration-500 delay-300"
            >
              {isInjecting ? 'Injetando...' : 'Injetar Funções'}
            </button>
          ) : (
            <div className="animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => {
                  haptics.success();
                  if (typeof window === 'undefined') return;
                  if (selectedOs === 'android') {
                    const pkg = selectedGame === 'max' ? 'com.dts.freefiremax' : 'com.dts.freefireth';
                    window.location.href = `intent://launch/#Intent;scheme=${pkg.includes('max') ? 'freefiremax' : 'freefireth'};package=${pkg};end`;
                    return;
                  }
                  const iosScheme = selectedGame === 'max' ? 'freefiremax://' : 'freefireth://';
                  window.location.href = iosScheme;
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] active:scale-95 transition-all z-20 relative hover:shadow-[0_15px_40px_-5px_rgba(16,185,129,0.6)]"
              >
                <span className="text-sm uppercase tracking-widest">ABRIR FREE FIRE</span>
                <span className="text-[9px] opacity-80 font-normal mt-0.5">Clique para finalizar</span>
              </button>
              
              <p className="text-center text-zinc-600 text-[8px] mt-3 uppercase font-bold tracking-widest opacity-60">
                Bypass Majestic Ativado
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
