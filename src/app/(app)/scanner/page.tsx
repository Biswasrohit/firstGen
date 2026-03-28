"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { TopNav } from "@/components/layout/TopNav";
import { ServiceCategoryGrid } from "@/components/scanner/ServiceCategoryGrid";
import { ProviderSelector } from "@/components/scanner/ProviderSelector";
import { AuditResultCard } from "@/components/scanner/AuditResultCard";
import { TotalSavingsCounter } from "@/components/scanner/TotalSavingsCounter";
import { useAuth } from "@/lib/auth-context";
import { getAuditResult } from "@/data/demo-audits";
import { formatCurrency } from "@/lib/utils";
import type { FeeAudit } from "@/lib/types";

// Map internal category keys to the demo-audits category keys
const DEMO_CATEGORY_MAP: Record<string, string> = {
  banks: "bank",
  remittance: "remittance",
  phone: "phone",
  credit_cards: "credit_cards",
};

const CATEGORY_LABELS: Record<string, string> = {
  banks: "bank account",
  remittance: "money transfers",
  phone: "phone plan",
  credit_cards: "credit card",
};

export default function ScannerPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [audits, setAudits] = useState<FeeAudit[]>([]);
  const [scanning, setScanning] = useState(false);

  const totalSavings = useMemo(
    () => audits.reduce((sum, a) => sum + a.annualSavings, 0),
    [audits]
  );

  const scannedCategories = useMemo(
    () => new Set(audits.map((a) => a.category)),
    [audits]
  );

  const handleScan = async () => {
    if (!selectedCategory || !selectedProvider) return;

    setScanning(true);

    try {
      // Try API route first
      const response = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          currentProvider: selectedProvider,
          userProfile: user
            ? {
                countryOfOrigin: user.countryOfOrigin,
                hasSSN: user.hasSSN,
                primaryCurrency: user.primaryCurrency,
                sendsMoneyHome: user.sendsMoneyHome,
              }
            : undefined,
        }),
      });

      let result: FeeAudit | null = null;

      if (response.ok) {
        result = await response.json();
      } else {
        // Fall back to demo data
        const demoCategory = DEMO_CATEGORY_MAP[selectedCategory] ?? selectedCategory;
        result = getAuditResult(demoCategory, selectedProvider);
      }

      if (result) {
        // Normalize category to the grid's key for scannedCategories tracking
        const normalizedResult = { ...result, category: selectedCategory };

        setAudits((prev) => {
          const existingIdx = prev.findIndex(
            (a) => a.category === selectedCategory
          );
          if (existingIdx >= 0) {
            const updated = [...prev];
            updated[existingIdx] = normalizedResult;
            return updated;
          }
          return [...prev, normalizedResult];
        });

        const label = CATEGORY_LABELS[selectedCategory] ?? selectedCategory;
        toast.success(
          `Found ${formatCurrency(normalizedResult.annualSavings)}/year in savings on your ${label}!`
        );
      } else {
        toast.error("No better alternatives found for this service.");
      }
    } catch {
      // Last resort: demo data fallback
      const demoCategory = DEMO_CATEGORY_MAP[selectedCategory] ?? selectedCategory;
      const result = getAuditResult(demoCategory, selectedProvider);
      if (result) {
        const normalizedResult = { ...result, category: selectedCategory };
        setAudits((prev) => {
          const existingIdx = prev.findIndex(
            (a) => a.category === selectedCategory
          );
          if (existingIdx >= 0) {
            const updated = [...prev];
            updated[existingIdx] = normalizedResult;
            return updated;
          }
          return [...prev, normalizedResult];
        });
        toast.success(
          `Found ${formatCurrency(normalizedResult.annualSavings)}/year in savings!`
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setScanning(false);
      setSelectedCategory(null);
      setSelectedProvider("");
    }
  };

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
                Input your current services and we will find out.
              </p>
            </div>
            <TotalSavingsCounter total={totalSavings} />
          </div>

          {/* Category Grid */}
          <div className="mb-8">
            <ServiceCategoryGrid
              selectedCategory={selectedCategory}
              scannedCategories={scannedCategories}
              onSelect={(id) => {
                setSelectedCategory(id);
                setSelectedProvider("");
              }}
            />
          </div>

          {/* Provider Picker */}
          <AnimatePresence>
            {selectedCategory && (
              <div className="mb-8">
                <ProviderSelector
                  category={selectedCategory}
                  selectedProvider={selectedProvider}
                  scanning={scanning}
                  onProviderChange={setSelectedProvider}
                  onScan={handleScan}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Audit Results */}
          <div className="space-y-4">
            {audits.map((audit, idx) => (
              <AuditResultCard
                key={`${audit.category}-${audit.currentProvider}`}
                audit={audit}
                index={idx}
              />
            ))}
          </div>

          {/* Concierge insight */}
          {audits.length === 0 && (
            <div className="mt-8 bg-primary-container/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-lg">{"\u{1F4A1}"}</span>
                <div>
                  <p className="text-sm font-medium text-primary mb-1">
                    Concierge Insight
                  </p>
                  <p className="text-sm text-on-surface">
                    Most international students overpay on banking and remittance
                    fees because they sign up for the first option they find. A
                    quick audit of your current services can save you hundreds per
                    year.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
