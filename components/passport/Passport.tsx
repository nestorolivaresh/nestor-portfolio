'use client'

import { useEffect, useState } from 'react'
import { Experience } from '@/lib/passport-data'
import { DesktopPassport } from './DesktopPassport'
import { MobilePassport } from './MobilePassport'
import { Modal } from './Modal'

const MOBILE_QUERY = '(max-width: 768px)'

// `null` while the viewport is still unknown (server render + first client
// render before mount). We render nothing in that window so phones never
// flash the desktop layout — previously isMobile defaulted to false and the
// desktop deck painted for one frame, which on mobile Safari overflowed the
// viewport and looked broken.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return isMobile
}

// Top-level entry. Picks the desktop or mobile layout based on viewport,
// owns the modal state so the dossier survives navigation, and renders the
// modal once at the root.
export default function Passport() {
  const isMobile = useIsMobile()
  const [exp, setExp] = useState<Experience | null>(null)
  if (isMobile === null) return null
  // Wrapper exists purely to host the entrance animation — content fades and
  // settles in once we know which layout to show, instead of snapping in.
  return (
    <div className="passport-enter">
      {isMobile ? (
        <MobilePassport setExp={setExp} modalOpen={exp != null} />
      ) : (
        <DesktopPassport setExp={setExp} modalOpen={exp != null} />
      )}
      <Modal exp={exp} onClose={() => setExp(null)} />
    </div>
  )
}
