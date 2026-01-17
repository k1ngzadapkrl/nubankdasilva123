'use client'
import { useState } from 'react'
import Login from './components/Login'
import OsSelect from './components/OsSelect'
import GameSelect from './components/GameSelect'
import InjectionPanel from './components/InjectionPanel'
import SenseSelect from './components/SenseSelect'

export default function Home() {
  const [view, setView] = useState('login')
  const [selectedOs, setSelectedOs] = useState('')
  const [selectedGame, setSelectedGame] = useState('')
  const [isInjecting, setIsInjecting] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showFinalButton, setShowFinalButton] = useState(false) // Estado para o botão do Android

  const [opts, setOpts] = useState({
    aimBot: false,
    aimLock: false,
    espLine: false,
    regeditVIP: false,
    highDamage: false
  })

  // Função de Injeção Corrigida
  const startInjection = () => {
    setIsInjecting(true)
    setShowConsole(true)
    setShowFinalButton(false)
    setLogs([])

    const sequence = [
      "Injetando configurações nos ajustes...",
      "Injetando lib...",
      "Calibrando screen...",
      "Detectando arquivos...",
      "Arquivos substituídos com sucesso!"
    ]

    sequence.forEach((t, i) => {
      setTimeout(() => {
        setLogs(p => [...p, t])
        
        // Finaliza a injeção e libera o botão de abrir o jogo
        if (i === sequence.length - 1) {
          setIsInjecting(false)
          setShowFinalButton(true)
        }
      }, (i + 1) * 1200)
    })
  }

  return (
    <main className="min-h-screen bg-black">
      {view === 'login' && <Login setView={setView} />}
      
      {view === 'os' && (
        <OsSelect 
          setSelectedOs={setSelectedOs} 
          setView={setView} 
        />
      )}

      {view === 'game' && (
        <GameSelect 
          setSelectedGame={setSelectedGame} 
          setView={setView} 
        />
      )}

      {view === 'injector' && (
        <InjectionPanel 
          selectedOs={selectedOs}
          selectedGame={selectedGame}
          opts={opts}
          setOpts={setOpts}
          startInjection={startInjection}
          isInjecting={isInjecting}
          showConsole={showConsole}
          logs={logs}
          showFinalButton={showFinalButton} // Passando o estado para o painel
        />
      )}

      {view === 'sensi' && (
        <SenseSelect setView={setView} />
      )}
    </main>
  )
}
