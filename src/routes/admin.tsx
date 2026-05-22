import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import "@/styles/premium.css";
import { Reveal } from "@/components/ui/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/animations/Stagger";
import {
  getServices,
  saveServices,
  getPortfolio,
  savePortfolio,
  getTeam,
  saveTeam,
  getSiteConfig,
  saveSiteConfig,
  getArticles,
  getVisitors,
} from "@/utils/data";
import { getVisitorsServer, clearVisitorsServer } from "@/lib/analytics";
import {
  FileText,
  Briefcase,
  Users,
  LayoutDashboard,
  Globe,
  Download,
  Upload,
  Search,
  Edit3,
  Trash2,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const ADMIN_USER = "devdigitax";
const ADMIN_PASS = "admin@2026";

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem("devdigitax_admin_auth", "true");
        onLogin();
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white font-sans flex items-center justify-center px-4">
      <Reveal variant="fade-in-up" className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
            <div className="h-6 w-6 bg-blue-600 rounded" />
          </div>
          <div>
            <div className="text-2xl font-black tracking-tighter uppercase">DevdigitaX</div>
            <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
              Admin Panel
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">Sign In</h1>
            <p className="text-xs text-zinc-500 mt-1">Enter your credentials to continue</p>
          </div>

          <Stagger staggerDelay={0.08} className="space-y-4">
            <StaggerItem variant="slide-up">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm"
                placeholder="Username"
                autoComplete="username"
              />
            </StaggerItem>
            <StaggerItem variant="slide-up">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </StaggerItem>

            {error && (
              <StaggerItem variant="fade" className="text-xs text-red-400 font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </StaggerItem>
            )}

            <StaggerItem variant="slide-up">
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading || !username || !password}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </StaggerItem>
          </Stagger>
        </div>
      </Reveal>
    </div>
  );
}

function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("devdigitax_admin_auth") === "true",
  );
  const [tab, setTab] = useState("dashboard");
  // view: "list" | "create" | "edit"
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [visitors, setVisitors] = useState<any[]>([]);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({ status: "published" });
  const [notify, setNotify] = useState("");
  const [selected, setSelected] = useState<Set<any>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setArticles(getArticles() ?? []);
    } catch {
      setArticles([]);
    }
    try {
      setServices(getServices() ?? []);
    } catch {
      setServices([]);
    }
    try {
      setPortfolio(getPortfolio() ?? []);
    } catch {
      setPortfolio([]);
    }
    try {
      setTeam(getTeam() ?? []);
    } catch {
      setTeam([]);
    }
    try {
      setConfig(getSiteConfig() ?? {});
    } catch {
      setConfig({});
    }
    try {
      const serverLogs = await getVisitorsServer();
      setVisitors(
        Array.isArray(serverLogs) && serverLogs.length > 0 ? serverLogs : (getVisitors() ?? []),
      );
    } catch {
      try {
        setVisitors(getVisitors() ?? []);
      } catch {
        setVisitors([]);
      }
    }
  };

  const showNotify = (msg: string) => {
    setNotify(msg);
    setTimeout(() => setNotify(""), 2500);
  };

  // ── SAVE ──────────────────────────────────────────────────────────────────
  const save = () => {
    // Determine primary label depending on tab
    const isTeamTab = tab === "team";
    const label = isTeamTab ? (form.name || "").trim() : (form.title || "").trim();
    if (!label) {
      showNotify(isTeamTab ? "Name required" : "Title required");
      return;
    }

    const isCreate = view === "create";

    const mergeOrAppend = (arr: any[], idGen: () => string, extra: any = {}) => {
      const merged = { ...form, ...extra };
      if (isCreate) {
        return [{ ...merged, id: idGen() }, ...arr];
      }
      return arr.map((i: any) => (i.id === editItem?.id ? { ...i, ...merged } : i));
    };

    try {
      if (tab === "articles") {
        const extra = isCreate
          ? { date: new Date().toISOString().split("T")[0], status: form.status || "published" }
          : {};
        const next = mergeOrAppend(articles, () => Date.now().toString(), extra);
        setArticles(next);
        localStorage.setItem("devdigitax_articles", JSON.stringify(next));
      } else if (tab === "services") {
        const next = mergeOrAppend(services, () => Date.now().toString());
        setServices(next);
        saveServices(next);
      } else if (tab === "portfolio") {
        const next = mergeOrAppend(portfolio, () => Date.now().toString());
        setPortfolio(next);
        savePortfolio(next);
      } else if (tab === "team") {
        const extra = isCreate ? { status: form.status || "published" } : {};
        const next = mergeOrAppend(team, () => Date.now().toString(), extra);
        setTeam(next);
        saveTeam(next);
      }

      setView("list");
      setEditItem(null);
      setForm({ status: "published" });
      showNotify(isCreate ? "Created!" : "Saved!");
    } catch (e) {
      console.error("Save error:", e);
      showNotify("Save failed");
    }
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const del = (id: any) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const filter = (arr: any[]) => arr.filter((i: any) => i.id !== id);
      if (tab === "articles") {
        const n = filter(articles);
        setArticles(n);
        localStorage.setItem("devdigitax_articles", JSON.stringify(n));
      } else if (tab === "services") {
        const n = filter(services);
        setServices(n);
        saveServices(n);
      } else if (tab === "portfolio") {
        const n = filter(portfolio);
        setPortfolio(n);
        savePortfolio(n);
      } else if (tab === "team") {
        const n = filter(team);
        setTeam(n);
        saveTeam(n);
      }
      showNotify("Deleted");
    } catch {
      showNotify("Delete failed");
    }
  };

  // ── BULK DELETE ───────────────────────────────────────────────────────────
  const bulkDel = () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} item(s)?`)) return;
    const ids = Array.from(selected);
    try {
      const filter = (arr: any[]) => arr.filter((i: any) => !ids.includes(i.id));
      if (tab === "articles") {
        const n = filter(articles);
        setArticles(n);
        localStorage.setItem("devdigitax_articles", JSON.stringify(n));
      } else if (tab === "services") {
        const n = filter(services);
        setServices(n);
        saveServices(n);
      } else if (tab === "portfolio") {
        const n = filter(portfolio);
        setPortfolio(n);
        savePortfolio(n);
      } else if (tab === "team") {
        const n = filter(team);
        setTeam(n);
        saveTeam(n);
      }
      setSelected(new Set());
      showNotify("Deleted");
    } catch {
      showNotify("Delete failed");
    }
  };

  // ── EXPORT / IMPORT ───────────────────────────────────────────────────────
  const exportData = () => {
    try {
      const data = {
        articles,
        services,
        portfolio,
        team,
        config,
        timestamp: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `devdigitax_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotify("Backup downloaded");
    } catch {
      showNotify("Export failed");
    }
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
          localStorage.setItem("devdigitax_articles", JSON.stringify(data.articles));
        }
        if (Array.isArray(data.services)) {
          setServices(data.services);
          saveServices(data.services);
        }
        if (Array.isArray(data.portfolio)) {
          setPortfolio(data.portfolio);
          savePortfolio(data.portfolio);
        }
        if (Array.isArray(data.team)) {
          setTeam(data.team);
          saveTeam(data.team);
        }
        if (data.config) {
          setConfig(data.config);
          saveSiteConfig(data.config);
        }
        showNotify("Restored successfully");
      } catch {
        showNotify("Import failed - invalid file");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── FILTERED ITEMS ────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    const q = (search || "").toLowerCase();
    if (tab === "articles")
      return articles.filter(
        (a: any) =>
          (a.title || "").toLowerCase().includes(q) || (a.content || "").toLowerCase().includes(q),
      );
    if (tab === "services")
      return services.filter(
        (s: any) =>
          (s.title || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q),
      );
    if (tab === "portfolio")
      return portfolio.filter(
        (p: any) =>
          (p.title || "").toLowerCase().includes(q) || (p.client || "").toLowerCase().includes(q),
      );
    if (tab === "team")
      return team.filter(
        (t: any) =>
          (t.name || "").toLowerCase().includes(q) || (t.role || "").toLowerCase().includes(q),
      );
    if (tab === "visitors")
      return visitors.filter(
        (v: any) =>
          (v.country || "").toLowerCase().includes(q) ||
          (v.ip || "").toLowerCase().includes(q) ||
          (v.city || "").toLowerCase().includes(q),
      );
    return [];
  }, [tab, articles, services, portfolio, team, visitors, search]);

  // ── NAV ───────────────────────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "visitors", label: "Visitors", icon: Globe },
    { id: "articles", label: "Blog Posts", icon: FileText },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "team", label: "Team", icon: Users },
  ];

  // FIX: reset view + form when switching tabs
  const switchTab = (id: string) => {
    setTab(id);
    setView("list");
    setEditItem(null);
    setForm({ status: "published" });
    setSelected(new Set());
    setSearch("");
  };

  const startCreate = () => {
    setForm({ status: "published" });
    setEditItem(null);
    setView("create");
  };

  const startEdit = (item: any) => {
    // Deep copy to avoid mutating list data
    setForm({ ...item });
    setEditItem(item);
    setView("edit");
  };

  // ── TOGGLE SELECT ─────────────────────────────────────────────────────────
  const toggleSelect = (id: any) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  // ── RENDERS ───────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className="space-y-8">
      <Stagger staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Blog Posts", v: articles.length },
          { l: "Services", v: services.length },
          { l: "Portfolio", v: portfolio.length },
          { l: "Team", v: team.length },
        ].map((s, i) => (
          <StaggerItem key={i} variant="scale" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="text-3xl font-black mb-1">{s.v}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{s.l}</div>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="grid lg:grid-cols-3 gap-6">
        <Reveal variant="slide-up" className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-4">Site Traffic</h3>
          <div className="flex items-end gap-2 h-48">
            {[40, 70, 45, 90, 65, 80, 55, 75, 40, 85, 60, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Reveal>
        <div className="space-y-4">
          <Reveal variant="scale" className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="text-lg font-black mb-1">System Status</h4>
            <p className="text-xs text-zinc-500 mb-3">All systems operational</p>
            <button
              type="button"
              onClick={() => showNotify("All systems OK ✓")}
              className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-xs font-black uppercase"
            >
              Check Details
            </button>
          </Reveal>
          <Reveal variant="fade-in-up" className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">
              Recent Activity
            </h4>
            {visitors.slice(0, 5).map((v: any, i: number) => (
              <div
                key={v.id || i}
                className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
              >
                <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center text-xs font-black">
                  {v.countryCode || "--"}
                </div>
                <div className="flex-1 text-xs">
                  {v.country || "Unknown"} – {v.city || "N/A"}
                </div>
                <div className="text-[9px] text-zinc-600">
                  {v.timestamp ? new Date(v.timestamp).toLocaleTimeString() : ""}
                </div>
              </div>
            ))}
            {visitors.length === 0 && (
              <p className="text-xs text-zinc-600 uppercase text-center py-2">No activity</p>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );

  const renderList = () => {
    const items = filteredItems;
    const currentNav = navItems.find((n) => n.id === tab);
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase">{currentNav?.label || "Items"}</h2>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">{items.length} items</p>
          </div>
          <div className="flex gap-3">
            {selected.size > 0 && (
              <button
                type="button"
                onClick={bulkDel}
                className="px-6 py-3 bg-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase border border-red-500/30"
              >
                Delete {selected.size}
              </button>
            )}
            <button
              type="button"
              onClick={startCreate}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase"
            >
              + Add New
            </button>
          </div>
        </div>
        <Stagger staggerDelay={0.04} className="space-y-3">
          {items.map((item: any) => {
            const id = item?.id;
            if (id == null) return null;
            return (
              <StaggerItem
                key={id}
                variant="slide-up"
                className={`p-6 rounded-2xl bg-white/5 border flex items-center gap-4 ${selected.has(id) ? "border-blue-500" : "border-white/10"}`}
              >
                <button
                  type="button"
                  onClick={() => toggleSelect(id)}
                  className={`h-5 w-5 rounded border flex-shrink-0 ${selected.has(id) ? "bg-blue-600 border-blue-500" : "border-white/20"}`}
                />
                {item.image && (
                  <img
                    src={item.image}
                    className="h-12 w-12 rounded-xl object-cover flex-shrink-0"
                    alt=""
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-black uppercase truncate">
                    {item.title || item.name || "Untitled"}
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest truncate">
                    {item.category || item.role || item.description || ""}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => del(id)}
                    className="p-2 bg-white/5 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </StaggerItem>
            );
          })}
          {items.length === 0 && (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl text-zinc-600 text-sm">
              No items found
            </div>
          )}
        </Stagger>
      </div>
    );
  };

  const renderForm = () => {
    const isTeamTab = tab === "team";
    const isCreate = view === "create";

    return (
      <div className="max-w-3xl mx-auto space-y-8 bg-white/5 p-10 rounded-3xl border border-white/10">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setView("list");
              setEditItem(null);
              setForm({ status: "published" });
            }}
            className="text-zinc-500 hover:text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <X className="h-4 w-4" /> Back
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((f: any) => ({
                  ...f,
                  status: f.status === "published" ? "draft" : "published",
                }))
              }
              className={`px-6 py-3 rounded-xl border text-xs font-black uppercase transition-colors ${form.status === "published" ? "border-emerald-500 text-emerald-500" : "border-zinc-700 text-zinc-500"}`}
            >
              {form.status || "draft"}
            </button>
            <button
              type="button"
              onClick={save}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase transition-colors"
            >
              {isCreate ? "Create" : "Save"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title / Name */}
          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
              {isTeamTab ? "Name" : "Title"}
            </label>
            <input
              value={isTeamTab ? form.name || "" : form.title || ""}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, [isTeamTab ? "name" : "title"]: e.target.value }))
              }
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
              placeholder={isTeamTab ? "Member name" : "Title"}
            />
          </div>

          {/* Category / Role + Image */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                {isTeamTab ? "Role" : "Category"}
              </label>
              <input
                value={isTeamTab ? form.role || "" : form.category || ""}
                onChange={(e) =>
                  setForm((f: any) => ({ ...f, [isTeamTab ? "role" : "category"]: e.target.value }))
                }
                className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                placeholder={isTeamTab ? "Role" : "Category"}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Image URL
              </label>
              <input
                value={form.image || ""}
                onChange={(e) => setForm((f: any) => ({ ...f, image: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Description (services) */}
          {tab === "services" && (
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Description
              </label>
              <textarea
                value={form.description || ""}
                onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))}
                className="w-full h-32 bg-black/40 border border-white/10 p-4 rounded-2xl outline-none resize-none focus:border-blue-500 transition-colors"
                placeholder="Service description"
              />
            </div>
          )}

          {/* Content (articles) */}
          {tab === "articles" && (
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Content
              </label>
              <textarea
                value={form.content || ""}
                onChange={(e) => setForm((f: any) => ({ ...f, content: e.target.value }))}
                className="w-full h-48 bg-black/40 border border-white/10 p-4 rounded-2xl outline-none resize-none focus:border-blue-500 transition-colors"
                placeholder="Article content"
              />
            </div>
          )}

          {/* Portfolio extras */}
          {tab === "portfolio" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Client
                </label>
                <input
                  value={form.client || ""}
                  onChange={(e) => setForm((f: any) => ({ ...f, client: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Results
                </label>
                <input
                  value={form.result || ""}
                  onChange={(e) => setForm((f: any) => ({ ...f, result: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                  placeholder="Results achieved"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Live Link
                </label>
                <input
                  value={form.live || ""}
                  onChange={(e) => setForm((f: any) => ({ ...f, live: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                  Tech Stack
                </label>
                <input
                  value={form.tech || ""}
                  onChange={(e) => setForm((f: any) => ({ ...f, tech: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
                  placeholder="React, Node.js..."
                />
              </div>
            </div>
          )}

          {/* Team bio */}
          {tab === "team" && (
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                Bio
              </label>
              <textarea
                value={form.bio || ""}
                onChange={(e) => setForm((f: any) => ({ ...f, bio: e.target.value }))}
                className="w-full h-32 bg-black/40 border border-white/10 p-4 rounded-2xl outline-none resize-none focus:border-blue-500 transition-colors"
                placeholder="Member bio"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVisitors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase">Visitor Analytics</h2>
          <p className="text-xs text-zinc-500">{visitors.length} sessions</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={exportData}
            className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black uppercase hover:bg-white/10 transition-colors"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm("Clear all visitor logs?")) return;
              try {
                await clearVisitorsServer();
                localStorage.removeItem("devdigitax_visitors");
                setVisitors([]);
                showNotify("Cleared");
              } catch {
                showNotify("Failed to clear");
              }
            }}
            className="px-6 py-3 bg-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase border border-red-500/30 hover:bg-red-500/30 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      <Stagger staggerDelay={0.05} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(() => {
          const topCountry = visitors.length
            ? ((
                Array.from(new Set(visitors.map((v: any) => v.country).filter(Boolean))) as string[]
              ).sort(
                (a, b) =>
                  visitors.filter((x: any) => x.country === b).length -
                  visitors.filter((x: any) => x.country === a).length,
              )[0] ?? "N/A")
            : "N/A";
          const mobilePct = visitors.length
            ? `${Math.round((visitors.filter((v: any) => v.isMobile).length / visitors.length) * 100)}%`
            : "0%";
          const directPct = visitors.length
            ? `${Math.round((visitors.filter((v: any) => v.referrer === "Direct").length / visitors.length) * 100)}%`
            : "0%";
          const resolution = visitors[0]?.screenResolution || "N/A";
          return [
            { l: "Top Country", v: topCountry },
            { l: "Mobile %", v: mobilePct },
            { l: "Direct Traffic", v: directPct },
            { l: "Top Resolution", v: resolution },
          ].map((s, i) => (
            <StaggerItem key={i} variant="scale" className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">
                {s.l}
              </div>
              <div className="text-xl font-black">{s.v}</div>
            </StaggerItem>
          ));
        })()}
      </Stagger>

      <Stagger staggerDelay={0.02} className="space-y-3">
        {filteredItems.slice(0, 100).map((v: any, i: number) => (
          <StaggerItem
            key={v.id || i}
            variant="slide-up"
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center font-black text-sm flex-shrink-0">
              {v.countryCode || "--"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black uppercase truncate">
                {v.country || "Unknown"} – {v.city || "N/A"}
              </h4>
              <p className="text-[10px] text-zinc-500 uppercase truncate">
                {v.ip || ""} · {v.timestamp ? new Date(v.timestamp).toLocaleString() : ""}
              </p>
            </div>
            <div className="text-xs text-blue-500 font-mono flex-shrink-0">
              {v.referrer || "Direct"}
            </div>
          </StaggerItem>
        ))}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl text-zinc-600 text-sm">
            No visitor data
          </div>
        )}
      </Stagger>
    </div>
  );

  // ── LAYOUT ────────────────────────────────────────────────────────────────
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#050506] text-white font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={importData}
        className="hidden"
        accept=".json"
      />

      {/* Toast */}
      {notify && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase z-50 shadow-xl pointer-events-none">
          {notify}
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-black/40 border-r border-white/10 transition-all duration-300 flex flex-col fixed h-full z-40 overflow-hidden`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="h-5 w-5 bg-blue-600 rounded" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tighter uppercase">DevdigitaX</div>
              <div className="text-[9px] font-black text-blue-500 uppercase">Admin Panel</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${tab === item.id ? "bg-white text-black" : "text-zinc-500 hover:bg-white/5 hover:text-white"}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {item.label}
                </span>
                {tab === item.id && <ChevronRight className="h-3 w-3 ml-auto" />}
              </button>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="space-y-2 mt-4">
            <button
              type="button"
              onClick={exportData}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase"
            >
              <Download className="h-4 w-4" /> Backup
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase"
            >
              <Upload className="h-4 w-4" /> Restore
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={`${sidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300 p-8`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {navItems.find((n) => n.id === tab)?.label || "Admin"}
              </h2>
              <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                Admin / {navItems.find((n) => n.id === tab)?.label || tab}
                {view !== "list" && ` / ${view === "create" ? "New" : "Edit"}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 w-64 text-sm transition-colors"
                placeholder="Search..."
              />
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-sm">
              AD
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("devdigitax_admin_auth");
                setAuthed(false);
              }}
              className="px-4 py-2 bg-white/5 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        {tab === "dashboard" && renderDashboard()}
        {tab === "visitors" && renderVisitors()}
        {tab !== "dashboard" && tab !== "visitors" && view === "list" && renderList()}
        {tab !== "dashboard" && tab !== "visitors" && view !== "list" && renderForm()}
      </main>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});
