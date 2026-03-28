export interface UserProfile {
  id: string;
  email: string;
  name: string;
  university: string;
  countryOfOrigin: string;
  primaryCurrency: string;
  visaType: "student" | "work" | "immigrant" | "citizen";
  hasSSN: boolean;
  hasBankAccount: boolean;
  sendsMoneyHome: "frequently" | "sometimes" | "no";
  financialConcerns: string[];
  onboardingComplete: boolean;
  createdAt: string;
}

export interface PlaybookStep {
  id: string;
  order: number;
  title: string;
  status: "completed" | "in_progress" | "up_next" | "locked";
  explanation: string;
  recommendation: {
    name: string;
    description: string;
    whyWeRecommend: string;
  };
  savings: {
    badOption: {
      name: string;
      costPerYear: number;
      details: string;
    };
    goodOption: {
      name: string;
      costPerYear: number;
      details: string;
    };
    annualSavings: number;
  };
  howToSwitch?: string[];
}

export interface FeeAudit {
  category: string;
  currentProvider: string;
  currentCostPerYear: number;
  recommendedProvider: string;
  recommendedCostPerYear: number;
  annualSavings: number;
  switchingSteps: string[];
  aiInsight: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorCountry: string;
  university: string;
  category:
    | "bank_tips"
    | "phone_plans"
    | "remittance"
    | "credit"
    | "housing"
    | "general";
  content: string;
  upvotes: number;
  commentCount: number;
  createdAt: string;
}

export interface CreditMilestone {
  month: number;
  title: string;
  description: string;
  action: string;
  estimatedScoreRange: string;
  status: "completed" | "current" | "upcoming";
}
