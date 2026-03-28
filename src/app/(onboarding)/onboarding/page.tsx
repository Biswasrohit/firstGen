"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { COUNTRIES, VISA_TYPES, FINANCIAL_CONCERNS, getCountryCurrency } from "@/lib/constants";

const STEPS = ["Identity", "Status", "Finances", "Goals"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState<string>("");
  const [hasSSN, setHasSSN] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [sendsMoneyHome, setSendsMoneyHome] = useState<string>("no");
  const [concerns, setConcerns] = useState<string[]>([]);

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleComplete = () => {
    const countryData = COUNTRIES.find((c) => c.name === country);
    updateProfile({
      countryOfOrigin: country,
      primaryCurrency: countryData ? getCountryCurrency(countryData.code) : "USD",
      visaType: visaType as "student" | "work" | "immigrant" | "citizen",
      hasSSN,
      hasBankAccount,
      sendsMoneyHome: sendsMoneyHome as "frequently" | "sometimes" | "no",
      financialConcerns: concerns,
      onboardingComplete: true,
    });
    router.push("/playbook");
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!country;
      case 1: return !!visaType;
      case 2: return true;
      case 3: return concerns.length > 0;
      default: return false;
    }
  };

  const toggleConcern = (id: string) => {
    setConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eafcff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-on-surface">FirstGen</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-on-surface-variant">
            {STEPS.map((s, i) => (
              <span key={s} className={i <= step ? "text-primary font-medium" : ""}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-surface-container-high rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-12">
          {/* Sidebar progress */}
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-4">Onboarding</p>
            <p className="text-sm font-medium text-on-surface mb-6">Building your playbook</p>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { if (i < step) { setDirection(i < step ? -1 : 1); setStep(i); } }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                    i === step
                      ? "bg-primary text-on-primary font-medium"
                      : i < step
                      ? "text-savings-good"
                      : "text-on-surface-variant"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    i < step
                      ? "bg-savings-good text-white"
                      : i === step
                      ? "bg-on-primary/20 text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}>
                    {i < step ? "\u2713" : i + 1}
                  </span>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-2">
              Step {step + 1} of {STEPS.length}
            </p>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                  {step === 0 && (
                    <>
                      <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
                        Where are you from?
                      </h2>
                      <p className="text-on-surface-variant mb-8">
                        Knowing your origin helps us tailor legal and financial advice
                        specific to your home country&apos;s treaties.
                      </p>
                      <label className="block text-sm font-medium text-on-surface mb-2">
                        Select Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                      >
                        <option value="">Choose your country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
                        What brings you to the US?
                      </h2>
                      <p className="text-on-surface-variant mb-8">
                        Your visa type determines which financial products and
                        services are available to you.
                      </p>
                      <div className="space-y-3">
                        {VISA_TYPES.map((v) => (
                          <button
                            key={v.value}
                            onClick={() => setVisaType(v.value)}
                            className={`w-full text-left px-5 py-4 rounded-xl transition-colors ${
                              visaType === v.value
                                ? "bg-primary/10 ring-2 ring-primary text-primary font-medium"
                                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
                        Your financial situation
                      </h2>
                      <p className="text-on-surface-variant mb-8">
                        These details help us personalize your playbook recommendations.
                      </p>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-high">
                          <span className="text-on-surface">Do you have a Social Security Number (SSN)?</span>
                          <div className="flex gap-2">
                            {[true, false].map((val) => (
                              <button
                                key={String(val)}
                                onClick={() => setHasSSN(val)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  hasSSN === val
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container text-on-surface-variant"
                                }`}
                              >
                                {val ? "Yes" : "No"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-high">
                          <span className="text-on-surface">Do you already have a US bank account?</span>
                          <div className="flex gap-2">
                            {[true, false].map((val) => (
                              <button
                                key={String(val)}
                                onClick={() => setHasBankAccount(val)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  hasBankAccount === val
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container text-on-surface-variant"
                                }`}
                              >
                                {val ? "Yes" : "No"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-surface-container-high">
                          <span className="block text-on-surface mb-3">Do you send money home regularly?</span>
                          <div className="flex gap-2">
                            {[
                              { value: "frequently", label: "Frequently" },
                              { value: "sometimes", label: "Sometimes" },
                              { value: "no", label: "No" },
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => setSendsMoneyHome(opt.value)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  sendsMoneyHome === opt.value
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container text-on-surface-variant"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2 className="font-display text-3xl font-bold text-on-surface mb-3">
                        What are your biggest financial concerns?
                      </h2>
                      <p className="text-on-surface-variant mb-8">
                        Select all that apply. This helps us prioritize your playbook steps.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {FINANCIAL_CONCERNS.map((concern) => (
                          <button
                            key={concern.id}
                            onClick={() => toggleConcern(concern.id)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors ${
                              concerns.includes(concern.id)
                                ? "bg-primary/10 ring-2 ring-primary text-primary"
                                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                            }`}
                          >
                            <span className="text-xl">{concern.icon}</span>
                            <span className="text-sm font-medium">{concern.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-4 mt-8">
                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="px-6 py-3 rounded-full text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={goNext}
                      disabled={!canProceed()}
                      className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {step === STEPS.length - 1 ? "Build My Playbook" : "Next"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <p className="flex items-center gap-2 text-xs text-on-surface-variant mt-4">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Safe &amp; Encrypted
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* What's coming next preview */}
            {step === 0 && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-4">
                  What&apos;s coming next
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "\u{1F30D}", label: "What brings you to the US?" },
                    { icon: "\u{1F512}", label: "Do you have a Social Security Number (SSN)?" },
                    { icon: "\u{1F3E6}", label: "Do you already have a US bank account?" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl p-4 shadow-soft">
                      <span className="text-lg mb-2 block">{item.icon}</span>
                      <p className="text-xs text-on-surface-variant">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inspirational quote */}
            <div className="mt-8 bg-ochre-light/30 rounded-2xl p-6 border-l-4 border-ochre">
              <p className="text-on-surface italic leading-relaxed">
                &quot;Moving to a new country is a huge milestone. We&apos;re here to make
                sure your finances are the least of your worries.&quot;
              </p>
              <p className="text-sm text-on-surface-variant mt-2">
                - FirstGen Advisors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
