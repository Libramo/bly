<!-- # Bly — CLAUDE.md

## What is Bly

A studio landing site for a 4-person team based in Djibouti. Sells digital services (web platforms, dashboards, gov digitisation, healthcare tech, data pipelines, document automation) to East African businesses and government clients. Bilingual EN/FR throughout.

---

## Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties (no Tailwind classes for theming — all via `var(--*)`)
- **Fonts**: `DM Sans` (body) + `DM Serif Display` (headings) via `next/font/google`
- **Animation**: `motion/react`
- **Email**: Resend
- **Validation**: Zod
- **Auth/DB**: none (marketing site only)

---

## Theme system

- Driven by `data-theme` attribute on `<html>` — values: `"light"` | `"dark"`
- Tokens defined in `app/globals.css` under `:root` (light) and `[data-theme="dark"]`
- No-flash inline script in `app/layout.tsx` reads `localStorage` before first paint
- `ThemeProvider` in `components/theme-provider.tsx` syncs React state ↔ DOM attribute
- `ThemeToggle` in `components/theme-toggle.tsx` — pill with sliding thumb, crescent/sun icon swap

### Key CSS variables

```css
--bg, --fg, --muted, --muted-2
--border, --surface, --surface-hover
--accent, --accent-subtle
--nav-bg-scrolled
--toggle-track, --toggle-active, --toggle-thumb, --toggle-icon
```

---

## File structure

```
app/
  layout.tsx              # fonts, no-flash script, metadata
  globals.css             # all CSS variables (light + dark), base reset
  page.tsx                # main landing page (single "use client" file)
  work/
    [slug]/
      page.tsx            # dynamic case study route (async params — Next.js 15)
  contact/
    page.tsx              # standalone /contact page

components/
  theme-provider.tsx      # context + localStorage persistence
  theme-toggle.tsx        # the pill toggle UI
  navbar.tsx              # sticky, blur on scroll, mobile drawer, active underline
  team-section.tsx        # manifesto wall + anonymous role cards
  work-section.tsx        # expandable project cards (landing)
  case-study-page.tsx     # shared layout for /work/[slug]
  contact-form.tsx        # form UI with useActionState
  contact-section.tsx     # two-column inline contact section

actions/
  contact.ts              # server action — Zod validation, Resend (notification + auto-reply)

lib/
  projects.ts             # single source of truth for all project data
```

---

## i18n

- No routing-based i18n — a single `lang` state (`"en" | "fr"`) lives in `page.tsx` and is passed down as a prop
- All copy lives in `const C = { en: {...}, fr: {...} }` objects at the top of each file
- Language toggle in `Navbar` calls `setLang` lifted from `page.tsx`
- Text transitions use a `<Flip>` component (`AnimatePresence` + `rotateX`) for smooth language swaps
- `CaseStudyPage` manages its own internal `lang` state (self-contained)

---

## Projects data (`lib/projects.ts`)

Each `Project` has:

```ts
slug, tag, title, oneliner, description, stack,
stat: { value, label },
challenge, what,
decisions: [{ title, body }],
outcome
```

All text fields are `{ en: string; fr: string }`.

Adding a project: add one entry to `PROJECTS` array. The `[slug]` route, expandable cards, and "next project" footer all update automatically.

`generateStaticParams` pre-renders all slugs at build time.

---

## Contact form

- Server action in `actions/contact.ts`
- Sends 2 emails via Resend: notification to you + auto-reply to sender
- Fields: name, email, message
- Bilingual error messages and auto-reply body
- `useActionState` — progressive enhancement, works without JS

### Env vars needed

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@blyanalytics.com
CONTACT_FROM_EMAIL=Bly <noreply@bly.dj>
```

---

## Navbar

- Fixed, transparent → gains blur + border on scroll
- Active link tracked with `useState`, animated underline via `layoutId="nav-underline"`
- Mobile: hamburger → slide-down drawer with staggered links
- Contains: logo, desktop nav links, lang toggle, theme toggle, CTA button

---

## Team section (`components/team-section.tsx`)

- **No real names** — intentional design decision
- Structure: manifesto wall (4 numbered statements) → anonymous role cards (4 roles with skill tags)
- All copy self-contained in the component (not in `page.tsx`)
- To add real names later: add `name?: string` to the role card data shape

---

## Work section (`components/work-section.tsx`)

- Expandable cards — collapsed shows tag + title + one-liner
- Expanded shows: big stat, description, stack pills, "Read case study →" link
- Only one card open at a time
- Links to `/work/[slug]`

---

## Key design decisions

- All inline styles (no Tailwind utility classes in JSX) — keeps theming via CSS vars clean
- `MagLink` / `MagneticButton` components use `useMotionValue` + `useSpring` for cursor-pull effect
- `FadeUp` scroll-triggered entrance used on all major sections
- Service cards use a 1px grid gap on a `var(--border)` background for the divider effect
- No external UI library — all components hand-rolled

---

## Projects in production

| Slug                  | Name                                   | Stack                                 |
| --------------------- | -------------------------------------- | ------------------------------------- |
| `healthcare-platform` | Doctor booking platform (Docto-Djib)   | Next.js, Drizzle, Better Auth         |
| `ejo`                 | Ejo — official publications modernised | Next.js, PostgreSQL, full-text search |

---

## To add a new project

1. Add entry to `PROJECTS` in `lib/projects.ts`
2. Done — cards, routes, and next-project footer all update automatically

## To add a new team member

1. Add role + tags to `ROLES` in `components/team-section.tsx`
2. Add manifesto line if the team grows beyond 4

---

## Claude behaviour in this project

- **Never use visual widgets or sketches to present options** — always plain text. Saves tokens.
- **Styling**: Tailwind utility classes in JSX, not inline `style` props. Inline styles only for truly dynamic JS values.
- **One component per conversation** when refactoring — keeps context lean.
- Start each session by reading this file before touching any code.

All components refactored to Tailwind convention
lang prop passed via URL ?lang= param for case study pages
Logo uses useTheme to swap black/white SVG
Domain pointing to Vercel, Search Console submitted
Styling convention: Tailwind classes, inline styles only for dynamic JS values -->

## Application Building Context

Read the following files in order before implementing
or making any architectural decision:

1. `context/project-overview.md` — product definition,
   goals, features, and scope
2. `context/architecture.md` — system structure,
   boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography,
   and component conventions
4. `context/code-standards.md` — implementation rules
   and conventions
5. `context/ai-workflow-rules.md` — development workflow,
   scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase,
   completed work, open questions, and next steps

Update `context/progress-tracker.md` after each
meaningful implementation change.

If implementation changes the architecture, scope, or
standards documented in the context files, update the
relevant file before continuing.
