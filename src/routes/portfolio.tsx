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
          "Real client work across food & restaurant, e-commerce, WordPress, and more — built by DevdigitaX.",
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
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.tech.toLowerCase().includes(q) ||
          p.result.toLowerCase().includes(q),
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
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Globe className="h-3.5 w-3.5" />
            <span></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Work That Speaks
            <br />
            <span className="text-primary">For Itself</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real websites. Real clients. From food & restaurant brands to enterprise e-commerce —
            every project built to convert.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {[
              { v: "400+", l: "Projects Delivered" },
              { v: "8+", l: "Years Experience" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-primary">{v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + Search ── */}
      <section className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCat === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-card border border-border hover:border-primary/40 hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
                <span
                  className={`ml-1.5 text-xs ${activeCat === cat.id ? "opacity-70" : "opacity-50"}`}
                >
                  {counts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-9 pr-4 py-2 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
            />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No projects match your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCat("all");
              }}
              className="mt-4 text-primary text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-8">
              Showing <span className="text-foreground font-medium">{filtered.length}</span>{" "}
              projects
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, idx) => (
                <article
                  key={p.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  style={{ animationDelay: `${(idx % 9) * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted/20">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category badge */}
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${categoryColors[p.category] || "bg-muted/80 text-muted-foreground border-border"}`}
                    >
                      {categoryLabels[p.category] || p.category}
                    </span>

                    {/* Live link overlay button */}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-black text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visit Site
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground font-medium">{p.client}</p>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {p.result}
                    </p>

                    {/* Tech stack */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech
                        .split(", ")
                        .slice(0, 4)
                        .map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
                          >
                            {t}
                          </span>
                        ))}
                      {p.tech.split(", ").length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                          +{p.tech.split(", ").length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
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
