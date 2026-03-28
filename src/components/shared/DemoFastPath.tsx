"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getCountryByName, getCountryCurrency } from "@/lib/constants";

const demoProfiles: Record<string, { name: string; country: string; university: string }> = {
  india: { name: "Priya Sharma", country: "India", university: "Fordham University" },
  china: { name: "Wei Liu", country: "China", university: "NYU" },
  mexico: { name: "Carlos Martinez", country: "Mexico", university: "Columbia University" },
  nigeria: { name: "Adaeze Okafor", country: "Nigeria", university: "Boston University" },
};

export function DemoFastPath() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signUp } = useAuth();

  useEffect(() => {
    const demo = searchParams.get("demo");
    if (!demo) return;

    const profile = demoProfiles[demo.toLowerCase()];
    if (!profile) return;

    const country = getCountryByName(profile.country);
    const currency = country ? getCountryCurrency(country.code) : "USD";

    signUp({
      name: profile.name,
      email: `${profile.name.toLowerCase().replace(/\s/g, ".")}@demo.firstgen.app`,
      university: profile.university,
      countryOfOrigin: profile.country,
      primaryCurrency: currency,
      visaType: "student",
      hasSSN: false,
      hasBankAccount: false,
      sendsMoneyHome: "frequently",
      financialConcerns: ["banking_fees", "sending_money_home", "building_credit"],
      onboardingComplete: true,
    });

    router.push("/playbook");
  }, [searchParams, signUp, router]);

  return null;
}
