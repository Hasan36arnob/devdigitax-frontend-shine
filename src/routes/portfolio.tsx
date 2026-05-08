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
    t: "WordPress Business Website",
    c: "Corporate WordPress site",
    cat: "wordpress",
    r: "Custom WordPress theme development with responsive design",
    tech: "WordPress, PHP, MySQL, Elementor",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&h=600&fit=crop",
  },
  {
    t: "E-commerce Dashboard",
    c: "Admin panel for online store",
    cat: "ecommerce",
    r: "Complete e-commerce admin dashboard with analytics and inventory management",
    tech: "Next.js, MongoDB, Chart.js, TailwindCSS",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&fit=crop",
  },
  {
    t: "Brand Identity Design",
    c: "Logo & brand package",
    cat: "design",
    r: "Complete brand identity including logo, business card, and social media kit",
    tech: "Adobe Illustrator, Photoshop, Figma",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&h=600&fit=crop",
  },
  {
    t: "Data Analytics Dashboard",
    c: "Climate data visualization",
    cat: "data",
    r: "Interactive dashboard for climate data analysis using Python and visualization libraries",
    tech: "Python, Pandas, NumPy, Plotly, Jupyter",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&fit=crop",
  },
  {
    t: "DialogueStream",
    c: "Real-time group chat app",
    cat: "fullstack",
    r: "Group chat application for multiple users in real-time",
    tech: "Node.js, Socket.io, React, Render",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&h=600&fit=crop",
    live: "https://dialoguestream-1.onrender.com/",
    github: "https://github.com/Hasan36arnob/DialogueStream",
  },
  {
    t: "GitHub User Finder",
    c: "GitHub user search tool",
    cat: "frontend",
    r: "Web application to find and display GitHub user profiles",
    tech: "React, GitHub API, Netlify",
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&h=600&fit=crop",
    live: "https://ghlens.netlify.app/",
    github: "https://github.com/Hasan36arnob/GhUserFinder",
  },
  // Update the Satota EV BD project in your projects array to:

{
  t: "Satota EV BD",
  c: "Electric vehicle website",
  cat: "frontend",
   r: "Website for Satota electric vehicles",
  tech: "HTML, CSS, JavaScript, Netlify",
  img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&h=600&fit=crop", // New EV/battery themed image
  live: null, // Temporarily disabled - link broken
  github: null, // Temporarily disabled - link broken
},
  {
    t: "Descharge",
    c: "Payment & billing platform",
    cat: "frontend",
    r: "Digital payment and billing solution platform",
    tech: "React, TailwindCSS, Netlify",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&h=600&fit=crop",
    live: "https://deshcharge.netlify.app/",
  },
  {
    t: "ClimateTech & Green Solutions",
    c: "Climate technology website",
    cat: "frontend",
    r: "Website showcasing climate tech and green solutions",
    tech: "HTML, CSS, JavaScript, Netlify",
    img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&h=600&fit=crop",
    live: "https://climatetechandgreensolutions.netlify.app/",
    github: "https://github.com/Hasan36arnob/climate-tech",
  },
];

const categories = [
  { id: "all", label: "All Works" },
  { id: "fullstack", label: "Full Stack Development" },
  { id: "frontend", label: "Frontend Development" },
  { id: "wordpress", label: "WordPress" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "design", label: "Graphic Design" },
  { id: "data", label: "Data Analysis" },
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
            DevdigitaX build custom development to brand your business and also marketing ideas to
            grow any business
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
            <div className="aspect-video relative">
              <img
                src={p.img}
                alt={p.t}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">
                {p.c}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-primary">{p.r}</p>
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