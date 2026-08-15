# 08 — Search-engine files, conventions rewrite, and full-site verification

Status: pending

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

- [ ] `sitemap.xml` lists every page on the site and `robots.txt` points at it; both are served at the root
- [ ] Every page has a distinct title and meta description
- [ ] The link crawl over the locally served site reports zero internal 404s
- [ ] Every preserved URL from the old site (the list above is the contract) returns the intended page, and `/feed.xml` parses as valid RSS
- [ ] `AGENTS.md`, `README.md`, and `opencode.jsonc` describe only the new stack — no Jekyll, Chirpy, Ruby, or Bundler instructions remain anywhere in the repo (prototype and `.agents/` history exempt)
- [ ] Repo tree contains no Jekyll machinery or leftover `_`-prefixed source dirs
- [ ] Every page reviewed at desktop and ~375px widths; focus states visible; reduced motion respected; Google Fonts is the only external request
