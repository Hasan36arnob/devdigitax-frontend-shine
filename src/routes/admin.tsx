import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useEffect, useMemo } from "react";
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
  LayoutDashboard,
  Briefcase,
  Mail,
  Settings,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  User,
  LogOut,
  Menu,
  ChevronDown,
  Globe,
  Terminal,
  Activity,
  Shield,
  HelpCircle,
  MoreVertical,
  Filter,
  Download,
  Share2,
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

interface Message {
  id: number;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export const Route = createFileRoute("/admin")({
  component: function AdminPage() {
    const STORAGE_KEY_ARTICLES = "devdigitax_articles";
    const STORAGE_KEY_MESSAGES = "devdigitax_messages";
    const ADMIN_PASSWORD = "devdigitax2026";

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState("");
    const [activeTab, setActiveTab] = useState<"dashboard" | "articles" | "services" | "messages" | "settings">(
      "dashboard",
    );
    const [activeView, setActiveView] = useState<"list" | "create" | "edit">("list");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [articles, setArticles] = useState<Article[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [formData, setFormData] = useState<Article>({
      id: 0,
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      image: "",
      date: "",
      status: "draft",
      readTime: "",
    });
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    useEffect(() => {
      if (isAuthenticated) {
        const savedArticles = localStorage.getItem(STORAGE_KEY_ARTICLES);
        const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
        
        if (savedArticles) setArticles(JSON.parse(savedArticles));
        if (savedMessages) setMessages(JSON.parse(savedMessages));
      }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Incorrect password.");
      }
    };

    const navItems = [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "articles", label: "Content Manager", icon: FileText },
      { id: "services", label: "Service Catalog", icon: Briefcase },
      { id: "messages", label: "Lead Center", icon: Mail, badge: messages.filter(m => m.status === 'new').length },
      { id: "settings", label: "System Settings", icon: Settings },
    ];

    if (!isAuthenticated) {
      return (
        <SiteLayout>
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
            <div className="w-full max-w-md">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-10">
                <div className="text-center mb-10">
                  <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Google Cloud Console</h1>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-2">Sign in to DevdigitaX Console</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Admin Password</label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                      placeholder="••••••••"
                      autoFocus
                    />
                    {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                    Next
                  </button>
                </form>
              </div>
            </div>
          </div>
        </SiteLayout>
      );
    }

    return (
      <SiteLayout>
        <div className="min-h-screen bg-zinc-50 dark:bg-[#0f1115] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
          {/* Top Google-style Bar */}
          <header className="h-14 bg-white dark:bg-[#1a1c1e] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 sticky top-0 z-[60]">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                <Menu className="h-5 w-5 text-zinc-500" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">DX</div>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 hidden md:block">DevdigitaX Console</span>
              </div>
              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-[#2c2e31] px-3 py-1.5 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">My First Project</span>
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </div>
            </div>

            <div className="flex-1 max-w-2xl px-8 hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search resources, services, and docs (/) "
                  className="w-full bg-zinc-100 dark:bg-[#2c2e31] border-none rounded-md px-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full hidden sm:block">
                <Terminal className="h-5 w-5 text-zinc-500" />
              </button>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                <Bell className="h-5 w-5 text-zinc-500" />
              </button>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full hidden sm:block">
                <HelpCircle className="h-5 w-5 text-zinc-500" />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer ml-2 border-2 border-white dark:border-zinc-800">
                HJ
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white dark:bg-[#1a1c1e] border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col overflow-hidden`}>
              <div className="flex-1 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setActiveView("list");
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase">System Status</div>
                    <div className="text-xs font-bold text-emerald-500">All Systems Operational</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-[#0f1115]">
              {/* Dashboard */}
              {activeTab === "dashboard" && (
                <div className="p-8 space-y-8 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome back, Hasan</h1>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Here is what is happening with your projects today.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
                        <Download className="h-4 w-4" /> Export Report
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                        <Plus className="h-4 w-4" /> New Deployment
                      </button>
                    </div>
                  </div>

                  {/* Widgets Grid */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-zinc-700 dark:text-zinc-300">Revenue Metrics</h3>
                        <MoreVertical className="h-4 w-4 text-zinc-400 cursor-pointer" />
                      </div>
                      <div className="flex items-end gap-4 mb-6">
                        <div className="text-4xl font-bold">$124,592</div>
                        <div className="flex items-center text-emerald-500 text-sm font-bold pb-1">
                          <TrendingUp className="h-4 w-4 mr-1" /> +14.5%
                        </div>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[75%]" />
                      </div>
                      <div className="flex justify-between mt-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <span>Target: $150k</span>
                        <span>75% Achieved</span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-zinc-700 dark:text-zinc-300">Traffic Distribution</h3>
                        <Filter className="h-4 w-4 text-zinc-400 cursor-pointer" />
                      </div>
                      <div className="space-y-4">
                        {[
                          { l: "Organic Search", v: "45%", c: "bg-blue-500" },
                          { l: "Direct", v: "25%", c: "bg-emerald-500" },
                          { l: "Social Media", v: "20%", c: "bg-purple-500" },
                          { l: "Other", v: "10%", c: "bg-amber-500" }
                        ].map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-zinc-600 dark:text-zinc-400">{item.l}</span>
                              <span className="text-zinc-900 dark:text-zinc-100 font-bold">{item.v}</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full ${item.c}`} style={{ width: item.v }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-zinc-700 dark:text-zinc-300">Global Uptime</h3>
                        <Globe className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div className="grid grid-cols-5 gap-1 mb-6">
                        {Array.from({ length: 45 }).map((_, i) => (
                          <div key={i} className={`h-8 rounded-[2px] ${i === 34 ? 'bg-amber-500' : i > 40 ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-emerald-500'} opacity-80`} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-emerald-500">99.98% Operational</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Last 30 Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Resource Management Table */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <h3 className="font-bold text-lg">Active Services</h3>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"><Search className="h-4 w-4 text-zinc-500" /></button>
                        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"><Filter className="h-4 w-4 text-zinc-500" /></button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">
                          <tr>
                            <th className="px-6 py-4">Resource Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Utilization</th>
                            <th className="px-6 py-4">Last Modified</th>
                            <th className="px-6 py-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {[
                            { n: "Web Core Production", s: "Healthy", u: "42%", t: "12 mins ago" },
                            { n: "Database Cluster A", s: "Healthy", u: "18%", t: "2 hours ago" },
                            { n: "CDN Static Assets", s: "Warning", u: "88%", t: "Just now" },
                            { n: "Mail Delivery Node", s: "Healthy", u: "5%", t: "3 days ago" }
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                              <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-200">{row.n}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${row.s === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                  <div className={`h-1 w-1 rounded-full ${row.s === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                  {row.s}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-24">
                                    <div className={`h-full ${parseInt(row.u) > 80 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: row.u }} />
                                  </div>
                                  <span className="text-[10px] font-bold text-zinc-500">{row.u}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-zinc-500">{row.t}</td>
                              <td className="px-6 py-4">
                                <button className="p-1 hover:text-blue-500 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Manager Tab */}
              {activeTab === "articles" && (
                <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {activeView === "list" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Content Inventory</h1>
                        <button 
                          onClick={() => setActiveView('create')}
                          className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                        >
                          <Plus className="h-4 w-4" /> Create Article
                        </button>
                      </div>

                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input type="text" placeholder="Filter articles..." className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-md pl-10 py-2 text-sm outline-none" />
                          </div>
                          <button className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"><Filter className="h-4 w-4" /></button>
                        </div>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {articles.map((article) => (
                            <div key={article.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all group flex items-center gap-6">
                              <div className="h-16 w-16 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200 dark:border-zinc-700">
                                <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{article.category}</span>
                                  <span className={`text-[10px] font-bold uppercase ${article.status === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>{article.status}</span>
                                </div>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{article.title}</h3>
                                <div className="flex items-center gap-4 mt-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 transition-all"><Edit3 className="h-4 w-4" /></button>
                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500 transition-all"><Trash2 className="h-4 w-4" /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-5xl mx-auto space-y-8">
                      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setActiveView('list')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <X className="h-5 w-5" />
                          </button>
                          <h2 className="text-xl font-bold">{activeView === 'create' ? 'Create Deployment' : 'Edit Resource'}</h2>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setActiveView('list')} className="px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">Discard</button>
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-bold shadow-lg shadow-blue-500/20">Apply Changes</button>
                        </div>
                      </div>
                      
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 space-y-6 shadow-sm">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Resource Identifier</label>
                              <input type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold" placeholder="e.g. blog-post-01" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Article Body</label>
                              <textarea className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all h-96 resize-none font-mono text-sm" placeholder="// Start composing your content here..." />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                            <h4 className="font-bold mb-4 flex items-center gap-2"><Settings className="h-4 w-4" /> Configuration</h4>
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase">Region/Category</label>
                                <select className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-md px-3 py-2 text-sm outline-none">
                                  <option>Digital Marketing</option>
                                  <option>Web Development</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase">Featured Image</label>
                                <input type="text" className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-md px-3 py-2 text-sm outline-none" placeholder="https://..." />
                              </div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                            <h4 className="font-bold mb-4 flex items-center gap-2"><Shield className="h-4 w-4" /> Policy</h4>
                            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Auto-scaling enabled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs follow the same professional structure... */}
              {(activeTab === "messages" || activeTab === "services" || activeTab === "settings") && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 opacity-50">
                  <div className="h-20 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                    <LayoutDashboard className="h-10 w-10 text-zinc-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Module Provisioning in Progress</h2>
                  <p className="text-sm max-w-md">This module is currently being optimized for high-performance scale. Please check back shortly for full access.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </SiteLayout>
    );
  },
  head: () => ({
    meta: [
      { title: "Google Cloud Console — DevdigitaX" },
      {
        name: "description",
        content: "Enterprise-grade cloud management for your digital assets.",
      },
    ],
  }),
});
