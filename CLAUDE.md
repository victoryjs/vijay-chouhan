# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio site for Vijay Chouhan (Senior Software Developer). Plain HTML, CSS, and vanilla JavaScript — **no framework, no build step, no package.json, no dependencies**.

## Commands

There is no build/lint/test tooling in this repo. To preview changes:

```
open index.html
```

or, for accurate relative-path behavior:

```
python3 -m http.server 8000
# visit http://localhost:8000
```

There are no automated tests. Verify changes by opening the affected page(s) in a browser and checking both light and dark themes.

## Architecture

- **Pages are standalone HTML files**, not templated: `index.html`, `about.html`, `education.html`, `skills.html`, `projects.html`, `contact.html`. Each page duplicates the full `<head>`, navbar, and footer markup — there is no shared partial/include mechanism. When changing the navbar, footer, or any structural markup, **update it in every page**, not just one.
- **`<body data-page="...">`** on each page (e.g. `data-page="home"`) drives active-nav-link highlighting in `main.js`; the value must match the `data-page` attribute on the corresponding nav `<a>` link.
- **Theme system**: dark/light mode is controlled via `data-theme` on `<html>`, persisted in `localStorage`. Each page has an inline `<script>` in `<head>` (before CSS loads) that sets `data-theme` synchronously to avoid a flash of unstyled/wrong theme. `assets/js/main.js` wires up the toggle button and keeps it in sync with `localStorage`.
- **`assets/css/variables.css`**: design tokens only (spacing scale, radii, motion easing, font stacks) plus the two theme palettes, keyed off `:root` vs `:root[data-theme='light']` (dark is the default/`:root` fallback). Colors used as *text/icon foreground* (`--accent`, `--accent-2`) must stay WCAG-AA readable (>=4.5:1) against `--bg`/`--surface` in both themes — this is why the light-theme accent is a darker teal than the dark-theme one. Colors used only as button/badge *backgrounds* (`--accent-bright`, `--accent-gradient`) don't have this constraint.
- **`assets/css/style.css`**: all component/layout styles in one file, organized into clearly marked sections (Reset, Base, Accessibility, Navbar, Buttons, Hero, stat cards, Teaser, Timeline, Certifications, Skills, Projects, Contact, Footer, page-hero, scroll-reveal, Responsive). Keep new styles inside the matching section rather than appending ad hoc rules at the end.
- **`assets/js/main.js`**: single IIFE covering theme toggle, mobile nav (hamburger), active-nav-link marking, and footer year. No modules/bundler — this is loaded with a plain `<script defer>` tag on every page.
- **Entrance animation (`.reveal` class)**: pure CSS, not JS — a `@keyframes reveal-in` animation in `style.css` fades elements in once, ~0.6s after page load. This is deliberately *not* scroll/`IntersectionObserver`-based: an earlier version hid `.reveal` elements at `opacity: 0` until an `IntersectionObserver` marked them `.in-view`, but the observer didn't reliably fire for every observed element (especially many at once above the fold), leaving whole sections permanently invisible in production. Don't reintroduce a scroll-triggered hide/reveal mechanism for this reason — if you want scroll-linked effects, always keep content visible by default and treat the animation as decoration, never as the only path to visibility.

## Content conventions

- Keep filenames stable when swapping content: profile photo stays `assets/images/profile/vijay-chouhan.jpeg`, resume stays `assets/resume/vijay-chouhan-resume.pdf` (download buttons/links reference these exact paths).
- Project cards in `projects.html` use styled placeholder banners (`.project-card__media`) instead of real screenshots; swap in an `<img>` from `assets/images/projects/` when real screenshots become available.
- Deployment target is GitHub Pages serving from the repo root on `main` (see README.md for the custom-domain/CNAME steps) — paths in HTML/CSS/JS are relative and assume the site is served from root.
