import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/devdigitax-logo.jpeg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DevdigitaX" className="h-10 w-10 rounded-lg" />
            <span className="font-bold text-lg">
              Devdigita<span className="text-primary">X</span>
            </span>
          </div>
           <p className="mt-4 text-muted-foreground max-w-md">
             DevdigitaX build custom development to brand your business and also marketing ideas to grow any business.
           </p>
           <p className="mt-3 text-muted-foreground max-w-md">
             We design, build, and scale digital products that turn traffic into measurable revenue.
           </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-foreground">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
             <li>
               <Link to="/admin" className="hover:text-foreground">
                 Admin
               </Link>
             </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-primary" /> devdigitax@gmail.com
            </li>
            <li className="flex gap-2">
               <Phone className="h-4 w-4 mt-0.5 text-primary" /> +880 1837-692110
            </li>
            <li className="flex gap-2">
               <MapPin className="h-4 w-4 mt-0.5 text-primary" /> Dhaka
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DevdigitaX. All rights reserved.
      </div>
    </footer>
  );
}
