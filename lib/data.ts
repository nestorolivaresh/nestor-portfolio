export const EXPERIENCE = [
  {
    role: 'Frontend Engineer',
    company: 'Gelato',
    short: 'GEL',
    period: 'Sep 2024 – Present',
    current: true,
    type: 'Frontend' as const,
    highlights: [
      'Architected end-to-end billing system with Stripe — subscription management, checkout flows, invoice tracking, seamless migration of legacy users',
      'Built Paymaster & Bundler interface with real-time analytics, API key management with granular permissions, and advanced gas policy controls',
      'Refactored API for dynamic network support, implemented gasless deposits, credit card top-ups, and testnet/mainnet environment management',
      'Developed multi-product analytics system with customizable visualizations and Slack-integrated logging infrastructure',
      'Created internal Dashboard for operational insights, debugging tools for transaction analysis, and webhook management',
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Archimedes Finance',
    short: 'ARC',
    period: 'Sep 2022 – Sep 2024',
    current: false,
    type: 'Web3' as const,
    highlights: [
      'Architected a comprehensive dApp using TypeScript and Next.js — technical foundation for a Web3 financial protocol',
      'Developed secure ERC20 transaction handling: approvals, deposits, allowance verification, and position withdrawals with Viem & Wagmi',
      'Integrated protocol smart contracts with frontend to read/write data live on Ethereum mainnet',
      'Created comprehensive testing ecosystem for blockchain transactions and contract interactions with Vitest',
    ],
  },
  {
    role: 'Web3 Frontend Engineer',
    company: 'DoinGud',
    short: 'DG',
    period: 'Mar 2022 – Dec 2022',
    current: false,
    type: 'Web3' as const,
    highlights: [
      'Cryptographic auth with MetaMask wallet integration and Ceramic decentralized identity (DID)',
      'Built component architecture for user marketplace — sellers & buyers view using Redux and API services',
      'Developed reusable UI components with Next.js and styled-components per strict design specs',
      'Engineered client-side contract interaction layer using ethers.js for MetaMask connectivity',
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Goodkind',
    short: 'GK',
    period: 'Apr 2021 – Mar 2022',
    current: false,
    type: 'Full Stack' as const,
    highlights: [
      'Integrated Intercom, Blackbaud, Zapier, Sendgrid, and Hotglue via their respective APIs across frontend and backend',
      'Customized Flatfile and React-Select with styled-components to match platform design requirements',
      'Optimized backend performance refactoring critical algorithms with Big-O Notation analysis',
      'Built React components with modern hooks — unit tested with Jest, Enzyme, react-testing-library, and Sinon',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'OneSeven Tech',
    short: '17',
    period: 'Aug 2020 – Apr 2021',
    current: false,
    type: 'Frontend' as const,
    highlights: [
      'Created dynamic component library using both class-based and functional React components',
      'Implemented Redux state management across multiple applications with consistent data flow patterns',
      'Integrated backend services and external APIs to handle CRUD operations efficiently',
      'Ensured cross-platform compatibility via responsive design for web and mobile',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'FINO Company',
    short: 'FIN',
    period: 'Mar 2020 – Mar 2021',
    current: false,
    type: 'Backend' as const,
    highlights: [
      'Developed and enhanced microservices architecture for multiple platform applications',
      'Designed and optimized MongoDB schemas to improve data integrity and query performance',
      'Implemented complex aggregation pipelines: $group, $lookup, $unwind for advanced data analysis',
      'Created new backend services based on evolving business requirements',
    ],
  },
]

export type ExperienceType = 'Frontend' | 'Web3' | 'Full Stack' | 'Backend' | 'Tooling'

export const TYPE_HUE: Record<ExperienceType, string> = {
  Frontend: 'var(--accent)',
  Web3: 'oklch(72% 0.18 200)',
  'Full Stack': 'oklch(80% 0.18 55)',
  Backend: 'oklch(70% 0.17 280)',
  Tooling: 'oklch(75% 0.17 320)',
}

export const SKILLS: Record<string, Array<{ name: string; level: number }>> = {
  Frontend: [
    { name: 'React / Next.js', level: 97 },
    { name: 'TypeScript', level: 95 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Redux / State Mgmt', level: 90 },
    { name: 'styled-components', level: 88 },
    { name: 'Component Architecture', level: 94 },
  ],
  Web3: [
    { name: 'Viem / Wagmi', level: 91 },
    { name: 'ethers.js', level: 86 },
    { name: 'Smart Contract Integration', level: 83 },
    { name: 'MetaMask / Wallets', level: 89 },
    { name: 'ERC20 / DeFi', level: 82 },
  ],
  Backend: [
    { name: 'Node.js', level: 80 },
    { name: 'MongoDB', level: 83 },
    { name: 'REST APIs', level: 87 },
    { name: 'Microservices', level: 76 },
    { name: 'Stripe / Billing', level: 90 },
  ],
  Tooling: [
    { name: 'Vercel / Deployment', level: 90 },
    { name: 'Jest / Vitest', level: 86 },
    { name: 'Git / GitHub', level: 92 },
    { name: 'react-testing-library', level: 84 },
  ],
}

export const ACTIVITY = [
  { date: 'Apr 2026', event: 'Shipped Paymaster analytics v2 with custom visualizations', tag: 'Gelato', type: 'feat' as const },
  { date: 'Mar 2026', event: 'Integrated dynamic multi-network support for testnet/mainnet environments', tag: 'Gelato', type: 'feat' as const },
  { date: 'Feb 2026', event: 'Launched webhook management interface for internal dashboard', tag: 'Gelato', type: 'feat' as const },
  { date: 'Jan 2026', event: 'Delivered credit card top-up flow — Stripe + gasless deposits', tag: 'Gelato', type: 'feat' as const },
  { date: 'Dec 2025', event: 'Released gas policy controls with granular API key permissions', tag: 'Gelato', type: 'feat' as const },
  { date: 'Oct 2025', event: 'Completed full legacy user migration on new billing system', tag: 'Gelato', type: 'infra' as const },
  { date: 'Sep 2024', event: 'Joined Gelato — started architecting billing infrastructure', tag: 'Career', type: 'milestone' as const },
  { date: 'Aug 2024', event: 'Shipped final DeFi protocol features at Archimedes Finance', tag: 'Archimedes', type: 'feat' as const },
  { date: '2022–2024', event: 'Built ERC20 transaction system handling deposits, withdrawals, approvals on Ethereum mainnet', tag: 'Archimedes', type: 'feat' as const },
]

export const TECH_CLOUD = [
  'React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS',
  'styled-components', 'Viem', 'Wagmi', 'ethers.js', 'ERC20', 'Posthog',
  'Node.js', 'MongoDB', 'REST APIs', 'Microservices', 'Stripe', 'GraphQL',
  'Jest', 'Vitest', 'Enzyme', 'Vercel', 'Git', 'HTML5', 'CSS3', 
]

export const LANGUAGES = [
  { name: 'Spanish', level: 'Native', pct: 100, flag: '🇻🇪' },
  { name: 'English', level: 'Professional', pct: 88, flag: '🇺🇸' },
]

export const EXPERTISE = [
  { name: 'TypeScript', icon: 'TS' },
  { name: 'NextJS', icon: 'NX' },
  { name: 'Tailwind CSS', icon: 'TW' },
  { name: 'Wagmi', icon: 'WG' },
  { name: 'Vercel', icon: 'VC' },
  { name: 'Node.js', icon: 'NJ' },
]
