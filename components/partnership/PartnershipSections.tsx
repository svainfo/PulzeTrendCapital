"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  DollarSign, Users, Megaphone, BarChart, Globe, Clock,
  ChevronRight, CheckCircle, Loader2,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { IB_BENEFITS } from "@/lib/constants";
import { partnerFormSchema, type PartnerFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

const benefitIcons: Record<string, React.ReactNode> = {
  "dollar-sign": <DollarSign size={24} aria-hidden="true" />,
  "users": <Users size={24} aria-hidden="true" />,
  "megaphone": <Megaphone size={24} aria-hidden="true" />,
  "bar-chart": <BarChart size={24} aria-hidden="true" />,
  "globe": <Globe size={24} aria-hidden="true" />,
  "clock": <Clock size={24} aria-hidden="true" />,
};

export function ProgramsOverview() {
  const programs = [
    {
      id: "ib",
      title: "Introducing Broker",
      subtitle: "Refer clients, earn per trade",
      description:
        "Ideal for financial advisors, trading coaches, and social traders. Earn rebates on every trade your referred clients make — for life.",
      highlights: ["Up to $15/lot rebate", "Lifetime commission", "Real-time tracking"],
      color: "from-blue-500/10 to-transparent",
    },
    {
      id: "affiliate",
      title: "Affiliate Program",
      subtitle: "Drive traffic, earn CPA",
      description:
        "Perfect for bloggers, YouTubers, and media owners. Earn a fixed CPA for every qualified deposit from your referrals.",
      highlights: ["Up to $600 CPA", "30-day cookie", "Marketing toolkit"],
      color: "from-gold-500/10 to-transparent",
    },
    {
      id: "institutional",
      title: "Institutional Partnership",
      subtitle: "Asset managers & fund operators",
      description:
        "Tailored solutions for fund managers, asset management companies, and institutional participants requiring custom pricing.",
      highlights: ["Custom spreads", "Dedicated desk", "White-label options"],
      color: "from-purple-500/10 to-transparent",
    },
  ];

  return (
    <section className="section-padding" aria-labelledby="programs-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Partnership Programs"
          title="Grow Your Business with PulzeTrend"
          subtitle="Three flexible partnership models designed to match your business type and audience."
          id="programs-heading"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              id={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/8 bg-navy-800/40 hover:border-gold-500/25 transition-all p-7 group"
            >
              <div
                className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", program.color)}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="inline-block bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                  {program.subtitle}
                </div>
                <h3 className="font-heading font-bold text-white text-2xl mb-3">{program.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{program.description}</p>
                <ul className="space-y-2.5" role="list">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-gold-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-slate-300 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsGrid() {
  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="benefits-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Partner Benefits"
          title="Everything You Need to Succeed"
          id="benefits-heading"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {IB_BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {benefitIcons[benefit.icon] ?? <DollarSign size={24} aria-hidden="true" />}
              </div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerRegistrationForm() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
  });

  const onSubmit = async (data: PartnerFormData) => {
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject: `Partnership Enquiry — ${data.partnerType}` }),
      });
      if (res.ok) {
        setFormStatus("success");
        reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full bg-navy-800/60 border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none transition-colors",
      hasError ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-gold-500/50"
    );

  return (
    <section className="section-padding" aria-labelledby="partner-form-heading">
      <div className="container-custom max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Apply Now"
          title="Become a Partner"
          subtitle="Fill in the form below and our partnership team will be in touch within 24 hours."
          id="partner-form-heading"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          {formStatus === "success" ? (
            <div className="text-center py-16 glass rounded-2xl">
              <CheckCircle size={56} className="text-green-400 mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-heading font-bold text-white text-2xl mb-3">Application Received!</h3>
              <p className="text-slate-400">Our partnership team will contact you within 24 business hours.</p>
              <button onClick={() => setFormStatus("idle")} className="btn-ghost mt-6">Submit Another</button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass rounded-2xl p-8 space-y-5"
              aria-label="Partner registration form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="partner-firstName" className="block text-slate-300 text-sm font-medium mb-2">First Name *</label>
                  <input id="partner-firstName" {...register("firstName")} placeholder="Alexander" className={inputClass(!!errors.firstName)} aria-describedby={errors.firstName ? "fn-error" : undefined} />
                  {errors.firstName && <p id="fn-error" role="alert" className="mt-1.5 text-red-400 text-xs">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="partner-lastName" className="block text-slate-300 text-sm font-medium mb-2">Last Name *</label>
                  <input id="partner-lastName" {...register("lastName")} placeholder="Reid" className={inputClass(!!errors.lastName)} aria-describedby={errors.lastName ? "ln-error" : undefined} />
                  {errors.lastName && <p id="ln-error" role="alert" className="mt-1.5 text-red-400 text-xs">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="partner-email" className="block text-slate-300 text-sm font-medium mb-2">Email *</label>
                  <input id="partner-email" type="email" {...register("email")} placeholder="you@example.com" className={inputClass(!!errors.email)} />
                  {errors.email && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="partner-phone" className="block text-slate-300 text-sm font-medium mb-2">Phone *</label>
                  <input id="partner-phone" type="tel" {...register("phone")} placeholder="+1 800 000 0000" className={inputClass(!!errors.phone)} />
                  {errors.phone && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="partner-country" className="block text-slate-300 text-sm font-medium mb-2">Country *</label>
                  <input id="partner-country" {...register("country")} placeholder="United States" className={inputClass(!!errors.country)} />
                  {errors.country && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.country.message}</p>}
                </div>
                <div>
                  <label htmlFor="partner-type" className="block text-slate-300 text-sm font-medium mb-2">Partnership Type *</label>
                  <select id="partner-type" {...register("partnerType")} className={cn(inputClass(!!errors.partnerType), "appearance-none cursor-pointer bg-navy-800/60")}>
                    <option value="" disabled>Select type</option>
                    <option value="ib">Introducing Broker</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="institutional">Institutional</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.partnerType && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.partnerType.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="partner-website" className="block text-slate-300 text-sm font-medium mb-2">Website / Social Media URL</label>
                <input id="partner-website" type="url" {...register("website")} placeholder="https://yourwebsite.com" className={inputClass(!!errors.website)} />
                {errors.website && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.website.message}</p>}
              </div>

              <div>
                <label htmlFor="partner-message" className="block text-slate-300 text-sm font-medium mb-2">Tell us about your business *</label>
                <textarea id="partner-message" {...register("message")} rows={4} placeholder="Describe your current audience, marketing channels, and goals..." className={cn(inputClass(!!errors.message), "resize-none")} />
                {errors.message && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input id="partner-consent" type="checkbox" {...register("consent")} className="mt-0.5 w-4 h-4 accent-gold-500 cursor-pointer flex-shrink-0" />
                <label htmlFor="partner-consent" className="text-slate-400 text-xs leading-relaxed cursor-pointer">
                  I agree to PulzeTrend Capital&apos;s <a href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</a> and consent to being contacted about partnership opportunities.
                </label>
              </div>
              {errors.consent && <p role="alert" className="text-red-400 text-xs">{errors.consent.message}</p>}

              {formStatus === "error" && (
                <div role="alert" className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-primary w-full !justify-center !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Submit partner application"
              >
                {formStatus === "loading" ? (
                  <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Submitting…</>
                ) : (
                  <>Submit Application <ChevronRight size={18} aria-hidden="true" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
