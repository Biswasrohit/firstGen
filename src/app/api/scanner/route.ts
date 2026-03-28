import { NextResponse } from "next/server";
import servicesData from "@/data/services.json";

type CategoryKey = keyof typeof servicesData;

interface ScannerRequest {
  category: string;
  currentProvider: string;
  userProfile?: {
    countryOfOrigin?: string;
    hasSSN?: boolean;
    primaryCurrency?: string;
    sendsMoneyHome?: string;
  };
}

interface CorridorData {
  feePercent: number;
  exampleFee: number;
  exampleAmount: number;
}

interface ServiceEntry {
  id: string;
  name: string;
  provider: string;
  monthlyCost: number;
  annualCost: number;
  fees: string;
  ssnRequired: boolean;
  creditCheckRequired: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
  corridors?: Record<string, CorridorData>;
}

function computeFallbackAudit(
  category: string,
  currentProvider: string,
  services: ServiceEntry[],
  userProfile?: ScannerRequest["userProfile"]
) {
  const current = services.find((s) => s.name === currentProvider);
  if (!current) return null;

  const hasSSN = userProfile?.hasSSN ?? false;

  // Find cheapest alternative that matches SSN status
  const alternatives = services
    .filter((s) => s.name !== currentProvider)
    .filter((s) => !s.ssnRequired || hasSSN)
    .sort((a, b) => a.annualCost - b.annualCost);

  const best = alternatives[0];
  if (!best) return null;

  // For remittance, calculate annual cost based on monthly $500 transfers
  let currentAnnualCost = current.annualCost;
  let bestAnnualCost = best.annualCost;

  if (category === "remittance") {
    const currencyCode = userProfile?.primaryCurrency ?? "INR";
    const corridorKey = `USD_${currencyCode}`;

    const currentCorridor = current.corridors?.[corridorKey];
    const bestCorridor = best.corridors?.[corridorKey];

    if (currentCorridor && bestCorridor) {
      currentAnnualCost = Math.round(
        currentCorridor.feePercent * 0.01 * 500 * 12
      );
      bestAnnualCost = Math.round(bestCorridor.feePercent * 0.01 * 500 * 12);
    } else {
      // Fallback: use first available corridor
      const currentCorridors = current.corridors
        ? Object.values(current.corridors)
        : [];
      const bestCorridors = best.corridors
        ? Object.values(best.corridors)
        : [];

      if (currentCorridors.length > 0 && bestCorridors.length > 0) {
        currentAnnualCost = Math.round(
          currentCorridors[0].feePercent * 0.01 * 500 * 12
        );
        bestAnnualCost = Math.round(
          bestCorridors[0].feePercent * 0.01 * 500 * 12
        );
      }
    }
  }

  const annualSavings = currentAnnualCost - bestAnnualCost;

  return {
    category,
    currentProvider: current.name,
    currentCostPerYear: currentAnnualCost,
    recommendedProvider: best.name,
    recommendedCostPerYear: bestAnnualCost,
    annualSavings: Math.max(0, annualSavings),
    switchingSteps: [
      `Research ${best.name} at their official website`,
      `Verify eligibility (SSN required: ${best.ssnRequired ? "Yes" : "No"}, Credit check: ${best.creditCheckRequired ? "Yes" : "No"})`,
      `Sign up for ${best.name}`,
      `Transfer any recurring payments from ${current.name}`,
      `Close or downgrade your ${current.name} account`,
    ],
    aiInsight: `${current.name} costs you ${current.fees}. ${best.name} is better for your situation: ${best.bestFor}. ${best.pros[0]}.`,
  };
}

export async function POST(request: Request) {
  try {
    const body: ScannerRequest = await request.json();
    const { category, currentProvider, userProfile } = body;

    if (!category || !currentProvider) {
      return NextResponse.json(
        { error: "category and currentProvider are required" },
        { status: 400 }
      );
    }

    const services = servicesData[category as CategoryKey] as
      | ServiceEntry[]
      | undefined;
    if (!services) {
      return NextResponse.json(
        { error: `Unknown category: ${category}` },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // If no API key, use deterministic fallback
    if (!apiKey) {
      const result = computeFallbackAudit(
        category,
        currentProvider,
        services,
        userProfile
      );
      if (!result) {
        return NextResponse.json(
          { error: "Could not find a better alternative" },
          { status: 404 }
        );
      }
      return NextResponse.json(result);
    }

    // Build Claude prompt
    const systemPrompt = `You are a financial fee auditor for international students and immigrants in the US. The user currently uses the specified service. Analyze whether they are overpaying compared to better alternatives available to someone with their profile.

User profile:
- Country of origin: ${userProfile?.countryOfOrigin ?? "Unknown"}
- Has SSN: ${userProfile?.hasSSN ?? false}
- Primary currency: ${userProfile?.primaryCurrency ?? "USD"}
- Sends money home: ${userProfile?.sendsMoneyHome ?? "unknown"}

Available services in the "${category}" category:
${JSON.stringify(services, null, 2)}

Instructions:
- Compare the user's current service against ALL alternatives in the category
- Pick the single best alternative for their specific profile (SSN status, country, usage patterns)
- Calculate exact annual savings. For remittance, assume $500/month transfers
- Provide step-by-step switching instructions (3-6 steps)
- Write the aiInsight as a personalized, encouraging tip
- Return ONLY valid JSON matching this exact interface, no markdown, no preamble:
{
  "category": string,
  "currentProvider": string,
  "currentCostPerYear": number,
  "recommendedProvider": string,
  "recommendedCostPerYear": number,
  "annualSavings": number,
  "switchingSteps": string[],
  "aiInsight": string
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Audit my current ${category} service: ${currentProvider}. Find the best alternative for my profile and calculate my savings.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      // Fall back to deterministic result on API error
      const result = computeFallbackAudit(
        category,
        currentProvider,
        services,
        userProfile
      );
      if (!result) {
        return NextResponse.json(
          { error: "Could not generate audit" },
          { status: 500 }
        );
      }
      return NextResponse.json(result);
    }

    const data = await response.json();
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    // Parse Claude's JSON response
    const audit = JSON.parse(text);
    return NextResponse.json(audit);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
