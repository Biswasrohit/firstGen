"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import type { FeeAudit } from "@/lib/types";

interface AuditResultCardProps {
  audit: FeeAudit;
  index: number;
}

export function AuditResultCard({ audit, index }: AuditResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white rounded-2xl shadow-soft p-6"
    >
      {/* Current vs Recommended */}
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
        {/* Current */}
        <div className="bg-savings-bad/5 rounded-xl p-4">
          <p className="text-xs text-savings-bad font-medium uppercase tracking-wider mb-1">
            Current
          </p>
          <p className="font-medium text-on-surface">{audit.currentProvider}</p>
          <p className="font-display text-xl font-bold text-savings-bad mt-1">
            {formatCurrency(audit.currentCostPerYear)}/yr
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden sm:flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>

        {/* Recommended */}
        <div className="bg-savings-good/5 rounded-xl p-4">
          <p className="text-xs text-savings-good font-medium uppercase tracking-wider mb-1">
            Switch to
          </p>
          <p className="font-medium text-on-surface">
            {audit.recommendedProvider}
          </p>
          <p className="font-display text-xl font-bold text-savings-good mt-1">
            {formatCurrency(audit.recommendedCostPerYear)}/yr
          </p>
        </div>
      </div>

      {/* Savings banner */}
      <div className="bg-primary rounded-xl px-5 py-3 flex items-center justify-between mb-4">
        <span className="text-on-primary font-medium">Switch and save</span>
        <span className="font-display text-xl font-bold text-on-primary">
          {formatCurrency(audit.annualSavings)}/year
        </span>
      </div>

      {/* AI Insight */}
      <div className="bg-ochre-light/30 rounded-xl p-4 border-l-4 border-ochre mb-4">
        <p className="text-xs font-medium text-ochre mb-1">AI Insight</p>
        <p className="text-sm text-on-surface leading-relaxed">
          {audit.aiInsight}
        </p>
      </div>

      {/* Switching steps */}
      <details className="group">
        <summary className="text-sm font-medium text-primary cursor-pointer hover:underline">
          How to switch ({audit.switchingSteps.length} steps)
        </summary>
        <ol className="mt-3 space-y-2">
          {audit.switchingSteps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-on-surface"
            >
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </details>
    </motion.div>
  );
}
