import type { CommunityPost } from "@/lib/types";

const demoPosts: CommunityPost[] = [
  {
    id: "post-1",
    authorId: "user-1",
    authorName: "Priya S.",
    authorCountry: "India",
    university: "Fordham University",
    category: "bank_tips",
    content:
      "Just switched from Chase to Discover Cashback Checking and saving $144/year in fees. The signup took 10 minutes online and I didn't need my SSN. Pro tip: keep Chase open for 1 month while you move all your autopays over.",
    upvotes: 24,
    commentCount: 7,
    createdAt: "2026-03-25T14:30:00Z",
  },
  {
    id: "post-2",
    authorId: "user-2",
    authorName: "Wei L.",
    authorCountry: "China",
    university: "NYU",
    category: "remittance",
    content:
      "PSA: Stop using Western Union to send money home! I switched to Wise and saved $40 on my last $500 transfer to China. The exchange rate markup alone was costing me 4% every month. Wise shows you the real rate upfront.",
    upvotes: 31,
    commentCount: 12,
    createdAt: "2026-03-24T09:15:00Z",
  },
  {
    id: "post-3",
    authorId: "user-3",
    authorName: "Carlos M.",
    authorCountry: "Mexico",
    university: "Columbia University",
    category: "phone_plans",
    content:
      "Switched from AT&T ($65/mo) to Mint Mobile ($25/mo) — same T-Mobile network, same coverage in NYC. No credit check needed. I literally just ordered the SIM online and ported my number in 15 minutes.",
    upvotes: 18,
    commentCount: 5,
    createdAt: "2026-03-23T16:45:00Z",
  },
  {
    id: "post-4",
    authorId: "user-4",
    authorName: "Adaeze O.",
    authorCountry: "Nigeria",
    university: "Boston University",
    category: "credit",
    content:
      "Got my first credit score after 3 months with a Discover Secured card! Started at 640 and now at 680 after 6 months. The trick is: use it for ONE small purchase per month (like a coffee) and pay it off immediately. Don't carry a balance!",
    upvotes: 42,
    commentCount: 15,
    createdAt: "2026-03-22T11:20:00Z",
  },
  {
    id: "post-5",
    authorId: "user-5",
    authorName: "Yuki T.",
    authorCountry: "Japan",
    university: "MIT",
    category: "housing",
    content:
      "For anyone apartment hunting: most landlords want a credit check. If you don't have US credit yet, offer to pay 2-3 months upfront or get a co-signer through your university's housing office. Many schools have programs specifically for international students.",
    upvotes: 29,
    commentCount: 8,
    createdAt: "2026-03-21T20:00:00Z",
  },
  {
    id: "post-6",
    authorId: "user-6",
    authorName: "Ana R.",
    authorCountry: "Brazil",
    university: "Fordham University",
    category: "general",
    content:
      "Total savings after following the FirstGen playbook for 2 months: $127/month ($1,524/year). Switched bank, phone plan, and remittance service. That's basically a month of groceries I was just throwing away on fees.",
    upvotes: 56,
    commentCount: 20,
    createdAt: "2026-03-20T13:10:00Z",
  },
];

export const categoryLabels: Record<string, string> = {
  all: "All Tips",
  bank_tips: "Banking",
  phone_plans: "Phone Plans",
  remittance: "Remittance",
  credit: "Credit",
  housing: "Housing",
  general: "General",
};

export function getDemoPosts(): CommunityPost[] {
  return demoPosts;
}
