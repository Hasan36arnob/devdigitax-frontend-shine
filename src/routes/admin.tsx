import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { Article, Eye, Edit3, Trash2, Plus, Save, X, LogOut, LayoutDashboard } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  status: "draft" | "published";
}

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Panel — DevdigitaX" },
      {
        name: "description",
        content: "Manage blog articles and content for DevdigitaX.",
      },
    ],
  }),
});

const initialArticles: Article[] = [
  {
    id: 1,
    title: "How to Choose the Right Digital Marketing Agency for Your Business",
    excerpt: "Learn the key factors to consider when selecting a digital marketing partner...",
    content: "Full article content goes here...",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop",
    date: "2026-05-01",
    status: "published",
  },
];

function AdminPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [activeTab, setActiveTab] = useState<"dashboard" | "articles">("dashboard");
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
  });

  const stats = [
    { label: "Total Articles", value: articles.length, icon: Article },
    { label: "Published", value: articles.filter((a) => a.status === "published").length, icon: Eye },
    { label: "Drafts", value: articles.filter((a) => a.status === "draft").length, icon: Edit3 },
  ];

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      image: "",
    });
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsCreating(false);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      image: article.image,
    });
  };

  const handleSave = () => {
    if (isCreating) {
      const newArticle: Article = {
        id: Date.now(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image: formData.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&h=600&fit=crop",
        date: new Date().toISOString().split("T")[0],
        status: "published" as const,
      };
      setArticles([newArticle, ...articles]);
    } else if (editingArticle) {
      setArticles(
        articles.map((a) =>
          a.id === editingArticle.id
            ? { ...a, ...formData }
            : a
        )
      );
    }
    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
            <p className="mt-2 text-muted-foreground">Manage your blog articles and content</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            <Plus className="h-4 w-4" /> New Article
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
            {activeTab === "dashboard" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-3 text-sm font-medium transition-all relative ${
              activeTab === "articles" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Articles
            {activeTab === "articles" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Articles View */}
        {activeTab === "articles" && (
          <div className="space-y-4">
            {(isCreating || editingArticle) ? (
              <div className="p-8 rounded-2xl border border-border bg-card">
                <h2 className="text-2xl font-bold mb-6">
                  {isCreating ? "Create New Article" : "Edit Article"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                      placeholder="Enter article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none"
                      rows={2}
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none"
                      rows={8}
                      placeholder="Full article content (Markdown supported)"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                        placeholder="e.g., SEO, Web Development"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-primary-foreground"
                      style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                    >
                      <Save className="h-4 w-4" /> {isCreating ? "Publish" : "Update"}
                    </button>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingArticle(null);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border border-border hover:bg-accent transition-all"
                    >
                      <X className="h-4 w-4" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Status</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium line-clamp-1">{article.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {article.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              article.status === "published"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(article)}
                              className="p-2 rounded-lg hover:bg-accent transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
