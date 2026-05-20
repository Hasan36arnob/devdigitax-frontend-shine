import { motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";
import { cn } from "./Reveal";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "words" | "chars";
  as?: keyof React.JSX.IntrinsicElements;
}

export function SplitText({ text, className, delay = 0, type = "words", as = "span" }: SplitTextProps) {
  const elements = type === "words" ? text.split(" ") : text.split("");
  const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: easePower3Out,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  const Component = as as any;

  return (
    <Component className={cn("inline-block", className)}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="flex flex-wrap"
      >
        {elements.map((element, index) => (
          <motion.span
            variants={child}
            key={index}
            className="inline-block overflow-hidden"
            style={{ marginRight: type === "words" ? "0.25em" : "0" }}
          >
            {element === " " ? "\u00A0" : element}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
