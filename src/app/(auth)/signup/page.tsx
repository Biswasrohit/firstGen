"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { UNIVERSITIES } from "@/lib/constants";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({
      name: form.name,
      email: form.email,
      university: form.university,
    });
    router.push("/onboarding");
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.university &&
    form.password.length >= 6;

  return (
    <div className="w-full max-w-5xl grid lg:grid-cols-[1fr_380px] gap-12 items-start">
      {/* Form */}
      <div className="bg-white rounded-3xl shadow-soft p-8 lg:p-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                width="16"
                height="16"
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
            <span className="font-display text-lg font-bold text-on-surface">
              FirstGen
            </span>
          </Link>
          <p className="text-sm text-on-surface-variant">
            Your global journey, guided.
          </p>
        </div>

        {/* Welcome callout */}
        <div className="bg-ochre-light/40 rounded-2xl p-4 mb-8 border-l-4 border-ochre">
          <p className="text-sm text-on-surface">
            Welcome to the global student community. Let&apos;s build your
            playbook for a smooth transition.
          </p>
        </div>

        <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Alex Rivers"
              className="w-full h-12 px-4 rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="alex@university.edu"
              className="w-full h-12 px-4 rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <p className="text-xs text-on-surface-variant mt-1.5">
              Pro tip: Use your .edu email for campus-specific tips and
              student-exclusive guides.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              University
            </label>
            <select
              value={form.university}
              onChange={(e) => updateField("university", e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
            >
              <option value="">Select your destination campus</option>
              {UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="At least 6 characters"
              className="w-full h-12 px-4 rounded-xl bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full h-12 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>

      {/* Side feature cards */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <span className="text-xl">{"\u{1F30D}"}</span>
          </div>
          <h3 className="font-display font-semibold text-on-surface mb-1">
            Relocation Hub
          </h3>
          <p className="text-sm text-on-surface-variant">
            Access checklists for visas, housing, and local banking tailored to
            your university.
          </p>
        </div>

        <div className="bg-primary-container/30 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <span className="text-xl">{"\u{1F4B0}"}</span>
          </div>
          <h3 className="font-display font-semibold text-on-surface mb-1">
            Smart Finance
          </h3>
          <p className="text-sm text-on-surface-variant">
            Save on international transfers and track your student budget in
            real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
