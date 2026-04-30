'use client'

import { useEffect } from 'react'
import { Experience } from '@/lib/passport-data'
import { FONT_BEBAS, FONT_MONO, FONT_SERIF } from './fonts'
import { ExpStamp } from './Stamps'

// Dossier modal — shown when an experience stamp is clicked.
export function Modal({ exp, onClose }: { exp: Experience | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={`modal-bg ${exp ? 'visible' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {exp && (
          <>
            <div
              className="modal-dossier-head"
              style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 14 }}
            >
              <ExpStamp exp={{ ...exp, rot: -6 }} onClick={() => {}} seed={99} />
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 9,
                    letterSpacing: '0.25em',
                    color: 'var(--gold-deep)',
                    fontWeight: 700,
                  }}
                >
                  ◆ DOSSIER ◆
                </div>
                <div
                  style={{
                    fontFamily: FONT_BEBAS,
                    fontSize: 30,
                    color: 'var(--ink-2)',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    marginTop: 6,
                  }}
                >
                  {exp.role}
                </div>
                <div
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: exp.color,
                    marginTop: 4,
                  }}
                >
                  at {exp.company}
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    color: 'var(--ink-2)',
                    opacity: 0.7,
                    marginTop: 6,
                  }}
                >
                  {exp.period} · {exp.location}
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 16,
                color: 'var(--ink-2)',
                lineHeight: 1.5,
                padding: '12px 0',
                borderTop: '1px solid rgba(13,31,60,0.2)',
                borderBottom: '1px solid rgba(13,31,60,0.2)',
              }}
            >
              &ldquo;{exp.summary}&rdquo;
            </div>
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: 'var(--gold-deep)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                ◆ MISSION OBJECTIVES ◆
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  fontFamily: FONT_SERIF,
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: 'var(--ink)',
                }}
              >
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                marginTop: 18,
                paddingTop: 10,
                borderTop: '1px dashed rgba(13,31,60,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 8,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-2)',
                  opacity: 0.65,
                }}
              >
                ◆ STAMPED · {exp.period.split(' — ')[0]} ◆
              </div>
              <div
                style={{
                  border: `2px solid ${exp.color}`,
                  color: exp.color,
                  padding: '4px 10px',
                  fontFamily: FONT_BEBAS,
                  fontSize: 14,
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  transform: 'rotate(-2deg)',
                }}
              >
                {exp.current ? 'ACTIVE' : 'COMPLETE'}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
