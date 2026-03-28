"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { PlaybookStep as PlaybookStepType, UserProfile } from "@/lib/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SavingsComparison } from "./SavingsComparison";
import { askFollowUp } from "@/app/actions/ask-followup";
import { Loader2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

interface PlaybookStepProps {
  step: PlaybookStepType;
  onMarkDone: (id: string) => void;
  user: UserProfile;
}

export function PlaybookStepCard({ step, onMarkDone, user }: PlaybookStepProps) {
  const [expanded, setExpanded] = useState(step.status === "in_progress");
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isCompleted = step.status === "completed";
  const isLocked = step.status === "locked";

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await askFollowUp(question, { step, user });
      setAnswer(response);
      toast.success("Got an answer!");
    } catch {
      toast.error("Failed to get an answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex gap-4">
      {/* Step circle + line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
            isCompleted && "bg-savings-good text-white",
            step.status === "in_progress" && "bg-primary text-on-primary",
            step.status === "up_next" && "bg-ochre text-white",
            isLocked && "bg-surface-container-high text-on-surface-variant"
          )}
        >
          {isCompleted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-sm font-semibold">{step.order}</span>
          )}
        </div>
        <div className={cn(
          "w-0.5 flex-1 mt-2",
          isCompleted ? "bg-savings-good/30" : "bg-surface-container-high"
        )} />
      </div>

      {/* Card */}
      <div className="flex-1 mb-4">
        <button
          onClick={() => !isLocked && setExpanded(!expanded)}
          disabled={isLocked}
          className={cn(
            "w-full text-left bg-white rounded-2xl shadow-soft p-5 transition-all",
            !isLocked && "hover:shadow-soft-lg cursor-pointer",
            isLocked && "opacity-60"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-on-surface">{step.title}</h3>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {step.savings.annualSavings > 0 && (
                <span className="text-sm font-semibold text-savings-good">
                  +{formatCurrency(step.savings.annualSavings)}
                </span>
              )}
              <StatusBadge status={step.status} />
            </div>
          </div>
        </button>

        <AnimatePresence>
          {expanded && !isLocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-b-2xl shadow-soft px-5 pb-5 -mt-2 pt-4">
                {/* Why it matters */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                    Why it matters
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {step.explanation}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="bg-primary/5 rounded-xl p-4 mb-4 border-l-4 border-primary">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2">
                    Recommendation
                  </p>
                  <p className="font-medium text-on-surface">{step.recommendation.name}</p>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {step.recommendation.description}
                  </p>
                </div>

                {/* Savings comparison */}
                <SavingsComparison savings={step.savings} />

                {/* Why we recommend */}
                <div className="mt-4 bg-savings-good/5 rounded-xl p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-savings-good flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-on-surface">{step.recommendation.whyWeRecommend}</p>
                </div>

                {/* How to switch */}
                {step.howToSwitch && step.howToSwitch.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                      How to get started
                    </p>
                    <ol className="space-y-2">
                      {step.howToSwitch.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                          <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-medium text-on-surface-variant flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Ask a Follow-up Question */}
                <div className="mt-6 border-t border-surface-container-high pt-4">
                  {!showAskQuestion ? (
                    <button
                      onClick={() => setShowAskQuestion(true)}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary-dim transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Have a question about this step?
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-wider text-on-surface-variant">
                        Ask a follow-up question
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && !isLoading && handleAskQuestion()}
                          placeholder="e.g., What documents do I need?"
                          className="flex-1 px-3 py-2 text-sm border border-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                          disabled={isLoading}
                        />
                        <button
                          onClick={handleAskQuestion}
                          disabled={isLoading || !question.trim()}
                          className="px-4 py-2 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-dim transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Ask"
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setShowAskQuestion(false);
                          setQuestion("");
                          setAnswer(null);
                        }}
                        className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
                      >
                        Cancel
                      </button>

                      {/* Answer Display */}
                      {answer && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 bg-primary/5 rounded-xl p-4 border-l-4 border-primary"
                        >
                          <p className="text-xs uppercase tracking-wider text-primary mb-2">
                            AI Response
                          </p>
                          <p className="text-sm text-on-surface leading-relaxed">{answer}</p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mark as done */}
                {!isCompleted && (
                  <button
                    onClick={() => onMarkDone(step.id)}
                    className="mt-6 w-full sm:w-auto px-6 py-2.5 rounded-full bg-savings-good text-white font-semibold hover:bg-savings-good/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-savings-good"
                  >
                    Mark as Done
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
