# Animation Implementation Examples

Complete examples for integrating the premium animation system into your website.

## 1. Enhanced Hero Section

```tsx
import { Reveal, RevealText, FadeIn, Stagger, StaggerItem } from "@/components/ui/animations";
import { Sparkles, ArrowRight, Phone } from "lucide-react";

export function EnhancedHero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.55_0.24_262/0.25),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-40 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - Text Content */}
        <Reveal variant="fade-in-up" className="flex flex-col justify-center">
          {/* Badge */}
          <span className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Scale Your Brand Digitally
          </span>

          {/* Main Heading with Staggered Words */}
          <RevealText 
            text="Next-Gen Development and Strategic Marketing Partner"
            as="h1"
            className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            splitType="words"
            staggerAmount={0.1}
            duration={0.9}
            delay={0.1}
          />

          {/* Description */}
          <FadeIn delay={0.3} duration={0.8} className="mt-6">
            <p className="text-lg text-muted-foreground max-w-xl">
              Built for businesses that demand real results. We create high-performance websites
              that convert visitors into customers, and execute strategic marketing campaigns that
              drive sustained revenue growth.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <Reveal delay={0.4} variant="fade-in-up" duration={0.8} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="btn-premium group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground hover:scale-105 transition-transform"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Get Assessment <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="/services"
              className="btn-premium inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-border hover:border-primary transition"
            >
              Explore Services
            </a>
            <a
              href="tel:+8809638474596"
              className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 hover:bg-accent transition-all text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-primary" />
              +880 9638-474596
            </a>
          </Reveal>
        </Reveal>

        {/* Right Column - Image */}
        <Reveal variant="scale" delay={0.2} className="relative z-10">
          <div className="absolute -inset-10 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ background: "var(--gradient-primary)" }} />
          <div
            className="relative aspect-square rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-6 grid place-items-center"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <img
              src="/logo.jpeg"
              alt="DevdigitaX"
              className="w-full max-w-md rounded-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

---

## 2. Stats Section with Animated Counters

```tsx
import { Stagger, StaggerItem, AnimatedCounter, Reveal } from "@/components/ui/animations";

const stats = [
  { v: "8+", l: "Years of Experience" },
  { v: "400+", l: "Projects Delivered" },
  { v: "15+", l: "Industries Served" },
  { v: "98%", l: "Client Retention" },
];

export function StatsSection() {
  return (
    <Reveal variant="fade" className="border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            400+ Businesses Grew With Us
          </h2>
          <p className="mt-3 text-muted-foreground">
            We're not the cheapest agency. We're the agency that makes your investment pay back.
          </p>
        </div>

        <Stagger variant="scale" staggerDelay={0.15} duration={0.6}>
          {stats.map((s) => (
            <StaggerItem
              key={s.l}
              className="p-6 rounded-2xl border border-border bg-background text-center hover:border-primary/30 transition-colors duration-300"
            >
              <div
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                <AnimatedCounter value={s.v} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Reveal>
  );
}
```

---

## 3. Portfolio Grid with Image Reveals

```tsx
import { Stagger, StaggerItem, Reveal } from "@/components/ui/animations";
import { ExternalLink, ArrowRight } from "lucide-react";

export function PortfolioGrid({ projects }) {
  return (
    <Reveal className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our recent work
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Crafting Digital Success Stories
          </h2>
        </div>
        <a href="/portfolio" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
          View All Projects <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <Stagger variant="image" staggerDelay={0.15} duration={0.8}>
        {projects.map((project) => (
          <StaggerItem
            key={project.id}
            className="card-lift group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
```

---

## 4. Process Timeline with Staggered Steps

```tsx
import { Stagger, StaggerItem, Reveal } from "@/components/ui/animations";

const lifecycle = [
  { n: "01", t: "Gathering Information", d: "We gather requirements from our clients..." },
  { n: "02", t: "Planning", d: "We plan the structure, sitemap and user journey..." },
  { n: "03", t: "Design", d: "We shape the visual identity..." },
  { n: "04", t: "Content", d: "Every section is written clearly..." },
  { n: "05", t: "Coding", d: "We turn the designs into clean code..." },
  { n: "06", t: "Testing", d: "Every function and breakpoint is tested..." },
  { n: "07", t: "Launching", d: "We ship to production..." },
  { n: "08", t: "Support", d: "We provide ongoing technical support..." },
];

export function ProcessTimeline() {
  return (
    <Reveal className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Our process
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
          Website Development Life Cycle
        </h2>
      </div>

      <Stagger variant="slide-up" staggerDelay={0.1} duration={0.6}>
        {lifecycle.map((p) => (
          <StaggerItem
            key={p.n}
            className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition duration-300"
          >
            <div className="text-4xl font-bold opacity-30" style={{ color: "oklch(0.55 0.24 262)" }}>
              {p.n}
            </div>
            <h3 className="mt-2 text-lg font-semibold">{p.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
```

---

## 5. Testimonials with Reveal Text

```tsx
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/ui/animations";
import { Star } from "lucide-react";

export function TestimonialsSection({ testimonials }) {
  return (
    <Reveal className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-muted-foreground">
          Real feedback from businesses we've helped grow
        </p>
      </div>

      <Stagger variant="fade-in-up" staggerDelay={0.15}>
        {testimonials.map((testimonial) => (
          <StaggerItem
            key={testimonial.name}
            className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>

            <RevealText
              text={testimonial.quote}
              as="blockquote"
              className="text-lg font-semibold leading-relaxed"
              splitType="words"
              staggerAmount={0.08}
              duration={0.7}
            />

            <div className="mt-6 flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
```

---

## 6. Cinematic Section with ScrollText

```tsx
import { ScrollText, Reveal } from "@/components/ui/animations";

export function CinematicSection() {
  return (
    <>
      <ScrollText
        text="Premium Digital Solutions"
        subtext="Crafted for businesses that demand excellence"
        blurAmount={40}
        pinDuration={3}
        staggerLetters={true}
      />

      <Reveal variant="fade-in-up" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          What Makes Us Different
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We don't just build websites or run ads. We build systems that turn your online
          presence into your most powerful sales channel. Every decision is tied to revenue.
          Every campaign is measured. Every relationship is a partnership.
        </p>
      </Reveal>
    </>
  );
}
```

---

## 7. FAQ Section with Staggered Items

```tsx
import { Stagger, StaggerItem, Reveal } from "@/components/ui/animations";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Reveal className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <Stagger variant="slide-up" staggerDelay={0.1}>
        {faqs.map((faq, idx) => (
          <StaggerItem
            key={idx}
            className="border-b border-border last:border-b-0"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full py-6 flex items-center justify-between hover:text-primary transition"
            >
              <h3 className="text-lg font-semibold text-left">{faq.q}</h3>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="pb-6 text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
```

---

## 8. Services Grid with Hover Effects

```tsx
import { Stagger, StaggerItem, Reveal, FadeIn } from "@/components/ui/animations";
import { ArrowRight } from "lucide-react";

export function ServicesGrid({ services }) {
  return (
    <Reveal className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Our Services
        </h2>
        <p className="mt-4 text-muted-foreground">
          Comprehensive solutions for your digital growth
        </p>
      </div>

      <Stagger variant="scale" staggerDelay={0.12}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <StaggerItem
              key={service.slug}
              className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                    {service.t}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.d}</p>
                  <a
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Reveal>
  );
}
```

---

## 9. Call-to-Action Section

```tsx
import { Reveal, RevealText, FadeIn } from "@/components/ui/animations";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <Reveal className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <RevealText
          text="Ready to Scale Your Business?"
          as="h2"
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          splitType="words"
          staggerAmount={0.12}
        />

        <FadeIn delay={0.3} duration={0.8} className="mb-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your project and create a custom strategy to achieve your goals.
          </p>
        </FadeIn>

        <Reveal delay={0.4} variant="fade-in-up" duration={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground hover:scale-105 transition-transform"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border border-border hover:border-primary transition"
            >
              View Our Work
            </a>
          </div>
        </Reveal>
      </div>
    </Reveal>
  );
}
```

---

## Integration Tips

1. **Import animations at the top of your component:**
   ```tsx
   import { Reveal, RevealText, FadeIn, Stagger, StaggerItem } from "@/components/ui/animations";
   ```

2. **Wrap sections with Reveal for entrance animations:**
   ```tsx
   <Reveal variant="fade-in-up">
     <section>Your content</section>
   </Reveal>
   ```

3. **Use Stagger for multiple items:**
   ```tsx
   <Stagger variant="scale">
     {items.map(item => <StaggerItem key={item.id}>{item}</StaggerItem>)}
   </Stagger>
   ```

4. **Combine animations for premium effect:**
   ```tsx
   <Reveal variant="fade-in-up">
     <RevealText text="Heading" splitType="words" />
     <FadeIn delay={0.3}>Description</FadeIn>
   </Reveal>
   ```

5. **Test with reduced motion:**
   - Open DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
   - Verify animations are shortened and smooth

---

## Performance Checklist

- ✅ Use `will-change` on animated elements (automatic)
- ✅ Stagger animations to avoid simultaneous renders
- ✅ Lazy load images before animation
- ✅ Test on mobile devices
- ✅ Verify reduced motion support
- ✅ Check browser compatibility
- ✅ Monitor Core Web Vitals

---

## Next Steps

1. Replace placeholder sections in your homepage with these examples
2. Customize colors, timing, and easing to match your brand
3. Test animations across devices and browsers
4. Monitor performance with Lighthouse
5. Gather user feedback and iterate
