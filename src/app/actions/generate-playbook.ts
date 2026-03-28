"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { UserProfile, PlaybookStep } from "@/lib/types";
import { getPlaybookForCountry } from "@/data/demo-playbooks";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

const SYSTEM_PROMPT = `Generate 4-6 personalized financial playbook steps for an international student in the US. Return a JSON array of steps.

JSON Structure:
[{
  "id": "unique-id",
  "order": 1,
  "title": "Actionable step title",
  "status": "in_progress",
  "explanation": "Why this matters (2 sentences)",
  "recommendation": {
    "name": "Product/Service",
    "description": "Brief description",
    "whyWeRecommend": "Personalized reason"
  },
  "savings": {
    "badOption": {"name": "Common choice", "costPerYear": number, "details": "Why expensive"},
    "goodOption": {"name": "Recommended", "costPerYear": number, "details": "Savings"},
    "annualSavings": number
  },
  "howToSwitch": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
}]

Rules:
- No SSN? Recommend ITIN-friendly: Discover Cashback, Wise, Mint Mobile
- Has bank account? Skip banking, focus on next priority
- Sends money home? Include remittance (Wise, Remitly corridor-specific)
- Prioritize by financialConcerns array
- F-1 vs H-1B have different restrictions
- Country matters for remittance corridors
- Realistic 2024-2025 pricing
- annualSavings: $100-$1000 range
- Output: JSON only, no markdown`;

function buildUserContext(user: UserProfile): string {
  return `
User Profile:
- Name: ${user.name}
- Country of Origin: ${user.countryOfOrigin}
- Primary Currency: ${user.primaryCurrency}
- Visa Type: ${user.visaType}
- Has SSN: ${user.hasSSN ? "Yes" : "No"}
- Has US Bank Account: ${user.hasBankAccount ? "Yes" : "No"}
- Sends Money Home: ${user.sendsMoneyHome}
- Financial Concerns: ${user.financialConcerns.join(", ") || "None specified"}
- University: ${user.university || "Not specified"}
`;
}

function parsePlaybookResponse(text: string): PlaybookStep[] {
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array");
    }
    return parsed as PlaybookStep[];
  } catch (error) {
    console.error("Failed to parse response:", error);
    console.error("Response text:", text);
    throw new Error("Invalid JSON response");
  }
}

export async function generatePlaybook(user: UserProfile): Promise<PlaybookStep[]> {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.warn("GOOGLE_GENERATIVE_AI_API_KEY not set, using demo playbook");
      return getPlaybookForCountry(user.countryOfOrigin);
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 4096,
      },
    });

    const userContext = buildUserContext(user);
    
    // Single-turn generation is faster than chat
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\n" + userContext }] }],
    });
    
    const response = result.response.text();
    const playbook = parsePlaybookResponse(response);

    if (playbook.length === 0) {
      throw new Error("Empty playbook generated");
    }

    return playbook.map((step, index) => ({
      ...step,
      status: index === 0 ? "in_progress" : "locked",
      order: index + 1,
    }));
  } catch (error) {
    console.error("Error generating playbook:", error);
    return getPlaybookForCountry(user.countryOfOrigin);
  }
}
