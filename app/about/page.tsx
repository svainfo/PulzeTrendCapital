import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import {
  MissionVision,
  CoreValues,
  Timeline,
} from "@/components/about/AboutSections";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Our Story & Mission",
  description:
    "Learn about PulzeTrend Capital — our mission, vision, core values, global presence, and the team behind one of the fastest-growing forex brokerages serving 150+ countries.",
  alternates: { canonical: "https://pulzetrendcapital.com/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About PulzeTrend Capital",
  url: "https://pulzetrendcapital.com/about",
  description:
    "PulzeTrend Capital — Professional Forex & CFD Brokerage founded in 2026, serving 100+ clients worldwide.",
  mainEntity: {
    "@type": "FinancialService",
    name: "PulzeTrend Capital",
    foundingDate: "2026",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "100+" },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="About Us"
        title="Building the Future of Trading"
        subtitle="PulzeTrend Capital is a next-generation brokerage launched in 2026, built to deliver institutional-grade Forex and CFD trading with transparent conditions and unmatched client support."
        primaryCta={{ label: "Open Live Account", href: "#" }}
      />
      <MissionVision />
      <CoreValues />
      <Timeline />
      <section className="section-padding bg-navy-950/50" aria-labelledby="promise-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">Our Commitment</span>
            <h2 id="promise-heading" className="font-heading font-bold text-white text-3xl md:text-4xl mt-3">
              Built on Three Core Promises
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck size={28} className="text-gold-400" />,
                title: "Client Funds First",
                desc: "All client funds are held in fully segregated accounts — completely separate from company operations. Your capital is always protected.",
              },
              {
                icon: <Zap size={28} className="text-gold-400" />,
                title: "Ultra-Fast Execution",
                desc: "Orders executed in under 10ms with no re-quotes and no dealing desk interference. Pure, transparent market access on every trade.",
              },
              {
                icon: <HeartHandshake size={28} className="text-gold-400" />,
                title: "Always by Your Side",
                desc: "Our support team is available 24/5 via live chat and email — real people ready to help you at every step of your trading journey.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-navy-800/40 border border-white/8 rounded-2xl p-7 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-white text-xl">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        title="Trade with a Broker You Can Trust"
        subtitle="Transparent, client-first, and built for serious traders. Join 100+ traders already trading with PulzeTrend Capital."
        primaryLabel="Open Live Account"
        primaryHref="#"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
