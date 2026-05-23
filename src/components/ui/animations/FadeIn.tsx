import { ReactNode, HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "./Reveal";
import { useReducedMotion, getAnimationConfig } from "./useReducedMotion";
import { gsap } from "gsap";

interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  start?: string;
  scale?: boolean;
  blur?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration,
  start = "top 90%",
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
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const element = containerRef.current;

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
      fromState.scale = 0.97;
      toState.scale = 1;
    }

    if (blur > 0) {
      fromState.filter = `blur(${blur}px)`;
      toState.filter = "blur(0px)";
    }

    gsap.set(element, fromState);

    const animation = gsap.to(element, {
      ...toState,
      delay,
    });

    return () => {
      animation.kill();
    };
  }, [isClient, delay, finalDuration, start, scale, blur, prefersReducedMotion, config]);

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}