# Premium Animation System Guide

A comprehensive GSAP + ScrollTrigger animation system with accessibility and performance optimizations.

## Overview

This animation system provides reusable components for scroll-driven reveals, staggered text animations, cinematic effects, and more. All components respect `prefers-reduced-motion` for accessibility.

## Core Components

### 1. **Reveal** - Scroll-Driven Reveals
Animates elements from hidden to visible when they enter the viewport.

```tsx
import { Reveal } from "@/components/ui/animations";

<Reveal 
  variant="fade-in-up" 
  delay={0.2}
  duration={0.8}
  start="top 80%"
>
  <div>Content that reveals on scroll</div>
</Reveal>
```

**Props:**
- `variant`: "fade-in-up" | "fade-in" | "scale" | "slide-up" | "image" (default: "fade-in-up")
- `delay`: Animation delay in seconds (default: 0)
- `duration`: Animation duration in seconds (default: 0.8)
- `start`: ScrollTrigger start position (default: "top 80%")
- `tweenVars`: Custom GSAP tween variables

**Variants:**
- `fade-in-up`: Opacity 0→1, Y 40→0
- `fade-in`: Opacity 0→1
- `scale`: Opacity 0→1, Scale 0.9→1
- `slide-up`: Opacity 0→1, Y 60→0
- `image`: Opacity 0→1, Scale 1.05→1

---

### 2. **SplitText** - Word-by-Word Staggered Animation
Splits text into words/characters and animates each with stagger.

```tsx
import { SplitText } from "@/components/ui/animations";

<SplitText 
  text="Next-Gen Development"
  type="words"
  staggerAmount={0.15}
  duration={0.8}
  delay={0.1}
/>
```

**Props:**
- `text`: Text to animate
- `type`: "words" | "characters" | "lines" (default: "words")
- `staggerAmount`: Delay between each item (default: 0.15)
- `duration`: Animation duration (default: 0.8)
- `delay`: Initial delay (default: 0)
- `triggerStart`: ScrollTrigger start (default: "top 80%")
- `triggerEnd`: ScrollTrigger end (default: "bottom 20%")
- `as`: HTML element type (default: "span")

---

### 3. **RevealText** - Premium Heading Animation
Enhanced text reveal with better control and accessibility.

```tsx
import { RevealText } from "@/components/ui/animations";

<RevealText 
  text="Scale Your Brand Digitally"
  as="h1"
  splitType="words"
  staggerAmount={0.1}
  duration={0.9}
/>
```

**Props:**
- `text`: Text to animate
- `as`: HTML element (default: "h2")
- `splitType`: "words" | "characters" | "lines" (default: "words")
- `staggerAmount`: Stagger delay
- `duration`: Animation duration
- `delay`: Initial delay
- `triggerStart`: ScrollTrigger start
- `triggerEnd`: ScrollTrigger end

---

### 4. **ScrollText** - Cinematic Pinned Section
Creates a pinned section with blur-to-clear animation and letter stagger.

```tsx
import { ScrollText } from "@/components/ui/animations";

<ScrollText 
  text="Cinematic Title"
  subtext="Supporting text"
  blurAmount={40}
  pinDuration={3}
  staggerLetters={true}
/>
```

**Props:**
- `text`: Main heading text
- `subtext`: Optional supporting text
- `blurAmount`: Initial blur amount in pixels (default: 40)
- `pinDuration`: How long section stays pinned (default: 3)
- `staggerLetters`: Animate letters individually (default: true)

---

### 5. **Stagger & StaggerItem** - Container Stagger Animation
Animates multiple children with stagger effect.

```tsx
import { Stagger, StaggerItem } from "@/components/ui/animations";

<Stagger 
  variant="scale" 
  staggerDelay={0.1}
  duration={0.6}
>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
</Stagger>
```

**Props:**
- `variant`: "fade" | "scale" | "slide-up" | "image" (default: "fade")
- `staggerDelay`: Delay between items (default: 0.1)
- `delay`: Initial delay (default: 0)
- `duration`: Animation duration (default: 0.6)
- `start`: ScrollTrigger start (default: "top 80%")

---

### 6. **FadeIn** - Simple Fade with Optional Effects
Accessible fade-in with optional scale and blur.

```tsx
import { FadeIn } from "@/components/ui/animations";

<FadeIn 
  delay={0.2}
  duration={0.8}
  scale={true}
  blur={10}
>
  <div>Fading in content</div>
</FadeIn>
```

**Props:**
- `delay`: Animation delay
- `duration`: Animation duration
- `scale`: Add scale animation (default: false)
- `blur`: Initial blur amount (default: 0)
- `start`: ScrollTrigger start

---

### 7. **HeroComposition** - Complete Hero Section
Pre-built hero with coordinated animations.

```tsx
import { HeroComposition } from "@/components/ui/animations";

<HeroComposition 
  backgroundImage="/hero.jpg"
  badge={{ icon: <Sparkles />, text: "New Feature" }}
  heading="Scale Your Brand Digitally"
  subheading="With DevdigitaX"
  description="Custom development and strategic marketing..."
  ctaButtons={[
    { label: "Get Started", href: "/contact", variant: "primary" },
    { label: "Learn More", href: "/about", variant: "secondary" }
  ]}
/>
```

---

## Accessibility & Reduced Motion

All components automatically respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion, getAnimationConfig } from "@/components/ui/animations";

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(prefersReducedMotion);
  
  // config.duration: 0.3 (reduced) or 0.8 (normal)
  // config.ease: "linear" (reduced) or "power3.out" (normal)
  // config.staggerAmount: 0.05 (reduced) or 0.15 (normal)
  // config.scrub: false (reduced) or 1 (normal)
}
```

---

## Page Transitions

Enable smooth view transitions between pages:

```tsx
import { PageTransition, useViewTransition } from "@/components/ui/animations";

// Wrap your app
<PageTransition>
  <YourApp />
</PageTransition>

// Use in navigation
function Navigation() {
  const startTransition = useViewTransition();
  
  const handleNavigate = () => {
    startTransition(() => {
      // Navigate here
    });
  };
}
```

---

## Performance Tips

1. **Use `will-change` wisely**: Applied automatically to animated elements
2. **Lazy mount**: Only animate visible elements
3. **Stagger animations**: Spread animations over time
4. **Reduce motion**: Respect user preferences
5. **Cleanup**: All components clean up ScrollTriggers on unmount

---

## CSS Utilities

Import animation styles:

```tsx
import "@/styles/animations.css";
```

**Available classes:**
- `.premium-gradient-text`: Gradient text effect
- `.glow-effect`: Subtle glow
- `.char-reveal`: Character reveal container
- `.word-reveal`: Word reveal container
- `.cinematic-text`: Cinematic text effect with shimmer

---

## Example: Hero Section

```tsx
import { 
  HeroComposition, 
  SplitText, 
  FadeIn,
  Stagger,
  StaggerItem 
} from "@/components/ui/animations";

export function Hero() {
  return (
    <HeroComposition
      backgroundImage="/hero.jpg"
      badge={{ text: "Scale Your Brand" }}
      heading="Next-Gen Development"
      description="Custom solutions for digital growth"
      ctaButtons={[
        { label: "Get Started", href: "/contact", variant: "primary" }
      ]}
    />
  );
}
```

---

## Example: Portfolio Grid

```tsx
import { Stagger, StaggerItem, Reveal } from "@/components/ui/animations";

export function Portfolio() {
  return (
    <Stagger variant="image" staggerDelay={0.15}>
      {projects.map(project => (
        <StaggerItem key={project.id}>
          <div className="rounded-lg overflow-hidden">
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
```

---

## Example: Testimonials with Staggered Text

```tsx
import { RevealText, FadeIn } from "@/components/ui/animations";

export function Testimonial({ quote, author }) {
  return (
    <FadeIn>
      <RevealText 
        text={quote}
        as="blockquote"
        splitType="words"
        staggerAmount={0.08}
      />
      <p className="mt-4">{author}</p>
    </FadeIn>
  );
}
```

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 15.1+)
- View Transition API: Chrome 111+, Edge 111+

---

## Troubleshooting

**Animations not triggering:**
- Check if element is in viewport
- Verify ScrollTrigger is registered
- Check browser console for errors

**Animations too fast/slow:**
- Adjust `duration` prop
- Check `prefers-reduced-motion` setting
- Verify GSAP easing function

**Performance issues:**
- Reduce number of animated elements
- Increase `staggerDelay`
- Use `will-change` sparingly
- Profile with DevTools

---

## API Reference

### ScrollTrigger Positions

Common `start` and `end` values:
- `"top 80%"`: When top of element is 80% down viewport
- `"top center"`: When top of element is at viewport center
- `"top 20%"`: When top of element is 20% down viewport
- `"bottom 20%"`: When bottom of element is 20% down viewport

### GSAP Easing Functions

- `"power1.out"`: Gentle ease
- `"power2.out"`: Medium ease
- `"power3.out"`: Strong ease (default)
- `"power4.out"`: Very strong ease
- `"back.out"`: Bounce effect
- `"elastic.out"`: Spring effect

---

## License

Part of DevdigitaX frontend framework.
