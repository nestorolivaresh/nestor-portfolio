import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const SITE_URL = 'https://nestorolivaresh.vercel.app'
const NAME = 'Nestor Olivares Heredia'
const TITLE = `${NAME}`
const DESCRIPTION = 'Software Engineer'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: `${NAME} · Portfolio`,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    NAME,
    'Nestor Olivares',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Web3',
    'Portfolio',
  ],
  // Anchors Next's auto-injected `<link rel="icon">` to the SVG seal at
  // app/icon.svg. The .png is provided as a raster fallback for clients that
  // don't render SVG favicons (older Safari, some mail clients).
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/assets/nestor.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/assets/nestor.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: `${NAME} · Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/assets/nestor.png',
        alt: `${NAME} — Passport Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/assets/nestor.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: 'technology',
}

// Without this, mobile Safari renders pages at its default ~980px logical
// width and our (max-width: 768px) media query never matches on first paint,
// so phones briefly load the desktop layout before JS catches up. The
// themeColor pairs with the navy passport so iOS/Android paint the browser
// chrome to match instead of the OS default white/grey.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d1f3c',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
