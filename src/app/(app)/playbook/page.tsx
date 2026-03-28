"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { TopNav } from "@/components/layout/TopNav";
import { PlaybookStepCard } from "@/components/playbook/PlaybookStep";
import { PlaybookSummary } from "@/components/playbook/PlaybookSummary";
import { getPlaybookForCountry } from "@/data/demo-playbooks";
import { getCountryFlag } from "@/lib/constants";
import type { PlaybookStep } from "@/lib/types";
import toast from "react-hot-toast";

const STORAGE_KEY = "firstgen_playbook";

export default function PlaybookPage() {
  const { user } = useAuth();
  const [steps, setSteps] = useState<PlaybookStep[]>([]);

  useEffect(() => {
    if (!user) return;

    // Check localStorage first
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setSteps(JSON.parse(cached));
        return;
      } catch {
        // fall through to demo data
      }
    }

    // Load demo data
    const demoSteps = getPlaybookForCountry(user.countryOfOrigin);
    setSteps(demoSteps);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSteps));
  }, [user]);

  const handleMarkDone = useCallback(
    (id: string) => {
      setSteps((prev) => {
        const updated = prev.map((step) => {
          if (step.id === id) {
            return { ...step, status: "completed" as const };
          }
          return step;
        });

        // Unlock the next step
        const completedIdx = updated.findIndex((s) => s.id === id);
        if (completedIdx >= 0 && completedIdx < updated.length - 1) {
          const nextStep = updated[completedIdx + 1];
          if (nextStep.status === "locked" || nextStep.status === "up_next") {
            updated[completedIdx + 1] = {
              ...nextStep,
              status: "in_progress" as const,
            };
          }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      toast.success("Step completed! Great progress!", {
        icon: "\u{1F389}",
      });
    },
    []
  );

  if (!user) return null;

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalSavings = steps.reduce((sum, s) => sum + s.savings.annualSavings, 0);

  return (
    <div>
      <TopNav
        title="Your Financial Playbook"
        subtitle={`Personalized for students from ${user.countryOfOrigin || "your country"} ${user.hasSSN ? "with" : "without"} an SSN`}
      />

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-4xl">
          {/* Playbook progress header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {getCountryFlag(
                  user.countryOfOrigin === "India"
                    ? "IN"
                    : user.countryOfOrigin === "China"
                    ? "CN"
                    : user.countryOfOrigin === "Mexico"
                    ? "MX"
                    : user.countryOfOrigin === "Nigeria"
                    ? "NG"
                    : "IN"
                )}
              </span>
              <div>
                <p className="text-sm text-on-surface-variant">
                  {completedCount} of {steps.length} steps completed
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Potential savings</p>
              <p className="font-display text-lg font-bold text-savings-good">
                ${totalSavings.toLocaleString()}/year
              </p>
            </div>
          </div>

          {/* Steps */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PlaybookStepCard step={step} onMarkDone={handleMarkDone} />
              </motion.div>
            ))}
          </motion.div>

          {/* Summary */}
          <div className="mt-8">
            <PlaybookSummary steps={steps} />
          </div>

          {/* Concierge tip */}
          <div className="mt-6 bg-ochre-light/30 rounded-2xl p-5 border-l-4 border-ochre">
            <div className="flex items-start gap-3">
              <span className="text-lg">{"\u{1F4A1}"}</span>
              <div>
                <p className="text-sm font-medium text-ochre mb-1">Concierge Tip</p>
                <p className="text-sm text-on-surface">
                  You&apos;re doing great, {user.name.split(" ")[0]}!
                  Complete the first two steps in your first week.
                  Opening a bank account and setting up Wise are the highest-impact
                  actions and will save you the most money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
