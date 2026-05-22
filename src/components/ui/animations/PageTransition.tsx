import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that enables View Transition API for page changes
 * Respects prefers-reduced-motion
 */
export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Add CSS for view transitions if not reduced motion
    if (!prefersReducedMotion && "document" in globalThis) {
      const style = document.createElement("style");
      style.textContent = `
        @supports (view-transition-name: auto) {
          ::view-transition-old(root) {
            animation: fade-out 0.4 cubic-bezier(0.4, 0, 1, 1);
          }
          ::view-transition-new(root) {
            animation: fade-in 0.4 cubic-bezier(0, 0, 0.2, 1);
          }
          @keyframes fade-out {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

/**
 * Hook to trigger view transition on navigation
 */
export function useViewTransition() {
  const prefersReducedMotion = useReducedMotion();

  return (callback: () => void) => {
    if (!prefersReducedMotion && "startViewTransition" in document) {
      (document as any).startViewTransition(callback);
    } else {
      callback();
    }
  };
}
