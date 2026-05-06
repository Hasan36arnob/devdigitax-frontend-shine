import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio — DevdigitaX" },
      { name: "description", content: "A selection of brands, products and growth campaigns built by DevdigitaX." },
    ],
  }),
});

const projects = [
  { t: "Bloomly Skincare", c: "E-Commerce / Branding", r: "+312% revenue in 6 months", g: "linear-gradient(135deg, oklch(0.55 0.24 262), oklch(0.7 0.2 320))" },
  { t: "NorthGear Outdoors", c: "Web + Paid Media", r: "4.8× ROAS on Meta Ads", g: "linear-gradient(135deg, oklch(0.5 0.2 200), oklch(0.7 0.18 260))" },
  { t: "Lumora Studio", c: "SEO / Content", r: "Top 3 for 47 keywords", g: "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.7 0.2 200))" },
  { t: "Vault Finance", c: "Web App", r: "1.1s LCP, 99 Lighthouse", g: "linear-gradient(135deg, oklch(0.45 0.2 240), oklch(0.65 0.22 280))" },
  { t: "Mira Furniture", c: "Shopify Store", r: "+187% conversion uplift", g: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.55 0.22 262))" },
  { t: "Pulse Fitness", c: "Brand + App", r: "12k MAU in 90 days", g: "linear-gradient(135deg, oklch(0.55 0.24 262), oklch(0.7 0.2 160))" },
];

function PortfolioPage() {
  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Portfolio</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Selected work that moved the needle.</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.t} className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition" style={{ transition: "var(--transition-smooth)" }}>
            <div className="aspect-[4/3] relative" style={{ background: p.g }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">{p.c}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-primary">{p.r}</p>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}