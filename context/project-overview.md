# Bly Analytics

## Overview

Bly is a studio landing site for a 4-person digital consultancy based in
Djibouti. It sells digital services — web platforms, analytics dashboards,
government digitisation, healthcare tech, data pipelines, document
automation — to East African businesses and government clients. The site
is bilingual (EN/FR) and is the primary channel through which prospective
clients discover and vet the studio.

## Goals

1. Convert visiting prospects into contact-form leads by clearly
   communicating capability (case studies) and credibility (team,
   philosophy).
2. Be findable — rank and get indexed for branded search ("Bly Analytics")
   and relevant service + region terms, **in French first** ("boite
   analyse de données Djibouti", "digitisation gouvernementale
   Djibouti") as well as English ("government digitisation Djibouti",
   "web platform East Africa"). Target: SEO/visibility score of ~90/100
   (technical + indexing + authority combined).
3. Serve both English and French audiences without degrading either
   language's discoverability or UX.

## Core User Flow

1. Visitor lands on `/` (direct link, search, or social share).
2. Scrolls through services → work (case studies) → team → contact.
3. Optionally opens a case study at `/work/[slug]` for proof of past
   delivery.
4. Submits the contact form (`actions/contact.ts`) → receives auto-reply,
   studio receives notification via Resend.

## Features

### Marketing site

- Single-page landing (`app/page.tsx`) with services, work, team, and
  contact sections
- Expandable project cards linking to full case studies
- Standalone `/services` and `/contact` pages (added for SEO surface
  area — see `progress-tracker.md`), each with expanded content distinct
  from the homepage teasers to avoid duplicate-content dilution
- EN/FR language toggle (client-side state, not routed — see
  `architecture.md`'s i18n Model for the known gap and planned fix).
  **French is the primary/default language** (decided 2026-08-29 —
  target audience is Francophone East Africa); English is secondary.
- Light/dark theme toggle, no-flash on load

### Planned: `/articles`

- Not started. Will use **Payload CMS** (self-hosted, TypeScript-native)
  for content, not a local data file — decided but not yet scaffolded.
  Supersedes the earlier Strapi decision (nothing was built against it).
  See `progress-tracker.md` open questions.

### Case studies

- `/work/[slug]` — dynamic route driven entirely by `lib/projects.ts`
- Each project: challenge, approach, key decisions (with rationale),
  outcome, stack

### Lead capture

- Contact form with Zod-validated server action
- Dual email flow via Resend: internal notification + sender auto-reply

## Scope

### In Scope

- Marketing/landing site content and structure
- SEO: technical on-page SEO, indexing, i18n discoverability, content
  depth, backlinks/authority
- Contact form lead capture

### Out of Scope

- Authentication / user accounts (none — marketing site only)
- Any application logic beyond the sites listed as case studies
  (those are separate deployed products, only referenced here)
- Paid ads / SEM (organic SEO only, for now)

## Success Criteria

1. Site is indexed by Google (`site:blyanalytics.com` returns results).
2. Ranks for branded query ("Bly Analytics") on page 1.
3. Both EN and FR content are independently crawlable and indexed.
4. Lighthouse/technical SEO score and overall visibility score reach
   ~90/100.
5. Contact form conversions increase as a downstream result of organic
   traffic.
