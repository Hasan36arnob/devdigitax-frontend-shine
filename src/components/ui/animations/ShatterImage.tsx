"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ShatterImageProps {
  src: string;
  alt: string;
  cols?: number;
  rows?: number;
  delay?: number;
  className?: string;
}

export function ShatterImage({
  src,
  alt,
  cols = 7,
  rows = 7,
  delay = 0.3,
  className = "",
}: ShatterImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll<HTMLDivElement>(".shatter-tile");

    // Each tile starts scattered: random position, rotation, scale, opacity
    gsap.set(tiles, () => {
      const angle = Math.random() * 360;
      const radius = 150 + Math.random() * 350;
      const rad = (angle * Math.PI) / 180;
      return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.1 + Math.random() * 0.5,
        opacity: 0,
        filter: "blur(8px) brightness(2)",
      };
    });

    const tl = gsap.timeline({ delay });

    // All tiles fly into place
    tl.to(tiles, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      duration: 1.1,
      stagger: {
        each: 0.018,
        from: "random",
      },
      ease: "expo.out",
    });

    // Flash glow on assembly completion
    tl.to(
      container,
      {
        boxShadow: "0 0 40px oklch(0.55 0.24 262 / 0.6)",
        duration: 0.2,
        ease: "power2.in",
        yoyo: true,
        repeat: 1,
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, [src, cols, rows, delay]);

  const tileWidth = 100 / cols;
  const tileHeight = 100 / rows;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      aria-label={alt}
      style={{ aspectRatio: "1 / 1" }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="shatter-tile absolute"
            style={{
              width: `${tileWidth}%`,
              height: `${tileHeight}%`,
              left: `${col * tileWidth}%`,
              top: `${row * tileHeight}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
              willChange: "transform, opacity, filter",
            }}
          />
        ))
      )}
    </div>
  );
}

