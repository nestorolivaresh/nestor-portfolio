export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '18px 48px',
      }}
    >
      <div className="footer-inner">
        <span
          style={{
            color: 'var(--muted)',
            fontSize: 12,
            fontFamily: 'var(--font-barlow), sans-serif',
            letterSpacing: '0.08em',
          }}
        >
          © 2026 Néstor Olivares Heredia
        </span>
        <span style={{ color: 'var(--muted)', fontSize: 11 }}>
          Full Stack Engineer · Always Building
        </span>
      </div>
    </footer>
  )
}
