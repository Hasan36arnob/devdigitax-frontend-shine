import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  ArrowRight,
  Layout,
  Code2,
  ShoppingCart,
  Palette,
  Search,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    icon: Layout,
    t: "Professional Web Design & Development",
    d: "Your website isn't a brochure — it's your top salesperson. We build fast, conversion-focused websites designed around how local buyers think.",
    slug: "web-design",
  },
  {
    icon: Code2,
    t: "WordPress Website Development",
    d: "Clean, fast, fully customised WordPress websites that are easy to manage and built to scale. No bloat, no plugin headaches.",
    slug: "wordpress",
  },
  {
    icon: ShoppingCart,
    t: "eCommerce Website Development",
    d: "High-converting product pages, frictionless checkout, and systems that turn first-time buyers into repeat customers.",
    slug: "ecommerce",
  },
  {
    icon: Palette,
    t: "Graphics Design",
    d: "Beautiful logos, banners, flyers, posters, and everything in between. We create stunning visuals that capture your brand's essence and connect with your audience.",
    slug: "graphics-design",
  },
  {
    icon: Search,
    t: "Search Engine Optimization",
    d: "Technical optimisation, structured content and authority building — aligned with how your customers actually search.",
    slug: "seo",
  },
  {
    icon: TrendingUp,
    t: "Digital Marketing",
    d: "Facebook Ads campaigns targeting audiences who actually need your service. Comprehensive Google Ads marketing across search, display, and video. Strategic audience targeting that converts.",
    slug: "digital-marketing",
  },
];

export const Route = createFileRoute("/services/slug")({
  component: ServicePage,
});

function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Service not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The service you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Back to Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-12 w-12 grid place-items-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            {service.icon}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {service.t}
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">{service.d}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        >
          Back to services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </SiteLayout>
  );
}