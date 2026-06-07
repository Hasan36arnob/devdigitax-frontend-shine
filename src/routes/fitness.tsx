import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ExternalLink, Dumbbell } from "lucide-react";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/fitness")({
  component: FitnessPage,
  head: () => ({
    meta: [
      { title: "Fitness & Training — DevdigitaX" },
      { name: "description", content: "Personal Training & Coaching website with course management and performance tracking." },
    ],
  }),
});

function FitnessPage() {
  return (
    <SiteLayout>
      <section className="relative py-16 bg-background">
        <Reveal className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">1 Fitness Training</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Personal Training & Coaching Platform
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            High-performance training website with course management and performance tracking.
          </p>
          <a
            href="https://1fitnesswebsite1.netlify.app/"
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
              src="https://1fitnesswebsite1.netlify.app/"
              title="1 Fitness Training"
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
          <span>Start Your Fitness Project</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </SiteLayout>
  );
}