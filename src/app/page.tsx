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
    setIsInjecting(true)
    setShowConsole(true)
    setLogs([])
    const sequence = ["Conectando...", "Bypass Anticheat...", "Finalizado!"]
    sequence.forEach((t, i) => {
      setTimeout(() => {
        setLogs(p => [...p, t])
        if (i === 2) setTimeout(() => {
          const url = selectedGame === 'max' 
            ? (selectedOs === 'android' ? "https://play.google.com/store/apps/details?id=com.dts.freefiremax" : "https://apps.apple.com/app/id1480516829")
            : (selectedOs === 'android' ? "https://play.google.com/store/apps/details?id=com.dts.freefireth" : "https://apps.apple.com/app/id1300146617")
          window.location.href = url
        }, 1000)
      }, (i + 1) * 800)
    })
  }

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
        />
      )}
    </main>
  )
}
