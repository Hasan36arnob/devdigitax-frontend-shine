import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

const aboutDropdown = [
  { to: "/about#mission", label: "Our mission" },
  { to: "/about#company", label: "About our company" },
  { to: "/about#team", label: "Our team" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="DevdigitaX logo"
            className="h-11 w-11 rounded-lg object-cover ring-1 ring-primary/40 group-hover:ring-primary transition"
          />
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
          <li
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link
              to="/about"
              className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              About
              <ChevronDown className="h-3 w-3" />
            </Link>
            <div
              className={`absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-2 z-50 transition-all duration-200 ${
                aboutOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              }`}
            >
              {aboutDropdown.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition"
                  activeProps={{ className: "text-foreground font-semibold" }}
                  onClick={() => setAboutOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="flex flex-col p-4 gap-3">
            {navItems.map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground"
                >
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="block py-2 text-foreground"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
