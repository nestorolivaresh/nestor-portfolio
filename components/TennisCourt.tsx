'use client'

import { useCourtTheme } from './CourtThemeProvider'
import { COURTS } from '@/lib/courts'

// Court dimensions (viewBox 1200 × 560)
// Real court: 78ft long × 36ft wide (doubles)
// Scale: 30px/ft horizontal, 6.154px/ft vertical
// Court area: x=60→1140 (1080px=36ft), y=40→520 (480px=78ft)
// Net: y=280 (center)
// Service lines: 21ft from net = 129px → y=151 and y=409
// Singles sidelines: 4.5ft alleys = 135px → x=195 and x=1005

export default function TennisCourt({ flipped = false }: { flipped?: boolean }) {
  const { court } = useCourtTheme()
  const ac = COURTS[court]
  const C = ac.court
  const D = ac.courtDark
  const L = ac.courtLine
  const lw = 3.5
  const isLaver = court === 'laver'

  function lineColor(y: number): string {
    if (isLaver) {
      return y < 280 ? 'rgba(30,110,255,0.95)' : 'rgba(220,35,55,0.95)'
    }
    return L
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: flipped
            ? 'linear-gradient(180deg, rgba(8,12,24,0.88) 0%, rgba(8,12,24,0.52) 55%, rgba(8,12,24,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(8,12,24,0.72) 0%, rgba(8,12,24,0.55) 40%, rgba(8,12,24,0.85) 100%)',
        }}
      />

      <svg
        viewBox="0 0 1200 560"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) perspective(900px) rotateX(${flipped ? -28 : 28}deg) scale(1.18)`,
          transformOrigin: '50% 50%',
          width: '110%',
          height: 'auto',
          opacity: 0.92,
          transition: 'opacity 0.5s',
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Surface ── */}
        {/* Outer area (run-outs beyond baselines / beyond sidelines) */}
        <rect x={0} y={0} width={1200} height={560} fill={D} style={{ transition: 'fill 0.5s' }} />

        {/* Flat surface for all courts */}
        <rect x={60} y={40} width={1080} height={480} fill={C} style={{ transition: 'fill 0.5s' }} />

        {/* Laver Cup: subtle half-tints (blue top, red bottom) */}
        {isLaver && (
          <>
            <rect x={60} y={40} width={1080} height={240} fill="rgba(20,80,220,0.12)" />
            <rect x={60} y={280} width={1080} height={240} fill="rgba(200,25,45,0.12)" />
          </>
        )}

        {/* ── Court lines ── */}

        {/* Doubles sidelines */}
        <rect x={60} y={40} width={lw} height={480} fill={lineColor(60)} style={{ transition: 'fill 0.4s' }} />
        <rect x={1140} y={40} width={lw} height={480} fill={lineColor(60)} style={{ transition: 'fill 0.4s' }} />

        {/* Baselines */}
        <rect x={60} y={40} width={1080} height={lw} fill={lineColor(40)} style={{ transition: 'fill 0.4s' }} />
        <rect x={60} y={520} width={1080} height={lw} fill={lineColor(520)} style={{ transition: 'fill 0.4s' }} />

        {/* Singles sidelines (4.5ft alleys = 135px from doubles lines) */}
        <rect x={195} y={40} width={lw} height={480} fill={lineColor(60)} style={{ transition: 'fill 0.4s' }} />
        <rect x={1005} y={40} width={lw} height={480} fill={lineColor(60)} style={{ transition: 'fill 0.4s' }} />

        {/* Service lines (21ft from net = 129px) */}
        <rect x={195} y={151} width={810} height={lw} fill={lineColor(151)} style={{ transition: 'fill 0.4s' }} />
        <rect x={195} y={409} width={810} height={lw} fill={lineColor(409)} style={{ transition: 'fill 0.4s' }} />

        {/* Center service line */}
        <rect x={599} y={151} width={lw} height={258} fill={lineColor(280)} style={{ transition: 'fill 0.4s' }} />

        {/* Net */}
        <rect x={60} y={278} width={1080} height={4} fill={lineColor(278)} opacity={0.9} style={{ transition: 'fill 0.4s' }} />
        {/* Net posts */}
        <rect x={52} y={256} width={9} height={48} rx={2} fill={lineColor(278)} style={{ transition: 'fill 0.4s' }} />
        <rect x={1139} y={256} width={9} height={48} rx={2} fill={lineColor(278)} style={{ transition: 'fill 0.4s' }} />
        {/* Net center strap */}
        <rect x={597} y={270} width={8} height={20} rx={1} fill={lineColor(278)} style={{ transition: 'fill 0.4s' }} />
        {/* Net mesh lines */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1={60 + i * 45}
            y1={278}
            x2={60 + i * 45}
            y2={282}
            stroke={lineColor(278)}
            strokeWidth={1}
            opacity={0.5}
            style={{ transition: 'stroke 0.4s' }}
          />
        ))}

        {/* Center marks on baselines */}
        <rect x={596} y={40} width={7} height={16} fill={lineColor(40)} style={{ transition: 'fill 0.4s' }} />
        <rect x={596} y={506} width={7} height={16} fill={lineColor(520)} style={{ transition: 'fill 0.4s' }} />
      </svg>
    </div>
  )
}
