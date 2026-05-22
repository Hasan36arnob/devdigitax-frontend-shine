import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";
import { AnimatedCounter } from "@/components/ui/animations/AnimatedCounter";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { TiltCard } from "@/components/ui/animations/TiltCard";
import { getServices, getPortfolio } from "@/utils/data";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Sparkles,
  Star,
  Globe,
  Layout,
  ShoppingCart,
  TrendingUp,
  Palette,
  Phone,
  ExternalLink,
  Code2,
  Search,
} from "lucide-react";
import tasin from "@/assets/tasin.jpeg";
import kudzley from "@/assets/Kudzey.jpeg";
import tonmoy from "@/assets/tonmoy.jpeg";
import iqraam from "@/assets/iqraam.png";
import { WhatsAppIcon } from "@/components/Icons";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "DevdigitaX — Scale Your Brand Digitally" },
      {
        name: "description",
        content:
          "DevdigitaX helps you scale your brand digitally with custom development and strategic marketing that turns your online presence into your most powerful sales channel.",
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

const testimonials = [
  {
    name: "Tonmay Sen",
    role: "Founder, IT company",
    image: tonmoy,
    quote:
      "Working with DevdigitaX on our E-commerce platform was a game-changer. Professional, efficient, and truly understood our vision for our business.",
  },
  {
    name: "MD Iqramul Haque",
    role: "Founder, Bizway",
    image: iqraam,
    quote:
      "The Facebook ads campaign and branding strategy DevdigitaX delivered were outstanding. Our sales targets were not just met, but exceeded through their precise audience targeting.",
  },
  {
    name: "MD Tasin",
    role: "Founder, Norbex E-commerce",
    image: tasin,
    quote:
      "Expert execution and strategic growth. DevdigitaX is more than an agency; they are a true partner in building a scalable e-commerce business.",
  },
  {
    name: "Kudzley Mania",
    role: "Entrepreneur",
    image: kudzley,
    quote:
      "Highly professional team that delivers consistent quality. They've been instrumental in our digital growth strategy.",
  },
];

// Interactive 3D Dev & Marketing HUD Canvas Component
function RealDevMarketingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic state trackers
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / (width / 2)) * 0.25; // max 15 deg
      targetRotX = -(y / (height / 2)) * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Mock Code Snippets database
    const codeLines = [
      "const app = createServer();",
      "app.use(analyticsTracker);",
      "import { SEO } from 'devdigitax-seo';",
      "import { Website } from 'react-web';",
      "const campaign = new FacebookAds();",
      "campaign.target({ leads: 'high-intent' });",
      "const result = app.scaleUp({ roi: '5.4x' });",
      "console.log('ROI Target Met!');",
      "<Website convert={true} />"
    ];

    let codeCursor = 0;
    let typedCode: string[] = ["", "", "", "", ""];
    let lineIdx = 0;
    let charIdx = 0;

    // Fast typing simulation
    const typeInterval = setInterval(() => {
      if (lineIdx >= typedCode.length) {
        // Shift lines up
        typedCode.shift();
        typedCode.push("");
        lineIdx = typedCode.length - 1;
        charIdx = 0;
        codeCursor = (codeCursor + 1) % codeLines.length;
      }

      const targetLine = codeLines[codeCursor];
      if (charIdx < targetLine.length) {
        typedCode[lineIdx] += targetLine[charIdx];
        charIdx++;
      } else {
        lineIdx++;
      }
    }, 45);

    // Floating dynamic traffic particles
    interface TrafficNode {
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
    }
    const trafficParticles: TrafficNode[] = [];
    for (let i = 0; i < 15; i++) {
      trafficParticles.push({
        x: Math.random() * 260 - 130,
        y: Math.random() * 180 - 90,
        speed: 0.8 + Math.random() * 1.2,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.6
      });
    }

    // Active render loop
    const render = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth rotate ease
      curRotY += (targetRotY - curRotY) * 0.08;
      curRotX += (targetRotX - curRotX) * 0.08;

      const cx = width / 2;
      const cy = height / 2;

      // Projection projection matrix
      const project3D = (x: number, y: number, z: number) => {
        // Apply Y tilt
        const cosY = Math.cos(curRotY);
        const sinY = Math.sin(curRotY);
        let z1 = z * cosY - x * sinY;
        let x1 = z * sinY + x * cosY;

        // Apply X tilt
        const cosX = Math.cos(curRotX);
        const sinX = Math.sin(curRotX);
        let z2 = z1 * cosX - y * sinX;
        let y2 = z1 * sinX + y * cosX;

        // Perspective scaling
        const fov = 450;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale
        };
      };

      // 1. Draw Tech-Stack Blueprint Grid Background
      ctx.strokeStyle = "rgba(79, 110, 247, 0.03)";
      ctx.lineWidth = 1;
      for (let i = -200; i <= 200; i += 40) {
        // Vertical lines
        const p1 = project3D(i, -180, -100);
        const p2 = project3D(i, 180, -100);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Horizontal lines
        const p3 = project3D(-200, i, -100);
        const p4 = project3D(200, i, -100);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // 2. Draw responsive Web Dev wireframe (Browser Mockup)
      const bLeft = -150;
      const bRight = 150;
      const bTop = -100;
      const bBottom = 100;
      const zOffset = -20;

      const topLeft = project3D(bLeft, bTop, zOffset);
      const topRight = project3D(bRight, bTop, zOffset);
      const bottomLeft = project3D(bLeft, bBottom, zOffset);
      const bottomRight = project3D(bRight, bBottom, zOffset);

      // Main Glass Panel
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(bottomLeft.x, bottomLeft.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(15, 17, 23, 0.75)";
      ctx.fill();
      ctx.strokeStyle = "rgba(79, 110, 247, 0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Browser Header Window Bar
      const headerBarBottom = project3D(bRight, bTop + 24, zOffset);
      const headerBarLeft = project3D(bLeft, bTop + 24, zOffset);
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(headerBarBottom.x, headerBarBottom.y);
      ctx.lineTo(headerBarLeft.x, headerBarLeft.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(25, 29, 41, 0.9)";
      ctx.fill();
      ctx.stroke();

      // Browser Control Dots
      const dot1 = project3D(bLeft + 12, bTop + 12, zOffset);
      const dot2 = project3D(bLeft + 22, bTop + 12, zOffset);
      const dot3 = project3D(bLeft + 32, bTop + 12, zOffset);

      ctx.beginPath(); ctx.arc(dot1.x, dot1.y, 2.5 * dot1.scale, 0, Math.PI * 2); ctx.fillStyle = "rgba(224, 82, 82, 0.8)"; ctx.fill();
      ctx.beginPath(); ctx.arc(dot2.x, dot2.y, 2.5 * dot2.scale, 0, Math.PI * 2); ctx.fillStyle = "rgba(245, 158, 11, 0.8)"; ctx.fill();
      ctx.beginPath(); ctx.arc(dot3.x, dot3.y, 2.5 * dot3.scale, 0, Math.PI * 2); ctx.fillStyle = "rgba(16, 185, 129, 0.8)"; ctx.fill();

      // Browser URL bar
      const urlLeft = project3D(bLeft + 52, bTop + 12, zOffset);
      const urlRight = project3D(bRight - 20, bTop + 12, zOffset);
      ctx.beginPath();
      ctx.moveTo(urlLeft.x, urlLeft.y);
      ctx.lineTo(urlRight.x, urlRight.y);
      ctx.strokeStyle = "rgba(79, 110, 247, 0.15)";
      ctx.lineWidth = 10 * urlLeft.scale;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.lineCap = "butt"; // reset

      // URL text
      ctx.fillStyle = "rgba(79, 110, 247, 0.7)";
      ctx.font = `${Math.max(7, Math.round(7 * urlLeft.scale))}px monospace`;
      ctx.fillText("devdigitax.com/optimize", urlLeft.x + 8, urlLeft.y + 2.5);

      // Web Dev Wireframe Mock Grid
      const wHeader = project3D(bLeft + 20, bTop + 40, zOffset);
      ctx.fillStyle = "rgba(79, 110, 247, 0.15)";
      ctx.fillRect(wHeader.x, wHeader.y, 260 * wHeader.scale, 15 * wHeader.scale);

      // Grid Blocks representing dynamic structures
      for (let col = 0; col < 3; col++) {
        const gridX = bLeft + 20 + col * 90;
        const gridP = project3D(gridX, bTop + 65, zOffset);
        ctx.fillStyle = "rgba(79, 110, 247, 0.08)";
        ctx.fillRect(gridP.x, gridP.y, 80 * gridP.scale, 45 * gridP.scale);
        
        ctx.strokeStyle = "rgba(79, 110, 247, 0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(gridP.x, gridP.y, 80 * gridP.scale, 45 * gridP.scale);
      }

      // 3. Draw compiler console overlay (Web Dev)
      const cLeft = -130;
      const cRight = 10;
      const cTop = 20;
      const cBottom = 130;
      const zOffsetCode = 40; // parallax separation depth

      const cTL = project3D(cLeft, cTop, zOffsetCode);
      const cTR = project3D(cRight, cTop, zOffsetCode);
      const cBR = project3D(cRight, cBottom, zOffsetCode);
      const cBL = project3D(cLeft, cBottom, zOffsetCode);

      // Code console glass backplate
      ctx.beginPath();
      ctx.moveTo(cTL.x, cTL.y);
      ctx.lineTo(cTR.x, cTR.y);
      ctx.lineTo(cBR.x, cBR.y);
      ctx.lineTo(cBL.x, cBL.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(5, 5, 8, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(79, 110, 247, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // IDE/Terminal Title
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = `bold ${Math.max(8, Math.round(9 * cTL.scale))}px monospace`;
      ctx.fillText("engine_core.tsx", cTL.x + 10, cTL.y + 15);

      // Draw typing compilers code lines
      ctx.font = `${Math.max(7, Math.round(7.5 * cTL.scale))}px monospace`;
      typedCode.forEach((line, index) => {
        const lineP = project3D(cLeft + 10, cTop + 32 + index * 16, zOffsetCode);
        
        // Coloring syntax to simulate real IDE structure
        if (line.includes("const") || line.includes("import")) {
          ctx.fillStyle = "rgba(244, 63, 94, 0.9)"; // Red pink keywords
        } else if (line.includes("<") || line.includes("ROI")) {
          ctx.fillStyle = "rgba(16, 185, 129, 0.9)"; // Green indicators
        } else {
          ctx.fillStyle = "rgba(79, 110, 247, 0.9)"; // Blue identifiers
        }
        ctx.fillText(line, lineP.x, lineP.y);
      });

      // 4. Draw ROI/Marketing analytical growth soaring charts
      const graphLeft = -130;
      const graphRight = 160;
      const graphBottom = 75;
      const zOffsetGraph = 80; // Soars furthest forward in parallax

      // Coordinates for curve
      const pt1 = project3D(graphLeft, graphBottom, zOffsetGraph);
      const pt2 = project3D(graphLeft + 70, graphBottom - 20, zOffsetGraph);
      const pt3 = project3D(graphLeft + 140, graphBottom - 15, zOffsetGraph);
      const pt4 = project3D(graphLeft + 210, graphBottom - 95, zOffsetGraph);
      const pt5 = project3D(graphRight, graphBottom - 160, zOffsetGraph); // Peaks high

      // Pulse marketing growth gradient arrow
      ctx.beginPath();
      ctx.moveTo(pt1.x, pt1.y);
      ctx.bezierCurveTo(pt2.x, pt2.y, pt3.x, pt3.y, pt4.x, pt4.y);
      ctx.lineTo(pt5.x, pt5.y);
      
      ctx.strokeStyle = "rgba(37, 211, 102, 0.85)"; // Vibrant neon green
      ctx.lineWidth = 4 * pt1.scale;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(37, 211, 102, 1)";
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Flowing marketing traffic particles along the graph coordinates
      trafficParticles.forEach((p) => {
        p.x += p.speed;
        if (p.x > graphRight) {
          p.x = graphLeft;
        }

        // Interpolate Y value along bezier trajectory
        const t = (p.x - graphLeft) / (graphRight - graphLeft);
        // Simple cubic bezier estimation
        const cy = graphBottom - (Math.pow(t, 2.5) * 165);

        const partP = project3D(p.x, cy, zOffsetGraph);
        ctx.beginPath();
        ctx.arc(partP.x, partP.y, p.size * partP.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw peak data point (representing big ROI conversion peak)
      ctx.beginPath();
      ctx.arc(pt5.x, pt5.y, 6 * pt5.scale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(37, 211, 102, 1)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Real conversion metrics labels (The coolest, most money!)
      ctx.font = `bold ${Math.max(9, Math.round(11 * pt5.scale))}px monospace`;
      ctx.fillStyle = "#25D366";
      ctx.fillText("ROI: +540%", pt5.x + 12, pt5.y - 12);
      ctx.fillStyle = "#ffffff";
      ctx.font = `${Math.max(7, Math.round(8 * pt5.scale))}px monospace`;
      ctx.fillText("CONVERSIONS: +320%", pt5.x + 12, pt5.y + 1);

      // Low graph tag representing leads
      ctx.font = `bold ${Math.max(8, Math.round(8.5 * pt4.scale))}px monospace`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText("TRAFFIC: 14.2K/mo", pt4.x + 10, pt4.y + 4);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(typeInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />;
}

function Index() {
  const allProjects = getPortfolio();
  const featuredIds = ["r24", "r29", "r30", "r31", "r1", "r3"];
  const featuredProjects = featuredIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#07080c]"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Subtle grid indicators */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(var(--primary) 1.2px, transparent 1.2px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative w-full z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <Reveal delay={0} variant="fade-in-up" duration={0.6}>
                <span className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs md:text-sm font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> Scale Your Brand Digitally with DevdigitaX
                </span>
              </Reveal>

              {/* Instant-load bold authoritative titles */}
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                <span className="block mb-2 text-white">Next-Gen Development</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#4f6ef7] to-[#7b9cf5]">
                  and Strategic
                </span>
                <span className="block mt-2 text-white">Marketing Partner</span>
              </h1>

              <FadeIn delay={0.2} duration={0.8} scale={false} className="mt-6">
                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Built for businesses that demand real results. We create high-performance websites
                  that convert visitors into customers, and execute strategic marketing campaigns that
                  drive sustained revenue growth — from development to delivery. We specialize in WordPress, React,
                  Node.js, MongoDB, PHP, Laravel, JavaScript, and E-commerce development.
                </p>
              </FadeIn>

              <Reveal delay={0.45} variant="fade-in-up" duration={0.8} className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="btn-premium group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-primary-foreground transform hover:scale-[1.03] transition-all duration-300"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                >
                  Get Assessment{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="btn-premium inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold border border-border bg-card/10 hover:border-primary/50 hover:bg-card/30 transition-all"
                >
                  Explore Services
                </Link>
              </Reveal>

              <Reveal delay={0.6} variant="fade-in-up" duration={0.8} className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+8809638474596"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/30 hover:bg-accent/50 transition-all text-xs md:text-sm font-medium text-muted-foreground hover:text-white"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +880 9638-474596
                </a>
                <a
                  href="https://wa.me/8801837692110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/30 hover:bg-accent/50 transition-all text-xs md:text-sm font-medium text-muted-foreground hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 text-primary" />
                  +880 1837-692110
                </a>
              </Reveal>
            </div>

            {/* Right Interactive Web Dev & Marketing Canvas Column */}
            <div className="md:col-span-5 relative h-[380px] md:h-[450px] grid place-items-center">
              <div className="absolute -inset-10 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "var(--gradient-primary)" }} />
              <RealDevMarketingCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <Reveal variant="slide-up" className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Your Business Is Losing Customers Online.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Let's Fix That — for Good.
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
          DevdigitaX is your Next-Gen Development and Strategic Marketing Partner — built to turn
          your online presence into your most powerful sales channel.
        </p>
        <p className="mt-4 text-muted-foreground text-sm max-w-3xl mx-auto leading-relaxed">
          Every business deserves a digital presence that actually works. Not a website that sits
          there — but a system that attracts the right audience, communicates your value, and
          converts traffic into real revenue. We've been building those systems for businesses
          across every major industry.
        </p>
      </Reveal>

      {/* STATS */}
      <Reveal variant="fade-in" className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              400+ Businesses Grew With Us. Yours Can Be Next.
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              We're not the cheapest agency. We're the agency that makes your investment pay back —
              measurably, consistently, and at scale.
            </p>
          </div>
          <Stagger className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StaggerItem
                key={s.l}
                variant="scale"
                className="p-6 rounded-2xl border border-border bg-background/50 text-center hover:border-primary/30 transition-all duration-300"
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  <AnimatedCounter value={s.v} />
                </div>
                <div className="mt-3 text-xs text-muted-foreground leading-relaxed px-2">{s.l}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* PORTFOLIO SECTION */}
      <Reveal className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
             Our recent work
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Crafting Digital Success Stories
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore our latest projects across web development, SEO, and digital branding.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <StaggerItem
              key={project.id}
              variant="image"
              className="card-lift group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.client}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 text-white">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech
                    .split(",")
                    .slice(0, 4)
                    .map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md border border-border bg-muted/50 text-muted-foreground whitespace-nowrap"
                      >
                        {t.trim()}
                      </span>
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to="/portfolio"
                    className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Explore Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* WEBSITE LIFECYCLE */}
      <Reveal className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our process
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Website Development Life Cycle
          </h2>
          <p className="mt-4 text-muted-foreground">
            A clear, repeatable process that turns ideas into shipped, profitable products.
          </p>
        </div>
        <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {lifecycle.map((p) => (
            <StaggerItem
              key={p.n}
              variant="slide-up"
              className="p-6 rounded-2xl border border-border bg-card/40 hover:border-primary/50 transition duration-300"
            >
              <div
                className="text-4xl font-bold opacity-30"
                style={{ color: "oklch(0.55 0.24 262)" }}
              >
                {p.n}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* PATH */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              How we engage
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              From Discovery to Growth — A Clear, Proven Path
            </h2>
            <p className="mt-4 text-muted-foreground">
              No 12-week discovery phases. No vague timelines. Here's exactly how we work:
            </p>
          </div>
          <Stagger className="mt-12 space-y-4">
            {path.map((p, i) => (
              <StaggerItem
                key={p.t}
                variant="slide-up"
                className="p-6 rounded-2xl border border-border bg-background/50 flex gap-5 items-start hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className="h-10 w-10 shrink-0 grid place-items-center rounded-full font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{p.t}</h3>
                  <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{p.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-primary-foreground hover:scale-105 transition-transform duration-300"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* SERVICES */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              What we do
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Everything Your Business Needs to Win Online — Under One Roof
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fragmented vendors create fragmented results. Our team handles your entire digital
              ecosystem — strategy, design, development, traffic and conversion — so every part
              works together toward measurable growth.
            </p>
          </div>
          <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getServices().map(({ icon, title, description, slug }) => {
              const Icon =
                ({ Layout, Code2, ShoppingCart, Palette, Search, TrendingUp } as any)[icon] ||
                Layout;
              return (
                <StaggerItem
                  key={slug}
                  className="group p-8 rounded-2xl border border-border bg-background/50 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="h-12 w-12 grid place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{description}</p>
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: slug }}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                  >
                    Explore Service <ArrowRight className="h-4 w-4" />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              What our clients say
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
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
          <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="p-8 rounded-2xl border border-border bg-background/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-foreground text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover border border-primary/20"
                    />
                  ) : (
                    <div
                      className="h-10 w-10 rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  )}
                  <div>
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="max-w-7xl mx-auto px-6 py-24">
        <div
          className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.55_0.24_262/0.4),transparent_60%)]" />
          <div className="relative">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Experience real results
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Partner with DevdigitaX and scale your business.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Tell us where you want to be in 12 months. We'll map the path — and build it with you.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-primary-foreground hover:scale-105 transition-transform duration-300"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </SiteLayout>
  );
}