"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  GLYPHS,
  GLYPH_VIEWBOX,
  SIGN_GLYPHS,
} from "@/src/lib/glyphs.generated";

/**
 * The hero's ambient graph.
 *
 * Each node carries one placement — a body in a sign. Sign distance determines the
 * aspect between any two nodes deterministically, so every pair already has a
 * well-defined edge; nothing is searched for. Periodically a named figure forms among
 * the drifting nodes (grand trine, T-square, grand cross, stellium), holds, and
 * dissolves.
 *
 * This echoes the chart wheel in the device mockup above it, which draws real aspect
 * lines from real ephemeris. Background and foreground say the same thing.
 *
 * Glyphs are Unicode for now. They swap for the studio's own SVG glyphs once daoUI
 * grows a web-consumable layer — see zojercommons/projects/daoui/specs/.
 */

/** Sign index 0–11 → the studio's own glyph, in zodiacal order. */
const SIGNS = SIGN_GLYPHS;

const BODIES = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn",
] as const;

/** Sign-distance → aspect. 1 and 5 apart yield no major aspect and draw nothing. */
const ASPECTS: Record<number, { glyph: string; width: number; dash: number[] }> = {
  0: { glyph: "conjunct", width: 1.3, dash: [] },
  2: { glyph: "sextile", width: 0.7, dash: [2, 3] },
  3: { glyph: "square", width: 1.0, dash: [4, 3] },
  4: { glyph: "trine", width: 1.0, dash: [] },
  6: { glyph: "opposite", width: 1.3, dash: [6, 3] },
};

/**
 * Inline SVG markup for a glyph. Inline rather than <img src> or an external <use>:
 * currentColor only inherits within the same document, so a referenced file renders
 * black and ignores the theme.
 */
function glyphSvg(name: string, px: number): string {
  return (
    `<svg viewBox="${GLYPH_VIEWBOX}" width="${px}" height="${px}" fill="none" ` +
    `aria-hidden="true" style="display:inline-block;vertical-align:middle">` +
    `${GLYPHS[name] ?? ""}</svg>`
  );
}

/** Each figure is a set of sign offsets from an arbitrary root. */
const FIGURES = [
  { name: "grand trine", offsets: [0, 4, 8] },
  { name: "T-square", offsets: [0, 3, 6] },
  { name: "grand cross", offsets: [0, 3, 6, 9] },
  { name: "stellium", offsets: [0, 0, 0] },
];

/** Shortest distance around the twelve-sign wheel. */
function separation(a: number, b: number): number {
  const d = Math.abs(a - b) % 12;
  return Math.min(d, 12 - d);
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  body: string;
  sign: number;
  hl: number;
}

interface Edge {
  a: number;
  b: number;
  glyph: string;
  width: number;
  dash: number[];
}

interface Figure {
  members: number[];
  edges: Edge[];
  phase: "in" | "hold" | "out";
  progress: number;
  alpha: number;
  hold: number;
  nodeLabels: HTMLSpanElement[];
  edgeLabels: HTMLSpanElement[];
}

export function SocialGraphCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const labelLayerRef = React.useRef<HTMLDivElement>(null);
  const themeRef = React.useRef<string>("light");
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    themeRef.current = resolvedTheme ?? "light";
  }, [resolvedTheme]);

  React.useEffect(() => {
    if (!canvasRef.current || !labelLayerRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const labelLayer: HTMLDivElement = labelLayerRef.current;
    const ctx = canvas.getContext("2d")!;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const state = {
      nodes: [] as Node[],
      figure: null as Figure | null,
      lastTrigger: 0,
      raf: 0,
      visible: true,
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
        body: BODIES[Math.floor(Math.random() * BODIES.length)],
        sign: Math.floor(Math.random() * 12),
        hl: 0,
      };
    }

    function makeLabel(markup: string, muted: boolean): HTMLSpanElement {
      const el = document.createElement("span");
      // Trusted input: generated from the daoUI corpus at build time, never user data.
      el.innerHTML = markup;
      el.className = muted
        ? "absolute left-0 top-0 pointer-events-none inline-flex items-center gap-0.5 text-tx-tertiary"
        : "absolute left-0 top-0 pointer-events-none inline-flex items-center gap-1 text-tx-secondary";
      el.style.opacity = "0";
      el.style.willChange = "transform, opacity";
      labelLayer.appendChild(el);
      return el;
    }

    function clearFigure() {
      if (!state.figure) return;
      for (const el of state.figure.nodeLabels) el.remove();
      for (const el of state.figure.edgeLabels) el.remove();
      state.figure = null;
    }

    /** Pick a figure, then find drifting nodes holding the signs it needs. */
    function triggerFigure() {
      const spec = FIGURES[Math.floor(Math.random() * FIGURES.length)];

      for (let attempt = 0; attempt < 24; attempt++) {
        const root = Math.floor(Math.random() * 12);
        const members: number[] = [];

        for (const offset of spec.offsets) {
          const wanted = (root + offset) % 12;
          const candidates = state.nodes
            .map((n, i) => (n.sign === wanted && !members.includes(i) ? i : -1))
            .filter((i) => i >= 0);
          if (!candidates.length) break;
          members.push(candidates[Math.floor(Math.random() * candidates.length)]);
        }

        if (members.length !== spec.offsets.length) continue;

        // Every pair with a major aspect becomes an edge. Derived, not searched.
        const edges: Edge[] = [];
        for (let i = 0; i < members.length; i++) {
          for (let j = i + 1; j < members.length; j++) {
            const sep = separation(
              state.nodes[members[i]].sign,
              state.nodes[members[j]].sign
            );
            const aspect = ASPECTS[sep];
            if (!aspect) continue;
            edges.push({ a: members[i], b: members[j], ...aspect });
          }
        }
        if (!edges.length) continue;

        state.figure = {
          members,
          edges,
          phase: "in",
          progress: 0,
          alpha: 0,
          hold: 0,
          nodeLabels: members.map((i) =>
            makeLabel(
              glyphSvg(state.nodes[i].body, 15) +
                glyphSvg(SIGNS[state.nodes[i].sign], 15),
              false
            )
          ),
          edgeLabels: edges.map((e) => makeLabel(glyphSvg(e.glyph, 13), true)),
        };
        return;
      }
    }

    function draw(ts: number) {
      state.raf = requestAnimationFrame(draw);
      if (!state.visible) return;

      const W = canvas.width;
      const H = canvas.height;
      const isDark = themeRef.current === "dark";
      const nodeRgb = isDark ? "254,255,255" : "61,64,59";
      const accentRgb = isDark ? "50,129,255" : "23,61,255";

      ctx.clearRect(0, 0, W, H);

      if (!reduceMotion && ts - state.lastTrigger > 4200) {
        clearFigure();
        triggerFigure();
        state.lastTrigger = ts;
      }

      // drift
      if (!reduceMotion) {
        for (const n of state.nodes) {
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
        }
      }

      // ambient proximity web
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

      // the active figure
      const fig = state.figure;
      if (fig) {
        // Under reduced motion the figure is pinned fully drawn — a static composed
        // state. Advancing the phases here would fade it out and never retrigger,
        // leaving a blank canvas.
        if (reduceMotion) {
          fig.alpha = 1;
          fig.progress = 1;
          fig.phase = "hold";
        } else if (fig.phase === "in") {
          fig.progress = Math.min(1, fig.progress + 0.02);
          fig.alpha = fig.progress;
          if (fig.progress >= 1) fig.phase = "hold";
        } else if (fig.phase === "hold") {
          fig.hold++;
          if (fig.hold > 110) fig.phase = "out";
        } else {
          fig.alpha = Math.max(0, fig.alpha - 0.02);
        }

        for (const i of fig.members) {
          state.nodes[i].hl = Math.max(state.nodes[i].hl, fig.alpha);
        }

        // Aspect type reads as line weight and dash, not hue — a five-colour
        // rainbow behind the headline would fight the copy.
        fig.edges.forEach((e, idx) => {
          const a = state.nodes[e.a];
          const b = state.nodes[e.b];
          const t = fig.phase === "in" ? fig.progress : 1;

          ctx.save();
          ctx.setLineDash(e.dash);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
          ctx.strokeStyle = `rgba(${accentRgb},${fig.alpha * 0.5})`;
          ctx.lineWidth = e.width;
          ctx.stroke();
          ctx.restore();

          const el = fig.edgeLabels[idx];
          el.style.opacity = String(fig.alpha * 0.75);
          // Centre the 13px glyph on the midpoint. The old -6/-9 was tuned for a text
          // baseline; a square glyph wants half its size on both axes.
          el.style.transform = `translate(${(a.x + b.x) / 2 - 6.5}px, ${
            (a.y + b.y) / 2 - 6.5
          }px)`;
        });

        fig.members.forEach((i, idx) => {
          const n = state.nodes[i];
          const el = fig.nodeLabels[idx];
          el.style.opacity = String(fig.alpha);
          el.style.transform = `translate(${n.x + 10}px, ${n.y - 8}px)`;
        });

        if (fig.phase === "out" && fig.alpha <= 0) clearFigure();
      }

      // nodes
      for (const n of state.nodes) {
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
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      for (const n of state.nodes) {
        n.x = Math.min(n.x, canvas.width - 20);
        n.y = Math.min(n.y, canvas.height - 20);
      }
    });

    // Don't burn frames while the hero is scrolled out of view.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    resize();
    state.nodes = Array.from({ length: 40 }, makeNode);
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);

    // Reduced motion still gets one composed figure — static, not blank.
    if (reduceMotion) triggerFigure();

    state.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      clearFigure();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div ref={labelLayerRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
