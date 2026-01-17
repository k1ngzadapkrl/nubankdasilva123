
'use client'

import { useState, useEffect } from 'react'
import { VALID_KEYS } from './components/Keys'
import Login from './components/Login'
import OSSelect from './components/OSSelect'
import VersionSelect from './components/VersionSelect'
import InjectionPanel from './components/InjectionPanel'
import SenseSelect from './components/SenseSelect'
import ErrorView from './components/ErrorView'

export default function NubankVipSystem() {
  const [view, setView] = useState<'splash' | 'error' | 'login' | 'os' | 'version_select' | 'panel'>('splash')
  const [password, setPassword] = useState('')
  const [selectedOs, setSelectedOs] = useState<'android' | 'ios'>('android')
  const [selectedGame, setSelectedGame] = useState<'normal' | 'max'>('normal')
  const [isInjecting, setIsInjecting] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showConsole, setShowConsole] = useState(false)
  const [opts, setOpts] = useState({ assistLock: true, noRecoil: true, fpsBoost: false, precisionAim: false })
  const [showFinalButton, setShowFinalButton] = useState(false);


  // Splash Screen e Erro
 useEffect(() => {
  const timer = setTimeout(() => { 
    if (view === 'splash') setView('error') 
  }, 3000)
  return () => clearTimeout(timer)
}, [view])

  const handleLogin = () => {
    if (VALID_KEYS.includes(password.toUpperCase())) setView('os')
    else alert("CHAVE INVÁLIDA")
  }

const startInjection = () => {
  setIsInjecting(true);
  setShowConsole(true);
  setShowFinalButton(false); // 🔴 esconde o botão no início
  setLogs([]);

  const sequence = [
    "Injetando configurações nos ajustes...",
    "Injetando lib...",
    "Calibrando screen...",
    "Detectando arquivos...",
    "Arquivos substituídos com sucesso!"
  ];

  sequence.forEach((text, i) => {
    setTimeout(() => {
      setLogs(prev => [...prev, text]);

      // ✅ quando terminar a sequência
      if (i === sequence.length - 1) {
        setIsInjecting(false);
        setShowFinalButton(true); // 🟢 MOSTRA O BOTÃO
      }
    }, (i + 1) * 1200);
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

    {view === 'login' && (
      <Login password={password} setPassword={setPassword} handleLogin={handleLogin} />
    )}

      {view === 'login' && (
        <Login password={password} setPassword={setPassword} handleLogin={handleLogin} />
      )}

      {view === 'os' && (
        <OSSelect setSelectedOs={setSelectedOs} setView={setView} />
      )}
{view === 'sense_select' && <SenseSelect setView={setView} />}
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
          
        />
      )}
    </main>
  )
}
