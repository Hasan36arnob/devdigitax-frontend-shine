import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useEffect, useMemo, useRef } from "react";
import "@/styles/premium.css";
import { 
  getServices, saveServices, 
  getPortfolio, savePortfolio,
  getTeam, saveTeam,
  getSiteConfig, saveSiteConfig,
  getArticles,
  getVisitors,
  ServiceItem, PortfolioItem, TeamMember, SiteConfig, VisitorData 
} from "@/utils/data";
import { getVisitorsServer, clearVisitorsServer } from "@/lib/analytics";
import {
  FileText,
  Edit3,
  Trash2,
  Plus,
  Save,
  X,
  Briefcase,
  Users,
  Settings as SettingsIcon,
  Globe,
  LayoutDashboard,
  Shield,
  Menu,
  Image as ImageIcon,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Activity,
  Zap,
  TrendingUp,
  Search,
  Bell,
  ChevronRight,
  Maximize2,
  Cpu,
  Server,
  Database,
  ArrowUpRight,
  Eye,
  Download,
  Upload,
  Filter,
  MoreVertical,
  Check,
  AlertCircle,
  Clock,
  LogOut
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: function AdminPage() {
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "devdigitax2026";

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    
    const [activeTab, setActiveTab] = useState<"dashboard" | "articles" | "services" | "portfolio" | "team" | "config" | "visitors">("dashboard");
    const [activeView, setActiveView] = useState<"list" | "create" | "edit">("list");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [articles, setArticles] = useState<any[]>([]);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
    const [visitors, setVisitors] = useState<VisitorData[]>([]);
    
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error' | 'info'} | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<any>>(new Set());

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isAuthenticated) {
        loadData();
      }
    }, [isAuthenticated]);

    const loadData = async () => {
        setArticles(getArticles());
        setServices(getServices());
        setPortfolio(getPortfolio());
        setTeam(getTeam());
        setConfig(getSiteConfig());
        
        // Fetch global logs from server - ensure it's always an array
        try {
            const serverLogs = await getVisitorsServer();
            if (Array.isArray(serverLogs) && serverLogs.length > 0) {
                setVisitors(serverLogs);
            } else {
                const localVisitors = getVisitors();
                setVisitors(Array.isArray(localVisitors) ? localVisitors : []);
            }
        } catch (err) {
            console.error("Failed to fetch visitors from server:", err);
            const localVisitors = getVisitors();
            setVisitors(Array.isArray(localVisitors) ? localVisitors : []);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (usernameInput === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        notify("Incorrect username or password", "error");
      }
    };

    const notify = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
      setNotification({msg, type});
      setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = () => {
      if (activeTab !== 'config' && (!formData.title && !formData.name)) {
          notify("Please enter a title or name", "error");
          return;
      }

      if (activeTab === 'articles') {
        const n = activeView === 'create' ? [{ ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0], status: formData.status || 'published' }, ...articles] : articles.map(a => a.id === editingItem.id ? { ...a, ...formData } : a);
        setArticles(n);
        localStorage.setItem("devdigitax_articles", JSON.stringify(n));
      } else if (activeTab === 'services') {
        const n = activeView === 'create' ? [{ ...formData, id: Date.now().toString() }, ...services] : services.map(s => s.id === editingItem.id ? { ...s, ...formData } : s);
        setServices(n);
        saveServices(n);
      } else if (activeTab === 'portfolio') {
        const n = activeView === 'create' ? [{ ...formData, id: Date.now().toString(), status: formData.status || 'published' }, ...portfolio] : portfolio.map(p => p.id === editingItem.id ? { ...p, ...formData } : p);
        setPortfolio(n);
        savePortfolio(n);
      } else if (activeTab === 'team') {
        const n = activeView === 'create' ? [{ ...formData, id: Date.now().toString(), status: formData.status || 'published' }, ...team] : team.map(t => t.id === editingItem.id ? { ...t, ...formData } : t);
        setTeam(n);
        saveTeam(n);
      } else if (activeTab === 'config') {
        saveSiteConfig(config);
      }
      setActiveView('list');
      notify("Saved successfully");
    };

    const handleDelete = (id: any) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        
        if (activeTab === 'articles') {
            const n = articles.filter(a => a.id !== id);
            setArticles(n);
            localStorage.setItem("devdigitax_articles", JSON.stringify(n));
        } else if (activeTab === 'services') {
            const n = services.filter(s => s.id !== id);
            setServices(n);
            saveServices(n);
        } else if (activeTab === 'portfolio') {
            const n = portfolio.filter(p => p.id !== id);
            setPortfolio(n);
            savePortfolio(n);
        } else if (activeTab === 'team') {
            const n = team.filter(t => t.id !== id);
            setTeam(n);
            saveTeam(n);
        }
        notify("Deleted successfully", "info");
    };

    const handleBulkDelete = () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} items?`)) return;
        const idsToDelete = Array.from(selectedIds);
        
        if (activeTab === 'articles') {
            const n = articles.filter(a => !idsToDelete.includes(a.id));
            setArticles(n);
            localStorage.setItem("devdigitax_articles", JSON.stringify(n));
        } else if (activeTab === 'services') {
            const n = services.filter(s => !idsToDelete.includes(s.id));
            setServices(n);
            saveServices(n);
        } else if (activeTab === 'portfolio') {
            const n = portfolio.filter(p => !idsToDelete.includes(p.id));
            setPortfolio(n);
            savePortfolio(n);
        } else if (activeTab === 'team') {
            const n = team.filter(t => !idsToDelete.includes(t.id));
            setTeam(n);
            saveTeam(n);
        }
        setSelectedIds(new Set());
        notify("Selected items deleted", "info");
    };

    const toggleSelect = (id: any) => {
        const n = new Set(selectedIds);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        setSelectedIds(n);
    };

    const exportData = () => {
        const data = {
            articles,
            services,
            portfolio,
            team,
            config,
            timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `devdigitax_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        notify("Backup file downloaded", "success");
    };

    const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target?.result as string);
                if (data.articles) {
                    setArticles(data.articles);
                    localStorage.setItem("devdigitax_articles", JSON.stringify(data.articles));
                }
                if (data.services) {
                    setServices(data.services);
                    saveServices(data.services);
                }
                if (data.portfolio) {
                    setPortfolio(data.portfolio);
                    savePortfolio(data.portfolio);
                }
                if (data.team) {
                    setTeam(data.team);
                    saveTeam(data.team);
                }
                if (data.config) {
                    setConfig(data.config);
                    saveSiteConfig(data.config);
                }
                notify("Data restored successfully", "success");
            } catch (err) {
                notify("Failed to import. Invalid file.", "error");
            }
        };
        reader.readAsText(file);
    };

    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (activeTab === 'articles') return articles.filter(a => a.title.toLowerCase().includes(query) || a.content.toLowerCase().includes(query));
        if (activeTab === 'services') return services.filter(s => s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query));
        if (activeTab === 'portfolio') return portfolio.filter(p => p.title.toLowerCase().includes(query) || p.client?.toLowerCase().includes(query));
        if (activeTab === 'team') return team.filter(t => t.name.toLowerCase().includes(query) || t.role.toLowerCase().includes(query));
        if (activeTab === 'visitors') return Array.isArray(visitors) ? visitors.filter(v => v.country.toLowerCase().includes(query) || v.ip.toLowerCase().includes(query) || v.city.toLowerCase().includes(query)) : [];
        return [];
    }, [activeTab, articles, services, portfolio, team, visitors, searchQuery]);

    const navItems = [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "visitors", label: "Visitors", icon: Globe },
      { id: "articles", label: "Blog Posts", icon: FileText },
      { id: "services", label: "Services", icon: Zap },
      { id: "portfolio", label: "Portfolio", icon: Briefcase },
      { id: "team", label: "Team Members", icon: Users },
    ];

    if (!isAuthenticated) {
      return (
        <SiteLayout>
          <div className="min-h-screen flex items-center justify-center bg-[#050506] p-6 font-sans">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e3a8a20,transparent_50%)]" />
            <form onSubmit={handleLogin} className="relative w-full max-w-md p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl space-y-10 text-center shadow-2xl">
              <div className="mx-auto w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_-10px_#2563eb]">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Admin Login</h1>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Enter your credentials to continue</p>
              </div>
              <div className="space-y-4">
                <div className="relative group">
                   <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all" />
                   <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} className="relative w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700" placeholder="Username" />
                </div>
                <div className="relative group">
                   <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all" />
                   <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} className="relative w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700" placeholder="Password" />
                </div>
              </div>
              <button type="submit" className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95">LOG IN</button>
            </form>
          </div>
        </SiteLayout>
      );
    }

    return (
      <SiteLayout>
        <div className="min-h-screen bg-[#050506] text-white flex overflow-hidden font-sans selection:bg-blue-600/30">
          <input type="file" ref={fileInputRef} onChange={importData} className="hidden" accept=".json" />
          
          {notification && (
            <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-10 py-5 rounded-[2rem] shadow-2xl font-black text-[10px] uppercase tracking-[0.3em] animate-in slide-in-from-bottom flex items-center gap-3 border ${
                notification.type === 'error' ? 'bg-red-500 text-white border-red-400' : 
                notification.type === 'info' ? 'bg-zinc-800 text-white border-zinc-700' : 
                'bg-white text-black border-white'
            }`}>
                <div className={`h-2 w-2 rounded-full animate-pulse ${notification.type === 'error' ? 'bg-white' : 'bg-blue-600'}`} /> 
                {notification.msg}
            </div>
          )}
          
          <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-black/40 backdrop-blur-3xl border-r border-white/5 transition-all duration-500 flex flex-col z-[60] relative overflow-hidden`}>
            <div className="p-10">
              <div className="flex items-center gap-4 mb-16">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center">
                  <div className="h-6 w-6 bg-blue-600 rounded-lg" />
                </div>
                <div>
                   <div className="text-xl font-black tracking-tighter uppercase leading-none">DevdigitaX</div>
                   <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">Admin Panel</div>
                </div>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setActiveView("list"); setSelectedIds(new Set()); }}
                    className={`w-full group flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all relative ${activeTab === item.id ? 'bg-white text-black' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                  >
                    <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-blue-600' : 'group-hover:text-blue-500'} transition-colors`} />
                    <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
                    {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4 opacity-30" />}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-auto p-10 space-y-4">
               <button onClick={exportData} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
                  <Download className="h-4 w-4" /> Download Backup
               </button>
               <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
                  <Upload className="h-4 w-4" /> Upload Backup
               </button>
               <div className="h-px bg-white/5 my-4" />
               <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors"><LogOut className="h-4 w-4" /></div>
                  <span className="text-xs font-black uppercase tracking-widest">Log Out</span>
               </button>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-16 relative">
            <div className="absolute top-0 right-0 p-16 pointer-events-none opacity-20">
               <div className="h-96 w-96 bg-blue-600 rounded-full blur-[120px]" />
            </div>

            <header className="flex items-center justify-between mb-20">
               <div className="flex items-center gap-8">
                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                    <Menu className={`h-6 w-6 transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`} />
                 </button>
                 <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter premium-gradient-text">
                        {navItems.find(n => n.id === activeTab)?.label}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-zinc-500">
                       <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Admin / {navItems.find(n => n.id === activeTab)?.label}</span>
                    </div>
                 </div>
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="relative group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                     <input 
                       value={searchQuery}
                       onChange={e => setSearchQuery(e.target.value)}
                       className="bg-white/5 border border-white/5 px-12 py-3 rounded-2xl outline-none focus:border-blue-500/50 w-64 transition-all text-sm font-bold placeholder:text-zinc-700" 
                       placeholder="Search items..." 
                     />
                  </div>
                  <button className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors relative">
                     <Bell className="h-5 w-5" />
                     <div className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full border-2 border-[#050506]" />
                  </button>
                  <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                     <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black">AD</div>
                  </div>
               </div>
            </header>

            {activeTab === "dashboard" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { l: "Blog Posts", v: articles.length, i: FileText, c: "bg-blue-600", t: "Total articles" },
                    { l: "Services", v: services.length, i: Zap, c: "bg-amber-500", t: "Active services" },
                    { l: "Portfolio", v: portfolio.length, i: Briefcase, c: "bg-purple-600", t: "Projects shown" },
                    { l: "Team Members", v: team.length, i: Users, c: "bg-emerald-600", t: "Total staff" },
                  ].map((s, i) => (
                    <div key={i} className="group p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className={`h-14 w-14 ${s.c} rounded-[1.5rem] flex items-center justify-center mb-8 shadow-2xl`}>
                        <s.i className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-6xl font-black mb-3 tracking-tighter">{s.v}</div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">{s.l}</div>
                      <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{s.t}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-2 p-12 rounded-[4rem] bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between items-center mb-12">
                         <h3 className="text-xl font-black uppercase tracking-tighter">Site Traffic</h3>
                         <div className="flex gap-2">
                            <div className="px-4 py-2 rounded-xl bg-blue-600/10 text-blue-500 text-[9px] font-black uppercase">Live</div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 text-zinc-500 text-[9px] font-black uppercase">Past Week</div>
                         </div>
                      </div>
                      <div className="h-80 w-full flex items-end gap-3 px-4">
                         {[40, 70, 45, 90, 65, 80, 55, 75, 40, 85, 60, 95].map((h, i) => (
                           <div key={i} className="flex-1 group relative">
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h} Visitors</div>
                              <div className="w-full bg-blue-600/20 rounded-t-xl group-hover:bg-blue-600 transition-all cursor-pointer" style={{ height: `${h}%` }} />
                           </div>
                         ))}
                      </div>
                      <div className="mt-8 flex justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                         <span>12 AM</span>
                         <span>6 AM</span>
                         <span>12 PM</span>
                         <span>6 PM</span>
                         <span>11 PM</span>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl relative overflow-hidden group">
                         <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                         <div className="relative z-10">
                            <Cpu className="h-10 w-10 text-white/50 mb-6" />
                            <h4 className="text-2xl font-black mb-2">System Status</h4>
                            <p className="text-xs text-white/60 font-bold leading-relaxed mb-8">All website systems are running normally. No issues detected.</p>
                            <button onClick={() => notify("Checking system...", "info")} className="px-8 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Check Details</button>
                         </div>
                      </div>
                      <div className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-6">
                         <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Recent Activity</h4>
                            <Activity className="h-4 w-4 text-blue-500" />
                         </div>
                         {Array.isArray(visitors) && visitors.slice(0, 5).map((v, i) => (
                           <div key={i} className="flex gap-4 items-center">
                              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center"><Globe className="h-4 w-4 text-blue-500" /></div>
                              <div className="flex-1">
                                 <div className="text-xs font-bold">Visitor from {v.country}</div>
                                 <div className="text-[9px] font-black text-zinc-600 uppercase mt-1">{new Date(v.timestamp).toLocaleTimeString()} · {v.city}</div>
                              </div>
                              <div className="text-[9px] font-black text-blue-500">{v.countryCode}</div>
                           </div>
                         ))}
                         {(!Array.isArray(visitors) || visitors.length === 0) && (
                            <p className="text-[10px] text-zinc-600 uppercase font-black text-center py-4">No recent activity</p>
                         )}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab !== "dashboard" && activeTab !== "config" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {activeView === "list" ? (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <h2 className="text-4xl font-black tracking-tight uppercase">{navItems.find(n => n.id === activeTab)?.label} List</h2>
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Managing {filteredItems.length} items</p>
                                    </div>
                                    {selectedIds.size > 0 && (
                                        <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl animate-in zoom-in">
                                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{selectedIds.size} Items Selected</span>
                                            <button onClick={handleBulkDelete} className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><Trash2 className="h-4 w-4 text-white" /></button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => { setFormData({ status: 'published' }); setActiveView('create'); }} className="px-10 py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all active:scale-95"><Plus className="h-5 w-5" /> Add New Item</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {filteredItems.map((item) => (
                                    <div key={item.id} className={`group p-8 rounded-[2.5rem] bg-white/[0.01] border transition-all flex items-center gap-8 ${selectedIds.has(item.id) ? 'border-blue-500/50 bg-blue-500/[0.02]' : 'border-white/5 hover:border-white/10'}`}>
                                        <button onClick={() => toggleSelect(item.id)} className={`h-6 w-6 rounded-lg border transition-all flex items-center justify-center ${selectedIds.has(item.id) ? 'bg-blue-600 border-blue-500' : 'border-white/10 group-hover:border-white/30'}`}>
                                            {selectedIds.has(item.id) && <Check className="h-4 w-4 text-white" />}
                                        </button>
                                        
                                        {(item.image || item.img) && (
                                            <img src={item.image || item.img} className="h-16 w-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        )}
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-xl font-black uppercase tracking-tight">{item.title || item.name}</h4>
                                                {item.status === 'draft' && <span className="text-[8px] font-black bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded uppercase">Draft</span>}
                                            </div>
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest line-clamp-1">{item.category || item.role || item.description}</p>
                                        </div>

                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingItem(item); setFormData(item); setActiveView('edit'); }} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"><Edit3 className="h-5 w-5 text-zinc-400" /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-4 bg-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    </div>
                                ))}
                                {filteredItems.length === 0 && (
                                    <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                                        <Search className="h-12 w-12 text-zinc-800 mx-auto mb-6" />
                                        <h3 className="text-xl font-black text-zinc-700 uppercase tracking-widest">No items found</h3>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-12 bg-white/[0.01] p-16 rounded-[5rem] border border-white/5 relative">
                            <div className="flex justify-between items-center mb-8">
                                <button onClick={() => setActiveView('list')} className="text-zinc-500 hover:text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors"><X className="h-5 w-5" /> Cancel</button>
                                <div className="flex gap-4">
                                    <button onClick={() => setFormData({...formData, status: formData.status === 'published' ? 'draft' : 'published'})} className={`px-8 py-5 rounded-[2rem] border font-black text-[10px] uppercase tracking-widest transition-all ${formData.status === 'published' ? 'border-emerald-500/20 text-emerald-500' : 'border-zinc-700 text-zinc-500'}`}>
                                        {formData.status === 'published' ? 'Published' : 'Draft'}
                                    </button>
                                    <button onClick={handleSave} className="px-12 py-5 rounded-[2rem] bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">Save Changes</button>
                                </div>
                            </div>
                            
                            <div className="space-y-10">
                                <div className="relative group">
                                    <label className="absolute -top-3 left-8 px-2 bg-[#050506] text-[9px] font-black text-zinc-500 uppercase tracking-widest z-10">Title / Name</label>
                                    <input value={formData.title || formData.name || ''} onChange={e => setFormData({...formData, [activeTab === 'team' ? 'name' : 'title']: e.target.value})} className="w-full bg-transparent text-5xl font-black outline-none border border-white/5 p-10 rounded-[3rem] focus:border-blue-500/50 transition-all premium-gradient-text" placeholder="Enter title here..." />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Category / Role</label>
                                        <input value={formData.category || formData.role || ''} onChange={e => setFormData({...formData, [activeTab === 'team' ? 'role' : 'category']: e.target.value})} className="w-full bg-black/40 border border-white/5 p-8 rounded-[2.5rem] outline-none focus:border-blue-500 transition-all" placeholder="e.g. Technology" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Image URL</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                            <input value={formData.image || formData.img || ''} onChange={e => setFormData({...formData, [activeTab === 'portfolio' ? 'img' : 'image']: e.target.value})} className="w-full bg-black/40 border border-white/5 pl-16 pr-8 py-8 rounded-[2.5rem] outline-none focus:border-blue-500 transition-all" placeholder="Paste image link here..." />
                                        </div>
                                    </div>
                                </div>

                                {activeTab === 'articles' && (
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Blog Content</label>
                                        <textarea value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full h-[30rem] bg-black/40 border border-white/5 p-10 rounded-[3rem] outline-none focus:border-blue-500 transition-all resize-none leading-relaxed text-zinc-400 font-mono text-sm" placeholder="Write your post here..." />
                                    </div>
                                )}

                                {activeTab === 'portfolio' && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Results Achieved</label>
                                            <input value={formData.result || ''} onChange={e => setFormData({...formData, result: e.target.value})} className="w-full bg-black/40 border border-white/5 p-8 rounded-[2.5rem] outline-none focus:border-blue-500 transition-all" placeholder="e.g. High Performance" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Live Link</label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                                <input value={formData.live || ''} onChange={e => setFormData({...formData, live: e.target.value})} className="w-full bg-black/40 border border-white/5 pl-16 pr-8 py-8 rounded-[2.5rem] outline-none focus:border-blue-500 transition-all" placeholder="https://..." />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'team' && (
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-8">Member Bio</label>
                                        <textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full h-40 bg-black/40 border border-white/5 p-8 rounded-[2.5rem] outline-none focus:border-blue-500 transition-all resize-none leading-relaxed text-zinc-400" placeholder="About the team member..." />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'visitors' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Live Analytics</span>
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tight uppercase">Visitor Intelligence</h2>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Precision tracking for {Array.isArray(visitors) ? visitors.length : 0} unique sessions</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={exportData} className="px-8 py-4 rounded-2xl bg-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                                        <Download className="h-4 w-4" /> Export CSV
                                    </button>
                                    <button onClick={async () => { 
                                        if(confirm("Clear all global logs?")) {
                                            await clearVisitorsServer();
                                            localStorage.removeItem("devdigitax_visitors"); 
                                            setVisitors([]); 
                                            notify("Analytics cleared", "info");
                                        }
                                    }} className="px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Reset All Data</button>
                                </div>
                            </div>

                            {/* Google Level Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { 
                                        l: "Top Country", 
                                        v: Array.isArray(visitors) && visitors.length > 0 
                                            ? (Array.from(new Set(visitors.map(v => v.country).filter(Boolean)))
                                                .sort((a, b) => visitors.filter(x => x.country === b).length - visitors.filter(x => x.country === a).length)[0] || "Unknown") 
                                            : "N/A", 
                                        i: Globe 
                                    },
                                    { 
                                        l: "Mobile Users", 
                                        v: Array.isArray(visitors) && visitors.length > 0 
                                            ? `${Math.round((visitors.filter(v => v.isMobile).length / visitors.length) * 100)}%` 
                                            : "0%", 
                                        i: Zap 
                                    },
                                    { 
                                        l: "Direct Traffic", 
                                        v: Array.isArray(visitors) && visitors.length > 0 
                                            ? `${Math.round((visitors.filter(v => v.referrer === 'Direct').length / visitors.length) * 100)}%` 
                                            : "0%", 
                                        i: TrendingUp 
                                    },
                                    { 
                                        l: "Avg Resolution", 
                                        v: Array.isArray(visitors) && visitors.length > 0 ? (visitors[0]?.screenResolution || "N/A") : "N/A", 
                                        i: Maximize2 
                                    },
                                ].map((s, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{s.l}</div>
                                            <s.i className="h-4 w-4 text-blue-500/50" />
                                        </div>
                                        <div className="text-2xl font-black uppercase tracking-tight">{s.v}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {filteredItems.map((v: any, idx) => (
                                    <div key={idx} className="group p-10 rounded-[3.5rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row gap-10 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="flex items-center gap-6 md:w-64 shrink-0">
                                            <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-2xl font-black group-hover:bg-blue-600 transition-all group-hover:scale-110">
                                                {v.countryCode}
                                            </div>
                                            <div>
                                                <div className="text-xl font-black uppercase tracking-tight line-clamp-1">{v.country}</div>
                                                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{v.city || "Unknown City"}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 py-2">
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Network Info</div>
                                                <div className="text-sm font-bold font-mono text-blue-400">{v.ip}</div>
                                                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest truncate">{v.language}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Session Path</div>
                                                <div className="text-sm font-bold truncate max-w-[150px]">{v.page}</div>
                                                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{new Date(v.timestamp).toLocaleTimeString()}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Source / Medium</div>
                                                <div className="text-sm font-bold text-emerald-500 truncate">{v.referrer}</div>
                                                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{v.isMobile ? "Mobile Device" : "Desktop/Tablet"}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Display</div>
                                                <div className="text-sm font-bold">{v.screenResolution}</div>
                                                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest truncate max-w-[120px]">{v.userAgent.split(')')[0].split('(')[1]}</div>
                                            </div>
                                        </div>

                                        <button className="self-center p-4 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600">
                                            <ArrowUpRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                                
                                {filteredItems.length === 0 && (
                                    <div className="p-32 text-center border-2 border-dashed border-white/5 rounded-[5rem]">
                                        <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
                                            <Search className="h-10 w-10 text-zinc-800" />
                                        </div>
                                        <h3 className="text-2xl font-black text-zinc-700 uppercase tracking-widest">Awaiting Intelligent Traffic...</h3>
                                        <p className="mt-4 text-zinc-800 text-[10px] font-black uppercase tracking-widest">Data will populate automatically as users engage with your platform</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

          </main>
        </div>
      </SiteLayout>
    );
  },
});
