# Animation Visibility Fix Guide

## Issue: Content Hidden on First Load

If you're seeing only the hero heading and the rest of the content is hidden until you scroll or select it, this guide will help you fix it.

## Root Cause

The animation components were setting `opacity: 0` on initial render, which hid content before the scroll trigger could fire. This is now fixed in the latest version.

## What Was Fixed

### Updated Components (v1.1.0)

1. **Reveal.tsx** - Now uses `isClient` state to ensure animations only run on client
2. **SplitText.tsx** - Added client-side check before setting initial state
3. **Stagger.tsx** - Added client-side check before setting initial state
4. **FadeIn.tsx** - Added client-side check before setting initial state

### Key Changes

- Added `useState(false)` to track client-side rendering
- Added `useEffect` to set `isClient = true` on mount
- Only set initial animation state after client-side hydration
- Added data attribute to prevent duplicate animations

## How to Update

### Step 1: Pull Latest Changes
```bash
git pull origin main
```

### Step 2: Rebuild
```bash
npm run build
```

### Step 3: Test Locally
```bash
npm run dev
```

### Step 4: Verify Content is Visible
- Open http://localhost:5173
- All content should be visible immediately
- Animations should trigger as you scroll

## If Content is Still Hidden

### Check 1: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty cache and hard refresh"
4. Reload page

### Check 2: Verify GSAP is Loaded
1. Open DevTools Console
2. Type: `gsap`
3. Should return the GSAP object
4. If undefined, GSAP didn't load

### Check 3: Check for JavaScript Errors
1. Open DevTools Console
2. Look for red error messages
3. Fix any errors shown

### Check 4: Verify ScrollTrigger is Registered
1. Open DevTools Console
2. Type: `gsap.plugins.ScrollTrigger`
3. Should return the ScrollTrigger plugin
4. If undefined, plugin didn't register

## Debugging Steps

### Enable Animation Markers
```tsx
// In Reveal.tsx, change markers to true:
scrollTrigger: {
  trigger: element,
  start,
  end: "top 60%",
  toggleActions: "play none none none",
  markers: true,  // ← Change to true
}
```

This will show green/red boxes showing trigger points.

### Check Element Visibility
```javascript
// In DevTools Console:
const element = document.querySelector('[data-reveal-animated]');
console.log('Element:', element);
console.log('Opacity:', window.getComputedStyle(element).opacity);
console.log('Display:', window.getComputedStyle(element).display);
console.log('Visibility:', window.getComputedStyle(element).visibility);
```

### Check ScrollTrigger Status
```javascript
// In DevTools Console:
gsap.globalTimeline.getChildren().forEach(child => {
  console.log('Animation:', child);
});
```

## Common Issues & Solutions

### Issue: Content visible but animations don't trigger on scroll

**Solution:**
1. Check if element is in viewport when page loads
2. Verify `start` prop is correct (default: "top 80%")
3. Try changing start to "top 100%" to trigger immediately

```tsx
<Reveal start="top 100%">Content</Reveal>
```

### Issue: Animations trigger but look wrong

**Solution:**
1. Check animation duration (default: 0.8s)
2. Try increasing duration:

```tsx
<Reveal duration={1.2}>Content</Reveal>
```

3. Try different variant:

```tsx
<Reveal variant="fade-in">Content</Reveal>
```

### Issue: Content flashes or jumps

**Solution:**
1. Ensure no conflicting CSS animations
2. Check for `animation` or `transition` in CSS
3. Remove conflicting styles

### Issue: Animations don't work on mobile

**Solution:**
1. Check if ScrollTrigger is working on mobile
2. Test with DevTools mobile emulation
3. Try disabling animations on mobile:

```tsx
const isMobile = window.innerWidth < 768;

<Reveal variant={isMobile ? "fade-in" : "fade-in-up"}>
  Content
</Reveal>
```

## Performance Optimization

If animations are causing performance issues:

### Reduce Number of Animated Elements
```tsx
// Bad: Animating 50+ items
<Stagger>
  {items.map(item => <StaggerItem>{item}</StaggerItem>)}
</Stagger>

// Good: Animate only visible items
<Stagger>
  {items.slice(0, 10).map(item => <StaggerItem>{item}</StaggerItem>)}
</Stagger>
```

### Increase Stagger Delay
```tsx
// Bad: Too fast
<Stagger staggerDelay={0.05}>

// Good: Spread animations
<Stagger staggerDelay={0.2}>
```

### Use Simpler Animations
```tsx
// Bad: Complex animation
<Reveal variant="scale" duration={1.5}>

// Good: Simple animation
<Reveal variant="fade-in" duration={0.6}>
```

## Testing Checklist

- [ ] Content is visible on page load
- [ ] Animations trigger when scrolling
- [ ] Animations work on desktop
- [ ] Animations work on mobile
- [ ] Animations work with reduced motion enabled
- [ ] No console errors
- [ ] No performance issues
- [ ] Animations look smooth (60 FPS)

## Rollback Instructions

If you need to rollback to the previous version:

```bash
git revert HEAD
npm install
npm run build
```

## Getting Help

If you're still having issues:

1. Check the console for errors
2. Review the debugging steps above
3. Check `ANIMATION_GUIDE.md` for more info
4. Check `ANIMATION_EXAMPLES.md` for working examples

## Version Information

- **Fixed in:** v1.1.0
- **Date:** May 22, 2026
- **Components Updated:** Reveal, SplitText, Stagger, FadeIn

---

**The animations should now work correctly! 🎉**
