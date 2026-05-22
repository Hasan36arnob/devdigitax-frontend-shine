import React, { useEffect, useRef, useState } from "react";
import { cn } from "./Reveal";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";
import { gsap } from "gsap";
import ScrollTriggerRaw from "gsap/ScrollTrigger";

const ScrollTrigger = (ScrollTriggerRaw as any).ScrollTrigger || ScrollTriggerRaw;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  staggerAmount = 0.03,
  duration = 0.7,
  triggerStart = "top 90%",
  triggerEnd = "bottom 10%",
  type = "words",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    
    if (container.getAttribute("data-split-animated") === "true") {
      return;
    }

    const spans = container.querySelectorAll("span[data-char]");
    if (spans.length === 0) return;

    container.setAttribute("data-split-animated", "true");

    gsap.set(spans, {
      opacity: 0,
      y: 15,
      willChange: "transform, opacity",
    });

    if (prefersReducedMotion) {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "linear",
        stagger: 0.02,
        delay,
      });
    } else {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        stagger: staggerAmount,
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
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [isClient, delay, staggerAmount, duration, triggerStart, triggerEnd, prefersReducedMotion, config]);

  const Component = as as any;
  const words = text.split(" ");
  const splitContent = type === "words" 
    ? words.map((word, idx) => (
        <span key={idx} className="inline-block mr-[0.25em] overflow-hidden whitespace-nowrap">
          {word.split("").map((char, charIdx) => (
            <span key={charIdx} data-char className="inline-block">
              {char}
            </span>
          ))}
        </span>
      ))
    : text.split("").map((char, idx) => (
        <span key={idx} data-char className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ));

  return (
    <Component ref={containerRef} className={cn(className)}>
      {splitContent}
    </Component>
  );
}