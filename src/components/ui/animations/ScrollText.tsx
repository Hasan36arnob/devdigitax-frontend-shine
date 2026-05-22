import { useEffect, useRef } from "react";
import { cn } from "./Reveal";
import gsap from "gsap";
import ScrollTriggerRaw from "gsap/ScrollTrigger";

const ScrollTrigger = (ScrollTriggerRaw as any).ScrollTrigger || ScrollTriggerRaw;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextProps {
  text: string;
  subtext?: string;
  scrollLength?: number;
  blurAmount?: number;
  className?: string;
  pinDuration?: number;
  staggerLetters?: boolean;
}

export function ScrollText({
  text,
  subtext,
  className,
  blurAmount = 40,
  pinDuration = 3,
  staggerLetters = true,
}: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    if (prefersReducedMotion) {
      gsap.set(textElement, { filter: "blur(0px)", opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: `+=${pinDuration * 100}`,
        scrub: config.scrub,
        pin: true,
        markers: false,
      },
    });

    tl.fromTo(
      textElement,
      { filter: `blur(${blurAmount}px)`, opacity: 0.3 },
      { filter: "blur(0px)", opacity: 1, duration: 1, ease: "power2.inOut" },
      0
    );

    tl.fromTo(
      textElement,
      { textShadow: "0 0 0px rgba(var(--primary-rgb), 0)" },
      {
        textShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    if (staggerLetters) {
      const letters = textElement.querySelectorAll("span[data-letter]");
      if (letters.length > 0) {
        gsap.set(letters, { opacity: 0.5 });
        tl.to(
          letters,
          {
            opacity: 1,
            duration: 0.01,
            stagger: 0.02,
            ease: "none",
          },
          0
        );
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [blurAmount, pinDuration, staggerLetters, prefersReducedMotion, config]);

  const letters = text.split("").map((char, idx) => (
    <span key={idx} data-letter className="inline-block">
      {char}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center min-h-screen bg-background",
        className
      )}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2
          ref={textRef}
          className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] transition-all duration-300"
        >
          {staggerLetters ? letters : text}
        </h2>
        {subtext && (
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
        )}
      </div>
    </section>
  );
}