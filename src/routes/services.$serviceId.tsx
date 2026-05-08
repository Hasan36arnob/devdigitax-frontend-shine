import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";

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
          "Technical optimization, structured content and authority building — aligned with how your customers actually search.",
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
  },
  ecommerce: {
    title: "E-Commerce Website Development",
    description:
      "High-converting product pages, frictionless checkout, and systems that turn first-time buyers into repeat customers.",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200&h=600&fit=crop",
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
      "Comprehensive website audit and competitor analysis",
      "Keyword strategy and content planning",
      "On-page optimization and technical fixes",
      "Content creation and link building",
      "Monitoring and monthly reporting",
      "Continuous adjustment based on performance",
    ],
    callToAction: "Want to rank higher on Google and get more organic traffic?",
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
      { name: "Meta Ads Manager", icon: "📘" },
      { name: "Google Ads", icon: "🔍" },
      { name: "Google Analytics", icon: "📊" },
      { name: "HubSpot/Mailchimp", icon: "✉️" },
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
  },
};

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const service = serviceContent[serviceId];

  if (!service) {
    return (
      <SiteLayout>
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Service Not Found</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-lg">
            We couldn't find the service you were looking for. It might have been moved or doesn't exist.
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
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--gradient-primary-light),transparent_50%)] opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,var(--gradient-primary-light),transparent_40%)] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Premium Service
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              {service.title.split(' ').map((word, i, arr) => (
                i === arr.length - 1 ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600"> {word}</span>
                ) : (
                  <span key={i}> {word}</span>
                )
              ))}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-card/50 backdrop-blur-sm font-semibold hover:bg-accent transition-all duration-300"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Floating Hero Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Glowing orb behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 transform transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src={service.heroImage} 
                alt={service.title} 
                className="w-full h-full object-cover object-center"
              />
              {/* Glassmorphic overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid Style) */}
      <section id="features" className="relative py-24 bg-card/30 border-y border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What You Get</h2>
            <p className="text-lg text-muted-foreground">
              We deliver comprehensive, end-to-end solutions designed to give you a competitive edge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl border border-border bg-background/50 backdrop-blur-md overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <p className="text-lg font-semibold text-foreground">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Our Proven Process</h2>
              <p className="text-lg text-muted-foreground mb-10">
                A transparent, step-by-step approach ensuring we deliver exactly what your business needs, on time and with exceptional quality.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Start the process today <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 via-border to-transparent" />
              
              <div className="space-y-8 relative">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex gap-6 relative group">
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full border-2 border-background bg-card shadow-md flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                      {idx + 1}
                    </div>
                    <div className="pt-3 pb-2 group-hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">Phase {idx + 1}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-card/30 border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-muted-foreground">Empowered by Modern Technology</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {service.technologies.map((tech, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-3 p-6 w-32 md:w-40 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 cursor-default"
              >
                <div className="text-4xl md:text-5xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                  {tech.icon}
                </div>
                <h3 className="font-medium text-sm md:text-base text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-950 text-white border border-white/10 shadow-2xl shadow-primary/20">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-purple-900/40" />
          
          <div className="relative z-10 p-12 md:p-24 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
              {service.callToAction}
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Don't let your competition outpace you. Let's build something extraordinary together with our {service.title.toLowerCase()} expertise.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-zinc-950 font-bold text-lg hover:scale-105 hover:bg-zinc-100 hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
            >
              Get a Free Consultation <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-6 text-sm text-zinc-400">No commitment required. We respond within 24 hours.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
