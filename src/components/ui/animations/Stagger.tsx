import { ReactNode, HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "./Reveal";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";
import { gsap } from "gsap";

interface StaggerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  start?: string;
  variant?: "fade" | "scale" | "slide-up" | "image";
  duration?: number;
}

interface StaggerItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "fade" | "scale" | "slide-up" | "image";
}

export function Stagger({
  children,
  staggerDelay,
  delay = 0,
  start = "top 85%",
  variant = "fade",
  duration,
  className,
  ...props
}: StaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);
  const [isClient, setIsClient] = useState(false);

  const finalStaggerDelay = staggerDelay ?? config.staggerAmount;
  const finalDuration = duration ?? config.duration;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll("[data-stagger-item]");
    if (items.length === 0) return;

    const variants: Record<string, Record<string, unknown>> = {
      fade: { opacity: 0 },
      scale: { opacity: 0, scale: 0.96 },
      "slide-up": { opacity: 0, y: 30 },
      image: { opacity: 0, scale: 1.03 },
    };

    const toVars: Record<string, Record<string, unknown>> = {
      fade: { opacity: 1, ease: config.ease },
      scale: { opacity: 1, scale: 1, ease: config.ease },
      "slide-up": { opacity: 1, y: 0, ease: config.ease },
      image: { opacity: 1, scale: 1, ease: config.ease },
    };

    const fromState = variants[variant] || variants.fade;
    const toState = toVars[variant] || toVars.fade;

    gsap.set(items, { ...fromState, willChange: "transform, opacity" });

    if (prefersReducedMotion) {
      gsap.to(items, {
        ...toState,
        duration: finalDuration,
        stagger: finalStaggerDelay,
        delay,
      });
    } else {
      (async () => {
        const ScrollTriggerRaw = await import("gsap/ScrollTrigger");
        const ScrollTrigger = (ScrollTriggerRaw as any).ScrollTrigger || ScrollTriggerRaw;
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(items, {
          ...toState,
          duration: finalDuration,
          stagger: finalStaggerDelay,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end: "top 60%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
      })();
    }

    return () => {
      (async () => {
        const ScrollTriggerRaw = await import("gsap/ScrollTrigger");
        const ScrollTrigger = (ScrollTriggerRaw as any).ScrollTrigger || ScrollTriggerRaw;
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === containerRef.current) {
            trigger.kill();
          }
        });
      })();
    };
  }, [isClient, finalStaggerDelay, delay, start, variant, finalDuration, prefersReducedMotion, config]);

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  variant,
  className,
  ...props
}: StaggerItemProps) {
  return (
    <div data-stagger-item className={cn(className)} {...props}>
      {children}
    </div>
  );
}