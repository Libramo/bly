# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- SEO improvement initiative — In Progress. Two rounds of fixes are now
  live in production: (1) canonical/www consistency, `/services` +
  `/contact` pages, internal linking (`01b7c5f`, 2026-07-24), and (2)
  the `[locale]` French-default routing migration + French copy pass
  (`1b96deb`, `44486c5`, 2026-08-29). The former hard blocker — zero
  crawlable French content — is fixed and deployed. `www.blyanalytics.com`
  is confirmed indexed by Google as of 2026-08-29. Remaining work is
  waiting on Google's crawl/snippet-refresh cycle, plus the
  still-untouched levers: backlinks (zero) and `/articles` content
  (not started).

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

- None — all session 2/3/4 work below is done and build-verified.
  Blocked only on the user committing + pushing + deploying (their call,
  not yet given).

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
- **Still not deployed.** User reviewed `/services` and `/contact`
  themselves in the browser (per their request) rather than having
  Claude drive an automated browser check.

## Completed (session 4, 2026-07-24)

- Fixed a Next.js dev warning that surfaced once the navbar started
  doing real route transitions (see session 3): `html { scroll-behavior:
  smooth }` in `globals.css` (there for `#work`/`#team` anchor scroll)
  needed `data-scroll-behavior="smooth"` on `<html>` in `app/layout.tsx`
  so Next's router accounts for it during route transitions. One
  attribute, no behavior change.
- Full context-file sync pass: fixed a real stale-doc bug in
  `architecture.md` (invariant 5 still told future sessions to keep
  canonical URLs on the bare domain — the exact bug already fixed in
  code). Updated `architecture.md`, `project-overview.md`, and this file
  to reflect current reality throughout.
- `npm run build` re-verified clean after the `data-scroll-behavior` fix.
- Still not deployed — blocked only on user's go-ahead to commit.

## Completed (session 5, 2026-08-29)

- **`[locale]` routing implemented** — the deferred i18n restructure
  (see session 4's Open Questions) is done. `/` now serves real,
  server-rendered French markup by default; `/en` serves English. Full
  detail:
  - `proxy.ts` added at project root (Next.js 16's `middleware.ts`
    replacement — confirmed via docs check that the project is actually
    on `next@16.2.4`, not "15" as this file previously said; also fixed
    in `architecture.md`/`code-standards.md`). Rewrites any request not
    already under `/en` to `/fr<path>` internally.
  - Every route moved under `app/[locale]/` (`page.tsx`, `layout.tsx`,
    `services/page.tsx`, `contact/page.tsx`, `work/[slug]/page.tsx`,
    `work/page.tsx`). `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`
    stay at the true root (not per-locale).
  - New `lib/i18n.ts` — shared `Lang` type, `LOCALES`, `DEFAULT_LOCALE`,
    `localizedHref`, `otherLocale`. Replaced the 5 separate local
    `type Lang = "en" | "fr"` declarations that used to live in
    `page.tsx`, `navbar.tsx`, `case-study-component.tsx`,
    `services-page.tsx`, `contact-page.tsx`.
  - `lang` is now derived from the URL everywhere — `useSearchParams()`
    + `?lang=` seeding removed from `CaseStudyPage`, `ServicesPage`,
    `ContactPage`; the homepage's `useState<Lang>("en")` replaced with
    `use(params)`. Language toggles (`Navbar` + the 3 standalone-page
    headers) are now real `<Link>` navigations to the sibling-locale
    URL, not in-memory flips.
  - `lib/seo.ts`'s `siteMetadata` became `getSiteMetadata(locale)` with
    per-locale copy, `openGraph.locale`/`alternateLocale`, and
    `alternates.languages` (hreflang). Same pattern added to
    `services`, `contact`, `work/[slug]` `generateMetadata` — the
    `[slug]` route's metadata also stopped hardcoding `.en` fields
    regardless of viewer language (a real bug fixed along the way).
    `sitemap.ts` now emits `alternates.languages` per URL.
  - `npm run build` verified clean: both locale trees generate
    (`/fr`, `/en` internally; `/`, `/en` externally) for all routes,
    including the full `{locale, slug}` cross product for case studies.
    `npm run lint` clean except pre-existing issues unrelated to this
    change (React Compiler `set-state-in-effect` warnings in
    `navbar.tsx`/`footer-section.tsx`/`hooks/use-theme-toggle.ts`, and
    a few pre-existing unused-import warnings) — none introduced here.
  - Also swept every file touched this session for Tailwind
    canonical-class lint suggestions (`text-[var(--x)]` →
    `text-(--x)`, and numeric arbitrary values with an exact scale
    equivalent like `max-w-[920px]` → `max-w-230`) per explicit user
    request to always fix these when linting surfaces them.
  - **Not done** (explicit separate follow-up, decided this session):
    writing actual French copy targeting real search phrasing — this
    change reused the existing `{ en, fr }` copy as-is. See Next Up.
  - Fixed a bug the user caught during manual verification: toggling
    locale (`/` ↔ `/en`) logged a browser warning — "Encountered a
    script tag while rendering React component." Root cause, confirmed
    by elimination testing (user removed `<ThemeProvider>` and the
    warning persisted, pointing straight at our own script — an earlier
    theory blaming `next-themes`' internal script alone was incomplete):
    `app/[locale]/layout.tsx` now legitimately re-renders on the client
    whenever the locale segment changes (the old static `app/layout.tsx`
    never re-rendered for in-app navigation), and `next/script`'s
    `strategy="beforeInteractive"` is documented to only work by
    injecting into the *initial* server-rendered HTML stream — it has
    no valid re-entry path when a layout using it gets re-spliced into
    an already-interactive page via a client-side route change, so
    React flags the raw script insertion.
    - The manual no-flash theme script was both the proven cause and
      redundant (`next-themes`'s own `<ThemeProvider>`, already used
      here, injects an equivalent blocking script itself) — removed
      outright rather than just changing its strategy.
    - The JSON-LD structured-data script is still needed (SEO, from
      `01b7c5f`) and was kept, but converted from a raw `<script>` to
      `next/script`'s `<Script>` with the default (non-`beforeInteractive`)
      strategy, which uses an id-deduped client loader that tolerates
      being re-spliced on navigation — so it doesn't hit the same bug.
    - **Confirmed** (via the browser's own error overlay, pointing
      straight at `components/theme-provider.tsx:10` → `NextThemesProvider`):
      `next-themes`' own internal script independently triggers the
      identical warning on locale toggle, by the same mechanism — it
      renders a real `<script>` JSX element (not an imperative
      `document.createElement` insertion like `next/script`'s
      non-`beforeInteractive` strategies use), so it has no way to
      survive being re-spliced into the page when `[locale]` changes.
      There's no prop to disable it, and no stable `next-themes` release
      fixes it (0.4.6 is latest; only an unreleased 1.0.0-beta.0
      exists) — it's a widely-reported open upstream issue (also hit by
      shadcn/ui, heroui), not specific to this repo.
    - **Decision (2026-08-29): leave it.** Purely a console warning, no
      functional/user-facing effect — theme still applies correctly on
      every load and toggle. The real fix would mean replacing
      `next-themes` entirely (reimplementing theme
      state/toggle/system-detection/cross-tab sync across `navbar.tsx`,
      `footer-section.tsx`, `hooks/use-theme-toggle.ts`, and
      `theme-provider.tsx`, using `useServerInsertedHTML` for the
      flash-prevention script) — real surface area not justified for a
      cosmetic issue. Revisit only if `next-themes` ships a fix, or if
      this ever becomes more than cosmetic.
    - Rebuilt clean after the fix.
  - **User-driven design change**: `/services`, `/contact`, and
    `/work/[slug]` switched from their own lightweight self-contained
    headers to the shared homepage `Navbar`, for consistent navigation
    across every page (user's explicit call — the standalone-header
    convention documented in `architecture.md` is now superseded).
    - `Navbar`'s `NAV_LINKS` `#work`/`#team` hash anchors only resolve
      on the homepage — added a `navHref` helper in `navbar.tsx` so
      those links go through the homepage first (`/#work`, `/en#work`)
      when clicked from any other page, instead of trying to scroll a
      section that doesn't exist on the current page.
    - **Caught and fixed a real bug**: `Navbar`'s locale-toggle was
      hardcoded to always target `/` (correct back when it only ever
      lived on the homepage) — after the swap, toggling locale on
      `/services` dropped the user to the homepage instead of
      `/en/services`. Fixed by adding `stripLocalePrefix` to
      `lib/i18n.ts` and having `Navbar` read the current path via
      `usePathname()`, so the toggle now preserves whatever page you're
      on across both `/services`/`/contact` and `/work/{slug}`.
    - Removed the now-dead `NAV_COPY` objects and unused
      `otherLocale`/`Link` imports from `services-page.tsx`,
      `contact-page.tsx`, `case-study-component.tsx` after the swap.
    - No layout clearance issue: `Navbar` is `position: fixed` (unlike
      the old `sticky` self-contained headers), but these pages' content
      already had `pt-20` (80px) top padding, comfortably more than
      `Navbar`'s 54px un-scrolled height — left unchanged.
    - `npm run build` and a targeted `eslint` pass on every touched file
      both clean (only the pre-existing, unrelated `setMounted`-in-effect
      warning remains).
  - **Committed and pushed**: `1b96deb` ("add French-default locale
    routing, unify nav across pages") and `44486c5` ("write French copy
    targeting real search phrasing"). User verified manually in the
    browser first. Confirmed live 2026-08-29 via direct checks:
    - Live `sitemap.xml` fetched and valid — 5 URLs, correct
      French/English `hreflang` alternates.
    - Search Console URL Inspection on `https://blyanalytics.com/`
      (bare domain, no `www`) correctly shows "not indexed / page with
      redirect" — expected, since that domain intentionally 308s to
      `www` (invariant 5); not a bug.
    - Search Console URL Inspection on `https://www.blyanalytics.com/`
      (the real canonical) shows **"Page is indexed"**, served over
      HTTPS — the site is genuinely in Google's index now.
    - Google search still shows the old "Digital Consultancy" title as
      of this session's end — expected lag between "indexed" and "the
      live snippet reflects the latest crawl"; user clicked "Request
      Indexing" on the `www` homepage to prompt a fresh crawl. Not
      resolved yet, no action needed beyond waiting — revisit next
      session if it's still stale after a few days.

## Completed (session 6, 2026-09-10)

- **Genericized team headcount in `components/team-section.tsx`** — user
  wants to stay vague about the exact team size ("4") rather than state
  it publicly. Changed:
  - Section title EN "Four people. Zero fluff." → "Small team. Zero
    fluff."; FR "Quatre personnes. Zéro superflu." → "Petite équipe.
    Zéro superflu."
  - FR manifesto item 03 said "quatre personnes" while the EN version of
    the same line already said "small team" — a real EN/FR inconsistency
    caught while fixing this; FR now matches ("petite équipe").
  - The role-card grid was 4 cards (Full-stack engineer / UI/UX designer
    / Data engineer / Project lead) — even with no number in the text,
    one-icon-per-card visually implied 4 people. Consolidated to 3
    grouped capability cards (Engineering / Design / Data & delivery),
    merging the old Data engineer + Project lead tags into the third
    group, so the card count no longer maps 1:1 to headcount.
  - Also updated the "4-person" mentions in `context/project-overview.md`
    (Overview section) and the legacy commented-out block in `CLAUDE.md`
    to say "small" instead, for consistency across docs (these are
    internal-only and never rendered on the site, but user asked to
    genericize them too).
- `npm run build` verified clean after the change.

## Completed (session 7, 2026-09-11)

- **Business card design (marketing collateral, not app code)** — Bly
  was selected to attend a Francophonie economic mission event in
  Djibouti; built a two-sided business card (French front / English
  back, same info both sides) as a Claude Design canvas artifact:
  https://claude.ai/code/artifact/acd9e01f-fab3-47e7-bc20-d5451b36b6c5
  - Left column: logo, name + title (honorific prefixed: M./Mme,
    Mr./Ms.), phone, email, `blyanalytics.com`. Right column: a large
    QR code (~40% of card width) encoding a **vCard** (not a link) so
    scanning prompts "Add to Contacts" directly — no landing page
    needed. No street address anywhere, consistent with Bly having no
    physical office.
  - QR codes are custom-rendered (not the plain `qrcode` npm output):
    finder "eyes" and a decorative rounded frame recolored to the
    site's accent `#4059e5`, data modules stay black for scan
    contrast. Verified after every regeneration by rasterizing +
    decoding with `jsqr` to confirm the vCard payload survived —
    caught this the hard way after nearly hand-retyping a user-provided
    KoloQR SVG (500+ path elements) into a file by hand, which risked
    silently corrupting the scannable data; copied the file directly
    from disk instead once the user gave a local path.
  - Cards built for Liban Yonis Omar (Co-fondateur & développeur
    full-stack) and Ayan Yonis Omar (Chargée de mission — chosen over
    "Dirigeante" since she isn't actually a director, and over generic
    options since "chargée de mission" echoes the event's own "mission
    économique" framing).
  - Full reusable spec (HTML template, QR generation script, how to
    add a new collaborator) written to `context/business-card.md` —
    explicitly *not* wired into the Next.js app; kept here only so a
    future session can reproduce the same card for new hires.

## Next Up

Priority order (highest leverage first):

1. **Wait for Google to recrawl + update the live snippet** for
   `https://www.blyanalytics.com/` — indexing requested 2026-08-29,
   typically takes days, sometimes longer for a new/low-authority
   domain. Also request indexing on `/en` (not yet done as of this
   session).
2. ~~French copy targeting real search phrasing~~ — **done 2026-08-29**.
   Working phrases "conseil digital" and "analyse de données" (matching
   the exact wording of "boite analyse de données djibouti" and
   "conseil digital" the user is targeting) into visible French copy,
   not just meta keywords:
   - `lib/seo.ts` fr: site title is now "Bly Analytics — Conseil
     Digital & Analyse de Données"; description/OG description lead
     with "agence de conseil digital... analyse de données..."; added
     "conseil digital Djibouti" to keywords alongside the existing
     "analyse de données Djibouti".
   - `app/[locale]/page.tsx` fr: `hero_sub` now says "agence de conseil
     digital... spécialisée dans l'analyse de données..."; the
     "Tableaux de bord analytiques" service was retitled "Analyse de
     données & tableaux de bord" (title + body).
   - `components/services-page.tsx` fr: intro now opens "votre
     partenaire de conseil digital à Djibouti"; same service item
     retitled/reworded to match.
   - `app/[locale]/services/page.tsx` fr `generateMetadata`: description
     now leads with "Analyse de données..." and ends "...conseil
     digital conçu pour...".
   - English copy intentionally untouched — not the target language for
     these queries.
   - `npm run build` verified clean after the pass.
3. Request indexing on `/services`, `/en/services`, `/contact`,
   `/en/contact`, and both `/work/{slug}` URLs in both locales —
   only the `www` homepage has been done so far.
4. Re-check the Search Console coverage report in a week or two —
   confirm the `www` homepage's snippet actually updated to the new
   French title, and that the `/en/*` tree is getting indexed alongside
   the `fr` root tree.
5. **Google Business Profile** (new idea from this session, not
   previously tracked) — register as a service-area business (Djibouti),
   no physical storefront needed. Strong, fast lever specifically for
   "[service] + Djibouti" style local queries — often outranks organic
   results for exactly that pattern. User to do manually
   (business.google.com); not something doable from the codebase.
6. Get 2-3 real backlinks — still zero, still the biggest lever for
   ranking (not just indexing). Concrete starting points discussed this
   session: a LinkedIn post from the Bly Analytics company page linking
   to the site; asking the two existing clients (Docto-Djib, Ejo) for a
   "Built by Bly Analytics" credit link on their own sites; a directory
   listing (e.g. Clutch.co) — exact Djibouti-specific directories
   unconfirmed, worth checking locally.
7. `/articles` via Payload CMS — not started, no schema/integration yet
   (swapped from Strapi 2026-08-29, nothing was built against it).

## Open Questions

- **i18n routing approach**: direction decided — a native Next.js
  `app/[locale]/...` dynamic segment — not next-intl (its
  message-catalog machinery is overkill for this site's inline
  `{ en, fr }` copy objects) and not physically duplicated `/fr` folders
  (duplication risk as route count grows, especially once `/articles`
  lands). One route file per page serves both locales via
  `params.locale`, reusing existing components (`lang` prop already
  supported everywhere). **URL shape decided 2026-08-29**: `/` (root,
  no prefix) serves French as the default locale; English lives under
  an explicit `/en` prefix (`/en`, `/en/services`, etc.). Root keeps
  the URL that already has whatever indexing history exists so far.
  Not yet implemented.
- **Articles / `/articles` route**: user will use **Payload CMS**
  (self-hosted, TypeScript-native) for article content, not a local
  `lib/articles.ts` data file like `lib/projects.ts`. Payload has
  built-in localization support per collection, which pairs with the
  `[locale]` routing plan above. Not started — no schema, no
  integration, no route yet.
- Is Search Console actually verified and property-level (domain vs.
  URL-prefix) set up correctly? `CLAUDE.md` notes "Search Console
  submitted" but audit couldn't confirm current coverage status from
  outside.
- Any existing backlinks/mentions the user already has (e.g. a
  Djibouti business registry, past client sites) that just need a link
  added, vs. starting from zero?

## Architecture Decisions

- Canonical host is `https://www.blyanalytics.com` (with `www`) —
  matches Vercel's actual 308 redirect target for the bare domain.
  Centralized as `SITE_URL` in `lib/seo.ts`; nothing else should
  hardcode either domain string.
- Standalone pages (`/services`, `/contact`, `/work/[slug]`) use a
  lightweight self-contained header + `?lang=`-seeded state, not the
  full homepage `Navbar` — established by `CaseStudyPage` originally,
  now the explicit convention for all non-homepage routes.
- Navbar "Services"/"Contact" links and both "Let's work" CTAs go to
  the real `/services` and `/contact` pages, not homepage anchors — user
  chose the stronger internal-linking SEO signal over preserving
  smooth-scroll-from-nav UX. `#work`/`#team` remain anchors.
- i18n routing: when implemented, use a native `app/[locale]/...`
  dynamic segment, not next-intl and not duplicated `/fr` folders (see
  Open Questions for reasoning). French is the default/primary locale
  (decided 2026-08-29). Not started.
- `/articles` content will come from Payload CMS (self-hosted,
  TypeScript-native), not a local `lib/articles.ts` data file. Swapped
  from Strapi 2026-08-29 — nothing was built against Strapi. Not
  started.

## Session Notes

- **2026-08-29** — Live re-check (`WebSearch` + `WebFetch`, not the
  local build): `site:blyanalytics.com` returns **zero** results — worse
  than the 2/15-indexed state found on 2026-07-24, and confirms none of
  session 2-4's fixes are live yet (still uncommitted). Searching "boite
  analyse de données djibouti" surfaces nothing related to Bly. Fetched
  the live homepage directly: renders English by default (hero "We
  don't ship features. We ship outcomes."), confirming the `lang="en"`
  default state and hardcoded `<html lang="en">` are exactly why no
  French text exists for Google to match against a French query.
  Decided in this session: French becomes the primary/default language,
  and Payload CMS replaces Strapi for the still-unstarted `/articles`
  work. Neither is implemented yet — docs updated, code untouched.
- Audit source: live fetch of `https://blyanalytics.com`,
  `/robots.txt`, `/sitemap.xml`, plus local `app/layout.tsx` and
  `app/sitemap.ts`. Full findings summarized above under "Completed."
- Local git status at time of audit shows uncommitted changes in
  `app/layout.tsx`, `app/sitemap.ts`, `app/work/[slug]/page.tsx` — check
  these against the deployed site before assuming parity; the deployed
  sitemap already differs from the local `sitemap.ts` (has `/contact`,
  local doesn't).
