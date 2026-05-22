import { ReactNode, HTMLAttributes, useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  start = "top 85%",
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
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const element = containerRef.current;
    
    if (element.getAttribute("data-reveal-animated") === "true") {
      return;
    }

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
        from: { opacity: 0, scale: 0.95 },
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

    gsap.set(element, { ...fromState, willChange: "transform, opacity" });
    element.setAttribute("data-reveal-animated", "true");

    if (prefersReducedMotion) {
      gsap.to(element, {
        ...toState,
        delay,
      });
    } else {
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
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [isClient, variant, finalDuration, start, delay, prefersReducedMotion, config]);

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}