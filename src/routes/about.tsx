import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — DevdigitaX" },
      {
        name: "description",
        content:
          "DevdigitaX is a senior team of designers, engineers and marketers building digital growth systems.",
      },
    ],
  }),
});

const values = [
  {
    icon: Target,
    t: "Outcome-obsessed",
    d: "We measure ourselves by your revenue, not our deliverables.",
  },
  {
    icon: Heart,
    t: "Genuinely partnered",
    d: "We act like an in-house team because that's how the best work happens.",
  },
  {
    icon: Lightbulb,
    t: "Strategic by default",
    d: "Every pixel and line of code ladders up to a business goal.",
  },
  {
    icon: Users,
    t: "Senior-only team",
    d: "No juniors learning on your project. Real experts, every engagement.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            About us
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
            Built to help ambitious brands win online.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            DevdigitaX was founded on a simple belief: digital growth shouldn't be a black box. We
            bring senior strategists, designers, engineers and marketers together to build
            measurable systems for businesses that demand real results.
          </p>
        </div>
      </section>

      <section id="mission" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We believe digital growth should be transparent, measurable, and driven by actual
            business results. Our mission is to build systems that compound over time, delivering
            sustainable growth for our partners.
          </p>
        </div>
      </section>

      <section id="company" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Our Company</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Founded on the principle that businesses deserve better than black-box agencies,
            DevdigitaX brings together senior experts under one roof to solve real problems and move
            real revenue.
          </p>
        </div>
      </section>

      <section id="team" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Team</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Our team consists of seasoned professionals with decades of combined experience. We're
            strategists, designers, engineers, and marketers who've worked with startups to Fortune
            500 companies.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our values</h2>
          <p className="mt-4 text-muted-foreground">
            We operate on a few clear principles that guide every decision and deliverable.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today we partner with brands across Pakistan and beyond, helping them launch products,
            dominate search, and scale paid acquisition.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {values.map(({ icon: Icon, t, d }) => (
            <div key={t} className="p-6 rounded-2xl border border-border bg-card">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
