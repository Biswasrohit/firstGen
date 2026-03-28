"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CreditScoreGaugeProps {
  score: number;
  label: string;
  maxScore?: number;
  minScore?: number;
}

export function CreditScoreGauge({
  score,
  label,
  maxScore = 850,
  minScore = 300,
}: CreditScoreGaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  const range = maxScore - minScore;
  const normalized = (score - minScore) / range;
  const sweepAngle = 180;
  const rotation = normalized * sweepAngle;

  // SVG arc parameters
  const cx = 150;
  const cy = 140;
  const r = 110;

  // Calculate arc path for the background
  const startAngle = 180; // left side
  const endAngle = 0; // right side

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (start: number, end: number) => {
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  // Color based on score range
  const getColor = () => {
    if (score < 580) return "#ac3434"; // poor
    if (score < 670) return "#8c5100"; // fair
    if (score < 740) return "#006973"; // good
    return "#1b6d24"; // excellent
  };

  const getRating = () => {
    if (score < 580) return "Poor";
    if (score < 670) return "Fair";
    if (score < 740) return "Good";
    return "Excellent";
  };

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 300 170" className="w-full max-w-[280px]">
        {/* Background arc */}
        <path
          d={arcPath(startAngle, endAngle)}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Colored segments */}
        <path
          d={arcPath(180, 144)}
          fill="none"
          stroke="#ac3434"
          strokeWidth="20"
          strokeLinecap="round"
          opacity={0.3}
        />
        <path
          d={arcPath(144, 108)}
          fill="none"
          stroke="#8c5100"
          strokeWidth="20"
          opacity={0.3}
        />
        <path
          d={arcPath(108, 54)}
          fill="none"
          stroke="#006973"
          strokeWidth="20"
          opacity={0.3}
        />
        <path
          d={arcPath(54, 0)}
          fill="none"
          stroke="#1b6d24"
          strokeWidth="20"
          strokeLinecap="round"
          opacity={0.3}
        />

        {/* Needle */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={isInView ? { rotate: rotation } : { rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx - r + 25}
            y2={cy}
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="6" fill={getColor()} />
        </motion.g>

        {/* Labels */}
        <text x="30" y="165" className="text-[11px]" fill="#999" textAnchor="middle">
          300
        </text>
        <text x="270" y="165" className="text-[11px]" fill="#999" textAnchor="middle">
          850
        </text>
      </svg>

      <div className="text-center -mt-2">
        <motion.p
          className="font-display text-4xl font-bold"
          style={{ color: getColor() }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          {score}
        </motion.p>
        <p className="text-sm font-medium" style={{ color: getColor() }}>
          {getRating()}
        </p>
        <p className="text-xs text-on-surface-variant mt-1">{label}</p>
      </div>
    </div>
  );
}
