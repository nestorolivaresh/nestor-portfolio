'use client'

import SectionHeader from './SectionHeader'
import { EXPERIENCE, TYPE_HUE } from '@/lib/data'

export default function Career() {
  return (
    <section
      id="career"
      style={{
        background: 'var(--bg)',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 62,
      }}
    >
      <div className="section-inner" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <SectionHeader eyebrow="Career" title="Match History" sub="Every role" />

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '0 32px',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--border)' : 'none',
                position: 'relative',
              }}
            >
              {/* Period */}
              <div
                style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  color: e.current ? 'var(--accent)' : 'var(--muted)',
                  textTransform: 'uppercase',
                }}
              >
                {e.period}
              </div>

              {/* Company + role + type */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                {/* Short code badge */}
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: 13,
                    letterSpacing: '0.12em',
                    color: 'var(--bg)',
                    background: TYPE_HUE[e.type],
                    padding: '2px 8px',
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                >
                  {e.short}
                </div>

                {/* Company */}
                <span
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: 26,
                    letterSpacing: '0.03em',
                    color: e.current ? 'var(--fg)' : 'rgba(255,255,255,0.7)',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {e.company}
                </span>

                {/* Role */}
                <span
                  style={{
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'var(--muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {e.role}
                </span>

    

                {e.current && (
                  <span
                    style={{
                      fontFamily: 'var(--font-barlow), sans-serif',
                      fontWeight: 800,
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--actext)',
                      background: 'var(--accent)',
                      padding: '3px 8px',
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  >
                    Now
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        {/* <div
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: '14px 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              width: 160,
              flexShrink: 0,
            }}
          >
            2015 – 2019
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: 26,
                letterSpacing: '0.03em',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1,
              }}
            >
              Rafael Urdaneta University
            </span>
            <span
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--muted)',
              }}
            >
              Engineer&apos;s Degree · Civil Engineering
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                padding: '3px 10px',
                borderRadius: 3,
              }}
            >
              Education
            </span>
          </div>
        </div> */}
      </div>
    </section>
  )
}
