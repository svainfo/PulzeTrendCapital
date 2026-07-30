"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section
      className="section-padding bg-navy-950/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="Client Stories"
          title="Trusted by Traders Worldwide"
          subtitle="Join 100+ traders who have chosen PulzeTrend Capital as their preferred trading partner."
          id="testimonials-heading"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-6 relative flex flex-col"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-gold-500/20 mb-4 flex-shrink-0"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-500 text-gold-500" aria-hidden="true" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/40 to-navy-600 flex items-center justify-center text-gold-300 font-bold text-sm font-heading flex-shrink-0"
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-slate-500 text-xs">{testimonial.role}</p>
                  <p className="text-gold-500/60 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Rating aggregate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div>
            <div className="flex items-center justify-center gap-1 mb-1" aria-label="4.9 stars average rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold-500 text-gold-500" aria-hidden="true" />
              ))}
            </div>
            <p className="text-white font-bold text-2xl font-heading">4.9/5</p>
            <p className="text-slate-500 text-xs mt-1">Average Client Rating</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" aria-hidden="true" />
          <div>
            <p className="text-white font-bold text-2xl font-heading">10,000+</p>
            <p className="text-slate-500 text-xs mt-1">Verified Reviews</p>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" aria-hidden="true" />
          <div>
            <p className="text-white font-bold text-2xl font-heading">150+</p>
            <p className="text-slate-500 text-xs mt-1">Countries Represented</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
