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

const TOTAL_LEAVES = 4

// Stagger between consecutive page flips. Smaller than the leaf rotation
// duration so multi-page jumps cascade like a real book riffle, instead of
// each page waiting for the previous to fully land.
const STAGGER_MS = 380

// 3D book layout: a click on the cover flips it open, after which inner
// leaves flip individually. Each leaf has a front and back face — see
// `globals.css` for the rotateY transition + opacity-swap timing.
export function DesktopPassport({
  setExp,
  modalOpen,
}: {
  setExp: (e: Experience | null) => void
  modalOpen: boolean
}) {
  const [flipCount, setFlipCount] = useState(0)
  const [target, setTarget] = useState(0)
  const lastFlipTimeRef = useRef(0)

  const isOpen = flipCount > 0

  // Walk flipCount toward target. The first flip after a click fires
  // immediately so the page starts turning the instant you click; subsequent
  // flips stagger so the riffle stays legible without a dead pause between
  // them.
  useEffect(() => {
    if (flipCount === target) return
    const dir = target > flipCount ? 1 : -1
    const elapsed = Date.now() - lastFlipTimeRef.current
    const delay = Math.max(0, STAGGER_MS - elapsed)
    const id = setTimeout(() => {
      lastFlipTimeRef.current = Date.now()
      setFlipCount((c) => c + dir)
    }, delay)
    return () => clearTimeout(id)
  }, [flipCount, target])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) return
      if (e.key === 'ArrowRight') {
        setTarget((t) => Math.min(TOTAL_LEAVES, Math.max(t, flipCount) + 1))
      } else if (e.key === 'ArrowLeft') {
        setTarget((t) => Math.max(0, Math.min(t, flipCount) - 1))
      } else if (e.key === 'Enter' && flipCount === 0) {
        setTarget(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipCount, modalOpen])

  const next = () => setTarget((t) => Math.min(TOTAL_LEAVES, Math.max(t, flipCount) + 1))
  const prev = () => setTarget((t) => Math.max(0, Math.min(t, flipCount) - 1))
  const goSpread = (spread: number) => setTarget(spread)

  const leaves = [
    {
      isCover: true,
      front: <CoverFace />,
      back: <PageIdentity />,
    },
    {
      isCover: false,
      front: <PageWelcome />,
      back: (
        <PageExperience
          side="left"
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
      isCover: false,
      front: (
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
      back: (
        <PageSkills
          side="left"
          num={5}
          stamps={SKILLS.slice(0, 6)}
          startSeed={101}
          title="TECHNICAL VISAS"
          sub="Endorsements granted by years of practice"
        />
      ),
    },
    {
      isCover: false,
      front: (
        <PageSkills
          side="right"
          num={6}
          stamps={SKILLS.slice(6, 12)}
          startSeed={201}
          title="(continued)"
          sub="Backend, infrastructure & testing"
        />
      ),
      back: (
        <PageContact
          side="left"
          num={7}
          stamps={CONTACTS}
          startSeed={501}
          title="CHANNELS"
          sub="Click a stamp to make contact"
        />
      ),
    },
  ]

  return (
    <div id="passport-root">
      <div className={`stage ${isOpen ? 'open' : 'closed'}`}>
        <div className="book">
          <div className="static-right">
            <PageContact side="right" num={8} title="FAREWELL" sub="End of document · safe travels" isFinal />
          </div>

          {leaves.map((leaf, idx) => {
            const flipped = idx < flipCount
            // Higher z-index = closer to camera. Unflipped leaves stack with
            // the cover on top; flipped leaves stack with the most recently
            // flipped page on top.
            const z = flipped ? idx : TOTAL_LEAVES - idx
            return (
              <div
                key={idx}
                className={`leaf ${flipped ? 'flipped' : ''} ${leaf.isCover ? 'cover-leaf' : ''}`}
                style={{ zIndex: z, cursor: leaf.isCover && !flipped ? 'pointer' : 'default' }}
                onClick={leaf.isCover && !flipped ? () => setTarget(1) : undefined}
              >
                <div className="face front">{leaf.front}</div>
                <div className="face back">{leaf.back}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`nav ${isOpen ? 'visible' : ''}`}>
        <button className="nav-arrow" onClick={prev} disabled={target <= 0} aria-label="Previous">
          ←
        </button>
        {[
          { spread: 1, label: 'BIO' },
          { spread: 2, label: 'EXPERIENCE' },
          { spread: 3, label: 'SKILLS' },
          { spread: 4, label: 'CONTACT' },
        ].map((t) => (
          <button
            key={t.spread}
            className={`nav-tab ${target === t.spread ? 'active' : ''}`}
            onClick={() => goSpread(t.spread)}
          >
            {t.label}
          </button>
        ))}
        <button className="nav-arrow" onClick={next} disabled={target >= TOTAL_LEAVES} aria-label="Next">
          →
        </button>
      </div>
    </div>
  )
}
