"use client";

import { motion } from "framer-motion";
import { Eye, Shield, Lightbulb, Users, Target, Telescope } from "lucide-react";
import { CORE_VALUES, TIMELINE_EVENTS } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";

const valueIcons: Record<string, React.ReactNode> = {
  eye: <Eye size={24} aria-hidden="true" />,
  shield: <Shield size={24} aria-hidden="true" />,
  lightbulb: <Lightbulb size={24} aria-hidden="true" />,
  users: <Users size={24} aria-hidden="true" />,
};

function MissionVision() {
  return (
    <section className="section-padding" aria-labelledby="mission-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">About PulzeTrend Capital</span>
            <h2 id="mission-heading" className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mt-3 mb-5">
              Democratizing Professional{" "}
              <span className="gradient-text">Trading for Everyone</span>
            </h2>
            <div className="divider-gold" aria-hidden="true" />
            <p className="text-slate-300 text-lg leading-relaxed mt-5">
              PulzeTrend Capital was founded in 2026 with a single conviction: that every trader deserves access to institutional-grade technology, fair pricing, and transparent conditions.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              We launched as a boutique brokerage and are already serving 100+ clients worldwide — built on personal service, integrity, and a commitment to fair trading conditions.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-8">
              {[
                { icon: <Target size={20} />, label: "Mission", text: "Empower traders with professional tools, fair conditions, and 24/7 support." },
                { icon: <Telescope size={20} />, label: "Vision", text: "Become the world's most trusted and accessible trading platform by 2030." },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 text-gold-400 mb-3" aria-hidden="true">
                    {item.icon}
                    <span className="font-heading font-semibold text-white text-sm">{item.label}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — stats visual */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            aria-hidden="true"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 bg-gradient-to-br from-navy-800 to-navy-900 p-8">
              {/* Globe SVG */}
              <div className="text-center mb-8">
                <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto opacity-60" aria-hidden="true">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth="1"/>
                  <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1"/>
                  <ellipse cx="100" cy="100" rx="90" ry="65" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1"/>
                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(212,175,55,0.1)" strokeWidth="1"/>
                  {[30, 60, 120, 150].map(x => (
                    <line key={x} x1={x} y1="10" x2={x} y2="190" stroke="rgba(212,175,55,0.06)" strokeWidth="1"/>
                  ))}
                  {/* Points */}
                  {[
                    [85, 75], [120, 90], [60, 110], [140, 65], [95, 130], [155, 105]
                  ].map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="4" fill="#D4AF37" opacity="0.8"/>
                      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                {[
                  { val: "150+", label: "Countries" },
                  { val: "250K+", label: "Clients" },
                  { val: "$18B+", label: "Monthly Volume" },
                  { val: "2026", label: "Founded" },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-950/50 rounded-xl p-4 border border-white/5">
                    <div className="font-heading font-bold text-gold-400 text-xl">{item.val}</div>
                    <div className="text-slate-500 text-xs mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="values-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Foundation"
          title="Core Values"
          subtitle="Every decision we make — from technology investments to client communications — is guided by these principles."
          id="values-heading"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/15 flex items-center justify-center text-gold-400 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                {valueIcons[value.icon] ?? <Shield size={24} aria-hidden="true" />}
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-3">{value.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section-padding" aria-labelledby="timeline-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Journey"
          title="Milestones That Define Us"
          id="timeline-heading"
        />

        <div className="mt-14 relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent hidden md:block"
            aria-hidden="true"
          />

          <ol className="space-y-10" aria-label="Company timeline">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.li
                key={event.year}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex md:items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content box */}
                <div className="flex-1 md:max-w-[45%]">
                  <div className="card p-6 hover:border-gold-500/25">
                    <div className="text-gold-500 font-heading font-bold text-2xl mb-1">{event.year}</div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2">{event.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className="hidden md:flex w-5 h-5 rounded-full bg-gold-500 border-4 border-navy-900 flex-shrink-0 z-10"
                  aria-hidden="true"
                />

                <div className="flex-1 md:max-w-[45%] hidden md:block" aria-hidden="true" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function LeadershipTeam() {
  const leaders = [
    { name: "Alexander Reid", role: "Chief Executive Officer", bg: "from-blue-800 to-navy-900" },
    { name: "Sofia Konstantinou", role: "Chief Trading Officer", bg: "from-gold-800/30 to-navy-900" },
    { name: "Marcus Chen", role: "Chief Technology Officer", bg: "from-green-900/30 to-navy-900" },
  ];

  return (
    <section className="section-padding bg-navy-950/50" aria-labelledby="leadership-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Leadership"
          title="The Team Behind PulzeTrend"
          subtitle="Experienced professionals from top financial institutions and technology companies."
          id="leadership-heading"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="card p-6 text-center group"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${leader.bg} border border-gold-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                <span className="text-gold-400 font-heading font-bold text-2xl" aria-hidden="true">
                  {leader.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-white text-base">{leader.name}</h3>
              <p className="text-gold-500/70 text-xs mt-1">{leader.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { MissionVision, CoreValues, Timeline, LeadershipTeam };
