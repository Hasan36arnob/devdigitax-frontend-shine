import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "./Reveal";

interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  factor?: number; // How much it moves (e.g., 20 means it moves max 20px)
}

export function MouseParallax({ children, className, factor = 15 }: MouseParallaxProps) {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the raw mouse values
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 1 });

  // Transform raw normalized values (-1 to 1) into pixels
  const translateX = useTransform(springX, [-1, 1], [-factor, factor]);
  const translateY = useTransform(springY, [-1, 1], [-factor, factor]);

  useEffect(() => {
    // Basic mobile check to disable hover-based animations on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (isMobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      style={{ x: translateX, y: translateY }}
    >
      {children}
    </motion.div>
  );
}
