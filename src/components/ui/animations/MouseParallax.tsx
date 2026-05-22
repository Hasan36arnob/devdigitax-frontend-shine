import { ReactNode } from "react";
import { cn } from "./Reveal";

export function MouseParallax({ children, className, factor }: { children: ReactNode; className?: string; factor?: number }) {
  return <div className={cn(className)}>{children}</div>;
}
