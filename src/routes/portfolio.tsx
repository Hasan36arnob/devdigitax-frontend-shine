import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio — DevdigitaX" },
      {
        name: "description",
        content: "A selection of brands, products and growth campaigns built by DevdigitaX.",
      },
    ],
  }),
});

const projects = [
  {
    t: "Bloomly Skincare",
    c: "E-Commerce",
    cat: "fullstack",
    r: "+312% revenue in 6 months",
    g: "linear-gradient(135deg, oklch(0.55 0.24 262), oklch(0.7 0.2 320))",
  },
  {
    t: "NorthGear Outdoors",
    c: "Web + Paid Media",
    cat: "fullstack",
    r: "4.8× ROAS on Meta Ads",
    g: "linear-gradient(135deg, oklch(0.5 0.2 200), oklch(0.7 0.18 260))",
  },
  {
    t: "Lumora Studio",
    c: "SEO / Content",
    cat: "wordpress",
    r: "Top 3 for 47 keywords",
    g: "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.7 0.2 200))",
  },
  {
    t: "Vault Finance",
    c: "Web App",
    cat: "fullstack",
    r: "1.1s LCP, 99 Lighthouse",
    g: "linear-gradient(135deg, oklch(0.45 0.2 240), oklch(0.65 0.22 280))",
  },
  {
    t: "Mira Furniture",
    c: "Shopify Store",
    cat: "ecommerce",
    r: "+187% conversion uplift",
    g: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.55 0.22 262))",
  },
  {
    t: "Pulse Fitness",
    c: "Brand + App",
    cat: "fullstack",
    r: "12k MAU in 90 days",
    g: "linear-gradient(135deg, oklch(0.55 0.24 262), oklch(0.7 0.2 160))",
  },
  {
    t: "Creative Agency",
    c: "Brand Identity",
    cat: "graphic",
    r: "Complete visual identity",
    g: "linear-gradient(135deg, oklch(0.65 0.25 340), oklch(0.75 0.2 20))",
  },
  {
    t: "Tech Blog Pro",
    c: "WordPress Site",
    cat: "wordpress",
    r: "Custom theme & plugins",
    g: "linear-gradient(135deg, oklch(0.5 0.15 250), oklch(0.65 0.2 220))",
  },
  {
    t: "Fitness App UI",
    c: "Mobile Design",
    cat: "graphic",
    r: "100+ screens designed",
    g: "linear-gradient(135deg, oklch(0.6 0.2 160), oklch(0.7 0.18 140))",
  },
  {
    t: "Eco Shop",
    c: "Shopify Store",
    cat: "ecommerce",
    r: "Custom theme development",
    g: "linear-gradient(135deg, oklch(0.55 0.18 120), oklch(0.65 0.15 100))",
  },
  {
    t: "Startup Landing",
    c: "Landing Page",
    cat: "fullstack",
    r: "Conversion focused design",
    g: "linear-gradient(135deg, oklch(0.5 0.22 280), oklch(0.65 0.2 260))",
  },
  {
    t: "Blog Magazine",
    c: "WordPress",
    cat: "wordpress",
    r: "Multi-author platform",
    g: "linear-gradient(135deg, oklch(0.55 0.18 200), oklch(0.65 0.15 220))",
  },
];

const categories = [
  { id: "all", label: "All Works" },
  { id: "fullstack", label: "Fullstack" },
  { id: "wordpress", label: "WordPress" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "graphic", label: "Graphic Design" },
];

function PortfolioPage() {
  const [activeCat, setActiveCat] = useState("all");

  const filtered = activeCat === "all" ? projects : projects.filter((p) => p.cat === activeCat);

  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
            Selected work that moved the needle.
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeCat === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-accent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.t}
            className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition"
            style={{ transition: "var(--transition-smooth)" }}
          >
            <div className="aspect-[4/3] relative" style={{ background: p.g }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">
                {p.c}
              </span>
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
