import { Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

const aboutItem = { to: "/about", label: "About" };

const aboutDropdown = [
  { to: "/about#mission", label: "Our mission" },
  { to: "/about#company", label: "About our company" },
  { to: "/about#team", label: "Our team" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAboutOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setAboutOpen(false);
      }, 150);
    }
  };

  const handleLinkClick = (to: string) => {
    setOpen(false);
    setAboutOpen(false);
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      if (window.location.pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.navigate({ to: path });
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="DevdigitaX logo"
            className="h-12 w-12 rounded-lg object-cover ring-1 ring-primary/40 group-hover:ring-primary transition-all group-hover:scale-105"
          />
          <span className="font-bold text-xl tracking-tight">
            Devdigita<span className="text-primary">X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.slice(0, 1).map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-md hover:bg-accent/50"
                activeProps={{ className: "text-foreground font-semibold bg-accent/60" }}
              >
                {i.label}
              </Link>
            </li>
          ))}
          
          {/* About Dropdown - FIXED HOVER */}
          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-md hover:bg-accent/50 flex items-center gap-1.5 cursor-pointer"
              onClick={() => !isMobile && setAboutOpen(!aboutOpen)}
            >
              {aboutItem.label}
              <ChevronDown 
                className={`h-3.5 w-3.5 transition-all duration-300 ${
                  aboutOpen ? "rotate-180" : ""
                }`} 
              />
            </button>
            
            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-xl py-2 z-50 transition-all duration-200 origin-top ${
                aboutOpen 
                  ? "opacity-100 visible scale-100 translate-y-0" 
                  : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {aboutDropdown.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => handleLinkClick(item.to)}
                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/70 transition-all hover:pl-6"
                  activeProps={{ className: "text-foreground font-semibold bg-accent/50" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
          
          {navItems.slice(1).map((i) => (
            <li key={i.to}>
              <Link
                to={i.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-md hover:bg-accent/50"
                activeProps={{ className: "text-foreground font-semibold bg-accent/60" }}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 hover:bg-accent/50 rounded-lg transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2">
          <ul className="flex flex-col p-4 gap-1">
            {navItems.slice(0, 1).map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-foreground font-medium rounded-lg hover:bg-accent/50 transition-all"
                >
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full text-left px-4 py-3 text-foreground font-medium rounded-lg hover:bg-accent/50 transition-all flex items-center justify-between"
              >
                {aboutItem.label}
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    aboutOpen ? "rotate-180" : ""
                  }`} 
                />
              </button>
              {aboutOpen && (
                <ul className="ml-6 mt-1 space-y-1 border-l-2 border-primary/30 pl-3">
                  {aboutDropdown.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => handleLinkClick(item.to)}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-all"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {navItems.slice(1).map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-foreground font-medium rounded-lg hover:bg-accent/50 transition-all"
                >
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