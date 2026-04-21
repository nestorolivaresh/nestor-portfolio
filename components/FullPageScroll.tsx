'use client'

import {
  createContext, useContext, useRef, useState,
  useEffect, useCallback, type ReactNode,
} from 'react'
import { playBounce } from '@/lib/sound'

// ─── Section registry ────────────────────────────────────────────────────────
export const SECTIONS = ['overview', 'career', 'skills', 'contact']
const LABELS = ['Overview', 'Career', 'Skills', 'Contact']

// ─── Context ─────────────────────────────────────────────────────────────────
interface PageScrollCtx {
  activeIndex: number
  activeSection: string
  goToIndex: (i: number) => void
  goToSection: (id: string) => void
}

const Ctx = createContext<PageScrollCtx>({
  activeIndex: 0, activeSection: 'overview',
  goToIndex: () => {}, goToSection: () => {},
})

export const usePageScroll = () => useContext(Ctx)

// ─── Helpers ─────────────────────────────────────────────────────────────────
/**
 * Walk up from `el` looking for a scrollable element inside [data-fs].
 * Returns the element if it can scroll in the given direction, else null.
 */
function findScrollable(el: Element, dir: 'down' | 'up'): Element | null {
  let cur: Element | null = el
  while (cur) {
    if (cur.hasAttribute('data-fs')) {
      const { scrollTop, scrollHeight, clientHeight } = cur as HTMLElement
      const canDown = scrollTop + clientHeight < scrollHeight - 2
      const canUp   = scrollTop > 2
      return (dir === 'down' && canDown) || (dir === 'up' && canUp) ? cur : null
    }
    const s = window.getComputedStyle(cur)
    if (/(auto|scroll)/.test(s.overflow + s.overflowY)) {
      const { scrollTop, scrollHeight, clientHeight } = cur as HTMLElement
      const canDown = scrollTop + clientHeight < scrollHeight - 2
      const canUp   = scrollTop > 2
      if ((dir === 'down' && canDown) || (dir === 'up' && canUp)) return cur
    }
    cur = cur.parentElement
  }
  return null
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function FullPageScrollProvider({ children }: { children: ReactNode }) {
  const [idx, setIdx] = useState(0)
  const idxRef = useRef(0)
  const locked = useRef(false)
  const touchY  = useRef(0)

  const go = useCallback((next: number) => {
    if (locked.current) return
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, next))
    if (clamped === idxRef.current) return
    idxRef.current = clamped
    setIdx(clamped)
    locked.current = true
    setTimeout(() => { locked.current = false }, 1100)
  }, [])

  const goToSection = useCallback((id: string) => {
    const i = SECTIONS.indexOf(id)
    if (i >= 0) go(i)
  }, [go])

  // Wheel — desktop
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('nav')) return
      const dir: 'down' | 'up' = e.deltaY > 0 ? 'down' : 'up'
      if (findScrollable(e.target, dir)) return // let section scroll internally
      e.preventDefault()
      // Filter out momentum/inertia tails from trackpads (small residual deltas)
      if (Math.abs(e.deltaY) < 20) return
      go(idxRef.current + (e.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', handler, { passive: false })
    return () => window.removeEventListener('wheel', handler)
  }, [go])

  // Touch — mobile
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 60) return
      const target = e.target as Element
      const section = target.closest('[data-fs]') as HTMLElement | null
      if (section) {
        const { scrollTop, scrollHeight, clientHeight } = section
        if (diff > 0 && scrollTop + clientHeight < scrollHeight - 2) return
        if (diff < 0 && scrollTop > 2) return
      }
      go(idxRef.current + (diff > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [go])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); go(idxRef.current + 1) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); go(idxRef.current - 1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  return (
    <Ctx.Provider value={{ activeIndex: idx, activeSection: SECTIONS[idx], goToIndex: go, goToSection }}>
      {children}

      {/* ── Side nav dots ──────────────────────────────────────────────── */}
      <div
        className="fp-dots"
        style={{
          position: 'fixed',
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          zIndex: 500,
        }}
      >
        {SECTIONS.map((id, i) => (
          <button
            key={id}
            onClick={() => { playBounce(); go(i) }}
            title={LABELS[i]}
            aria-label={`Go to ${LABELS[i]}`}
            style={{
              width: 4,
              height: idx === i ? 28 : 6,
              borderRadius: 2,
              background: idx === i ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: idx === i ? '0 0 10px var(--acglow)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Section counter ────────────────────────────────────────────── */}
      <div
        className="fp-counter"
        style={{
          position: 'fixed',
          right: 48,
          bottom: 28,
          zIndex: 500,
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
          fontFamily: 'var(--font-barlow), sans-serif',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--accent)',
            letterSpacing: '0.06em',
            lineHeight: 1,
            transition: 'all 0.3s',
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
          /{String(SECTIONS.length).padStart(2, '0')}
        </span>
      </div>
    </Ctx.Provider>
  )
}

// ─── Track ────────────────────────────────────────────────────────────────────
export function FullPageScrollTrack({ children }: { children: ReactNode }) {
  const { activeIndex } = usePageScroll()
  return (
    <div style={{ height: '100dvh', overflow: 'hidden' }}>
      <div
        style={{
          transform: `translateY(calc(-${activeIndex} * 100dvh))`,
          transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
