"use client";

import Link from "next/link";
import { motion } from "framer-motion";
const universities = [
  "Fordham University",
  "NYU",
  "Columbia",
  "Pace University",
  "Stevens Institute",
  "Rutgers",
  "Stony Brook",
  "Baruch College",
];

export function SocialProof() {
  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
            Trusted by students worldwide
          </p>

          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight-display text-on-surface mb-4">
            Ready to start your US journey with confidence?
          </h2>

          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Join 420+ students who are already saving with their personalized
            financial playbook.
          </p>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-semibold text-on-primary hover:bg-primary-dim transition-colors shadow-tinted-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mb-12"
          >
            Build My Playbook
          </Link>

          <div className="flex flex-wrap justify-center gap-3">
            {universities.map((uni) => (
              <span
                key={uni}
                className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm text-on-surface-variant shadow-soft"
              >
                {uni}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
