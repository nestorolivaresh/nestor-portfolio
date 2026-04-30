export type StampShape = "circle" | "oval" | "rect";

export type SkillStamp = {
  id: string;
  shape: StampShape;
  color: string;
  rot: number;
  label: string;
  sub: string;
  level: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  color: string;
  shape: StampShape;
  rot: number;
  current?: boolean;
  summary: string;
  bullets: string[];
};

export type ContactStamp = {
  id: string;
  shape: StampShape;
  color: string;
  rot: number;
  label: string;
  sub: string;
  glyph: string;
  href?: string;
};

export const INFO = {
  surname: "OLIVARES HEREDIA",
  given: "NESTOR",
  title: "FULL-STACK ENGINEER",
  passportNo: "FSE 2020 035",
  authority: "REPUBLIC OF SOFTWARE",
  issued: "JAN · 2020",
  expires: "BUILDING",
};

export const SKILLS: SkillStamp[] = [
  {
    id: "ts",
    shape: "circle",
    color: "var(--blue)",
    rot: -7,
    label: "TYPESCRIPT",
    sub: "STRICT MODE",
    level: "EXPERT",
  },
  {
    id: "react",
    shape: "circle",
    color: "var(--red)",
    rot: 4,
    label: "REACT",
    sub: "FRAMEWORK",
    level: "EXPERT",
  },
  {
    id: "next",
    shape: "rect",
    color: "var(--blue)",
    rot: -3,
    label: "NEXT.JS",
    sub: "FRAMEWORK",
    level: "EXPERT",
  },
  {
    id: "web3",
    shape: "circle",
    color: "var(--purple)",
    rot: 6,
    label: "WEB3",
    sub: "VIEM · WAGMI",
    level: "EXPERT",
  },
  {
    id: "eth",
    shape: "oval",
    color: "var(--purple)",
    rot: -10,
    label: "AI",
    sub: "CLAUDE CODE",
    level: "PROVEN",
  },
  {
    id: "css",
    shape: "circle",
    color: "var(--red)",
    rot: 8,
    label: "TAILWIND",
    sub: "STYLING",
    level: "FLUENT",
  },
  {
    id: "redux",
    shape: "rect",
    color: "var(--green)",
    rot: 5,
    label: "STATE MANAGEMENT",
    sub: "ARCHITECTURE",
    level: "FLUENT",
  },
  {
    id: "node",
    shape: "circle",
    color: "var(--green)",
    rot: -5,
    label: "NODE.JS",
    sub: "EXPRESS · API",
    level: "FLUENT",
  },
  {
    id: "mongo",
    shape: "circle",
    color: "var(--green)",
    rot: 7,
    label: "MONGODB",
    sub: "DATABASES",
    level: "FLUENT",
  },
  {
    id: "stripe",
    shape: "oval",
    color: "var(--purple)",
    rot: -8,
    label: "POSTGRES",
    sub: "DATABASES",
    level: "EXPERT",
  },
  {
    id: "jest",
    shape: "rect",
    color: "var(--red)",
    rot: 3,
    label: "TESTING",
    sub: "JEST · VITEST",
    level: "PROVEN",
  },
  {
    id: "devops",
    shape: "circle",
    color: "var(--blue)",
    rot: -4,
    label: "CI · CD",
    sub: "GITHUB ACTIONS",
    level: "FLUENT",
  },
];

export const EXPS: Experience[] = [
  {
    id: "gelato",
    company: "GELATO",
    role: "Frontend Engineer",
    period: "SEP 2024 — PRESENT",
    location: "INFRA · FRONTEND",
    color: "var(--red)",
    shape: "circle",
    rot: -8,
    current: true,
    summary: "Building developer-facing infrastructure for the Web3 economy.",
    bullets: [
      "Architected end-to-end billing system with Stripe — subscriptions, checkout, invoices, legacy migration.",
      "Built Paymaster & Bundler interface with real-time analytics, granular API key permissions and gas policy controls.",
      "Refactored API integration for dynamic network support; enabled gasless deposits, credit-card top-ups, env management.",
      "Shipped multi-product analytics with custom visualizations + Slack-integrated logging + Gas Revenue tracking.",
    ],
  },
  {
    id: "archi",
    company: "ARCHIMEDES",
    role: "Full-Stack Engineer",
    period: "SEP 2022 — SEP 2024",
    location: "DEFI · FULL-STACK",
    color: "var(--blue)",
    shape: "rect",
    rot: 5,
    summary: "Architected the dApp foundation for a Web3 financial protocol.",
    bullets: [
      "Designed and built a comprehensive dApp using TypeScript + Next.js — the technical foundation.",
      "Developed secure ERC20 transaction handling: approvals, deposits, allowance, withdrawals via Viem & Wagmi.",
      "Integrated smart contracts with the frontend to read/write on Ethereum mainnet.",
      "Built comprehensive testing ecosystem for blockchain transactions with Vitest.",
    ],
  },
  {
    id: "doingud",
    company: "DOINGUD",
    role: "Web3 Frontend",
    period: "MAR 2022 — DEC 2022",
    location: "NFT · FRONTEND",
    color: "var(--purple)",
    shape: "oval",
    rot: -6,
    summary:
      "Web3 marketplace with decentralized identity & cryptographic auth.",
    bullets: [
      "Implemented cryptographic auth using Metamask + Ceramic decentralized identity (DID).",
      "Built component architecture for marketplace contributions as buyer & seller.",
      "Developed reusable Next.js + styled-components UI to strict design specs.",
      "Engineered ethers.js client-side contract interaction layer.",
    ],
  },
  {
    id: "goodkind",
    company: "GOODKIND",
    role: "Full-Stack Engineer",
    period: "APR 2021 — MAR 2022",
    location: "SAAS · FRONTEND",
    color: "var(--green)",
    shape: "circle",
    rot: 7,
    summary: "Integrations-heavy SaaS platform for nonprofit video outreach.",
    bullets: [
      "Integrated Intercom, Blackbaud, Zapier, Sendgrid and Hotglue via APIs.",
      "Customized Flatfile and React-Select with styled-components.",
      "Optimized backend perf via Big-O analysis of critical algorithms.",
      "Built React components with hooks + Jest, Enzyme, RTL & Sinon tests.",
    ],
  },
  {
    id: "one7",
    company: "ONESEVEN",
    role: "Frontend Developer",
    period: "AUG 2020 — APR 2021",
    location: "AGENCY · FRONTEND",
    color: "var(--red)",
    shape: "rect",
    rot: -4,
    summary: "Multi-client agency work on cross-platform interfaces.",
    bullets: [
      "Created dynamic component library with class & functional React.",
      "Implemented Redux state across multiple apps with consistent data flow.",
      "Integrated backend services and APIs for CRUD operations.",
      "Ensured responsive design across web & mobile.",
    ],
  },
  {
    id: "fino",
    company: "FINO",
    role: "Backend Developer",
    period: "MAR 2020 — MAR 2021",
    location: "INSURANCE · BACKEND",
    color: "var(--blue)",
    shape: "circle",
    rot: 6,
    summary: "Microservices, MongoDB schemas and aggregation pipelines.",
    bullets: [
      "Developed microservices for multiple platform applications.",
      "Designed MongoDB schemas for data integrity & query performance.",
      "Built complex aggregation pipelines with $group, $lookup, $unwind.",
      "Created backend services driven by evolving business needs.",
    ],
  },
];

export const CONTACTS: ContactStamp[] = [
  {
    id: "email",
    shape: "rect",
    color: "var(--red)",
    rot: -6,
    label: "EMAIL",
    sub: "nestorolivares8@gmail.com",
    glyph: "@",
    href: "mailto:nestorolivares8@gmail.com",
  },
  {
    id: "gh",
    shape: "circle",
    color: "var(--ink-2)",
    rot: 5,
    label: "GITHUB",
    sub: "nestorolivaresh",
    glyph: "⌬",
    href: "https://github.com/nestorolivaresh",
  },
  {
    id: "li",
    shape: "circle",
    color: "var(--blue)",
    rot: -3,
    label: "LINKEDIN",
    sub: "in/nestorolivaresh",
    glyph: "in",
    href: "https://www.linkedin.com/in/nestorolivaresh/",
  },
  {
    id: "loc",
    shape: "oval",
    color: "var(--green)",
    rot: 7,
    label: "Telegram",
    sub: "@nestorolivaresh",
    glyph: "◉",
    href: "https://t.me/nestorolivaresh",
  },
];
