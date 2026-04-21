'use client'

import { useCourtTheme } from './CourtThemeProvider'
import { COURT_LIST, type CourtId } from '@/lib/courts'

export default function CourtSwitcher() {
  const { court, setCourt } = useCourtTheme()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          fontFamily: 'var(--font-barlow), sans-serif',
          fontWeight: 800,
          fontSize: 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          lineHeight: 1.3,
          marginBottom: 2,
        }}
      >
        Choose
        <br />
        Court
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {COURT_LIST.map((c) => {
          const isActive = court === c.id
          return (
            <button
              key={c.id}
              onClick={() => setCourt(c.id as CourtId)}
              title={`${c.title} · ${c.sub}`}
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                border: isActive
                  ? '2px solid rgba(255,255,255,0.9)'
                  : `2px solid ${c.border}55`,
                background: c.bg,
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isActive ? `0 3px 14px ${c.border}88` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 9,
                color: c.textColor ?? 'rgba(255,255,255,0.85)',
                letterSpacing: '0.04em',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
