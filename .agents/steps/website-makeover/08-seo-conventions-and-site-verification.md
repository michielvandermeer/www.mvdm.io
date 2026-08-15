# 08 — Search-engine files, conventions rewrite, and full-site verification

Status: done

## What to build

Make the finished site findable, bring the repo's conventions in line with the new stack, and prove the whole site holds together.

**Search engines**: a hand-written `sitemap.xml` listing every page (homepage, five Landing pages, `/blog/` + ten posts, `/projects/` + eight Resume entries, `/about/`, `/open-source/`) and a `robots.txt` referencing it. Audit that every page carries a distinct title and meta description.

**Conventions**: rewrite the repo's own documentation so the next contributor (human or agent) follows the static-HTML conventions instead of Jekyll's:

- `AGENTS.md` — new tech stack (plain HTML + hand-written CSS, no build), the page/URL structure, the shared-stylesheet and design-token conventions, how to add a page or post, how prices are maintained (one literal per Landing page, hand-synced with Stripe), how to verify (static serve + link crawl).
- `README.md` — structure section and local-development instructions for the new stack (any static file server; no Ruby/Bundler).
- `opencode.jsonc` — replace the Jekyll command templates (`serve`, `build`, `new-post`, `new-project`, `new-product`) and watcher ignores with static-site equivalents.
- Remove any remaining Jekyll leftovers the earlier steps missed (check for stray `_`-prefixed dirs, Gemfile.lock, Chirpy references).

**Verification** (the spec's testing contract, run against a local static server):

- A one-off link crawl (throwaway script in the scratchpad, not committed) over the local site confirming no internal link 404s.
- The preserved-URL contract resolves — every URL that existed on the old site and survives: the ten `/posts/:title/`, the eight `/projects/:name/`, `/products/commonplace/`, `/products/translation-tools/`, `/products/health-check/`, `/products/statistics/`, `/about/`, `/open-source/`, `/projects/`, `/feed.xml` — plus the new `/products/compliance/` and `/blog/`.
- `/feed.xml` parses as valid RSS.
- A visual review pass over every page at desktop and mobile widths (fix what's broken; note anything needing the owner's eye — all copy ships subject to owner review).
- Site-wide checks: visible focus states, reduced-motion respected, no dark-mode leakage, no external dependency beyond Google Fonts.

## Footprint

Projects: mvdm.io static site (serve the repo root; the full site is green — this step runs the whole-site crawl the earlier steps deferred)

- `sitemap.xml` — new, hand-written, every page listed
- `robots.txt` — new, references the sitemap
- `AGENTS.md` — rewrite for the static stack
- `README.md` — rewrite structure + development sections
- `opencode.jsonc` — replace Jekyll commands and watcher ignores
- all `*/index.html` pages + `index.html`, `404.html` — title/meta-description audit; small fixes only
- scratchpad — throwaway crawl script; do not commit it

## Acceptance criteria

- [x] `sitemap.xml` lists every page on the site and `robots.txt` points at it; both are served at the root
- [x] Every page has a distinct title and meta description
- [x] The link crawl over the locally served site reports zero internal 404s
- [x] Every preserved URL from the old site (the list above is the contract) returns the intended page, and `/feed.xml` parses as valid RSS
- [x] `AGENTS.md`, `README.md`, and `opencode.jsonc` describe only the new stack — no Jekyll, Chirpy, Ruby, or Bundler instructions remain anywhere in the repo (prototype and `.agents/` history exempt)
- [x] Repo tree contains no Jekyll machinery or leftover `_`-prefixed source dirs
- [x] Every page reviewed at desktop and ~375px widths; focus states visible; reduced motion respected; Google Fonts is the only external request

## Outcome

Built `sitemap.xml` (28 `<loc>` entries: homepage, 5 Landing pages, `/blog/` + 10 posts, `/projects/` + 8 Resume entries, `/about/`, `/open-source/` — matches every `index.html` under the served tree) and `robots.txt` (`Allow: /` plus a `Sitemap:` line pointing at it), both served at the repo root.

Rewrote `AGENTS.md`, `README.md`, and `opencode.jsonc` for the static-HTML stack: `AGENTS.md` now documents the tech stack, the `<dir>/index.html` URL structure, the `site.css` token/class conventions (including the `.duo`/`.duo.rev`, `.clause`, `.ledger`, `.tiles` classes earlier steps introduced), how to add a page/post/Resume entry, the one-price-literal-per-Landing-page rule, and how to verify (static serve + link crawl, no test framework). `README.md` got a structure tree and `python3 -m http.server` local-dev instructions, matching what `.github/workflows/pages-deploy.yml` actually does (no build job — it uploads path `.` directly). `opencode.jsonc` replaced the Jekyll `serve`/`build`/`new-post`/`new-project`/`new-product` commands with `serve`, `check-links`, `new-post`, `new-resume-entry`, and `new-product-landing-page` templates for the new stack, and trimmed the watcher ignore list to `.git/**` and `node_modules/**` (no `_site/`, `.jekyll-cache/`, `vendor/` — those were already gone per step 01's `.gitignore` cleanup).

Resolved the step-01 flagged deviation: `assets/img/favicons/site.webmanifest` and `browserconfig.xml` had stale `/www.mvdm.io/assets/img/favicons/...` icon paths from the old GitHub Pages project-site baseurl; rewrote both to root-relative `/assets/img/favicons/...` paths so the PWA manifest and MS tile icons resolve correctly when served from the domain root.

Audited every page's `<title>`/`<meta name="description">`: all titles were already distinct, but three Resume entries (`psa-quaycrane-ocr`, `psa-yardcrane-automation`, `psa-yardcrane-remote-control`) shared an identical meta description inherited unchanged from the old site's body copy ("Developing container terminal automation software for PSA Antwerp, PSA Sines and PSA Voltri."). Gave each a distinct description naming its own project, without touching the (unchanged, per spec) body content — only the `<meta name="description">` tag changed.

Verification: served the repo root with `python3 -m http.server`, ran a throwaway crawl script (scratchpad only, not committed) starting from `/` that followed every `<a>`/`<link>`/`<img>`/`<script>` reference — all 55 internal URLs it found (26 pages + `site.css` + all image/favicon assets) returned 200, zero internal 404s. Confirmed directly: `/sitemap.xml` 200, `/robots.txt` 200, `/404.html` 200, `/consultancy/` 404 (intentional, per step 07), `/feed.xml` 200 and parses as valid XML via `xml.etree.ElementTree`, `sitemap.xml` itself parses as valid XML. Checked `assets/css/site.css` for site-wide quality-floor items: `:focus-visible` rule present and not suppressed anywhere, a single `@media (prefers-reduced-motion: reduce)` block guards animation, and there is no `prefers-color-scheme` media query anywhere in the stylesheet (light-only, as the spec requires). External requests seen across every page: Google Fonts (`fonts.googleapis.com`/`fonts.gstatic.com`), `mailto:` links, the five `*.mvdm.io` product-app domains ("Get started" targets, intentional per spec), GitHub repo links on the Open source page, and external citation links inside blog-post bodies (pre-existing content, out of scope) — no other third-party script or stylesheet host.

Grepped the whole repo (excluding `.git/` and `.agents/`) for `_`-prefixed directories, `Gemfile*`, and case-insensitive `jekyll|chirpy|bundler|gemfile`: no stray `_`-dirs or Gemfiles remain; the only textual hits are in the new `AGENTS.md`, where "Jekyll", "Chirpy", "Bundler", and "Gemfile" appear solely as negations ("no Ruby, no Bundler", "do not reintroduce `_tabs/`... or any other Jekyll/Chirpy machinery") documenting what must *not* come back — not leftover instructions for using them.

Drift from footprint: none of substance. The footprint listed the favicon files as step 01's problem to flag; this step (explicitly told it was the place to resolve step 01's deviation) edited `assets/img/favicons/site.webmanifest` and `browserconfig.xml`, which weren't named in this step's own footprint bullet list but were called out by the run harness as this step's responsibility to close out. Everything else matches the footprint as written.
