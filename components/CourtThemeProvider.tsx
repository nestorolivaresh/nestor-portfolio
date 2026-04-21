'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { COURTS, THEMES, type CourtId, type ThemeId } from '@/lib/courts'

interface CourtThemeContextValue {
  court: CourtId
  theme: ThemeId
  setCourt: (id: CourtId) => void
  setTheme: (id: ThemeId) => void
}

const CourtThemeContext = createContext<CourtThemeContextValue>({
  court: 'grass',
  theme: 'dark',
  setCourt: () => {},
  setTheme: () => {},
})

export function useCourtTheme() {
  return useContext(CourtThemeContext)
}

function applyVars(court: CourtId, theme: ThemeId) {
  const ac = COURTS[court]
  const th = THEMES[theme]
  const root = document.documentElement
  root.style.setProperty('--accent', ac.accent)
  root.style.setProperty('--accent2', ac.accent2)
  root.style.setProperty('--acdim', ac.acdim)
  root.style.setProperty('--acglow', ac.acglow)
  root.style.setProperty('--bg', th.bg)
  root.style.setProperty('--bg2', th.bg2)
  root.style.setProperty('--bg3', th.bg3)
  root.style.setProperty('--bg4', th.bg4)
  root.style.setProperty('--fg', th.fg)
  root.style.setProperty('--muted', th.muted)
  root.style.setProperty('--border', th.border)
  root.style.setProperty('--actext', th.accentText)
  root.style.setProperty('--court', ac.court)
  root.style.setProperty('--court-dark', ac.courtDark)
  root.style.setProperty('--court-line', ac.courtLine)
  root.style.setProperty('--court-net', ac.courtNet)
}

export function CourtThemeProvider({ children }: { children: React.ReactNode }) {
  const [court, setCourtState] = useState<CourtId>('grass')
  const [theme, setThemeState] = useState<ThemeId>('dark')

  // Load from localStorage on mount
  useEffect(() => {
    const savedCourt = localStorage.getItem('noh-court') as CourtId | null
    const savedTheme = localStorage.getItem('noh-theme') as ThemeId | null
    const c = savedCourt && COURTS[savedCourt] ? savedCourt : 'grass'
    const t = savedTheme && THEMES[savedTheme] ? savedTheme : 'dark'
    setCourtState(c)
    setThemeState(t)
    applyVars(c, t)
  }, [])

  const setCourt = useCallback((id: CourtId) => {
    setCourtState(id)
    localStorage.setItem('noh-court', id)
    applyVars(id, theme)
  }, [theme])

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id)
    localStorage.setItem('noh-theme', id)
    applyVars(court, id)
  }, [court])

  return (
    <CourtThemeContext.Provider value={{ court, theme, setCourt, setTheme }}>
      {children}
    </CourtThemeContext.Provider>
  )
}
