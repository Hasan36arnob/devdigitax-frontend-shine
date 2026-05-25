import { services as staticServices } from "../data/services";
import { portfolioProjects } from "../data/portfolio";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  result: string;
  tech: string;
  image: string;
  live?: string;
  github?: string;
  status?: "draft" | "published";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  status?: "draft" | "published";
}

export interface VisitorData {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  timestamp: string;
  userAgent: string;
  page: string;
  referrer: string;
  screenResolution: string;
  language: string;
  isMobile: boolean;
}

export interface SiteConfig {
  whatsapp: string;
  email: string;
  phone: string;
  address: string;
  footerText: string;
}

// SERVICES
export const getServices = (): ServiceItem[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("devdigitax_services");
  if (saved) return JSON.parse(saved);
  return staticServices.map((s, i) => ({
    id: i.toString(),
    title: s.t,
    description: s.d,
    icon: "Layout",
    slug: s.slug,
  }));
};

export const saveServices = (services: ServiceItem[]) => {
  localStorage.setItem("devdigitax_services", JSON.stringify(services));
};

// PORTFOLIO — localStorage with static fallback
export const getPortfolio = (): PortfolioItem[] => {
  if (typeof window === "undefined")
    return portfolioProjects.filter((p) => !p.status || p.status === "published");
  const saved = localStorage.getItem("devdigitax_portfolio");
  if (saved) return JSON.parse(saved);
  return portfolioProjects.filter((p) => !p.status || p.status === "published");
};

export const savePortfolio = (items: PortfolioItem[]) => {
  localStorage.setItem("devdigitax_portfolio", JSON.stringify(items));
};

/** Public portfolio: client sites with live links first, template demos next, missing links last. */
export function sortPortfolioForDisplay(items: PortfolioItem[]): PortfolioItem[] {
  const hasLive = (p: PortfolioItem) => {
    const u = typeof p.live === "string" ? p.live.trim() : "";
    return u.length > 0 && /^https?:\/\//i.test(u);
  };
  const isTemplateDemo = (p: PortfolioItem) => /^\d+$/.test(p.id);

  const rank = (p: PortfolioItem) => {
    const live = hasLive(p);
    const demo = isTemplateDemo(p);
    if (live && !demo) return 3;
    if (live && demo) return 2;
    if (!live && !demo) return 1;
    return 0;
  };

  const origIndex = new Map(items.map((p, i) => [p, i]));

  return [...items].sort((a, b) => {
    const d = rank(b) - rank(a);
    if (d !== 0) return d;
    return (origIndex.get(a) ?? 0) - (origIndex.get(b) ?? 0);
  });
}

// TEAM
export const getTeam = (): TeamMember[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("devdigitax_team");
  if (saved) return JSON.parse(saved);
  return [];
};

export const saveTeam = (members: TeamMember[]) => {
  localStorage.setItem("devdigitax_team", JSON.stringify(members));
};

// SITE CONFIG
const defaultConfig: SiteConfig = {
  whatsapp: "+880 1837-692110",
  email: "hello.devdigitax@gmail.com",
  phone: "+880 9638-474596",
  address: "Savar 1340, Dhaka, Bangladesh",
  footerText: "© DevdigitaX. Since 2018 to 2026 · Developed by DevdigitaX.",
};

export const getSiteConfig = (): SiteConfig => {
  if (typeof window === "undefined") return defaultConfig;
  const saved = localStorage.getItem("devdigitax_config");
  if (saved) return { ...defaultConfig, ...JSON.parse(saved) };
  return defaultConfig;
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem("devdigitax_config", JSON.stringify(config));
};

// ARTICLES & MESSAGES
export const getMessages = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("devdigitax_messages") || "[]");
};

export const getArticles = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("devdigitax_articles") || "[]");
};

// VISITORS
export const getVisitors = (): VisitorData[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("devdigitax_visitors") || "[]");
};

export const saveVisitor = (visitor: VisitorData) => {
  if (typeof window === "undefined") return;
  const visitors = getVisitors();
  const updated = [visitor, ...visitors].slice(0, 100);
  localStorage.setItem("devdigitax_visitors", JSON.stringify(updated));
};
