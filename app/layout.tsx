import type { Metadata } from 'next'
import { Bebas_Neue, Barlow_Condensed, Inter } from 'next/font/google'
import './globals.css'
import { CourtThemeProvider } from '@/components/CourtThemeProvider'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Néstor Olivares Heredia — Full Stack Engineer',
  description:
    'Full Stack Engineer · 6+ years shipping production apps in React, Next.js, TypeScript, and Web3.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <CourtThemeProvider>{children}</CourtThemeProvider>
      </body>
    </html>
  )
}
