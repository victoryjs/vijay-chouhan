# Vijay Chouhan — Portfolio

A lightweight, static portfolio site — plain HTML, CSS, and vanilla JavaScript (no frameworks, no build step).

## Structure

```
index.html          Home
about.html          About + Experience timeline
education.html      Education + Certifications
skills.html         Skills by category
projects.html       Selected projects
contact.html        Contact details
404.html            Branded not-found page (also set as GitHub Pages 404)
robots.txt          Search engine crawl rules
sitemap.xml         Page list for search engines
assets/
  css/              variables.css (theme tokens), fonts.css (self-hosted @font-face), style.css (all styles)
  fonts/            self-hosted Inter + Poppins woff2 files (no Google Fonts CDN dependency)
  js/main.js        theme toggle, mobile nav, active nav link, footer year (entrance animation is pure CSS, no JS)
  images/           profile photo, project media, favicon (svg + png + apple-touch-icon), og-banner.png (social share image)
  resume/           downloadable resume PDF
```

## Local preview

No server or build tools required — just open any page directly in a browser:

```
open index.html
```

Or serve it locally (recommended for accurate relative-path testing):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this folder to the `victoryjs/vijay-chouhan` repository on GitHub (branch `main`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — GitHub will publish the site at:
   `https://victoryjs.github.io/vijay-chouhan/`

### Adding a custom domain later

1. Buy a domain and add a `CNAME` DNS record pointing it at `victoryjs.github.io`.
2. Create a file named `CNAME` (no extension) at the repo root containing just your domain, e.g.:
   ```
   vijaychouhan.dev
   ```
3. Re-enable/verify HTTPS in **Settings → Pages** once DNS propagates.
4. Update the canonical/OG URLs (currently hardcoded to `https://victoryjs.github.io/vijay-chouhan/`) in every page's `<head>`, `robots.txt`, and `sitemap.xml` to match your new domain.

## Updating content

- Swap `assets/images/profile/vijay-chouhan.jpeg` for a new photo (keep the same filename, or update the `<img src>` in each page's hero — there are two: `index.html` and `about.html`).
- Replace `assets/resume/vijay-chouhan-resume.pdf` with an updated resume (keep the same filename so the download buttons keep working).
- Project cards in `projects.html` currently use styled placeholder banners instead of screenshots — drop images into `assets/images/projects/` and swap the `.project-card__media` markup to an `<img>` when real screenshots are available.
- If any project ever gets a public live URL, add a `.project-card__links` row (see the pattern already used on the homepage's featured-work cards) with a "Visit live site ↗" link inside the matching case study in `projects.html`.
- `assets/images/og-banner.png` (1200×630, the image shown when the site is shared on WhatsApp/LinkedIn/Twitter) is a pre-rendered binary asset, not hand-editable — regenerate it (a headless-Chrome screenshot of a small HTML template is the fastest way) if the name, title, or photo changes.

## Analytics

The site pings [GoatCounter](https://www.goatcounter.com/) (a free, cookieless, privacy-friendly analytics service) via one async script tag on every page — it never blocks rendering and the site works identically if GoatCounter is ever down.

**One-time setup:** register a free account at goatcounter.com using the site code `vijaychouhan` (so it matches `https://vijaychouhan.goatcounter.com/count`, already wired into every page). If you'd rather use a different site code, update the `data-goatcounter` URL in the script tag near the end of all 7 HTML files.

## Known tradeoffs

- **No templating.** This is a 6-page multi-file site with no build step, so the navbar/footer/head boilerplate is duplicated in every `.html` file. Adding a 7th page or changing a nav link means editing it in every file. This was a deliberate choice to keep the site framework-free and permanently dependency-free — a build step would need Node tooling to keep working "as-is" a decade from now.
- **Fonts and favicons are pre-built binary assets** (`assets/fonts/*.woff2`, `assets/images/icons/favicon*.png`) — if you ever change the font choice or brand mark, regenerate them rather than hand-editing.

## Owner TODO (not fixed by this pass)

- **Regenerate the resume PDF.** The current `assets/resume/vijay-chouhan-resume.pdf` contains a stray instruction-like line under the MyTicketPartner project ("Highlight 'Telehealth'...") that reads like leftover prompt-injection text, not real resume content. It was intentionally *not* reflected on the site, but it's still visible to anyone who downloads the PDF — please regenerate the PDF without that line.
- **Add real project screenshots and links.** `projects.html` cards use styled gradient placeholders and omit live-demo/GitHub links because none were provided (these are client/employer projects, so links may not be public). Add real screenshots to `assets/images/projects/` and links if you have permission to share them.
- **Collect testimonials.** Reviewers consistently say testimonials/recommendations add credibility that project lists alone can't. If you have (or can ask past managers/clients/colleagues for) 1-3 short quotes — a LinkedIn recommendation is perfect — send them over and a testimonials section can be added to `about.html` or `index.html`.
- **Verify GoatCounter is receiving data.** Register at goatcounter.com with site code `vijaychouhan` (see "Analytics" above) if you haven't already, then check `https://vijaychouhan.goatcounter.com` after a few real visits.
- **Consider a personal domain** (e.g. `vijaychouhan.dev`) — see "Adding a custom domain later" above. A personal domain reads as more established than a `github.io` subdomain to clients.
- **Submit the sitemap to Google Search Console** (free): verify site ownership at [search.google.com/search-console](https://search.google.com/search-console), add property `https://victoryjs.github.io/vijay-chouhan/`, then submit `sitemap.xml` under Sitemaps — helps the site actually get indexed and found.
