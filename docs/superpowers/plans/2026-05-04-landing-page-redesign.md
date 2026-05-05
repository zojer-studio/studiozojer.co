# Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the minimal landing page with a full-section redesign: animated social graph hero, enhanced feature carousel, studio/mission section, and kairos.solar hub section — all within the existing warm parchment design system.

**Architecture:** Six new or updated components assembled in `app/page.tsx`. A sticky `Nav` is added to `app/layout.tsx` so it appears site-wide. The social graph animation lives in `SocialGraphCanvas` (canvas + requestAnimationFrame, theme-aware), composed into `HeroSection`. All other sections are server components.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `next-themes` (already installed), `next/font` (already configured in layout.tsx).

**Note on testing:** This codebase has no unit test framework. Verification steps use `npx tsc --noEmit` for type safety and `npm run build` for build correctness, plus dev server visual checks.

---

## File Map

| Status | File | Purpose |
|--------|------|---------|
| Add | `src/components/social-graph-canvas.tsx` | Canvas animation: floating nodes, shared-placement connections |
| Add | `src/components/hero-section.tsx` | Full-viewport hero: canvas bg + centered content |
| Add | `src/components/nav.tsx` | Sticky nav: logo, Hub/Studio anchors, TestFlight CTA |
| Add | `src/components/studio-section.tsx` | Two-column studio/mission section |
| Add | `src/components/hub-section.tsx` | Hub section: survey card + future placeholder |
| Modify | `app/layout.tsx` | Add `<Nav />` above `{children}` inside ThemeProvider |
| Modify | `app/page.tsx` | Replace content with new section components |
| Modify | `.gitignore` | Add `.superpowers/` |

---

## Task 1: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add after the `# misc` block:

```
# brainstorming session files
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorm sessions"
```

---

## Task 2: SocialGraphCanvas component

**Files:**
- Create: `src/components/social-graph-canvas.tsx`

This component renders a full-parent-size `<canvas>` with an animated social graph. Nodes drift slowly; every ~3.5s, two nodes sharing a placement light up with a blue connection line drawing in. A small toast label appears showing the shared placement. Theme-aware: node colors adapt to light/dark.

- [ ] **Step 1: Create `src/components/social-graph-canvas.tsx`**

```tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const PLACEMENTS = [
  "☽ Libra", "☉ Scorpio", "♄ 11° ♐", "♀ Taurus",
  "↑ Aquarius", "♂ Aries", "☿ Virgo", "♃ Pisces",
  "☽ Gemini", "♀ Capricorn", "☉ Leo", "♄ Cancer",
  "♂ 23° ♏", "☿ Libra", "↑ Cancer", "♃ Sagittarius",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  placements: string[];
  hl: number;
}

interface Connection {
  a: number;
  b: number;
  placement: string;
  progress: number;
  alpha: number;
  phase: "in" | "hold" | "out";
  hold: number;
}

export function SocialGraphCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const toastRef = React.useRef<HTMLDivElement>(null);
  const themeRef = React.useRef<string>("light");
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    themeRef.current = resolvedTheme ?? "light";
  }, [resolvedTheme]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const toast = toastRef.current;
    if (!canvas || !toast) return;
    const ctx = canvas.getContext("2d")!;

    const state = {
      nodes: [] as Node[],
      connections: [] as Connection[],
      lastTrigger: 0,
      raf: 0,
      toastTimer: null as ReturnType<typeof setTimeout> | null,
    };

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function makeNode(): Node {
      return {
        x: 30 + Math.random() * (canvas.width - 60),
        y: 30 + Math.random() * (canvas.height - 60),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 3 + Math.random() * 3,
        placements: shuffle(PLACEMENTS).slice(0, 2 + Math.floor(Math.random() * 2)),
        hl: 0,
      };
    }

    function showToast(text: string, x: number, y: number) {
      toast.textContent = text;
      toast.style.left = `${Math.min(Math.max(x - 60, 8), canvas.width - 130)}px`;
      toast.style.top = `${Math.max(y - 38, 8)}px`;
      toast.style.opacity = "1";
      if (state.toastTimer) clearTimeout(state.toastTimer);
      state.toastTimer = setTimeout(() => {
        toast.style.opacity = "0";
      }, 1800);
    }

    function triggerConnection() {
      if (state.connections.length > 2) return;
      for (let t = 0; t < 30; t++) {
        const i = Math.floor(Math.random() * state.nodes.length);
        const j = Math.floor(Math.random() * state.nodes.length);
        if (i === j) continue;
        const shared = state.nodes[i].placements.find(
          (p) => state.nodes[j].placements.includes(p)
        );
        if (!shared) continue;
        if (
          state.connections.find(
            (c) => (c.a === i && c.b === j) || (c.a === j && c.b === i)
          )
        ) continue;
        state.connections.push({
          a: i, b: j, placement: shared,
          progress: 0, alpha: 0, phase: "in", hold: 0,
        });
        showToast(
          shared,
          (state.nodes[i].x + state.nodes[j].x) / 2,
          (state.nodes[i].y + state.nodes[j].y) / 2
        );
        return;
      }
    }

    function draw(ts: number) {
      state.raf = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      const isDark = themeRef.current === "dark";
      const nodeRgb = isDark ? "254,255,255" : "61,64,59";
      const accentRgb = isDark ? "50,129,255" : "23,61,255";

      ctx.clearRect(0, 0, W, H);

      if (ts - state.lastTrigger > 3500) {
        triggerConnection();
        state.lastTrigger = ts;
      }

      // update nodes
      state.nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > W - 20) {
          n.vx *= -1;
          n.x = Math.max(20, Math.min(W - 20, n.x));
        }
        if (n.y < 20 || n.y > H - 20) {
          n.vy *= -1;
          n.y = Math.max(20, Math.min(H - 20, n.y));
        }
        if (n.hl > 0) n.hl = Math.max(0, n.hl - 0.008);
      });

      // proximity edges
      for (let i = 0; i < state.nodes.length; i++) {
        for (let j = i + 1; j < state.nodes.length; j++) {
          const dx = state.nodes[i].x - state.nodes[j].x;
          const dy = state.nodes[i].y - state.nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(state.nodes[i].x, state.nodes[i].y);
            ctx.lineTo(state.nodes[j].x, state.nodes[j].y);
            ctx.strokeStyle = `rgba(${nodeRgb},${(1 - dist / 90) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // active connections
      state.connections = state.connections.filter((conn) => {
        const a = state.nodes[conn.a];
        const b = state.nodes[conn.b];

        if (conn.phase === "in") {
          conn.progress = Math.min(1, conn.progress + 0.018);
          conn.alpha = conn.progress;
          if (conn.progress >= 1) conn.phase = "hold";
        } else if (conn.phase === "hold") {
          conn.hold++;
          if (conn.hold > 80) conn.phase = "out";
        } else {
          conn.alpha = Math.max(0, conn.alpha - 0.018);
          if (conn.alpha <= 0) return false;
        }

        a.hl = Math.max(a.hl, conn.alpha);
        b.hl = Math.max(b.hl, conn.alpha);

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const t = conn.phase === "in" ? conn.progress : 1;
        const ex = a.x + (dx / len) * len * t;
        const ey = a.y + (dy / len) * len * t;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(${accentRgb},${conn.alpha * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (conn.phase !== "in") {
          for (let dot = 0.2; dot < 0.85; dot += 0.2) {
            ctx.beginPath();
            ctx.arc(a.x + dx * dot, a.y + dy * dot, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accentRgb},${conn.alpha * 0.35})`;
            ctx.fill();
          }
        }

        return true;
      });

      // draw nodes
      state.nodes.forEach((n) => {
        if (n.hl > 0) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
          grad.addColorStop(0, `rgba(${accentRgb},${n.hl * 0.2})`);
          grad.addColorStop(1, `rgba(${accentRgb},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle =
          n.hl > 0.2
            ? `rgba(${accentRgb},${0.7 + n.hl * 0.3})`
            : `rgba(${nodeRgb},${0.18 + n.hl * 0.4})`;
        ctx.fill();
      });
    }

    const observer = new ResizeObserver(() => {
      resize();
      state.nodes.forEach((n) => {
        n.x = Math.min(n.x, canvas.width - 20);
        n.y = Math.min(n.y, canvas.height - 20);
      });
    });

    resize();
    state.nodes = Array.from({ length: 40 }, makeNode);
    observer.observe(canvas);
    state.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.raf);
      observer.disconnect();
      if (state.toastTimer) clearTimeout(state.toastTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        ref={toastRef}
        className="absolute pointer-events-none font-mono text-xs tracking-wide px-3 py-1.5 rounded-lg border border-bd-secondary bg-bg-card text-tx-secondary shadow-sm"
        style={{ opacity: 0, transition: "opacity 0.4s", whiteSpace: "nowrap" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /path/to/studiozojer.co && npx tsc --noEmit
```

Expected: no errors in `src/components/social-graph-canvas.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/social-graph-canvas.tsx
git commit -m "feat: add SocialGraphCanvas animated background component"
```

---

## Task 3: HeroSection component

**Files:**
- Create: `src/components/hero-section.tsx`

Full-viewport section. `SocialGraphCanvas` as the absolute background, content centered on top.

- [ ] **Step 1: Create `src/components/hero-section.tsx`**

```tsx
import { SocialGraphCanvas } from "@/src/components/social-graph-canvas";

// TODO: replace with your actual TestFlight invite URL before launch
const TESTFLIGHT_URL = "https://testflight.apple.com";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg-base px-8">
      <SocialGraphCanvas />
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-tx-tertiary mb-3">
          Zojer Studio
        </p>
        <h1 className="text-8xl font-display text-tx-primary tracking-tight leading-none mb-4">
          Kairōs
        </h1>
        <p className="text-sm text-tx-secondary mb-8 max-w-xs leading-relaxed">
          Find the people who share your sky
        </p>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bg-button text-tx-button text-sm px-5 py-2.5 rounded-lg hover:bg-bg-button-hover transition-colors"
        >
          Join the beta →
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero-section.tsx
git commit -m "feat: add HeroSection with graph animation background"
```

---

## Task 4: Nav component + layout update

**Files:**
- Create: `src/components/nav.tsx`
- Modify: `app/layout.tsx`

Sticky nav with frosted parchment background. Hub and Studio are anchor links. TestFlight is an external link. The nav is a server component (no hooks required). Added to `layout.tsx` so it appears on all pages.

- [ ] **Step 1: Create `src/components/nav.tsx`**

```tsx
// TODO: replace with your actual TestFlight invite URL before launch
const TESTFLIGHT_URL = "https://testflight.apple.com";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-bd-secondary bg-bg-base/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-8 h-14 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-lg text-tx-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          Kairōs
        </a>
        <div className="flex items-center gap-6 text-sm text-tx-secondary">
          <a href="/#hub" className="hover:text-tx-primary transition-colors">
            Hub
          </a>
          <a href="/#studio" className="hover:text-tx-primary transition-colors">
            Studio
          </a>
        </div>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bg-button text-tx-button text-sm px-4 py-1.5 rounded-lg hover:bg-bg-button-hover transition-colors"
        >
          TestFlight →
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Add `<Nav />` to `app/layout.tsx`**

In `app/layout.tsx`, add the import and render `<Nav />` inside `<ThemeProvider>`, above `{children}`:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import { FaviconSwitcher } from "@/src/components/favicon-switcher";
import { ThemeDebug } from "@/src/components/theme-debug";
import { Nav } from "@/src/components/nav";

// ... (all existing font declarations unchanged) ...

export const metadata: Metadata = { /* unchanged */ };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${whyte.variable} ${whyteInktrap.variable} ${fraktion.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <FaviconSwitcher />
          {/* <ThemeDebug /> */}
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Only two changes from the existing file: add `import { Nav }` at the top, and add `<Nav />` before `{children}`.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Smoke-check in dev**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify the nav appears at top, is sticky, and the TestFlight and anchor links render correctly.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav.tsx app/layout.tsx
git commit -m "feat: add sticky Nav to layout"
```

---

## Task 5: StudioSection component

**Files:**
- Create: `src/components/studio-section.tsx`

Two-column section on a slightly darker tint. Left: eyebrow, headline, placeholder copy. Right: decorative SVG graph. Has `id="studio"` for nav anchor.

- [ ] **Step 1: Create `src/components/studio-section.tsx`**

```tsx
export function StudioSection() {
  return (
    <section
      id="studio"
      className="bg-bg-dark border-t border-bd-secondary px-8 py-20"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-2">
            Zojer Studio
          </p>
          <h2 className="text-3xl font-display text-tx-primary tracking-tight mb-5">
            Built on graph architecture
          </h2>
          {/* TODO: replace placeholder copy with final studio mission statement */}
          <p className="text-sm text-tx-secondary leading-relaxed mb-4">
            We're building graph-native software for astrology — tools that
            treat relationships between charts, people, and placements as
            first-class citizens. Nodes and edges, all the way down.
          </p>
          <p className="text-sm text-tx-tertiary leading-relaxed">
            Kairōs is our first product: an iOS astrology app that makes it
            easy to connect with the people who share your sky.
          </p>
        </div>

        {/* Decorative graph SVG */}
        <div className="flex items-center justify-center opacity-[0.15]">
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-tx-primary"
          >
            <circle cx="80" cy="80" r="78" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="80" r="56" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="80"  cy="4"   r="5" fill="currentColor" />
            <circle cx="148" cy="40"  r="4" fill="currentColor" />
            <circle cx="148" cy="120" r="5" fill="currentColor" />
            <circle cx="80"  cy="156" r="4" fill="currentColor" />
            <circle cx="12"  cy="120" r="5" fill="currentColor" />
            <circle cx="12"  cy="40"  r="4" fill="currentColor" />
            <line x1="80"  y1="4"   x2="148" y2="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="148" y1="120" x2="12"  y2="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="12"  y1="120" x2="80"  y2="4"   stroke="currentColor" strokeWidth="0.5" />
            <line x1="148" y1="40"  x2="12"  y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="80"  y1="156" x2="148" y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="80"  y1="156" x2="12"  y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/studio-section.tsx
git commit -m "feat: add StudioSection component with placeholder copy"
```

---

## Task 6: HubSection component

**Files:**
- Create: `src/components/hub-section.tsx`

Community section with survey card. Has `id="hub"` for nav anchor. Survey URL is a named constant to make it easy to update.

- [ ] **Step 1: Create `src/components/hub-section.tsx`**

```tsx
// TODO: replace with the actual survey URL
const SURVEY_URL = "#";

export function HubSection() {
  return (
    <section
      id="hub"
      className="border-t border-bd-secondary px-8 py-20 bg-bg-base"
    >
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-2">
          Community
        </p>
        <h2 className="text-3xl font-display text-tx-primary tracking-tight mb-8">
          kairos.solar
        </h2>

        <a
          href={SURVEY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-6 bg-bg-card border border-bd-secondary rounded-xl p-6 hover:bg-bg-card-hover transition-colors group"
        >
          <div>
            <h3 className="text-sm font-semibold text-tx-primary mb-1">
              Shape what we build next
            </h3>
            <p className="text-sm text-tx-secondary leading-relaxed">
              We&apos;re listening. Take a 3-minute survey and help us
              understand what matters to you most about astrology apps.
            </p>
          </div>
          <span className="bg-bg-button text-tx-button text-sm px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 group-hover:bg-bg-button-hover transition-colors">
            Take the survey →
          </span>
        </a>

        <p className="font-mono text-xs text-tx-tertiary tracking-wide mt-4 opacity-60">
          More from the hub coming soon.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/hub-section.tsx
git commit -m "feat: add HubSection component with survey card"
```

---

## Task 7: Assemble page.tsx

**Files:**
- Modify: `app/page.tsx`

Replace the current minimal page content with all new sections. Drop the `NewsletterForm`. Add carousel section header and feature pills around the existing `FeatureCarousel`.

The hero pushes content below the fold; add `pt-14` to the page root to account for the fixed nav height (56px = `h-14`). The hero itself is full-viewport, so it doesn't need extra top padding — the `pt-14` only applies to subsequent sections if the hero is removed, but since the hero is `min-h-screen` it naturally clears the nav.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { HeroSection } from "@/src/components/hero-section";
import { FeatureCarousel } from "@/src/components/feature-carousel";
import { StudioSection } from "@/src/components/studio-section";
import { HubSection } from "@/src/components/hub-section";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Feature carousel */}
      <section className="border-t border-bd-secondary px-8 py-20 bg-bg-base">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-2 text-center">
            The app
          </p>
          <h2 className="text-3xl font-display text-tx-primary tracking-tight mb-8 text-center">
            Astrology built for depth
          </h2>
          <FeatureCarousel />
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              "Shared placements",
              "Current transits",
              "Aspect stepping",
              "Display profiles",
              "Chart reordering",
            ].map((label) => (
              <span
                key={label}
                className="bg-bg-primary border border-bd-secondary rounded-full px-3 py-1 text-xs text-tx-secondary"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Studio */}
      <StudioSection />

      {/* 4. Hub */}
      <HubSection />

      {/* Footer */}
      <footer className="border-t border-bd-secondary px-8 py-6 bg-bg-dark">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-xs text-tx-tertiary font-mono">
            Zojer Studio
          </span>
          <div className="flex gap-4 text-xs text-tx-tertiary">
            <a href="/terms" className="hover:text-tx-primary transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-tx-primary transition-colors">
              Privacy
            </a>
            <a href="/support" className="hover:text-tx-primary transition-colors">
              Support
            </a>
            <a href="/changelog" className="hover:text-tx-primary transition-colors">
              Changelog
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Visual check in dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify in order:
- Nav is sticky, shows Hub / Studio / TestFlight →
- Hero: graph animation runs, "Kairōs" headline, "Find the people who share your sky", "Join the beta →" button
- Scroll to carousel section: eyebrow, headline, carousel works, feature pills below
- Scroll to Studio section: two-column layout, placeholder copy, decorative SVG
- Scroll to Hub section: survey card renders, "Take the survey →" button
- Footer: Terms · Privacy · Support · Changelog

Toggle dark mode. Verify all sections look correct. Verify graph nodes shift from dark to light color after theme switches.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page with hero, carousel, studio, and hub sections"
```

---

## Task 8: Build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no errors. Warnings about image `alt` attributes or missing env vars are acceptable; TypeScript or module resolution errors are not.

- [ ] **Step 2: Fix any build errors**

Common issues:
- Missing `"use client"` on a component that uses hooks → add it
- Unresolved import path → check the `@/` alias points to the repo root (it does per `tsconfig.json`)
- `next/image` warns about missing `alt` on preload images → already handled (empty string `alt=""` on hidden preload images is correct for decorative images)

- [ ] **Step 3: Update open items in spec**

Before the PR, fill in the two placeholder constants:

1. In `src/components/hero-section.tsx` and `src/components/nav.tsx`, replace `TESTFLIGHT_URL` with the actual TestFlight invite link.
2. In `src/components/hub-section.tsx`, replace `SURVEY_URL` with the actual survey URL.

These can also be done as a follow-up commit — just don't ship with `href="#"` on the survey card.

- [ ] **Step 4: Final commit**

```bash
git add -p  # stage any remaining changes
git commit -m "chore: build verification pass"
```

---

## Open Items (from spec)

These are not blockers for merging but should be resolved before the page goes live:

| # | Item | Where |
|---|------|--------|
| 1 | Studio mission copy | `src/components/studio-section.tsx` — replace placeholder paragraphs |
| 2 | Survey URL | `src/components/hub-section.tsx` → `SURVEY_URL` constant |
| 3 | TestFlight URL | `src/components/hero-section.tsx` and `src/components/nav.tsx` → `TESTFLIGHT_URL` constant |
| 4 | Carousel headline copy | `app/page.tsx` — "Astrology built for depth" is placeholder |
| 5 | Founder line in Studio | `src/components/studio-section.tsx` — add or remove the second paragraph |
