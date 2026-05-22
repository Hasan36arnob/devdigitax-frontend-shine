import { gsap } from "gsap";

let ScrollTrigger: any = null;

async function registerScrollTrigger() {
  if (typeof window === "undefined" || ScrollTrigger) return;
  
  const ScrollTriggerRaw = await import("gsap/ScrollTrigger");
  ScrollTrigger = (ScrollTriggerRaw as any).ScrollTrigger || ScrollTriggerRaw;
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE_POWER3 = "power3.out";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, registerScrollTrigger };
