'use client'

import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { playBounce } from '@/lib/sound'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiRedux, SiStyledcomponents,
  SiReactquery,
  SiEthereum, SiSolidity, SiWalletconnect,
  SiNodedotjs, SiMongodb, SiStripe, SiPostgresql,
  SiVercel, SiVitest, SiGit, SiGithub, SiTestinglibrary,
  SiAnthropic, SiOpenai,
} from 'react-icons/si'
import { VscPackage, VscCircuitBoard } from 'react-icons/vsc'
import { TbApi, TbWallet, TbBrandReactNative, TbSql, TbRobot, TbSparkles } from 'react-icons/tb'
import { RiRainbowLine, RiAiGenerate } from 'react-icons/ri'
import type { IconType } from 'react-icons'

interface SkillDef {
  name: string
  Icon: IconType
  color: string
}

const SKILL_SETS: Record<string, SkillDef[]> = {
  Frontend: [
    { name: 'React',            Icon: SiReact,             color: '#61DAFB' },
    { name: 'Next.js',          Icon: SiNextdotjs,         color: '#ffffff' },
    { name: 'TypeScript',       Icon: SiTypescript,        color: '#3178C6' },
    { name: 'Tailwind CSS',     Icon: SiTailwindcss,       color: '#06B6D4' },
    { name: 'Redux',            Icon: SiRedux,             color: '#764ABC' },
    { name: 'styled-comp.',     Icon: SiStyledcomponents,  color: '#DB7093' },
    { name: 'React Query',      Icon: SiReactquery,        color: '#FF4154' },
    { name: 'React Native',     Icon: TbBrandReactNative,  color: '#61DAFB' },
  ],
  Web3: [
    { name: 'Viem / Wagmi',     Icon: SiEthereum,          color: '#627EEA' },
    { name: 'ethers.js',        Icon: SiEthereum,          color: '#8a9cf0' },
    { name: 'WalletConnect',    Icon: SiWalletconnect,     color: '#3B99FC' },
    { name: 'RainbowKit',       Icon: RiRainbowLine,       color: '#FF6B9C' },
    { name: 'Solidity',         Icon: SiSolidity,          color: '#9b9b9b' },
  ],
  Backend: [
    { name: 'Node.js',          Icon: SiNodedotjs,         color: '#339933' },
    { name: 'MongoDB',          Icon: SiMongodb,           color: '#47A248' },
    { name: 'PostgreSQL',       Icon: SiPostgresql,        color: '#336791' },
    { name: 'REST APIs',        Icon: TbApi,               color: '#a3e635' },
    { name: 'Microservices',    Icon: VscCircuitBoard,     color: '#818cf8' },
    { name: 'Stripe',           Icon: SiStripe,            color: '#635BFF' },
  ],
  Tooling: [
    { name: 'Vercel',           Icon: SiVercel,            color: '#ffffff' },
    { name: 'Vitest',           Icon: SiVitest,            color: '#6E9F18' },
    { name: 'Git',              Icon: SiGit,               color: '#F05032' },
    { name: 'Testing Lib.',     Icon: SiTestinglibrary,    color: '#E33332' },
  ],
  AI: [
    { name: 'Claude Code',      Icon: SiAnthropic,         color: '#CF6A4C' },
    { name: 'Claude Design',    Icon: RiAiGenerate,        color: '#EC4899' },
    { name: 'Cursor',           Icon: TbRobot,             color: '#6366F1' },
  ],
}

const TABS = ['Frontend', 'Web3', 'Backend', 'Tooling', 'AI']

function SkillCard({ name, Icon, color }: SkillDef) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `color-mix(in oklch, ${color} 8%, var(--bg3))` : 'var(--bg3)',
        border: `1px solid ${hovered ? color : 'var(--border)'}`,
        borderRadius: 10,
        padding: '20px 12px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        cursor: 'default',
        transition: 'border-color 0.2s, background 0.25s, box-shadow 0.25s, transform 0.18s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 8px 24px ${color}33` : 'none',
      }}
    >
      <div
        style={{
          color: hovered ? color : 'rgba(255,255,255,0.45)',
          transition: 'color 0.2s, filter 0.2s',
          filter: hovered ? `drop-shadow(0 0 8px ${color}88)` : 'none',
          lineHeight: 1,
        }}
      >
        <Icon size={36} />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-barlow), sans-serif',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--fg)' : 'var(--muted)',
          textAlign: 'center',
          lineHeight: 1.3,
          transition: 'color 0.2s',
        }}
      >
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const [tab, setTab] = useState('Frontend')
  const skills = SKILL_SETS[tab]

  return (
    <section id="skills" style={{ background: 'var(--bg2)', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 62 }}>
      <div className="section-inner" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <SectionHeader eyebrow="Skills" title="Surface Stats" sub="Performance by domain" />

        {/* Tab bar */}
        <div className="skills-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { playBounce(); setTab(t) }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: tab === t ? 'var(--accent)' : 'var(--muted)',
                padding: '10px 22px',
                marginBottom: -1,
                borderBottom: tab === t ? '3px solid var(--accent)' : '3px solid transparent',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {t === 'AI' ? '✦ AI' : t}
            </button>
          ))}
        </div>

        {/* Icon grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 12,
            marginTop: 24,
          }}
        >
          {skills.map((s) => (
            <SkillCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
