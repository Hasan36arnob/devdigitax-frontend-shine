import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import devdigitaxfashion from "@/assets/devdigitaxfashion.png";
import yana from "@/assets/yana.png";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";

export const Route = createFileRoute("/fashion")({
  component: FashionPage,
  head: () => ({
    meta: [
      { title: "Fashion E-Commerce — DevdigitaX" },
      { name: "description", content: "Premium fashion e-commerce solutions with sophisticated design and seamless checkout." },
    ],
  }),
});

const fashionProjects = [
  {
    id: "client-1",
    title: "Yana Luxe",
    subtitle: "Luxury Fashion & Lifestyle",
    client: "Yana Luxe BD",
    category: "ecommerce",
    result: "Premium luxury e-commerce platform with curated collections and VIP experience",
    tech: "Next.js, React, TypeScript, TailwindCSS, Stripe, Inventory Management, Analytics",
    image: yana,
    live: "https://yanaluxebd.com/",
    isClient: true,
  },
  {
    id: "demo-4",
    title: "ÉLITE",
    subtitle: "Luxury Menswear Atelier",
    client: "DevDigitax Fashion",
    category: "ecommerce",
    result: "Premium e-commerce platform with sophisticated design and seamless checkout",
    tech: "React, Next.js, TailwindCSS, E-Commerce, Stripe Integration, Inventory Management",
    image: devdigitaxfashion,
    live: "https://devdigitaxfashion.netlify.app/",
    isClient: false,
  },
];

function FashionPage() {
  const PortfolioCard = ({ project }: { project: typeof fashionProjects[0] }) => (
    <StaggerItem
      className="group rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-700 hover:-translate-y-4 flex flex-col shadow-lg hover:shadow-2xl"
      style={{ boxShadow: "var(--shadow-elegant)" }}
    >
      <div className="overflow-hidden relative aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
          <p className="text-white text-sm font-medium line-clamp-2">{project.result}</p>
        </div>
        {project.isClient && (
          <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-full">
            Client Project
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-white">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
          )}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.client}</p>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.split(", ").slice(0, 3).map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium border border-primary/10">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 group/btn"
        >
          <span>View Live Fashion Store</span>
          <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </StaggerItem>
  );

  return (
    <SiteLayout>
      <section className="relative overflow-hidden py-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fashion E-Commerce Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Premium Fashion
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Digital Experiences
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From luxury brands to emerging designers, we create stunning e-commerce experiences that convert browsers into buyers.
          </p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid md:grid-cols-2 gap-6">
            {fashionProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all duration-300 group">
          <span>Launch Your Fashion Store</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </section>
    </SiteLayout>
  );
}