interface LabelProps {
  children: React.ReactNode
  color: string
}

export default function Label({ children, color }: LabelProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: `color-mix(in oklch, ${color} 18%, transparent)`,
        color,
        padding: '2px 10px',
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'var(--font-barlow), sans-serif',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  )
}
