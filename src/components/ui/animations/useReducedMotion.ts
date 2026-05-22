import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if prefers-reduced-motion is set to reduce
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation config based on reduced motion preference
 */
export function getAnimationConfig(prefersReducedMotion: boolean) {
  return {
    duration: prefersReducedMotion ? 0.2 : 0.4,
    staggerAmount: prefersReducedMotion ? 0.02 : 0.05,
    ease: prefersReducedMotion ? "linear" : "power3.out",
    scrub: prefersReducedMotion ? false : 1,
  };
}
