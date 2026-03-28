"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  skipAnimation?: boolean;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className = "",
  skipAnimation = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(skipAnimation ? target : 0);

  useEffect(() => {
    if (skipAnimation || !isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayValue(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, skipAnimation]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
