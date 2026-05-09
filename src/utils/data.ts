import { services as staticServices } from "../data/services";

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
    slug: s.slug
  }));
};

export const saveServices = (services: ServiceItem[]) => {
  localStorage.setItem("devdigitax_services", JSON.stringify(services));
};

// PORTFOLIO
export const getPortfolio = (): PortfolioItem[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("devdigitax_portfolio");
  if (saved) return JSON.parse(saved);
  return []; // Start empty or add static defaults if needed
};

export const savePortfolio = (items: PortfolioItem[]) => {
  localStorage.setItem("devdigitax_portfolio", JSON.stringify(items));
};

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

// SITE CONFIG (Hardcoded as requested)
export const getSiteConfig = (): SiteConfig => {
  return {
    whatsapp: "+880 1837-692110",
    email: "devdigitax@gmail.com",
    phone: "+880 9638-474596",
    address: "Savar 1340, Dhaka, Bangladesh",
    footerText: "© DevdigitaX. Since 2018 to 2026 · Developed by DevdigitaX."
  };
};

export const saveSiteConfig = (config: SiteConfig) => {
  // Persistence disabled as per hardcoding request
};

// ARTICLES & MESSAGES (Still useful but maybe hidden from tabs if requested)
export const getMessages = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("devdigitax_messages") || "[]");
};

export const getArticles = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("devdigitax_articles") || "[]");
};
