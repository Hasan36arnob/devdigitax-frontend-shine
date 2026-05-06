import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Code2, Search, Megaphone, ShoppingBag, PenTool, BarChart3, CheckCircle2, Sparkles, Star } from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Code2, title: "Web Development", desc: "Lightning-fast, SEO-ready websites engineered to convert visitors into customers." },
  { icon: Search, title: "Search Engine Optimization", desc: "Rank where your customers are searching — and stay there." },
  { icon: Megaphone, title: "Social Media Ads", desc: "Performance campaigns on Meta, Google & TikTok with real ROAS." },
  { icon: ShoppingBag, title: "E-Commerce Solutions", desc: "Shopify and custom storefronts built for scale and revenue." },
  { icon: PenTool, title: "Branding & Design", desc: "Identities, UI and creative that make your brand impossible to ignore." },
  { icon: BarChart3, title: "Analytics & Growth", desc: "Data infrastructure that tells you what's working — and what to do next." },
];

const stats = [
  { v: "200+", l: "Projects Delivered" },
  { v: "8+", l: "Years of Experience" },
  { v: "98%", l: "Client Retention" },
  { v: "12x", l: "Avg. ROAS" },
];

const process = [
  { n: "01", t: "Discover", d: "We learn your business, audience and growth bottlenecks." },
  { n: "02", t: "Strategy", d: "A clear roadmap aligned to revenue, not vanity metrics." },
  { n: "03", t: "Execute", d: "Design, build and launch — fast, polished, on-brand." },
  { n: "04", t: "Scale", d: "Iterate based on data and compound your results." },
];

const testimonials = [
  { name: "Ayesha Khan", role: "Founder, Bloomly", quote: "DevdigitaX rebuilt our funnel and 3x'd qualified leads in two months." },
  { name: "Hassan Raza", role: "CEO, NorthGear", quote: "The most reliable digital partner we've worked with. Real results, every quarter." },
  { name: "Sara Malik", role: "CMO, Lumora", quote: "Strategy, execution, communication — top-tier across the board." },
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
              <Sparkles className="h-3.5 w-3.5" /> Pakistan's results-driven agency
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              We Build Digital Experiences That{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                Drive Real Revenue
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              DevdigitaX is a web development & digital marketing studio building high-performance websites, brands and growth systems for ambitious companies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                Get a Free Audit <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-border hover:border-primary transition">
                Explore Services
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background" style={{ background: `linear-gradient(135deg, oklch(0.55 0.24 ${240+i*15}), oklch(0.7 0.2 ${260+i*10}))` }} />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
                <span>Trusted by 200+ growing brands</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-3xl opacity-50" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative aspect-square rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-10 grid place-items-center"
              style={{ boxShadow: "var(--shadow-elegant)" }}>
              <img src={logo} alt="DevdigitaX" className="w-full max-w-sm rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.l} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">What we do</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Everything you need to win online.</h2>
          <p className="mt-4 text-muted-foreground">From your first landing page to a scaled multi-channel growth engine.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1"
              style={{ transition: "var(--transition-smooth)" }}>
              <div className="h-12 w-12 grid place-items-center rounded-xl mb-5 text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">How we work</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">A proven process. Predictable results.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-4 gap-6">
            {process.map(p => (
              <div key={p.n} className="p-8 rounded-2xl border border-border bg-background relative overflow-hidden">
                <div className="text-5xl font-bold opacity-20" style={{ color: "oklch(0.55 0.24 262)" }}>{p.n}</div>
                <h3 className="mt-3 text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why DevdigitaX</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Your growth partner — not just another vendor.</h2>
          <p className="mt-4 text-muted-foreground">We obsess over outcomes, not deliverables. Every project ships with measurable goals, transparent reporting, and a team that picks up the phone.</p>
          <ul className="mt-8 space-y-4">
            {["Senior, in-house team — no outsourcing", "Performance-based reporting every two weeks", "Conversion-first design system", "Long-term partnership model"].map(t => (
              <li key={t} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-30" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative rounded-3xl border border-border bg-card p-10" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { v: "+312%", l: "Avg. organic traffic" },
                { v: "+187%", l: "Conversion uplift" },
                { v: "<1.2s", l: "Page load times" },
                { v: "24/7", l: "Support & monitoring" },
              ].map(k => (
                <div key={k.l} className="p-5 rounded-xl bg-background border border-border">
                  <div className="text-2xl font-bold text-primary">{k.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Client love</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Real teams. Real results.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="p-8 rounded-2xl border border-border bg-background">
                <div className="flex gap-0.5 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-4 text-foreground">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full" style={{ background: "var(--gradient-primary)" }} />
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

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.55_0.24_262/0.4),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to grow with DevdigitaX?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Tell us where you want to be in 12 months. We'll map the path — and build it with you.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
