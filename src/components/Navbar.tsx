import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="DevdigitaX logo" className="h-11 w-11 rounded-lg object-cover ring-1 ring-primary/40 group-hover:ring-primary transition" />
          <span className="font-bold text-lg tracking-tight">
            Devdigita<span className="text-primary">X</span>
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                className="text-sm text-muted-foreground hover:text-foreground transition"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        >
          <Phone className="h-4 w-4" /> Get a Quote
        </Link>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col p-4 gap-3">
            {navItems.map((i) => (
              <li key={i.to}>
                <Link to={i.to} onClick={() => setOpen(false)} className="block py-2 text-foreground">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}