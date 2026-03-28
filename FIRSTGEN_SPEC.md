# FirstGen -- Project Specification

## Overview

FirstGen is an AI-powered financial concierge for international students and immigrants arriving in the US. When someone new lands in the US, they face a financial system designed for people who grew up in it. Within their first 30 days they need to open a bank account, understand credit scores, find a phone plan, figure out remittances, and avoid predatory fees -- all with zero guidance. Most make costly mistakes that add up to $500-1,000+ lost in their first year.

FirstGen gives every new arrival a personalized, step-by-step financial playbook that tells them exactly what to do, why, and how much they'll save.

This is for a 24-hour hackathon (RamHacks at Fordham) targeting the "Best Tech For Good" ($300 cash) and "Finance" tracks. Judges care about story and social impact over raw technical complexity. Judging happens at tables with 2-3 minute visits plus a Devpost demo video.

## Design Reference

Wireframes are available via the Stitch MCP. The Stitch project is titled "FirstGen." Use the Stitch MCP tools to pull the wireframes and reference them for every screen's layout, component structure, and visual design. Match the design system (colors, typography, spacing, card styles, sidebar layout) as closely as possible.

If the Stitch MCP is unavailable or wireframes cannot be pulled, fall back to exported images in the `/wireframes` directory.

## Important Instructions

- Before writing ANY code, read the frontend-design skill at /mnt/skills/public/frontend-design/SKILL.md and follow its guidelines for producing a distinctive, production-grade UI. This is a hackathon -- visual polish wins prizes.
- Reference the wireframes via Stitch MCP (project: "FirstGen") for every screen.
- Build mobile-responsive from the start, but prioritize desktop layout since judges will be viewing on laptops.
- Every phase should result in something demo-able. Never leave the app in a broken state between phases.
- Never use em dashes in any user-facing copy.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui for base components
- Framer Motion for animations (page transitions, number counters, staggered reveals, progress animations)
- Recharts for data visualizations (savings charts, credit score gauge, impact dashboard)
- React Hot Toast for notifications
- next-themes for dark/light mode
- Anthropic Claude API for AI intelligence layer (personalized playbook generation, fee auditing, credit advice)
- Supabase for auth, database, and real-time subscriptions (community board)

## Project Structure

```
/src
  /app
    /layout.tsx                    -- root layout, font loading, theme provider
    /page.tsx                      -- public landing page
    /(auth)
      /signup/page.tsx             -- sign up with .edu email
      /login/page.tsx              -- log in
    /(onboarding)
      /onboarding/page.tsx         -- smart questionnaire (multi-step)
    /(app)                         -- authenticated app layout group
      /layout.tsx                  -- app shell with sidebar (desktop) + bottom nav (mobile)
      /playbook/page.tsx           -- personalized financial playbook (CORE FEATURE)
      /scanner/page.tsx            -- fee scanner
      /credit/page.tsx             -- credit builder
      /community/page.tsx          -- community board
      /impact/page.tsx             -- community impact dashboard
      /settings/page.tsx           -- user settings
    /api
      /playbook/route.ts           -- Claude API: generate personalized playbook
      /scanner/route.ts            -- Claude API: audit current services and find savings
      /credit/route.ts             -- Claude API: credit building advice and timeline
      /community/moderate/route.ts -- Claude API: moderate community posts
  /components
    /ui                            -- shadcn components
    /layout
      /Sidebar.tsx                 -- desktop sidebar navigation
      /BottomNav.tsx               -- mobile bottom navigation
      /AppShell.tsx                -- responsive wrapper (sidebar on desktop, bottom nav on mobile)
      /TopNav.tsx                  -- top navigation bar with search, notifications, avatar
    /landing
      /Hero.tsx                    -- hero section with headline, CTA, visual
      /HowItWorks.tsx              -- three-step explainer
      /CostOfMistakes.tsx          -- common mistakes with dollar costs
      /SocialProof.tsx             -- savings ticker and university logos
    /onboarding
      /QuestionStep.tsx            -- single question card with animation
      /ProgressBar.tsx             -- multi-step progress indicator
      /CountrySelector.tsx         -- dropdown with flags
      /TagSelector.tsx             -- multi-select tags for financial concerns
    /playbook
      /PlaybookStep.tsx            -- expandable step card with status badge
      /PlaybookStepper.tsx         -- vertical stepper connecting all steps
      /SavingsComparison.tsx       -- side-by-side bad option vs recommended option
      /PlaybookSummary.tsx         -- total savings + progress ring at bottom
    /scanner
      /ServiceCategoryGrid.tsx     -- clickable grid of service categories
      /AuditResultCard.tsx         -- audit result with current cost vs recommendation
      /TotalSavingsCounter.tsx     -- running total of savings found
    /credit
      /CreditScoreGauge.tsx        -- visual gauge 300-850 with zones
      /CreditExplainer.tsx         -- expandable info cards about credit
      /CreditTimeline.tsx          -- horizontal milestone timeline
      /MilestoneCard.tsx           -- individual milestone on timeline
    /community
      /PostCard.tsx                -- community post with votes and comments
      /PostComposer.tsx            -- new post form
      /FilterTabs.tsx              -- category filter tabs
      /TopTips.tsx                 -- sidebar with most upvoted tips
      /CampusStats.tsx             -- sidebar campus member count and savings
    /impact
      /StatCounter.tsx             -- large animated counter
      /SavingsByCountryChart.tsx   -- horizontal bar chart
      /SavingsByCategoryChart.tsx  -- donut chart
      /UniversityLeaderboard.tsx   -- top saving universities
      /TestimonialCard.tsx         -- student story quote card
    /shared
      /AnimatedCounter.tsx         -- reusable animated number counter
      /SavingsBadge.tsx            -- green badge showing dollar savings
      /StatusBadge.tsx             -- completed/in-progress/upcoming badge
      /CountryFlag.tsx             -- flag emoji or icon by country code
  /lib
    /claude.ts                     -- Anthropic SDK client + shared prompt utilities
    /supabase.ts                   -- Supabase client (browser + server)
    /types.ts                      -- TypeScript interfaces
    /constants.ts                  -- service data, country list, currency data
    /utils.ts                      -- helper functions
  /data
    /services.json                 -- database of banks, phone plans, remittance services with fee structures
    /recommendations.json          -- pre-built recommendation templates by country/situation
```

## Data Models

### User Profile

```typescript
interface UserProfile {
  id: string;
  email: string;
  name: string;
  university: string;
  countryOfOrigin: string;
  primaryCurrency: string;
  visaType: "student" | "work" | "immigrant" | "other";
  hasSSN: boolean;
  hasBankAccount: boolean;
  sendsMoneyHome: "frequently" | "sometimes" | "no";
  financialConcerns: string[];
  createdAt: string;
}
```

### Playbook Step

```typescript
interface PlaybookStep {
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
```

### Fee Scanner Result

```typescript
interface FeeAudit {
  category: string;
  currentProvider: string;
  currentCostPerYear: number;
  recommendedProvider: string;
  recommendedCostPerYear: number;
  annualSavings: number;
  switchingSteps: string[];
  aiInsight: string;
}
```

### Community Post

```typescript
interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorCountry: string;
  university: string;
  category: "bank_tips" | "phone_plans" | "remittance" | "credit" | "housing" | "general";
  content: string;
  upvotes: number;
  commentCount: number;
  createdAt: string;
}
```

## Claude API Integration

### POST /api/playbook

**Input:**
```json
{
  "profile": {
    "countryOfOrigin": "India",
    "visaType": "student",
    "hasSSN": false,
    "hasBankAccount": false,
    "sendsMoneyHome": "frequently",
    "financialConcerns": ["bank_account", "credit", "remittance"],
    "university": "Fordham University"
  }
}
```

**System Prompt:** You are a financial advisor for international students arriving in the US. Given this student's profile, generate a personalized step-by-step financial playbook. Each step should include a specific product/service recommendation, explain why it matters in plain language (assume no prior knowledge of the US financial system), and show exact dollar savings compared to the common uninformed choice. Be specific with product names, costs, and savings. Order steps by urgency (what they need first). Return JSON only, matching the PlaybookStep interface array.

**Output:** Array of 5-7 PlaybookStep objects personalized to the student's country, visa status, and needs.

### POST /api/scanner

**Input:**
```json
{
  "category": "bank",
  "currentProvider": "Chase Total Checking",
  "profile": { "countryOfOrigin": "India", "hasSSN": false }
}
```

**System Prompt:** You are a financial fee auditor for international students. The student currently uses the specified service. Analyze whether they're overpaying compared to better alternatives available to someone with their profile (consider SSN status, country of origin). Return a specific alternative with exact cost comparison and step-by-step switching instructions. Return JSON only, matching the FeeAudit interface.

**Output:** FeeAudit object with detailed comparison and switching steps.

### POST /api/credit

**Input:**
```json
{
  "profile": { "countryOfOrigin": "India", "hasSSN": false, "monthsInUS": 2 },
  "currentCards": ["discover-secured"],
  "estimatedScore": null
}
```

**System Prompt:** You are a credit building advisor for international students who may have never encountered credit scores before. Explain credit in plain, non-jargon language. Based on their current situation, generate a 12-month credit building timeline with specific milestones, product recommendations, and actionable tips. Be encouraging but realistic. Return JSON only with a milestones array.

**Output:** Credit timeline with monthly milestones, each containing title, description, recommendation, and estimated score range.

## Services Database (services.json)

Seed with real data for at least:

**Banks (include SSN requirement info):**
- Discover Cashback Checking ($0 fees, 1% cashback on debit, no SSN required to open)
- Chase Total Checking ($12/month or waivable with $1,500 balance)
- Bank of America Advantage SafePass ($4.95/month)
- Capital One 360 Checking ($0 fees, no SSN required)
- TD Bank Convenience Checking ($15/month or waivable)

**Remittance Services (include rates for USD to INR, MXN, CNY, NGN, PHP):**
- Wise (real exchange rate + 0.5-1.5% fee)
- Western Union (marked up rate + $8-15 fee)
- Remitly ($0-4 fee, slightly marked up rate)
- Bank wire transfer ($25-45 fee + bad rate)
- Xoom/PayPal ($0-5 fee, marked up rate)

**Phone Plans (include credit check info):**
- Mint Mobile ($15-30/month prepaid, no credit check)
- Google Fi ($20-50/month, works internationally, no credit check)
- T-Mobile Prepaid ($25-50/month, no credit check)
- AT&T Prepaid ($30-65/month, no credit check)

**Secured Credit Cards (no credit history required):**
- Discover it Secured ($0 annual fee, 2% on dining/gas)
- Capital One Platinum Secured ($0 annual fee)
- Bank of America Customized Cash Secured ($0 annual fee)

For each service include:
```typescript
interface FinancialService {
  id: string;
  name: string;
  provider: string;
  category: "bank" | "remittance" | "phone" | "credit_card";
  monthlyCost: number;
  annualCost: number;
  fees: string;
  ssnRequired: boolean;
  creditCheckRequired: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
}
```

## Design Requirements

### Theme
- Match the Stitch wireframes exactly
- Warm, trustworthy, empowering aesthetic
- Approachable, not intimidating corporate fintech
- Green for savings and positive outcomes
- Red/orange for fees and costs being avoided
- Friendly, welcoming typography

### Responsive Layout
- Desktop-first (judges on laptops) but fully mobile responsive
- Desktop: left sidebar navigation + top nav bar
- Mobile: bottom navigation + hamburger top nav
- Landing page and onboarding are full-width (no sidebar)
- Sidebar appears only after onboarding is complete

### Animations (Framer Motion)
- Page transitions: smooth fade/slide between routes
- Onboarding: question cards slide in from right, completed ones slide out left
- Playbook steps: staggered reveal on first load, smooth expand/collapse
- Savings numbers: animated counter that counts up from $0 to the savings amount
- Progress ring on playbook summary: fills clockwise on load
- Fee Scanner: audit result card slides in with a satisfying reveal
- Credit gauge: needle/marker animates to the score position
- Impact dashboard counters: count up animation on page load
- Hover states on all interactive cards: subtle scale + shadow lift

### Micro-interactions
- Playbook "Mark as Done" button: checkmark animation + confetti burst (lottie-react)
- Savings comparison: "bad option" has a subtle red pulse, "good option" has green glow
- Community upvote: number bounces on click
- Toast notifications for key moments ("Playbook generated!", "New tip from a student at your campus")

## Build Priority Order

Designed so each phase produces a working, demo-able state. Team of 4 works in parallel within each phase.

### Phase 1: Foundation (Hours 0-3)
**Goal: App shell that looks production-ready even with placeholder content.**

- Person 1: Next.js scaffold with App Router, TypeScript. Install all packages: shadcn/ui, framer-motion, recharts, react-hot-toast, next-themes, @supabase/supabase-js, @anthropic-ai/sdk, lottie-react.
- Person 2: Tailwind config + shadcn/ui setup. Configure theme colors and typography matching wireframes. Install shadcn components: button, card, input, badge, dialog, dropdown-menu, tabs, toast, avatar, progress, separator.
- Person 3: AppShell, Sidebar (desktop), BottomNav (mobile), TopNav. Use wireframes as reference. Ensure responsive breakpoints work cleanly.
- Person 4: Supabase project setup. Auth with email. Database tables: profiles, playbook_steps, community_posts, fee_audits. Row Level Security policies.

**Checkpoint: App loads with working navigation, theme matches wireframes, auth flow works.**

### Phase 2: Landing + Onboarding (Hours 3-6)
**Goal: A visitor can land on the site, sign up, and complete onboarding.**

- Person 1: Landing page -- Hero, HowItWorks, CostOfMistakes, SocialProof sections. Reference wireframe.
- Person 2: Sign Up and Log In pages with Supabase auth integration.
- Person 3: Onboarding questionnaire -- QuestionStep component with slide animations, ProgressBar, CountrySelector, TagSelector. Multi-step flow that collects all profile data.
- Person 4: Seed services.json with all bank, remittance, phone, and credit card data. Build /lib/constants.ts with country list, currency mappings.

**Checkpoint: Full flow from landing page through sign up to completed onboarding. Profile saved to Supabase.**

### Phase 3: The Playbook -- Core Feature (Hours 6-10)
**Goal: The heart of the app. User completes onboarding and sees their personalized financial playbook.**

- Person 1: Claude API route /api/playbook. System prompt engineering. Test with multiple country/visa profiles. Ensure consistent JSON output.
- Person 2: PlaybookStepper and PlaybookStep components. Expandable cards with status badges. Vertical stepper connecting steps.
- Person 3: SavingsComparison component (bad option vs good option side-by-side). PlaybookSummary with progress ring and total savings counter.
- Person 4: Wire up the full flow: onboarding completion triggers playbook generation, loading state with skeleton, display personalized results. "Mark as Done" functionality updating step status.

**Checkpoint: User completes onboarding, playbook generates via Claude, displays beautifully with savings comparisons. This alone is a winning demo.**

### Phase 4: Fee Scanner (Hours 10-13)
**Goal: Users can audit their existing services and find savings.**

- Person 1: Claude API route /api/scanner. System prompt for fee auditing. Test across service categories.
- Person 2: ServiceCategoryGrid (bank, remittance, phone, subscriptions as clickable cards). Provider selection dropdowns populated from services.json.
- Person 3: AuditResultCard with cost comparison visualization. TotalSavingsCounter as a running total.
- Person 4: Integration -- selecting a category and provider triggers Claude audit, results animate in, running total updates.

**Checkpoint: User can select any service category, input their current provider, and see an AI-generated audit with specific savings and switching steps.**

### Phase 5: Credit Builder (Hours 13-16)
**Goal: Credit education and building timeline for students new to the US credit system.**

- Person 1: Claude API route /api/credit. Prompt engineering for credit timeline generation.
- Person 2: CreditScoreGauge (SVG gauge 300-850 with animated marker). CreditExplainer (expandable "What is credit?" / "Why does it matter?" / "How is it calculated?" cards).
- Person 3: CreditTimeline as a horizontal milestone roadmap. MilestoneCard with status indicators and estimated dates.
- Person 4: Wire up -- profile data feeds into Claude, timeline renders with appropriate milestones. Secured card recommendations link back to services.json data.

**Checkpoint: Student sees a visual credit score gauge, understands what credit is, and has a 12-month roadmap with specific actions.**

### Phase 6: Community Board (Hours 16-19)
**Goal: Students share local financial tips with each other.**

- Person 1: Supabase real-time subscriptions for live post updates. Upvote/downvote logic. Comment system.
- Person 2: PostCard, PostComposer, FilterTabs components.
- Person 3: Community page layout -- feed on left, TopTips and CampusStats sidebars on right (desktop). Reference wireframe.
- Person 4: Seed 10-15 realistic demo posts from fake students at Fordham covering bank tips, phone plans, remittance advice, housing tips.

**Checkpoint: Community board with seeded posts, working upvotes, filter tabs, and the ability to add new posts.**

### Phase 7: Impact Dashboard + Polish (Hours 19-22)
**Goal: Public-facing impact stats + animations and visual polish across the entire app.**

- Person 1: Impact dashboard page -- StatCounter, SavingsByCountryChart, SavingsByCategoryChart, UniversityLeaderboard, TestimonialCard. Seed with demo data.
- Person 2: Framer Motion pass across entire app -- page transitions, staggered reveals, number counters, hover states. Add lottie confetti to "Mark as Done."
- Person 3: Loading states and skeleton screens for all Claude API calls. Empty states for pages with no data. Error handling for API failures.
- Person 4: Responsive testing. Fix any mobile breakpoint issues. Ensure every page works on both desktop and mobile.

**Checkpoint: Full app polished with animations, loading states, error handling, and responsive across all breakpoints.**

### Phase 8: Demo Prep (Hours 22-24)
**Goal: Ship it.**

- Person 1: Deploy to Vercel. Test production build. Fix any deployment issues.
- Person 2: Seed 3-4 complete demo user profiles (student from India, student from China, student from Mexico, student from Nigeria) with pre-generated playbooks so demos are instant without waiting for Claude API.
- Person 3: Record demo video for Devpost. Script: landing page, onboarding for an Indian student, playbook reveal, fee scanner audit, credit builder, community board, impact dashboard.
- Person 4: Write Devpost submission -- project name, description, problem statement, solution, technologies used, track (Tech For Good + Finance), screenshots.

**Checkpoint: Deployed on Vercel, demo video recorded, Devpost submitted, table demo rehearsed.**

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

## Supabase Schema

```sql
create table profiles (
  id uuid references auth.users primary key,
  name text,
  email text,
  university text,
  country_of_origin text,
  primary_currency text,
  visa_type text,
  has_ssn boolean default false,
  has_bank_account boolean default false,
  sends_money_home text default 'no',
  financial_concerns text[] default '{}',
  onboarding_complete boolean default false,
  created_at timestamp with time zone default now()
);

create table playbook_steps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  step_order integer not null,
  title text not null,
  status text default 'locked',
  explanation text,
  recommendation jsonb,
  savings jsonb,
  how_to_switch text[],
  created_at timestamp with time zone default now()
);

create table fee_audits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  category text not null,
  current_provider text,
  current_cost_per_year decimal,
  recommended_provider text,
  recommended_cost_per_year decimal,
  annual_savings decimal,
  switching_steps text[],
  ai_insight text,
  created_at timestamp with time zone default now()
);

create table community_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade,
  author_name text,
  author_country text,
  university text,
  category text default 'general',
  content text not null,
  upvotes integer default 0,
  comment_count integer default 0,
  created_at timestamp with time zone default now()
);

create table post_comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  author_name text,
  content text not null,
  created_at timestamp with time zone default now()
);

create table post_votes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  vote_type text default 'up',
  created_at timestamp with time zone default now(),
  unique(post_id, user_id)
);
```

## Demo Script (2 minutes at judging table)

**Open:** "When an international student lands in the US, they lose an average of $800 in their first year to bad financial decisions they didn't even know they were making. Wrong bank, bad phone plan, expensive remittances, no credit building. FirstGen fixes that."

**Onboarding (30 sec):** "Let's say you just arrived from India on a student visa. No SSN, no bank account, you send money home every month." [Click through onboarding questions quickly -- these should be pre-filled or fast to tap through.]

**Playbook (45 sec):** "Instantly, you get a personalized financial playbook. Step 1: Open a Discover checking account -- $0 fees, no SSN needed. That saves you $144 a year over Chase. Step 2: Switch from Western Union to Wise for sending money home -- that saves you $480 a year. Step 3: Get a secured credit card to start building credit." [Expand a step to show the savings comparison.] "Every step shows you exactly how much you save."

**Fee Scanner (20 sec):** "Already have a bank? Let's audit it." [Select Chase Total Checking.] "You're paying $144 a year in fees you don't need to. Switch to Discover, save $144."

**Impact (15 sec):** "Across our platform, students have saved over $48,000 in fees. That's textbook money, grocery money, rent money -- staying in students' pockets."

**Close (10 sec):** "FirstGen turns the financial system into something that works for everyone, not just people who grew up in it."

## Key Hackathon Notes

- If Supabase setup takes too long, fall back to React context + localStorage for state management. The AI features and the story are what win, not the database.
- Pre-seed 3-4 demo user profiles with pre-generated playbooks so demos are instant without waiting for Claude API response times.
- Claude API calls take 2-5 seconds. Always have polished loading states (skeleton cards with shimmer) so it feels intentional, not broken.
- The Playbook is the core feature. If you run out of time, a polished landing page + onboarding + playbook is enough to win. Fee Scanner and Credit Builder are bonus.
- Keep services.json data accurate. Judges or mentors who are international students will notice wrong information.
- The community board with seeded posts makes the app feel alive and populated even at a demo. Seed generously.
- The social impact story is your biggest weapon. Practice the opening line: "International students lose $800 in their first year to fees they didn't know they were paying."
