import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ExternalLink, Smile } from "lucide-react";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/wellness")({
  component: WellnessPage,
  head: () => ({
    meta: [
      { title: "Wellness & Meditation — DevdigitaX" },
      { name: "description", content: "Wellness & Meditation Platform with modern design and smooth animations." },
    ],
  }),
});

function WellnessPage() {
  return (
    <SiteLayout>
      <section className="relative py-16 bg-background">
        <Reveal className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <Smile className="h-5 w-5 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">Purify Soul Wellness</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Wellness & Meditation Platform
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Modern, calming design with smooth animations and meditation content delivery.
          </p>
          <a
            href="https://purifysoul.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 mb-8"
          >
            <span>Open Full Site in New Tab</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Reveal>
      </section>

      <section className="bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl" style={{ height: "80vh", minHeight: "600px" }}>
            <iframe
              src="https://purifysoul.netlify.app/"
              title="Purify Soul Wellness"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group"
        >
          <span>Start Your Wellness Project</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </SiteLayout>
  );
}