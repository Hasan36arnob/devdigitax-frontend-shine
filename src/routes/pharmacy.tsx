import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ExternalLink, Sparkles, ArrowRight, ShoppingCart } from "lucide-react";
import devdigitaxrestaurant from "@/assets/devdigitaxrestaurant.png";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";

export const Route = createFileRoute("/pharmacy")({
  component: PharmacyPage,
  head: () => ({
    meta: [
      { title: "Pharmacy E-Commerce — DevdigitaX" },
      { name: "description", content: "Secure, compliant pharmacy and healthcare e-commerce solutions with inventory management and prescription handling." },
    ],
  }),
});

function PharmacyPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden py-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Pharmacy Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Healthcare & Pharmacy
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Digital Solutions
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure, HIPAA-compliant pharmacy platforms with prescription management, inventory tracking, and regulatory compliance.
          </p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold mb-4">Pharmacy E-Commerce Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              We specialize in building secure healthcare e-commerce platforms. Contact us to discuss your pharmacy website needs.
            </p>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerItem className="group rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-700">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Pharmacy Platform</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  HIPAA-compliant online pharmacy with prescription upload, inventory management, and secure checkout.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  <span>Request Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group">
          <span>Get Pharmacy Solution</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </section>
    </SiteLayout>
  );
}