import { ReactNode, HTMLAttributes, useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  variant?: "fade-in-up" | "fade-in" | "scale" | "slide-up" | "image" | "custom";
  duration?: number;
  start?: string;
  tweenVars?: Record<string, unknown>;
}

export function Reveal({
  children,
  delay = 0,
  variant = "fade-in-up",
  duration,
  start = "top 80%",
  tweenVars,
  className,
  ...props
}: RevealProps) {
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
    
    // Skip if already animated
    if (element.getAttribute('data-reveal-animated') === 'true') {
      return;
    }

    // Default animation configurations
    const variants: Record<string, Record<string, unknown>> = {
      "fade-in-up": {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, ease: config.ease, duration: finalDuration },
      },
      "fade-in": {
        from: { opacity: 0 },
        to: { opacity: 1, ease: config.ease, duration: finalDuration },
      },
      scale: {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1, ease: config.ease, duration: finalDuration },
      },
      "slide-up": {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0, ease: config.ease, duration: finalDuration },
      },
      image: {
        from: { opacity: 0, scale: 1.05 },
        to: { opacity: 1, scale: 1, ease: config.ease, duration: finalDuration },
      },
    };

    const variantConfig = variants[variant] || variants["fade-in-up"];
    const fromState = variantConfig.from;
    const toState = variantConfig.to;

    // Set initial state
    gsap.set(element, { ...fromState, willChange: "transform, opacity" });
    element.setAttribute('data-reveal-animated', 'true');

    // Skip scroll trigger if reduced motion
    if (prefersReducedMotion) {
      gsap.to(element, {
        ...toState,
        delay,
      });
    } else {
      // Create scroll trigger animation
      gsap.to(element, {
        ...toState,
        scrollTrigger: {
          trigger: element,
          start,
          end: "top 60%",
          toggleActions: "play none none none",
          markers: false,
        },
        delay,
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
  }, [isClient, variant, finalDuration, start, delay, prefersReducedMotion, config]);

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
