"use client";

import { formatCurrency } from "@/lib/utils";
import type { PlaybookStep } from "@/lib/types";

interface SavingsComparisonProps {
  savings: PlaybookStep["savings"];
}

export function SavingsComparison({ savings }: SavingsComparisonProps) {
  return (
    <div className="mt-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Bad option */}
        <div className="bg-savings-bad/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-savings-bad" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-xs font-medium text-savings-bad uppercase tracking-wider">Common choice</span>
          </div>
          <p className="font-medium text-on-surface text-sm mb-1">{savings.badOption.name}</p>
          <p className="font-display text-xl font-bold text-savings-bad">
            {formatCurrency(savings.badOption.costPerYear)}
            <span className="text-xs font-normal text-on-surface-variant">/year</span>
          </p>
          <p className="text-xs text-on-surface-variant mt-1">{savings.badOption.details}</p>
        </div>

        {/* Good option */}
        <div className="bg-savings-good/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-savings-good" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-medium text-savings-good uppercase tracking-wider">Recommended</span>
          </div>
          <p className="font-medium text-on-surface text-sm mb-1">{savings.goodOption.name}</p>
          <p className="font-display text-xl font-bold text-savings-good">
            {formatCurrency(savings.goodOption.costPerYear)}
            <span className="text-xs font-normal text-on-surface-variant">/year</span>
          </p>
          <p className="text-xs text-on-surface-variant mt-1">{savings.goodOption.details}</p>
        </div>
      </div>

      {savings.annualSavings > 0 && (
        <div className="mt-3 bg-savings-good/10 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-savings-good font-medium">Annual savings</span>
          <span className="font-display text-lg font-bold text-savings-good">
            +{formatCurrency(savings.annualSavings)}
          </span>
        </div>
      )}
    </div>
  );
}
