import { useEffect, useRef, useState } from "react";
import { cn } from "./Reveal";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerAmount?: number;
  duration?: number;
  triggerStart?: string;
  triggerEnd?: string;
  as?: keyof React.JSX.IntrinsicElements;
  splitType?: "words" | "characters" | "lines";
}

export function RevealText({
  text,
  className,
  as = "h2",
  delay = 0,
  staggerAmount = 0.04,
  duration = 0.8,
  triggerStart = "top 90%",
  triggerEnd = "bottom 10%",
  splitType = "words",
}: RevealTextProps) {
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
    
    if (container.getAttribute("data-reveal-text-animated") === "true") {
      return;
    }

    const spans = container.querySelectorAll("span[data-reveal-char]");
    if (spans.length === 0) return;

    container.setAttribute("data-reveal-text-animated", "true");

    gsap.set(spans, {
      opacity: 0,
      y: 24,
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
        ease: "power3.out",
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
  let splitContent: React.ReactNode;

  if (splitType === "words") {
    const words = text.split(" ");
    splitContent = words.map((word, idx) => (
      <span key={idx} className="inline-block mr-[0.25em] overflow-hidden whitespace-nowrap">
        {word.split("").map((char, charIdx) => (
          <span key={charIdx} data-reveal-char className="inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  } else if (splitType === "characters") {
    splitContent = text.split("").map((char, idx) => (
      <span key={idx} data-reveal-char className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  } else {
    splitContent = text.split("\n").map((line, idx) => (
      <div key={idx} className="overflow-hidden block">
        {line.split("").map((char, charIdx) => (
          <span key={charIdx} data-reveal-char className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    ));
  }

  return (
    <Component ref={containerRef} className={cn(className)}>
      {splitContent}
    </Component>
  );
}