"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  light?: boolean;
  id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  light = false,
  id,
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("flex flex-col gap-3", alignClass, className)}
    >
      {eyebrow && (
        <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase font-body">
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "font-heading font-bold text-balance",
          light ? "text-navy-900" : "text-white",
          "text-3xl md:text-4xl lg:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {align === "center" && (
        <div className="divider-gold" aria-hidden="true" />
      )}
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            light ? "text-slate-600" : "text-slate-400"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
