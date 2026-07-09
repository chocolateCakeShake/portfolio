# Portfolio Rebuild — Design Spec

**Date:** 2026-07-09
**Subject:** M Abdullah — personal portfolio at `chocolatecakeshake.pro`
**Goal:** Rebuild the portfolio in Astro. Reposition from "Lead Frontend Engineer" to
**Lead Software Engineer** — drop the stack-limiting "Frontend", keep the leadership. A
generalist who ships across stacks, is dropped into hard problems, and leads a team while
doing it. Lead with *capability and problems solved*; technologies are evidence, not identity.

## Positioning

- Headline identity: **Lead Software Engineer** — leadership kept, stack ("Frontend") dropped.
- Primary focus: capability + problems solved (30s → 3s load, jQuery → Next in two weeks,
  MVP → production in two months, crypto wallet shipped to Play Store, drag-and-drop
  scheduling with conflict detection).
- Tech appears as supporting evidence across a deliberately broad range: Angular, React,
  Next.js, Ionic (mobile), Electron (desktop), C#/Python microservices, Node/Express,
  Supabase/Postgres, Ethereum & Tron on-chain integration (dApps/wallets, not authoring
  the contracts), Linux/sysadmin, AI engineering
  (Anthropic SDK, Claude Code, MCP).
- **No CV download link.** The site is the deeper source; it should hold more than the CV does.

## Stack & architecture

- **Astro** — static output, islands, near-zero JS by default (fits a perf-conscious engineer).
- Self-hosted fonts via `@fontsource` (no external font CDN) — fast, offline-safe, private.
- **Multi-page / app-like** routing:
  | Route | Purpose |
  |---|---|
  | `/` | Hero (the reframe) + capability framing + teaser into Work |
  | `/work` | Overlap Map timeline, experience as problem→action→outcome, selected projects |
  | `/about` | Generalist narrative, education, how he works (standards, Claude Code) |
  | `/contact` | GitHub, LinkedIn, phone, email |
- Shared page shell: thin Carbon-style "UI shell" top nav (mono wordmark) + footer.
- Design tokens in a single CSS layer. Light + dark mode, full support.

## Design language: "Warm Carbon" + "Aqua Foil"

Container is Carbon/Cloudscape: strict grid, hairline dividers, 2px radii, engineered
restraint, functional color. Personalized on two axes:

1. **Warm neutrals** — the entire gray ramp is warmed toward *paper and espresso* instead of
   IBM's cold blue-grays. Reads as "not IBM" and nods to the `chocolateCakeShake` identity.
2. **Aqua Foil accent** — one cool electric aqua signal piercing the warm base. The single
   bold color; everything else stays quiet.

### Color tokens

**Light**
- `--bg`        `#F3F1EC`  warm paper (page base)
- `--surface`   `#FAF8F3`  raised cards/panels
- `--border`    `#E2DED5`  hairline dividers
- `--ink`       `#1E1B19`  primary text
- `--muted`     `#6F6A62`  secondary text / captions
- `--accent`    `#12B5A6`  aqua fill (markers, bars, active)
- `--accent-ix` `#0C8C80`  aqua for interactive text/links (AA on paper)

**Dark**
- `--bg`        `#171614`  warm espresso (page base)
- `--surface`   `#201E1B`  raised cards/panels
- `--border`    `#322F2A`  hairline dividers
- `--ink`       `#F1EEE8`  primary text
- `--muted`     `#A39C92`  secondary text / captions
- `--accent`    `#2CD4C2`  aqua fill (brighter for dark)
- `--accent-ix` `#34D6C4`  aqua interactive text/links

Accent is used *sparingly* — as a status/signal light, not a paint bucket.

### Typography (IBM Plex superfamily)

- **Display / headings:** IBM Plex Sans Condensed, 600 — engineered, editorial, confident large.
- **Body:** IBM Plex Sans, 400/500 — the requested Helvetica↔mono balance.
- **Data / labels / eyebrows:** IBM Plex Mono — uppercase, tracked, small; for metadata,
  numbers, dates, section labels.

Type scale (fluid): display `clamp(2.75rem, 6vw, 5rem)`; h2 `clamp(1.75rem, 3vw, 2.5rem)`;
body `1rem` at `1.6` line-height; mono labels `0.75rem` uppercase, `0.08em` tracking.

### Spacing & shape

- 4px base spacing scale (4/8/12/16/24/32/48/64/96).
- Radii: 2px (Carbon restraint). Borders/hairlines over shadows.
- Layout: left-aligned, generous whitespace, grid-aligned columns.

## Signature element: the Overlap Map

The career timeline reimagined as a trace/gantt in an observability console — showing
*concurrent* roles (Hardstone alongside CarSpirit; CarSpirit alongside Avento), which a
linear CV hides. Honest twice over: it surfaces real overlap, and Abdullah literally shipped
a Gantt scheduler at SOCO, so the signature referencing that is true, not decorative.
Lives on `/work`. (Carries over data from the existing React `GanttChart`; the Cobalt-Tec
2019 internship in that component is not on the resume — confirm with user before including.)

## Copy principles

Active voice, plain verbs, sentence case. Lead with the problem and the outcome; name the
tech as the means. No filler, no self-congratulation baked into labels.

## Contact details (confirmed)

- Email: `abdullah6566@gmail.com`
- GitHub: `github.com/chocolateCakeShake`
- LinkedIn: `linkedin.com/in/abdullah6566`
- Phone: `+92 301 5219996`

## Iteration plan (user wants small, controlled steps)

**Iteration 1 — scaffold + hero only (this pass):**
1. Scaffold a fresh Astro project. Preserve (do not delete) the existing React `src/` and
   `dist/` until the user confirms — set aside, nothing lost.
2. Design-token CSS layer: Plex fonts wired (`@fontsource`), warm-carbon color ramp,
   spacing/type scales, light/dark.
3. Shared page shell: thin UI-shell top nav (mono wordmark + routes) + footer.
4. **Hero section only** — thesis headline, mono sub-label, capability framing. Nothing else.

User reviews the look before any further page is built.

**Later iterations (one at a time, each approved before the next):**
`/work` (Overlap Map + experience + projects) → `/about` → `/contact` → polish
(motion, focus states, reduced-motion, responsive QA) → `CLAUDE.md`.

## Quality floor (every iteration)

Responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected,
`prefers-color-scheme` honored with a manual toggle.
