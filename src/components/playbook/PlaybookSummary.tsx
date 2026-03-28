"use client";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import type { PlaybookStep } from "@/lib/types";

interface PlaybookSummaryProps {
  steps: PlaybookStep[];
}

export function PlaybookSummary({ steps }: PlaybookSummaryProps) {
  const completed = steps.filter((s) => s.status === "completed").length;
  const total = steps.length;
  const totalSavings = steps.reduce((sum, s) => sum + s.savings.annualSavings, 0);
  const progress = total > 0 ? (completed / total) * 100 : 0;

  // SVG progress ring
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <div className="flex items-center gap-6">
        {/* Progress ring */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#eee7e0"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#006973"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-display text-xl font-bold text-primary">
                {completed}/{total}
              </span>
            </div>
          </div>
        </div>

        {/* Summary text */}
        <div className="flex-1">
          <p className="text-sm text-on-surface-variant mb-1">
            If you follow all steps, you&apos;ll save an estimated
          </p>
          <p className="font-display text-3xl font-bold text-savings-good">
            <AnimatedCounter target={totalSavings} prefix="$" />
            <span className="text-base font-normal text-on-surface-variant">
              {" "}in your first year.
            </span>
          </p>
          <p className="text-xs text-on-surface-variant mt-2">
            Based on typical student spending patterns
          </p>
        </div>
      </div>
    </div>
  );
}
