import { useEffect } from "react";
import { saveVisitor, VisitorData } from "@/utils/data";

export function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Prevent multiple tracking in the same session if you want, 
        // but for a simple "visit" count, let's track on mount.
        const hasTracked = sessionStorage.getItem("devdigitax_tracked_session");
        if (hasTracked) return;

        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const visitor: VisitorData = {
          id: Math.random().toString(36).substring(2, 15),
          ip: data.ip || "Unknown",
          country: data.country_name || "Unknown",
          countryCode: data.country_code || "??",
          city: data.city || "Unknown",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          page: window.location.pathname
        };

        saveVisitor(visitor);
        sessionStorage.setItem("devdigitax_tracked_session", "true");
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    trackVisit();
  }, []);

  return null; // This component doesn't render anything
}
