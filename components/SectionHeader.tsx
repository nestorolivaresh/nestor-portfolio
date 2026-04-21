interface SectionHeaderProps {
  eyebrow: string
  title: string
  sub?: string
}

export default function SectionHeader({ eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: 'var(--font-barlow), sans-serif',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
        <h2
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 54,
            letterSpacing: '0.02em',
            lineHeight: 1,
            color: 'var(--fg)',
          }}
        >
          {title}
        </h2>
        {sub && (
          <span
            style={{
              color: 'var(--muted)',
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: 15,
              letterSpacing: '0.05em',
            }}
          >
            {sub}
          </span>
        )}
      </div>
      <div
        style={{
          width: 48,
          height: 3,
          background: 'var(--accent)',
          marginTop: 14,
          borderRadius: 2,
        }}
      />
    </div>
  )
}
