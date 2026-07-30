"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  DollarSign, Gem, BarChart2, Droplets, Bitcoin, Briefcase,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { TRADING_INSTRUMENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  currency: <DollarSign size={32} aria-hidden="true" />,
  gold: <Gem size={32} aria-hidden="true" />,
  "bar-chart-2": <BarChart2 size={32} aria-hidden="true" />,
  droplets: <Droplets size={32} aria-hidden="true" />,
  bitcoin: <Bitcoin size={32} aria-hidden="true" />,
  briefcase: <Briefcase size={32} aria-hidden="true" />,
};

export default function TradingInstrumentsHome() {
  return (
    <section
      className="section-padding bg-navy-950/50"
      aria-labelledby="instruments-home-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Trading Instruments"
          title="Access 1,000+ Global Markets"
          subtitle="From major currency pairs to crypto CFDs — trade the world's most popular instruments with tight spreads and fast execution."
          id="instruments-home-heading"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRADING_INSTRUMENTS.map((instrument, index) => (
            <motion.div
              key={instrument.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-white/8 bg-navy-800/40 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient overlay */}
              <div
                className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", instrument.color)}
                aria-hidden="true"
              />

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 group-hover:border-gold-500/30 transition-colors">
                    {iconMap[instrument.icon] ?? <DollarSign size={32} aria-hidden="true" />}
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300 mt-2"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-heading font-bold text-white text-xl mb-1.5">
                  {instrument.title}
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  {instrument.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/6">
                  {[
                    { label: "Pairs", value: instrument.pairs },
                    { label: "Leverage", value: instrument.leverage },
                    { label: "Spread", value: instrument.spread },
                  ].map((spec) => (
                    <div key={spec.label} className="text-center">
                      <div className="text-gold-400 font-semibold text-xs leading-tight">{spec.value}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/trading" className="btn-ghost">
            View All Instruments & Conditions
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
