import type { FeeAudit } from "@/lib/types";

export const demoAudits: Record<string, FeeAudit> = {
  "bank:Chase Total Checking": {
    category: "bank",
    currentProvider: "Chase Total Checking",
    currentCostPerYear: 144,
    recommendedProvider: "Discover Cashback Checking",
    recommendedCostPerYear: 0,
    annualSavings: 144,
    switchingSteps: [
      "Open a Discover Cashback Checking account online (no SSN required)",
      "Fund with a $25 minimum deposit",
      "Set up direct deposit or transfer from Chase",
      "Move any automatic payments to new account",
      "Close Chase account after all transactions clear",
    ],
    aiInsight:
      "Chase Total Checking charges $12/month unless you maintain $1,500 minimum daily balance or have $500+ in direct deposits. Most international students cannot meet these requirements in their first months. Discover has zero fees regardless of balance.",
  },
  "bank:Bank of America Advantage SafePass": {
    category: "bank",
    currentProvider: "Bank of America Advantage SafePass",
    currentCostPerYear: 59.4,
    recommendedProvider: "Capital One 360 Checking",
    recommendedCostPerYear: 0,
    annualSavings: 59.4,
    switchingSteps: [
      "Open Capital One 360 Checking online",
      "No minimum deposit required",
      "Transfer funds and set up direct deposit",
      "Update automatic payments",
      "Close BoA account",
    ],
    aiInsight:
      "Bank of America charges $4.95/month for SafePass. Capital One 360 has no monthly fees, no minimum balance, and no SSN requirement to open.",
  },
  "remittance:Western Union": {
    category: "remittance",
    currentProvider: "Western Union",
    currentCostPerYear: 540,
    recommendedProvider: "Wise",
    recommendedCostPerYear: 60,
    annualSavings: 480,
    switchingSteps: [
      "Create a Wise account at wise.com",
      "Verify your identity with passport",
      "Link your US bank account",
      "Set up a transfer to your home country",
      "Compare the rate shown vs Western Union before sending",
    ],
    aiInsight:
      "Western Union marks up the exchange rate by 3-5% AND charges a $8-15 fee per transfer. On a $500 monthly transfer to India, you lose roughly $45/month. Wise uses the real mid-market rate with just a 0.5-1% transparent fee.",
  },
  "phone:AT&T Postpaid": {
    category: "phone",
    currentProvider: "AT&T Postpaid",
    currentCostPerYear: 780,
    recommendedProvider: "Mint Mobile",
    recommendedCostPerYear: 300,
    annualSavings: 480,
    switchingSteps: [
      "Check if your phone is unlocked (Settings > General > About on iPhone)",
      "Order a Mint Mobile SIM at mintmobile.com",
      "Choose the 15GB plan ($25/month)",
      "Port your number from AT&T",
      "Cancel AT&T after porting completes",
    ],
    aiInsight:
      "AT&T Postpaid costs $65+/month for a single line and requires a credit check. Mint Mobile uses the T-Mobile 5G network, costs $25/month for 15GB, and requires no credit check or contract.",
  },
  "phone:T-Mobile Postpaid": {
    category: "phone",
    currentProvider: "T-Mobile Postpaid",
    currentCostPerYear: 840,
    recommendedProvider: "Mint Mobile",
    recommendedCostPerYear: 300,
    annualSavings: 540,
    switchingSteps: [
      "Ensure your phone is unlocked",
      "Order Mint Mobile SIM",
      "Activate and port your T-Mobile number",
      "Cancel T-Mobile plan",
    ],
    aiInsight:
      "T-Mobile Postpaid runs $70/month for a single unlimited line. Mint Mobile runs on the same T-Mobile network for $25/month. Same coverage, 64% less cost.",
  },
};

export function getAuditResult(category: string, provider: string): FeeAudit | null {
  const key = `${category}:${provider}`;
  return demoAudits[key] ?? null;
}
