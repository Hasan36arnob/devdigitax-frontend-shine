# Animation System - Quick Start Guide

## Installation

All components are already installed. Just import and use:

```tsx
import { 
  Reveal, 
  RevealText, 
  FadeIn, 
  Stagger, 
  StaggerItem,
  ScrollText,
  SplitText
} from "@/components/ui/animations";
```

## 5-Minute Setup

### 1. Basic Fade-In on Scroll

```tsx
<Reveal variant="fade-in-up">
  <h2>This fades in when scrolled into view</h2>
</Reveal>
```

### 2. Staggered List

```tsx
<Stagger variant="scale">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <div>{item.name}</div>
    </StaggerItem>
  ))}
</Stagger>
```

### 3. Animated Heading

```tsx
<RevealText 
  text="Scale Your Brand Digitally"
  as="h1"
  splitType="words"
/>
```

### 4. Fade with Scale

```tsx
<FadeIn scale={true} duration={0.8}>
  <img src="hero.jpg" alt="Hero" />
</FadeIn>
```

### 5. Cinematic Section

```tsx
<ScrollText 
  text="Premium Solutions"
  subtext="For your digital growth"
/>
```

## Common Patterns

### Hero Section
```tsx
<Reveal variant="fade-in-up">
  <RevealText text="Main Heading" as="h1" splitType="words" />
  <FadeIn delay={0.3}>
    <p>Description text</p>
  </FadeIn>
</Reveal>
```

### Portfolio Grid
```tsx
<Stagger variant="image">
  {projects.map(p => (
    <StaggerItem key={p.id}>
      <img src={p.image} alt={p.title} />
    </StaggerItem>
  ))}
</Stagger>
```

### Stats Section
```tsx
<Stagger variant="scale" staggerDelay={0.15}>
  {stats.map(s => (
    <StaggerItem key={s.label}>
      <div className="text-center">
        <div className="text-4xl font-bold">{s.value}</div>
        <p>{s.label}</p>
      </div>
    </StaggerItem>
  ))}
</Stagger>
```

### Process Steps
```tsx
<Stagger variant="slide-up">
  {steps.map(step => (
    <StaggerItem key={step.id}>
      <div className="p-6 border rounded-lg">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </StaggerItem>
  ))}
</Stagger>
```

## Customization

### Change Animation Speed
```tsx
<Reveal duration={1.2}>Content</Reveal>
<Stagger duration={0.8}>Items</Stagger>
```

### Change Stagger Timing
```tsx
<Stagger staggerDelay={0.2}>Items</Stagger>
<RevealText staggerAmount={0.2} />
```

### Change Trigger Point
```tsx
<Reveal start="top 60%">Content</Reveal>
<RevealText triggerStart="top 50%" />
```

### Add Delay
```tsx
<Reveal delay={0.5}>Content</Reveal>
<FadeIn delay={0.3}>Content</FadeIn>
```

## Variants Quick Reference

### Reveal Variants
- `fade-in-up`: Fade + slide up (default)
- `fade-in`: Just fade
- `scale`: Fade + scale up
- `slide-up`: Fade + larger slide
- `image`: Fade + slight scale down

### Stagger Variants
- `fade`: Just fade
- `scale`: Fade + scale
- `slide-up`: Fade + slide up
- `image`: Fade + scale down

## Accessibility

All components automatically respect `prefers-reduced-motion`:

```tsx
// Users with reduced motion preference will see:
// - Shorter durations (0.3s instead of 0.8s)
// - Linear easing instead of power3.out
// - No scrubbing on scroll
// - Instant animations on some effects
```

## Performance Tips

1. **Use stagger to spread animations:**
   ```tsx
   <Stagger staggerDelay={0.15}>  // Spreads load
   ```

2. **Lazy load images before animating:**
   ```tsx
   <img loading="lazy" src="..." />
   ```

3. **Avoid animating too many elements:**
   ```tsx
   // Good: 5-10 items
   // Bad: 50+ items
   ```

4. **Use appropriate durations:**
   ```tsx
   // Fast: 0.3-0.5s
   // Normal: 0.6-0.9s
   // Slow: 1.0-1.5s
   ```

## Troubleshooting

### Animation not triggering?
- Check if element is in viewport
- Verify `start` prop is correct
- Check browser console for errors

### Animation too fast/slow?
- Adjust `duration` prop
- Check `prefers-reduced-motion` setting
- Verify GSAP is loaded

### Performance issues?
- Reduce number of animated elements
- Increase `staggerDelay`
- Use `will-change` sparingly
- Profile with DevTools

## CSS Classes

Available utility classes in `@/styles/animations.css`:

```tsx
<div className="premium-gradient-text">Gradient text</div>
<div className="glow-effect">Glowing element</div>
<div className="char-reveal">Character reveal</div>
<div className="cinematic-text">Cinematic effect</div>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## Next Steps

1. **Read full guide:** `ANIMATION_GUIDE.md`
2. **See examples:** `ANIMATION_EXAMPLES.md`
3. **Check components:** `src/components/ui/animations/`
4. **Test on your site:** Replace sections with animated versions

## Common Questions

**Q: Can I use multiple animations on one element?**
A: Yes! Nest components:
```tsx
<Reveal><RevealText text="..." /></Reveal>
```

**Q: How do I customize easing?**
A: Use GSAP easing functions in `tweenVars`:
```tsx
<Reveal tweenVars={{ ease: "back.out" }}>
```

**Q: Can I animate on hover instead of scroll?**
A: Not built-in, but you can use Framer Motion for that.

**Q: How do I disable animations?**
A: Set `duration={0}` or use `prefers-reduced-motion`.

---

**Need help?** Check `ANIMATION_GUIDE.md` for detailed documentation.
