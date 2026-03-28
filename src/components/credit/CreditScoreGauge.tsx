"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

interface CreditScoreGaugeProps {
  score: number;
  label: string;
  maxScore?: number;
  minScore?: number;
}

/**
 * Uses the circle + stroke-dasharray + stroke-dashoffset technique
 * to draw a semicircular gauge. A circle is drawn with:
 *   - strokeDasharray = dashLength + large gap (only one dash visible)
 *   - strokeDashoffset = -πr (shifts start to bottom-left, i.e. 180°)
 * This creates a clean semicircle with rounded linecaps.
 */
function semicircleArc(
  radius: number,
  widthPerc: number,
  stroke: string,
  strokeWidth: number,
  cx: number,
  cy: number,
  opacity = 1,
  offsetPerc = 0,
) {
  const halfCircumference = Math.PI * radius;
  const dashLength = (halfCircumference * widthPerc) / 100;
  const baseOffset = -halfCircumference;
  const additionalOffset = -(halfCircumference * offsetPerc) / 100;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={`${dashLength} 10000`}
      strokeDashoffset={baseOffset + additionalOffset}
      stroke={stroke}
      opacity={opacity}
    />
  );
}

export function CreditScoreGauge({
  score,
  label,
  maxScore = 850,
  minScore = 300,
}: CreditScoreGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const cx = 100;
  const cy = 100;
  const radius = 65;
  const strokeWidth = 22;

  const halfCircumference = Math.PI * radius;
  const scorePercentage = ((score - minScore) / (maxScore - minScore)) * 100;
  const scoreDashLength = (halfCircumference * scorePercentage) / 100;

  // Marker dot position on the semicircle
  const markerAngle = Math.PI * (1 - scorePercentage / 100);
  const markerX = cx + radius * Math.cos(markerAngle);
  const markerY = cy - radius * Math.sin(markerAngle);

  const getColor = () => {
    if (score < 580) return "#ac3434";
    if (score < 670) return "#8c5100";
    if (score < 740) return "#006973";
    return "#1b6d24";
  };

  const getRating = () => {
    if (score < 580) return "Poor";
    if (score < 670) return "Fair";
    if (score < 740) return "Good";
    return "Excellent";
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Gauge container -- clips to top half of the circle */}
      <div className="relative w-[200px] h-[120px] overflow-hidden">
        {/* SVG with the circle arcs */}
        <div className="absolute inset-0">
          <svg width="200" height="200">
            <defs>
              {/* Horizontal gradient: red (left) -> ochre -> teal -> green (right) */}
              <linearGradient id="scoreArcGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ac3434" />
                <stop offset="40%" stopColor="#8c5100" />
                <stop offset="65%" stopColor="#006973" />
                <stop offset="100%" stopColor="#1b6d24" />
              </linearGradient>
            </defs>

            {/* 1. Gray background -- full semicircle */}
            {semicircleArc(radius, 100, "#e5e5e5", strokeWidth, cx, cy)}

            {/* 2. Animated score arc -- gradient from red to green */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth - 2}
              strokeLinecap="round"
              stroke="url(#scoreArcGradient)"
              strokeDasharray={`${scoreDashLength} 10000`}
              initial={{ strokeDashoffset: -halfCircumference + scoreDashLength }}
              animate={
                isInView
                  ? { strokeDashoffset: -halfCircumference }
                  : { strokeDashoffset: -halfCircumference + scoreDashLength }
              }
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            />

            {/* 3. Score marker dot -- pops in at the end of the score arc */}
            <motion.circle
              cx={markerX}
              cy={markerY}
              r={strokeWidth / 2 - 1}
              fill={getColor()}
              stroke="#fef8f3"
              strokeWidth={2.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay: 1.3, ease: "backOut" }}
              style={{ transformOrigin: `${markerX}px ${markerY}px` }}
            />
          </svg>
        </div>

        {/* Min/Max labels */}
        <div className="absolute bottom-0 left-0 right-0 text-center pb-0.5">
          <p className="text-[11px] text-[#999] flex justify-between px-2">
            <span>{minScore}</span>
            <span>{maxScore}</span>
          </p>
        </div>
      </div>

      <div className="text-center -mt-1">
        <p
          className="font-display text-4xl font-bold"
          style={{ color: getColor() }}
        >
          <AnimatedCounter target={score} duration={1.4} />
        </p>
        <motion.p
          className="text-sm font-medium"
          style={{ color: getColor() }}
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          {getRating()}
        </motion.p>
        <motion.p
          className="text-xs text-on-surface-variant mt-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}
