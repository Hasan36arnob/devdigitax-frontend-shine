import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: function BlogPage() {
    interface Article {
      id: number;
      title: string;
      excerpt: string;
      content: string;
      category: string;
      tags: string[];
      image: string;
      date: string;
      status: "draft" | "published";
      readTime: string;
    }

    const STORAGE_KEY = "devdigitax_articles";

    const defaultArticles: Article[] = [
      {
        id: 1,
        title: "How to Grow Your Business with SEO in 2026",
        excerpt:
          "A practical guide to SEO tactics that deliver measurable traffic and leads for Dhaka businesses.",
        content:
          "Search engine optimization is still one of the strongest long-term growth channels. In this article, we cover keyword research, site structure, local SEO, and content planning that helps your brand rank in competitive markets.",
        category: "SEO",
        tags: ["SEO", "marketing", "growth"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
        date: "2026-05-15",
        status: "published",
        readTime: "5 min read",
      },
      {
        id: 2,
        title: "5 Web Design Trends That Convert More Customers",
        excerpt:
          "Learn which design patterns, micro-interactions, and layouts help convert visitors into clients in 2026.",
        content:
          "Great design is more than visuals—it's clarity, trust, and conversion. This post walks through the latest trends in landing pages, mobile-first UX, and user flow improvements that can boost sales and reduce bounce rates.",
        category: "Design",
        tags: ["design", "ux", "conversion"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
        date: "2026-05-10",
        status: "published",
        readTime: "4 min read",
      },
      {
        id: 3,
        title: "Why Fast Websites Matter for Local Customers",
        excerpt:
          "Speed, performance, and mobile experience are critical for local search and Google rankings.",
        content:
          "Slow pages hurt your SEO and lose customers before they even see your services. In this article, we explain core web vitals, image optimization, and practical performance fixes for small businesses.",
        category: "Performance",
        tags: ["performance", "web", "mobile"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        date: "2026-05-05",
        status: "published",
        readTime: "3 min read",
      },
    ];

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
      const savedArticles = localStorage.getItem(STORAGE_KEY);
      if (savedArticles) {
        const allArticles = JSON.parse(savedArticles) as Article[];
        const publishedArticles = allArticles.filter((a) => a.status === "published");
        publishedArticles.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setArticles(publishedArticles.length ? publishedArticles : defaultArticles);
      } else {
        setArticles(defaultArticles);
      }
    }, []);

    const slugForPost = (post: Article) => {
      if (post.id === 1) return "how-to-grow-your-business-with-seo-in-2026";
      if (post.id === 2) return "5-web-design-trends-that-convert-more-customers";
      if (post.id === 3) return "why-fast-websites-matter-for-local-customers";
      return post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    };

    return (
      <SiteLayout>
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-40 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
              Our Blog
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Insights & Strategies for Digital Growth
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert advice on web development, SEO, and digital marketing to help your business
              thrive online.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: slugForPost(post) }}
                  className="group rounded-2xl overflow-hidden border border-border bg-card text-left hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
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
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="mt-6 flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      Read full article <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </SiteLayout>
    );
  },
  head: () => ({
    meta: [
      { title: "Blog — DevdigitaX" },
      {
        name: "description",
        content:
          "Insights, tips, and strategies on web development, SEO, and digital marketing from DevdigitaX.",
      },
    ],
  }),
});

