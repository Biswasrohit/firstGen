import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CostOfMistakes } from "@/components/landing/CostOfMistakes";
import { SocialProof } from "@/components/landing/SocialProof";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CostOfMistakes />
      <SocialProof />

      {/* Footer */}
      <footer className="py-12 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#eafcff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="font-display text-sm font-bold text-on-surface">
              FirstGen
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">
            Your global journey, guided.
          </p>
          <p className="text-xs text-on-surface-variant/60">
            Built with care at RamHacks 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
