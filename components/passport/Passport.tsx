'use client'

import { useEffect, useState } from 'react'
import { Experience } from '@/lib/passport-data'
import { DesktopPassport } from './DesktopPassport'
import { MobilePassport } from './MobilePassport'
import { Modal } from './Modal'

const MOBILE_QUERY = '(max-width: 768px)'

// True once the viewport is known to be mobile-sized. Returns false on the
// server and on the very first client render to avoid hydration mismatches —
// desktop layout paints first and we swap to mobile on mount if needed.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
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
  return (
    <>
      {isMobile ? (
        <MobilePassport setExp={setExp} modalOpen={exp != null} />
      ) : (
        <DesktopPassport setExp={setExp} modalOpen={exp != null} />
      )}
      <Modal exp={exp} onClose={() => setExp(null)} />
    </>
  )
}
