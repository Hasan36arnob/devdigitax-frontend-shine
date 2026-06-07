import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ShoppingCart, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/e-commerce")({
  component: EcommercePage,
  head: () => ({
    meta: [
      { title: "E-Commerce Stores — DevdigitaX" },
      { name: "description", content: "Premium e-commerce websites with seamless checkout and inventory management." },
    ],
  }),
});

function EcommercePage() {
  return (
    <SiteLayout>
      <section className="relative py-16 bg-background">
        <Reveal className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>E-Commerce Solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Premium E-Commerce Stores
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            High-converting online stores built for your business. Click below to view live examples.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://yanaluxebd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              <span>Yana Luxe (Live Client Site)</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://devdigitaxecom.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              <span>Footcap Demo</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Yana Luxe BD</h2>
            <p className="text-muted-foreground mb-4">Premium luxury e-commerce platform with curated collections and VIP experience</p>
          </Reveal>
          <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl" style={{ height: "80vh", minHeight: "600px" }}>
            <iframe
              src="https://yanaluxebd.com/"
              title="Yana Luxe E-Commerce"
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
          <span>Start Your E-Commerce Project</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </SiteLayout>
  );
}