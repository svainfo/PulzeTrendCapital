"use client";

import { motion } from "framer-motion";
import {
  Zap, TrendingDown, Layers, ShieldCheck, BadgeCheck, Headset,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  "zap": <Zap size={28} aria-hidden="true" />,
  "trending-down": <TrendingDown size={28} aria-hidden="true" />,
  "layers": <Layers size={28} aria-hidden="true" />,
  "shield-check": <ShieldCheck size={28} aria-hidden="true" />,
  "badge-check": <BadgeCheck size={28} aria-hidden="true" />,
  "headset": <Headset size={28} aria-hidden="true" />,
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding" aria-labelledby="why-choose-us-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why PulzeTrend Capital"
          title="Everything You Need to Trade Like a Pro"
          subtitle="We combine institutional-grade technology with retail accessibility, giving every trader the tools previously reserved for professional institutions."
          id="why-choose-us-heading"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-7 group cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/15 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-500/30 group-hover:scale-110 transition-all duration-300">
                {iconMap[feature.icon] ?? <Zap size={28} aria-hidden="true" />}
              </div>

              <h3 className="font-heading font-semibold text-white text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow line */}
              <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full group-hover:w-full transition-all duration-500" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
