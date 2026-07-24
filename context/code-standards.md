# Code Standards

## General

- Keep modules small and single-purpose — one component, one concern.
- Fix root causes, do not layer workarounds (e.g. don't patch a metadata
  bug with a redirect hack — fix the metadata).
- Don't add abstractions, error handling, or config for scenarios that
  can't happen on a static marketing site.

## TypeScript

- Strict mode throughout.
- Avoid `any` — use the explicit types already defined in `lib/projects.ts`
  (`Project`, bilingual `{ en, fr }` shape) rather than inventing new
  shapes per component.
- Validate external input (contact form) at the boundary with Zod before
  it reaches the Resend call.

## Next.js (App Router)

- Default to server components. Add `"use client"` only where browser
  interactivity requires it.
- `page.tsx` is an established exception — it's a single `"use client"`
  file because it owns the `lang` toggle state used across every
  section. Don't split it purely for the server/client convention; only
  split it if a section grows unwieldy on its own terms.
- `[slug]` routes use async `params` (Next.js 15 requirement) — always
  `await params` before use.
- Any new route should export its own `Metadata` (or `generateMetadata`)
  — do not rely solely on the root layout's defaults for pages that have
  distinct content (this is a current SEO gap on `/work/[slug]`, see
  `progress-tracker.md`).

## Styling

- Tailwind utility classes in JSX — this is the current convention
  (components were migrated off inline styles). Inline `style` props are
  reserved for truly dynamic JS-computed values only (e.g. motion
  transforms).
- Theme colors always via CSS var tokens (`bg-[var(--surface)]`, etc.),
  never hardcoded hex — tokens are defined in `app/globals.css` under
  `:root` and `[data-theme="dark"]`.
- Border radius is intentionally sharp/minimal across the site
  (`rounded-[1px]`, `rounded-sm`, `rounded-none` are the common values)
  — don't introduce large radii without checking `ui-context.md`.

## Server Actions

- Validate and parse request input (Zod) before any Resend call runs.
- Return consistent, predictable state shapes for `useActionState`
  (progressive enhancement must keep working without JS).

## Data

- Case study / project content belongs in `lib/projects.ts` — never
  hardcode a project's copy inside a component.
- Per-component bilingual copy stays in that component's own
  `const C = { en, fr }` object — don't centralize UI strings into a
  single giant dictionary file.

## File Organization

- `app/` — routes, layout, metadata, global CSS, `robots.ts`, `sitemap.ts`
- `components/` — hand-rolled UI; `components/ui/` reserved for
  shadcn-generated primitives (currently just `button.tsx`)
- `actions/` — server actions only, no UI
- `lib/` — data + utilities (`projects.ts`, `utils.ts`)
