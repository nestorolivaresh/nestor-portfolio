'use client'

import { Experience, StampShape } from '@/lib/passport-data'
import { FONT_BEBAS, FONT_MONO } from './fonts'

// SVG noise overlay that gives stamps their worn-ink texture.
export function StampTex({ seed = 1 }: { seed?: number }) {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.55,
      }}
    >
      <filter id={`stx-${seed}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="3" seed={seed} />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.85 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#stx-${seed})`} />
    </svg>
  )
}

type StampProps = {
  shape?: StampShape
  color?: string
  rotate?: number
  size?: number
  label?: string
  sub?: string
  level?: string
  glyph?: string
  hover?: boolean
  seed?: number
  onClick?: () => void
}

// Generic ink stamp — used for skills and contact entries.
export function Stamp({
  shape = 'circle',
  color = 'var(--red)',
  rotate = 0,
  size = 120,
  label,
  sub,
  level,
  glyph,
  hover,
  seed = 1,
  onClick,
}: StampProps) {
  const isCircle = shape === 'circle'
  const isOval = shape === 'oval'
  const isRect = shape === 'rect'
  const w = isRect ? size * 1.35 : isOval ? size * 1.3 : size
  const h = isRect ? size * 0.78 : isOval ? size * 0.7 : size

  return (
    <div
      className={`stamp ${hover ? 'stamp-hover' : ''}`}
      onClick={onClick}
      style={{
        width: w,
        height: h,
        position: 'relative',
        transform: `rotate(${rotate}deg)`,
        // Pointer only when there's a real click target. Hover-only stamps
        // (skills) inherit the cursor from their parent — so a contact stamp
        // wrapped in an <a> still shows pointer, but a bare skill stamp
        // doesn't pretend to be clickable.
        cursor: onClick ? 'pointer' : hover ? 'inherit' : 'default',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `3px solid ${color}`,
          borderRadius: isCircle ? '50%' : isOval ? '50%' : '4px',
          color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 5,
          boxShadow: `inset 0 0 0 1.5px ${color}`,
          // Clip the SVG noise texture to the stamp's rounded shape.
          overflow: 'hidden',
        }}
      >
        {isCircle && (
          <div
            style={{
              position: 'absolute',
              inset: 7,
              border: `1.5px solid ${color}`,
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
        )}
        {isOval && (
          <div
            style={{
              position: 'absolute',
              inset: 6,
              border: `1.2px solid ${color}`,
              borderRadius: '50%',
              opacity: 0.55,
            }}
          />
        )}
        {isRect && (
          <div
            style={{
              position: 'absolute',
              inset: 4,
              border: `1px solid ${color}`,
              borderRadius: '2px',
              opacity: 0.55,
            }}
          />
        )}

        {level && (
          <div style={{ fontFamily: FONT_MONO, fontSize: 7.5, letterSpacing: '0.18em', fontWeight: 700 }}>
            ★ {level} ★
          </div>
        )}
        {glyph && (
          <div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
            {glyph}
          </div>
        )}

        <div
          style={{
            fontFamily: FONT_BEBAS,
            fontSize: label && label.length > 10 ? 13 : 16,
            letterSpacing: '0.06em',
            fontWeight: 700,
            lineHeight: 1.05,
            padding: '2px 4px',
            marginTop: 2,
          }}
        >
          {label}
        </div>

        {sub && (
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 7,
              letterSpacing: '0.08em',
              fontWeight: 500,
              opacity: 0.85,
              marginTop: 2,
              padding: '0 4px',
              maxWidth: '95%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {sub}
          </div>
        )}

        <StampTex seed={seed} />
      </div>
    </div>
  )
}

// Larger company stamp used on the experience pages — clickable to open
// the dossier modal.
export function ExpStamp({
  exp,
  onClick,
  seed,
}: {
  exp: Experience
  onClick: () => void
  seed: number
}) {
  const isCircle = exp.shape === 'circle'
  const isRect = exp.shape === 'rect'
  const isOval = exp.shape === 'oval'
  const w = isRect ? 195 : isOval ? 200 : 150
  const h = isRect ? 115 : isOval ? 105 : 150

  return (
    <div
      className="stamp stamp-hover"
      onClick={onClick}
      style={{
        width: w,
        height: h,
        position: 'relative',
        transform: `rotate(${exp.rot}deg)`,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `3px solid ${exp.color}`,
          borderRadius: isCircle ? '50%' : isOval ? '50%' : '4px',
          color: exp.color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 8,
          boxShadow: `inset 0 0 0 1.5px ${exp.color}`,
          overflow: 'hidden',
        }}
      >
        {isCircle && (
          <div
            style={{
              position: 'absolute',
              inset: 9,
              border: `1.5px solid ${exp.color}`,
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
        )}
        {isOval && (
          <div
            style={{
              position: 'absolute',
              inset: 7,
              border: `1.2px solid ${exp.color}`,
              borderRadius: '50%',
              opacity: 0.55,
            }}
          />
        )}
        {isRect && (
          <div
            style={{
              position: 'absolute',
              inset: 6,
              border: `1px solid ${exp.color}`,
              borderRadius: '2px',
              opacity: 0.55,
            }}
          />
        )}

        <div style={{ fontFamily: FONT_MONO, fontSize: 7.5, letterSpacing: '0.2em', fontWeight: 700 }}>
          {exp.current ? '★ ACTIVE ★' : '✦ DEPARTED ✦'}
        </div>
        <div
          style={{
            fontFamily: FONT_BEBAS,
            fontSize: exp.company.length > 8 ? 20 : 25,
            letterSpacing: '0.04em',
            fontWeight: 700,
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          {exp.company}
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 8,
            letterSpacing: '0.06em',
            fontWeight: 600,
            marginTop: 4,
            opacity: 0.9,
          }}
        >
          {exp.period}
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 7,
            letterSpacing: '0.18em',
            fontWeight: 500,
            marginTop: 3,
            opacity: 0.7,
          }}
        >
          {exp.location}
        </div>
        <StampTex seed={seed} />
      </div>
    </div>
  )
}
