"use client";

import { TopNav } from "@/components/layout/TopNav";
import { CreditScoreGauge } from "@/components/credit/CreditScoreGauge";
import { CreditExplainer } from "@/components/credit/CreditExplainer";
import { CreditTimeline } from "@/components/credit/CreditTimeline";
import { getCreditExplainers, getCreditTimeline } from "@/data/demo-credit";

export default function CreditPage() {
  const explainers = getCreditExplainers();
  const timeline = getCreditTimeline();

  return (
    <div>
      <TopNav title="Credit Builder" subtitle="Build your US credit score from scratch" />

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-4xl">
          {/* Header with gauge */}
          <div className="grid md:grid-cols-[1fr_auto] gap-8 mb-10">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                Credit Score Roadmap
              </p>
              <h2 className="font-display text-3xl font-bold text-on-surface mb-2">
                From Zero to 700+ in 12 Months
              </h2>
              <p className="text-on-surface-variant">
                As an international student, you arrive with no US credit history. Follow this
                step-by-step timeline to build a strong credit score — no SSN required to start.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <CreditScoreGauge
                score={700}
                label="Your 12-month target"
              />
            </div>
          </div>

          {/* Explainers */}
          <div className="mb-10">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-4">
              Understanding Credit
            </h3>
            <CreditExplainer items={explainers} />
          </div>

          {/* Timeline */}
          <div className="mb-10">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-4">
              Your 18-Month Credit Timeline
            </h3>
            <CreditTimeline milestones={timeline} />
          </div>

          {/* Concierge insight */}
          <div className="bg-primary-container/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-lg">{"\u{1F4A1}"}</span>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Concierge Insight</p>
                <p className="text-sm text-on-surface">
                  The single most important rule: never miss a payment. Set up autopay for the full
                  statement balance on every card. A perfect payment history for 12 months is worth
                  more than any other credit-building strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
