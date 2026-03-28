"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CreditExplainerItem } from "@/data/demo-credit";

interface CreditExplainerProps {
  items: CreditExplainerItem[];
}

export function CreditExplainer({ items }: CreditExplainerProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-soft overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center gap-3 p-5 text-left hover:bg-surface-container-high/30 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="font-medium text-on-surface flex-1 text-sm">
                {item.question}
              </p>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-on-surface-variant flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="bg-primary-container/20 rounded-xl p-4">
                      <p className="text-sm text-on-surface leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
