"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Play, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? "#D4AF37" : "#94A3B8",
        });
      }
    };

    const drawCandlesticks = () => {
      const candles = 24;
      const candleWidth = canvas.width / candles;
      const baseY = canvas.height * 0.75;
      const amplitude = canvas.height * 0.35;

      for (let i = 0; i < candles; i++) {
        const x = i * candleWidth + candleWidth / 2;
        const isGreen = Math.random() > 0.45;
        const open = baseY - Math.sin(i * 0.5) * amplitude * 0.3 - Math.random() * 30;
        const close = open + (isGreen ? -1 : 1) * (Math.random() * 20 + 5);
        const high = Math.min(open, close) - Math.random() * 15;
        const low = Math.max(open, close) + Math.random() * 15;

        ctx.strokeStyle = isGreen ? "rgba(74, 222, 128, 0.25)" : "rgba(248, 113, 113, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, high);
        ctx.lineTo(x, low);
        ctx.stroke();

        ctx.fillStyle = isGreen ? "rgba(74, 222, 128, 0.15)" : "rgba(248, 113, 113, 0.15)";
        ctx.fillRect(x - candleWidth * 0.3, Math.min(open, close), candleWidth * 0.6, Math.abs(close - open) || 1);
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCandlesticks();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      initParticles();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Trade Global Markets with Confidence"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 80% at 70% 50%, rgba(212,175,55,0.06), transparent 60%), radial-gradient(ellipse 60% 80% at 0% 50%, rgba(15,45,85,0.8), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* World Map Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 720'%3E%3Cpath fill='%23D4AF37' d='M120 200 Q200 150 280 200 Q340 230 400 190 Q460 155 520 190 Q570 215 620 190 Q680 160 750 200 Q800 230 860 200 Q920 170 980 195 Q1030 215 1100 190 Q1160 165 1220 195 Q1280 220 1320 200'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-40 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            <TrendingUp size={14} className="text-gold-400" aria-hidden="true" />
            <span className="text-gold-400 text-xs font-semibold tracking-wide uppercase">
              Markets Open — Live Trading Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading font-bold text-white leading-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            Professional Forex &amp; CFD{" "}
            <span className="gradient-text">Trading Platform</span>
            <br />
            Built for Modern Traders
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-slate-300 text-xl leading-relaxed max-w-2xl"
          >
            Ultra-fast execution, low spreads, and{" "}
            <span className="text-gold-400 font-semibold">100+</span>{" "}
            satisfied clients worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <Link
              id="hero-open-live-account"
              href="#"
              className="btn-primary text-base !px-8 !py-4"
            >
              Open Live Account
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
            <Link
              id="hero-open-demo-account"
              href="#"
              className="btn-outline text-base !px-8 !py-4"
            >
              <Play size={16} aria-hidden="true" />
              Open Demo Account
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center gap-6 mt-12"
            aria-label="Trust indicators"
          >
            {[
              { label: "Secure Transactions" },
              { label: "Segregated Funds" },
              { label: "Low Spreads" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                </span>
                <span className="text-slate-400 text-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
