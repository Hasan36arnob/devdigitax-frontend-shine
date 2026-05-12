import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { getPortfolio } from "@/utils/data";

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

function PortfolioPage() {
  const [activeCat, setActiveCat] = useState("all");
  const allProjects = getPortfolio();

  const filtered =
    activeCat === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCat);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "saas", label: "SAAS Platforms" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "marketplace", label: "Marketplace" },
    { id: "dashboard", label: "Dashboard" },
    { id: "specialized", label: "Specialized" },
    { id: "wordpress", label: "WordPress" },
    { id: "design", label: "Design" },
  ];

  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
            Our Past Works
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
            key={p.id}
            className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition"
          >
            <div className="aspect-video relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">
                {p.client}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-primary">{p.result}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.tech}</p>
              <div className="mt-4 flex gap-3">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
                  >
                    Live Demo
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded-full border border-border hover:bg-accent transition"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}