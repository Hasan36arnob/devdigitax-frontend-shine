import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pharmacy")({
  component: PharmacyPage,
  head: () => ({
    meta: [
      { title: "Pharmacy E-Commerce — DevdigitaX" },
      { name: "description", content: "Secure, HIPAA-compliant pharmacy e-commerce solutions with prescription management and inventory tracking." },
    ],
  }),
});

function PharmacyPage() {
  return (
    <SiteLayout>
      <section className="relative py-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Pharmacy Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Healthcare & Pharmacy
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              E-Commerce Platform
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Secure, HIPAA-compliant pharmacy platforms with prescription management, inventory tracking, and regulatory compliance.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="flex-1 p-6 rounded-xl border border-border bg-card/40">
              <h3 className="font-bold text-white mb-2">HIPAA Compliance</h3>
              <p className="text-sm text-muted-foreground">Secure patient data handling and privacy controls</p>
            </div>
            <div className="flex-1 p-6 rounded-xl border border-border bg-card/40">
              <h3 className="font-bold text-white mb-2">Prescription Management</h3>
              <p className="text-sm text-muted-foreground">Upload, tracking, and fulfillment workflow</p>
            </div>
            <div className="flex-1 p-6 rounded-xl border border-border bg-card/40">
              <h3 className="font-bold text-white mb-2">Regulatory Ready</h3>
              <p className="text-sm text-muted-foreground">FDA and DEA compliant systems</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready for Your Pharmacy Platform?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We'll build a secure, compliant pharmacy website that handles prescriptions and inventory with full regulatory compliance.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group"
        >
          <span>Discuss Pharmacy Project</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </SiteLayout>
  );
}