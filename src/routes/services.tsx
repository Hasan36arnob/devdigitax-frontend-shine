import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Code2, Search, Megaphone, ShoppingBag, PenTool, BarChart3, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — DevdigitaX" },
      { name: "description", content: "Web development, SEO, paid ads, e-commerce, branding, and analytics — all under one roof." },
    ],
  }),
});

const services = [
  { icon: Code2, t: "Web Development", d: "Custom websites and web apps built on modern stacks — fast, accessible, conversion-focused.", points: ["Next.js / React builds", "Headless CMS", "Performance budgets"] },
  { icon: Search, t: "SEO", d: "Technical SEO, content strategy, and authority building that compounds.", points: ["Technical audits", "Content production", "Link acquisition"] },
  { icon: Megaphone, t: "Paid Media", d: "Meta, Google, TikTok and LinkedIn campaigns engineered for ROAS.", points: ["Creative testing", "Funnel design", "Tracking & attribution"] },
  { icon: ShoppingBag, t: "E-Commerce", d: "Shopify, WooCommerce and headless storefronts that scale.", points: ["Storefront design", "CRO", "Subscription & upsell flows"] },
  { icon: PenTool, t: "Brand & Design", d: "Identities, design systems and creative that win attention.", points: ["Brand identity", "UI design", "Motion & content"] },
  { icon: BarChart3, t: "Analytics", d: "GA4, server-side tracking and dashboards you actually use.", points: ["GA4 + GTM", "Server-side tagging", "Looker dashboards"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Services</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">A full-stack growth team in one studio.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Engineering, design and marketing — woven together so your brand actually moves.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-8">
        {services.map(({ icon: Icon, t, d, points }) => (
          <div key={t} className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition" style={{ transition: "var(--transition-smooth)" }}>
            <div className="flex items-start gap-5">
              <div className="h-14 w-14 grid place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {points.map(p => <li key={p} className="flex gap-2"><span className="text-primary">→</span>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
          Discuss your project <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}