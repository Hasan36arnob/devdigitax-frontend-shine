import { ReactNode } from "react";
import { cn } from "./Reveal";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { FadeIn } from "./FadeIn";

interface HeroCompositionProps {
  backgroundImage?: string;
  badge?: {
    icon?: ReactNode;
    text: string;
  };
  heading: string;
  subheading?: string;
  description: string;
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  className?: string;
  children?: ReactNode;
}

/**
 * Premium hero section composition with coordinated animations
 * - Background image with subtle zoom
 * - Staggered heading reveal
 * - Fade-in description and CTAs
 * - Consistent motion rhythm
 */
export function HeroComposition({
  backgroundImage,
  badge,
  heading,
  subheading,
  description,
  ctaButtons,
  className,
  children,
}: HeroCompositionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-[90vh] flex items-center justify-center",
        className
      )}
    >
      {/* Background with zoom animation */}
      {backgroundImage && (
        <Reveal
          variant="scale"
          duration={1.2}
          className="absolute inset-0 -z-10"
        >
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </Reveal>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 -z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        {badge && (
          <Reveal delay={0} variant="fade-in-up" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-6">
              {badge.icon}
              {badge.text}
            </div>
          </Reveal>
        )}

        {/* Heading with staggered reveal */}
        <RevealText
          text={heading}
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          delay={0.1}
          staggerAmount={0.08}
          duration={0.9}
          splitType="words"
        />

        {/* Subheading */}
        {subheading && (
          <Reveal delay={0.3} variant="fade-in-up" duration={0.7}>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              {subheading}
            </p>
          </Reveal>
        )}

        {/* Description */}
        <FadeIn delay={0.4} duration={0.8} className="mb-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        {ctaButtons && ctaButtons.length > 0 && (
          <Reveal delay={0.5} variant="fade-in-up" duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {ctaButtons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105",
                    btn.variant === "primary"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl"
                      : "border border-border bg-card/50 text-foreground hover:border-primary hover:bg-accent"
                  )}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}

        {/* Custom children */}
        {children && (
          <Reveal delay={0.6} variant="fade-in-up" duration={0.8}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
