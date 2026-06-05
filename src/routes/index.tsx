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
  Zap,
  BarChart3,
  Layers,
  Target,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
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

// ----------------------------------------------------------------------
// ENHANCED 3D DEV & MARKETING HUD CANVAS – 100% AWESOME CLIENT MAGNET
// ----------------------------------------------------------------------
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

    // ---- INTERACTIVE 3D ROTATION ----
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / (width / 2)) * 0.35; // stronger tilt
      targetRotX = -(y / (height / 2)) * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ---- DYNAMIC CODE TYPING ----
    const codeSnippets = [
      "import {SEO} from 'devdigitax';",
      "const pipeline = new AdPipeline();",
      "pipeline.optimize({budget:5000});",
      "app.use('/growth', scaleHandler);",
      "console.log('ROI: +540%');",
      "await deployToProd({env:'scale'});",
      "trackConversion('lead','high');",
      "campaign.retarget('abandoned');",
      "createABTest('hero','cta');",
    ];
    let typedLines: string[] = ["", "", "", "", "", ""];
    let snippetIndex = 0;
    let lineIndex = 0;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (lineIndex >= typedLines.length) {
        typedLines.shift();
        typedLines.push("");
        lineIndex = typedLines.length - 1;
        charIndex = 0;
        snippetIndex = (snippetIndex + 1) % codeSnippets.length;
      }
      const target = codeSnippets[snippetIndex];
      if (charIndex < target.length) {
        typedLines[lineIndex] += target[charIndex];
        charIndex++;
      } else {
        lineIndex++;
      }
    }, 40);

    // ---- FLOATING MARKETING PARTICLES ----
    interface Particle {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      size: number; color: string; opacity: number;
    }
    const particles: Particle[] = [];
    const colors = ["#4f6ef7", "#25D366", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        vz: (Math.random() - 0.5) * 0.8,
        size: 1.5 + Math.random() * 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.4 + Math.random() * 0.6,
      });
    }

    // ---- 3D PROJECTION HELPER ----
    const project = (x: number, y: number, z: number) => {
      const cosY = Math.cos(curRotY), sinY = Math.sin(curRotY);
      const cosX = Math.cos(curRotX), sinX = Math.sin(curRotX);
      let z1 = z * cosY - x * sinY;
      let x1 = z * sinY + x * cosY;
      let z2 = z1 * cosX - y * sinX;
      let y2 = z1 * sinX + y * cosX;
      const fov = 500;
      const scale = fov / (fov + z2);
      return { x: width/2 + x1 * scale, y: height/2 + y2 * scale, scale };
    };

    // ---- RENDER LOOP ----
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      curRotY += (targetRotY - curRotY) * 0.06;
      curRotX += (targetRotX - curRotX) * 0.06;

      // 1. Dynamic Grid Background
      ctx.strokeStyle = "rgba(79,110,247,0.04)";
      ctx.lineWidth = 0.8;
      for (let i = -260; i <= 260; i += 45) {
        const p1 = project(i, -200, -120);
        const p2 = project(i, 200, -120);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        const p3 = project(-260, i, -120);
        const p4 = project(260, i, -120);
        ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
      }

      // 2. Central DEV DASHBOARD (Web Mockup)
      const bL = -170, bR = 170, bT = -115, bB = 115, zBase = -30;
      const tl = project(bL, bT, zBase), tr = project(bR, bT, zBase);
      const bl = project(bL, bB, zBase), br = project(bR, bB, zBase);
      
      ctx.beginPath();
      ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(8,10,18,0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(79,110,247,0.35)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Browser header
      const headerBot = project(bR, bT+28, zBase);
      const headerLeft = project(bL, bT+28, zBase);
      ctx.beginPath();
      ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(headerBot.x, headerBot.y); ctx.lineTo(headerLeft.x, headerLeft.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(18,22,35,0.95)";
      ctx.fill();
      
      // Dots & URL bar
      const dot1 = project(bL+14, bT+14, zBase);
      const dot2 = project(bL+28, bT+14, zBase);
      const dot3 = project(bL+42, bT+14, zBase);
      [dot1,dot2,dot3].forEach((d,i) => {
        ctx.beginPath(); ctx.arc(d.x, d.y, 3*d.scale, 0, Math.PI*2);
        ctx.fillStyle = i===0?"#EF4444":i===1?"#F59E0B":"#10B981";
        ctx.fill();
      });
      
      const urlL = project(bL+58, bT+14, zBase);
      const urlR = project(bR-30, bT+14, zBase);
      ctx.beginPath(); ctx.moveTo(urlL.x, urlL.y); ctx.lineTo(urlR.x, urlR.y);
      ctx.strokeStyle = "rgba(79,110,247,0.2)"; ctx.lineWidth = 11*urlL.scale;
      ctx.lineCap="round"; ctx.stroke(); ctx.lineCap="butt";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = `${Math.max(8, 9*urlL.scale)}px monospace`;
      ctx.fillText("devdigitax.com/dashboard", urlL.x+8, urlL.y+4);

      // Dev widgets inside mockup
      const widgetY = bT+44;
      for (let col=0; col<3; col++) {
        const wx = bL+18 + col*105;
        const wp = project(wx, widgetY, zBase);
        ctx.fillStyle = "rgba(79,110,247,0.06)";
        ctx.fillRect(wp.x, wp.y, 92*wp.scale, 55*wp.scale);
        ctx.strokeStyle = "rgba(79,110,247,0.2)";
        ctx.strokeRect(wp.x, wp.y, 92*wp.scale, 55*wp.scale);
        // fake chart lines
        ctx.beginPath();
        for (let i=0;i<8;i++) {
          const px = wp.x + i*13*wp.scale;
          const py = wp.y + (20 + Math.sin(i*1.2)*12)*wp.scale;
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.strokeStyle = col===0?"#4f6ef7":col===1?"#25D366":"#F59E0B";
        ctx.lineWidth = 1.8*wp.scale;
        ctx.stroke();
      }

      // 3. MARKETING ANALYTICS PANEL (Right side floating)
      const mBaseZ = 60;
      const mL = -190, mR = 0, mT = -90, mB = 90;
      const mtl = project(mL, mT, mBaseZ), mtr = project(mR, mT, mBaseZ);
      const mbl = project(mL, mB, mBaseZ), mbr = project(mR, mB, mBaseZ);
      
      ctx.beginPath();
      ctx.moveTo(mtl.x, mtl.y); ctx.lineTo(mtr.x, mtr.y);
      ctx.lineTo(mbr.x, mbr.y); ctx.lineTo(mbl.x, mbl.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(5,8,15,0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(37,211,102,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ROI Growth Chart inside marketing panel
      const graphL = mL+30, graphR = mR-30, graphB = mB-25, graphT = mT+30;
      const gPoints = [];
      for (let i=0; i<=12; i++) {
        const gx = graphL + (i/12)*(graphR-graphL);
        const gy = graphB - (Math.pow(i/12, 1.8)* (graphB-graphT)) + Math.sin(i*1.5)*8;
        gPoints.push(project(gx, gy, mBaseZ+15));
      }
      
      ctx.beginPath();
      ctx.moveTo(gPoints[0].x, gPoints[0].y);
      for (let i=1; i<gPoints.length; i++) {
        ctx.lineTo(gPoints[i].x, gPoints[i].y);
      }
      ctx.strokeStyle = "#25D366";
      ctx.lineWidth = 3.5*gPoints[0].scale;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(37,211,102,0.9)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Peak ROI callout
      const peak = gPoints[gPoints.length-1];
      ctx.beginPath(); ctx.arc(peak.x, peak.y, 7*peak.scale, 0, 2*Math.PI);
      ctx.fillStyle = "#fff"; ctx.shadowBlur=18; ctx.shadowColor="#25D366"; ctx.fill(); ctx.shadowBlur=0;
      ctx.fillStyle = "#25D366"; ctx.font = `bold ${Math.max(9,12*peak.scale)}px monospace`;
      ctx.fillText("ROI +540%", peak.x+14, peak.y-8);
      ctx.fillStyle = "#fff"; ctx.font = `${Math.max(7,9*peak.scale)}px monospace`;
      ctx.fillText("Leads +320%", peak.x+14, peak.y+8);

      // 4. Floating code console (bottom left overlay)
      const cZ = 90;
      const cL = -180, cR = 10, cT = 30, cB = 150;
      const ctl = project(cL, cT, cZ), ctr = project(cR, cT, cZ);
      const cbl = project(cL, cB, cZ), cbr = project(cR, cB, cZ);
      ctx.beginPath();
      ctx.moveTo(ctl.x, ctl.y); ctx.lineTo(ctr.x, ctr.y);
      ctx.lineTo(cbr.x, cbr.y); ctx.lineTo(cbl.x, cbl.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(2,2,8,0.92)"; ctx.fill();
      ctx.strokeStyle = "rgba(139,92,246,0.55)"; ctx.lineWidth=2; ctx.stroke();
      
      ctx.fillStyle = "#8B5CF6"; ctx.font = `bold ${Math.max(8,10*ctl.scale)}px monospace`;
      ctx.fillText("live-pipeline.log", ctl.x+12, ctl.y+16);
      typedLines.forEach((line, idx) => {
        const lp = project(cL+14, cT+34+idx*18, cZ);
        ctx.fillStyle = line.includes("import") ? "#F59E0B" : line.includes("ROI") ? "#25D366" : "#4f6ef7";
        ctx.font = `${Math.max(7,8.5*lp.scale)}px monospace`;
        ctx.fillText(line, lp.x, lp.y);
      });

      // 5. Particles (data flow across canvas)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > 260) p.vx *= -1;
        if (Math.abs(p.y) > 200) p.vy *= -1;
        if (Math.abs(p.z) > 150) p.vz *= -1;
        const pp = project(p.x, p.y, p.z);
        ctx.beginPath(); ctx.arc(pp.x, pp.y, p.size*pp.scale, 0, 2*Math.PI);
        ctx.fillStyle = p.color.replace(")", `,${p.opacity})`).replace("rgb", "rgba");
        if (p.color.startsWith("#")) {
          ctx.fillStyle = p.color + Math.floor(p.opacity*255).toString(16).padStart(2,'0');
        }
        ctx.fill();
      });

      // 6. Floating tech icons (Web Dev & Marketing)
      const icons = [
        {x:-130,y:-70,z:20,char:'</>'},{x:140,y:-50,z:40,char:'⚡'},{x:-100,y:90,z:70,char:'📈'},
        {x:160,y:80,z:50,char:'🎯'},{x:-40,y:-100,z:10,char:'🛒'},{x:60,y:100,z:80,char:'🔒'},
      ];
      icons.forEach(ic => {
        const ip = project(ic.x, ic.y, ic.z);
        ctx.font = `${Math.max(14,20*ip.scale)}px sans-serif`;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.shadowBlur = 12; ctx.shadowColor = "#4f6ef7";
        ctx.fillText(ic.char, ip.x-8, ip.y+6);
        ctx.shadowBlur = 0;
      });

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
  const featuredIds = ["27", "28", "29", "30", "31", "32"];
  const featuredProjects = featuredIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden min-h-[90vh] md:min-h-[92vh] flex items-center bg-[#07080c]"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(var(--primary) 1.2px, transparent 1.2px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative w-full z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-28">
          {/* Mobile Badge - Above Animation */}
          <Reveal delay={0} variant="fade-in-up" duration={0.6} className="md:hidden mb-4 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-semibold text-primary">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Scale Your Brand Digitally with DevdigitaX
            </span>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Left Content Area */}
            <div className="md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
              <Reveal delay={0} variant="fade-in-up" duration={0.6} className="hidden md:block">
                <span className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs lg:text-sm font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> Scale Your Brand Digitally with DevdigitaX
                </span>
              </Reveal>

              <h1 className="mt-4 md:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] md:leading-[1.1] text-white">
                <span className="block mb-1 md:mb-2 text-white">Next-Gen Development</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#4f6ef7] to-[#7b9cf5]">
                  and Strategic
                </span>
                <span className="block mt-1 md:mt-2 text-white">Marketing Partner</span>
              </h1>

              <FadeIn delay={0.2} duration={0.8} scale={false} className="mt-4 md:mt-6">
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Built for businesses that demand real results. We create high-performance websites
                  that convert visitors into customers, and execute strategic marketing campaigns that
                  drive sustained revenue growth — from development to delivery. We specialize in WordPress, React,
                  Node.js, MongoDB, PHP, Laravel, JavaScript, and E-commerce development.
                </p>
              </FadeIn>

              <Reveal delay={0.45} variant="fade-in-up" duration={0.8} className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4">
                <Link
                  to="/contact"
                  className="btn-premium group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-6 md:py-3.5 rounded-full font-bold text-primary-foreground transform hover:scale-[1.03] transition-all duration-300 text-sm md:text-base"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                >
                  Get Assessment{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="btn-premium inline-flex items-center justify-center gap-2 px-6 py-3 md:px-6 md:py-3.5 rounded-full font-bold border border-border bg-card/10 hover:border-primary/50 hover:bg-card/30 transition-all text-sm md:text-base"
                >
                  Explore Services
                </Link>
              </Reveal>

              <Reveal delay={0.6} variant="fade-in-up" duration={0.8} className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/40 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4">
                <a
                  href="tel:+8809638474596"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/30 hover:bg-accent/50 transition-all text-xs md:text-sm font-medium text-muted-foreground hover:text-white"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +880 9638-474596
                </a>
                <a
                  href="https://wa.me/8801837692110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/30 hover:bg-accent/50 transition-all text-xs md:text-sm font-medium text-muted-foreground hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 text-primary" />
                  +880 1837-692110
                </a>
              </Reveal>
            </div>

            {/* Right Interactive 3D Canvas */}
            <div className="md:col-span-5 relative h-[280px] md:h-[380px] lg:h-[480px] grid place-items-center order-1 md:order-2 mb-4 md:mb-0">
              <div className="absolute -inset-6 md:-inset-10 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "var(--gradient-primary)" }} />
              <RealDevMarketingCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* INTRO */}
      <Reveal variant="slide-up" className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight md:leading-tight">
          Your Business Is Losing Customers Online.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Let's Fix That — for Good.
          </span>
        </h2>
        <p className="mt-4 md:mt-6 text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
          DevdigitaX is your Next-Gen Development and Strategic Marketing Partner — built to turn
          your online presence into your most powerful sales channel.
        </p>
        <p className="mt-3 md:mt-4 text-muted-foreground text-xs md:text-sm max-w-3xl mx-auto leading-relaxed">
          Every business deserves a digital presence that actually works. Not a website that sits
          there — but a system that attracts the right audience, communicates your value, and
          converts traffic into real revenue. We've been building those systems for businesses
          across every major industry.
        </p>
      </Reveal>

      {/* STATS */}
      <Reveal variant="fade-in" className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              400+ Businesses Grew With Us. Yours Can Be Next.
            </h2>
            <p className="mt-2 md:mt-3 text-muted-foreground text-xs md:text-sm">
              We're not the cheapest agency. We're the agency that makes your investment pay back —
              measurably, consistently, and at scale.
            </p>
          </div>
          <Stagger className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s) => (
              <StaggerItem
                key={s.l}
                variant="scale"
                className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-border bg-background/50 text-center hover:border-primary/30 transition-all duration-300"
              >
                <div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  <AnimatedCounter value={s.v} />
                </div>
                <div className="mt-2 md:mt-3 text-[10px] md:text-xs text-muted-foreground leading-relaxed px-1 md:px-2">{s.l}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* PORTFOLIO SECTION */}
      <Reveal className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="max-w-2xl">
            <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">
             Our recent work
            </span>
            <h2 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Crafting Digital Success Stories
            </h2>
            <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-base">
              Explore our latest projects across web development, SEO, and digital branding.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm md:text-base"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <StaggerItem
              key={project.id}
              variant="image"
              className="card-lift group rounded-xl md:rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50"
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
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] md:text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">{project.client}</span>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 text-white">
                  {project.title}
                </h3>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-1.5">
                  {project.tech
                    .split(",")
                    .slice(0, 4)
                    .map((t) => (
                      <span
                        key={t}
                        className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-md border border-border bg-muted/50 text-muted-foreground whitespace-nowrap"
                      >
                        {t.trim()}
                      </span>
                    ))}
                </div>
                <div className="mt-3 md:mt-4 flex items-center justify-between">
                  <Link
                    to="/portfolio"
                    className="text-xs md:text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Explore Project <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* WEBSITE LIFECYCLE */}
      <Reveal className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">
            Our process
          </span>
          <h2 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Website Development Life Cycle
          </h2>
          <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-base">
            A clear, repeatable process that turns ideas into shipped, profitable products.
          </p>
        </div>
        <Stagger className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {lifecycle.map((p) => (
            <StaggerItem
              key={p.n}
              variant="slide-up"
              className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-border bg-card/40 hover:border-primary/50 transition duration-300"
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-30"
                style={{ color: "oklch(0.55 0.24 262)" }}
              >
                {p.n}
              </div>
              <h3 className="mt-2 text-sm md:text-base lg:text-lg font-semibold text-white">{p.t}</h3>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* PATH */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">
              How we engage
            </span>
            <h2 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              From Discovery to Growth — A Clear, Proven Path
            </h2>
            <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-base">
              No 12-week discovery phases. No vague timelines. Here's exactly how we work:
            </p>
          </div>
          <Stagger className="mt-8 md:mt-12 space-y-3 md:space-y-4">
            {path.map((p, i) => (
              <StaggerItem
                key={p.t}
                variant="slide-up"
                className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-border bg-background/50 flex gap-3 md:gap-5 items-start hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className="h-8 w-8 md:h-10 md:w-10 shrink-0 grid place-items-center rounded-full font-bold text-primary-foreground text-sm md:text-base"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base lg:text-lg text-white">{p.t}</h3>
                  <p className="mt-1 text-muted-foreground text-xs md:text-sm leading-relaxed">{p.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 md:mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-full font-semibold text-primary-foreground hover:scale-105 transition-transform duration-300 text-sm md:text-base"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* SERVICES */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">
              What we do
            </span>
            <h2 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Everything Your Business Needs to Win Online — Under One Roof
            </h2>
            <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-base">
              Fragmented vendors create fragmented results. Our team handles your entire digital
              ecosystem — strategy, design, development, traffic and conversion — so every part
              works together toward measurable growth.
            </p>
          </div>
          <Stagger className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {getServices().map(({ icon, title, description, slug }) => {
              const Icon =
                ({ Layout, Code2, ShoppingCart, Palette, Search, TrendingUp } as any)[icon] ||
                Layout;
              return (
                <StaggerItem
                  key={slug}
                  className="group p-5 md:p-8 rounded-xl md:rounded-2xl border border-border bg-background/50 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="h-10 w-10 md:h-12 md:w-12 grid place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="mt-3 md:mt-5 text-base md:text-lg lg:text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-muted-foreground text-xs md:text-sm leading-relaxed">{description}</p>
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: slug }}
                    className="mt-3 md:mt-5 inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                  >
                    Explore Service <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">
              What our clients say
            </span>
            <h2 className="mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Real teams. Real results.
            </h2>
            <div className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
                ))}
              </div>
              30+ Google reviews
            </div>
          </div>
          <Stagger className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="p-5 md:p-8 rounded-xl md:rounded-2xl border border-border bg-background/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 md:mt-4 text-foreground text-xs md:text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 md:mt-6 flex items-center gap-3">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover border border-primary/20"
                    />
                  ) : (
                    <div
                      className="h-9 w-9 md:h-10 md:w-10 rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  )}
                  <div>
                    <div className="font-semibold text-xs md:text-sm text-white">{t.name}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">{t.role}</div>
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