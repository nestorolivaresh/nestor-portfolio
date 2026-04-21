'use client'

import { useState } from 'react'
import SectionHeader from './SectionHeader'
import TennisCourt from './TennisCourt'
import { useCourtTheme } from './CourtThemeProvider'
import { playBounce } from '@/lib/sound'

const INFO_ROWS = [
  { label: 'Email',     value: 'nestorolivares8@gmail.com' },
  { label: 'Telegram',  value: '@nestorolivaresh',  href: 'https://t.me/nestorolivaresh' },
  { label: 'GitHub',    value: 'nestorolivaresh',   href: 'https://github.com/nestorolivaresh' },
  { label: 'LinkedIn',  value: 'nestorolivaresh',   href: 'https://linkedin.com/in/nestorolivaresh' },
  { label: 'Work Type', value: 'Remote / Part Time / Full-time' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const { court } = useCourtTheme()
  const isLaver = court === 'laver'

  const copy = () => {
    playBounce()
    navigator.clipboard.writeText('nestorolivares8@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      style={{
        paddingTop: 62,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(200deg, var(--bg) 0%, var(--bg2) 65%)',
      }}
    >
      {/* Opposite-end court — you've reached the other baseline */}
      <TennisCourt flipped />

      {/* Accent glow — mirrored from Hero (top-left instead of top-right) */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '2%',
          width: 550,
          height: 550,
          background: 'var(--acglow)',
          borderRadius: '50%',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Laver red glow — bottom-right to mirror Hero's bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '0%',
          width: 450,
          height: 450,
          background: 'oklch(55% 0.28 25 / 0.35)',
          borderRadius: '50%',
          filter: 'blur(110px)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: isLaver ? 1 : 0,
          transition: 'opacity 0.6s',
        }}
      />

      <div className="section-inner" style={{ paddingTop: 16, paddingBottom: 16, position: 'relative', zIndex: 3 }}>
        <SectionHeader eyebrow="Contact" title="Warmed up?" />

        <div className="contact-grid">
          {/* Left card */}
          <div
            style={{
              background: 'rgba(18, 24, 40, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 38,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 36,
                letterSpacing: '0.02em',
                marginBottom: 16,
                color: 'var(--fg)',
              }}
            >
              Let&apos;s Play
            </h3>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 13,
                lineHeight: 1.85,
                marginBottom: 32,
              }}
            >
              I&apos;m always open to meaningful conversations — whether it&apos;s a product you&apos;re
              building, a team you&apos;re growing, or a problem worth solving. If you think we could
              create something great together, I&apos;d love to hear from you.
            </p>
            <button
              onClick={copy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--accent)',
                color: 'var(--actext)',
                border: 'none',
                padding: '13px 26px',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {copied ? '✓ Copied!' : '📋 Copy Email Address'}
            </button>
          </div>

          {/* Right info rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INFO_ROWS.map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(18, 24, 40, 0.78)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '14px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playBounce}
                    style={{
                      color: 'var(--accent)',
                      fontSize: 13,
                      textAlign: 'right',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ color: 'var(--fg)', fontSize: 13, textAlign: 'right' }}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
