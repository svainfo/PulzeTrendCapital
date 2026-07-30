"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign, Gem, BarChart2, Droplets, Bitcoin, Briefcase,
  ArrowUpRight, Check, Monitor, Globe, Smartphone,
  ChevronRight, ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { ACCOUNT_TYPES, TRADING_INSTRUMENTS, TRADING_STEPS, TRADING_FAQ } from "@/lib/constants";
import { cn } from "@/lib/utils";

const instrumentIcons: Record<string, React.ReactNode> = {
  currency: <DollarSign size={28} aria-hidden="true" />,
  gold: <Gem size={28} aria-hidden="true" />,
  "bar-chart-2": <BarChart2 size={28} aria-hidden="true" />,
  droplets: <Droplets size={28} aria-hidden="true" />,
  bitcoin: <Bitcoin size={28} aria-hidden="true" />,
  briefcase: <Briefcase size={28} aria-hidden="true" />,
};

export function TradingInstrumentsFull() {
  return (
    <section className="section-padding" aria-labelledby="instruments-full-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="What You Can Trade"
          title="1,000+ Instruments Across Global Markets"
          subtitle="Diversify your portfolio with our full range of tradeable instruments — all from a single account."
          id="instruments-full-heading"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRADING_INSTRUMENTS.map((instrument, index) => (
            <motion.div
              key={instrument.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={cn("group relative overflow-hidden rounded-xl border border-white/8 bg-navy-800/40 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1")}
            >
              <div
                className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", instrument.color)}
                aria-hidden="true"
              />
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400">
                    {instrumentIcons[instrument.icon] ?? <DollarSign size={28} aria-hidden="true" />}
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-gold-400 transition-colors" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{instrument.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{instrument.description}</p>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/6 text-center">
                  <div>
                    <div className="text-gold-400 font-semibold text-xs">{instrument.pairs}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Pairs</div>
                  </div>
                  <div>
                    <div className="text-gold-400 font-semibold text-xs">{instrument.leverage}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Leverage</div>
                  </div>
                  <div>
                    <div className="text-gold-400 font-semibold text-xs">{instrument.spread}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Spread</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TradingConditions() {
  const conditions = [
    { label: "Max Leverage", value: "1:200", desc: "On major forex pairs" },
    { label: "Min Spread", value: "0.3 pips", desc: "On Pro accounts" },
    { label: "Execution Speed", value: "<10ms", desc: "Average order execution" },
    { label: "USDT Payments", value: "TRC-20", desc: "Crypto deposits & withdrawals" },
    { label: "Stop Out Level", value: "30%", desc: "ECN & Pro accounts" },
    { label: "Margin Call", value: "100%", desc: "Alert before stop out" },
  ];

  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="conditions-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Trading Conditions"
          title="Conditions Built for Serious Traders"
          subtitle="Transparent, competitive trading conditions across all account types."
          id="conditions-heading"
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {conditions.map((c, index) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="glass rounded-xl p-5 text-center group hover:border-gold-500/25 transition-colors"
            >
              <div className="font-heading font-bold text-2xl md:text-3xl gradient-text mb-1">{c.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{c.label}</div>
              <div className="text-slate-500 text-xs">{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AccountTypesSection() {
  return (
    <section className="section-padding" aria-labelledby="accounts-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Account Types"
          title="Choose Your Account"
          subtitle="From beginners to professional traders — find the account that suits your trading style."
          id="accounts-heading"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCOUNT_TYPES.map((account, index) => (
            <motion.div
              key={account.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className={cn(
                "relative rounded-2xl border overflow-hidden transition-all duration-300",
                account.popular
                  ? "border-gold-500/40 bg-gradient-to-b from-navy-700/80 to-navy-800/60"
                  : "border-white/8 bg-navy-800/40"
              )}
            >
              {account.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400" aria-hidden="true" />
              )}
              <div className="p-7">
                {account.popular && (
                  <div className="inline-block bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading font-bold text-white text-2xl mb-1">{account.name}</h3>
                <div className="text-gold-400 font-bold text-3xl font-heading mb-1">{account.minDeposit}</div>
                <div className="text-slate-500 text-xs mb-6">Minimum Deposit</div>

                <dl className="space-y-3 mb-7">
                  {[
                    { label: "Spread", value: account.spread },
                    { label: "Commission", value: account.commission },
                    { label: "Leverage", value: account.leverage },
                    { label: "Scalping & Hedging", value: account.scalping },
                    { label: "Margin Call, Stop Out", value: account.marginCall },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/6">
                      <dt className="text-slate-500 text-sm">{row.label}</dt>
                      <dd className="text-white text-sm font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>


                <Link
                  href="#"
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all",
                    account.popular
                      ? "btn-primary !w-full !justify-center"
                      : "btn-outline !w-full !justify-center"
                  )}
                  aria-label={`Open ${account.name} Account`}
                >
                  Open {account.name} Account
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TradingProcess() {
  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="process-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="How to Get Started"
          title="Start Trading in 5 Simple Steps"
          id="process-heading"
        />
        <div className="mt-14 relative">
          {/* Connecting line */}
          <div className="absolute top-9 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent hidden lg:block" aria-hidden="true" />
          <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {TRADING_STEPS.map((step, index) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="text-center relative"
              >
                <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/30 flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="font-heading font-bold text-gold-400 text-xl">{step.step}</span>
                </div>
                {index < TRADING_STEPS.length - 1 && (
                  <ArrowRight size={16} className="absolute top-8 -right-6 text-gold-500/30 hidden lg:block" aria-hidden="true" />
                )}
                <h3 className="font-heading font-semibold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="text-center mt-12">
          <Link href="#" className="btn-primary text-base !px-8 !py-4">
            Open Your Account Now
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TradingPlatformsFull() {
  const platforms = [
    { name: "nTrader", icon: <Monitor size={24} />, desc: "Our powerful nTrader desktop platform with advanced charting, fast execution, and a full suite of trading tools.", tags: ["Windows", "macOS"] },
    { name: "WebTrader", icon: <Globe size={24} />, desc: "Browser-based trading — no installation required. Full features on any device.", tags: ["Any Browser"] },
    { name: "Android App", icon: <Smartphone size={24} />, desc: "Full-featured mobile trading app for Android with push notifications and Face ID.", tags: ["Android"] },
    { name: "iOS App", icon: <Smartphone size={24} />, desc: "Native iOS trading app optimized for iPhone and iPad.", tags: ["iOS"] },
  ];

  return (
    <section className="section-padding" aria-labelledby="platforms-full-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Trading Platforms"
          title="Four Ways to Access the Markets"
          id="platforms-full-heading"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">{p.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="bg-gold-500/8 border border-gold-500/15 text-gold-400/80 text-xs px-2.5 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TradingFAQ() {
  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="trading-faq-heading">
      <div className="container-custom max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          id="trading-faq-heading"
        />
        <div className="mt-10">
          <FAQAccordion items={TRADING_FAQ} />
        </div>
      </div>
    </section>
  );
}
