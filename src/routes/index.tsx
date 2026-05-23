/**
 * DevdigitaX — Homepage
 * 
 * AmbientCanvas is used as a position:absolute background on every major
 * section. Each section is position:relative; content sits at z-index > 0.
 *
 * Variant assignment:
 *   hero          → unchanged (RealDevMarketingCanvas)
 *   intro         → "flow"      (gentle bezier streams, very low opacity)
 *   stats         → "particles" (data nodes match the metric theme)
 *   portfolio     → "grid"      (structured, technical)
 *   lifecycle     → "grid"      (process / structure)
 *   path          → "flow"      (forward motion)
 *   services      → "particles" (ecosystem of offerings)
 *   testimonials  → "flow"      (human warmth, softer)
 *   cta           → "particles" (energy, call-to-action)
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";
import { AnimatedCounter } from "@/components/ui/animations/AnimatedCounter";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { getServices, getPortfolio } from "@/utils/data";
import { useEffect, useRef } from "react";
import {
  ArrowRight, Sparkles, Star, Layout, ShoppingCart,
  TrendingUp, Palette, Phone, ExternalLink, Code2, Search,
} from "lucide-react";
import tasin    from "@/assets/tasin.jpeg";
import kudzley  from "@/assets/Kudzey.jpeg";
import tonmoy   from "@/assets/tonmoy.jpeg";
import iqraam   from "@/assets/iqraam.png";
import { WhatsAppIcon } from "@/components/Icons";
import { AmbientCanvas } from "@/components/ui/animations/Ambientcanvas";

// ─────────────────────────────────────────────────────────────────────────────
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

// ─── Static data ──────────────────────────────────────────────────────────────
const stats = [
  { v: "8+",   l: "Years of digital marketing & web development experience" },
  { v: "400+", l: "Projects delivered across web, SEO, paid media and ecommerce" },
  { v: "15+",  l: "Industries served — healthcare, real estate, retail and logistics" },
  { v: "98%",  l: "Client retention rate — your growth is our accountability" },
];

const lifecycle = [
  { n: "01", t: "Gathering Information", d: "We gather requirements from our clients to produce maximum output aligned with customer satisfaction." },
  { n: "02", t: "Planning",              d: "We plan the structure, sitemap and user journey — giving you a clear picture of the entire site before we build." },
  { n: "03", t: "Design",               d: "We shape the visual identity — typography, imagery, motion and UI — tuned to convert." },
  { n: "04", t: "Content",              d: "Every section is written clearly to communicate your value to the audience." },
  { n: "05", t: "Coding",               d: "We turn the designs into a clean, fast, scalable, future-ready codebase." },
  { n: "06", t: "Testing",              d: "Every function, breakpoint and integration is tested for maximum reliability." },
  { n: "07", t: "Launching",            d: "We ship to production, monitor and iterate based on real user feedback." },
  { n: "08", t: "Support & Maintenance",d: "We provide ongoing technical support, security updates, and performance monitoring to keep your site running at its peak." },
];

const path = [
  { t: "Discovery Call",          d: "We learn your business, your customers, and what growth looks like for you. No pitch decks — just listening." },
  { t: "Growth Strategy",         d: "A custom strategy tied to your goals and budget, with projected outcomes and a measurement framework." },
  { t: "Execution",               d: "Our team moves fast. Direct access to the people doing the work — not just account managers." },
  { t: "Measurement & Reporting", d: "We track leads, conversions, CPA and revenue impact. Reports written in plain language." },
  { t: "Optimise & Scale",        d: "What works gets scaled. What doesn't gets replaced. Campaigns get sharper and more profitable over time." },
];

const testimonials = [
  { name: "Tonmay Sen",        role: "Founder, IT company",          image: tonmoy,  quote: "Working with DevdigitaX on our E-commerce platform was a game-changer. Professional, efficient, and truly understood our vision for our business." },
  { name: "MD Iqramul Haque",  role: "Founder, Bizway",              image: iqraam,  quote: "The Facebook ads campaign and branding strategy DevdigitaX delivered were outstanding. Our sales targets were not just met, but exceeded through their precise audience targeting." },
  { name: "MD Tasin",          role: "Founder, Norbex E-commerce",   image: tasin,   quote: "Expert execution and strategic growth. DevdigitaX is more than an agency; they are a true partner in building a scalable e-commerce business." },
  { name: "Kudzley Mania",     role: "Entrepreneur",                 image: kudzley, quote: "Highly professional team that delivers consistent quality. They've been instrumental in our digital growth strategy." },
];

// ─── Hero canvas (unchanged from original) ────────────────────────────────────
function RealDevMarketingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width  = (canvas.width  = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let time   = 0;

    // Detect mobile for faster animations
    const isMobile = window.innerWidth < 768;
    const speedMultiplier = isMobile ? 2.5 : 1;
    const particleCount = isMobile ? 40 : 80;
    const nodeCount = isMobile ? 10 : 20;
    const typeSpeed = isMobile ? 15 : 35;

    const handleResize = () => {
      if (!canvas) return;
      width  = canvas.width  = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let targetRotX = 0, targetRotY = 0, curRotX = 0, curRotY = 0;
    let targetZoom = 0, curZoom = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top  - height / 2;
      targetRotY =  (x / (width  / 2)) * 0.4;
      targetRotX = -(y / (height / 2)) * 0.4;
    };
    const handleScroll = () => { targetZoom = window.scrollY * 0.02; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll",    handleScroll);

    const codeSnippets = [
      "kubectl apply -f deployment.yaml",
      "aws ec2 run-instances --count 3",
      "gcloud builds submit --tag gcr.io/prod/app",
      "terraform plan -out=tfplan",
      "docker-compose up -d --scale web=5",
      "npm run build && npm run deploy",
      "SELECT * FROM users WHERE status='active'",
      "redis-cli INFO stats",
      "curl -X POST https://api.devdigitax.com/v2/optimize",
      "git push origin main && gh pr create",
      "python3 train_model.py --epochs=1000",
      "k6 run --vus 1000 --duration 30s loadtest.js",
    ];
    let typedLines: string[] = ["", "", "", "", "", "", ""];
    let snippetIndex = 0, lineIndex = 0, charIndex = 0;

    const typeInterval = setInterval(() => {
      if (lineIndex >= typedLines.length) {
        typedLines.shift(); typedLines.push(""); lineIndex = typedLines.length - 1; charIndex = 0;
        snippetIndex = (snippetIndex + 1) % codeSnippets.length;
      }
      const target = codeSnippets[snippetIndex];
      if (charIndex < target.length) { typedLines[lineIndex] += target[charIndex]; charIndex++; }
      else { lineIndex++; }
    }, typeSpeed);

    interface DataParticle { x:number;y:number;z:number;vx:number;vy:number;vz:number;size:number;color:string;opacity:number;pulse:number;pulseSpeed:number; }
    const particleColors = ["#4285F4","#34A853","#FBBC04","#EA4335","#FF9900","#146EB4","#8B5CF6","#06B6D4"];
    const particles: DataParticle[] = Array.from({length:particleCount}, () => ({
      x:(Math.random()-0.5)*600, y:(Math.random()-0.5)*500, z:(Math.random()-0.5)*400,
      vx:(Math.random()-0.5)*1.5*speedMultiplier, vy:(Math.random()-0.5)*1.5*speedMultiplier, vz:(Math.random()-0.5)*1.2*speedMultiplier,
      size:1+Math.random()*4, color:particleColors[Math.floor(Math.random()*particleColors.length)],
      opacity:0.3+Math.random()*0.7, pulse:Math.random()*Math.PI*2, pulseSpeed:(0.02+Math.random()*0.04)*speedMultiplier,
    }));

    const nodes: {x:number;y:number;z:number;connections:number[]}[] = Array.from({length:nodeCount}, () => {
      const connections: number[] = [];
      const n = 2 + Math.floor(Math.random() * 4);
      for (let j = 0; j < n; j++) {
        const c = Math.floor(Math.random() * nodeCount);
        if (!connections.includes(c)) connections.push(c);
      }
      return { x:(Math.random()-0.5)*400, y:(Math.random()-0.5)*300, z:(Math.random()-0.5)*250, connections };
    });

    const project = (x:number,y:number,z:number) => {
      const cosY=Math.cos(curRotY),sinY=Math.sin(curRotY),cosX=Math.cos(curRotX),sinX=Math.sin(curRotX);
      const z1=z*cosY-x*sinY, x1=z*sinY+x*cosY;
      const z2=z1*cosX-y*sinX, y2=z1*sinX+y*cosX;
      const fov=550+curZoom, scale=fov/(fov+z2);
      return { x:width/2+x1*scale, y:height/2+y2*scale, scale };
    };

    const render = () => {
      if (!ctx||!canvas) return;
      ctx.clearRect(0,0,width,height);
      time += 0.016 * speedMultiplier;
      curRotY += (targetRotY-curRotY)*0.05;
      curRotX += (targetRotX-curRotX)*0.05;
      curZoom += (targetZoom-curZoom)*0.1;

      // grid
      ctx.strokeStyle="rgba(66,133,244,0.03)"; ctx.lineWidth=0.5;
      for (let i=-350;i<=350;i+=35) {
        const p1=project(i,-250,-150),p2=project(i,250,-150);
        ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
        const p3=project(-350,i,-150),p4=project(350,i,-150);
        ctx.beginPath();ctx.moveTo(p3.x,p3.y);ctx.lineTo(p4.x,p4.y);ctx.stroke();
      }

      // network lines
      nodes.forEach((node,i)=>{
        const np=project(node.x,node.y,node.z);
        node.connections.forEach(ci=>{
          const cp=project(nodes[ci].x,nodes[ci].y,nodes[ci].z);
          ctx.beginPath();ctx.moveTo(np.x,np.y);ctx.lineTo(cp.x,cp.y);
          ctx.strokeStyle=`rgba(66,133,244,${0.1+Math.sin(time*2+i)*0.05})`;ctx.lineWidth=1*np.scale;ctx.stroke();
        });
      });

      // network nodes
      nodes.forEach((node,i)=>{
        const np=project(node.x,node.y,node.z);
        const ps=Math.sin(time*3+i)*0.2+0.8;
        const g=ctx.createRadialGradient(np.x,np.y,0,np.x,np.y,8*np.scale*ps);
        g.addColorStop(0,"rgba(66,133,244,0.8)");g.addColorStop(0.5,"rgba(66,133,244,0.3)");g.addColorStop(1,"rgba(66,133,244,0)");
        ctx.beginPath();ctx.arc(np.x,np.y,8*np.scale*ps,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(np.x,np.y,3*np.scale,0,Math.PI*2);ctx.fillStyle="#4285F4";ctx.fill();
        ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.stroke();
      });

      // dashboard panel
      const bL=-200,bR=200,bT=-130,bB=130,zB=-40;
      const tl=project(bL,bT,zB),tr=project(bR,bT,zB),bl=project(bL,bB,zB),br=project(bR,bB,zB);
      ctx.beginPath();ctx.moveTo(tl.x,tl.y);ctx.lineTo(tr.x,tr.y);ctx.lineTo(br.x,br.y);ctx.lineTo(bl.x,bl.y);ctx.closePath();
      const pg=ctx.createLinearGradient(tl.x,tl.y,br.x,br.y);
      pg.addColorStop(0,"rgba(15,20,35,0.95)");pg.addColorStop(1,"rgba(10,15,30,0.95)");
      ctx.fillStyle=pg;ctx.fill();
      const bg=ctx.createLinearGradient(tl.x,tl.y,br.x,br.y);
      bg.addColorStop(0,"#4285F4");bg.addColorStop(0.5,"#FF9900");bg.addColorStop(1,"#34A853");
      ctx.strokeStyle=bg;ctx.lineWidth=3;ctx.stroke();

      // header
      const hb=project(bR,bT+32,zB),hl=project(bL,bT+32,zB);
      ctx.beginPath();ctx.moveTo(tl.x,tl.y);ctx.lineTo(tr.x,tr.y);ctx.lineTo(hb.x,hb.y);ctx.lineTo(hl.x,hl.y);ctx.closePath();
      ctx.fillStyle="rgba(20,28,45,0.98)";ctx.fill();

      [{icon:"☁️",x:bL+20},{icon:"🔧",x:bL+50},{icon:"📊",x:bL+80},{icon:"⚙️",x:bL+110}].forEach(s=>{
        const sp=project(s.x,bT+16,zB);ctx.font=`${Math.max(10,14*sp.scale)}px sans-serif`;ctx.fillText(s.icon,sp.x-5,sp.y+4);
      });

      const uL=project(bL+150,bT+16,zB),uR=project(bR-20,bT+16,zB);
      ctx.beginPath();ctx.moveTo(uL.x,uL.y);ctx.lineTo(uR.x,uR.y);
      ctx.strokeStyle="rgba(255,255,255,0.1)";ctx.lineWidth=14*uL.scale;ctx.lineCap="round";ctx.stroke();ctx.lineCap="butt";
      ctx.fillStyle="rgba(255,255,255,0.9)";ctx.font=`${Math.max(8,11*uL.scale)}px 'SF Mono',monospace`;
      ctx.fillText("console.aws.amazon.com/ec2/v2/home?region=us-east-1",uL.x+8,uL.y+4);

      // metrics
      const metrics=[
        {label:"CPU",    value:73+Math.sin(time*2)*10,   x:bL+20, y:bT+55, color:"#4285F4"},
        {label:"Memory", value:62+Math.cos(time*1.8)*8,  x:bL+20, y:bT+95, color:"#34A853"},
        {label:"Network",value:45+Math.sin(time*2.5)*15, x:bL+140,y:bT+55, color:"#FF9900"},
        {label:"Requests",value:89+Math.cos(time*1.5)*5, x:bL+140,y:bT+95, color:"#EA4335"},
      ];
      metrics.forEach(m=>{
        const mp=project(m.x,m.y,zB);const bw=90*mp.scale,bh=20*mp.scale;
        ctx.fillStyle="rgba(255,255,255,0.05)";ctx.fillRect(mp.x,mp.y,bw,bh);
        const fw=(m.value/100)*bw;
        const fg=ctx.createLinearGradient(mp.x,mp.y,mp.x+bw,mp.y);fg.addColorStop(0,m.color);fg.addColorStop(1,m.color+"88");
        ctx.fillStyle=fg;ctx.fillRect(mp.x,mp.y,fw,bh);
        ctx.fillStyle="#fff";ctx.font=`${Math.max(6,8*mp.scale)}px monospace`;
        ctx.fillText(`${m.label}: ${Math.round(m.value)}%`,mp.x+4,mp.y-4);
      });

      // terminal
      const cZ=100,cL=-180,cR=30,cT=20,cB=160;
      const ctl=project(cL,cT,cZ),ctr=project(cR,cT,cZ),cbl=project(cL,cB,cZ),cbr=project(cR,cB,cZ);
      ctx.beginPath();ctx.moveTo(ctl.x,ctl.y);ctx.lineTo(ctr.x,ctr.y);ctx.lineTo(cbr.x,cbr.y);ctx.lineTo(cbl.x,cbl.y);ctx.closePath();
      const tg=ctx.createLinearGradient(ctl.x,ctl.y,cbr.x,cbr.y);tg.addColorStop(0,"rgba(0,0,0,0.95)");tg.addColorStop(1,"rgba(10,10,20,0.95)");
      ctx.fillStyle=tg;ctx.fill();ctx.strokeStyle="#34A853";ctx.lineWidth=2;
      ctx.shadowBlur=20;ctx.shadowColor="rgba(52,168,83,0.5)";ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle="#34A853";ctx.font=`bold ${Math.max(8,11*ctl.scale)}px monospace`;
      ctx.fillText("┌─ cloud-shell@devdigitax-prod ─┐",ctl.x+10,ctl.y+18);
      typedLines.forEach((line,idx)=>{
        const lp=project(cL+16,cT+38+idx*17,cZ);const prompt=idx===0?"$ ":"  ";
        ctx.font=`${Math.max(7,9*lp.scale)}px 'SF Mono',monospace`;
        if (line.includes("kubectl")||line.startsWith("$")) ctx.fillStyle="#34A853";
        else if (line.includes("Error")||line.includes("fail")) ctx.fillStyle="#EA4335";
        else if (line.includes("curl")||line.includes("http")) ctx.fillStyle="#FF9900";
        else ctx.fillStyle="#4285F4";
        ctx.fillText(prompt+line,lp.x,lp.y);
      });

      // analytics graph
      const gZ=130,gPts=[];
      for (let i=0;i<=20;i++) {
        const gx=-160+(i/20)*200,gy=-20-Math.sin(i*0.8+time)*30-Math.cos(i*0.3+time*0.7)*20;
        gPts.push(project(gx,gy,gZ));
      }
      ctx.beginPath();ctx.moveTo(gPts[0].x,gPts[0].y);
      for (let i=1;i<gPts.length;i++) {
        const cp1x=gPts[i-1].x+(gPts[i].x-gPts[i-1].x)/3,cp2x=gPts[i].x-(gPts[i].x-gPts[i-1].x)/3;
        ctx.bezierCurveTo(cp1x,gPts[i-1].y,cp2x,gPts[i].y,gPts[i].x,gPts[i].y);
      }
      const gg=ctx.createLinearGradient(0,gPts[0].y,0,gPts[0].y+100);
      gg.addColorStop(0,"rgba(66,133,244,0.8)");gg.addColorStop(1,"rgba(52,168,83,0.2)");
      ctx.strokeStyle=gg;ctx.lineWidth=3*gPts[0].scale;ctx.shadowBlur=25;ctx.shadowColor="rgba(66,133,244,0.8)";ctx.stroke();ctx.shadowBlur=0;
      ctx.lineTo(gPts[gPts.length-1].x,gPts[gPts.length-1].y+60);ctx.lineTo(gPts[0].x,gPts[0].y+60);ctx.closePath();
      const ag=ctx.createLinearGradient(0,gPts[0].y,0,gPts[0].y+60);
      ag.addColorStop(0,"rgba(66,133,244,0.15)");ag.addColorStop(1,"rgba(66,133,244,0)");ctx.fillStyle=ag;ctx.fill();
      const peak=gPts[15];
      ctx.beginPath();ctx.arc(peak.x,peak.y,5*peak.scale,0,Math.PI*2);ctx.fillStyle="#fff";
      ctx.shadowBlur=20;ctx.shadowColor="#4285F4";ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle="#fff";ctx.font=`bold ${Math.max(9,12*peak.scale)}px sans-serif`;
      ctx.fillText("📈 Revenue +540%",peak.x+15,peak.y-15);
      ctx.font=`${Math.max(7,9*peak.scale)}px sans-serif`;ctx.fillText("Users 2.4M → 14.2M",peak.x+15,peak.y+4);

      // floating icons
      [{char:"🐳",x:180,y:-80,z:50},{char:"☸️",x:-160,y:100,z:80},{char:"🔴",x:140,y:90,z:60},
       {char:"⚡",x:-90,y:-110,z:30},{char:"🛡️",x:100,y:-60,z:90},{char:"📦",x:-50,y:120,z:110}].forEach(ic=>{
        const ip=project(ic.x,ic.y,ic.z);const s=Math.sin(time*2+ic.x)*0.1+1;
        ctx.font=`${Math.max(14,22*ip.scale*s)}px sans-serif`;ctx.fillStyle="rgba(255,255,255,0.9)";
        ctx.shadowBlur=15;ctx.shadowColor="#4285F4";ctx.fillText(ic.char,ip.x-10,ip.y+8);ctx.shadowBlur=0;
      });

      // particles
      particles.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.pulse+=p.pulseSpeed;
        if (Math.abs(p.x)>300) p.vx*=-1;if (Math.abs(p.y)>250) p.vy*=-1;if (Math.abs(p.z)>200) p.vz*=-1;
        const pp=project(p.x,p.y,p.z),ps=Math.sin(p.pulse)*0.3+1;
        ctx.beginPath();ctx.arc(pp.x,pp.y,p.size*pp.scale*ps,0,Math.PI*2);
        ctx.fillStyle=p.color+Math.floor(p.opacity*255).toString(16).padStart(2,"0");
        ctx.shadowBlur=10;ctx.shadowColor=p.color;ctx.fill();ctx.shadowBlur=0;
      });

      // ROI counter
      const rp=project(0,-140,20),rs=Math.sin(time*1.5)*0.05+1;
      ctx.fillStyle="#fff";ctx.font=`bold ${Math.max(12,18*rp.scale*rs)}px sans-serif`;ctx.textAlign="center";
      ctx.shadowBlur=20;ctx.shadowColor="#34A853";
      ctx.fillText(`💰 $${(12.4+Math.sin(time)*0.5).toFixed(1)}M Revenue Generated`,rp.x,rp.y);
      ctx.shadowBlur=0;ctx.textAlign="left";

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(typeInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function Index() {
  const allProjects  = getPortfolio();
  const featuredIds  = ["r24","r29","r30","r31","r1","r3"];
  const featuredProjects = featuredIds
    .map(id => allProjects.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <SiteLayout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#07080c]"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(66,133,244,0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(66,133,244,0.3) 1px, transparent 1px)`, backgroundSize:"40px 40px" }} />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative w-full z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-12 items-center">

            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <Reveal delay={0} variant="fade-in-up" duration={0.6}>
                <span className="self-start inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs md:text-sm font-semibold text-blue-400 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                  Scale Your Brand Digitally with DevdigitaX
                </span>
              </Reveal>

              <h1 className="mt-6 text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                <span className="block mb-2 text-white">Next-Gen Development</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#4f6ef7] to-[#7b9cf5]">and Strategic</span>
                <span className="block mt-2 text-white">Marketing Partner</span>
              </h1>

              <FadeIn delay={0.2} duration={0.8} scale={false} className="mt-6">
                <p className="text-base md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Built for businesses that demand real results. We create high-performance websites that convert visitors into customers, and execute strategic marketing campaigns that drive sustained revenue growth — from development to delivery. We specialize in WordPress, React, Node.js, MongoDB, PHP, Laravel, JavaScript, and E-commerce development.
                </p>
              </FadeIn>

              <div className="mt-6 flex flex-wrap gap-3">
                {["WordPress","React","Node.js","MongoDB","PHP","Laravel"].map(tech => (
                  <span key={tech} className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono">{tech}</span>
                ))}
              </div>

              <Reveal delay={0.45} variant="fade-in-up" duration={0.8} className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-premium group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transform hover:scale-105 transition-all duration-300" style={{ background:"linear-gradient(135deg,#4285F4 0%,#34A853 100%)", boxShadow:"0 0 40px rgba(66,133,244,0.4)" }}>
                  Get Assessment <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="btn-premium inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all backdrop-blur-sm">
                  Explore Services
                </Link>
              </Reveal>

              <Reveal delay={0.6} variant="fade-in-up" duration={0.8} className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <a href="tel:+8809638474596" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/10 transition-all text-xs md:text-sm font-medium text-gray-300 hover:text-white backdrop-blur-sm">
                  <Phone className="h-4 w-4 text-blue-400" />+880 9638-474596
                </a>
                <a href="https://wa.me/8801837692110" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-green-500/10 transition-all text-xs md:text-sm font-medium text-gray-300 hover:text-white backdrop-blur-sm">
                  <WhatsAppIcon className="h-4 w-4 text-green-400" />+880 1837-692110
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-5 relative h-[400px] md:h-[550px] grid place-items-center">
              <div className="absolute -inset-12 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background:"linear-gradient(135deg,#4285F4,#34A853,#FBBC04,#EA4335)" }} />
              <RealDevMarketingCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <AmbientCanvas variant="flow" intensity={0.6} />
        <Reveal variant="slide-up" className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Your Business Is Losing Customers Online.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage:"var(--gradient-primary)" }}>
              Let's Fix That — for Good.
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            DevdigitaX is your Next-Gen Development and Strategic Marketing Partner — built to turn your online presence into your most powerful sales channel.
          </p>
          <p className="mt-4 text-muted-foreground text-sm max-w-3xl mx-auto leading-relaxed">
            Every business deserves a digital presence that actually works. Not a website that sits there — but a system that attracts the right audience, communicates your value, and converts traffic into real revenue. We've been building those systems for businesses across every major industry.
          </p>
        </Reveal>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <AmbientCanvas variant="particles" intensity={0.7} />
        <Reveal variant="fade-in" className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                400+ Businesses Grew With Us. Yours Can Be Next.
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">
                We're not the cheapest agency. We're the agency that makes your investment pay back — measurably, consistently, and at scale.
              </p>
            </div>
            <Stagger className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(s => (
                <StaggerItem key={s.l} variant="scale" className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage:"var(--gradient-primary)" }}>
                    <AnimatedCounter value={s.v} />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground leading-relaxed px-2">{s.l}</div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <AmbientCanvas variant="grid" intensity={0.5} />
        <Reveal className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Our recent work</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">Crafting Digital Success Stories</h2>
              <p className="mt-4 text-muted-foreground">Explore our latest projects across web development, SEO, and digital branding.</p>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <StaggerItem key={project.id} variant="image" className="card-lift group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/50">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition shadow-2xl">
                        <ExternalLink className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 uppercase tracking-wider border border-blue-500/30">{project.category}</span>
                    <span className="text-xs text-muted-foreground">{project.client}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors line-clamp-1 text-white">{project.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.split(",").slice(0,4).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-muted-foreground whitespace-nowrap font-mono">{t.trim()}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link to="/portfolio" className="text-sm font-semibold text-blue-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore Project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </section>

      {/* ── LIFECYCLE ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <AmbientCanvas variant="grid" intensity={0.45} />
        <Reveal className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Our process</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">Website Development Life Cycle</h2>
            <p className="mt-4 text-muted-foreground">A clear, repeatable process that turns ideas into shipped, profitable products.</p>
          </div>
          <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {lifecycle.map(p => (
              <StaggerItem key={p.n} variant="slide-up" className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/50 transition duration-300">
                <div className="text-4xl font-bold opacity-30" style={{ color:"oklch(0.55 0.24 262)" }}>{p.n}</div>
                <h3 className="mt-2 text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </section>

      {/* ── PATH ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white/[0.02] border-y border-white/10 backdrop-blur-sm">
        <AmbientCanvas variant="flow" intensity={0.55} />
        <Reveal className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl">
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">How we engage</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">From Discovery to Growth — A Clear, Proven Path</h2>
              <p className="mt-4 text-muted-foreground">No 12-week discovery phases. No vague timelines. Here's exactly how we work:</p>
            </div>
            <Stagger className="mt-12 space-y-4">
              {path.map((p, i) => (
                <StaggerItem key={p.t} variant="slide-up" className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex gap-5 items-start hover:border-blue-500/30 transition-colors duration-300">
                  <div className="h-12 w-12 shrink-0 grid place-items-center rounded-full font-bold text-white" style={{ background:"linear-gradient(135deg,#4285F4,#34A853)" }}>{i+1}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{p.t}</h3>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{p.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-12 text-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300" style={{ background:"linear-gradient(135deg,#4285F4,#34A853)", boxShadow:"0 0 40px rgba(66,133,244,0.4)" }}>
                Get a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white/[0.02] border-y border-white/10 backdrop-blur-sm">
        <AmbientCanvas variant="particles" intensity={0.6} />
        <Reveal className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl">
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">What we do</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">Everything Your Business Needs to Win Online — Under One Roof</h2>
              <p className="mt-4 text-muted-foreground">Fragmented vendors create fragmented results. Our team handles your entire digital ecosystem — strategy, design, development, traffic and conversion — so every part works together toward measurable growth.</p>
            </div>
            <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getServices().map(({ icon, title, description, slug }) => {
                const Icon = ({Layout,Code2,ShoppingCart,Palette,Search,TrendingUp} as any)[icon] || Layout;
                return (
                  <StaggerItem key={slug} className="group p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="h-14 w-14 grid place-items-center rounded-xl text-white" style={{ background:"linear-gradient(135deg,#4285F4,#34A853)" }}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{description}</p>
                    <Link to="/services/$serviceId" params={{ serviceId:slug }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-400 group-hover:gap-2 transition-all">
                      Explore Service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white/[0.02] border-y border-white/10 backdrop-blur-sm">
        <AmbientCanvas variant="flow" intensity={0.5} />
        <Reveal className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">What our clients say</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">Real teams. Real results.</h2>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({length:5}).map((_,i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                30+ Google reviews
              </div>
            </div>
            <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <StaggerItem key={t.name} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-300">
                  <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({length:5}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-foreground text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-blue-500/30" />
                    ) : (
                      <div className="h-12 w-12 rounded-full" style={{ background:"linear-gradient(135deg,#4285F4,#34A853)" }} />
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
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <AmbientCanvas variant="particles" intensity={0.8} />
        <Reveal className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-blue-500/30 p-6 md:p-12 lg:p-20 text-center" style={{ background:"linear-gradient(135deg,#0a0e1a 0%,#1a1f35 100%)", boxShadow:"0 0 80px rgba(66,133,244,0.2)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.15),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-green-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-blue-400 text-xs md:text-sm font-semibold uppercase tracking-wider">Experience real results</span>
              <h2 className="mt-2 md:mt-3 text-xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white">Partner with DevdigitaX and scale your business.</h2>
              <p className="mt-2 md:mt-4 text-muted-foreground max-w-xl mx-auto text-xs md:text-sm leading-relaxed">Tell us where you want to be in 12 months. We'll map the path — and build it with you.</p>
              <Link to="/contact" className="mt-4 md:mt-8 inline-flex items-center gap-2 px-6 md:px-10 py-3 md:py-5 rounded-full font-semibold text-white text-sm md:text-base hover:scale-105 transition-transform duration-300" style={{ background:"linear-gradient(135deg,#4285F4,#34A853)", boxShadow:"0 0 40px rgba(66,133,244,0.4)" }}>
                Start Your Project <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </SiteLayout>
  );
}