# 01 — Static stack, shared stylesheet, and homepage

Status: done

## What to build

Replace the Jekyll/Chirpy stack with plain static HTML and hand-written CSS, and ship the new homepage on it. After this step, serving the repo root with any static file server shows the new mvdmio homepage; pushing to `main` deploys the tree to GitHub Pages as-is, with no Ruby and no build.

The homepage speaks with the company voice ("mvdmio offers") and follows the Variant A ("Boardroom") design from the prototype at `.agents/prototypes/website-makeover/` (open `index.html?variant=A`; the `.vA` markup and its `proto.css` rules are the visual target — build fresh, don't copy the prototype wholesale). Section order: suite-level hero leading with Compliance (the Flagship), framework strip, clause-numbered sections for Compliance (01) and Translation Tools (02), a three-card grid for Health Check, Statistics, and Commonplace (03–05), open-source strip, footer.

Design system, carried by one shared stylesheet (`assets/css/site.css`) that later steps extend:

- Light "paper" background `#fbfaf7`, dark green-black ink `#10231c`, deep pine `#0e3b2e` buttons, emerald Compliance accent, warm hairlines `#ddd8ca`. Light-only — no dark mode, no toggle.
- Source Serif 4 for display headings, Inter for body, IBM Plex Mono for eyebrows, prices, labels (Google Fonts is the only external dependency).
- Audit-ledger signature: thin ruled hairlines between sections; mono clause numbers ("01", "02") encoding the real product ranking.
- Per-product accent colors as CSS custom properties (Compliance emerald `#059669`-family, Translation Tools sky `#0284c7`, Health Check teal `#0d9488`, Statistics indigo `#4f46e5`, Commonplace amber `#d97706`) so each Landing page can set its accent.
- Pine "Get started" primary button always paired with a quieter "Contact me" (`mailto:michiel@mvdm.io`) secondary.

Top navigation: mvdmio wordmark, the five Products, Open source, Blog, About, and a "Get started" button. Keep this structure exactly; the owner flagged the prototype's menu detailing as "could be better", so improve the detailing (spacing, hover/focus treatment, mobile behaviour) within it. Resume is NOT in the nav — it appears in the footer only (link to `/projects/`). Footer also carries contact and the wordmark.

"Get started" buttons link to each Product's application domain: `https://compliance.mvdm.io`, `https://translations.mvdm.io`, `https://healthcheck.mvdm.io`, `https://statistics.mvdm.io`, `https://commonplace.mvdm.io`. Product sections link to the `/products/:name/` Landing pages (built in steps 02–05; those hrefs are the URL contract even though the targets don't exist yet — the full-site crawl happens in step 08).

Also build the 404 page (`404.html`, which GitHub Pages picks up by convention) in the same design.

Tear out the Jekyll machinery: `_config.yml`, `Gemfile`, `_layouts/`, `assets/css/jekyll-theme-chirpy.scss`, `download-images.ps1`, and the Jekyll entries in `.gitignore`. Rewrite `.github/workflows/pages-deploy.yml` to upload the tree directly (checkout → configure-pages → upload-pages-artifact with path `.` → deploy-pages; no Ruby setup, no build). Leave `_posts/`, `_products/`, `_projects/`, and `_tabs/` in place — later steps convert then delete them. Keep `assets/img/favicons/` and wire the favicon links into the page head.

Quality floor (applies to this and every later page): responsive down to phone widths, visible keyboard-focus states, respects `prefers-reduced-motion`, and a title + meta description in the head.

## Footprint

Projects: mvdm.io static site (serve the repo root with a static file server; every page built so far renders with working styles)

- `index.html` — replace the Jekyll stub with the full homepage
- `assets/css/site.css` — new shared stylesheet: tokens, nav, footer, buttons, hairlines, clause numbers, cards
- `404.html` — new
- `.github/workflows/pages-deploy.yml` — replace Jekyll build job with direct static upload
- `_config.yml`, `Gemfile`, `_layouts/default.html`, `assets/css/jekyll-theme-chirpy.scss`, `download-images.ps1` — delete
- `.gitignore` — drop Jekyll entries (`_site/`, `.jekyll-cache/`, `.sass-cache/`, `.jekyll-metadata`, `vendor/`, `Gemfile.lock`); keep `.claude/worktrees/`
- `.agents/prototypes/website-makeover/index.html`, `proto.css` — read-only design reference (Variant A / `.vA`)
- `assets/img/favicons/` — existing favicons, referenced from the head
- `CONTEXT.md` — glossary for naming (Product, Flagship, Landing page, Resume, mvdmio); do not edit

## Acceptance criteria

- [ ] `python -m http.server` (or any static server) from the repo root serves the homepage at `/` with full styling — no Jekyll, no build step
- [ ] Homepage section order matches the spec: hero (leading Compliance) → framework strip → clause 01 Compliance → clause 02 Translation Tools → three-card grid (03 Health Check, 04 Statistics, 05 Commonplace) → open-source strip → footer
- [ ] Nav contains exactly: wordmark, five Products, Open source, Blog, About, "Get started"; Resume link lives in the footer only; no Consultancy anywhere
- [ ] Every "Get started" points at the Product's application domain; every "Contact me" is `mailto:michiel@mvdm.io`; internal links use the contracted paths (`/products/compliance/`, `/products/translation-tools/`, `/products/health-check/`, `/products/statistics/`, `/products/commonplace/`, `/open-source/`, `/blog/`, `/about/`)
- [ ] Visual result matches Variant A: paper/ink/pine palette, serif display + Inter body + mono labels, hairline rules, clause numbers
- [ ] 404 page exists in the same design
- [ ] Homepage and 404 are readable at 375px width, keyboard tab order shows visible focus, reduced motion is respected, and each page has a title + meta description
- [ ] `_config.yml`, `Gemfile`, `_layouts/`, the Chirpy scss, and `download-images.ps1` are gone; the workflow deploys the tree without a build

## Outcome

Built the homepage (`index.html`) and `404.html` as plain static HTML against a new shared stylesheet `assets/css/site.css` that carries the full Variant A ("Boardroom") design system: paper/ink/pine tokens, per-product accent custom properties (`--acc-compliance`, `--acc-translation-tools`, `--acc-health-check`, `--acc-statistics`, `--acc-commonplace`), nav, buttons, hairline clause sections, three-card grid, ledger table and closing-CTA classes (the latter two are pre-built for step 02+, unused on the homepage itself). The homepage follows the exact section order from the spec: hero (Compliance) → framework strip → clause 01 Compliance → clause 02 Translation Tools → three-card grid (03–05) → open-source strip → footer. Nav is wordmark + five Products + Open source + Blog + About + Get started, with a hand-rolled mobile toggle (CSS `[data-open]` attribute + ~10 lines of inline JS, no build step) improving on the prototype's menu, which had no mobile behavior at all. Resume lives only in the footer, linking to `/projects/`. All "Get started" buttons point at the five `*.mvdm.io` application domains; all "Contact me" buttons are `mailto:michiel@mvdm.io`; internal links use the contracted `/products/:name/`, `/open-source/`, `/blog/`, `/about/` paths (these targets don't exist until steps 02–08, per the spec). Verified locally with `python -m http.server`: homepage and 404 both return 200, `site.css` loads, no "Consultancy" references anywhere, and all Jekyll files listed in the footprint are gone (`git status` shows them as `D`).

Removed Jekyll from `.github/workflows/pages-deploy.yml` (dropped the `build` job's Ruby setup and `jekyll build` step; `upload-pages-artifact` now uploads path `.` directly) and from `.gitignore` (dropped `_site/`, `.sass-cache/`, `.jekyll-cache/`, `.jekyll-metadata`, `vendor/`, `Gemfile.lock`; kept `.claude/worktrees/`).

Drift from footprint: none of substance. The footprint's `.gitignore` entry list said `.jekyll-cache/` but the actual file had `.sass-cache/` (no leading dot-jekyll variant existed) — removed the entries that were actually present rather than the literal list, which covers the same intent. `assets/img/favicons/site.webmanifest` and `browserconfig.xml` contain hardcoded `/www.mvdm.io/...` icon paths left over from the old GitHub Pages project-site baseurl; these were left untouched (out of this step's edit list) but are wired into the page `<head>` as instructed — a later step should correct those internal paths to `/assets/img/favicons/...` if the site is served from the domain root.
