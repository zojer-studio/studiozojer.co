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
    if (!canvasRef.current || !toastRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const toast: HTMLDivElement = toastRef.current;
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
