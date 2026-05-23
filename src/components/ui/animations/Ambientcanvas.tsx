/**
 * AmbientCanvas — Lightweight animated background system
 * Shared visual language across all homepage sections.
 *
 * Usage:
 *   <AmbientCanvas variant="particles" />   // floating data nodes (stats, testimonials)
 *   <AmbientCanvas variant="grid" />        // pulsing grid (services, lifecycle)
 *   <AmbientCanvas variant="flow" />        // flowing bezier streams (path/CTA)
 *
 * Each variant draws ≤ 300 canvas ops/frame on a 60fps rAF loop.
 * The canvas is position:absolute, pointer-events:none, z-index:0.
 * Wrap the section in position:relative; children sit at z-index > 0.
 */

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Variant = "particles" | "grid" | "flow";

interface Props {
  variant?: Variant;
  /** 0–1 overall opacity multiplier. Default 1. */
  intensity?: number;
  className?: string;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
const BLUE   = "66,133,244";
const GREEN  = "52,168,83";
const AMBER  = "251,188,4";
const RED    = "234,67,53";
const PURPLE = "139,92,246";
const CYAN   = "6,182,212";
const PALETTE = [BLUE, GREEN, AMBER, RED, PURPLE, CYAN];

const rnd  = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── Variant: particles ───────────────────────────────────────────────────────
function runParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  intensity: number,
) {
  interface P {
    x: number; y: number;
    vx: number; vy: number;
    r: number; color: string;
    phase: number; speed: number;
  }

  const COUNT = Math.round(60 * Math.min(w / 1200, 1));
  const pts: P[] = Array.from({ length: COUNT }, () => ({
    x: rnd(0, w), y: rnd(0, h),
    vx: rnd(-0.4, 0.4), vy: rnd(-0.4, 0.4),
    r: rnd(1, 3.5),
    color: pick(PALETTE),
    phase: rnd(0, Math.PI * 2),
    speed: rnd(0.015, 0.04),
  }));

  // Connection threshold
  const LINK = Math.min(w, h) * 0.18;

  let t = 0;
  let raf: number;

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    t += 0.016;

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy; p.phase += p.speed;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          const alpha = (1 - dist / LINK) * 0.12 * intensity;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const p of pts) {
      const pulse = Math.sin(p.phase) * 0.25 + 0.75;
      const alpha = pulse * 0.55 * intensity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  };

  draw();
  return () => cancelAnimationFrame(raf);
}

// ─── Variant: grid ────────────────────────────────────────────────────────────
function runGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  intensity: number,
) {
  const STEP = 48;
  const COLS = Math.ceil(w / STEP) + 1;
  const ROWS = Math.ceil(h / STEP) + 1;

  interface Pulse {
    cx: number; cy: number; r: number; maxR: number; alpha: number;
  }
  const pulses: Pulse[] = [];
  let t = 0;
  let raf: number;
  let nextPulse = 0;

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    t += 0.016;

    // Spawn a new pulse every ~2 s
    if (t > nextPulse) {
      nextPulse = t + rnd(1.5, 3.0);
      pulses.push({
        cx: pick([...Array(COLS).keys()]) * STEP,
        cy: pick([...Array(ROWS).keys()]) * STEP,
        r: 0, maxR: rnd(80, 160), alpha: 0.35,
      });
    }

    // Draw static grid
    ctx.strokeStyle = `rgba(${BLUE},${0.035 * intensity})`;
    ctx.lineWidth = 0.5;
    for (let c = 0; c < COLS; c++) {
      const x = c * STEP;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let r = 0; r < ROWS; r++) {
      const y = r * STEP;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Draw intersection dots
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const x = c * STEP, y = r * STEP;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BLUE},${0.08 * intensity})`;
        ctx.fill();
      }
    }

    // Expand pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.r += 1.2;
      p.alpha *= 0.985;

      const a = p.alpha * intensity;
      if (a < 0.005 || p.r > p.maxR) { pulses.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${BLUE},${a})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    raf = requestAnimationFrame(draw);
  };

  draw();
  return () => cancelAnimationFrame(raf);
}

// ─── Variant: flow ────────────────────────────────────────────────────────────
function runFlow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  intensity: number,
) {
  interface Stream {
    y0: number; cp1y: number; cp2y: number; y1: number;
    offset: number; speed: number; color: string;
    amplitude: number;
  }

  const COUNT = 12;
  const streams: Stream[] = Array.from({ length: COUNT }, (_, i) => ({
    y0: rnd(0, h),
    cp1y: rnd(0, h),
    cp2y: rnd(0, h),
    y1: rnd(0, h),
    offset: rnd(0, Math.PI * 2),
    speed: rnd(0.003, 0.008),
    color: pick([BLUE, GREEN, CYAN, PURPLE]),
    amplitude: rnd(20, 60),
  }));

  // Moving dots on the streams
  interface Dot { stream: number; t: number; speed: number; }
  const dots: Dot[] = Array.from({ length: 30 }, () => ({
    stream: Math.floor(rnd(0, COUNT)),
    t: rnd(0, 1),
    speed: rnd(0.002, 0.006),
  }));

  let raf: number;

  const bezierPoint = (
    t: number, x0: number, x1: number, x2: number, x3: number,
    y0: number, y1: number, y2: number, y3: number,
  ) => {
    const mt = 1 - t;
    return {
      x: mt**3*x0 + 3*mt**2*t*x1 + 3*mt*t**2*x2 + t**3*x3,
      y: mt**3*y0 + 3*mt**2*t*y1 + 3*mt*t**2*y2 + t**3*y3,
    };
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    for (const s of streams) {
      s.offset += s.speed;
      const dy = Math.sin(s.offset) * s.amplitude;

      const x0 = -20, x3 = w + 20;
      const x1 = w * 0.3, x2 = w * 0.7;
      const y0 = s.y0 + dy;
      const cp1y = s.cp1y + Math.sin(s.offset * 1.3) * s.amplitude;
      const cp2y = s.cp2y + Math.cos(s.offset * 0.9) * s.amplitude;
      const y1 = s.y1 + Math.sin(s.offset * 0.7) * s.amplitude * 0.5;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(x1, cp1y, x2, cp2y, x3, y1);
      ctx.strokeStyle = `rgba(${s.color},${0.055 * intensity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Animate dots along streams
    for (const d of dots) {
      d.t = (d.t + d.speed) % 1;
      const s = streams[d.stream];
      const dy = Math.sin(s.offset) * s.amplitude;
      const x0 = -20, x3 = w + 20;
      const x1 = w * 0.3, x2 = w * 0.7;
      const pt = bezierPoint(
        d.t, x0, x1, x2, x3,
        s.y0 + dy,
        s.cp1y + Math.sin(s.offset * 1.3) * s.amplitude,
        s.cp2y + Math.cos(s.offset * 0.9) * s.amplitude,
        s.y1 + Math.sin(s.offset * 0.7) * s.amplitude * 0.5,
      );

      const pulse = Math.sin(d.t * Math.PI * 2) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color},${0.6 * intensity * pulse})`;
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  };

  draw();
  return () => cancelAnimationFrame(raf);
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AmbientCanvas({
  variant = "particles",
  intensity = 1,
  className = "",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof window === "undefined") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.width, h = canvas.height;
    let cleanup: () => void;

    if (variant === "particles") cleanup = runParticles(ctx, w, h, intensity);
    else if (variant === "grid")  cleanup = runGrid(ctx, w, h, intensity);
    else                          cleanup = runFlow(ctx, w, h, intensity);

    return () => {
      cleanup();
      window.removeEventListener("resize", resize);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}