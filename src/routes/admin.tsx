import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Save,
  X,
  Calendar,
  Tag,
  Image,
  Upload,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  BarChart3,
  Clock,
  CheckCircle,
  Lock,
} from "lucide-react";

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

export const Route = createFileRoute("/admin")({
  component: function AdminPage() {
    const STORAGE_KEY = "devdigitax_articles";

    const defaultArticles: Article[] = [
      {
        id: 1,
        title: "How to Choose the Right Digital Marketing Agency for Your Business",
        excerpt:
          "Learn the key factors to consider when selecting a digital marketing partner that delivers real results and aligns with your growth goals.",
        content: "Full article content goes here...",
        category: "Digital Marketing",
        tags: ["marketing", "business", "tips"],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop",
        date: "2026-05-01",
        status: "published",
        readTime: "5 min read",
      },
    ];

    const categories = [
      "Digital Marketing",
      "Web Development",
      "SEO",
      "Paid Advertising",
      "Content Marketing",
      "E-commerce",
    ];

    const ADMIN_PASSWORD = "devdigitax2026";

    const [articles, setArticles] = useState<Article[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState("");
    const [activeView, setActiveView] = useState<"dashboard" | "articles" | "create" | "edit">(
      "dashboard",
    );
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [] as string[],
      image: "",
      readTime: "",
      status: "draft" as "draft" | "published",
    });
    const [tagInput, setTagInput] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
      if (isAuthenticated) {
        const savedArticles = localStorage.getItem(STORAGE_KEY);
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles));
        } else {
          setArticles(defaultArticles);
        }
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (isAuthenticated && articles.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      }
    }, [articles, isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Invalid password. Please try again.");
      }
    };

    const stats = [
      {
        label: "Total Articles",
        value: articles.length,
        icon: FileText,
        color: "from-blue-500 to-cyan-500",
      },
      {
        label: "Published",
        value: articles.filter((a) => a.status === "published").length,
        icon: Eye,
        color: "from-green-500 to-emerald-500",
      },
      {
        label: "Drafts",
        value: articles.filter((a) => a.status === "draft").length,
        icon: Edit3,
        color: "from-amber-500 to-orange-500",
      },
      {
        label: "Total Views",
        value: "12.5K",
        icon: BarChart3,
        color: "from-purple-500 to-pink-500",
      },
    ];

    const resetForm = () => {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [],
        image: "",
        readTime: "",
        status: "draft",
      });
      setTagInput("");
      setEditingArticle(null);
    };

    const handleCreateNew = () => {
      resetForm();
      setActiveView("create");
    };

    const handleEdit = (article: Article) => {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        tags: article.tags,
        image: article.image,
        readTime: article.readTime,
        status: article.status,
      });
      setActiveView("edit");
    };

    const handleSave = () => {
      if (!formData.title || !formData.content || !formData.category) {
        alert("Please fill in all required fields: Title, Content, and Category");
        return;
      }

      const now = new Date().toISOString().split("T")[0];

      if (activeView === "create") {
        const newArticle: Article = {
          id: Date.now(),
          title: formData.title,
          excerpt: formData.excerpt || formData.title.substring(0, 150) + "...",
          content: formData.content,
          category: formData.category,
          tags: formData.tags,
          image:
            formData.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&h=600&fit=crop",
          date: now,
          status: formData.status,
          readTime: formData.readTime || "5 min read",
        };
        setArticles([newArticle, ...articles]);
        setSuccessMessage("Article published successfully!");
      } else if (editingArticle) {
        setArticles(articles.map((a) => (a.id === editingArticle.id ? { ...a, ...formData } : a)));
        setSuccessMessage("Article updated successfully!");
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();
      setActiveView("dashboard");
    };

    const handleDelete = (id: number) => {
      if (confirm("Are you sure you want to delete this article?")) {
        setArticles(articles.filter((a) => a.id !== id));
        setSuccessMessage("Article deleted successfully!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    };

    const addTag = () => {
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
        setTagInput("");
      }
    };

    const removeTag = (tag: string) => {
      setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
    };

    // Login Screen
    if (!isAuthenticated) {
      return (
        <SiteLayout>
          <section className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <Lock className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
                <p className="mt-2 text-muted-foreground">
                  Enter password to access the admin panel
                </p>
              </div>
              <form
                onSubmit={handleLogin}
                className="p-8 rounded-2xl border border-border bg-card space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                >
                  <Lock className="h-4 w-4" />
                  Unlock Admin Panel
                </button>
              </form>
            </div>
          </section>
        </SiteLayout>
      );
    }

    // Admin Dashboard
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-8">
          {/* Success Message */}
          {showSuccess && (
            <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white shadow-lg animate-in slide-in-from-right">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage your blog content and track performance
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeView === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-accent"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveView("articles")}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeView === "articles"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-accent"
                }`}
              >
                <FileText className="h-4 w-4" />
                Articles
              </button>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                <Plus className="h-4 w-4" />
                New Article
              </button>
            </div>
          </div>

          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="relative group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1 overflow-hidden"
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                      />
                      <Icon className="h-10 w-10 text-primary mb-4 relative z-10" />
                      <div className="text-4xl font-bold relative z-10">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mt-1 relative z-10">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Articles */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Articles</h2>
                  <button
                    onClick={() => setActiveView("articles")}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {articles.slice(0, 5).map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent/30 transition-all cursor-pointer"
                      onClick={() => handleEdit(article)}
                    >
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {article.category} • {article.date}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                          article.status === "published"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Articles List View */}
          {activeView === "articles" && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">Read Time</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr
                        key={article.id}
                        className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="font-medium line-clamp-1 max-w-xs">{article.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${
                              article.status === "published"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {article.status === "published" ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <Edit3 className="h-3 w-3" />
                            )}
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {article.readTime}
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
            </div>
          )}

          {/* Create/Edit Article View */}
          {activeView === "create" || activeView === "edit" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="mb-6 flex items-center gap-4">
                <button
                  onClick={() => {
                    resetForm();
                    setActiveView("articles");
                  }}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">
                    {activeView === "create" ? "Create New Article" : "Edit Article"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activeView === "create"
                      ? "Write and publish a new blog article"
                      : "Make changes to your existing article"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <label className="block text-sm font-semibold mb-3">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg font-semibold"
                      placeholder="Enter article title..."
                    />
                  </div>

                  {/* Content Editor */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <label className="block text-sm font-semibold mb-3">Content *</label>
                    <div className="border border-border rounded-xl overflow-hidden">
                      {/* Toolbar */}
                      <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/20">
                        <button
                          className="p-2 rounded hover:bg-accent transition-colors"
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-accent transition-colors"
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <div className="w-px h-4 bg-border mx-1" />
                        <button
                          className="p-2 rounded hover:bg-accent transition-colors"
                          title="List"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-accent transition-colors"
                          title="Link"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-3 min-h-[300px] bg-background outline-none resize-none"
                        placeholder="Write your article content here..."
                        rows={12}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Tip: Write in Markdown format for best results
                    </p>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Featured Image */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Featured Image
                    </h3>
                    {formData.image ? (
                      <div className="relative rounded-xl overflow-hidden mb-3">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full aspect-video object-cover"
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer mb-3">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Paste image URL above or drag & drop
                        </p>
                      </div>
                    )}
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-3">Excerpt</h3>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none text-sm"
                      rows={4}
                      placeholder="Brief description of the article..."
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {formData.excerpt.length}/200 characters
                    </p>
                  </div>

                  {/* Publish Settings */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Publish Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Read Time</label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
                          placeholder="e.g., 5 min read"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: "draft" })}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                              formData.status === "draft"
                                ? "bg-amber-500/10 text-amber-600 border border-amber-500/50"
                                : "border border-border hover:bg-accent"
                            }`}
                          >
                            <Edit3 className="h-4 w-4 inline mr-2" />
                            Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: "published" })}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                              formData.status === "published"
                                ? "bg-green-500/10 text-green-600 border border-green-500/50"
                                : "border border-border hover:bg-accent"
                            }`}
                          >
                            <Eye className="h-4 w-4 inline mr-2" />
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category & Tags */}
                  <div className="p-6 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Categorization
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                            className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none"
                            placeholder="Add tag..."
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-sm"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleSave}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-primary-foreground"
                      style={{
                        background: "var(--gradient-primary)",
                        boxShadow: "var(--shadow-glow)",
                      }}
                    >
                      <Save className="h-4 w-4" />
                      {formData.status === "published" ? "Publish Article" : "Save as Draft"}
                    </button>
                    <button
                      onClick={() => {
                        resetForm();
                        setActiveView("articles");
                      }}
                      className="w-full px-5 py-3 rounded-lg font-semibold border border-border hover:bg-accent transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </SiteLayout>
    );
  },
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
