"use client";

import { motion } from "framer-motion";

const mistakes = [
  {
    mistake: "Wrong bank account",
    cost: "$144/yr",
    detail: "Monthly maintenance fees you do not need to pay",
    icon: "\u{1F3E6}",
  },
  {
    mistake: "Expensive remittances",
    cost: "$480/yr",
    detail: "Hidden exchange rate markups and wire transfer fees",
    icon: "\u{1F4B8}",
  },
  {
    mistake: "Overpriced phone plan",
    cost: "$360/yr",
    detail: "Paying for a postpaid plan when prepaid works better",
    icon: "\u{1F4F1}",
  },
  {
    mistake: "No credit building",
    cost: "Priceless",
    detail: "Missing out on apartments, car loans, and better rates",
    icon: "\u{1F4B3}",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function CostOfMistakes() {
  return (
    <section id="savings" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-on-surface to-on-surface/90 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-12">
            <p className="text-primary-container text-sm font-semibold uppercase tracking-wider mb-3">
              The real cost
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight-display text-white mb-4">
              Don&apos;t Pay the &quot;Newcomer Tax&quot;
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              International students lose an average of $800+ in their first
              year to fees they did not know they were paying.
            </p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {mistakes.map((item) => (
              <motion.div
                key={item.mistake}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <p className="text-sm text-white/60 mb-1">{item.mistake}</p>
                <p className="font-display text-2xl font-bold text-error-container mb-2">
                  {item.cost}
                </p>
                <p className="text-sm text-white/50">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-white/70 text-lg">
              Total potential loss:{" "}
              <span className="font-display font-bold text-error-container text-2xl">
                $984+/year
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
