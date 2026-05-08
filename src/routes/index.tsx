import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  ArrowRight,
  Code2,
  Search,
  CheckCircle2,
  Sparkles,
  Star,
  Globe,
  Layout,
  ShoppingCart,
  TrendingUp,
  Share2,
  Palette,
  Phone,
} from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";
import { WhatsAppIcon } from "@/components/Icons";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DevdigitaX — Trusted Web Development & Digital Marketing Agency" },
      {
        name: "description",
        content:
          "DevdigitaX is a results-driven web development and digital marketing agency — built to turn your online presence into your most powerful sales channel.",
      },
    ],
  }),
});

const stats = [
  { v: "8+", l: "Years of digital marketing & web development experience" },
  { v: "400+", l: "Projects delivered across web, SEO, paid media and ecommerce" },
  { v: "15+", l: "Industries served — healthcare, real estate, retail and logistics" },
  { v: "98%", l: "Client retention rate — your growth is our accountability" },
];

const lifecycle = [
  {
    n: "01",
    t: "Gathering Information",
    d: "We gather requirements from our clients to produce maximum output aligned with customer satisfaction.",
  },
  {
    n: "02",
    t: "Planning",
    d: "We plan the structure, sitemap and user journey — giving you a clear picture of the entire site before we build.",
  },
  {
    n: "03",
    t: "Design",
    d: "We shape the visual identity — typography, imagery, motion and UI — tuned to convert.",
  },
  {
    n: "04",
    t: "Content",
    d: "Every section is written clearly to communicate your value to the audience.",
  },
  {
    n: "05",
    t: "Coding",
    d: "We turn the designs into a clean, fast, scalable, future-ready codebase.",
  },
  {
    n: "06",
    t: "Testing",
    d: "Every function, breakpoint and integration is tested for maximum reliability.",
  },
  {
    n: "07",
    t: "Launching",
    d: "We ship to production, monitor and iterate based on real user feedback.",
  },
  {
    n: "08",
    t: "Support & Maintenance",
    d: "We provide ongoing technical support, security updates, and performance monitoring to keep your site running at its peak.",
  },
];

const path = [
  {
    t: "Discovery Call",
    d: "We learn your business, your customers, and what growth looks like for you. No pitch decks — just listening.",
  },
  {
    t: "Growth Strategy",
    d: "A custom strategy tied to your goals and budget, with projected outcomes and a measurement framework.",
  },
  {
    t: "Execution",
    d: "Our team moves fast. Direct access to the people doing the work — not just account managers.",
  },
  {
    t: "Measurement & Reporting",
    d: "We track leads, conversions, CPA and revenue impact. Reports written in plain language.",
  },
  {
    t: "Optimise & Scale",
    d: "What works gets scaled. What doesn't gets replaced. Campaigns get sharper and more profitable over time.",
  },
];

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

const why = [
  {
    t: "We Start With Your Revenue, Not Your Traffic",
    d: "Every campaign, page and decision is tied to downstream revenue. If a tactic can't be connected to leads or sales, we don't do it.",
  },
  {
    t: "Strategy Built Around You",
    d: "No off-the-shelf SEO or templated ads. Every engagement starts with understanding your market, buyers and competition.",
  },
  {
    t: "We Understand the Market Strategy",
    d: "Targeted Facebook Ads campaigns reaching audiences who actually need your service. Comprehensive Google Ads marketing across search, display, and video. Strategic audience targeting that converts.",
  },
  {
    t: "Transparent Communication",
    d: "You'll always know what we're working on, what results we're seeing and where your budget is going. If something isn't working, we tell you first.",
  },
  {
    t: "We Stay. We Grow With You.",
    d: "Our 98% retention rate is the result of treating every relationship as a long-term partnership.",
  },
  {
    t: "Senior-Level Execution",
    d: "Direct access to the experts doing the work. No junior account managers or offshore outsourcing. You work with a senior team committed to your success.",
  },
];

const faqs = [
  {
    q: "How long before we see real results?",
    a: "Paid campaigns can generate leads within 7–14 days. SEO compounds — meaningful organic growth typically appears in 3–4 months and accelerates by month 6. We set honest expectations on the strategy call.",
  },
  {
    q: "Do you work with small businesses and startups, or only large companies?",
    a: "Both. We work with ambitious startups, growing SMEs and established brands. What matters is the commitment to growth — not the company size.",
  },
  {
    q: "What makes you different from other digital agencies?",
    a: "Senior-only team, revenue-first strategy, transparent reporting, and a 98% retention rate. We don't sell deliverables — we deliver outcomes.",
  },
  {
    q: "What does it cost to work with DevdigitaX?",
    a: "Pricing depends on scope. After the discovery call we share a clear proposal with deliverables, timeline and projected outcomes — no hidden fees.",
  },
  {
    q: "Can you handle web development and digital marketing together?",
    a: "Yes — that's our core advantage. One integrated team handling strategy, design, development, traffic and conversion under one roof.",
  },
  {
    q: "Will I have direct access to the people working on my account?",
    a: "Always. You communicate directly with the strategists, designers and engineers building your project — not gatekeepers.",
  },
];

const testimonials = [
  {
    name: "Tanvir Ahmed",
    role: "Founder, Bloomly Dhaka",
    quote: "One of the most interactive digital teams. Very professional and cooperative attitude.",
  },
  {
    name: "Sumaiya Karim",
    role: "CEO, NorthGear BD",
    quote:
      "The best web development team in Dhaka. We worked with DevdigitaX and got incredible results.",
  },
  {
    name: "Rakib Hasan",
    role: "CMO, Lumora",
    quote:
      "DevdigitaX is the best SEO agency we've hired. 100% satisfied with the team and the results.",
  },
  {
    name: "Nadia Rahman",
    role: "Director, Pulse Fitness",
    quote: "Best digital marketing agency. The strategy and execution are top-tier.",
  },
  {
    name: "Imran Chowdhury",
    role: "Owner, Mira Furniture",
    quote: "We've worked with this agency and the experience has been excellent — Alhamdulillah.",
  },
  {
    name: "Sadia Islam",
    role: "Head of Growth, Vault",
    quote: "Truly a great SEO and growth partner. They understand the local market.",
  },
  {
    name: "James Wilson",
    role: "CEO, TechFlow UK",
    quote: "Outstanding web development and SEO services. Our traffic increased 300% in 6 months.",
  },
  {
    name: "Sarah Chen",
    role: "Founder, GlobalTrade Singapore",
    quote: "Professional, responsive, and delivered beyond expectations. Highly recommended!",
  },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-40 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Trusted Web Development & Digital Marketing
              Agency
            </span>
            <p className="mt-4 text-lg text-muted-foreground">
              DevdigitaX creates custom development solutions to brand your business and marketing
              strategies to grow any business.
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Your trusted Development &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                marketing agency.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Built for businesses that demand real results. We create high-performance websites
              that convert visitors into customers, and execute strategic marketing campaigns that
              drive sustained revenue growth — from development to delivery. We specialize in React, Node.js, MongoDB, PHP,
              JavaScript, and E-commerce development.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                Get a Free Audit{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-border hover:border-primary transition"
              >
                Explore Services
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:+8809638474596"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 hover:bg-accent transition-all text-sm font-medium"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +880 9638-474596
                </a>
                <a
                  href="https://wa.me/8801837692110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 hover:bg-accent transition-all text-sm font-medium"
                >
                  <WhatsAppIcon className="h-4 w-4 text-primary" />
                  +880 1837-692110
                </a>
              </div>
            </div>

          </div>
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-3xl opacity-50"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="relative aspect-square rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-10 grid place-items-center"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <img src={logo} alt="DevdigitaX" className="w-full max-w-sm rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Your Business Is Losing Customers Online.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Let's Fix That — for Good.
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg">
          DevdigitaX is a results-driven digital marketing and web development agency — built to
          turn your online presence into your most powerful sales channel.
        </p>
        <p className="mt-4 text-muted-foreground">
          Every business deserves a digital presence that actually works. Not a website that sits
          there — but a system that attracts the right audience, communicates your value, and
          converts traffic into real revenue. We've been building those systems for businesses
          across every major industry.
        </p>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              400+ Businesses Grew With Us. Yours Can Be Next.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We're not the cheapest agency. We're the agency that makes your investment pay back —
              measurably, consistently, and at scale.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.l}
                className="p-6 rounded-2xl border border-border bg-background text-center"
              >
                <div
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {s.v}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEBSITE LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our process
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Website Development Life Cycle
          </h2>
          <p className="mt-4 text-muted-foreground">
            A clear, repeatable process that turns ideas into shipped, profitable products.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {lifecycle.map((p) => (
            <div
              key={p.n}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition"
              style={{ transition: "var(--transition-smooth)" }}
            >
              <div
                className="text-4xl font-bold opacity-30"
                style={{ color: "oklch(0.55 0.24 262)" }}
              >
                {p.n}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PATH */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              How we engage
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              From Discovery to Growth — A Clear, Proven Path
            </h2>
            <p className="mt-4 text-muted-foreground">
              No 12-week discovery phases. No vague timelines. Here's exactly how we work:
            </p>
          </div>
          <div className="mt-12 space-y-4">
            {path.map((p, i) => (
              <div
                key={p.t}
                className="p-6 rounded-2xl border border-border bg-background flex gap-5 items-start"
              >
                <div
                  className="h-10 w-10 shrink-0 grid place-items-center rounded-full font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{p.t}</h3>
                  <p className="mt-1 text-muted-foreground">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION / TEAM / VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-6">
        {[
          {
            Icon: Globe,
            t: "Our Mission",
            d: "To deliver web development and digital marketing solutions that generate real, measurable business growth — without compromise on quality, transparency, or partnership.",
          },
          {
            Icon: Share2,
            t: "Expert Team",
            d: "Designers who build with conversion psychology in mind. Developers who write clean, scalable code. SEO strategists who understand local search landscape. Paid ads experts who treat every dollar of your budget like their own.",
          },
          {
            Icon: CheckCircle2,
            t: "Our Values",
            d: "Honesty. Accountability. Excellence. We tell clients what they need to hear — not what they want to hear. We own our mistakes and fix them fast.",
          },
        ].map(({ Icon, t, d }) => (
          <div key={t} className="p-8 rounded-2xl border border-border bg-card">
            <div
              className="h-12 w-12 grid place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{t}</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              What we do
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Everything Your Business Needs to Win Online — Under One Roof
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fragmented vendors create fragmented results. Our team handles your entire digital
              ecosystem — strategy, design, development, traffic and conversion — so every part
              works together toward measurable growth.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, t, d, slug }) => (
              <div
                key={t}
                className="group p-8 rounded-2xl border border-border bg-background hover:border-primary/50 hover:-translate-y-1 transition-all"
                style={{ transition: "var(--transition-smooth)" }}
              >
                <div
                  className="h-12 w-12 grid place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{d}</p>
                <Link
                  to={`/services/${slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Why DevdigitaX
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Why The Most Ambitious Businesses Choose Us — And Stay Year After Year
          </h2>
          <p className="mt-4 text-muted-foreground">
            There's no shortage of digital agencies. Here's what actually sets us apart:
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {why.map((w) => (
            <div key={w.t} className="p-8 rounded-2xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{w.t}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{w.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              What our clients say
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Real teams. Real results.
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              30+ Google reviews
            </div>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl border border-border bg-background">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-foreground text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group p-6 rounded-2xl border border-border bg-card open:border-primary/40 transition"
              open={i === 0}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-base md:text-lg pr-4">{f.q}</h3>
                <span className="h-8 w-8 grid place-items-center rounded-full border border-border text-primary group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div
          className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.55_0.24_262/0.4),transparent_60%)]" />
          <div className="relative">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Experience real results
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Partner with DevdigitaX and scale your business.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Tell us where you want to be in 12 months. We'll map the path — and build it with you.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
