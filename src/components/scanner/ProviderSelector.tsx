"use client";

import { motion } from "framer-motion";
import servicesData from "@/data/services.json";
import { formatCurrency } from "@/lib/utils";

type CategoryKey = keyof typeof servicesData;

interface ProviderSelectorProps {
  category: string;
  selectedProvider: string;
  scanning: boolean;
  onProviderChange: (provider: string) => void;
  onScan: () => void;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    banks: "bank account",
    remittance: "money transfer service",
    phone: "phone plan",
    credit_cards: "credit card",
  };
  return labels[category] ?? category;
}

export function ProviderSelector({
  category,
  selectedProvider,
  scanning,
  onProviderChange,
  onScan,
}: ProviderSelectorProps) {
  const services = servicesData[category as CategoryKey] ?? [];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <p className="text-sm font-medium text-on-surface mb-3">
          What {getCategoryLabel(category)} do you currently use?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="flex-1 h-12 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="">Select your current provider</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name} - {formatCurrency(s.monthlyCost)}/mo
              </option>
            ))}
          </select>
          <button
            onClick={onScan}
            disabled={!selectedProvider || scanning}
            className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {scanning ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              "Scan for Savings"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
