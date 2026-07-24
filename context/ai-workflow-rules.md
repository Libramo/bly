# AI Workflow Rules

## Approach

Build against the context files, not from memory. `project-overview.md`
defines what Bly is and the current SEO/visibility target;
`architecture.md` and `code-standards.md` define how to build it;
`ui-context.md` defines the visual system; `progress-tracker.md` is the
live log of what's been done and what's next — update it after every
meaningful change instead of relying on git history or conversation
memory to reconstruct state.

## Scoping Rules

- Work on one feature/fix unit at a time (one SEO fix, one component
  refactor, one content addition — not several bundled together).
- **One component per conversation when refactoring** — keeps context
  lean (explicit project convention from `CLAUDE.md`).
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated system boundaries in a single step — e.g.
  don't mix an SEO metadata fix with a styling refactor.

## When to Split Work

Split an implementation step if it combines:

- Metadata/SEO changes and unrelated UI/styling changes
- Changes to more than one route's rendering behavior at once
  (e.g. adding `/fr` routing *and* rewriting case study layout)
- Behavior not clearly defined in `project-overview.md` or
  `progress-tracker.md`'s open questions

If a change cannot be verified end to end quickly (e.g. by checking
rendered `<head>` output or running a build), the scope is too broad —
split it.

## Handling Missing Requirements

- Do not invent product or content behavior not defined in the context
  files.
- If an SEO or product requirement is ambiguous (e.g. full `/fr` routes
  vs. `hreflang` only), resolve it as an open question in
  `progress-tracker.md` before implementing.
- If a requirement is missing, add it there rather than guessing.

## Protected Files

Do not modify the following unless explicitly instructed:

- `lib/projects.ts` — case study content is business-owned; adding a
  project is fine when asked, but don't restructure the `Project` shape
  without confirming.
- `components/ui/button.tsx` — shadcn-generated; regenerate via CLI
  rather than hand-editing if it needs to change.
- Env vars / Resend, deployment, and domain configuration — flag these
  as out-of-repo actions the user needs to perform, don't assume access.

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- SEO/indexing state, metadata, or i18n routing → `architecture.md`
  (SEO / i18n sections) and `progress-tracker.md`
- Code conventions or standards → `code-standards.md`
- Visual system → `ui-context.md`
- Feature scope or goals → `project-overview.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture.md` was violated.
3. `progress-tracker.md` reflects the completed work, including any new
   open questions it surfaced.
4. `npm run build` passes.
