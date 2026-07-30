"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimal?: number;
  duration?: number;
  separator?: boolean;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimal = 0,
  duration = 2.5,
  separator = false,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimal}
          separator={separator ? "," : ""}
          useEasing
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
}
