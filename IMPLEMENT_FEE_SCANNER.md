# Task: Implement the Fee Scanner Feature

## Context

Read FIRSTGEN_SPEC.md for the full project specification. Read /mnt/skills/public/frontend-design/SKILL.md for design best practices. Use the Stitch MCP to pull the Fee Scanner wireframe from the project titled "FirstGen" and match its layout and design system exactly.

The Fee Scanner is the second core feature of FirstGen. It lets users who already have US financial services (bank accounts, phone plans, remittance services) audit whether they're overpaying and find cheaper alternatives. The emotional payoff is a running total of savings found across all categories -- the "gut punch" number that makes users realize how much they're wasting.

Other teammates are currently working on UI changes and the Playbook page. Do not modify any files related to the Playbook, landing page, or onboarding. Focus exclusively on the Fee Scanner.

## What to Build

### 1. Services Database: /src/data/services.json

Create a comprehensive JSON file with real, accurate financial service data. This is critical -- judges will fact-check these numbers. Structure:

```json
{
  "banks": [
    {
      "id": "chase-total-checking",
      "name": "Chase Total Checking",
      "provider": "Chase",
      "monthlyCost": 12,
      "annualCost": 144,
      "fees": "$12/month maintenance fee, waivable with $1,500 daily balance or $500+ direct deposit",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Largest branch network in the US", "Widely accepted for direct deposit"],
      "cons": ["$12/month fee if requirements not met", "Low interest on savings"],
      "bestFor": "Students who can maintain $1,500 balance or have a job with direct deposit"
    },
    {
      "id": "discover-cashback-checking",
      "name": "Discover Cashback Debit",
      "provider": "Discover",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "No monthly fees, no minimum balance, no overdraft fees",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["$0 fees ever", "1% cashback on debit purchases", "No SSN needed to open", "60,000+ fee-free ATMs"],
      "cons": ["No physical branches", "Debit card not accepted at as many places as Visa"],
      "bestFor": "International students who want zero fees and don't need branch access"
    },
    {
      "id": "capital-one-360",
      "name": "Capital One 360 Checking",
      "provider": "Capital One",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "No monthly fees, no minimum balance, no foreign transaction fees",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["$0 fees", "No SSN needed with ITIN", "70,000+ fee-free ATMs", "Good mobile app"],
      "cons": ["Limited branch locations", "No cashback on debit"],
      "bestFor": "International students near a Capital One branch or cafe"
    },
    {
      "id": "td-bank-convenience",
      "name": "TD Bank Convenience Checking",
      "provider": "TD Bank",
      "monthlyCost": 15,
      "annualCost": 180,
      "fees": "$15/month, waivable with $100 minimum balance",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Easy $100 minimum to waive fee", "Open late and on weekends", "No SSN required"],
      "cons": ["$15/month if below $100 balance", "Limited to East Coast"],
      "bestFor": "Students on the East Coast who want in-person banking with extended hours"
    },
    {
      "id": "bofa-advantage-safepass",
      "name": "Bank of America Advantage SafePass",
      "provider": "Bank of America",
      "monthlyCost": 4.95,
      "annualCost": 59.40,
      "fees": "$4.95/month, cannot be waived",
      "ssnRequired": true,
      "creditCheckRequired": false,
      "pros": ["No overdraft fees", "Large branch and ATM network"],
      "cons": ["Requires SSN", "Monthly fee cannot be waived", "No interest earned"],
      "bestFor": "Students with SSN who want overdraft protection"
    }
  ],
  "remittance": [
    {
      "id": "wise",
      "name": "Wise",
      "provider": "Wise",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "0.5-1.5% per transfer depending on corridor, uses real mid-market exchange rate",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Real exchange rate with no markup", "Lowest total fees for most corridors", "Fast transfers (1-2 days)", "Transparent fee breakdown before sending"],
      "cons": ["Slightly slower than instant services", "Fees vary by country"],
      "bestFor": "Anyone sending money internationally regularly",
      "corridors": {
        "USD_INR": { "feePercent": 0.6, "exampleFee": 3.00, "exampleAmount": 500 },
        "USD_MXN": { "feePercent": 0.8, "exampleFee": 4.00, "exampleAmount": 500 },
        "USD_CNY": { "feePercent": 0.5, "exampleFee": 2.50, "exampleAmount": 500 },
        "USD_NGN": { "feePercent": 1.2, "exampleFee": 6.00, "exampleAmount": 500 },
        "USD_PHP": { "feePercent": 0.7, "exampleFee": 3.50, "exampleAmount": 500 }
      }
    },
    {
      "id": "western-union",
      "name": "Western Union",
      "provider": "Western Union",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$5-15 flat fee per transfer + 2-4% exchange rate markup",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Instant cash pickup available worldwide", "Widely known and trusted", "No bank account needed for cash transfers"],
      "cons": ["High fees", "Bad exchange rates (2-4% markup)", "In-person transfers even more expensive"],
      "bestFor": "One-time urgent transfers where recipient needs cash pickup",
      "corridors": {
        "USD_INR": { "feePercent": 4.5, "exampleFee": 22.50, "exampleAmount": 500 },
        "USD_MXN": { "feePercent": 5.0, "exampleFee": 25.00, "exampleAmount": 500 },
        "USD_CNY": { "feePercent": 4.0, "exampleFee": 20.00, "exampleAmount": 500 },
        "USD_NGN": { "feePercent": 6.0, "exampleFee": 30.00, "exampleAmount": 500 },
        "USD_PHP": { "feePercent": 4.5, "exampleFee": 22.50, "exampleAmount": 500 }
      }
    },
    {
      "id": "remitly",
      "name": "Remitly",
      "provider": "Remitly",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$0-4 flat fee + 0.5-2% exchange rate markup depending on speed",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Often cheaper than Western Union", "Express option available", "Good mobile app", "First transfer usually free"],
      "cons": ["Exchange rate markup on express transfers", "Limited corridors compared to Wise"],
      "bestFor": "Students who want a balance of speed and cost",
      "corridors": {
        "USD_INR": { "feePercent": 1.5, "exampleFee": 7.50, "exampleAmount": 500 },
        "USD_MXN": { "feePercent": 2.0, "exampleFee": 10.00, "exampleAmount": 500 },
        "USD_CNY": { "feePercent": 1.8, "exampleFee": 9.00, "exampleAmount": 500 },
        "USD_NGN": { "feePercent": 2.5, "exampleFee": 12.50, "exampleAmount": 500 },
        "USD_PHP": { "feePercent": 1.5, "exampleFee": 7.50, "exampleAmount": 500 }
      }
    },
    {
      "id": "bank-wire",
      "name": "Bank Wire Transfer",
      "provider": "Any US Bank",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$25-45 flat fee per outgoing international wire + 2-3% exchange rate markup",
      "ssnRequired": true,
      "creditCheckRequired": false,
      "pros": ["Direct bank-to-bank transfer", "High transfer limits"],
      "cons": ["Most expensive option", "Flat fee makes small transfers extremely costly", "Bad exchange rates", "Slow (3-5 business days)"],
      "bestFor": "Large one-time transfers over $5,000 where bank trust matters",
      "corridors": {
        "USD_INR": { "feePercent": 7.0, "exampleFee": 35.00, "exampleAmount": 500 },
        "USD_MXN": { "feePercent": 7.5, "exampleFee": 37.50, "exampleAmount": 500 },
        "USD_CNY": { "feePercent": 7.0, "exampleFee": 35.00, "exampleAmount": 500 },
        "USD_NGN": { "feePercent": 8.0, "exampleFee": 40.00, "exampleAmount": 500 },
        "USD_PHP": { "feePercent": 7.0, "exampleFee": 35.00, "exampleAmount": 500 }
      }
    },
    {
      "id": "xoom-paypal",
      "name": "Xoom (PayPal)",
      "provider": "PayPal",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$0-5 flat fee + 1.5-3% exchange rate markup",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Integrated with PayPal", "Fast transfers", "Cash pickup available"],
      "cons": ["Exchange rate markup higher than Wise", "Fees add up on frequent transfers"],
      "bestFor": "Students already using PayPal who want convenience",
      "corridors": {
        "USD_INR": { "feePercent": 2.5, "exampleFee": 12.50, "exampleAmount": 500 },
        "USD_MXN": { "feePercent": 3.0, "exampleFee": 15.00, "exampleAmount": 500 },
        "USD_CNY": { "feePercent": 2.5, "exampleFee": 12.50, "exampleAmount": 500 },
        "USD_NGN": { "feePercent": 3.5, "exampleFee": 17.50, "exampleAmount": 500 },
        "USD_PHP": { "feePercent": 2.5, "exampleFee": 12.50, "exampleAmount": 500 }
      }
    }
  ],
  "phone": [
    {
      "id": "mint-mobile",
      "name": "Mint Mobile",
      "provider": "Mint Mobile",
      "monthlyCost": 15,
      "annualCost": 180,
      "fees": "$15/month for 5GB (when paid annually), $30/month for unlimited",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Cheapest major carrier", "No credit check", "Uses T-Mobile network", "Good data plans"],
      "cons": ["Must prepay 3-12 months for best rates", "No international calling included", "Limited customer service"],
      "bestFor": "Budget-conscious students who mostly use Wi-Fi"
    },
    {
      "id": "google-fi",
      "name": "Google Fi",
      "provider": "Google",
      "monthlyCost": 20,
      "annualCost": 240,
      "fees": "$20/month base + $10/GB data, or $50/month unlimited",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["Works in 200+ countries with no extra charge", "No credit check", "Flexible data pricing", "Excellent for international travel"],
      "cons": ["Can be expensive with heavy data use", "Limited phone compatibility for full features"],
      "bestFor": "International students who travel home or call internationally"
    },
    {
      "id": "tmobile-prepaid",
      "name": "T-Mobile Prepaid",
      "provider": "T-Mobile",
      "monthlyCost": 25,
      "annualCost": 300,
      "fees": "$25/month for 3GB, $40/month for 10GB, $50/month unlimited",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["No credit check", "In-store support", "Free international texting to 210+ countries"],
      "cons": ["More expensive than Mint for similar coverage", "Prepaid plans deprioritized on network"],
      "bestFor": "Students who want in-store support and international texting"
    },
    {
      "id": "att-prepaid",
      "name": "AT&T Prepaid",
      "provider": "AT&T",
      "monthlyCost": 30,
      "annualCost": 360,
      "fees": "$30/month for 5GB, $50/month for 15GB, $65/month unlimited",
      "ssnRequired": false,
      "creditCheckRequired": false,
      "pros": ["No credit check", "Good nationwide coverage", "Hotspot included on higher plans"],
      "cons": ["Most expensive prepaid option", "No international perks"],
      "bestFor": "Students in rural areas where AT&T has better coverage"
    },
    {
      "id": "att-postpaid",
      "name": "AT&T Postpaid (Unlimited)",
      "provider": "AT&T",
      "monthlyCost": 75,
      "annualCost": 900,
      "fees": "$75/month for single line unlimited, requires credit check",
      "ssnRequired": true,
      "creditCheckRequired": true,
      "pros": ["Priority network access", "International day pass option", "Full device financing"],
      "cons": ["Requires credit check and SSN", "Most expensive option", "Contract commitments"],
      "bestFor": "Students with established credit who want premium service"
    },
    {
      "id": "tmobile-postpaid",
      "name": "T-Mobile Magenta",
      "provider": "T-Mobile",
      "monthlyCost": 75,
      "annualCost": 900,
      "fees": "$75/month for single line, requires credit check",
      "ssnRequired": true,
      "creditCheckRequired": true,
      "pros": ["Netflix included", "International data and texting in 215+ countries", "Device financing"],
      "cons": ["Requires credit check", "Expensive for a single line"],
      "bestFor": "Students with credit who travel internationally frequently"
    }
  ],
  "credit_cards": [
    {
      "id": "discover-secured",
      "name": "Discover it Secured",
      "provider": "Discover",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$0 annual fee, $200 minimum security deposit",
      "ssnRequired": true,
      "creditCheckRequired": false,
      "pros": ["$0 annual fee", "2% cashback on dining and gas (up to $1,000/quarter)", "1% on everything else", "Cashback match first year", "Auto-review for upgrade to unsecured"],
      "cons": ["Requires SSN or ITIN", "$200 deposit required", "Not accepted everywhere internationally"],
      "bestFor": "Students with SSN/ITIN building credit for the first time"
    },
    {
      "id": "capital-one-platinum-secured",
      "name": "Capital One Platinum Secured",
      "provider": "Capital One",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$0 annual fee, $49-200 refundable deposit",
      "ssnRequired": true,
      "creditCheckRequired": false,
      "pros": ["$0 annual fee", "Deposit as low as $49 for $200 credit line", "Auto-review for credit line increase", "Accepted widely (Mastercard)"],
      "cons": ["No cashback rewards", "Requires SSN"],
      "bestFor": "Students who want the lowest possible deposit to start building credit"
    },
    {
      "id": "bofa-customized-cash-secured",
      "name": "Bank of America Customized Cash Secured",
      "provider": "Bank of America",
      "monthlyCost": 0,
      "annualCost": 0,
      "fees": "$0 annual fee, $200-5,000 refundable deposit",
      "ssnRequired": true,
      "creditCheckRequired": false,
      "pros": ["$0 annual fee", "3% cashback in a category you choose", "2% at grocery stores and wholesale clubs", "1% everywhere else"],
      "cons": ["Requires SSN", "Must have BofA relationship for best rates"],
      "bestFor": "Students with SSN who already bank with Bank of America"
    }
  ]
}
```

Verify all costs and fees against the actual provider websites before finalizing. Accuracy is critical for hackathon credibility.

### 2. API Route: /src/app/api/scanner/route.ts

Create the Claude API endpoint for fee auditing. The route should:

- Accept POST with: category (string), currentProvider (string), userProfile (object with countryOfOrigin, hasSSN, primaryCurrency, sendsMoneyHome)
- Load the relevant category from services.json
- Send to Claude with a system prompt that includes the user's profile and all available services in that category
- Claude should return JSON matching the FeeAudit interface from FIRSTGEN_SPEC.md
- Include the user's country-specific context (e.g., for remittance, include the specific corridor fees for their country)
- Handle errors gracefully, return appropriate HTTP status codes

System prompt should instruct Claude to:
- Compare the user's current service against ALL alternatives in the category
- Pick the single best alternative for their specific profile (SSN status, country, usage patterns)
- Calculate exact annual savings
- Provide step-by-step switching instructions
- Write the aiInsight as a personalized, encouraging tip
- Return ONLY valid JSON, no markdown, no preamble

### 3. Scanner Page: /src/app/(app)/scanner/page.tsx

Build the full Fee Scanner page. Reference the wireframe via Stitch MCP (project "FirstGen," screen "Fee Scanner").

Layout (desktop): Same sidebar as other app pages. Main content area with:
- Header: "Are You Overpaying?" with subtext "Input your current services and we'll find out."
- ServiceCategoryGrid: 4 clickable category cards in a 2x2 grid (Bank Account, Money Transfers, Phone Plan, Credit Cards). Each card has an icon, category name, and a brief description. Clicking one selects it and reveals the audit panel.
- When a category is selected, show a provider selection dropdown populated from services.json for that category. The dropdown should show the provider name and monthly cost.
- After selecting a provider, show a "Scan for Savings" button that triggers the Claude API call.
- While loading, show a skeleton/shimmer card that feels intentional.
- AuditResultCard: shows current cost, recommended alternative, side-by-side cost comparison with annual savings highlighted, switching steps as a numbered list, and the AI insight.
- TotalSavingsCounter: a sticky/prominent running total at the top or in a sidebar panel that accumulates savings across all categories the user has scanned. This number should animate (count up) when a new audit result comes in.

Layout (mobile): Same content stacked vertically, category cards in a scrollable row or 2x2 grid, results below.

### 4. Components to Create

**/src/components/scanner/ServiceCategoryGrid.tsx**
- 4 category cards: Bank Account (building icon), Money Transfers (globe/send icon), Phone Plan (phone icon), Credit Cards (credit card icon)
- Active state with border/highlight when selected
- Subtle hover animation (scale + shadow lift via Framer Motion)

**/src/components/scanner/ProviderSelector.tsx**
- Dropdown populated from services.json for the selected category
- Shows provider name and current monthly cost in the dropdown option
- If user's profile has countryOfOrigin, filter remittance corridor data accordingly

**/src/components/scanner/AuditResultCard.tsx**
- Split card with "Current" (red-tinted) on left and "Recommended" (green-tinted) on right
- Each side shows: provider name, annual cost, key details
- Center or bottom: large savings number with AnimatedCounter
- Below: numbered switching steps
- Below: AI insight in a subtle callout box
- Entry animation: slide in from bottom with Framer Motion

**/src/components/scanner/TotalSavingsCounter.tsx**
- Large prominent number: "Total Savings Found: $XXX/year"
- Uses AnimatedCounter component (or create one) that counts up from previous value to new value
- Updates each time a new audit completes
- Green color, bold typography
- If no audits yet, show "$0" with subtle prompt text: "Scan a category to find savings"

### 5. Integration with User Profile

- If the user is authenticated and has a profile in Supabase, pass their profile data (countryOfOrigin, hasSSN, sendsMoneyHome, primaryCurrency) to the API route so Claude can personalize recommendations
- If no profile (e.g., demo mode), allow the scanner to work with defaults or show a simplified version
- Save completed fee audits to the fee_audits table in Supabase so they persist and can be referenced on the dashboard

### 6. State Management

- Use React state (useState/useReducer) for: selected category, selected provider, loading state, audit results array, total savings
- Keep an array of completed audits so the user can scan multiple categories and see all results
- TotalSavingsCounter reads from the sum of all completed audit annualSavings values

### 7. Design Details

- Match the wireframe colors and spacing exactly
- Category cards should use the same card component style as the rest of the app
- The savings comparison should make the "bad" option feel visually negative (muted red, strikethrough on cost) and the "good" option feel positive (green accent, checkmark)
- Toast notification when an audit completes: "Found $144/year in savings on your bank account!"
- All animations via Framer Motion: card hover scales, result card slides in, counter animates

### 8. Testing

After implementation, test these scenarios:
- User selects Bank Account, picks Chase Total Checking, gets audit recommending Discover
- User selects Money Transfers, picks Western Union, profile says India, gets audit recommending Wise with INR-specific corridor data
- User selects Phone Plan, picks AT&T Postpaid ($75/month), gets audit recommending Mint Mobile
- User scans 3 categories, TotalSavingsCounter shows cumulative savings
- API error handling: if Claude fails, show a friendly error state, not a crash
- Loading state: skeleton card displays while Claude processes

Do not modify any files outside of the scanner feature. Do not touch the playbook, landing page, onboarding, or navigation components.
