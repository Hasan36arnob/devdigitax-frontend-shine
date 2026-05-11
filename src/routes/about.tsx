import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
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
    t: "Senior-only team",
    d: "No juniors learning on your project. Real experts, every engagement.",
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

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const dynamicTeam = getTeam().filter(m => !m.status || m.status === 'published');

  const teamMembers = dynamicTeam.length > 0 ? dynamicTeam : [
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
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider animate-fade-in">
            About us
          </span>
          <h1
            className={`mt-3 text-4xl md:text-6xl font-bold tracking-tight transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Built to help ambitious brands win online.
          </h1>
          <p
            className={`mt-6 text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            DevdigitaX was founded on a simple belief: digital growth shouldn't be a black box. We
            bring senior strategists, designers, engineers and marketers together to build
            measurable systems for businesses that demand real results.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500 hover:scale-105 group ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
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
              We believe digital growth should be transparent, measurable, and driven by actual
              business results. Our mission is to build systems that compound over time, delivering
              sustainable growth for our partners.
            </p>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section
        id="company"
        className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl my-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Who We Are</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Our Company</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Founded in 2018 with a vision to redefine digital agency partnerships, DevdigitaX has
            grown into a trusted partner for businesses across the globe. We combine strategic
            thinking with technical excellence to deliver measurable results.
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
      </section>

      {/* Team Section */}
      {/* 
      <section id="team" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Users className="h-4 w-4" />
            <span>Meet The Team</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A collective of passionate experts dedicated to your success.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={member.name}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:scale-105"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-muted/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mt-1 font-medium">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Heart className="h-4 w-4" />
              <span>Our Principles</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our values</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We operate on a few clear principles that guide every decision and deliverable.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we partner with brands across the globe, helping them launch products, dominate
              search, and scale paid acquisition.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, t, d, color }, idx) => (
              <div
                key={t}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-r ${color} p-2.5 text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-full w-full" />
                </div>
                <h3 className="font-semibold text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-12 text-center border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to grow together?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
          >
            Start a conversation
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
