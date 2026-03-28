"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { TopNav } from "@/components/layout/TopNav";
import { PlaybookStepCard } from "@/components/playbook/PlaybookStep";
import { PlaybookSummary } from "@/components/playbook/PlaybookSummary";
import { getPlaybookForCountry } from "@/data/demo-playbooks";
import { getCountryFlag } from "@/lib/constants";
import { generatePlaybook } from "@/app/actions/generate-playbook";
import type { PlaybookStep } from "@/lib/types";
import toast from "react-hot-toast";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";

const STORAGE_KEY = "firstgen_ai_playbook_v1";
const LEGACY_STORAGE_KEY = "firstgen_playbook";

export default function PlaybookPage() {
  const { user } = useAuth();
  const [steps, setSteps] = useState<PlaybookStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const [isUsingAI, setIsUsingAI] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadPlaybook = async () => {
      setIsLoading(true);

      // Check for AI-generated playbook first
      const aiCached = localStorage.getItem(STORAGE_KEY);
      if (aiCached) {
        try {
          const { steps: cachedSteps, timestamp } = JSON.parse(aiCached);
          setSteps(cachedSteps);
          setLastGenerated(timestamp);
          setIsUsingAI(true);
          setIsLoading(false);
          return;
        } catch {
          // Continue to generate
        }
      }

      // Check legacy cache
      const legacyCached = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyCached) {
        try {
          const legacySteps = JSON.parse(legacyCached);
          setSteps(legacySteps);
          setIsLoading(false);
          return;
        } catch {
          // Continue to generate
        }
      }

      // Auto-generate AI playbook on first load
      await handleGeneratePlaybookInternal();
    };

    loadPlaybook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleGeneratePlaybookInternal = async (forceRefresh = false) => {
    if (!user) return;

    setIsGenerating(true);

    try {
      const generatedSteps = await generatePlaybook(user);

      setSteps(generatedSteps);
      const timestamp = new Date().toISOString();
      setLastGenerated(timestamp);
      setIsUsingAI(true);

      // Cache the generated playbook
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ steps: generatedSteps, timestamp })
      );

      // Show success toast only on manual refresh, not auto-generate
      if (forceRefresh) {
        toast.success("Your personalized playbook has been refreshed!", {
          icon: "✨",
        });
      }
    } catch (error) {
      console.error("Failed to generate playbook:", error);
      toast.error("Could not generate AI playbook. Using fallback recommendations.");

      // Fallback to demo data
      const demoSteps = getPlaybookForCountry(user.countryOfOrigin);
      setSteps(demoSteps);
      setIsUsingAI(false);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (confirm("This will regenerate your playbook using AI. Continue?")) {
      handleGeneratePlaybookInternal(true);
    }
  };

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

  const formatLastGenerated = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  const completedCount = steps?.filter((s) => s.status === "completed").length ?? 0;
  const totalSavings = steps?.reduce((sum, s) => sum + s.savings.annualSavings, 0) ?? 0;

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
                  {completedCount} of {steps?.length ?? 0} steps completed
                </p>
                {isUsingAI && lastGenerated && (
                  <p className="text-xs text-on-surface-variant/70 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI-generated {formatLastGenerated(lastGenerated)}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Potential savings</p>
              <p className="font-display text-lg font-bold text-savings-good">
                ${totalSavings.toLocaleString()}/year
              </p>
            </div>
          </div>

          {/* AI Playbook Actions */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isUsingAI && !isLoading && !isGenerating && (
                <button
                  onClick={() => handleGeneratePlaybookInternal()}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary font-medium text-sm hover:bg-primary-dim transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {isGenerating ? "Generating..." : "Generate AI Playbook"}
                </button>
              )}
              {isUsingAI && (
                <button
                  onClick={handleRefresh}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              )}
            </div>
            {isUsingAI && (
              <span className="text-xs text-on-surface-variant flex items-center gap-1 bg-ochre-light/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-ochre" />
                Personalized by AI
              </span>
            )}
          </div>

          {/* Loading State */}
          {isLoading || isGenerating ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-container-high rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-6 bg-surface-container rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-surface-container rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-surface-container rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Steps */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {steps?.map((step) => (
                  <motion.div
                    key={step.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <PlaybookStepCard step={step} onMarkDone={handleMarkDone} user={user} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Summary */}
              <div className="mt-8">
                <PlaybookSummary steps={steps ?? []} />
              </div>

              {/* Concierge tip */}
              <div className="mt-6 bg-ochre-light/30 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{"\u{1F4A1}"}</span>
                  <div>
                    <p className="text-sm font-medium text-ochre mb-1">Concierge Tip</p>
                    <p className="text-sm text-on-surface">
                      You&apos;re doing great, {user.name.split(" ")[0]}!
                      Complete the first two steps in your first week.
                      {isUsingAI
                        ? " These recommendations are tailored specifically to your situation."
                        : " Opening a bank account and setting up Wise are the highest-impact actions and will save you the most money."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
