import { ReactNode, HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "./Reveal";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";

// Dynamic imports for GSAP (client-side only)
let gsap: any = null;
let ScrollTrigger: any = null;
let isInitialized = false;

const initGSAP = async () => {
  if (isInitialized || typeof window === "undefined") return;
  try {
    const gsapModule = await import("gsap");
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    gsap = gsapModule.default;
    ScrollTrigger = scrollTriggerModule.default;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      isInitialized = true;
    }
  } catch (error) {
    console.error("Failed to load GSAP:", error);
  }
};

interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  start?: string;
  scale?: boolean;
  blur?: number;
}

/**
 * Accessible FadeIn component with reduced motion support
 * Animates opacity and optional scale/blur on scroll
 */
export function FadeIn({
  children,
  delay = 0,
  duration,
  start = "top 80%",
  scale = false,
  blur = 0,
  className,
  ...props
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);
  const [isClient, setIsClient] = useState(false);

  const finalDuration = duration ?? config.duration;

  useEffect(() => {
    setIsClient(true);
    initGSAP();
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || !gsap) return;

    const element = containerRef.current;

    // Set initial state
    const fromState: Record<string, unknown> = {
      opacity: 0,
      willChange: "transform, opacity, filter",
    };

    const toState: Record<string, unknown> = {
      opacity: 1,
      ease: config.ease,
      duration: finalDuration,
    };

    if (scale) {
      fromState.scale = 0.95;
      toState.scale = 1;
    }

    if (blur > 0) {
      fromState.filter = `blur(${blur}px)`;
      toState.filter = "blur(0px)";
    }

    gsap.set(element, fromState);

    // Skip scroll trigger if reduced motion
    if (prefersReducedMotion) {
      gsap.to(element, {
        ...toState,
        delay,
      });
    } else {
      gsap.to(element, {
        ...toState,
        delay,
        scrollTrigger: {
          trigger: element,
          start,
          end: "top 60%",
          toggleActions: "play none none none",
          markers: false,
        },
      });
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [isClient, delay, finalDuration, start, scale, blur, prefersReducedMotion, config]);

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
