# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- SEO improvement initiative — In Progress (audit complete, fixes not
  yet started)

## Current Goal

- Take the site from effectively unindexed/undiscoverable to a
  visibility score of ~90/100: get indexed, fix the i18n/crawlability
  gap, deepen content, and build minimal authority signals.

## Completed

- 2026-07-24 — Full SEO audit performed (live site fetch + robots.txt +
  sitemap.xml + code review). Findings:
  - On-page/technical SEO is solid (~80/100): title, meta description,
    OG/Twitter tags, canonical, JSON-LD (`Organization` + `WebSite`),
    valid `robots.txt` (allows all), valid `sitemap.xml`.
  - **Site is not indexed by Google at all** — `site:blyanalytics.com`
    returns zero results; branded search ("Bly Analytics" Djibouti)
    surfaces nothing. This is the actual cause of "no one can find it."
  - Root causes identified:
    1. Domain is very new (~3 weeks old as of audit) — indexing lag is
       expected but not sufficient explanation alone.
    2. Zero backlinks — only external signal is one LinkedIn company
       page (`sameAs` in JSON-LD).
    3. French content has no independent crawlable URL — `lang` is a
       client-side state toggle, not a route, so Google only ever sees
       the English DOM. No `hreflang`, no `/fr`.
    4. Thin site — only 4 URLs total (`/`, `/contact`, 2 case studies),
       no blog/article content for long-tail queries.
    5. `<html lang="en">` hardcoded in `app/layout.tsx` despite serving
       French content.
    6. `/work/[slug]` pages likely rely on root layout metadata only —
       need to verify each case study exports its own title/description
       (currently unconfirmed — check `app/work/[slug]/page.tsx`).

## In Progress

- None — the www/canonical fix below is done and verified, ready to deploy.

## Completed (session 2, 2026-07-24)

- Confirmed via GSC "Page indexing" report: 15 indexed / 8 not indexed.
  Most of the 15 are actually the `lexdj.blyanalytics.com` subdomain
  (the Ejo product), not the marketing site — marketing site itself only
  had 2 indexed pages (`/` and `/work/healthcare-platform`).
- Confirmed root cause of "Page with redirect" (3) and "Alternate page
  with proper canonical tag" (1) exclusions: `https://blyanalytics.com`
  (bare domain) returns an HTTP 308 to `https://www.blyanalytics.com`,
  but code declared the bare domain as canonical everywhere
  (`metadataBase`, canonical tag, OG url, JSON-LD `@id`, sitemap `<loc>`,
  robots sitemap pointer) — a self-contradicting signal.
- **Fixed**: created `lib/seo.ts` as single source of truth — exports
  `SITE_URL = "https://www.blyanalytics.com"`, `siteMetadata`, and
  `organizationJsonLd`. Updated `app/layout.tsx`, `app/sitemap.ts`,
  `app/robots.ts` to import from it instead of hardcoding the domain.
  Also answers "why not extract metadata/JSON-LD" — Next.js only needs
  the `metadata` export *name* in the layout file; the value can live
  anywhere.
- **Caught a second bug while fixing the first**: `app/contact/page.tsx`
  no longer exists (contact is now an inline homepage section via
  `ContactSection`, reached by anchor, not a route) — but the live
  deployed `sitemap.xml` still lists `https://blyanalytics.com/contact`,
  and I nearly re-added it to the new sitemap by trusting stale
  `CLAUDE.md` docs. Corrected before commit. `CLAUDE.md`'s file
  structure section is now out of date on this point.
- Also confirmed `app/work/page.tsx` is a redirect to `/#work`, not a
  real page — correctly excluded from sitemap (same redirect-in-sitemap
  anti-pattern as the domain fix).
- Diagnosed the two remaining not-indexed reasons:
  - **Soft 404** (`blyanalytics.com/about`): route doesn't exist in the
    app; live `curl` check confirms it now correctly returns a real
    HTTP 404. Stale GSC entry from before — no code fix needed, will
    clear on recrawl (or use URL Removal tool to speed it up).
  - **Not found 404** (`lexdj.blyanalytics.com/`): the Ejo subdomain's
    root path 404s. That's a separate deployment outside this repo —
    flagged to user to check separately, not actionable here.
- `npm run build` passes with all changes.
- **Not yet deployed** — these fixes are local only, need commit + push
  + deploy before they affect GSC/production.

## Completed (session 3, 2026-07-24)

- Added `/services` (`app/services/page.tsx` + `components/services-page.tsx`)
  and `/contact` (`app/contact/page.tsx` + `components/contact-page.tsx`) as
  real standalone, indexable routes — thin-site gap from the audit.
  `/contact` reuses the existing `ContactSection`/`ContactForm`; `/services`
  has genuinely expanded per-service copy (not a duplicate of the homepage
  teaser grid) to avoid duplicate-content dilution. Both follow the
  case-study page's convention: lightweight self-contained header +
  `?lang=` param, not the full homepage `Navbar`.
- Both routes have their own `generateMetadata`-equivalent (`title`,
  `description`, canonical via `SITE_URL`, OpenGraph) and were added to
  `app/sitemap.ts`.
- Fixed the same bare-domain canonical bug in `app/work/[slug]/page.tsx`'s
  `generateMetadata` (was hardcoding `https://blyanalytics.com`, now
  imports `SITE_URL` from `lib/seo.ts`) — same root cause as the layout fix,
  just missed on the first pass.
- Added internal links: `components/footer-section.tsx` now links to
  `/services` and `/contact`. Navbar `NAV_LINKS` "Services" and "Contact"
  (desktop + mobile drawer + both "Let's work" CTA buttons) now point to
  `/services` and `/contact` instead of `#services`/`#contact` homepage
  anchors — user chose full-page nav over anchor-scroll specifically for
  the stronger internal-linking SEO signal, accepting the small UX
  trade-off (no more smooth-scroll from nav for those two items). `#work`
  and `#team` were intentionally left as anchors.
- Repo-wide grep confirmed no other hardcoded bare-domain
  (`https://blyanalytics.com`) references remain anywhere that affects
  SEO/canonical signals.
- `npm run build` passes with all changes (verified after the navbar edit
  too — routes `/`, `/services`, `/contact`, `/work/[slug]` all generate
  as static).
- **Still not deployed.** User wants to review `/services` and `/contact`
  in the browser themselves before anything ships.

## Next Up

Priority order (highest leverage first):

1. Check Google Search Console coverage report directly — confirm
   whether pages are "Discovered, not indexed" (patience problem) vs.
   "Crawled, not indexed" (quality/rendering problem) vs. never
   submitted correctly. This determines whether remaining steps are
   urgent or just need time.
2. Decide and implement an i18n routing strategy so French content gets
   its own indexable URL (see Open Questions — this is an architecture
   decision, not a quick fix).
3. Fix `<html lang="en">` to reflect actual active language once i18n
   routing is settled.
4. Add per-route metadata to `/work/[slug]` (title/description per
   project) if not already present — verify first.
5. Get 2-3 real backlinks (LinkedIn post linking to the site, a
   directory listing, a partner mention).
6. Add 1-2 more content pages / expand existing copy for long-tail
   service+region keyword coverage (e.g. a `/services` page).
7. Reconcile sitemap drift: deployed `sitemap.xml` includes `/contact`,
   but local `app/sitemap.ts` currently only lists `/` + project slugs —
   confirm which is source of truth (there are uncommitted local changes
   to `app/sitemap.ts` per git status).

## Open Questions

- **i18n routing approach**: recommended direction (not yet started) is
  a native Next.js `app/[locale]/...` dynamic segment — not next-intl
  (its message-catalog machinery is overkill for this site's inline
  `{ en, fr }` copy objects) and not physically duplicated `/fr` folders
  (duplication risk as route count grows, especially once `/articles`
  lands). One route file per page serves both locales via
  `params.locale`, reusing existing components (`lang` prop already
  supported everywhere). User explicitly deferred starting this — "not
  for now."
- **Articles / `/articles` route**: user will use **Strapi** (headless
  CMS) for article content, not a local `lib/articles.ts` data file like
  `lib/projects.ts`. Strapi has native i18n (locale variants per content
  type), which pairs naturally with the `[locale]` routing plan above —
  worth revisiting the i18n routing decision once `/articles` is
  actually being built, since Strapi's locale param can drive
  `params.locale` directly. Not started — no schema, no integration, no
  route yet.
- Is Search Console actually verified and property-level (domain vs.
  URL-prefix) set up correctly? `CLAUDE.md` notes "Search Console
  submitted" but audit couldn't confirm current coverage status from
  outside.
- Any existing backlinks/mentions the user already has (e.g. a
  Djibouti business registry, past client sites) that just need a link
  added, vs. starting from zero?

## Architecture Decisions

- None yet specific to SEO — pending the i18n routing decision above.

## Session Notes

- Audit source: live fetch of `https://blyanalytics.com`,
  `/robots.txt`, `/sitemap.xml`, plus local `app/layout.tsx` and
  `app/sitemap.ts`. Full findings summarized above under "Completed."
- Local git status at time of audit shows uncommitted changes in
  `app/layout.tsx`, `app/sitemap.ts`, `app/work/[slug]/page.tsx` — check
  these against the deployed site before assuming parity; the deployed
  sitemap already differs from the local `sitemap.ts` (has `/contact`,
  local doesn't).
