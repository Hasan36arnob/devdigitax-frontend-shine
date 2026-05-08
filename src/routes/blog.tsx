import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — DevdigitaX" },
      {
        name: "description",
        content: "Insights, tips, and strategies on web development, SEO, and digital marketing from DevdigitaX.",
      },
    ],
  }),
});

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Digital Marketing Agency for Your Business",
    excerpt: "Learn the key factors to consider when selecting a digital marketing partner that delivers real results and aligns with your growth goals.",
    date: "2026-05-01",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop",
    category: "Digital Marketing",
  },
  {
    id: 2,
    title: "WordPress vs Custom Development: Which is Right for Your Business?",
    excerpt: "We break down the pros and cons of WordPress websites versus custom-built solutions to help you make an informed decision.",
    date: "2026-04-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&h=600&fit=crop",
    category: "Web Development",
  },
  {
    id: 3,
    title: "SEO Best Practices for 2026: What You Need to Know",
    excerpt: "Stay ahead of the competition with our comprehensive guide to SEO strategies that drive organic traffic and improve rankings.",
    date: "2026-03-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&h=600&fit=crop",
    category: "SEO",
  },
  {
    id: 4,
    title: "Maximizing ROI with Facebook Ads: A Complete Guide",
    excerpt: "Discover how to create highly targeted Facebook ad campaigns that reach the right audience and deliver measurable returns.",
    date: "2026-02-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&h=600&fit=crop",
    category: "Paid Advertising",
  },
  {
    id: 5,
    title: "The Importance of Mobile-First Design in 2026",
    excerpt: "With mobile traffic dominating, learn why mobile-first design is critical for user experience and conversion optimization.",
    date: "2026-01-25",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&h=600&fit=crop",
    category: "Web Development",
  },
  {
    id: 6,
    title: "Content Marketing Strategies That Actually Convert",
    excerpt: "Move beyond vanity metrics. Learn how to create content that drives real conversions and builds lasting customer relationships.",
    date: "2025-12-18",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&h=600&fit=crop",
    category: "Content Marketing",
  },
];

function BlogPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-40 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
            Our Blog
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Insights & Strategies for Digital Growth
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice on web development, SEO, and digital marketing to help your business thrive online.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
