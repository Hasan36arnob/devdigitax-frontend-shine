import React, { useEffect, useRef, useState } from "react";
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

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerAmount?: number;
  duration?: number;
  triggerStart?: string;
  triggerEnd?: string;
  as?: keyof React.JSX.IntrinsicElements;
  tweenVars?: Record<string, unknown>;
  type?: "words" | "characters" | "lines";
}

export function SplitText({
  text,
  className,
  as = "span",
  delay = 0,
  staggerAmount = 0.08,
  duration = 0.6,
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
  type = "words",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);
  const [isClient, setIsClient] = useState(false);

  const finalStaggerAmount = staggerAmount;
  const finalDuration = duration;

  useEffect(() => {
    setIsClient(true);
    initGSAP();
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || !gsap) return;

    const container = containerRef.current;
    
    // Skip if already animated
    if (container.getAttribute('data-split-animated') === 'true') {
      return;
    }

    const spans = container.querySelectorAll("span[data-char]");

    if (spans.length === 0) return;

    // Mark as animated
    container.setAttribute('data-split-animated', 'true');

    // Set initial state - hide for animation
    gsap.set(spans, {
      opacity: 0,
      y: 20,
      willChange: "transform, opacity",
    });

    // Skip scroll trigger if reduced motion
    if (prefersReducedMotion) {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "linear",
        stagger: 0.05,
        delay,
      });
    } else {
      // Create scroll trigger animation
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: finalDuration,
        ease: "power2.out",
        stagger: finalStaggerAmount,
        delay,
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none none",
          markers: false,
        },
      });
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      }
    };
  }, [isClient, delay, finalStaggerAmount, finalDuration, triggerStart, triggerEnd, prefersReducedMotion, config]);

  const Component = as as any;

  // Split text into words or characters
  const words = text.split(" ");
  const splitContent = type === "words" 
    ? words.map((word, idx) => (
        <span key={idx} className="inline-block mr-[0.25em] overflow-hidden">
          {word.split("").map((char, charIdx) => (
            <span key={charIdx} data-char className="inline-block">
              {char}
            </span>
          ))}
        </span>
      ))
    : text.split("").map((char, idx) => (
        <span key={idx} data-char className="inline-block">
          {char}
        </span>
      ));

  return (
    <Component ref={containerRef} className={cn(className)}>
      {splitContent}
    </Component>
  );
}
