'use client'

import { useState, useEffect } from 'react'
import { VALID_KEYS } from './components/Keys'
import { haptics } from './utils/haptics'
import { playBackgroundMusic } from './utils/backgroundMusic'
import Login from './components/Login'
import DeviceAnalysis from './components/DeviceAnalysis'
import OSSelect from './components/OSSelect'
import VersionSelect from './components/VersionSelect'
import InjectionPanel from './components/InjectionPanel'
import SenseSelect from './components/SenseSelect'
import ErrorView from './components/ErrorView'

export default function NubankVipSystem() {
  // Corrigi a lista de telas abaixo para incluir 'sense_select' e 'device_analysis'
  const [view, setView] = useState<'splash' | 'error' | 'login' | 'device_analysis' | 'os' | 'version_select' | 'panel' | 'sense_select'>('splash')
  const [password, setPassword] = useState('')
  const [selectedOs, setSelectedOs] = useState<'android' | 'ios'>('android')
  const [selectedGame, setSelectedGame] = useState<'normal' | 'max'>('normal')
  const [isInjecting, setIsInjecting] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showConsole, setShowConsole] = useState(false)
  const [opts, setOpts] = useState({ HeadLock: false, Tracking2x: false, Precision: false, AimFix: false })
  const [showFinalButton, setShowFinalButton] = useState(false);

  // Lógica de Splash Screen
  useEffect(() => {
    // Inicia música de fundo
    playBackgroundMusic();
    
    const timer = setTimeout(() => { 
      if (view === 'splash') setView('error') 
    }, 3000)
    return () => clearTimeout(timer)
  }, [view])

  const handleLogin = async () => {
    if (!VALID_KEYS.includes(password.toUpperCase())) {
      haptics.error();
      alert("CHAVE INVÁLIDA")
      return
    }

    try {
      // Faz a chamada ao endpoint de autenticação
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: password.toUpperCase() })
      })

      const data = await response.json()

      if (data.success) {
        haptics.success();
        setView('device_analysis') // Muda para análise antes de ir para OS
      } else {
        haptics.error();
        alert(data.message || "Erro na autenticação")
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error)
      haptics.error();
      alert("Erro ao conectar com o servidor")
    }
  }

  const startInjection = () => {
    setIsInjecting(true);
    setShowConsole(true);
    setShowFinalButton(false);
    setLogs([]);

    // Gera logs baseado nas opções ativadas
    const activeOptions = Object.keys(opts).filter(key => opts[key]);
    
    let sequence: string[] = [];

    if (activeOptions.length === 0) {
      // Se nenhuma opção foi ativada
      sequence = [
        "Verificando configurações...",
        "⚠️ Nenhum módulo selecionado",
        "❌ Nenhum arquivo alterado",
        "Sistema pronto para uso padrão"
      ];
    } else {
      // Se tem opções ativadas
      sequence = ["Iniciando processo de injeção..."];
      
      activeOptions.forEach(option => {
        const formattedName = option.replace(/([A-Z])/g, ' $1').trim();
        sequence.push(`🔄 Carregando módulo ${formattedName}...`);
        sequence.push(`✅ ${formattedName} injetado com sucesso`);
      });
      
      sequence.push("Calibrando sistema...");
      sequence.push("🎯 Todos os módulos ativados!");
      sequence.push("✨ Injeção concluída com sucesso!");
    }

    sequence.forEach((text, i) => {
      setTimeout(() => {
        haptics.light(); // Vibra a cada log
        setLogs(prev => [...prev, text]);
        if (i === sequence.length - 1) {
          setIsInjecting(false);
          setShowFinalButton(true);
          haptics.success(); // Vibração de sucesso no final
        }
      }, (i + 1) * 800); // Reduzido de 1200 para 800ms para ser mais rápido
    });
  };

  return (
    <main>
      {view === 'splash' && (
        <div className="fixed inset-0 bg-[#820AD1] flex items-center justify-center">
          <img src="https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png" className="w-24 animate-pulse" />
        </div>
      )}

      {view === 'error' && <ErrorView setView={setView} />}

      {/* Login renderizado apenas uma vez aqui */}
      {view === 'login' && (
        <Login password={password} setPassword={setPassword} handleLogin={handleLogin} />
      )}

      {view === 'device_analysis' && (
        <DeviceAnalysis setView={setView} />
      )}

      {view === 'os' && (
        <OSSelect setSelectedOs={setSelectedOs} setView={setView} />
      )}

      {view === 'sense_select' && (
        <SenseSelect setView={setView} />
      )}

      {view === 'version_select' && (
        <VersionSelect setSelectedGame={setSelectedGame} setView={setView} />
      )}

      {view === 'panel' && (
        <InjectionPanel 
          selectedOs={selectedOs} 
          selectedGame={selectedGame}
          opts={opts} 
          setOpts={setOpts} 
          startInjection={startInjection} 
          isInjecting={isInjecting} 
          showConsole={showConsole} 
          logs={logs}
          showFinalButton={showFinalButton}
          setView={setView}
        />
      )}
    </main>
  )
}
