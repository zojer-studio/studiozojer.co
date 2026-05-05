# Landing Page Redesign — Design Spec

**Date:** 2026-05-04
**Status:** Approved — ready for implementation planning

---

## Context

studiozojer.co is the studio/product landing page for Kairōs, an iOS astrology app in beta. The current page is minimal: title, screenshot carousel, newsletter form, footer links. It needs to do more:

1. **Investor context** — Zojer Studio is beginning investor conversations; the site needs to explain what's being built and why.
2. **Conference/ad traffic** — An astrology conference + early paid ads will send visitors who need to understand the product quickly and reach a survey CTA.

---

## Visual Direction

**Warm parchment extended** — stay within the existing design system (cream `#F2E9D9` base, dark olive text `#3D403B`, warm borders, electric blue accent `#173DFF`). No dark-first hero.

**Hero background: social graph animation.** Floating nodes (representing charts/people) drift slowly. Every ~3s, two nodes that share a placement light up with a blue constellation line drawing between them, and a small placement label appears (e.g. `☽ Libra`, `♄ 11° ♐`). The background is the product — it demonstrates the core value prop (shared placements = social connections) without a word of copy.

The constellation/graph motif is intentional: it echoes Zojer Studio's graph architecture ethos (nodes and edges) and the social graph concept at the core of the app.

---

## Navigation

Sticky top nav, frosted/parchment background:

```
Kairōs          Hub  Studio          TestFlight →
```

- **Kairōs** — logo/wordmark, links to `#top`
- **Hub** — anchor link to the Hub section (later: `href="/hub"` when the hub becomes a full page)
- **Studio** — anchor link to the Studio section
- **TestFlight →** — primary CTA button, links to the TestFlight invite

Footer retains: Terms · Privacy · Support · Changelog.

---

## Page Sections

### 1 — Hero

Full-viewport-height section. Social graph canvas animation as background. Centered content overlay:

- Eyebrow: `ZOJER STUDIO` (monospace, small caps)
- Headline: **Kairōs** (large display font, ~64–80px)
- Tagline: *Find the people who share your sky*
- CTA: **Join the beta →** (primary button → TestFlight)

The graph animation uses the warm parchment palette. Nodes are small dark circles; connections fire in accent blue with a draw-in animation. A subtle note at the bottom of the hero (`nodes = charts · lines = shared placements`) can appear on hover or as a persistent whisper label — TBD.

### 2 — Feature Carousel

Existing carousel component, enhanced:

- Section eyebrow: `THE APP`
- Section headline: **Astrology built for depth** (or similar — copywriting TBD)
- Screenshot carousel (existing, now fixed to preload both theme variants)
- Feature pills below the carousel — quick scannable callouts:
  - Shared placements
  - Current transits
  - Aspect stepping
  - Display profiles
  - (one more TBD — reorder charts?)

### 3 — Studio

Two-column layout. Slightly darker background tint (`#EEE9DE`) to visually separate from the carousel section.

- **Left:** section eyebrow `ZOJER STUDIO` + headline **Built on graph architecture** + 2–3 sentences of mission copy (TBD — to be written collaboratively)
- **Right:** small decorative graph diagram (static SVG, faint opacity) — 6-node graph with edges, echoing the hero animation at rest

**Open:** studio copy to be written. Placeholder: *"We're building graph-native software for astrology — tools that treat relationships between charts as first-class citizens..."*

Optional: a single founder line below the copy. ("Built by David Schultz in Seattle." — David's call.)

### 4 — Hub

Section id `#hub`.

- Section eyebrow: `COMMUNITY`
- Section headline: **kairos.solar**
- Card (full-width, card background):
  - **Title:** Shape what we build next
  - **Body:** "We're listening. Take a 3-minute survey and help us understand what matters to you most about astrology apps."
  - **CTA button:** Take the survey → (links to external survey URL — TBD)
- Below card: `More from the hub coming soon.` (monospace, muted)

**Future path:** this section becomes `href="/hub"` in the nav and gains its own page when there's more to show (live hub feed, member count, recent activity from kairos.solar).

### 5 — Footer

Existing footer, minimal change:

```
Zojer Studio          Terms · Privacy · Support · Changelog
```

---

## Open Items

| # | Item | Owner |
|---|------|-------|
| 1 | Studio mission copy (2–3 sentences) | David + tycho |
| 2 | Survey URL | David |
| 3 | Feature carousel headline copy | David + tycho |
| 4 | TestFlight invite URL (confirm current) | David |
| 5 | Founder line in Studio section — include or not | David |
| 6 | Hero note label ("nodes = charts...") — hover-only or persistent | David |

---

## Out of Scope (this pass)

- `/hub` full page — flagged as a future path; not in this plan
- Blog section
- Any server-side data fetching from kairos.solar API
- Dark mode audit of new sections (inherit from existing system, verify manually)
