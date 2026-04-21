import SectionHeader from './SectionHeader'
import { ACTIVITY } from '@/lib/data'

const TAG_COLOR: Record<string, string> = {
  feat: 'var(--accent)',
  infra: 'oklch(72% 0.18 200)',
  milestone: 'oklch(80% 0.18 55)',
}

export default function Activity() {
  return (
    <section id="activity" style={{ background: 'var(--bg)', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 62 }}>
      <div className="section-inner" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <SectionHeader
          eyebrow="Activity"
          title="Recent Feed"
          sub="Latest shipped features & milestones"
        />


        <div style={{ position: 'relative' }}>
          {/* Timeline vertical line — uses responsive CSS class for left offset */}
          <div className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ACTIVITY.map((a, i) => {
              const dotColor = TAG_COLOR[a.type]
              return (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 0, alignItems: 'flex-start', paddingBottom: 14 }}
                >
                  {/* Date — width controlled by responsive CSS class */}
                  <div className="timeline-date">
                    <span
                      style={{
                        fontFamily: 'var(--font-barlow), sans-serif',
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: '0.08em',
                        color: 'var(--muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {a.date}
                    </span>
                  </div>

                  {/* Dot */}
                  <div
                    style={{
                      width: a.type === 'milestone' ? 14 : 12,
                      height: a.type === 'milestone' ? 14 : 12,
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: a.type === 'milestone' ? 3 : 4,
                      background: a.type === 'milestone' ? 'var(--accent)' : 'var(--bg4)',
                      border: a.type === 'milestone'
                        ? '2px solid rgba(255,255,255,0.9)'
                        : `2px solid ${dotColor}`,
                      boxShadow: a.type === 'milestone'
                        ? `0 0 0 3px var(--accent), 0 0 12px var(--acglow)`
                        : 'none',
                      zIndex: 1,
                    }}
                  />

                  {/* Content */}
                  <div style={{ flex: 1, paddingLeft: 20, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        marginBottom: 6,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          background: `color-mix(in oklch, ${dotColor} 18%, transparent)`,
                          color: dotColor,
                          padding: '2px 8px',
                          borderRadius: 3,
                          fontSize: 10,
                          fontFamily: 'var(--font-barlow), sans-serif',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.tag}
                      </span>
                      <span
                        style={{
                          background: 'var(--bg4)',
                          color: 'var(--muted)',
                          padding: '2px 8px',
                          borderRadius: 3,
                          fontSize: 10,
                          fontFamily: 'var(--font-barlow), sans-serif',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.type}
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'var(--fg)',
                        fontSize: 13,
                        lineHeight: 1.7,
                      }}
                    >
                      {a.event}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
