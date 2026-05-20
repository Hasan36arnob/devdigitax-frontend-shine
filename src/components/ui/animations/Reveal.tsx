import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  variant?: "fade" | "slide-up" | "scale" | "fade-in-up" | "slide-right" | "slide-left";
  className?: string;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  variant = "slide-up",
  className,
  duration = 0.8,
  ...props
}: RevealProps) {
  // GSAP power3.out equivalent
  const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay, ease: easePower3Out } },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: easePower3Out } },
    },
    "fade-in-up": {
      hidden: { opacity: 0, y: 40, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.85, delay, ease: easePower3Out },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: easePower3Out } },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: easePower3Out } },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: easePower3Out } },
    },
    image: {
      hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, delay, ease: easePower3Out } },
    }
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
