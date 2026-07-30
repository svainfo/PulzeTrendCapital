"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className="section-padding relative overflow-hidden" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-950" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(212,175,55,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles size={14} className="text-gold-400" aria-hidden="true" />
            <span className="text-gold-400 text-xs font-semibold tracking-wide uppercase">
              Start Trading Today
            </span>
          </motion.div>

          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-5 text-balance">
            {title}
          </h2>

          {subtitle && (
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{subtitle}</p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref} className="btn-primary text-base !px-8 !py-4">
              {primaryLabel}
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} className="btn-outline text-base !px-8 !py-4">
                {secondaryLabel}
              </Link>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              "✓ Secure Transactions",
              "✓ Segregated Funds",
              "✓ No Hidden Fees",
              "✓ 24/5 Support",
            ].map((badge) => (
              <span key={badge} className="text-slate-400 text-sm">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
