import type { CreditMilestone } from "@/lib/types";

export interface CreditExplainerItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
}

const creditExplainers: CreditExplainerItem[] = [
  {
    id: "what-is-credit",
    question: "What is a credit score and why does it matter?",
    answer:
      "A credit score is a 3-digit number (300-850) that tells lenders how likely you are to repay debt. In the US, it affects everything: renting an apartment, getting a phone plan, car insurance rates, and even job applications. As an international student, you start with NO score (not zero — it simply doesn't exist yet). Building credit early means lower costs on almost everything within 12-18 months.",
    icon: "\u{1F4CA}",
  },
  {
    id: "how-to-start",
    question: "How do I start building credit with no SSN?",
    answer:
      "You don't need an SSN to start! Option 1: Get a secured credit card (you deposit $200-500 as collateral, and that becomes your credit limit). Option 2: Apply for a student credit card designed for newcomers (Deserve EDU, Petal). Option 3: Become an authorized user on a trusted friend's card. We recommend starting with a secured card — it has the highest approval rate and builds credit fastest.",
    icon: "\u{1F680}",
  },
  {
    id: "mistakes",
    question: "What mistakes should I avoid?",
    answer:
      "The #1 mistake: carrying a balance and paying interest. ALWAYS pay your full statement balance each month. Other mistakes: applying for too many cards at once (each application lowers your score), using more than 30% of your credit limit, closing your first credit card (length of history matters), and missing payments (even one missed payment can drop your score 100+ points and stays on your report for 7 years).",
    icon: "\u26A0\uFE0F",
  },
];

const creditTimeline: CreditMilestone[] = [
  {
    month: 1,
    title: "Get a Secured Card",
    description:
      "Apply for a Discover it Secured or Capital One Platinum Secured card. Deposit $200-500 as collateral.",
    action: "Apply online — no SSN required for secured cards",
    estimatedScoreRange: "No score yet",
    status: "current",
  },
  {
    month: 2,
    title: "First Statement",
    description:
      "Use your card for 1-2 small purchases per month (coffee, groceries). Pay the FULL balance before the due date.",
    action: "Set up autopay for full balance",
    estimatedScoreRange: "~580-620",
    status: "upcoming",
  },
  {
    month: 3,
    title: "Score Appears",
    description:
      "After 2-3 months of on-time payments, your FICO score will appear for the first time. Keep utilization under 30%.",
    action: "Check your score free at Discover or Credit Karma",
    estimatedScoreRange: "~600-650",
    status: "upcoming",
  },
  {
    month: 6,
    title: "Building Momentum",
    description:
      "6 months of perfect payments puts you in the 'fair' credit range. You may start receiving pre-approved offers.",
    action: "Keep paying on time — do NOT apply for new cards yet",
    estimatedScoreRange: "~640-680",
    status: "upcoming",
  },
  {
    month: 9,
    title: "Consider a Second Card",
    description:
      "With 9 months of history, you may qualify for an unsecured student card. This increases your total credit limit and lowers utilization.",
    action: "Apply for Deserve EDU or Petal card",
    estimatedScoreRange: "~660-700",
    status: "upcoming",
  },
  {
    month: 12,
    title: "Graduate to Good Credit",
    description:
      "One year of responsible use puts you in the 'good' range. Your secured card may automatically convert to unsecured (deposit refunded).",
    action: "Request credit limit increase on your first card",
    estimatedScoreRange: "~680-720",
    status: "upcoming",
  },
  {
    month: 18,
    title: "Strong Credit Profile",
    description:
      "18 months of history with 2 cards and perfect payments. You now qualify for most financial products available to US citizens.",
    action: "You're eligible for rewards cards, better loan rates, and apartment rentals without cosigners",
    estimatedScoreRange: "~700-750",
    status: "upcoming",
  },
];

export function getCreditTimeline(): CreditMilestone[] {
  return creditTimeline;
}

export function getCreditExplainers(): CreditExplainerItem[] {
  return creditExplainers;
}
