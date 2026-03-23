# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
# Due to Node v25 compatibility issue with react-scripts binary, use direct node invocation:
node node_modules/react-scripts/scripts/start.js   # Dev server (port 3000)
node node_modules/react-scripts/scripts/build.js   # Production build
node node_modules/react-scripts/scripts/test.js    # Tests

# Deploy to GitHub Pages
npm run deploy
```

The `npx react-scripts` and `npm start`/`npm run build` commands fail on Node v25 due to a module resolution bug in the react-scripts binary wrapper. Always use the direct `node` path above.

## Architecture

### Scroll-Driven Video Canvas

The core feature is a scroll-driven video playback system. Six sets of pre-extracted JPG frames (797 total) live in `public/frames*/`. On page load, `useFrameLoader` preloads every frame as an Image object with a progress bar. `ScrollCanvas` renders a fixed fullscreen `<canvas>` that draws the appropriate frame based on `window.scrollY / maxScroll`. The active video set is switchable via `BackgroundSwitcher`.

Frame path convention: `public/{folder}/frame_NNNN.jpg` (1-indexed, zero-padded to 4 digits). Video config is in `src/videos.js`.

### Page Navigation

Uses client-side state (`useState`), NOT React Router. `App.js` holds `activePage` and renders via a switch statement. Pages: `home`, `gallery`, `learning`, `about`. Navigation triggers `window.scrollTo({ top: 0, behavior: 'instant' })`.

### Z-Index Layering (critical to understand)

- `0`: ScrollCanvas (fixed fullscreen video background)
- `1`: Page content (`.page-content`)
- `50`: Navigation bar
- `60`: BackgroundSwitcher
- `100`: FilmGrain overlay
- `200`: Loading screen

### Styling

Tailwind CSS is loaded via **CDN script tag** in `public/index.html`, NOT as a build dependency. The full Material Design 3 dark color theme is configured inline there. Custom CSS lives in `src/index.css`. Fonts: Noto Serif (headlines), Manrope (body/labels), Material Symbols Outlined (icons) — all via Google Fonts CDN.

Color token examples: `bg-surface` (#111412), `text-tertiary` (#e7c17a), `text-primary` (#b8cbbc), `bg-surface-container-low` (#191c1a).

### Scroll Animation Patterns

- `ScrollReveal` component: wraps content to fade-in on viewport entry (IntersectionObserver)
- `AnimatedCounter`: counts up with eased animation when scrolled into view
- `useScrollProgress` hook: returns 0-1 progress for an element's scroll through viewport
- HomePage's `CinematicHero`: uses scroll progress to crossfade between title and quote text over a 300vh hero region

### Stitch Design Origins

Page designs were generated from Google Stitch (project ID: `17252922244571691472`). Downloaded HTML/screenshots are in `stitch_screens/` for reference. The design system follows "The Curated Wilderness" creative direction: dark forest palette, no visible borders (tonal layering only), glassmorphism for floating elements, asymmetric editorial layouts.

## Deployment

Hosted on GitHub Pages at `https://beckdotan.github.io/dotcomphoto_website`. The `homepage` field in `package.json` controls the base path.
