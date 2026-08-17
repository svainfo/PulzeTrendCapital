"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-950" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div
                className="font-heading font-bold text-4xl md:text-5xl gradient-text mb-2"
                aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix}`}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                  separator={stat.separator}
                  duration={2.5}
                />
              </div>
              <div className="h-0.5 w-8 bg-gold-500/40 mx-auto mb-2 group-hover:w-16 transition-all duration-500" aria-hidden="true" />
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
