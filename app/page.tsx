'use client'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Career from '@/components/Career'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { FullPageScrollProvider, FullPageScrollTrack } from '@/components/FullPageScroll'

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fp-slide"
      style={{ height: '100dvh', overflow: 'hidden' }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <FullPageScrollProvider>
      <Nav />
      <FullPageScrollTrack>
        <Slide><Hero /></Slide>
        <Slide><Career /></Slide>
        <Slide><Skills /></Slide>
        <Slide>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg)' }}>
            <Contact />
            <Footer />
          </div>
        </Slide>
      </FullPageScrollTrack>
    </FullPageScrollProvider>
  )
}
