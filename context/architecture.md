# Architecture Context

## Stack

| Layer      | Technology                          | Role                                   |
| ---------- | ------------------------------------ | --------------------------------------- |
| Framework  | Next.js 16.2.4 (App Router)          | Routing, rendering, metadata/SEO APIs   |
| Language   | TypeScript                           | Type safety throughout                  |
| Styling    | Tailwind CSS v4 + CSS custom props   | Utility classes for layout, `var(--*)` for theme tokens |
| UI kit     | shadcn/ui (`radix-nova` style)       | Configured (`components.json`), minimally used — only `components/ui/button.tsx` so far; rest is hand-rolled |
| Fonts      | `DM Sans` + `DM Serif Display`       | Body / heading, via `next/font/google`  |
| Animation  | `motion/react`                       | Scroll-triggered entrances, magnetic buttons, language-swap transitions |
| Email      | Resend                               | Contact notification + auto-reply       |
| Validation | Zod                                  | Contact form input validation           |
| Auth / DB  | None                                 | Marketing site only, no persistence     |

## System Boundaries

- `proxy.ts` (project root) — Next.js 16's replacement for
  `middleware.ts` (renamed, exported function is `proxy` not
  `middleware`, Node.js runtime only). Rewrites any request that
  doesn't already start with `/en` to `/fr<path>` internally, so `/`
  transparently serves the `fr` locale segment without a visible URL
  prefix, while `/en` matches its folder segment directly.
- `app/[locale]/` — all user-facing routes live here: `/` (→ `fr`) and
  `/en` (→ `en`), plus `/services`, `/contact`, `/work` (the
  "Réalisations" / "Work" grid) and `/work/[slug]`, each rendered
  per-locale via `params.locale`.
  `app/[locale]/layout.tsx` is the true root layout (only one
  `<html>`/`<body>` per app) — `generateStaticParams` returns both
  locales, `<html lang={locale}>` is dynamic.
- `app/` (root, outside `[locale]`) — `robots.ts`, `sitemap.ts`,
  `opengraph-image.tsx`, `globals.css`, `favicon.ico`: Next.js
  metadata-route conventions that aren't per-locale pages, so they stay
  above the locale segment.
- `components/` — presentational + interactive UI (navbar, sections,
  theme provider/toggle, contact form). Standalone pages
  (`services-page.tsx`, `contact-page.tsx`, `work-page.tsx`,
  `case-study-component.tsx`) all use the shared `Navbar` for consistent
  navigation across every page (changed 2026-08-29 — previously each
  had its own lightweight self-contained header; superseded on explicit
  user request). `Navbar`'s `#team` link only corresponds to a section
  on the homepage, so `navHref` (in `navbar.tsx`) routes it back through
  the homepage (`/#team`, `/en#team`) when clicked from any other page.
  "Réalisations"/"Work" points to the real `/work` page.
  `live-preview-link.tsx` — outbound link to a live product with a
  hover screenshot card, portalled to `<body>` (fixed position) so
  `overflow-hidden` ancestors can't clip it; also exports `BrowserFrame`.
- `ThemeProvider` (`next-themes`, `attribute="class"`) is mounted ONCE,
  in `app/[locale]/layout.tsx` — never wrap a page in another one (a
  nested provider re-rendered its inline script on every client
  navigation; removed 2026-10-02). The wrapper in
  `components/theme-provider.tsx` passes an inert `scriptProps.type` on
  the client only, so the layout remount on a language switch doesn't
  trigger React's "Encountered a script tag" warning.
- `public/work/<slug>.png` — 1440×900 homepage screenshots of live
  projects (hover cards, `/work` grid, case-study pages); static, re-
  capture command documented on `Project.preview` in `lib/projects.ts`.
- `actions/` — server actions; currently just `contact.ts`
  (validate → send via Resend)
- `lib/` — `projects.ts` (single source of truth for project content —
  drives `/work`, `/work/[slug]`, the homepage cards, the hero "Livré
  pour" client line, and the "next project" footer; `client`, `url`,
  `preview`, `stack`, `stat`, `highlights`, `decisions` are optional) and
  `seo.ts` (single source of truth for `SITE_URL`, `siteMetadata`,
  `organizationJsonLd` — imported by `layout.tsx`, `sitemap.ts`,
  `robots.ts`, and `work/[slug]`'s `generateMetadata`)

## Storage Model

- **None.** No database. All content is static/hardcoded in
  `lib/projects.ts` and per-component `const C = { en, fr }` objects.
- **Transient**: contact form submissions are not persisted — they are
  only relayed as email via Resend.

## Auth and Access Model

- None. Public marketing site, no sign-in, no per-user access control.

## i18n Model

- **Implemented 2026-08-29**: real routing-based i18n via a native
  Next.js `app/[locale]/...` dynamic segment (not next-intl, not
  duplicated `/fr` folders). `Lang = "fr" | "en"` and all shared helpers
  live in `lib/i18n.ts` (`LOCALES`, `DEFAULT_LOCALE`, `localizedHref`,
  `otherLocale`) — every component that used to declare its own local
  `type Lang = "en" | "fr"` now imports it from there instead.
- **URL shape**: `/` (root, no path prefix) serves the `fr` locale;
  `/en` prefix serves `en` (`/en`, `/en/services`,
  `/en/work/healthcare-platform`, etc.). `fr` is the default/primary
  locale (Francophone East Africa is the target audience); `en` is
  secondary. Achieved via `proxy.ts` (project root — Next.js 16's
  renamed `middleware.ts`), which rewrites any request not already
  under `/en` to `/fr<path>` internally, so the visible URL stays
  prefix-free while still resolving to `app/[locale]/...` with
  `locale="fr"`.
- **`lang` is now derived from the route, never client state or
  `?lang=` search params.** `app/[locale]/page.tsx` stays the
  documented `"use client"` exception, but reads locale via React's
  `use(params)` instead of `useState`. `services/page.tsx`,
  `contact/page.tsx`, and `work/[slug]/page.tsx` are server components
  that `await params` and pass `lang` down as a plain prop —
  `CaseStudyPage`, `ServicesPage`, and `ContactPage` no longer read
  `useSearchParams()` or own any `lang` state themselves. `Navbar`'s
  locale toggle reads the current path via `usePathname()` +
  `stripLocalePrefix` (in `lib/i18n.ts`) so it preserves whatever page
  you're on (`/services` ↔ `/en/services`, `/work/{slug}` ↔
  `/en/work/{slug}`), not just a fixed homepage link — a real bug caught
  after `Navbar` became the shared header for every page. Language
  toggles are real `<Link>`/`<a>` navigations to the sibling-locale URL
  via `localizedHref`/`otherLocale`, not in-memory flips — so each
  language is a genuinely distinct, server-rendered, crawlable document.
- `<html lang={locale}>` in `app/[locale]/layout.tsx` is dynamic now
  (previously hardcoded `"en"`).
- French SEO copy ("conseil digital", "analyse de données") is done
  (2026-08-29) — note that `HeroSection` and `ServicesSection` own
  their own copy objects; the `C` object in `app/[locale]/page.tsx` is
  dead code, so edits there never render (that bit us once — fixed
  2026-10-02).

## SEO / Metadata Surface

- `lib/seo.ts` — single source of truth: `SITE_URL`
  (`https://www.blyanalytics.com`), `getSiteMetadata(locale)` (returns
  per-locale title, description, keywords, OpenGraph incl. `locale`/
  `alternateLocale`, Twitter card, canonical + `alternates.languages`
  for hreflang), `organizationJsonLd` (`Organization` + `WebSite`
  schema in a `@graph`, locale-neutral). `app/[locale]/layout.tsx`
  calls `generateMetadata` → `getSiteMetadata(locale)` and renders
  `organizationJsonLd` in a `<script>` tag.
- `app/[locale]/services/page.tsx` and `app/[locale]/contact/page.tsx`
  each have their own `generateMetadata` (title, description, canonical
  + `alternates.languages`, OG) per locale, built from `SITE_URL`
  directly — they don't reuse `getSiteMetadata` since their content
  differs from the homepage.
- `app/[locale]/work/[slug]/page.tsx` — `generateMetadata` per project
  per locale (uses `project.title[locale]`/`project.oneliner[locale]`,
  previously hardcoded to `.en` regardless of viewer language — fixed
  2026-08-29), canonical + `alternates.languages` via `SITE_URL`.
- `app/robots.ts` — allows all crawlers, points to `sitemap.ts`, sitemap
  URL built from `SITE_URL`.
- `app/[locale]/work/page.tsx` — the "Réalisations"/"Work" grid, own
  `generateMetadata` (title, description, canonical, hreflang, OG).
- `app/sitemap.ts` — lists `/`, `/services`, `/work`, `/contact`, and
  one entry per `PROJECTS` slug, each with an `alternates.languages` map
  to its `/en` variant.

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
   `https://www.blyanalytics.com` (`SITE_URL` in `lib/seo.ts`) — the bare
   `blyanalytics.com` domain 308-redirects to `www` at the Vercel level,
   so anything declaring the bare domain as canonical contradicts the
   server and confuses Google. Do not hardcode either domain string
   anywhere else — always import `SITE_URL`.
6. Never list a redirecting URL in `sitemap.ts` (same class of bug as
   invariant 5). `/work` was a redirect until 2026-10-02 and was kept
   out; it is now a real page and is listed.
7. `proxy.ts` (Next.js 16's `middleware.ts` replacement) is what makes
   `/` transparently serve the `fr` locale segment — don't reintroduce
   a `middleware.ts` file; Next 16 only recognizes `proxy.ts`.
