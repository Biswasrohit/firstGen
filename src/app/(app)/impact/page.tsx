"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { formatCurrency } from "@/lib/utils";
import {
  impactStats,
  savingsByCategory,
  universityLeaderboard,
  testimonials,
} from "@/data/demo-impact";

const ANIMATED_KEY = "firstgen_impact_animated";

export default function ImpactPage() {
  const maxCategoryAmount = Math.max(...savingsByCategory.map((c) => c.amount));
  const [hasAnimated, setHasAnimated] = useState(true); // default true to avoid flash
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    const alreadyAnimated = sessionStorage.getItem(ANIMATED_KEY) === "true";
    if (!alreadyAnimated) {
      setHasAnimated(false);
      sessionStorage.setItem(ANIMATED_KEY, "true");
    }
  }, []);

  return (
    <div>
      <TopNav title="Our Collective Impact" subtitle="See how students are saving together" />

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-4xl">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={hasAnimated ? { duration: 0 } : { delay: idx * 0.1, ease: "easeOut" as const }}
                className="bg-white rounded-2xl shadow-soft p-5 text-center"
              >
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className="font-display text-2xl font-bold text-on-surface">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    skipAnimation={hasAnimated}
                  />
                </p>
                <p className="text-xs text-on-surface-variant mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Savings by category */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-5">
              Savings by Category
            </h3>
            <div className="space-y-4">
              {savingsByCategory.map((cat, idx) => (
                <motion.div
                  key={cat.category}
                  initial={hasAnimated ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={hasAnimated ? { duration: 0 } : { delay: 0.3 + idx * 0.1, ease: "easeOut" as const }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium text-on-surface">{cat.category}</p>
                    <p className="text-sm font-semibold" style={{ color: cat.color }}>
                      {formatCurrency(cat.amount)}
                    </p>
                  </div>
                  <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                      initial={hasAnimated ? false : { width: 0 }}
                      animate={{ width: `${(cat.amount / maxCategoryAmount) * 100}%` }}
                      transition={hasAnimated ? { duration: 0 } : { duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" as const }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* University leaderboard */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-4">
              University Leaderboard
            </h3>
            <div className="space-y-3">
              {universityLeaderboard.map((uni) => (
                <div
                  key={uni.rank}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    uni.rank === 1 ? "bg-primary/5" : ""
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      uni.rank === 1
                        ? "bg-primary text-on-primary"
                        : uni.rank === 2
                        ? "bg-ochre/20 text-ochre"
                        : uni.rank === 3
                        ? "bg-surface-container-high text-on-surface"
                        : "bg-surface-container-high/50 text-on-surface-variant"
                    }`}
                  >
                    {uni.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface">{uni.university}</p>
                    <p className="text-xs text-on-surface-variant">
                      {uni.students} students saving
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-savings-good">
                    {formatCurrency(uni.totalSaved)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-4">
              Student Stories
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={hasAnimated ? { duration: 0 } : { delay: 0.5 + idx * 0.15, ease: "easeOut" as const }}
                  className="bg-white rounded-2xl shadow-soft p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{t.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {t.university}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="bg-savings-good/10 rounded-lg px-3 py-2">
                    <p className="text-xs text-savings-good font-semibold">
                      Saved {formatCurrency(t.saved)}/year
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-6 text-center">
            <h3 className="font-display text-xl font-bold text-on-primary mb-2">
              Join {impactStats[1].value}+ Students Saving Together
            </h3>
            <p className="text-on-primary/80 text-sm mb-4">
              Every student who switches to better financial products adds to our collective impact.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2">
              <span className="font-display text-lg font-bold text-on-primary">
                {formatCurrency(impactStats[0].value)}+
              </span>
              <span className="text-sm text-on-primary/80">saved so far</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
