'use client'

import { useCourtTheme } from './CourtThemeProvider'
import TennisCourt from './TennisCourt'
import Label from './Label'
import { COURT_LIST, COURTS, type CourtId } from '@/lib/courts'
import { playBounce } from '@/lib/sound'

const QUICK_FACTS = [
  { label: 'Full Name', value: 'Néstor Olivares Heredia' },
  { label: 'Nationality', value: '🇻🇪 Venezuelan' },
  { label: 'Turned Pro', value: '2020' },
  { label: 'Specialization', value: 'Full Stack Engineering' },
]

function CourtOverlay() {
  const { court, setCourt } = useCourtTheme()
  const ac = COURTS[court]

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        right: 48,
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-barlow), sans-serif',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 6px var(--acglow)',
          }}
        />
        <span>{ac.surfaceLabel}</span>
      </div>

      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {COURT_LIST.map((c) => {
          const isActive = court === c.id
          return (
            <button
              key={c.id}
              onClick={() => { playBounce(); setCourt(c.id as CourtId) }}
              title={`${c.title} · ${c.sub}`}
              style={{
                width: 36,
                height: 24,
                borderRadius: 4,
                border: isActive
                  ? '2px solid rgba(255,255,255,0.85)'
                  : `1px solid ${c.border}66`,
                background: c.bg,
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
                boxShadow: isActive ? `0 2px 10px ${c.border}99` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 8,
                color: c.textColor ?? 'rgba(255,255,255,0.8)',
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

export default function Hero() {
  const { court } = useCourtTheme()
  const isLaver = court === 'laver'

  return (
    <section
      id="overview"
      style={{
        paddingTop: 62,
        height: '100dvh',
        background: 'linear-gradient(160deg, var(--bg2) 0%, var(--bg) 60%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TennisCourt />

      {/* Bouncing tennis ball — flies across the hero on load */}
      {/* track handles X (linear), ball handles Y + rotation (gravity easing) */}
      <div className="tennis-ball-track" aria-hidden="true">
        <div className="tennis-ball" />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: 600,
          height: 600,
          background: 'var(--acglow)',
          borderRadius: '50%',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '0%',
          width: 500,
          height: 500,
          background: 'oklch(55% 0.28 25 / 0.35)',
          borderRadius: '50%',
          filter: 'blur(110px)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: isLaver ? 1 : 0,
          transition: 'opacity 0.6s',
        }}
      />

      <div className="court-overlay-wrap">
        <CourtOverlay />
      </div>

      <div
        className="section-inner"
        style={{
          paddingTop: 0,
          paddingBottom: 20,
          width: '100%',
          flex: 1,
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 16,
            color: 'var(--muted)',
            fontSize: 12,
            fontFamily: 'var(--font-barlow), sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}
        >
          <span>Engineers</span>
          <span>›</span>
          <span>Full Stack</span>
          <span>›</span>
          <span style={{ color: 'var(--accent)' }}>Néstor Olivares Heredia</span>
        </div>

        <div className="hero-grid" style={{ marginBottom: 0 }}>
          <div className="hero-left">
            <div
              className="hero-photo"
              style={{
                width: '100%',
                height: 'min(240px, 26dvh)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                marginBottom: 12,
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--bg3)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/nestor.jpeg"
                alt="Néstor Olivares Heredia"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  background: 'var(--accent)',
                  color: 'var(--actext)',
                  padding: '4px 12px',
                  borderRadius: 3,
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                ● Building
              </div>
            </div>

            {QUICK_FACTS.map((f) => (
              <div
                key={f.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  padding: '6px 0',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: 'var(--muted)',
                    fontSize: 11,
                    fontFamily: 'var(--font-barlow), sans-serif',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  }}
                >
                  {f.label}
                </span>
                <span
                  style={{
                    color: 'var(--fg)',
                    fontSize: 12,
                    fontWeight: 500,
                    textAlign: 'right',
                    wordBreak: 'break-all',
                  }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <div className="hero-right">
            <div style={{ marginBottom: 10 }}>
              <Label color="var(--accent)">Full Stack</Label>
            </div>

            {/* Name — single-line, positioned at the Olivares slot */}
            <h1
              className="hero-h1 serve-line"
              style={{
                marginTop: '1em',
                marginBottom: 10,
                whiteSpace: 'nowrap',
                animation: 'serveMotion 0.9s cubic-bezier(.2,.7,.3,1.2) 0.5s both',
              }}
            >
              <span>Néstor </span>
              <span
                style={{
                  WebkitTextStroke: '2px var(--accent)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Olivares{' '}
              </span>
              <span>Heredia</span>
            </h1>
            <div
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 20px',
                marginBottom: 16,
              }}
            >
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.85 }}>
                Full Stack Engineer with a strong frontend lean — 6+ years shipping production-grade
                applications in{' '}
                <span style={{ color: 'var(--fg)' }}>React, Next.js, and TypeScript</span>. Deep
                expertise in <span style={{ color: 'var(--fg)' }}>Web3 protocols</span>: ERC20
                transactions, smart contract integration, wallet auth, and DeFi interfaces. Track
                record across fintech, DeFi, SaaS, and marketplace products. Currently architecting
                payment & billing infrastructure at{' '}
                <span style={{ color: 'var(--accent)' }}>Gelato</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

