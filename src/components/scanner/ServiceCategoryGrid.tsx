"use client";

import { motion } from "framer-motion";

interface Category {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "banks",
    label: "Bank Account",
    description: "Checking & savings fees",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
  },
  {
    id: "remittance",
    label: "Money Transfers",
    description: "International remittance fees",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone Plan",
    description: "Monthly phone bills",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "credit_cards",
    label: "Credit Cards",
    description: "Annual fees & rewards",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

interface ServiceCategoryGridProps {
  selectedCategory: string | null;
  scannedCategories: Set<string>;
  onSelect: (categoryId: string | null) => void;
}

export function ServiceCategoryGrid({
  selectedCategory,
  scannedCategories,
  onSelect,
}: ServiceCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const isActive = cat.id === selectedCategory;
        const isScanned = scannedCategories.has(cat.id);

        return (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(isActive ? null : cat.id)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative p-5 rounded-2xl text-left transition-colors ${
              isActive
                ? "bg-primary/10 ring-2 ring-primary shadow-tinted-teal"
                : isScanned
                ? "bg-savings-good/5 shadow-soft"
                : "bg-white shadow-soft hover:shadow-soft-lg"
            }`}
          >
            <div
              className={`mb-3 ${
                isActive
                  ? "text-primary"
                  : isScanned
                  ? "text-savings-good"
                  : "text-on-surface-variant"
              }`}
            >
              {cat.icon}
            </div>
            <p className="font-medium text-sm text-on-surface">{cat.label}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {cat.description}
            </p>
            {isScanned && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-savings-good flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
