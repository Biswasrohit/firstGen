export const UNIVERSITIES = [
  "Fordham University",
  "New York University",
  "Columbia University",
  "Pace University",
  "The New School",
  "CUNY - Baruch College",
  "CUNY - City College",
  "Stevens Institute of Technology",
  "Rutgers University",
  "Stony Brook University",
  "University of Pennsylvania",
  "Boston University",
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "UCLA",
  "University of Michigan",
  "Georgia Tech",
  "University of Texas at Austin",
  "Other",
] as const;

export const COUNTRIES = [
  { code: "IN", name: "India", flag: "\u{1F1EE}\u{1F1F3}", currency: "INR" },
  { code: "CN", name: "China", flag: "\u{1F1E8}\u{1F1F3}", currency: "CNY" },
  { code: "MX", name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}", currency: "MXN" },
  { code: "NG", name: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}", currency: "NGN" },
  { code: "PH", name: "Philippines", flag: "\u{1F1F5}\u{1F1ED}", currency: "PHP" },
  { code: "BR", name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", currency: "BRL" },
  { code: "KR", name: "South Korea", flag: "\u{1F1F0}\u{1F1F7}", currency: "KRW" },
  { code: "JP", name: "Japan", flag: "\u{1F1EF}\u{1F1F5}", currency: "JPY" },
  { code: "VN", name: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}", currency: "VND" },
  { code: "BD", name: "Bangladesh", flag: "\u{1F1E7}\u{1F1E9}", currency: "BDT" },
  { code: "PK", name: "Pakistan", flag: "\u{1F1F5}\u{1F1F0}", currency: "PKR" },
  { code: "ET", name: "Ethiopia", flag: "\u{1F1EA}\u{1F1F9}", currency: "ETB" },
  { code: "GH", name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", currency: "GHS" },
  { code: "KE", name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}", currency: "KES" },
  { code: "CO", name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}", currency: "COP" },
  { code: "TR", name: "Turkey", flag: "\u{1F1F9}\u{1F1F7}", currency: "TRY" },
  { code: "SA", name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}", currency: "SAR" },
  { code: "EG", name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}", currency: "EGP" },
  { code: "TW", name: "Taiwan", flag: "\u{1F1F9}\u{1F1FC}", currency: "TWD" },
  { code: "TH", name: "Thailand", flag: "\u{1F1F9}\u{1F1ED}", currency: "THB" },
] as const;

export const VISA_TYPES = [
  { value: "student", label: "Student (F-1/J-1)" },
  { value: "work", label: "Work (H-1B/L-1/OPT)" },
  { value: "immigrant", label: "Immigrant (Green Card)" },
  { value: "other", label: "Other" },
] as const;

export const FINANCIAL_CONCERNS = [
  { id: "bank_account", label: "Opening a Bank Account", icon: "\u{1F3E6}" },
  { id: "credit", label: "Building Credit", icon: "\u{1F4B3}" },
  { id: "remittance", label: "Sending Money Home", icon: "\u{1F4B8}" },
  { id: "phone_plan", label: "Getting a Phone Plan", icon: "\u{1F4F1}" },
  { id: "housing", label: "Finding Housing", icon: "\u{1F3E0}" },
  { id: "budgeting", label: "Budgeting", icon: "\u{1F4CA}" },
] as const;

export function getCountryFlag(countryCode: string): string {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  return country?.flag ?? "\u{1F30D}";
}

export function getCountryCurrency(countryCode: string): string {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  return country?.currency ?? "USD";
}

export function getCountryByName(name: string) {
  return COUNTRIES.find((c) => c.name === name);
}
