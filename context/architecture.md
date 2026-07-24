# Architecture Context

## Stack

| Layer      | Technology                          | Role                                   |
| ---------- | ------------------------------------ | --------------------------------------- |
| Framework  | Next.js 15 (App Router)              | Routing, rendering, metadata/SEO APIs   |
| Language   | TypeScript                           | Type safety throughout                  |
| Styling    | Tailwind CSS v4 + CSS custom props   | Utility classes for layout, `var(--*)` for theme tokens |
| UI kit     | shadcn/ui (`radix-nova` style)       | Configured (`components.json`), minimally used — only `components/ui/button.tsx` so far; rest is hand-rolled |
| Fonts      | `DM Sans` + `DM Serif Display`       | Body / heading, via `next/font/google`  |
| Animation  | `motion/react`                       | Scroll-triggered entrances, magnetic buttons, language-swap transitions |
| Email      | Resend                               | Contact notification + auto-reply       |
| Validation | Zod                                  | Contact form input validation           |
| Auth / DB  | None                                 | Marketing site only, no persistence     |

## System Boundaries

- `app/` — routes, layout/metadata (title, OG, JSON-LD), global CSS
  tokens, `robots.ts` / `sitemap.ts`
- `components/` — presentational + interactive UI (navbar, sections,
  theme provider/toggle, contact form)
- `actions/` — server actions; currently just `contact.ts`
  (validate → send via Resend)
- `lib/` — `projects.ts`, the single source of truth for all case study
  content (drives `/work/[slug]`, expandable cards, and the "next
  project" footer)

## Storage Model

- **None.** No database. All content is static/hardcoded in
  `lib/projects.ts` and per-component `const C = { en, fr }` objects.
- **Transient**: contact form submissions are not persisted — they are
  only relayed as email via Resend.

## Auth and Access Model

- None. Public marketing site, no sign-in, no per-user access control.

## i18n Model

- No routing-based i18n. A single `lang: "en" | "fr"` state lives in
  `page.tsx` and is passed down as a prop; copy lives in per-file
  `const C = { en, fr }` objects.
- **SEO implication**: because language is a client-side toggle and not
  a distinct URL (no `/fr` route, no `?lang=` indexed variant, no
  `hreflang`), search engines only ever see the English DOM. French
  content currently has no independent crawlable URL. This is a known
  gap — see `progress-tracker.md`.
- `CaseStudyPage` manages its own internal `lang` state, driven by a
  `?lang=` URL param.
- `<html lang="en">` is hardcoded in `app/layout.tsx` regardless of
  which language is displayed.

## SEO / Metadata Surface

- `app/layout.tsx` — static `Metadata` export (title, description,
  keywords, OpenGraph, Twitter card, canonical) + inline JSON-LD
  (`Organization` + `WebSite` schema in a `@graph`)
- `app/robots.ts` — allows all crawlers, points to `sitemap.ts`
- `app/sitemap.ts` — lists `/`, and one entry per `PROJECTS` slug
  (currently does **not** include `/contact` in the local source, though
  the deployed sitemap does — check for drift)

## Invariants

1. No database — do not introduce persistence for content that belongs
   in `lib/projects.ts` or component-local copy objects.
2. All theming goes through CSS custom properties (`var(--*)`) — never
   hardcode hex values in components.
3. `lib/projects.ts` stays the single source of truth for case study
   data; the `[slug]` route and all card/footer UI must keep reading
   from it rather than duplicating project data.
4. Adding a project or team member must not require touching routing
   code — only data files (`lib/projects.ts`, `components/team-section.tsx`).
5. `metadataBase` and canonical URLs stay pointed at
   `https://blyanalytics.com` — do not let a preview/staging domain leak
   into production metadata.
