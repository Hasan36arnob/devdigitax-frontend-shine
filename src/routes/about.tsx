import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";
import { AnimatedCounter } from "@/components/ui/animations/AnimatedCounter";
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  Award,
  Rocket,
  TrendingUp,
  Zap,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import arnobJoy from "@/assets/h.jpeg";
import shahriar from "@/assets/sv.jpeg";
import hafiz from "@/assets/hafiz.jpeg";
import giasU from "@/assets/giasU.jpeg";
import sz from "@/assets/sz.jpeg";
import mo from "@/assets/mo.jpeg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — DevdigitaX" },
      {
        name: "description",
        content:
          "DevdigitaX is a dedicated team of designers, engineers and marketers building digital growth systems.",
      },
    ],
  }),
});

const values = [
  {
    icon: Target,
    t: "Outcome-obsessed",
    d: "We measure ourselves by your revenue, not our deliverables.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    t: "Genuinely partnered",
    d: "We act like an in-house team because that's how the best work happens.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    t: "Strategic by default",
    d: "Every pixel and line of code ladders up to a business goal.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    t: "Dedicated builders",
    d: "Passionate creators committed to crafting the best solutions and growing alongside your business.",
    color: "from-purple-500 to-indigo-500",
  },
];

const stats = [
  { number: "400+", label: "Projects Delivered", icon: Award },
  { number: "98%", label: "Client Retention", icon: Heart },
  { number: "8+", label: "Years Average Team Experience", icon: Users },
  { number: "24/7", label: "Support Availability", icon: Zap },
];

import { getTeam } from "@/utils/data";

const why = [
  {
    t: "Custom Web Development",
    d: "We build fast, secure, and scalable websites tailored to your business needs. No bloatware or rigid templates—just clean code designed for performance and future growth.",
  },
  {
    t: "Conversion-Focused Design",
    d: "Your website is your top salesperson. We design intuitive, visually stunning interfaces rooted in user psychology to turn visitors into paying customers.",
  },
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
    t: "Dedicated Execution",
    d: "Direct access to the developers and marketers doing the work. No middle managers or outsourced templates — just dedicated people focused on your success.",
  },
];

const faqs = [
  {
    q: "What is your typical project timeline?",
    a: "Website development projects range from 4-12 weeks depending on complexity. Marketing campaigns launch within 2 weeks of strategy approval. We provide detailed timelines during our discovery phase and maintain transparent communication throughout.",
  },
  {
    q: "How do you measure and report on project success?",
    a: "We establish clear KPIs at project outset including conversion rates, traffic growth, revenue impact, and ROI. You'll receive weekly performance reports with actionable insights, and we adjust strategies based on real-time data to maximize results.",
  },
  {
    q: "What is your process for understanding our business needs?",
    a: "Our discovery process includes in-depth stakeholder interviews, competitor analysis, audience research, and current performance audits. We spend significant time understanding your goals, challenges, and market position before proposing solutions.",
  },
  {
    q: "How do you handle project communication and updates?",
    a: "You'll have direct access to the builders working on your project, not account managers. We provide weekly progress updates, milestone reviews, and maintain open channels for questions. Transparency is core to our client relationships.",
  },
  {
    q: "What happens if we're not satisfied with the results?",
    a: "Your satisfaction is our priority. If results don't meet agreed-upon KPIs, we'll revise our approach at no additional cost. Our revenue-first strategy ensures we're invested in your success, not just project completion.",
  },
  {
    q: "Do you offer custom solutions or only standard packages?",
    a: "Every engagement is custom-tailored to your specific business needs, goals, and budget. We don't believe in one-size-fits-all solutions. Our team crafts strategies specifically designed for your market position and growth objectives.",
  },
  {
    q: "What is your after-delivery support system?",
    a: "We provide comprehensive post-delivery support including 30-day free maintenance, 24/7 technical assistance, performance monitoring, security updates, and strategic optimization. Our dedicated support team ensures your digital assets continue performing at peak levels with proactive maintenance and rapid issue resolution.",
  },
  {
    q: "How do you stay current with the latest digital marketing and development trends?",
    a: "Our team invests heavily in continuous learning, attending industry conferences, conducting ongoing research, and maintaining partnerships with leading technology providers. We regularly audit and update our methodologies to leverage emerging best practices.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work across healthcare, real estate, retail, logistics, and e-commerce sectors. Our expertise spans from local businesses to enterprise-level organizations, adapting our strategies to each industry's unique challenges and opportunities.",
  },
  {
    q: "Do you provide ongoing maintenance and support after project completion?",
    a: "Yes, we offer comprehensive post-launch support including technical maintenance, content updates, performance monitoring, security patches, and strategic optimization. Our 98% client retention rate reflects our commitment to long-term partnerships.",
  },
  {
    q: "How do you ensure data security and client privacy?",
    a: "We implement enterprise-grade security protocols including SSL encryption, secure hosting, regular backups, and GDPR compliance. All client data is handled with strict confidentiality, and we never share proprietary information without explicit permission.",
  },
];

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const dynamicTeam = getTeam().filter((m) => !m.status || m.status === "published");

  const teamMembers =
    dynamicTeam.length > 0
      ? dynamicTeam
      : [
          {
            name: "Md Gias Uddin",
            role: "Advisor & Managing Director",
            bio: "Expert in business management solutions and strategic direction. Leads the company's vision and long-term growth strategy.",
            image: giasU,
          },
          {
            name: "Shahriar Mahmud",
            role: "CEO & Founder | WordPress Developer & Marketer",
            bio: "Expert WordPress developer creating custom themes, plugins, and optimized e-commerce solutions Create unique business ideas and client support & team management expert",
            image: shahriar,
          },
          {
            name: "Md Arnob Hasan Joy",
            role: "Co-Founder | Software Developer",
            bio: "Passionate software engineer specializing in modern web technologies and scalable backend solutions.",
            image: arnobJoy,
          },
          {
            name: "Hafiz Muhammad Leghari",
            role: "SEO Expert (2 years)",
            bio: "SEO specialist from Pakistan with expertise in search engine optimization, keyword research, and organic growth strategies.",
            image: hafiz,
          },
          {
            name: "Moin Uddin",
            role: "WordPress Elementor Developer",
            bio: "Skilled Pakistani WordPress Elementor developer specializing in modern, responsive, and user-friendly websites. Experienced in custom website design, speed optimization, bug fixing, and creating professional business websites with clean UI/UX.",
            image: mo,
          },
        ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Smooth scroll handler for hash links
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.24_262/0.15),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal variant="fade-in-up" className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
              Driving global businesses forward with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                cutting-edge digital solutions.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              DevdigitaX isn't just an agency. We're a dedicated team of designers, engineers and
              marketers who came together to build something better: a trusted growth
              partner that makes your success our top priority.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.label}
                variant="scale"
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500 hover:scale-105 group"
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Mission Section */}
      <Reveal id="mission" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Rocket className="h-4 w-4" />
            <span>Our Purpose</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent border border-primary/10">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe digital growth should be transparent, measurable, and directly tied to
              your business goals. Our mission is to build systems that compound over time,
              turning every website, campaign, and customer touchpoint into sustainable growth.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Company Section */}
      <Reveal
        id="company"
        className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl mt-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Who We Are</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Our Company</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Founded in 2018 to redefine digital partnerships, DevdigitaX is a trusted partner for
            businesses ready to scale online. We combine sharp strategy with technical excellence so
            every website, campaign, and launch delivers measurable impact.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">100% Project Success Rate</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">24/7 Dedicated Support</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Agile Development Process</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">Transparent Reporting</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Values Section */}
      <Reveal className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Heart className="h-4 w-4" />
              <span>Our Principles</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our values</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We operate on a few clear principles that guide every decision and deliverable,
              keeping every project focused on real business impact.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today, brands around the world trust us to launch products, win search, and scale paid
              acquisition.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">5+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">300+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm">400+ Projects</span>
              </div>
            </div>
          </div>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, t, d, color }, idx) => (
              <StaggerItem
                key={t}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-r ${color} p-2.5 text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-full w-full" />
                </div>
                <h3 className="font-semibold text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* WHY DEVDIGITAX */}
      <Reveal className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Award className="h-4 w-4" />
            <span>Why DevdigitaX</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Why The Most Ambitious Businesses Choose Us — And Stay Year After Year
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            There's no shortage of digital agencies. Here's what actually sets us apart:
          </p>
        </div>
        <Stagger className="mt-12 grid md:grid-cols-2 gap-6">
          {why.map((w) => (
            <StaggerItem
              key={w.t}
              className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{w.t}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{w.d}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* FAQ */}
      <Reveal className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Lightbulb className="h-4 w-4" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before working with us.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group p-6 rounded-2xl border border-border bg-card open:border-primary/40 transition duration-300"
              open={i === 0}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-base md:text-lg pr-4">{f.q}</h3>
                <span className="h-8 w-8 grid place-items-center rounded-full border border-border text-primary group-open:rotate-45 transition-transform duration-300 shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      {/* CTA Section */}
      <Reveal className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-12 text-center border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to turn your online presence into reliable growth?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Let's talk about the next growth chapter for your business.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 duration-300"
          >
            Start your growth conversation
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </SiteLayout>
  );
}
