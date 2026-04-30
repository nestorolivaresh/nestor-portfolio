'use client'

import { FONT_BEBAS, FONT_MONO } from './fonts'

// The closed-cover face: navy leather, gold embossing, hexagonal seal
// with four symmetric stars, and the prompt to open. The prompt is
// surface-aware so the cover reads "TAP" on touch devices and "CLICK"
// on mouse-driven ones.
export function CoverFace({ openPrompt = '▸ CLICK TO OPEN ◂' }: { openPrompt?: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, color: 'var(--gold)' }}>
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="leather">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="3" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#leather)" />
      </svg>
      <div className="cover-frame" />
      <div className="cover-frame-inner" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '56px 40px',
        }}
      >
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <div style={{ fontFamily: FONT_BEBAS, fontSize: 11, letterSpacing: '0.5em', color: 'var(--gold)' }}>
            CITIZEN OF THE
          </div>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 24,
              letterSpacing: '0.42em',
              color: 'var(--gold-bright)',
              fontWeight: 700,
              paddingLeft: '0.42em',
              marginTop: 3,
            }}
          >
            WORLD WIDE WEB
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              border: '2px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 28px rgba(230,201,138,0.18), inset 0 0 22px rgba(230,201,138,0.1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 11,
                borderRadius: '50%',
                border: '1px solid rgba(200,168,104,0.6)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 21,
                borderRadius: '50%',
                border: '0.5px solid rgba(200,168,104,0.4)',
              }}
            />
            <svg
              viewBox="0 0 100 100"
              width="98"
              height="98"
              style={{ filter: 'drop-shadow(0 0 5px rgba(230,201,138,0.5))' }}
            >
              <g stroke="var(--gold-bright)" fill="none" strokeWidth="1.4">
                <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
                <polygon points="50,25 72,37 72,63 50,75 28,63 28,37" opacity="0.7" />
                <line x1="20" y1="50" x2="80" y2="50" opacity="0.6" />
                <line x1="50" y1="15" x2="50" y2="85" opacity="0.6" />
                <line x1="28" y1="37" x2="72" y2="63" opacity="0.4" />
                <line x1="72" y1="37" x2="28" y2="63" opacity="0.4" />
                <circle cx="50" cy="50" r="5" fill="var(--gold-bright)" stroke="none" />
              </g>
            </svg>
            {[0, 90, 180, 270].map((deg) => (
              <span
                key={deg}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  color: 'var(--gold-bright)',
                  fontSize: 11,
                  lineHeight: 1,
                  // 1) center the span on the seal's center,
                  // 2) rotate around that center,
                  // 3) push outward by a fixed radius (so all 4 stars sit
                  //    equidistant on the same circle),
                  // 4) un-rotate so the star glyph stays upright.
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-68px) rotate(-${deg}deg)`,
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 48,
              letterSpacing: '0.32em',
              color: 'var(--gold-bright)',
              textShadow: '0 0 18px rgba(230,201,138,0.4), 0 2px 0 rgba(0,0,0,0.4)',
              fontWeight: 700,
              paddingLeft: '0.32em',
            }}
          >
            PASSPORT
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontFamily: FONT_BEBAS, fontSize: 18, letterSpacing: '0.26em', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
            NESTOR&nbsp;OLIVARES&nbsp;HEREDIA
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 9,
              letterSpacing: '0.5em',
              marginTop: 5,
              color: 'rgba(200,168,104,0.7)',
            }}
          >
            SOFTWARE ENGINEER
          </div>
          <div
            className="pulse"
            style={{
              marginTop: 18,
              fontFamily: FONT_MONO,
              fontSize: 9,
              letterSpacing: '0.4em',
              color: 'var(--gold-bright)',
            }}
          >
            {openPrompt}
          </div>
        </div>
      </div>
    </div>
  )
}
