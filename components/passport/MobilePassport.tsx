'use client'

import { useEffect, useRef, useState } from 'react'
import { CONTACTS, EXPS, Experience, SKILLS } from '@/lib/passport-data'
import { CoverFace } from './CoverFace'
import {
  PageContact,
  PageExperience,
  PageIdentity,
  PageSkills,
  PageWelcome,
} from './Pages'

const MOBILE_PAGES_COUNT = 9 // 0 = cover, 1..8 = inner pages

// On phones each page is shown one at a time. Swipe left/right (or tap the
// nav) to turn the page. The animation rotates the active page around its
// left edge — like a book leaf hinged on the spine — so it still reads as
// a page being turned, single-page-at-a-time.
export function MobilePassport({
  setExp,
  modalOpen,
}: {
  setExp: (e: Experience | null) => void
  modalOpen: boolean
}) {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(MOBILE_PAGES_COUNT - 1, next))
    if (clamped === page) return
    setDir(clamped > page ? 1 : -1)
    setPage(clamped)
  }
  const next = () => goTo(page + 1)
  const prev = () => goTo(page - 1)

  // Section starts: BIO=1 (Identity), EXPERIENCE=3, SKILLS=5, CONTACT=7.
  const goSection = (section: number) => {
    const starts: Record<number, number> = { 1: 1, 2: 3, 3: 5, 4: 7 }
    goTo(starts[section] ?? 1)
  }
  const activeSection = page === 0 ? 0 : page <= 2 ? 1 : page <= 4 ? 2 : page <= 6 ? 3 : 4

  // Use latest-callback refs so the native touch/pointer listeners attached
  // once in useEffect always read the current page state without re-binding.
  const nextRef = useRef(next)
  const prevRef = useRef(prev)
  const goToRef = useRef(goTo)
  nextRef.current = next
  prevRef.current = prev
  goToRef.current = goTo

  // Compute scale in JS — Safari rejects `scale(min(<length>, <length>))`
  // because length-divided-by-number is still a length, and `scale()` only
  // accepts <number>. Computing it here also keeps the deck centered when
  // the iOS toolbar shows/hides.
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const s = Math.min((w - 24) / 440, (h - 110) / 620)
      setScale(s > 0 ? s : 1)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  // Native touch + pointer listeners attached imperatively. React synthetic
  // touch events have intermittent issues on iOS Safari (especially when
  // the target is a transformed element); native listeners with passive:
  // true on a stable ref work reliably across Safari, Chrome and Firefox.
  const passportRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = passportRef.current
    if (!el) return

    let startX: number | null = null
    let startY: number | null = null
    let usingPointer = false

    const begin = (x: number, y: number) => {
      startX = x
      startY = y
    }
    const finish = (x: number, y: number) => {
      if (startX == null || startY == null) return
      const dx = x - startX
      const dy = y - startY
      startX = null
      startY = null
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) nextRef.current()
        else prevRef.current()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      usingPointer = false
      begin(t.clientX, t.clientY)
    }
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      if (!t) return
      finish(t.clientX, t.clientY)
    }
    const onPointerDown = (e: PointerEvent) => {
      // Skip if a touch sequence is already active to avoid double-firing.
      if (e.pointerType === 'touch') return
      usingPointer = true
      begin(e.clientX, e.clientY)
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!usingPointer) return
      finish(e.clientX, e.clientY)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) return
      if (e.key === 'ArrowRight') nextRef.current()
      else if (e.key === 'ArrowLeft') prevRef.current()
      else if (e.key === 'Enter' && page === 0) goToRef.current(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, modalOpen])

  const pages: Array<{ kind: 'cover' | 'page'; el: React.ReactNode }> = [
    { kind: 'cover', el: <CoverFace openPrompt="▸ TAP TO OPEN ◂" /> },
    { kind: 'page', el: <PageIdentity /> },
    { kind: 'page', el: <PageWelcome /> },
    {
      kind: 'page',
      el: (
        <PageExperience
          side="right"
          num={3}
          items={EXPS.slice(0, 3)}
          startSeed={301}
          onOpen={setExp}
          title="PORTS OF CALL"
          sub="Tap a stamp to read the dossier"
        />
      ),
    },
    {
      kind: 'page',
      el: (
        <PageExperience
          side="right"
          num={4}
          items={EXPS.slice(3, 6)}
          startSeed={401}
          onOpen={setExp}
          title="EARLIER JOURNEYS"
          sub="Earlier missions, completed"
        />
      ),
    },
    {
      kind: 'page',
      el: (
        <PageSkills
          side="right"
          num={5}
          stamps={SKILLS.slice(0, 6)}
          startSeed={101}
          title="TECHNICAL VISAS"
          sub="Endorsements granted by years of practice"
        />
      ),
    },
    {
      kind: 'page',
      el: (
        <PageSkills
          side="right"
          num={6}
          stamps={SKILLS.slice(6, 12)}
          startSeed={201}
          title="(continued)"
          sub="Backend, infrastructure & testing"
        />
      ),
    },
    {
      kind: 'page',
      el: (
        <PageContact
          side="right"
          num={7}
          stamps={CONTACTS}
          startSeed={501}
          title="CHANNELS"
          sub="Tap a stamp to make contact"
        />
      ),
    },
    {
      kind: 'page',
      el: <PageContact side="right" num={8} title="FAREWELL" sub="End of document · safe travels" isFinal />,
    },
  ]

  return (
    <div ref={passportRef} className="m-passport">
      <div className="m-deck" data-dir={dir} style={{ transform: `scale(${scale})` }}>
        {pages.map((p, i) => {
          const offset = i - page
          const state = offset === 0 ? 'active' : offset < 0 ? 'past' : 'future'
          // Z-index keeps the most-recently-flipped page above its older
          // siblings (so backing up into it doesn't reveal pages from
          // underneath), and keeps the rotating leaf above the page it's
          // uncovering during a forward flip.
          let z: number
          if (offset < 0) z = 100 + i // past: newer-flipped on top
          else if (offset === 0) z = 99 // active sits just below the latest past
          else z = 99 - offset // future: closer-to-active on top

          return (
            <div
              key={i}
              className={`m-page m-page-${state}${p.kind === 'cover' ? ' m-cover' : ''}`}
              style={{ zIndex: z }}
              onClick={p.kind === 'cover' && offset === 0 ? () => goTo(1) : undefined}
            >
              {p.el}
            </div>
          )
        })}
      </div>

      {page === 0 && (
        <div className="m-swipe-hint">SWIPE OR TAP TO TURN THE PAGE</div>
      )}

      {page > 0 && (
        <div className="m-nav">
          <button className="m-nav-arrow" onClick={prev} disabled={page <= 0} aria-label="Previous">
            ←
          </button>
          {[
            { s: 1, label: 'BIO' },
            { s: 2, label: 'EXP' },
            { s: 3, label: 'SKILLS' },
            { s: 4, label: 'CONTACT' },
          ].map((t) => (
            <button
              key={t.s}
              className={`m-nav-tab ${activeSection === t.s ? 'active' : ''}`}
              onClick={() => goSection(t.s)}
            >
              {t.label}
            </button>
          ))}
          <button className="m-nav-arrow" onClick={next} disabled={page >= MOBILE_PAGES_COUNT - 1} aria-label="Next">
            →
          </button>
        </div>
      )}
    </div>
  )
}
