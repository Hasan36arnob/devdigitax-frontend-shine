import { ReactNode } from "react";
import { cn } from "./Reveal";

export function TiltCard({ children, className, maxTilt }: { children: ReactNode; className?: string; maxTilt?: number }) {
  return <div className={cn(className)}>{children}</div>;
}
