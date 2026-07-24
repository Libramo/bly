# UI Context

## Theme

Light and dark, driven by a `data-theme` attribute on `<html>`
(`"light" | "dark"`). A no-flash inline script in `app/layout.tsx` reads
`localStorage` before first paint to avoid a theme flash.
`ThemeProvider` (`components/theme-provider.tsx`) syncs React state with
the DOM attribute; `ThemeToggle` is a pill with a sliding thumb and
crescent/sun icon swap. Visual language is warm/neutral (off-white paper
in light mode, near-black in dark mode) with a single blue accent —
editorial rather than "dark technical workspace."

## Colors

CSS custom properties defined in `app/globals.css` under `:root` (light)
and `[data-theme="dark"]`. All components consume these via `var(--*)`
— no hardcoded hex values.

| Role                | CSS Variable          | Light       | Dark                     |
| ------------------- | ---------------------- | ----------- | ------------------------ |
| Page background     | `--bg`                 | `#f9f8f6`   | `#0b0b0b`                |
| Primary text         | `--fg`                 | `#1a1a1a`   | `#ddd8ce`                |
| Muted text           | `--muted`               | `#666`      | `#777`                   |
| Muted text (dimmer)  | `--muted-2`             | `#999`      | `#444`                   |
| Border               | `--border`              | `#e4e2dc`   | `#1e1e1e`                |
| Surface              | `--surface`             | `#ffffff`   | `#111111`                |
| Surface hover        | `--surface-hover`       | `#f2f0eb`   | `#161616`                |
| Accent               | `--accent`              | `#4059e5`   | `#4f72ff`                |
| Accent (subtle bg)   | `--accent-subtle`       | `#e8ecff`   | `#131825`                |
| Nav bg (scrolled)    | `--nav-bg-scrolled`     | `rgba(249,248,246,.92)` | `rgba(11,11,11,.92)` |
| Toggle track         | `--toggle-track`        | `#e4e2dc`   | `#222`                   |
| Toggle active        | `--toggle-active`       | `#1a1a1a`   | `#ddd8ce`                |
| Toggle thumb         | `--toggle-thumb`        | `#ffffff`   | `#0b0b0b`                |
| Toggle icon          | `--toggle-icon`         | `#1a1a1a`   | `#ddd8ce`                |

## Typography

| Role     | Font                | Variable       |
| -------- | -------------------- | -------------- |
| Body     | DM Sans               | `--font-sans`  |
| Headings | DM Serif Display      | `--font-serif` |

Loaded via `next/font/google` in `app/layout.tsx`.

## Border Radius

Sharp, minimal — not a rounded design language.

| Context               | Class                        |
| ---------------------- | ----------------------------- |
| Small inline elements  | `rounded-[1px]`               |
| Chips / small controls | `rounded-sm`, `rounded-[3px]` |
| Square-edged elements  | `rounded-none`                |

## Component Library

Mostly hand-rolled. shadcn/ui is configured (`components.json`, style
`radix-nova`, base color `neutral`, icon library `lucide`) but only one
generated primitive exists so far: `components/ui/button.tsx`. Prefer
the shadcn CLI (`npx shadcn add ...`) over hand-writing new `ui/`
primitives if one is needed, but continue hand-rolling section-level
components as the project has been doing.

## Layout Patterns

- **Navbar**: fixed, transparent → gains blur + `--nav-bg-scrolled`
  background and border on scroll. Active link tracked via `useState`
  with an animated underline (`layoutId="nav-underline"`). Mobile:
  hamburger → slide-down drawer with staggered link animation.
- **Work cards**: expandable, only one open at a time; collapsed shows
  tag + title + one-liner, expanded shows stat + description + stack
  pills + case-study link.
- **Service cards**: 1px grid gap on a `var(--border)` background,
  creating hairline dividers between cells.
- **Section entrances**: `FadeUp` scroll-triggered animation used across
  all major sections.
- **Interactive elements**: `MagLink` / `MagneticButton` use
  `useMotionValue` + `useSpring` for a cursor-pull effect on links/buttons.

## Icons

`lucide` is the configured icon library (`components.json`), though
usage is currently light — most of the site favors hand-rolled inline
SVGs (theme toggle sun/crescent, etc.) over an icon package. Prefer
`lucide-react` for any new icon needs going forward for consistency.
