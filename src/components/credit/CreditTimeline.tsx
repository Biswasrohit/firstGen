"use client";

import { motion } from "framer-motion";
import type { CreditMilestone } from "@/lib/types";

interface CreditTimelineProps {
  milestones: CreditMilestone[];
}

export function CreditTimeline({ milestones }: CreditTimelineProps) {
  return (
    <div className="overflow-x-auto pb-4 -mx-6 px-6">
      <div className="flex gap-4" style={{ minWidth: `${milestones.length * 260}px` }}>
        {milestones.map((milestone, idx) => {
          const isCurrent = milestone.status === "current";
          const isCompleted = milestone.status === "completed";

          return (
            <motion.div
              key={milestone.month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, ease: "easeOut" as const }}
              className="flex-shrink-0 w-[240px]"
            >
              {/* Timeline dot and line */}
              <div className="flex items-center mb-3">
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    isCurrent
                      ? "bg-primary ring-4 ring-primary/20"
                      : isCompleted
                      ? "bg-savings-good"
                      : "bg-surface-container-high"
                  }`}
                />
                {idx < milestones.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      isCompleted ? "bg-savings-good" : "bg-surface-container-high"
                    }`}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className={`rounded-2xl p-4 ${
                  isCurrent
                    ? "bg-primary/10 ring-2 ring-primary shadow-tinted-teal"
                    : isCompleted
                    ? "bg-savings-good/5 shadow-soft"
                    : "bg-white shadow-soft"
                }`}
              >
                <p className="text-xs font-medium text-on-surface-variant mb-1">
                  Month {milestone.month}
                </p>
                <p className="font-medium text-on-surface text-sm mb-2">
                  {milestone.title}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                  {milestone.description}
                </p>

                {/* Score range */}
                <div className="bg-surface-container-high/50 rounded-lg px-3 py-2 mb-2">
                  <p className="text-xs text-on-surface-variant">Expected Score</p>
                  <p className="text-sm font-semibold text-on-surface">
                    {milestone.estimatedScoreRange}
                  </p>
                </div>

                {/* Action */}
                <div className={`rounded-lg px-3 py-2 ${
                  isCurrent ? "bg-primary/10" : "bg-ochre-light/30"
                }`}>
                  <p className="text-xs text-on-surface-variant">Action</p>
                  <p className="text-xs font-medium text-on-surface">
                    {milestone.action}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
