"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-surface to-surface-container-low" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-savings-good animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Students have saved{" "}
                <AnimatedCounter
                  target={48200}
                  prefix="$"
                  className="font-bold"
                />
                + so far
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight-display leading-[1.1] text-on-surface mb-6">
              Your First Year in America Shouldn&apos;t Cost You{" "}
              <span className="text-primary">Thousands</span> in Hidden Fees.
            </h1>

            <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl mb-8">
              Get your personalized financial playbook in under 2 minutes.
              FirstGen tells you exactly what to do, why, and how much you will
              save.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-on-primary hover:bg-primary-dim transition-colors shadow-tinted-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Build My Playbook
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-surface-container px-8 py-4 text-base font-medium text-on-surface hover:bg-surface-container-high transition-colors"
              >
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Right: playbook preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-soft-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-on-surface">
                      Your Playbook
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      Personalized for you
                    </p>
                  </div>
                </div>

                {/* Preview steps */}
                {[
                  {
                    title: "Open a fee-free bank account",
                    saving: "$144",
                    done: true,
                  },
                  {
                    title: "Switch to low-cost remittance",
                    saving: "$480",
                    done: true,
                  },
                  {
                    title: "Get a secured credit card",
                    saving: "$0 annual fee",
                    done: false,
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-surface-container last:border-0"
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                        step.done
                          ? "bg-savings-good text-white"
                          : "bg-surface-container"
                      )}
                    >
                      {step.done ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-xs font-medium text-on-surface-variant">
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-on-surface">
                        {step.title}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-savings-good">
                      {step.saving}
                    </span>
                  </div>
                ))}

                <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">
                    Total annual savings
                  </span>
                  <span className="font-display text-2xl font-bold text-savings-good">
                    $624+
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary-container/30 rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
