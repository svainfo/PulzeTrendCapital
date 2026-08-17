"use client";

import { motion } from "framer-motion";
import { Monitor, Globe, Smartphone, Check, Download } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { PLATFORMS } from "@/lib/constants";

const platformIcons: Record<number, React.ReactNode> = {
  0: <Monitor size={36} aria-hidden="true" />,
  1: <Globe size={36} aria-hidden="true" />,
  2: <Smartphone size={36} aria-hidden="true" />,
};

export default function TradingPlatformsHome() {
  return (
    <section className="section-padding" aria-labelledby="platforms-home-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Platforms"
          title="Trade Anywhere, Anytime"
          subtitle="Access your account and the global markets through our suite of powerful, reliable trading platforms."
          id="platforms-home-heading"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                index === 0
                  ? "border-gold-500/40 bg-gradient-to-b from-navy-700/80 to-navy-800/60"
                  : "border-white/8 bg-navy-800/40 hover:border-gold-500/20"
              }`}
            >
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    index === 0
                      ? "bg-gold-500/15 border border-gold-500/30 text-gold-400"
                      : "bg-white/5 border border-white/10 text-slate-300"
                  }`}
                >
                  {platformIcons[index]}
                </div>

                <h3 className="font-heading font-bold text-white text-2xl mb-1">
                  {platform.name}
                </h3>
                <p className="text-gold-400/80 text-sm font-medium mb-4">
                  {platform.subtitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {platform.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8" role="list" aria-label={`${platform.name} features`}>
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Check size={11} className="text-gold-400" />
                      </span>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Download buttons */}
                <div className="space-y-2.5">
                  {platform.downloads.map((dl) => (
                    <a
                      key={dl.label}
                      href={dl.href}
                      className={`flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        index === 0
                          ? "bg-gold-500 hover:bg-gold-400 text-navy-900"
                          : "border border-white/15 hover:border-gold-500/40 text-white hover:text-gold-400"
                      }`}
                      aria-label={`Download ${platform.name} — ${dl.label}`}
                    >
                      <Download size={15} aria-hidden="true" />
                      {dl.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
