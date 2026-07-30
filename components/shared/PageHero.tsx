"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section
      className="relative min-h-[45vh] flex items-center pt-32 pb-20 overflow-hidden"
      aria-label={`${title} hero`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,175,55,0.15), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Animated Orbs */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase font-body mb-4"
          >
            {eyebrow}
          </motion.span>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 text-balance">
            {title}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mb-6" aria-hidden="true" />
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary">
                  {primaryCta.label}
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-outline">
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
