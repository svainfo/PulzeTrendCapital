"use client";

import { motion } from "framer-motion";
import { Calendar, Newspaper, ArrowRight, Clock } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";

const MARKET_NEWS = [
  {
    category: "Forex",
    title: "USD/JPY holds above 150 as BoJ signals patience on rate hikes",
    time: "2 hours ago",
    impact: "High",
  },
  {
    category: "Gold",
    title: "Gold inches toward $2,400 amid rising geopolitical tensions",
    time: "4 hours ago",
    impact: "Medium",
  },
  {
    category: "Indices",
    title: "S&P 500 futures edge higher ahead of key inflation data",
    time: "6 hours ago",
    impact: "High",
  },
  {
    category: "Crypto",
    title: "Bitcoin consolidates near $70,000 support level",
    time: "8 hours ago",
    impact: "Low",
  },
];

const ECONOMIC_EVENTS = [
  { time: "08:30 EST", event: "US Non-Farm Payrolls", currency: "USD", impact: "High" },
  { time: "10:00 EST", event: "US ISM Manufacturing PMI", currency: "USD", impact: "Medium" },
  { time: "14:00 EST", event: "FOMC Meeting Minutes", currency: "USD", impact: "High" },
  { time: "16:30 EST", event: "EIA Crude Oil Inventories", currency: "OIL", impact: "Medium" },
];

const impactColor: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function MarketSection() {
  return (
    <section className="section-padding" aria-labelledby="market-section-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Market Intelligence"
          title="Stay Ahead of the Markets"
          subtitle="Real-time news, economic calendar events, and market analysis to power your trading decisions."
          id="market-section-heading"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market News */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-white font-heading font-semibold">
                <Newspaper size={18} className="text-gold-400" aria-hidden="true" />
                Market News
              </div>
              <Link href="#" className="text-gold-500 text-xs font-medium hover:text-gold-300 transition-colors flex items-center gap-1">
                View all <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-3" role="list" aria-label="Latest market news">
              {MARKET_NEWS.map((news, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  role="listitem"
                  className="glass rounded-xl p-4 hover:border-gold-500/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold-500/70 text-xs font-semibold uppercase tracking-wide">
                      {news.category}
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${impactColor[news.impact]}`}>
                      {news.impact}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm leading-snug group-hover:text-white transition-colors">
                    {news.title}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs">
                    <Clock size={11} aria-hidden="true" />
                    {news.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Economic Calendar */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-white font-heading font-semibold">
                <Calendar size={18} className="text-gold-400" aria-hidden="true" />
                Economic Calendar
              </div>
              <span className="text-slate-500 text-xs">Today&apos;s Events</span>
            </div>

            <div className="glass rounded-xl overflow-hidden" role="table" aria-label="Economic calendar events">
              <div className="grid grid-cols-4 px-4 py-3 border-b border-white/6 text-xs text-slate-500 uppercase tracking-wide font-medium" role="row">
                <span role="columnheader">Time</span>
                <span className="col-span-2" role="columnheader">Event</span>
                <span role="columnheader">Impact</span>
              </div>
              {ECONOMIC_EVENTS.map((event, index) => (
                <div
                  key={index}
                  role="row"
                  className="grid grid-cols-4 px-4 py-4 border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors items-center"
                >
                  <span className="text-gold-400 font-mono text-xs" role="cell">{event.time}</span>
                  <div className="col-span-2" role="cell">
                    <p className="text-slate-200 text-sm">{event.event}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{event.currency}</p>
                  </div>
                  <span role="cell" className={`text-xs px-2 py-0.5 rounded-full border w-fit ${impactColor[event.impact]}`}>
                    {event.impact}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
