# PulzeTrend Capital — Corporate Website

> Premium Forex & CFD Brokerage Website built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

[![CI/CD](https://github.com/your-org/pulzetrend-capital/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/pulzetrend-capital/actions)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS)
- npm 10+

### 1. Clone & Install
```bash
git clone https://github.com/your-org/pulzetrend-capital.git
cd pulzetrend-capital
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your SMTP and other credentials
```

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
pulzetrend-capital/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx          # Root layout + SEO + JSON-LD
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About Us page
│   ├── trading/page.tsx    # Trading page
│   ├── partnership/page.tsx# Partnership page
│   ├── contact/page.tsx    # Contact page
│   └── api/
│       ├── contact/        # Contact form API (POST)
│       └── newsletter/     # Newsletter subscribe API (POST)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # Reusable: PageHero, SectionHeader, FAQAccordion, CTABanner, AnimatedCounter
│   ├── home/               # Hero, Stats, WhyChooseUs, Instruments, Platforms, Market, Testimonials
│   ├── about/              # MissionVision, CoreValues, Timeline, LeadershipTeam
│   ├── trading/            # Instruments, Conditions, Accounts, Platforms, Process, FAQ
│   ├── partnership/        # Programs, Benefits, PartnerForm
│   └── contact/            # ContactForm, Map, FAQ
├── lib/
│   ├── constants.ts        # All static data & site config
│   ├── utils.ts            # Helper functions (cn, formatNumber, etc.)
│   └── validations.ts      # Zod schemas for all forms
├── types/index.ts          # TypeScript interfaces
├── styles/globals.css      # Tailwind v4 + design tokens + animations
├── public/                 # Static assets, robots.txt, sitemap.xml
└── __tests__/              # Unit tests
```

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type-checking |
| `npm run format` | Format with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |

---

## 🌐 Pages

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Landing, stats, instruments, platforms, testimonials |
| About | `/about` | Mission, values, timeline, leadership |
| Trading | `/trading` | Instruments, conditions, account types, process |
| Partnership | `/partnership` | IB, affiliate, institutional programs + form |
| Contact | `/contact` | Contact form, map, office info, FAQ |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SMTP_HOST` | For email | SMTP server host |
| `SMTP_PORT` | For email | SMTP port (587 or 465) |
| `SMTP_USER` | For email | SMTP username |
| `SMTP_PASS` | For email | SMTP password / app password |
| `CONTACT_EMAIL` | For email | Destination for contact form emails |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional | Google reCAPTCHA v3 site key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID |

See `.env.example` for the full list.

---

## 🐳 Docker

```bash
# Development (hot reload)
docker compose up dev

# Production build
docker compose --profile production up app --build
```

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

Set these environment variables in your Vercel project dashboard before deploying.

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Navy 900 (primary) | `#071A35` |
| Gold 500 (accent) | `#D4AF37` |
| Heading font | Poppins Bold |
| Body font | Inter |
| Border radius (cards) | `1rem` |
| Border radius (buttons) | `0.5rem` |

---

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer (SMTP)
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel / Docker

---

## 📄 License

© 2025 PulzeTrend Capital. All rights reserved.

> **Risk Warning**: Trading Forex and CFDs involves significant risk. Past performance is not indicative of future results.
