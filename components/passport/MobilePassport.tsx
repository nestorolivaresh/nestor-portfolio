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
// nav) to turn the page. The flip animation is preserved as a horizontal
// slide-and-rotate: the outgoing page rotates away while the incoming page
// rotates in, so it still reads as a book page being turned, just one at a
// time instead of as a two-page spread.
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

  // Touch swipe — horizontal drag past a small threshold turns the page.
  // The 1.5× horizontal-vs-vertical guard prevents vertical scrolls from
  // accidentally paging.
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null || startY.current == null) return
    const dx = e.changedTouches[0].clientX - startX.current
    const dy = e.changedTouches[0].clientY - startY.current
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next()
      else prev()
    }
    startX.current = null
    startY.current = null
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) return
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Enter' && page === 0) goTo(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, modalOpen])

  const pages: Array<{ kind: 'cover' | 'page'; el: React.ReactNode }> = [
    { kind: 'cover', el: <CoverFace /> },
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
    <div className="m-passport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="m-deck" data-dir={dir}>
        {pages.map((p, i) => {
          const offset = i - page
          const state = offset === 0 ? 'active' : offset < 0 ? 'past' : 'future'
          return (
            <div
              key={i}
              className={`m-page m-page-${state}${p.kind === 'cover' ? ' m-cover' : ''}`}
              onClick={p.kind === 'cover' && offset === 0 ? () => goTo(1) : undefined}
            >
              {p.el}
            </div>
          )
        })}
      </div>

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
