export type CourtId = 'grass' | 'hard' | 'clay' | 'indoor' | 'laver' | 'paris'
export type ThemeId = 'dark' | 'light' | 'mid'

export interface CourtConfig {
  id: CourtId
  label: string
  shortLabel: string
  title: string
  sub: string
  bg: string
  border: string
  textColor?: string
  accent: string
  accent2: string
  acdim: string
  acglow: string
  court: string
  courtDark: string
  courtLine: string
  courtNet: string
  surfaceLabel: string
}

export interface ThemeConfig {
  bg: string
  bg2: string
  bg3: string
  bg4: string
  fg: string
  muted: string
  border: string
  accentText: string
}

export const COURTS: Record<CourtId, CourtConfig> = {
  grass: {
    id: 'grass',
    label: 'GRS',
    shortLabel: 'GRS',
    title: 'Grass',
    sub: 'Wimbledon',
    bg: '#2d6e3e',
    border: '#2d6e3e',
    accent: 'oklch(83% 0.22 128)',
    accent2: 'oklch(74% 0.22 128)',
    acdim: 'oklch(83% 0.22 128 / 0.13)',
    acglow: 'oklch(83% 0.22 128 / 0.4)',
    court: '#2d6e3e',
    courtDark: '#235830',
    courtLine: 'rgba(255,255,255,0.9)',
    courtNet: 'rgba(255,255,255,0.7)',
    surfaceLabel: 'Grass · Wimbledon',
  },
  hard: {
    id: 'hard',
    label: 'HRD',
    shortLabel: 'HRD',
    title: 'Hard',
    sub: 'US Open',
    bg: '#1e5fa8',
    border: '#1e5fa8',
    accent: 'oklch(72% 0.18 220)',
    accent2: 'oklch(62% 0.18 220)',
    acdim: 'oklch(72% 0.18 220 / 0.13)',
    acglow: 'oklch(72% 0.18 220 / 0.4)',
    court: '#1e5fa8',
    courtDark: '#174d8c',
    courtLine: 'rgba(255,255,255,0.9)',
    courtNet: 'rgba(255,255,255,0.7)',
    surfaceLabel: 'Hard · US Open',
  },
  clay: {
    id: 'clay',
    label: 'CLY',
    shortLabel: 'CLY',
    title: 'Clay',
    sub: 'Roland Garros',
    bg: '#b85c2a',
    border: '#b85c2a',
    accent: 'oklch(72% 0.2 48)',
    accent2: 'oklch(62% 0.2 48)',
    acdim: 'oklch(72% 0.2 48 / 0.13)',
    acglow: 'oklch(72% 0.2 48 / 0.4)',
    court: '#b85c2a',
    courtDark: '#9a4a1f',
    courtLine: 'rgba(255,255,255,0.85)',
    courtNet: 'rgba(255,255,255,0.65)',
    surfaceLabel: 'Clay · Roland Garros',
  },
  indoor: {
    id: 'indoor',
    label: 'IND',
    shortLabel: 'IND',
    title: 'Indoor',
    sub: 'ATP Finals',
    bg: '#4a3a8a',
    border: '#4a3a8a',
    accent: 'oklch(78% 0.18 300)',
    accent2: 'oklch(68% 0.18 300)',
    acdim: 'oklch(78% 0.18 300 / 0.13)',
    acglow: 'oklch(78% 0.18 300 / 0.4)',
    court: '#4a3a8a',
    courtDark: '#382c6e',
    courtLine: 'rgba(255,255,255,0.9)',
    courtNet: 'rgba(255,255,255,0.7)',
    surfaceLabel: 'Indoor · ATP Finals',
  },
  laver: {
    id: 'laver',
    label: 'LVC',
    shortLabel: 'LVC',
    title: 'Laver Cup',
    sub: 'Indoor',
    bg: '#0d0d0d',
    border: '#1a6fff',
    textColor: '#4da6ff',
    accent: 'oklch(62% 0.38 250)',
    accent2: 'oklch(50% 0.38 250)',
    acdim: 'oklch(62% 0.38 250 / 0.15)',
    acglow: 'oklch(62% 0.38 250 / 0.55)',
    court: '#0a0a0a',
    courtDark: '#060606',
    courtLine: 'rgba(255,255,255,0.95)',
    courtNet: 'rgba(255,255,255,0.9)',
    surfaceLabel: 'Laver Cup · Indoor',
  },
  paris: {
    id: 'paris',
    label: 'PAR',
    shortLabel: 'PAR',
    title: 'Paris Masters',
    sub: 'Bercy',
    bg: '#0e1f3a',
    border: '#1a8099',
    textColor: '#40c8e0',
    accent: 'oklch(72% 0.2 215)',
    accent2: 'oklch(60% 0.2 215)',
    acdim: 'oklch(72% 0.2 215 / 0.13)',
    acglow: 'oklch(72% 0.2 215 / 0.42)',
    court: '#0e1f3a',
    courtDark: '#0a1628',
    courtLine: 'rgba(255,255,255,0.92)',
    courtNet: 'rgba(255,255,255,0.75)',
    surfaceLabel: 'Paris Masters · Bercy',
  },
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  dark: {
    bg: '#080c18',
    bg2: '#0d1222',
    bg3: '#121828',
    bg4: '#1a2236',
    fg: '#eef0f8',
    muted: '#6b7a96',
    border: 'rgba(255,255,255,0.07)',
    accentText: '#000',
  },
  light: {
    bg: '#f4f5f8',
    bg2: '#ecedf2',
    bg3: '#ffffff',
    bg4: '#e4e6ed',
    fg: '#0e1220',
    muted: '#5a6480',
    border: 'rgba(0,0,0,0.1)',
    accentText: '#000',
  },
  mid: {
    bg: '#1a1f2e',
    bg2: '#1f2638',
    bg3: '#252c3d',
    bg4: '#2c3450',
    fg: '#dde2ef',
    muted: '#7a88a8',
    border: 'rgba(255,255,255,0.09)',
    accentText: '#000',
  },
}

export const COURT_LIST = Object.values(COURTS)
