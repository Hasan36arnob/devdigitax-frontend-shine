import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
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

    const [articles, setArticles] = useState<Article[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
      const savedArticles = localStorage.getItem(STORAGE_KEY);
      if (savedArticles) {
        const allArticles = JSON.parse(savedArticles);
        const publishedArticles = allArticles.filter((a: Article) => a.status === "published");
        publishedArticles.sort(
          (a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setArticles(publishedArticles);
      }
    }, []);

    return (
      <SiteLayout>
        {/* Hero Section */}
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

        {/* Blog Grid */}
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
                  </div>
                </article>
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
