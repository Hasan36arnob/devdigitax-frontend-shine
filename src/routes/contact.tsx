import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — DevdigitaX" },
      { name: "description", content: "Get in touch with DevdigitaX for web development, SEO and digital marketing." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Contact</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Let's build something great.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">Tell us about your project. We respond within one business day.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-6">
          {[
            { Icon: Mail, t: "Email", v: "devdigitax@gmail.com" },
            { Icon: Phone, t: "WhatsApp", v: "+880 1974-527507" },
            { Icon: MapPin, t: "Office", v: "Dhaka, Bangladesh" },
          ].map(({ Icon, t, v }) => (
            <div key={t} className="p-6 rounded-2xl border border-border bg-card flex items-start gap-4">
              <div className="h-11 w-11 grid place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground tracking-wider">{t}</div>
                <div className="font-semibold mt-1">{v}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-3 p-8 rounded-2xl border border-border bg-card space-y-5"
          style={{ boxShadow: "var(--shadow-elegant)" }}>
          {sent ? (
            <div className="text-center py-12">
              <div className="h-14 w-14 mx-auto grid place-items-center rounded-full text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Send className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Message sent!</h3>
              <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Phone" name="phone" />
                <div>
                  <label className="text-sm font-medium">Service</label>
                  <select className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none">
                    <option>Web Development</option>
                    <option>SEO</option>
                    <option>Paid Media</option>
                    <option>E-Commerce</option>
                    <option>Branding & Design</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea rows={5} required className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-full font-semibold text-primary-foreground inline-flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                Send Message <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} required={required}
        className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none" />
    </div>
  );
}