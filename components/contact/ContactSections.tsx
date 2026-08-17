"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  MapPin, Mail, Clock,
  Twitter, Linkedin, Instagram, Youtube,
  CheckCircle, Loader2, Send,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { SITE_CONFIG, CONTACT_FAQ } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: <Twitter size={18} />, href: "https://twitter.com/pulzetrendcap", label: "Twitter" },
  { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/pulzetrendcapital", label: "LinkedIn" },
  { icon: <Instagram size={18} />, href: "https://instagram.com/pulzetrendcapital", label: "Instagram" },
  { icon: <Youtube size={18} />, href: "https://youtube.com/@pulzetrendcapital", label: "YouTube" },
];

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <section className="section-padding" aria-labelledby="contact-section-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Get in Touch"
          title="We're Here to Help"
          subtitle="Our team of experts is available 24/5 to assist with your trading account, technical questions, and general enquiries."
          id="contact-section-heading"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form — 3 cols */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {formStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 glass rounded-2xl">
                <CheckCircle size={56} className="text-green-400 mb-4" aria-hidden="true" />
                <h3 className="font-heading font-bold text-white text-2xl mb-3">Message Sent!</h3>
                <p className="text-slate-400 max-w-sm">
                  Thank you for contacting us. A member of our team will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="btn-ghost mt-6"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="glass rounded-2xl p-8 space-y-5"
                aria-label="Contact form"
              >
                <h2 className="font-heading font-semibold text-white text-xl">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-firstName" className="block text-slate-300 text-sm font-medium mb-2">First Name *</label>
                    <input id="contact-firstName" {...register("firstName")} placeholder="John" className={inputClass(!!errors.firstName)} />
                    {errors.firstName && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-lastName" className="block text-slate-300 text-sm font-medium mb-2">Last Name *</label>
                    <input id="contact-lastName" {...register("lastName")} placeholder="Smith" className={inputClass(!!errors.lastName)} />
                    {errors.lastName && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-slate-300 text-sm font-medium mb-2">Email *</label>
                    <input id="contact-email" type="email" {...register("email")} placeholder="you@example.com" className={inputClass(!!errors.email)} />
                    {errors.email && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-slate-300 text-sm font-medium mb-2">Phone</label>
                    <input id="contact-phone" type="tel" {...register("phone")} placeholder="+1 800 000 0000" className={inputClass(!!errors.phone)} />
                    {errors.phone && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-slate-300 text-sm font-medium mb-2">Subject *</label>
                  <input id="contact-subject" {...register("subject")} placeholder="Trading account enquiry" className={inputClass(!!errors.subject)} />
                  {errors.subject && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-slate-300 text-sm font-medium mb-2">Message *</label>
                  <textarea id="contact-message" {...register("message")} rows={5} placeholder="How can we help you today?" className={cn(inputClass(!!errors.message), "resize-none")} />
                  {errors.message && <p role="alert" className="mt-1.5 text-red-400 text-xs">{errors.message.message}</p>}
                </div>

                <div className="flex items-start gap-3">
                  <input id="contact-consent" type="checkbox" {...register("consent")} className="mt-0.5 w-4 h-4 accent-gold-500 cursor-pointer flex-shrink-0" />
                  <label htmlFor="contact-consent" className="text-slate-400 text-xs leading-relaxed cursor-pointer">
                    I agree to PulzeTrend Capital&apos;s <a href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</a> and consent to receiving a response to my enquiry.
                  </label>
                </div>
                {errors.consent && <p role="alert" className="text-red-400 text-xs">{errors.consent.message}</p>}

                {formStatus === "error" && (
                  <div role="alert" className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                    Failed to send your message. Please try again or email us directly at {SITE_CONFIG.email}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="btn-primary w-full !justify-center !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…</>
                  ) : (
                    <><Send size={18} aria-hidden="true" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info — 2 cols */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info Cards */}
            {[
              {
                icon: <MapPin size={20} />,
                label: "Our Office",
                value: SITE_CONFIG.address,
              },
              {
                icon: <Mail size={20} />,
                label: "Email",
                value: SITE_CONFIG.email,
                href: `mailto:${SITE_CONFIG.email}`,
              },
              {
                icon: <Clock size={20} />,
                label: "Business Hours",
                value: SITE_CONFIG.businessHours,
              },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/15 text-gold-400 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white text-sm hover:text-gold-400 transition-colors leading-relaxed">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="glass rounded-xl p-5">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-4">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`PulzeTrend Capital on ${social.label}`}
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function MapSection() {
  return (
    <section className="pb-20" aria-label="Office location map">
      <div className="container-custom">
        <div className="rounded-2xl overflow-hidden border border-white/8 h-80">
          <iframe
            src={SITE_CONFIG.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PulzeTrend Capital Office Location"
            aria-label="Google Maps showing PulzeTrend Capital office location"
          />
        </div>
      </div>
    </section>
  );
}

export function ContactFAQ() {
  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="contact-faq-heading">
      <div className="container-custom max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Common Questions"
          id="contact-faq-heading"
        />
        <div className="mt-10">
          <FAQAccordion items={CONTACT_FAQ} />
        </div>
      </div>
    </section>
  );
}
