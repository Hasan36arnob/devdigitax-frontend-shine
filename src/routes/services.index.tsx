import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Layout, Code2, ShoppingCart, Palette, Search, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — DevdigitaX" },
      {
        name: "description",
        content:
          "Everything your business needs to win online — web design, WordPress, eCommerce, graphics design, SEO, and digital marketing.",
      },
    ],
  }),
});

import { getServices } from "@/utils/data";

function ServicesPage() {
  const services = getServices();
  const IconMap: Record<string, any> = { Layout, Code2, ShoppingCart, Palette, Search, TrendingUp };
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden animate-fade-in" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-40 text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
            Our Services
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Everything Your Business Needs to Win Online
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Fragmented vendors create fragmented results. Our team handles your entire digital
            ecosystem — strategy, design, development, traffic and conversion — so every part works
            together toward measurable growth.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 reveal">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map(({ icon, title, description, slug }) => {
            const Icon = IconMap[icon] || Layout;
            const geoTitle = `${title} in Dhaka`;
            return (
              <div key={slug} className="flex flex-col">
                <h2 className="mb-4 text-xl md:text-2xl font-bold text-foreground/90">
                  {geoTitle}
                </h2>
                <div className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex-1">
                  <div className="p-8">
                    <div
                      className="h-12 w-12 grid place-items-center rounded-xl text-primary-foreground"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                    <Link
                      to="/services/$serviceId"
                      params={{ serviceId: slug }}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                    >
                      Explore Service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card/30 border-y border-border reveal">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Not sure which service is right for you?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Book a free consultation and we'll help you identify the best strategy for your business
            goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
          >
            Claim Your Growth Blueprint <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
