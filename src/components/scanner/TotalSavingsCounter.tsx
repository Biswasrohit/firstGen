"use client";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

interface TotalSavingsCounterProps {
  total: number;
}

export function TotalSavingsCounter({ total }: TotalSavingsCounterProps) {
  if (total <= 0) {
    return (
      <div className="text-right">
        <p className="text-xs text-on-surface-variant font-medium">
          Total Savings Found
        </p>
        <p className="font-display text-2xl font-bold text-on-surface-variant">
          $0/year
        </p>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Scan a category to find savings
        </p>
      </div>
    );
  }

  return (
    <div className="text-right bg-savings-good/10 rounded-2xl px-5 py-3">
      <p className="text-xs text-savings-good font-medium">
        Total Savings Found
      </p>
      <p className="font-display text-2xl font-bold text-savings-good">
        <AnimatedCounter target={total} prefix="$" suffix="/year" />
      </p>
    </div>
  );
}
