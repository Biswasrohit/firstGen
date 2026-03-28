"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { formatCurrency } from "@/lib/utils";
import { getAuditResult } from "@/data/demo-audits";
import type { FeeAudit } from "@/lib/types";

const categories = [
  { id: "bank", label: "Bank Account", icon: "\u{1F3E6}", providers: ["Chase Total Checking", "Bank of America Advantage SafePass", "TD Bank Convenience Checking"] },
  { id: "remittance", label: "Money Transfers", icon: "\u{1F4B8}", providers: ["Western Union", "Xoom/PayPal", "Bank Wire Transfer"] },
  { id: "phone", label: "Phone Plan", icon: "\u{1F4F1}", providers: ["AT&T Postpaid", "T-Mobile Postpaid", "Verizon Postpaid"] },
  { id: "subscriptions", label: "Subscriptions", icon: "\u{1F4B3}", providers: [] },
];

export default function ScannerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [audits, setAudits] = useState<FeeAudit[]>([]);
  const [scanning, setScanning] = useState(false);

  const totalSavings = audits.reduce((sum, a) => sum + a.annualSavings, 0);

  const handleScan = async () => {
    if (!selectedCategory || !selectedProvider) return;

    setScanning(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const result = getAuditResult(selectedCategory, selectedProvider);
    if (result) {
      setAudits((prev) => {
        const existing = prev.findIndex((a) => a.category === result.category);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = result;
          return updated;
        }
        return [...prev, result];
      });
    }

    setScanning(false);
    setSelectedCategory(null);
    setSelectedProvider("");
  };

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div>
      <TopNav title="Fee Scanner" subtitle="Find out if you are overpaying" />

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                Financial Audit
              </p>
              <h2 className="font-display text-3xl font-bold text-on-surface">
                Are You Overpaying?
              </h2>
              <p className="text-on-surface-variant mt-1">
                Enter your current services and we will audit your expenses to find hidden savings.
              </p>
            </div>
            {totalSavings > 0 && (
              <div className="text-right bg-savings-good/10 rounded-2xl px-5 py-3">
                <p className="text-xs text-savings-good font-medium">Total Savings Found</p>
                <p className="font-display text-2xl font-bold text-savings-good">
                  <AnimatedCounter target={totalSavings} prefix="$" suffix="/year" />
                </p>
              </div>
            )}
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((cat) => {
              const hasAudit = audits.some((a) => a.category === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id === selectedCategory ? null : cat.id);
                    setSelectedProvider("");
                  }}
                  className={`p-5 rounded-2xl text-left transition-all ${
                    cat.id === selectedCategory
                      ? "bg-primary/10 ring-2 ring-primary shadow-tinted-teal"
                      : hasAudit
                      ? "bg-savings-good/5 shadow-soft"
                      : "bg-white shadow-soft hover:shadow-soft-lg"
                  }`}
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <p className="font-medium text-sm text-on-surface">{cat.label}</p>
                  {hasAudit && (
                    <p className="text-xs text-savings-good font-medium mt-1">Scanned</p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Provider picker */}
          <AnimatePresence>
            {selectedCategory && activeCategory && activeCategory.providers.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <p className="text-sm font-medium text-on-surface mb-3">
                    What {activeCategory.label.toLowerCase()} do you currently use?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="flex-1 h-12 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">Select your current provider</option>
                      {activeCategory.providers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleScan}
                      disabled={!selectedProvider || scanning}
                      className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {scanning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        "Scan Now"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audit results */}
          <div className="space-y-4">
            {audits.map((audit, idx) => (
              <motion.div
                key={`${audit.category}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-soft p-6"
              >
                <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
                  {/* Current */}
                  <div className="bg-savings-bad/5 rounded-xl p-4">
                    <p className="text-xs text-savings-bad font-medium uppercase tracking-wider mb-1">Current</p>
                    <p className="font-medium text-on-surface">{audit.currentProvider}</p>
                    <p className="font-display text-xl font-bold text-savings-bad mt-1">
                      {formatCurrency(audit.currentCostPerYear)}/yr
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Recommended */}
                  <div className="bg-savings-good/5 rounded-xl p-4">
                    <p className="text-xs text-savings-good font-medium uppercase tracking-wider mb-1">Switch to</p>
                    <p className="font-medium text-on-surface">{audit.recommendedProvider}</p>
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
                <div className="bg-ochre-light/30 rounded-xl p-4 border-l-4 border-ochre">
                  <p className="text-xs font-medium text-ochre mb-1">AI Insight</p>
                  <p className="text-sm text-on-surface">{audit.aiInsight}</p>
                </div>

                {/* Switching steps */}
                <details className="mt-4">
                  <summary className="text-sm font-medium text-primary cursor-pointer hover:underline">
                    How to switch ({audit.switchingSteps.length} steps)
                  </summary>
                  <ol className="mt-3 space-y-2">
                    {audit.switchingSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </details>
              </motion.div>
            ))}
          </div>

          {/* Concierge insight */}
          <div className="mt-8 bg-primary-container/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-lg">{"\u{1F4A1}"}</span>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Concierge Insight</p>
                <p className="text-sm text-on-surface">
                  Most international students overpay on banking and remittance fees because they sign up for the
                  first option they find. A quick audit of your current services can save you hundreds per year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
