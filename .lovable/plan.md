## ImTheRichest — Full v1 Build Plan

A dark, luxury-editorial leaderboard app where every $1 "paid" becomes 1 point. All payments are simulated (no Stripe), and auth is mocked client-side (no real backend) — so this v1 is a fully working, persistent prototype users can demo end-to-end.

### Visual system (locked from the Luxe Editorial direction)
- Dark surface `#09090b`, card `#121212`, gold `#c5a059`, gold-light `#e2c284`.
- Inter font family; leaderboard numbers in font-black.
- Sharp corners (rounded-none), thin gold dividers, subtle gold radial glow behind hero, gold shimmer on key headline word.
- Tokens copied verbatim into `src/styles.css` under `@theme inline`.

### Pages & routes
Public:
1. `/` — Landing (hero, live top-3 podium preview, How It Works, achievements showcase, footer)
2. `/leaderboard` — Full leaderboard (top-3 podium, top 4–10 list, searchable/filterable global table)
3. `/u/$username` — Public profile (header, stats cards, achievements grid, recent activity)
4. `/login` — Sign in (mocked)
5. `/register` — Sign up (mocked)

Authenticated (mock guard — redirects to `/login` if no session):
6. `/dashboard` — Welcome, current rank/points/paid, big Make Payment CTA, rank-progression bar, latest achievements
7. `/pay` — Amount input + quick buttons ($5/$10/$25/$50/$100/custom), summary, complete → success screen with celebration
8. `/profile` — Personal profile (same as public but with edit affordances)
9. `/achievements` — Full achievements page (Normal + Weird sections, all 20+ badges, locked faded)
10. `/settings` — Tabs: Profile, Account, Privacy, Notifications

### Data & state (no backend in v1)
- Zustand store with `persist` middleware (localStorage):
  - `auth`: current user (mocked), login/register/logout
  - `users`: seeded list of ~50 fake users with names, avatars, points, totalPaid, joinDate, country
  - `payments`: per-user payment history
  - `achievements`: per-user unlocked map
- Service layer in `src/services/` wraps the store (`leaderboardService`, `paymentsService`, `achievementsService`, `authService`) so swapping to Lovable Cloud later is a single-layer change.
- React Query used for reads even though source is local — gives us the right architecture for a backend swap and gets us caching/invalidation for free.
- Achievement evaluator runs after each payment / login and unlocks any newly-eligible badges (covers Night Owl, Weekend Warrior, Speed Runner, Lucky Seven, Tax Collector, Nice, Over 9000, spend tiers, rank tiers, etc.).

### Components
- `AppNav` (public) and `AuthedNav` (with avatar/dropdown)
- `PodiumTop3` — gold #1 center taller, silver/bronze flanking
- `LeaderboardTable` — search + Today/Weekly/Monthly/All Time tabs, paginated
- `RankRow`, `StatCard`, `AchievementCard` (locked/unlocked variants), `PaymentSuccessModal` with confetti-style gold particles
- `Footer`
- Reuse shadcn `Button`, `Input`, `Tabs`, `Dialog`, `Card`, `Avatar`, `Progress`, `Switch`, `Tooltip`

### Achievements covered (all from spec)
Normal: Verified Email, First Login, First Purchase, Spent $100/$1k/$10k, Top 100/10/3, Rank #1.
Weird: Night Owl, Bitcoin Whale, Weekend Warrior, Lucky Seven, Serial Spender, Millionaire Mindset, Insomniac, Speed Runner, Tax Collector (404 pts), Nice (69 pts), Over 9000 (9000+ pts).

### Technical notes
- TanStack Start file routes under `src/routes/` (e.g. `leaderboard.tsx`, `u.$username.tsx`, `_authenticated.dashboard.tsx`, etc.). Pathless `_authenticated.tsx` layout uses client-side mock-auth guard in `beforeLoad`.
- Each public route gets its own `head()` (title, description, OG). No real backend / server functions in v1.
- Hero number tickers + gold shimmer via lightweight CSS animations (no framer-motion needed for v1; can add later).
- Strict TS, named exports, kebab-case files, camelCase vars, PascalCase components — per workspace conventions.

### Out of scope for v1 (easy follow-ups)
- Real Stripe payments
- Lovable Cloud (real auth, persistent multi-device data, real-time updates)
- Follow/social features
- 2FA, email verification (UI present, mocked toggles)
- Avatar upload backend (UI present, stored as data URL in localStorage)

### What you'll see when it's done
A fully navigable luxury-feel app: browse the leaderboard, click a profile, sign up, land on the dashboard, make a $50 "payment", watch points + rank update, unlock achievements, and explore settings — all persistent across reloads in your browser.
