import type { PlaybookStep } from "@/lib/types";

const indiaPlaybook: PlaybookStep[] = [
  {
    id: "ind-1",
    order: 1,
    title: "Open a Fee-Free Bank Account",
    status: "in_progress",
    explanation:
      "Most traditional banks charge high monthly fees and require minimum balances. As an international student without a credit history, you are often pushed toward high-fee accounts. A fee-free checking account saves you money from day one and gives you a debit card for everyday purchases.",
    recommendation: {
      name: "Discover Cashback Checking",
      description:
        "No monthly fees, no minimum balance, 1% cashback on all debit purchases, and no SSN required to open.",
      whyWeRecommend:
        "Discover does not require an SSN to open an account, charges zero monthly fees, and gives you 1% cashback on every debit purchase. It is the best option for international students just arriving.",
    },
    savings: {
      badOption: {
        name: "Chase Total Checking",
        costPerYear: 144,
        details: "$12/month service fee unless you maintain a $1,500 minimum daily balance",
      },
      goodOption: {
        name: "Discover Cashback Checking",
        costPerYear: 0,
        details: "$0 monthly fees, no minimum balance, plus earn 1% cashback on debit purchases",
      },
      annualSavings: 144,
    },
    howToSwitch: [
      "Visit discover.com/bank and click 'Open an Account'",
      "Select 'Cashback Debit Checking'",
      "Use your passport and I-20/DS-2019 as identification",
      "Fund with a minimum $25 deposit",
      "Set up direct deposit for any campus employment",
    ],
  },
  {
    id: "ind-2",
    order: 2,
    title: "Set Up Low-Cost Money Transfers Home",
    status: "up_next",
    explanation:
      "Banks and traditional services like Western Union charge high fees and mark up exchange rates when sending money internationally. The difference can cost hundreds of dollars per year, especially for frequent transfers to India.",
    recommendation: {
      name: "Wise (formerly TransferWise)",
      description:
        "Uses the real mid-market exchange rate with a transparent fee of 0.5-1.5%. No hidden markups.",
      whyWeRecommend:
        "Wise consistently offers the best USD to INR rates. The fee is transparent, and transfers arrive in 1-2 business days via UPI or direct bank deposit.",
    },
    savings: {
      badOption: {
        name: "Western Union",
        costPerYear: 540,
        details: "Sends $500/month with $8-15 fee per transfer plus 3-5% exchange rate markup",
      },
      goodOption: {
        name: "Wise",
        costPerYear: 60,
        details: "Real exchange rate plus a flat 0.5-1.5% fee per transfer",
      },
      annualSavings: 480,
    },
    howToSwitch: [
      "Download the Wise app or visit wise.com",
      "Create an account with your US address and passport",
      "Verify your identity (takes 1-2 days)",
      "Link your Discover checking account",
      "Set up a recurring transfer if you send money monthly",
    ],
  },
  {
    id: "ind-3",
    order: 3,
    title: "Get Your First Credit Card",
    status: "locked",
    explanation:
      "Building credit in the US is essential for renting apartments, getting car insurance, and even some jobs. As an international student with no US credit history, a secured credit card is the best starting point. You put down a deposit that becomes your credit limit.",
    recommendation: {
      name: "Discover it Secured",
      description:
        "$0 annual fee, 2% cashback at restaurants and gas stations, 1% on everything else. Reports to all 3 credit bureaus.",
      whyWeRecommend:
        "No annual fee and it automatically reviews your account after 7 months for an upgrade to an unsecured card. Discover matches all cashback earned in your first year.",
    },
    savings: {
      badOption: {
        name: "No credit card (no credit history)",
        costPerYear: 0,
        details: "Without credit history, you pay higher deposits for apartments ($500-2000 extra) and car insurance (+20-30% higher premiums)",
      },
      goodOption: {
        name: "Discover it Secured",
        costPerYear: 0,
        details: "$0 annual fee, earns cashback, builds credit history reported to all 3 bureaus",
      },
      annualSavings: 0,
    },
    howToSwitch: [
      "Apply at discover.com/credit-cards/secured",
      "Provide your SSN or ITIN (apply for ITIN if you do not have SSN)",
      "Choose your security deposit amount ($200-2,500 becomes your credit limit)",
      "Set up autopay for the full balance every month",
      "Use the card for small recurring purchases only",
    ],
  },
  {
    id: "ind-4",
    order: 4,
    title: "Choose a Phone Plan",
    status: "locked",
    explanation:
      "Many international students sign up for expensive postpaid plans because they do not know prepaid options exist. Prepaid plans do not require a credit check or SSN, cost significantly less, and offer the same coverage.",
    recommendation: {
      name: "Mint Mobile",
      description:
        "Prepaid plans starting at $15/month for 5GB. No credit check, no contract. Uses T-Mobile network.",
      whyWeRecommend:
        "Mint Mobile offers the best value for students. Buy 3 months at a time for the lowest rate. Their unlimited plan is just $30/month.",
    },
    savings: {
      badOption: {
        name: "AT&T Postpaid",
        costPerYear: 780,
        details: "$65/month for a single line unlimited plan, requires credit check and deposit",
      },
      goodOption: {
        name: "Mint Mobile 15GB Plan",
        costPerYear: 300,
        details: "$25/month for 15GB, no credit check, no contract, T-Mobile 5G network",
      },
      annualSavings: 480,
    },
    howToSwitch: [
      "Visit mintmobile.com and choose a plan",
      "Order a SIM card or use eSIM (check if your phone supports it)",
      "Activate with your passport (no SSN needed)",
      "Port your existing number or get a new US number",
      "Set up Wi-Fi calling for use in campus buildings",
    ],
  },
  {
    id: "ind-5",
    order: 5,
    title: "Understand Your Health Insurance",
    status: "locked",
    explanation:
      "Most universities require international students to have health insurance. Your school likely offers a plan, but it may not be the most affordable option. Understanding your coverage prevents unexpected medical bills.",
    recommendation: {
      name: "Review your university plan",
      description:
        "Compare your mandatory university health plan with the waiver options available.",
      whyWeRecommend:
        "Many universities allow you to waive their plan if you have equivalent coverage from an outside provider, which can save $500-1,500 per year.",
    },
    savings: {
      badOption: {
        name: "University default plan (no review)",
        costPerYear: 2800,
        details: "Average university health plan cost without shopping around",
      },
      goodOption: {
        name: "Reviewed and optimized plan",
        costPerYear: 2400,
        details: "After comparing options and using any available waivers or subsidies",
      },
      annualSavings: 400,
    },
    howToSwitch: [
      "Check your university health center website for plan details",
      "Review what is covered and what your deductible is",
      "Ask about waiver options if you have alternative coverage",
      "Register for the student health portal",
      "Save your insurance card digitally in your phone",
    ],
  },
  {
    id: "ind-6",
    order: 6,
    title: "Set Up a Budget",
    status: "locked",
    explanation:
      "Living costs in the US can be surprising. A simple budget helps you track spending in USD, plan for tuition payments, and make sure you have enough for emergencies. Start simple and adjust as you learn your spending patterns.",
    recommendation: {
      name: "Use your bank app or a free budgeting tool",
      description:
        "Track your spending by category for the first 3 months to understand where your money goes.",
      whyWeRecommend:
        "Discover and most banks have built-in spending trackers. For more detail, Mint (free) or YNAB (student discount) are popular choices.",
    },
    savings: {
      badOption: {
        name: "No budget (average overspending)",
        costPerYear: 600,
        details: "Students without budgets overspend an average of $50/month on impulse purchases and subscription creep",
      },
      goodOption: {
        name: "Simple monthly budget",
        costPerYear: 0,
        details: "Track spending by category, set limits, and review weekly",
      },
      annualSavings: 600,
    },
    howToSwitch: [
      "List your fixed monthly costs (rent, tuition, insurance)",
      "Estimate variable costs (food, transport, entertainment)",
      "Set a weekly spending limit for discretionary purchases",
      "Review your spending every Sunday evening",
      "Adjust categories after the first month based on actual spending",
    ],
  },
];

const chinaPlaybook: PlaybookStep[] = indiaPlaybook.map((step) => ({
  ...step,
  id: step.id.replace("ind", "chn"),
}));

const mexicoPlaybook: PlaybookStep[] = indiaPlaybook.map((step) => ({
  ...step,
  id: step.id.replace("ind", "mex"),
}));

const nigeriaPlaybook: PlaybookStep[] = indiaPlaybook.map((step) => ({
  ...step,
  id: step.id.replace("ind", "ngr"),
}));

export const demoPlaybooks: Record<string, PlaybookStep[]> = {
  India: indiaPlaybook,
  China: chinaPlaybook,
  Mexico: mexicoPlaybook,
  Nigeria: nigeriaPlaybook,
};

export function getPlaybookForCountry(country: string): PlaybookStep[] {
  return demoPlaybooks[country] ?? indiaPlaybook;
}
