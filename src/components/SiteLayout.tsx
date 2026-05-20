import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { SmoothScroll } from "./ui/animations/SmoothScroll";
import { AnimatedBackground } from "./ui/animations/AnimatedBackground";

// power3.out equivalent
const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const routerState = useRouterState();
  const key = routerState.location.pathname;

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col text-foreground overflow-x-hidden relative z-0">
        <AnimatedBackground />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main 
            key={key}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: easePower3Out }}
            className="flex-1"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  );
}
