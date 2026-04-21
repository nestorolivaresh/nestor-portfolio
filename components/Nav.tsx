'use client'

import { useState, useEffect } from 'react'
import { usePageScroll } from './FullPageScroll'
import { playBounce } from '@/lib/sound'

const NAV_LINKS = ['Overview', 'Career', 'Skills', 'Contact']

export default function Nav() {
  const { activeSection, goToSection } = usePageScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const firstSlide = document.querySelector('[data-fs]') as HTMLElement | null
    if (!firstSlide) return
    const onScroll = () => setScrolled(firstSlide.scrollTop > 20)
    firstSlide.addEventListener('scroll', onScroll, { passive: true })
    setScrolled(false)
    return () => firstSlide.removeEventListener('scroll', onScroll)
  }, [activeSection])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onNav = (id: string) => {
    playBounce()
    setMenuOpen(false)
    goToSection(id)
  }

  const active = activeSection

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: scrolled || menuOpen || active !== 'overview'
            ? 'color-mix(in oklch, var(--bg) 96%, transparent)'
            : 'transparent',
          backdropFilter: scrolled || menuOpen || active !== 'overview' ? 'blur(16px)' : 'none',
          borderBottom: scrolled || menuOpen || active !== 'overview' ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          height: 62,
          transition: 'all 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <button
            onClick={() => onNav('overview')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 14,
                color: 'var(--actext)',
                letterSpacing: '0.05em',
                flexShrink: 0,
              }}
            >
              NOH
            </div>
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
                  whiteSpace: 'nowrap',
                }}
              >
                Néstor Olivares Heredia
              </span>
              <span className="nav-subtitle" style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 8, whiteSpace: 'nowrap' }}>
              Full Stack Engineer
              </span>
            </div>
          </button>
        </div>

        <div className="nav-links">
          {NAV_LINKS.map((l) => {
            const id = l.toLowerCase()
            const isActive = active === id
            return (
              <button
                key={l}
                onClick={() => onNav(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '8px 14px 6px',
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {l}
              </button>
            )
          })}
        </div>

        <a
          href="mailto:nestorolivares8@gmail.com"
          className="nav-hire"
          style={{
            background: 'var(--accent)',
            color: 'var(--actext)',
            padding: '8px 20px',
            borderRadius: 4,
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: '0.12em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Get in touch
        </a>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 6,
            width: 38,
            height: 38,
            cursor: 'pointer',
            flexDirection: 'column',
            gap: 5,
            padding: '10px 8px',
          }}
        >
          <span
            style={{
              display: 'block',
              height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--fg)',
              borderRadius: 1,
              transition: 'background 0.2s, transform 0.2s',
              transformOrigin: 'center',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--fg)',
              borderRadius: 1,
              transition: 'background 0.2s, opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              height: 2,
              background: menuOpen ? 'var(--accent)' : 'var(--fg)',
              borderRadius: 1,
              transition: 'background 0.2s, transform 0.2s',
              transformOrigin: 'center',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        style={{
          position: 'fixed',
          top: 62,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 199,
          background: 'color-mix(in oklch, var(--bg) 97%, transparent)',
          backdropFilter: 'blur(20px)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {NAV_LINKS.map((l) => {
          const id = l.toLowerCase()
          const isActive = active === id
          return (
            <button
              key={l}
              onClick={() => onNav(id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 44,
                letterSpacing: '0.06em',
                color: isActive ? 'var(--accent)' : 'var(--fg)',
                padding: '8px 32px',
                transition: 'color 0.2s',
                display: 'block',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {l}
            </button>
          )
        })}
        <a
          href="mailto:nestorolivares8@gmail.com"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 24,
            background: 'var(--accent)',
            color: 'var(--actext)',
            padding: '14px 40px',
            borderRadius: 6,
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '0.14em',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Get in touch
        </a>
      </div>
    </>
  )
}
