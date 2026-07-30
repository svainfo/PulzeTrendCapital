"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Twitter, Linkedin, Instagram, Youtube, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Risk Disclosure", href: "/risk-disclosure" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "AML Policy", href: "/aml" },
];

const FOOTER_TRADING = [
  { label: "Forex Trading", href: "/trading#forex" },
  { label: "Gold Trading", href: "/trading#gold" },
  { label: "Indices", href: "/trading#indices" },
  { label: "Account Types", href: "/trading#accounts" },
  { label: "nTrader", href: "/trading#platforms" },
  { label: "Open Live Account", href: "#" },
];

const socialIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter size={18} aria-hidden="true" />,
  linkedin: <Linkedin size={18} aria-hidden="true" />,
  instagram: <Instagram size={18} aria-hidden="true" />,
  youtube: <Youtube size={18} aria-hidden="true" />,
  telegram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.09 13.998l-2.96-.924c-.64-.203-.654-.64.136-.954l11.566-4.46c.537-.194 1.006.131.832.942z"/>
    </svg>
  ),
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4" noValidate>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading" || status === "success"}
          aria-label="Email for newsletter"
          className="flex-1 bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-label="Subscribe to newsletter"
          className="btn-primary !p-2.5 !rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </div>
      {status === "success" && (
        <p className="mt-2 text-xs text-green-400">✓ Successfully subscribed!</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/5" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center w-fit hover:opacity-90 transition-opacity"
              aria-label="PulzeTrend Capital Home"
            >
              <Image
                src="/logo.png"
                alt="PulzeTrend Capital"
                width={280}
                height={76}
                style={{ width: "auto", height: "76px", display: "block" }}
              />
            </Link>
            <p className="mt-5 text-slate-400 text-sm leading-relaxed">
              Professional Forex & CFD trading platform for modern traders. Serving 100+ clients across 50+ countries.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200"
                >
                  {socialIcons[social.icon] ?? <ExternalLink size={16} aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm tracking-wide uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trading Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm tracking-wide uppercase mb-5">
              Trading
            </h3>
            <ul className="space-y-3" role="list">
              {FOOTER_TRADING.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm tracking-wide uppercase mb-5">
              Stay Updated
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get market insights, trading tips, and company updates delivered to your inbox.
            </p>
            <NewsletterForm />

            <div className="mt-6">
              <h4 className="font-heading font-semibold text-white text-xs tracking-wide uppercase mb-3">Contact</h4>
              <div className="space-y-1.5 text-sm text-slate-400">
                <p>{SITE_CONFIG.email}</p>
                <p className="text-xs">{SITE_CONFIG.businessHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6">
          <div className="bg-navy-800/40 rounded-xl p-4 border border-yellow-600/10">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="text-yellow-500/80 font-semibold">Risk Warning: </span>
              Trading Forex, CFDs, and other leveraged products involves significant risk of loss and may not be suitable for all investors. You should never trade money you cannot afford to lose. Past performance is not indicative of future results. Please ensure you fully understand the risks involved and seek independent advice if necessary.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">
              © {currentYear} PulzeTrend Capital. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap items-center gap-4" role="list">
                {FOOTER_LEGAL.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 text-xs hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
