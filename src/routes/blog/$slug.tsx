import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Calendar, Clock } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/blog/$slug")({
  component: function BlogPostRoute() {
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

    const { slug } = Route.useParams();

    const defaultArticles: Article[] = [
      {
        id: 1,
        title: "How to Grow Your Business with SEO in 2026",
        excerpt:
          "A practical guide to SEO tactics that deliver measurable traffic and leads for growing businesses.",
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

    const article = useMemo(() => {
      if (typeof window === "undefined") return null;

      const savedArticlesRaw = localStorage.getItem(STORAGE_KEY);
      const allArticles: Article[] = savedArticlesRaw
        ? JSON.parse(savedArticlesRaw)
        : defaultArticles;

      const publishedArticles = allArticles.filter((a) => a.status === "published");

      // map known titles -> slugs (so URLs stay stable)
      const knownSlugById: Record<number, string> = {
        1: "how-to-grow-your-business-with-seo-in-2026",
        2: "5-web-design-trends-that-convert-more-customers",
        3: "why-fast-websites-matter-for-local-customers",
      };

      const bySlug = publishedArticles.find((a) => {
        const stableSlug = knownSlugById[a.id];
        if (stableSlug) return stableSlug === slug;

        // fallback: slugify title-ish
        return slug === a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      });

      return bySlug ?? null;
    }, [slug]);

    if (!article) {
      throw notFound();
    }

    return (
      <SiteLayout>
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                {article.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
                {article.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
            <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-background mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="prose prose-invert max-w-none whitespace-pre-line text-sm text-foreground">
                {article.content}
              </div>
            </article>

            <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm h-fit">
              <h3 className="text-lg font-semibold">Quick take</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground/90">Tags</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  Back to posts
                </a>
              </div>
            </aside>
          </div>
        </section>
      </SiteLayout>
    );
  },
  head: ({ params }) => {
    // minimal head support; article content is client-side
    return {
      meta: [
        {
          title: `Blog — ${params.slug}`,
        },
      ],
    };
  },
});

