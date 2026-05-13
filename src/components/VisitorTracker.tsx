import { useEffect } from "react";
import { saveVisitor, VisitorData } from "@/utils/data";
import { logVisitServer } from "@/lib/analytics";

export function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const hasTracked = sessionStorage.getItem("devdigitax_tracked_session");
        if (hasTracked) return;

        // Try multiple providers for 100% accuracy (fallbacks)
        let data: any = null;
        const providers = ["https://ipwho.is/?fields=ip,country,countryCode,city"];

        for (const url of providers) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const json = await res.json();
              // Normalize data from ipwho.is
              data = {
                ip: json.ip || "Unknown",
                country: json.country || "Unknown",
                countryCode: json.countryCode || "??",
                city: json.city || "Unknown",
              };
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (!data) throw new Error("All geo providers failed");

        const visitor: VisitorData = {
          id: Math.random().toString(36).substring(2, 15),
          ip: data.ip,
          country: data.country,
          countryCode: data.countryCode,
          city: data.city,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          page: window.location.pathname,
          // Advanced Metadata
          referrer: document.referrer || "Direct",
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          isMobile: /Mobi|Android/i.test(navigator.userAgent),
        };

        saveVisitor(visitor);

        // Sync to server for global admin visibility (Google Level)
        try {
          await logVisitServer(visitor);
        } catch (serverError) {
          console.error("Server sync failed:", serverError);
        }

        sessionStorage.setItem("devdigitax_tracked_session", "true");
      } catch (error) {
        console.error("Advanced Tracking Error:", error);
      }
    };

    trackVisit();
  }, []);

  return null;
}
