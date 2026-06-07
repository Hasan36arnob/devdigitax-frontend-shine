import { PortfolioItem } from "@/utils/data";

// ── DevDigitax Showcase Projects (Demo/Netlify) ──────────────────────────────
import purifysoul from "@/assets/purifysoul.png";
import onefitness from "@/assets/1fitness.png";
import devdigitaxrestaurant from "@/assets/devdigitaxrestaurant.png";
import devdigitaxfashion from "@/assets/devdigitaxfashion.png";
import devdigitaxportfolio from "@/assets/devdigitaxportfolio.png";
import devdigitaxecom from "@/assets/devdigitaxecom.png";
import yana from "@/assets/yana.png";

export const portfolioProjects: PortfolioItem[] = [
  // ── DEMO PROJECTS (Netlify Showcases) ─────────────────────────────────────
  {
    id: "demo-1",
    title: "Purify Soul",
    subtitle: "Wellness & Meditation Platform",
    client: "Purify Soul",
    category: "frontend",
    section: "demo",
    result: "Modern, calming design with smooth animations and meditation content delivery",
    tech: "React, Next.js, TailwindCSS, Animations, Responsive Design",
    image: purifysoul,
    live: "/wellness",
    status: "published",
  },
  {
    id: "demo-2",
    title: "1 Fitness",
    subtitle: "Personal Training & Coaching",
    client: "1 Fitness",
    category: "frontend",
    section: "demo",
    result: "High-performance training website with course management and performance tracking",
    tech: "React, TailwindCSS, TypeScript, Form Validation, Performance Optimization",
    image: onefitness,
    live: "/fitness",
    status: "published",
  },
  {
    id: "demo-3",
    title: "DevDigitax Restaurant",
    subtitle: "Fine Dining Experience",
    client: "DevDigitax Restaurant",
    category: "fullstack",
    section: "demo",
    result: "Full-featured restaurant platform with order management and reservation system",
    tech: "React, Node.js, Express, MongoDB, Order Management, Real-time Updates",
    image: devdigitaxrestaurant,
    live: "/restaurant",
    status: "published",
  },
  {
    id: "demo-4",
    title: "ÉLITE",
    subtitle: "Luxury Menswear Atelier",
    client: "DevDigitax Fashion",
    category: "ecommerce",
    section: "demo",
    result: "Premium e-commerce platform with sophisticated design and seamless checkout",
    tech: "React, Next.js, TailwindCSS, E-Commerce, Stripe Integration, Inventory Management",
    image: devdigitaxfashion,
    live: "/fashion",
    status: "published",
  },
  {
    id: "demo-5",
    title: "DevDigitax Portfolio",
    subtitle: "Creative Portfolio Showcase",
    client: "DevDigitax Portfolio",
    category: "frontend",
    section: "demo",
    result: "Award-winning portfolio design with interactive elements and smooth transitions",
    tech: "React, TypeScript, TailwindCSS, GSAP Animations, Responsive Showcase",
    image: devdigitaxportfolio,
    live: "/portfolio",
    status: "published",
  },
  {
    id: "demo-6",
    title: "Footcap",
    subtitle: "Premium Footwear E-Commerce",
    client: "DevDigitax E-Commerce",
    category: "ecommerce",
    section: "demo",
    result: "Full-featured footwear marketplace with advanced filtering and payment processing",
    tech: "React, Next.js, TypeScript, TailwindCSS, Stripe, Product Filtering, Cart Management",
    image: devdigitaxecom,
    live: "/e-commerce",
    status: "published",
  },

  // ── CLIENT PROJECTS (Production Work) ─────────────────────────────────────
  {
    id: "client-1",
    title: "Yana Luxe",
    subtitle: "Luxury Fashion & Lifestyle",
    client: "Yana Luxe BD",
    category: "ecommerce",
    section: "client",
    result: "Premium luxury e-commerce platform with curated collections and VIP experience",
    tech: "Next.js, React, TypeScript, TailwindCSS, Stripe, Inventory Management, Analytics",
    image: yana,
    live: "/e-commerce",
    status: "published",
  },
];
