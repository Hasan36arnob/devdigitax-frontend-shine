import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useMemo } from "react";
import { getPortfolio } from "@/utils/data";
import { ExternalLink, Globe, Sparkles, Award } from "lucide-react";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio — DevdigitaX" },
      {
        name: "description",
        content:
          "Explore our premium portfolio showcasing demo projects and client work. Custom designs and tailored solutions available.",
      },
    ],
  }),
});

function PortfolioPage() {
  const [view, setView] = useState<"all" | "demo" | "client">("all");
  const allProjects = useMemo(() => getPortfolio(), []);
  
  const demoProjects = useMemo(() => 
    allProjects.filter(p => p.section === "demo" || p.id.startsWith("demo-")),
    [allProjects]
  );
  
  const clientProjects = useMemo(() => 
    allProjects.filter(p => p.section === "client" || p.id.startsWith("client-")),
    [allProjects]
  );

  const visibleProjects = useMemo(() => {
    if (view === "demo") return demoProjects;
    if (view === "client") return clientProjects;
    return [...demoProjects, ...clientProjects];
  }, [view, demoProjects, clientProjects]);

  const PortfolioCard = ({ project }: { project: any }) => (
    <StaggerItem
      className="group rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-700 hover:-translate-y-4 flex flex-col shadow-lg hover:shadow-2xl"
      style={{ boxShadow: "var(--shadow-elegant)" }}
    >
      {/* Image Container */}
      <div className="overflow-hidden relative aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.result || project.tech}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1 mb-6">
            {project.tech.split(", ").slice(0, 3).map((tech: string) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium border border-primary/10">
                {tech}
              </span>
            ))}
            {project.tech.split(", ").length > 3 && (
              <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">
                +{project.tech.split(", ").length - 3}
              </span>
            )}
          </div>
          
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 group/btn"
            >
              <span>View Live</span>
              <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </StaggerItem>
  );

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
        <Reveal variant="fade-in-up" className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Award className="h-3.5 w-3.5" />
            <span>Award-Winning Work</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Premium Digital Solutions
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Crafted to Perfection
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of demo projects and premium client work. Each project represents excellence in design, functionality, and user experience.
          </p>
        </Reveal>
      </section>

      {/* ── Filter Options ── */}
      <section className="relative py-12 md:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="text-muted-foreground font-medium">View:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setView("all")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  view === "all"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setView("demo")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  view === "demo"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Demo Projects
              </button>
              <button
                onClick={() => setView("client")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  view === "client"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <Globe className="h-4 w-4" />
                Client Work
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {view === "all" && (
            <>
              {/* Demo Section */}
              {demoProjects.length > 0 && (
                <Reveal className="mb-20">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl md:text-4xl font-bold">Demo Projects</h2>
                  </div>
                  <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {demoProjects.map((project) => (
                      <PortfolioCard key={project.id} project={project} />
                    ))}
                  </Stagger>
                </Reveal>
              )}

              {/* Client Section */}
              {clientProjects.length > 0 && (
                <Reveal className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl md:text-4xl font-bold">Client Work</h2>
                  </div>
                  <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clientProjects.map((project) => (
                      <PortfolioCard key={project.id} project={project} />
                    ))}
                  </Stagger>
                </Reveal>
              )}
            </>
          )}

          {view === "demo" && (
            <Reveal className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Demo Projects</h2>
              </div>
              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoProjects.map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </Stagger>
            </Reveal>
          )}

          {view === "client" && (
            <Reveal className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Client Work</h2>
              </div>
              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientProjects.map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </Stagger>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <Reveal className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Let's create something extraordinary together. Share your vision, and we'll bring it to life.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group"
        >
          <span>Get In Touch</span>
          <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </Reveal>
    </SiteLayout>
  );
}
