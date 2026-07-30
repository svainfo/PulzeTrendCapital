// =============================================
// SITE CONSTANTS & CONFIGURATION
// =============================================

export const SITE_CONFIG = {
  name: "PulzeTrend Capital",
  tagline: "Trade Global Markets with Confidence",
  description:
    "Professional Forex & CFD Trading Platform Built for Modern Traders. Ultra-fast execution, deep liquidity, and world-class support.",
  url: "https://pulzetrendcapital.com",
  email: "support@pulzetrendcapital.com",
  phone: "+1 (800) 000-0000",
  address: "123 Financial District, Suite 800, New York, NY 10005, USA",
  businessHours: "24/5 — Mon to Fri (Forex Market Hours)",
  founded: "2026",
  regulator: "Regulated Broker | License No. FRB-XXXXX",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0!2d-74.0115!3d40.7075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzI3LjAiTiA3NMKwMDAnNDIuMCJX!5e0!3m2!1sen!2sus!4v1234567890",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Trading", href: "/trading" },
  { label: "Partnership", href: "/partnership" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com/pulzetrendcap", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com/company/pulzetrendcapital", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/pulzetrendcapital", icon: "instagram" },
  { label: "Telegram", href: "https://t.me/pulzetrendcapital", icon: "telegram" },
  { label: "YouTube", href: "https://youtube.com/@pulzetrendcapital", icon: "youtube" },
] as const;

export const STATS = [
  { value: 50, suffix: "+", label: "Countries" },
  { value: 100, suffix: "+", label: "Satisfied Clients", separator: true },
  { value: 10, prefix: "<", suffix: "ms", label: "Execution Speed" },
  { value: 99.95, suffix: "%", label: "Order Execution", decimal: 2 },
] as const;

export const WHY_CHOOSE_US = [
  {
    icon: "zap",
    title: "Ultra Fast Execution",
    description:
      "Orders executed in under 10ms with no requotes, giving you the edge in volatile markets.",
  },
  {
    icon: "trending-down",
    title: "Low Spreads",
    description:
      "Raw spreads from 3.0 pips on major pairs with transparent, commission-based pricing.",
  },
  {
    icon: "layers",
    title: "Deep Liquidity",
    description:
      "Connected to Tier-1 liquidity providers ensuring best prices and near-instant fills.",
  },
  {
    icon: "shield-check",
    title: "Advanced Security",
    description:
      "Client funds held in segregated accounts with SSL encryption and 2FA protection.",
  },
  {
    icon: "badge-check",
    title: "Transparent Pricing",
    description:
      "No hidden fees, no markups. What you see is what you get — clear and honest pricing on every trade.",
  },
  {
    icon: "headset",
    title: "24/5 Support",
    description:
      "Dedicated multilingual support team available Monday to Friday via chat, email, and phone.",
  },
] as const;

export const TRADING_INSTRUMENTS = [
  {
    icon: "currency",
    title: "Forex",
    description: "60+ major, minor & exotic currency pairs",
    pairs: "60+ Pairs",
    leverage: "Up to 1:200",
    spread: "From 0.0 pips",
    color: "from-blue-600/20 to-blue-400/5",
  },
  {
    icon: "gold",
    title: "Gold & Silver",
    description: "Precious metals CFDs with tight spreads",
    pairs: "XAU/USD, XAG/USD",
    leverage: "Up to 1:200",
    spread: "From 0.1 pips",
    color: "from-yellow-600/20 to-yellow-400/5",
  },
  {
    icon: "bar-chart-2",
    title: "Indices",
    description: "Global stock indices including S&P500, DAX, FTSE",
    pairs: "20+ Indices",
    leverage: "Up to 1:100",
    spread: "From 0.5 pts",
    color: "from-green-600/20 to-green-400/5",
  },
  {
    icon: "droplets",
    title: "Commodities",
    description: "Oil, Gas, Agriculture & more",
    pairs: "WTI, BRENT, NG",
    leverage: "Up to 1:100",
    spread: "From 0.03",
    color: "from-orange-600/20 to-orange-400/5",
  },
  {
    icon: "bitcoin",
    title: "Crypto CFDs",
    description: "Top cryptocurrencies as CFDs — no wallet needed",
    pairs: "BTC, ETH, XRP+",
    leverage: "Up to 1:10",
    spread: "From 10 pips",
    color: "from-purple-600/20 to-purple-400/5",
  },
  {
    icon: "briefcase",
    title: "Shares CFDs",
    description: "Trade global stocks from NYSE, NASDAQ, LSE",
    pairs: "500+ Shares",
    leverage: "Up to 1:20",
    spread: "From 0.1%",
    color: "from-cyan-600/20 to-cyan-400/5",
  },
] as const;

export const PLATFORMS = [
  {
    name: "nTrader",
    subtitle: "Professional Desktop Platform",
    description:
      "Our powerful nTrader platform delivers advanced charting, fast execution, and a full suite of tools built for serious traders.",
    features: ["Advanced Charts", "Fast Execution", "Multi-Asset", "One-Click Trading"],
    downloads: [
      { label: "Windows", href: "#" },
      { label: "macOS", href: "#" },
    ],
    popular: true,
  },
  {
    name: "WebTrader",
    subtitle: "Trade from Any Browser",
    description:
      "No download required. Access your account and trade from any device with a full-featured browser-based platform.",
    features: ["No Download", "Any Device", "Full Features", "Instant Access"],
    downloads: [{ label: "Launch WebTrader", href: "#" }],
  },
  {
    name: "Mobile Trading",
    subtitle: "Trade on the Go",
    description:
      "Full-featured mobile app for iOS and Android. Monitor markets, execute trades, and manage your account anywhere.",
    features: ["iOS & Android", "Push Alerts", "Face ID", "Full Portfolio"],
    downloads: [
      { label: "App Store", href: "#" },
      { label: "Google Play", href: "#" },
    ],
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "James Mitchell",
    role: "Professional Forex Trader",
    location: "United Kingdom",
    rating: 5,
    content:
      "PulzeTrend Capital's execution speed is extraordinary. I've been trading forex for 12 years and this is genuinely the best execution I've experienced. Spreads are tight and the support team is always available.",
    avatar: "JM",
  },
  {
    name: "Aisha Al-Rashid",
    role: "Fund Manager",
    location: "UAE",
    rating: 5,
    content:
      "We manage multiple client portfolios through PulzeTrend Capital. The liquidity depth for gold and indices is exceptional. The reporting tools and account management are exactly what institutional clients need.",
    avatar: "AA",
  },
  {
    name: "Carlos Mendez",
    role: "Retail Trader",
    location: "Mexico",
    rating: 5,
    content:
      "Started with a demo account and upgraded to live after just two weeks. The educational resources helped me develop my strategy. Withdrawals are processed within 24 hours — no issues whatsoever.",
    avatar: "CM",
  },
  {
    name: "Liu Wei",
    role: "Algorithmic Trader",
    location: "Singapore",
    rating: 5,
    content:
      "The nTrader platform is flawless for running my strategies. Execution is sub-10ms with no slippage on major pairs. PulzeTrend Capital is my preferred broker for serious trading.",
    avatar: "LW",
  },
] as const;

export const ACCOUNT_TYPES = [
  {
    name: "Standard",
    minDeposit: "$100",
    spread: "From 1.2 pips",
    commission: "No Commission",
    leverage: "Up to 1:200",
    scalping: "Permitted",
    marginCall: "100% & 50%",
    platforms: ["nTrader", "WebTrader", "Mobile"],
    popular: false,
  },
  {
    name: "ECN",
    minDeposit: "$1,000",
    spread: "From 1.0 pips",
    commission: "No Commission",
    leverage: "Up to 1:200",
    scalping: "Permitted",
    marginCall: "100% & 30%",
    platforms: ["nTrader", "WebTrader", "Mobile"],
    popular: true,
  },
  {
    name: "Pro",
    minDeposit: "$5,000",
    spread: "From 0.3 pips",
    commission: "$5 per lot",
    leverage: "Up to 1:200",
    scalping: "Permitted",
    marginCall: "100% & 30%",
    platforms: ["nTrader", "WebTrader", "Mobile"],
    popular: false,
  },
] as const;

export const TRADING_STEPS = [
  { step: 1, title: "Register", description: "Create your account in under 2 minutes with just your email." },
  { step: 2, title: "Verify", description: "Complete KYC verification with your ID and proof of address." },
  { step: 3, title: "Deposit", description: "Fund your account exclusively via e-wallet (Crypto USDT)." },
  { step: 4, title: "Trade", description: "Access global markets with our advanced trading platforms." },
  { step: 5, title: "Withdraw", description: "Withdraw your profits quickly and securely at any time." },
] as const;

export const TRADING_FAQ = [
  {
    question: "What is the minimum deposit to open a live account?",
    answer:
      "The minimum deposit for a Standard account is $100, Pro account requires $1,000, and ECN accounts start from $5,000.",
  },
  {
    question: "What leverage do you offer?",
    answer:
      "We offer leverage up to 1:200 across all account types. Leverage varies by instrument and may be subject to regulatory limits.",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "We process withdrawals exclusively via Crypto USDT (TRC-20 / ERC-20). Most withdrawals are processed within 24 business hours. Once approved, USDT transfers are typically completed within minutes on the blockchain.",
  },
  {
    question: "Can I trade on nTrader?",
    answer:
      "Yes. All account types support our nTrader platform on Windows and macOS, as well as our WebTrader and Mobile App.",
  },
  {
    question: "Is my money safe with PulzeTrend Capital?",
    answer:
      "Yes. Client funds are held in segregated accounts at Tier-1 banks, completely separate from company operational funds. We operate under strict regulatory oversight.",
  },
  {
    question: "Do you offer a demo account?",
    answer:
      "Yes, demo accounts are available with $10,000 in virtual funds, full nTrader access, and no time limit so you can practice risk-free.",
  },
] as const;

export const IB_BENEFITS = [
  {
    icon: "dollar-sign",
    title: "Competitive Commission",
    description: "Earn up to $15 per standard lot traded by your referred clients.",
  },
  {
    icon: "users",
    title: "Dedicated IB Manager",
    description: "Personal relationship manager to support your business growth.",
  },
  {
    icon: "megaphone",
    title: "Marketing Support",
    description: "Co-branded marketing materials, banners, landing pages, and promotional tools.",
  },
  {
    icon: "bar-chart",
    title: "Real-Time Reporting",
    description: "Comprehensive partner portal with live tracking of referrals and commissions.",
  },
  {
    icon: "globe",
    title: "Global Reach",
    description: "Partner with a broker serving clients in 150+ countries across all time zones.",
  },
  {
    icon: "clock",
    title: "Fast Payouts",
    description: "Commission paid weekly to your preferred payment method with no minimum threshold.",
  },
] as const;

export const CONTACT_FAQ = [
  {
    question: "What are your support hours?",
    answer:
      "Our support team is available 24/5, Monday through Friday during Forex market hours. For urgent matters, email support@pulzetrendcapital.com anytime.",
  },
  {
    question: "How do I open a live account?",
    answer:
      'Click "Open Live Account" from the navigation or visit our Trading page. The registration process takes less than 2 minutes.',
  },
  {
    question: "How can I reach my account manager?",
    answer:
      "Once your account is verified and funded, you will be assigned a dedicated account manager reachable via phone, email, and live chat.",
  },
  {
    question: "Do you have physical offices?",
    answer:
      "Yes, our primary office is in the Financial District of New York. We also have representative offices in London, Dubai, and Singapore.",
  },
] as const;

export const TIMELINE_EVENTS = [
  { year: "Jan 2026", title: "Company Founded", description: "PulzeTrend Capital incorporated with a mission to make institutional-grade Forex trading accessible to all." },
  { year: "Mar 2026", title: "Platform Development", description: "Began development of nTrader, our proprietary trading platform built for speed, reliability, and simplicity." },
  { year: "May 2026", title: "Beta Launch", description: "Soft-launched to an early community of 50+ traders for platform testing and feedback." },
  { year: "Jul 2026", title: "Official Launch", description: "Officially opened to the public with Standard, ECN, and Pro account types and full USDT funding support." },
  { year: "2026+", title: "Growth Ahead", description: "Expanding our client base, adding new trading instruments, and scaling support across global markets." },
] as const;

export const CORE_VALUES = [
  {
    icon: "eye",
    title: "Transparency",
    description: "No hidden fees, no requotes. What you see is what you get — always.",
  },
  {
    icon: "shield",
    title: "Integrity",
    description: "We hold ourselves to the highest ethical standards in every interaction.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description: "Continuously improving our technology to keep our clients ahead of the markets.",
  },
  {
    icon: "users",
    title: "Client-First",
    description: "Every decision we make is driven by the best interest of our trading community.",
  },
] as const;
