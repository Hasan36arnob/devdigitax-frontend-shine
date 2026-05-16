import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useMemo } from "react";
import { getPortfolio, sortPortfolioForDisplay } from "@/utils/data";
import { ExternalLink, Globe, Search } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio — DevdigitaX" },
      {
        name: "description",
        content:
          "Explore our demo websites. Custom designs and tailored options available to match your specific vision and references.",
      },
    ],
  }),
});

const categories = [
  { id: "all", label: "All Works" },
  { id: "wordpress", label: "WordPress" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend / App" },
  { id: "marketplace", label: "Marketplace" },
  { id: "saas", label: "SaaS" },
  { id: "specialized", label: "Specialized" },
];

const categoryColors: Record<string, string> = {
  wordpress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ecommerce: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  fullstack: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  frontend: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  marketplace: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  saas: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  specialized: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  dashboard: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

const categoryLabels: Record<string, string> = {
  wordpress: "WordPress",
  ecommerce: "E-Commerce",
  fullstack: "Full Stack",
  frontend: "Frontend",
  marketplace: "Marketplace",
  saas: "SaaS",
  specialized: "Specialized",
  dashboard: "Dashboard",
};

function PortfolioPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const allProjects = useMemo(() => sortPortfolioForDisplay(getPortfolio()), []);

  const filtered = useMemo(() => {
    let list =
      activeCat === "all" ? allProjects : allProjects.filter((p) => p.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.client || "").toLowerCase().includes(q) ||
          (p.tech || "").toLowerCase().includes(q) ||
          (p.result || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCat, search, allProjects]);

  // Count per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: allProjects.length };
    allProjects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [allProjects]);

  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden animate-fade-in" style={{ background: "var(--gradient-hero)" }}>
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Globe className="h-3.5 w-3.5" />
            <span>Showcasing Excellence</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
            Here are Some demo work. If you don’t like them, we can{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              customize the design
            </span>{" "}
            or show more options.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feel free to share any reference site you like. We build high-performance,
            conversion-focused digital products across all industries.
          </p>
        </div>
      </section>

      {/* ── Filter / Search ── */}
      <section className="sticky top-[var(--navbar-height)] z-30 border-y border-border bg-background/80 backdrop-blur-md reveal">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeCat === cat.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-[10px] px-1.5 rounded-md ${
                      activeCat === cat.id ? "bg-white/20" : "bg-muted"
                    }`}
                  >
                    {counts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 reveal">
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                style={{ boxShadow: "var(--shadow-elegant)" }}
              >
                {/* Image Container */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white text-sm font-medium mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {p.result}
                    </p>
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:scale-105 transition"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest ${
                        categoryColors[p.category] || "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {categoryLabels[p.category] || p.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{p.client}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-4 line-clamp-1">
                    {p.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-2">
                    {p.tech.split(",").map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground font-medium border border-border/50"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-card rounded-[3rem] border border-dashed border-border">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Want results like these?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Let's talk about your project. We'll show you exactly how we'd approach it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              Start a Project
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/8801837692110"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border bg-card hover:bg-accent font-semibold transition-all hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
