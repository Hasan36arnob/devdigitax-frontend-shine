import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Stagger({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className,
  ...props
}: {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  variant = "slide-up",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: "fade" | "slide-up" | "scale" | "image";
  className?: string;
} & HTMLMotionProps<"div">) {
  const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8, ease: easePower3Out } },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePower3Out } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easePower3Out } },
    },
    image: {
      hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: easePower3Out } },
    },
  };

  return (
    <motion.div variants={variants[variant]} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
