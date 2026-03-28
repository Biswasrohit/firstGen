interface ImpactStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: string;
}

interface SavingsByCategory {
  category: string;
  amount: number;
  color: string;
}

interface UniversityRank {
  rank: number;
  university: string;
  students: number;
  totalSaved: number;
}

interface Testimonial {
  name: string;
  country: string;
  university: string;
  quote: string;
  saved: number;
}

export const impactStats: ImpactStat[] = [
  { label: "Total Saved by Students", value: 48200, prefix: "$", suffix: "", icon: "\u{1F4B0}" },
  { label: "Students Helped", value: 312, prefix: "", suffix: "", icon: "\u{1F393}" },
  { label: "Countries Represented", value: 47, prefix: "", suffix: "", icon: "\u{1F30D}" },
  { label: "Average Savings Per Student", value: 1680, prefix: "$", suffix: "/yr", icon: "\u{1F4C8}" },
];

export const savingsByCategory: SavingsByCategory[] = [
  { category: "Banking Fees", amount: 14200, color: "#006973" },
  { category: "Remittance", amount: 18600, color: "#8c5100" },
  { category: "Phone Plans", amount: 9800, color: "#1b6d24" },
  { category: "Credit Card Fees", amount: 5600, color: "#ac3434" },
];

export const universityLeaderboard: UniversityRank[] = [
  { rank: 1, university: "Fordham University", students: 45, totalSaved: 8200 },
  { rank: 2, university: "NYU", students: 38, totalSaved: 7100 },
  { rank: 3, university: "Columbia University", students: 32, totalSaved: 6400 },
  { rank: 4, university: "Boston University", students: 28, totalSaved: 5200 },
  { rank: 5, university: "MIT", students: 25, totalSaved: 4800 },
];

export const testimonials: Testimonial[] = [
  {
    name: "Priya S.",
    country: "India",
    university: "Fordham University",
    quote: "I was paying $45/month in hidden fees I didn't even know about. FirstGen showed me exactly where my money was going and helped me switch to better options in one afternoon.",
    saved: 1920,
  },
  {
    name: "Wei L.",
    country: "China",
    university: "NYU",
    quote: "The remittance savings alone were worth it. I was losing 4% on every transfer home through my bank. Wise saves me almost $500 a year.",
    saved: 2160,
  },
  {
    name: "Carlos M.",
    country: "Mexico",
    university: "Columbia University",
    quote: "As a first-gen student, nobody told me I didn't need to pay $65/month for a phone plan. The credit builder timeline gave me a roadmap I actually understood.",
    saved: 1440,
  },
];
