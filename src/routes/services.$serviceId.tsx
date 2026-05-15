import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import readyecommerce from "@/assets/readyecommerce.png";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailPage,
  head: ({ params }) => {
    const serviceData: Record<string, { title: string; description: string }> = {
      "web-design": {
        title: "Professional Web Design & Development",
        description: "Custom, conversion-focused websites built to turn visitors into customers.",
      },
      wordpress: {
        title: "WordPress Website Development",
        description:
          "Clean, fast, fully customized WordPress websites that are easy to manage and built to scale.",
      },
      ecommerce: {
        title: "E-Commerce Website Development",
        description:
          "High-converting product pages, frictionless checkout, and systems that turn first-time buyers into repeat customers.",
      },
      "graphics-design": {
        title: "Graphics Design",
        description:
          "Beautiful logos, banners, flyers, posters, and everything in between. Stunning visuals that capture your brand's essence.",
      },
      seo: {
        title: "Search Engine Optimization",
        description:
          "Technical optimisation, structured content and authority building — aligned with how your customers actually search.",
      },
      "digital-marketing": {
        title: "Digital Marketing",
        description:
          "Facebook Ads campaigns reaching audiences who need your service. Comprehensive Google Ads marketing across search, display, and video.",
      },
    };

    const service = serviceData[params.serviceId] || { title: "Service", description: "" };

    return {
      meta: [
        { title: `${service.title} — DevdigitaX` },
        { name: "description", content: service.description },
      ],
    };
  },
});

const serviceContent: Record<
  string,
  {
    title: string;
    description: string;
    heroImage: string;
    features: { icon: string; text: string }[];
    technologies: { name: string; icon: string }[];
    process: string[];
    callToAction: string;
    detailedContent: React.ReactNode;
  }
> = {
  "web-design": {
    title: "Professional Web Design & Development",
    description:
      "Your website isn't a brochure — it's your top salesperson. We build fast, conversion-focused websites designed around how local buyers think.",
    heroImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "⚡", text: "Lightning-fast loading speeds for better user experience and SEO" },
      { icon: "📱", text: "Fully responsive design that works on all devices" },
      { icon: "🎯", text: "Conversion-focused layouts that turn visitors into leads" },
      { icon: "🔧", text: "Easy-to-manage content management systems" },
      { icon: "📈", text: "SEO-friendly architecture built from the ground up" },
      { icon: "🛡️", text: "Secure hosting and regular maintenance" },
    ],
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PHP", icon: "🐘" },
    ],
    process: [
      "Discovery call to understand your business goals and target audience",
      "Wireframing and prototyping to plan the user journey",
      "Custom design tailored to your brand identity",
      "Development with clean, scalable code",
      "Rigorous testing across browsers and devices",
      "Launch and ongoing support",
    ],
    callToAction: "Ready to build a website that actually converts?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                99% Performance
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Web Design & Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  Services in Bangladesh
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  In today's digital age, your website is often the first point of contact between
                  your business and potential customers. At DevdigitaX, we understand that a website
                  is more than just an online brochure; it is a powerful tool designed to drive
                  growth and build credibility.
                </p>
                <p>
                  Our expert team specializes in delivering world-class{" "}
                  <strong>web design and development in Dhaka</strong> and across Bangladesh,
                  ensuring that your business stands out in an increasingly competitive market.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  99%
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Dhaka's Best</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      Top-Rated Development Agency
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[99%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">99%</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      First Impression Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                🏆
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Why Choose DevdigitaX?</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  Choosing the right development partner in <strong>Bangladesh</strong> can be
                  challenging. What sets DevdigitaX apart is our commitment to quality and our deep
                  understanding of the local and global market dynamics.
                </p>
                <p>
                  We recognize that businesses in <strong>Dhaka</strong> need websites that not only
                  look great but also perform exceptionally well on all devices.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  📱
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Responsive Excellence</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  With the majority of internet users in <strong>Dhaka</strong> accessing the web via
                  smartphones, having a responsive website is no longer optional—it's essential.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      UX
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Expert Designers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Development Section */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                Custom Development <br />
                <span className="text-primary">vs. Generic Templates</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  While generic templates might seem like a cost-effective solution initially, they
                  often come with hidden costs: slow loading speeds and limited customization.
                </p>
                <p>
                  For businesses in <strong>Dhaka</strong> looking for a long-term digital asset,
                  custom development is the way to go.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors">
                <div className="font-black text-primary text-xl mb-1">Fast Loading</div>
                <div className="text-sm text-muted-foreground/70">Optimized code for speed</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors">
                <div className="font-black text-primary text-xl mb-1">Security First</div>
                <div className="text-sm text-muted-foreground/70">Hardened architecture</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors">
                <div className="font-black text-primary text-xl mb-1">Scalable</div>
                <div className="text-sm text-muted-foreground/70">Built for future growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center py-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Ongoing Support & <br />
              <span className="text-primary">Maintenance in Bangladesh</span>
            </h3>
            <div className="prose prose-invert prose-lg text-muted-foreground/80 leading-relaxed">
              <p>
                A website is never truly finished. To remain effective, it needs regular updates,
                security patches, and performance monitoring.
              </p>
              <p>
                DevdigitaX offers comprehensive support and maintenance packages for businesses in{" "}
                <strong>Dhaka</strong> and across Bangladesh.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[450px] grid grid-cols-2 gap-6">
            <div className="aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center group hover:border-primary/40 transition-all duration-500">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
              <div className="font-black text-xs uppercase tracking-widest text-muted-foreground">
                Security
              </div>
            </div>
            <div className="aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center group hover:border-primary/40 transition-all duration-500">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <div className="font-black text-xs uppercase tracking-widest text-muted-foreground">
                Speed
              </div>
            </div>
            <div className="aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center group hover:border-primary/40 transition-all duration-500">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔄</div>
              <div className="font-black text-xs uppercase tracking-widest text-muted-foreground">
                Updates
              </div>
            </div>
            <div className="aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center group hover:border-primary/40 transition-all duration-500">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📞</div>
              <div className="font-black text-xs uppercase tracking-widest text-muted-foreground">
                24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  wordpress: {
    title: "WordPress Website Development",
    description:
      "Clean, fast, fully customised WordPress websites that are easy to manage and built to scale. No bloat, no plugin headaches.",
    heroImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "🎨", text: "Custom theme development tailored to your brand" },
      { icon: "🚀", text: "Optimized performance with minimal plugins" },
      { icon: "📝", text: "Easy-to-use admin panel for content updates" },
      { icon: "🔌", text: "Custom plugin development when needed" },
      { icon: "🔄", text: "Regular updates and security patches" },
      { icon: "📚", text: "Documentation and training for your team" },
    ],
    technologies: [
      { name: "PHP", icon: "🐘" },
      { name: "WordPress", icon: "🔵" },
      { name: "MySQL", icon: "🗄️" },
      { name: "JavaScript", icon: "🟨" },
    ],
    process: [
      "Requirement analysis and feature planning",
      "Custom theme design and development",
      "Plugin integration and customization",
      "Content migration and setup",
      "Performance optimization and security hardening",
      "Handover and training",
    ],
    callToAction: "Need a WordPress site that's fast, secure, and easy to manage?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                World's #1 CMS
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                WordPress Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  Services in Dhaka
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  WordPress is the world's most popular CMS, powering over 40% of all websites. At
                  DevdigitaX, we specialize in delivering high-quality{" "}
                  <strong>WordPress website development in Dhaka</strong> and throughout Bangladesh.
                </p>
                <p>
                  We move beyond standard templates to create custom WordPress solutions that align
                  perfectly with your brand identity and business requirements in{" "}
                  <strong>Dhaka, Bangladesh</strong>.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  40%
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Easy Edit</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      No Code Required for Updates
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[40%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">40%</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">Web Share</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Why Custom WordPress?</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  Many agencies in <strong>Bangladesh</strong> rely on heavy themes that slow down
                  your site. We focus on custom theme development to ensure your WordPress site is
                  fast, secure, and bloat-free.
                </p>
                <p>
                  This is crucial for businesses in <strong>Dhaka</strong> where speed is key for
                  retaining visitors.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  🔌
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Expert Plugin Integration</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  Our experts in <strong>Dhaka</strong> carefully curate and customize the plugins
                  your site needs, ensuring they integrate seamlessly and function reliably.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      WP
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Expert Developers</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                SEO & Performance <br />
                <span className="text-primary">Optimization</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  In the competitive online space of <strong>Bangladesh</strong>, speed and
                  visibility are paramount. WordPress, when optimized correctly, is an SEO
                  powerhouse.
                </p>
                <p>
                  Our team in <strong>Dhaka</strong> implements advanced caching, image
                  optimization, and technical SEO like schema markup.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">🔍</span>
                <span className="text-sm font-bold">Schema Markup Optimization</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">🖼️</span>
                <span className="text-sm font-bold">Advanced Image Compression</span>
              </div>
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center py-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Empowering You with <br />
              <span className="text-primary">Easy Content Management</span>
            </h3>
            <div className="prose prose-invert prose-lg text-muted-foreground/80 leading-relaxed">
              <p>
                Once your site is launched, we provide comprehensive training for your team in{" "}
                <strong>Dhaka</strong>. You'll be able to update text and images without needing
                technical knowledge.
              </p>
              <p>
                This independence is vital for businesses in <strong>Bangladesh</strong> that need
                to stay agile and responsive.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[400px]">
            <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-card border border-primary/20 shadow-2xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <div className="font-black text-primary uppercase tracking-widest text-xs">
                    Live Support
                  </div>
                </div>
                <p className="text-muted-foreground/90 leading-relaxed font-medium">
                  Our dedicated support team in <strong>Bangladesh</strong> is always available for
                  updates and technical assistance in Dhaka.
                </p>
                <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    💬
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest">Instant Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  ecommerce: {
    title: "E-Commerce Website Development",
    description:
      "High-converting product pages, frictionless checkout, and systems that turn first-time buyers into repeat customers.",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "🛒", text: "Intuitive shopping cart and checkout flow" },
      { icon: "💳", text: "Multiple payment gateway integrations" },
      { icon: "📦", text: "Inventory management and tracking" },
      { icon: "📊", text: "Sales analytics and reporting dashboard" },
      { icon: "⭐", text: "Product reviews and rating system" },
      { icon: "🔔", text: "Abandoned cart recovery automation" },
    ],
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Stripe/SSLCommerz", icon: "💳" },
    ],
    process: [
      "Store architecture and product catalog planning",
      "UI/UX design optimized for conversions",
      "Platform selection (Shopify, WooCommerce, or custom)",
      "Payment and shipping integration",
      "Testing and quality assurance",
      "Launch and marketing support",
    ],
    callToAction: "Ready to launch your online store and start selling?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                High-Conversion Stores
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                E-Commerce Website <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  Development in Dhaka
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  The e-commerce landscape in <strong>Bangladesh</strong> is booming. At DevdigitaX,
                  we specialize in creating high-performance{" "}
                  <strong>e-commerce websites in Dhaka</strong> that are designed to convert
                  visitors into customers.
                </p>
                <p>
                  Our goal is to provide you with a seamless online selling platform that handles
                  everything from product display to secure payment processing.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  35%
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Local Edge</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      SSLCommerz & bKash Ready
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[35%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">35%</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Avg. Conversion Lift
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Why Choose DevdigitaX?</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  What sets our <strong>e-commerce development in Bangladesh</strong> apart is our
                  focus on conversion optimization. We don't just build a store; we build a sales
                  machine.
                </p>
                <p>
                  Our team in <strong>Dhaka</strong> understands local shopping behaviors,
                  integrating payment gateways like SSLCommerz and bKash.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  🛠️
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Custom Features</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  We integrate inventory management, automated shipping, and customer loyalty
                  programs tailored for the <strong>Bangladesh</strong> market.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      Dev
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Commerce Experts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Section */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                Local Logistics & <br />
                <span className="text-primary">Delivery Systems</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  For e-commerce in <strong>Dhaka</strong>, efficient delivery is key. We integrate
                  local logistics providers for automated shipping and real-time tracking.
                </p>
                <p>
                  We also optimize for <strong>Cash-on-Delivery (COD)</strong>, providing a trusted
                  way to pay in <strong>Bangladesh</strong>.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">📍</span>
                <span className="text-sm font-bold">Real-time Order Tracking</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">💸</span>
                <span className="text-sm font-bold">Advanced COD Management</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">🚚</span>
                <span className="text-sm font-bold">Local Courier API Integration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center py-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Data-Driven Growth for <br />
              <span className="text-primary">E-Commerce in Dhaka</span>
            </h3>
            <div className="prose prose-invert prose-lg text-muted-foreground/80 leading-relaxed">
              <p>
                Launching your store is just the beginning. Our solutions include advanced analytics
                tools for sales performance and customer behavior.
              </p>
              <p>
                This data allows you to make informed decisions and continuously optimize your store
                for better results in <strong>Dhaka</strong>.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[450px] grid grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 flex flex-col items-center justify-center p-8 text-center group hover:border-primary/50 transition-all duration-500">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-black text-[10px] uppercase tracking-widest text-primary">
                Advanced Analytics
              </div>
            </div>
            <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 flex flex-col items-center justify-center p-8 text-center group hover:border-purple-500/50 transition-all duration-500 mt-12">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📈</div>
              <div className="font-black text-[10px] uppercase tracking-widest text-purple-400">
                Scalable Systems
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "graphics-design": {
    title: "Graphics Design",
    description:
      "Beautiful logos, banners, flyers, posters, and everything in between. We create stunning visuals that capture your brand's essence and connect with your audience.",
    heroImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "🏷️", text: "Logo design that tells your brand story" },
      { icon: "🖼️", text: "Banner and ad creative for digital marketing" },
      { icon: "📄", text: "Flyers and posters for print and digital" },
      { icon: "📱", text: "Social media graphics and templates" },
      { icon: "✉️", text: "Email newsletter design" },
      { icon: "🎨", text: "Brand identity kits and style guides" },
    ],
    technologies: [
      { name: "Adobe Illustrator", icon: "🖌️" },
      { name: "Photoshop", icon: "🖼️" },
      { name: "Figma", icon: "✏️" },
      { name: "Canva Pro", icon: "🎨" },
    ],
    process: [
      "Brand discovery and mood board creation",
      "Sketching and concept development",
      "Design iterations and refinement",
      "Final delivery in multiple formats",
      "Brand guidelines documentation",
      "Ongoing design support as needed",
    ],
    callToAction: "Need stunning visuals that represent your brand?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Visual Storytelling
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Graphic Design <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  Services in Dhaka
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  In a world dominated by visuals, your brand's graphic identity is its face. At
                  DevdigitaX, we provide professional <strong>graphic design in Dhaka</strong> and
                  throughout Bangladesh.
                </p>
                <p>
                  Our mission is to deliver stunning visuals that communicate your brand's values
                  and resonate with your audience.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  100+
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Creative Hub</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      Dhaka's Leading Design Team
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[100%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">100+</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">Brands Designed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Logo & Branding</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  Your logo is the face of your business. Our{" "}
                  <strong>logo design services in Bangladesh</strong> create a unique identity for
                  your brand.
                </p>
                <p>
                  We also offer branding kits, business cards, and style guides to ensure consistency.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  📢
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Digital & Print</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  Whether it's eye-catching banners for digital ads or flyers for print, we've got
                  you covered.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      Art
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Elite Artists</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Nuance Section */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                Cultural Design <br />
                <span className="text-primary">Nuances in Dhaka</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  Design in <strong>Dhaka</strong> has unique cultural preferences. We create
                  visuals that feel authentic and relatable to people in{" "}
                  <strong>Bangladesh</strong>.
                </p>
                <p>
                  We tailor our designs to meet the visual expectations of your target audience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">🎯</span>
                <span className="text-sm font-bold">Targeted Visual Strategy</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl">🌏</span>
                <span className="text-sm font-bold">Global Aesthetics, Local Heart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  seo: {
    title: "Search Engine Optimization",
    description:
      "Technical optimisation, structured content and authority building — aligned with how your customers actually search.",
    heroImage:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "🔍", text: "In-depth keyword research and analysis" },
      { icon: "📝", text: "On-page SEO optimization (meta, headings, content)" },
      { icon: "🔗", text: "Quality backlink building from authoritative sites" },
      { icon: "⚙️", text: "Technical SEO audits and fixes" },
      { icon: "📈", text: "Monthly ranking and traffic reports" },
      { icon: "🎯", text: "Local SEO for Bangladesh-based businesses" },
    ],
    technologies: [
      { name: "Google Analytics", icon: "📊" },
      { name: "Search Console", icon: "🔍" },
      { name: "Ahrefs/SEMrush", icon: "📈" },
      { name: "Screaming Frog", icon: "🦎" },
    ],
    process: [
      "Phase 1: Comprehensive website audit and competitor analysis",
      "Phase 2: Keyword strategy and content planning",
      "Phase 3: On-page optimization and technical fixes",
      "Phase 4: Content creation and link building",
      "Phase 5: Monitoring and monthly reporting",
      "Phase 6: Continuous adjustment based on performance",
    ],
    callToAction: "Want to rank higher on Google and get more organic traffic?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                #1 Ranking Goal
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Search Engine Optimization <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  (SEO) in Dhaka
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  In the competitive digital landscape of <strong>Bangladesh</strong>, being visible
                  on search engines like Google is crucial for success. At DevdigitaX, we offer
                  professional <strong>SEO services in Dhaka</strong> designed to improve your
                  rankings and drive organic traffic.
                </p>
                <p>
                  Our mission is to help your business reach the top of search results for keywords
                  that matter most in <strong>Dhaka, Bangladesh</strong>. We don't just focus on
                  rankings; we focus on high-quality traffic that converts.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  #1
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Data-First</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      Analytics Driven Strategies
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[95%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">95%</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Visibility Increase
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Why Local SEO in Dhaka?</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  For businesses serving <strong>Dhaka</strong>, local SEO is essential. We help you
                  reach customers in your specific area of <strong>Bangladesh</strong> by optimizing
                  your Google Business Profile and building location-specific content.
                </p>
                <p>
                  Our team in <strong>Dhaka</strong> understands local search behaviors, giving you a
                  significant advantage in the <strong>Bangladesh</strong> market.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  ⚙️
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Technical & Content SEO</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  A strong foundation is essential for success in <strong>Dhaka</strong>. We perform
                  in-depth audits to fix speed, broken links, and mobile-friendliness for users in{" "}
                  <strong>Bangladesh</strong>.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      Dev
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Expert Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* Authority Section with Glassmorphism */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                Authoritative <br />
                <span className="text-primary">Authority Building</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  Building high-quality backlinks is key for domain authority in{" "}
                  <strong>Bangladesh</strong>. We use ethical, white-hat strategies to acquire
                  links from authoritative sites in Dhaka.
                </p>
                <p>
                  This helps you build credibility with search engines and outrank competitors in the{" "}
                  <strong>Bangladesh</strong> digital space.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-bold flex items-center gap-3">
                  <span className="text-primary text-xl">🔗</span> White-Hat Links
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-bold flex items-center gap-3">
                  <span className="text-primary text-xl">📈</span> Monthly Reports
                </div>
              </div>
            </div>
            <div className="relative aspect-square max-w-sm mx-auto w-full">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative h-full w-full rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center group">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  🚀
                </div>
                <div className="text-3xl font-black mb-2">99.9%</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Success Rate in Dhaka
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future-Proofing Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center py-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              The Future of SEO in <br />
              <span className="text-primary">Dhaka & Bangladesh</span>
            </h3>
            <div className="prose prose-invert prose-lg text-muted-foreground/80 leading-relaxed">
              <p>
                The SEO landscape is constantly evolving. In <strong>Dhaka</strong>, we stay ahead
                of trends like voice search and AI-driven results to keep your business competitive
                in <strong>Bangladesh</strong>.
              </p>
              <p>
                We offer ongoing strategies that adapt to the changing digital landscape of{" "}
                <strong>Dhaka, Bangladesh</strong>, ensuring sustained growth.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[450px] grid grid-cols-2 gap-6">
            <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500/40 transition-all duration-500">
              <div className="h-20 w-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-4xl mb-6 group-hover:rotate-12 transition-transform">
                🗣️
              </div>
              <div className="font-black text-xl mb-2">Voice Search</div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Optimization
              </div>
            </div>
            <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 flex flex-col items-center justify-center p-8 text-center group hover:border-orange-500/40 transition-all duration-500 mt-12 lg:mt-24">
              <div className="h-20 w-20 rounded-3xl bg-orange-500/10 flex items-center justify-center text-4xl mb-6 group-hover:-rotate-12 transition-transform">
                🤖
              </div>
              <div className="font-black text-xl mb-2">AI Search</div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                Future-Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Facebook Ads campaigns targeting audiences who actually need your service. Comprehensive Google Ads marketing across search, display, and video.",
    heroImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&h=600&fit=crop",
    features: [
      { icon: "📘", text: "Facebook & Instagram ad campaigns with precise targeting" },
      { icon: "🔍", text: "Google Search Ads for high-intent customers" },
      { icon: "🎬", text: "YouTube video ads for brand awareness" },
      { icon: "🎯", text: "Audience research and custom audience building" },
      { icon: "📊", text: "A/B testing and campaign optimization" },
      { icon: "💰", text: "Budget management and ROI tracking" },
    ],
    technologies: [
      {
        name: "Meta Ads Manager",
        icon: "📘",
        bg: "bg-gradient-to-br from-blue-500/15 to-cyan-500/20",
        text: "text-blue-500",
      },
      {
        name: "Google Ads",
        icon: "🔍",
        bg: "bg-gradient-to-br from-emerald-500/15 via-yellow-300/20 to-sky-500/20",
        text: "text-emerald-500",
      },
      {
        name: "Google Analytics",
        icon: "📊",
        bg: "bg-gradient-to-br from-orange-400/15 to-amber-400/20",
        text: "text-orange-400",
      },
      {
        name: "HubSpot/Mailchimp",
        icon: "✉️",
        bg: "bg-gradient-to-br from-fuchsia-500/15 to-violet-500/20",
        text: "text-fuchsia-500",
      },
    ],
    process: [
      "Business analysis and goal setting",
      "Audience research and competitor analysis",
      "Campaign strategy and creative development",
      "Launch and active management",
      "Performance tracking and weekly reporting",
      "Scaling successful campaigns",
    ],
    callToAction: "Ready to grow your business with strategic paid advertising?",
    detailedContent: (
      <div className="space-y-32">
        {/* Cinematic Header Section */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Performance Driven
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Digital Marketing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">
                  Services in Dhaka
                </span>
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground/90 leading-relaxed">
                <p className="text-xl">
                  In today's hyper-connected world, digital marketing is the key to growth. At
                  DevdigitaX, we offer professional <strong>digital marketing in Dhaka</strong> and
                  throughout Bangladesh.
                </p>
                <p>
                  Our mission is to deliver strategic campaigns that generate leads, increase sales,
                  and drive sustained revenue growth.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-80 group">
              <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40">
                <div className="absolute -top-4 -right-4 h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-3xl font-black shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  5X
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-black text-primary mb-1">Growth First</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      Performance Marketing Experts
                    </div>
                  </div>
                  <div className="pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-primary">5X</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Avg. ROI for Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                📱
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Social Media Ads</h3>
              <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed">
                <p>
                  Social media is a powerful tool in <strong>Bangladesh</strong>. We manage targeted
                  ads on Facebook and Instagram for businesses in Dhaka.
                </p>
                <p>
                  Our strategies are designed to engage your audience and drive real results,
                  reaching the right people at the right time.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-card border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="h-14 w-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/20 text-primary flex items-center justify-center text-2xl mb-8">
                  🔍
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Google Ads (SEM)</h3>
                <p className="text-muted-foreground/90 leading-relaxed">
                  Reach customers actively searching for your services in <strong>Dhaka</strong>. We
                  create high-performance Google Ads campaigns.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold"
                    >
                      Ads
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-primary uppercase">Ads Specialists</div>
              </div>
            </div>
          </div>
        </div>

        {/* CRO Section */}
        <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-950 border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                Conversion Rate <br />
                <span className="text-primary">Optimization (CRO)</span>
              </h3>
              <div className="space-y-6 text-muted-foreground/80 text-lg">
                <p>
                  Traffic is only half the battle. We focus on CRO to ensure users take
                  action—whether it's a purchase or a form fill.
                </p>
                <p>
                  We analyze user behavior and perform A/B tests to remove barriers and maximize your
                  marketing effectiveness.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl text-primary">⚡</span>
                <span className="text-sm font-bold">High-Conversion Sales Funnels</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-primary/50 transition-colors flex items-center gap-4">
                <span className="text-2xl text-primary">📊</span>
                <span className="text-sm font-bold">Advanced Data Insights & Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center py-12">
          <div className="flex-1 space-y-8">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Strategic Marketing <br />
              <span className="text-primary">Consultation</span>
            </h3>
            <div className="prose prose-invert prose-lg text-muted-foreground/80 leading-relaxed">
              <p>
                We don't just execute campaigns; we provide consultation to build long-term growth
                plans for your business.
              </p>
              <p>
                Our team in <strong>Dhaka</strong> works closely with you to align digital marketing
                with your vision for success.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[400px]">
            <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-card border border-primary/20 shadow-2xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <div className="font-black text-xl mb-2">Growth Partner</div>
                <p className="text-muted-foreground/90 text-sm leading-relaxed">
                  Your success in <strong>Bangladesh</strong> is our primary goal. We act as an
                  extension of your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

import { getServices } from "@/utils/data";

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const dynamicServices = getServices();
  const dynamicService = dynamicServices.find((s) => s.slug === serviceId);
  const staticContent = serviceContent[serviceId];

  // Merge dynamic data with static content if it exists
  const service = dynamicService
    ? {
        ...(staticContent || {
          features: [],
          technologies: [],
          process: [],
          heroImage: readyecommerce,
          callToAction: "Contact us to learn more about this service.",
        }),
        title: dynamicService.title,
        description: dynamicService.description,
      }
    : staticContent;

  if (!service) {
    return (
      <SiteLayout>
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Service Not Found</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-lg">
            We couldn't find the service you were looking for. It might have been moved or doesn't
            exist.
          </p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4" /> Browse All Services
          </a>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Premium Split Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
        {/* Background Gradients & Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--gradient-primary-light),transparent_50%)] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,var(--gradient-primary-light),transparent_40%)] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-bold text-primary mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Premium Solution
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
              {service.title.split(" ").map((word, i, arr) =>
                i >= arr.length - 2 ? (
                  <span
                    key={i}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient"
                  >
                    {" "}
                    {word}
                  </span>
                ) : (
                  <span key={i}> {word}</span>
                ),
              )}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-primary-foreground font-black shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1.5 transition-all duration-500 group"
              >
                Start Your Project{" "}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl font-black hover:bg-white/10 transition-all duration-500"
              >
                Explore Features
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap gap-8 items-center opacity-60">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Verified Experts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Custom Strategies
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Premium Support</span>
              </div>
            </div>
          </div>

          {/* Floating Hero Image Section */}
          <div className="relative lg:h-[650px] flex items-center justify-center">
            {/* Cinematic Frames */}
            <div className="absolute -top-12 -right-12 w-48 h-48 border-t-2 border-r-2 border-primary/20 rounded-tr-[4rem] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 border-b-2 border-l-2 border-primary/20 rounded-bl-[4rem] pointer-events-none" />

            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(var(--primary-rgb),0.1)] group">
              <img
                src={service.heroImage || readyecommerce}
                alt={service.title}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                onError={(event) => {
                  event.currentTarget.src = readyecommerce;
                }}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[2s]"
              />
              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/20 to-transparent opacity-60" />

              {/* Floating Stat Card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-primary font-black text-3xl mb-1">99.9%</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Uptime & Reliability
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-xl">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Premium Bento Grid) */}
      <section id="features" className="relative py-32 bg-slate-950/50 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gradient-primary-light),transparent_70%)] opacity-5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">What You Get</h2>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              We deliver comprehensive, end-to-end solutions designed to give you a competitive
              edge. Every detail is crafted for performance and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <p className="text-xl font-bold text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section (Premium) */}
      <section className="relative py-32 overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-32">
              {/* This will render the enhanced JSX sections */}
              {service.detailedContent}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section (Cinematic Timeline) */}
      <section className="py-32 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Execution
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Our Proven <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                  Process
                </span>
              </h2>
              <p className="text-lg text-muted-foreground/80 mb-10 leading-relaxed">
                A transparent, step-by-step approach ensuring we deliver exactly what your business
                needs, on time and with exceptional quality. No guesswork, just results.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 text-primary font-black text-lg hover:gap-5 transition-all group"
              >
                Start the process today <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="lg:col-span-7 relative">
              {/* Connecting Line */}
              <div className="absolute left-[31px] top-8 bottom-8 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent" />

              <div className="space-y-12 relative">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex gap-10 relative group">
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-3xl border border-white/10 bg-slate-900 shadow-2xl flex items-center justify-center font-black text-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                      {idx + 1}
                    </div>
                    <div className="pt-4 pb-2 group-hover:translate-x-2 transition-transform duration-500">
                      <h3 className="text-2xl font-black mb-3 tracking-tight">Phase {idx + 1}</h3>
                      <p className="text-muted-foreground/70 leading-relaxed text-lg">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section (Cinematic Marquee feel) */}
      <section className="py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-black tracking-[0.2em] mb-4 text-muted-foreground/40 uppercase">
              Technology Stack
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {service.technologies.map((tech, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-4 transition-all duration-500"
              >
                <div
                  className={`h-24 w-24 rounded-[2rem] ${tech.bg} border border-white/10 flex items-center justify-center text-5xl ${tech.text} group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] group-hover:border-primary/50 transition-all duration-500`}
                >
                  {tech.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Cinematic) */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative p-12 md:p-24 rounded-[4rem] bg-primary overflow-hidden shadow-2xl shadow-primary/40 group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent)] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-black/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
              {service.callToAction}
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto font-medium">
              Don't let your competition outpace you. Let's build something extraordinary together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-white text-primary font-black text-xl shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all duration-500"
            >
              Get a Free Consultation <ArrowRight className="h-6 w-6" />
            </a>
            <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60">
              No commitment required · We respond within 24 hours
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
