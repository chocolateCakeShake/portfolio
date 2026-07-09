# CLAUDE.md — Abdullah's Portfolio

Astro portfolio site. Static, near-zero JS. This file is the source of truth for
positioning, design language, and conventions. Update it as the site evolves.

## Who this is for

Abdullah — **Lead Software Engineer**. A *generalist*, marketed on **capability
and problems solved**, NOT tied to a single stack or "frontend" label. Six years
shipping production software across web, mobile, desktop, and chain. Currently
leads a 4-engineer team building BMW-facing systems @ SOCO, Lahore PK (UTC+5).

### Positioning rules (do not violate)
- Frame him as a **generalist Software/Lead Engineer**, never "frontend lead" or
  stack-specific. Tech is **evidence**, not identity.
- Lead with **problems solved / outcomes**; list technologies only as support.
- **NO CV / resume download link anywhere.** The site holds *more* than the CV.
- Never sound like he's job-hunting. "Open to work" was explicitly rejected as
  desperate — he is **not** desperate. Confident positioning only.
- Accuracy: he worked **WITH** smart contracts / on-chain integrations, he did
  **not author/deploy** them. Phrase as "on-chain integrations", never "built
  smart contracts".
- Keep leadership + soft skills visible (he's the team lead), without narrowing
  him to management.

## Design language

**Warm Carbon + Aqua Foil** — IBM Carbon + AWS Cloudscape restraint (enterprise,
familiar, all-ages readable), personalized with a warm paper/espresso neutral
ramp and one cool **aqua** accent. Amazon Ember is proprietary → **Roboto** is
the chosen close cousin; **Roboto Mono** for small uppercase metadata labels only.

- Design tokens live in `src/styles/tokens.css` — **always use the tokens**, no
  magic numbers. Light default + dark via `data-theme` + `prefers-color-scheme`.
- Global reset / base / helpers in `src/styles/global.css`. Reusable classes:
  `.shell` (max-width container), `.label` (mono uppercase tracked eyebrow),
  `.mono`, `.hairline`.
- Fonts self-hosted via `@fontsource` — **no external CDN**.
- Cloudscape component vocabulary already in use (reuse these on new pages):
  - **Container/panel**: `--surface` bg, `1px --border`, `--radius-card`,
    `--shadow-sm`, with a `--surface-sunken` header strip. See `.spec` in
    `src/pages/index.astro`.
  - **KPI card**: same, plus `border-top: 2px solid --accent`. See `.receipt`.
  - **Key-value pairs**: stacked `<dl>` rows, `.label` term + `--ink` value.
  - **Buttons**: `.btn--primary` (aqua fill, `#08201d` text) + `.btn--ghost`
    (bordered, `--accent-ix` text). 8px radius, 1rem, `0.8125rem 1.5rem`.
- Text should not be needlessly small — enterprise-comfortable sizing.

## Structure

Multi-page, app-like: **Home** (`/`), **Work** (`/work`), **About** (`/about`),
**Contact** (`/contact`). Layout `src/layouts/BaseLayout.astro` (no-flash theme
script, skip link, Nav, Footer). Nav active tab = aqua highlighted **pill**
(underline was rejected — must read for a wide/all-ages audience). Wordmark is
just **"Abdullah"**, slightly larger, no title chip. Theme toggle is a
**conventional sun/moon icon button** (no over-engineering).

### Page status
- **Home** — done & signed off. Full-height hero (eyebrow "Generalist by design"
  → "I ship — whatever the stack." → lede → 2 CTAs → "At a glance" spec panel) +
  recessed "Selected outcomes" KPI band.
- **Work** — TODO. The **"Overlap Map"**: reimagined Gantt career timeline that
  shows *overlapping* roles (there's real overlap between jobs). Reuse home's
  card/panel tokens. ⚠️ Confirm with user before including the **Cobalt-Tec 2019
  internship** — it's NOT on his resume.
- **About** — TODO. Generalist narrative, education, how he works.
- **Contact** — TODO. GitHub, LinkedIn, phone +92 301 5219996,
  abdullah6566@gmail.com. (Current file has a placeholder email link.)

## Workflow (important)

- **Small iterations.** User wants control over the look — do one focused change,
  show it, get sign-off. Do NOT burn tokens on a big batch he might reject.
- Verify visually: `npm run build`, dev server at `localhost:4321`, headless
  Chrome screenshots. Note: headless Chrome defaults to **dark** — force light
  temporarily if needed, then revert any such hack.
- **Do NOT commit to git** until the user explicitly authorizes it. Currently
  parked.

## Commands
- `npm run dev` — dev server (localhost:4321)
- `npm run build` — static build to `dist/`
- `npm run preview` — preview built site

## Reference
- Design spec: `docs/superpowers/specs/2026-07-09-portfolio-astro-rebuild-design.md`
