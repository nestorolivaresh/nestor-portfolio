'use client'

import { ContactStamp, Experience, INFO, SkillStamp } from '@/lib/passport-data'
import { FONT_BEBAS, FONT_MONO, FONT_SERIF } from './fonts'
import { ExpStamp, Stamp, StampTex } from './Stamps'

type Side = 'left' | 'right'

// ---------- shared page primitives ----------

// Layered paper texture — gradient + wave pattern + noise + spine shadow.
function PaperBg({ side }: { side: Side }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, #ebdfc4 0%, #f4ead7 14%, #f4ead7 100%)`,
        }}
      />
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id={`g-${side}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 Q10,5 20,20 T40,20" stroke="#0d1f3c" strokeWidth="0.5" fill="none" />
            <path d="M0,30 Q10,15 20,30 T40,30" stroke="#0d1f3c" strokeWidth="0.5" fill="none" />
            <path d="M0,10 Q10,-5 20,10 T40,10" stroke="#0d1f3c" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${side})`} />
      </svg>
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.16,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      >
        <filter id={`gn-${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={side === 'left' ? 5 : 11} />
          <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.32  0 0 0 0 0.2  0 0 0 0.4 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#gn-${side})`} />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          ...(side === 'left' ? { right: 0 } : { left: 0 }),
          width: 40,
          background:
            side === 'left'
              ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.18))'
              : 'linear-gradient(to left, transparent, rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

function Header({ side, num, label }: { side: Side; num: number; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '14px 26px 10px',
        borderBottom: '1px dashed rgba(13,31,60,0.3)',
        fontFamily: FONT_MONO,
        fontSize: 9,
        letterSpacing: '0.22em',
        color: 'var(--ink-2)',
        fontWeight: 700,
        position: 'relative',
        zIndex: 2,
      }}
    >
      {side === 'left' ? (
        <>
          <span>P. {String(num).padStart(2, '0')}</span>
          <span>{label}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <span>P. {String(num).padStart(2, '0')}</span>
        </>
      )}
    </div>
  )
}

function Field({ k, v, mono, span }: { k: string; v: string; mono?: boolean; span?: boolean }) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : 'auto' }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 7,
          letterSpacing: '0.2em',
          color: 'rgba(13,31,60,0.65)',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontFamily: mono ? FONT_MONO : FONT_BEBAS,
          fontSize: mono ? 11 : 14,
          letterSpacing: '0.04em',
          color: 'var(--navy)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 1,
        }}
      >
        {v}
      </div>
    </div>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: FONT_BEBAS, fontSize: 26, color: 'var(--navy)', lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 7, letterSpacing: '0.2em', opacity: 0.6, marginTop: 3 }}>{l}</div>
    </div>
  )
}

// ---------- pages ----------

export function PageIdentity() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <PaperBg side="left" />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header side="left" num={1} label="◆ IDENTIFICATION ◆" />
        <div style={{ padding: '18px 26px 16px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 26,
              letterSpacing: '0.04em',
              color: 'var(--navy)',
              lineHeight: 0.95,
            }}
          >
            REPUBLIC OF
            <br />
            <span style={{ color: 'var(--gold-deep)' }}>SOFTWARE</span>
          </div>
          <div style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: 13, opacity: 0.75, marginTop: 3 }}>
            Engineer&apos;s Travel Document
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '104px 1fr', gap: 13, marginTop: 14 }}>
            <div
              style={{
                width: 104,
                height: 130,
                position: 'relative',
                background: '#13243f',
                border: '2px solid var(--ink-2)',
                boxShadow: 'inset 0 0 18px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/nestor.png"
                alt="Nestor Olivares Heredia"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  // Subtle vintage filter to fit the passport aesthetic.
                  filter: 'contrast(1.04) saturate(0.85)',
                }}
              />
              {/* Inset shadow overlay above the image keeps the framed-photo feel. */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.45)',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Field k="Surname" v={INFO.surname} />
              <Field k="Given Name" v={INFO.given} />
              <Field k="Title" v={INFO.title} />
              <Field k="Status" v={INFO.expires} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginTop: 11 }}>
            <Field k="Issued" v={INFO.issued} />
            <Field k="Authority" v={INFO.authority} span />
            <Field k="Doc №" v={INFO.passportNo} mono span />
          </div>

          <div style={{ marginTop: 9, paddingTop: 7, borderTop: '1px dashed rgba(13,31,60,0.3)' }}>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 7,
                letterSpacing: '0.22em',
                opacity: 0.6,
                fontWeight: 600,
              }}
            >
              SIGNATURE OF BEARER
            </div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 21,
                color: 'var(--navy)',
                transform: 'rotate(-3deg)',
                marginLeft: 14,
                marginTop: 1,
                display: 'inline-block',
              }}
            >
              Nestor Olivares Heredia
            </div>
          </div>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: 8,
              fontFamily: FONT_MONO,
              fontSize: 10,
              letterSpacing: '0.13em',
              color: 'var(--navy)',
              borderTop: '1.5px solid rgba(13,31,60,0.5)',
              lineHeight: 1.55,
              fontWeight: 600,
            }}
          >
            <div>P&lt;ROSOLIVARES&lt;H&lt;&lt;NESTOR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
            <div>FSE2020035&lt;7VEN&lt;&lt;&lt;ENGINEER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageWelcome() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <PaperBg side="right" />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header side="right" num={2} label="◆ ENDORSEMENT ◆" />
        <div
          style={{
            padding: '18px 32px 16px 26px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: 13, opacity: 0.75 }}>
            The bearer has crossed
          </div>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 38,
              letterSpacing: '0.02em',
              color: 'var(--navy)',
              lineHeight: 0.95,
              marginTop: 3,
            }}
          >
            SIX FRONTIERS
            <br />
            <span style={{ color: 'var(--red)' }}>OF CODE</span>
          </div>

          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 14,
              color: 'var(--ink)',
              lineHeight: 1.5,
              marginTop: 13,
              textAlign: 'justify',
            }}
          >
            Six years aloft over modern web, flown on the strict wings of <em>TypeScript</em>... from the
            frontend cities of <em>React</em> &amp; <em>Next.js</em>, through the financial districts of{' '}
            <em>Web3</em>, down into the backend interiors of <em>Node</em>, <em>PostgreSQL</em> &amp;{' '}
            <em>MongoDB</em>. Comfortable on every leg of the journey, taking over the polished cabin
            (<em>design</em>, <em>UX/UI</em>, the details that breathe) as well as the engine room and the control
            tower (<em>architecture</em>, <em>APIs</em>, end-to-end systems).
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              marginTop: 13,
              padding: '9px 0',
              borderTop: '1px solid rgba(13,31,60,0.25)',
              borderBottom: '1px solid rgba(13,31,60,0.25)',
            }}
          >
            <Stat n="6" l="Companies" />
            <Stat n="6+" l="Years" />
            <Stat n="12+" l="Skills" />
          </div>

          <div
            style={{
              marginTop: 13,
              padding: '9px 12px',
              background: 'rgba(13,31,60,0.06)',
              borderLeft: '3px solid var(--navy)',
            }}
          >
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 7.5,
                letterSpacing: '0.2em',
                color: 'var(--navy)',
                fontWeight: 700,
                marginBottom: 3,
              }}
            >
              INSTRUCTIONS
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.45 }}>
              Use ← / → keys or the navigation tabs to flip pages. Click any experience stamp for the full briefing.
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 24, right: 18, transform: 'rotate(-12deg)' }}>
            <Stamp shape="circle" color="var(--red)" rotate={0} size={102} label="AUTHORIZED" sub="ALL FRONTIERS" level="VALID" seed={42} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageSkills({
  side,
  num,
  stamps,
  startSeed,
  title,
  sub,
}: {
  side: Side
  num: number
  stamps: SkillStamp[]
  startSeed: number
  title: string
  sub: string
}) {
  const align: Side = side === 'right' ? 'right' : 'left'
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <PaperBg side={side} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header side={side} num={num} label="◆ SECTION II · SKILLS ◆" />
        <div style={{ padding: '14px 26px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 22,
              letterSpacing: '0.08em',
              color: 'var(--navy)',
              textAlign: align,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 11.5,
              opacity: 0.7,
              textAlign: align,
              marginTop: 2,
            }}
          >
            {sub}
          </div>
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: 8,
              marginTop: 10,
              placeItems: 'center',
            }}
          >
            {stamps.map((s, i) => (
              <Stamp
                key={s.id}
                shape={s.shape}
                color={s.color}
                rotate={s.rot}
                size={108}
                label={s.label}
                sub={s.sub}
                level={s.level}
                seed={startSeed + i}
                hover
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageExperience({
  side,
  num,
  items,
  startSeed,
  onOpen,
  title,
  sub,
}: {
  side: Side
  num: number
  items: Experience[]
  startSeed: number
  onOpen: (e: Experience) => void
  title: string
  sub: string
}) {
  const align: Side = side === 'right' ? 'right' : 'left'
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <PaperBg side={side} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header side={side} num={num} label="◆ SECTION I · EXPERIENCE ◆" />
        <div style={{ padding: '14px 26px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 22,
              letterSpacing: '0.08em',
              color: 'var(--navy)',
              textAlign: align,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 11.5,
              opacity: 0.7,
              textAlign: align,
              marginTop: 2,
            }}
          >
            {sub}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '8px 0',
            }}
          >
            {items.map((e, i) => (
              <ExpStamp key={e.id} exp={e} onClick={() => onOpen(e)} seed={startSeed + i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageContact({
  side,
  num,
  stamps,
  startSeed,
  title,
  sub,
  isFinal,
}: {
  side: Side
  num: number
  stamps?: ContactStamp[]
  startSeed?: number
  title: string
  sub: string
  isFinal?: boolean
}) {
  const align: Side = side === 'right' ? 'right' : 'left'
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <PaperBg side={side} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header side={side} num={num} label={isFinal ? '◆ FAREWELL ◆' : '◆ SECTION III · CONTACT ◆'} />
        <div style={{ padding: '14px 26px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: FONT_BEBAS,
              fontSize: 22,
              letterSpacing: '0.08em',
              color: 'var(--navy)',
              textAlign: align,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 11.5,
              opacity: 0.7,
              textAlign: align,
              marginTop: 2,
            }}
          >
            {sub}
          </div>
          {isFinal ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ transform: 'rotate(-8deg)', marginBottom: 18 }}>
                <div
                  style={{
                    border: '5px double var(--red)',
                    color: 'var(--red)',
                    padding: '14px 24px',
                    fontFamily: FONT_BEBAS,
                    fontSize: 36,
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    position: 'relative',
                  }}
                >
                  THANK YOU
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 8,
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      marginTop: 2,
                      fontWeight: 600,
                    }}
                  >
                    FOR READING ✦ 2026
                  </div>
                  <StampTex seed={99} />
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                  maxWidth: 260,
                }}
              >
                Six stamps, twelve visas — and many borders still to cross.
              </div>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '8px 0',
              }}
            >
              {stamps?.map((s, i) => {
                const stamp = (
                  <Stamp
                    shape={s.shape}
                    color={s.color}
                    rotate={s.rot}
                    size={125}
                    label={s.label}
                    sub={s.sub}
                    glyph={s.glyph}
                    seed={(startSeed ?? 0) + i}
                    hover
                  />
                )
                return s.href ? (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {stamp}
                  </a>
                ) : (
                  <div key={s.id}>{stamp}</div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
