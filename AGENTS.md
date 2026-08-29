# mvdm.io — marketing website for mvdmio's products

This is the public marketing site for mvdmio. It sells five SaaS products
(Compliance, Translation Tools, Health Check, Statistics, Commonplace); the
blog, resume and open-source pages are secondary. See `CONTEXT.md` for the
domain vocabulary (Product, Flagship, Landing page, Resume, mvdmio) — use
those terms, not "app", "project", "tool", "portfolio" or "info page".

## Tech stack

Plain static HTML, hand-written CSS, and one small hand-written JS file
(`assets/js/site.js`, the mobile nav toggle — every page references it with
`<script src="/assets/js/site.js" defer></script>` at the end of `<body>`).
No generator, no build step, no Node, no Ruby, no Bundler. GitHub Pages
serves the repository root directly. The only external dependency is Google
Fonts (Source Serif 4, Inter, IBM Plex Mono, loaded via `<link>` in every
page's `<head>`). Don't add inline `<script>` blocks to pages; if the site
ever needs more behavior, extend `site.js`.

## Page / URL structure

Every URL is a directory containing an `index.html`, so links never carry a
`.html` suffix:

```
index.html                         /            (homepage)
404.html                           served for unmatched paths
products/<name>/index.html         /products/<name>/   (5 Landing pages)
blog/index.html                    /blog/       (post index)
posts/<slug>/index.html            /posts/<slug>/       (10 posts)
projects/index.html                /projects/   (Resume index)
projects/<slug>/index.html         /projects/<slug>/    (8 Resume entries)
legal/<doc>/index.html             /legal/<doc>/        (5 Legal pages: terms,
                                   privacy, dpa, subprocessors, company)
about/index.html                   /about/
open-source/index.html             /open-source/
feed.xml                           /feed.xml    (hand-maintained RSS)
sitemap.xml, robots.txt            search-engine files, served at root
assets/css/site.css                the one shared stylesheet
assets/js/site.js                  the one shared script (mobile nav toggle)
assets/images/, assets/img/        images and favicons
```

`/consultancy/` is gone with no redirect — do not recreate it. There is no
`_tabs/`, `_posts/`, `_projects/`, `_config.yml`, `Gemfile`, or any other
Jekyll/Chirpy machinery; do not reintroduce any of it.

## Shared stylesheet and design tokens

`assets/css/site.css` is the single stylesheet for the whole site — every
page links it, nothing else. It carries the "Boardroom" design system:

- **Tokens** (custom properties near the top of the file): paper background
  `--paper`, ink `--ink`, pine `--pine` (buttons), hairline `--hairline`,
  plus one accent variable per product — `--acc-compliance`,
  `--acc-translation-tools`, `--acc-health-check`, `--acc-statistics`,
  `--acc-commonplace`. A Landing page sets its accent by putting
  `data-product="<name>"` on its `<html>` tag; the registry in `site.css`
  (right under the tokens) maps that attribute to `--acc`, and the page
  reads `var(--acc)` everywhere. Don't hardcode a product's hex color
  inline, and don't set `--acc` from a page-level `<style>` block.
- **Reusable classes**: `.wrap` (page-width container), `.eyebrow`/`.mono`
  (small caps/mono labels), `.clause` (hairline-ruled, mono-numbered
  section — "01", "02"…), `.duo` (two-column text-beside-illustration
  section) with `.duo.rev` to flip which side the text sits on (alternates
  per feature section on a Landing page), `.ledger` (pricing table with
  dotted leader lines; other Products keep a `.total` row, Compliance's
  ledger does not), `.tiles`/`.tile` (card grid, used
  by the Resume index and Open source page), `.page-head` (generic page
  header), `.post-head`/`.post-image`/`.prose` (post and Resume entry
  layout), `.btn` (pine primary button) and `.btn.sm` (quieter secondary
  button).
- The site is light-only: no dark mode, no theme toggle, and no
  `prefers-color-scheme: dark` overrides — don't add any.
- Reduced motion: any animation/transition must be guarded so
  `prefers-reduced-motion: reduce` disables it.
- Focus states must stay visible on every interactive element — don't
  suppress `:focus`/`:focus-visible` outlines.

Adding new shared UI: put the class in `site.css`, not in a `<style>` block
on one page. Page-specific one-offs (e.g. an inline SVG illustration) can
live in the page itself.

## How to add a page

1. Create `<path>/index.html` (a new directory with an `index.html` inside,
   so the URL has no file extension).
2. Copy the `<head>` block from a page of the same kind (a Landing page
   from another Landing page, a post from another post, etc.) — same
   Google Fonts `<link>`, same favicon links, same `assets/css/site.css`
   link. Give it its own `<title>` and `<meta name="description">`, both
   distinct from every other page's, and its own `<link rel="canonical">`.
3. Reuse the shared skip link (`<a class="skip-link" href="#main">`, first
   element in `<body>`, pointing at `<main id="main">`), nav and footer
   markup, and the `site.js` script tag from a sibling page exactly — don't
   invent a second nav.
4. Add the new URL to `sitemap.xml`.
5. If it's a new post: add it to `blog/index.html`'s list (and to
   `feed.xml`'s items, most-recent-first) and its own `posts/<slug>/`
   directory.
6. If it's a new Resume entry: add it to `projects/index.html`'s tile grid
   in the same order.

## Prices

Compliance is billed per Framework. Its Landing page hero holds the
Flagship band as a headline — one literal string in `<p class="fee"
id="price">…`. The Compliance ledger lists every distinct Framework fee
and may repeat the Flagship figure; it has no organisation-total row. The
homepage Flagship fee line uses that same Flagship-band headline and does
not list cheaper bands or AI credit amounts.

Every other Product still states a single price in **exactly one place** —
one literal string, once, in the hero price line (`<p class="fee"
id="price">…`; business Products: "€999 / year, excl. VAT"; Commonplace:
"€99 / year, incl. VAT"). Those Products' ledger totals row does not
repeat the number — it links back to the hero with `<a href="#price">see
fee ↑</a>`. Do not introduce a second occurrence of the number anywhere
else on those pages (ledger, meta description, etc. must paraphrase
around it or link to `#price` instead of repeating the figure).

The homepage mentions each Product's price **at most once** (Compliance in
the hero fee line, Translation Tools in its clause tail, the other three on
their cards). Prices are hand-written against what's actually configured
in Stripe; there is no page-load fetch and no sync. A later Compliance
price change edits the hero, the band table, and at most the homepage
Flagship line. A later change to another Product is still one line on that
Landing page plus at most one line on the homepage.

## How to verify a change

There is no build step and no test framework — verification means serving
the tree and looking at it:

1. Serve the repository root with any static file server, e.g.
   `python3 -m http.server` from the repo root, then visit
   `http://localhost:8000/`.
2. Click through the pages you touched and their neighbors (nav, footer,
   in-body links) and confirm nothing 404s.
3. Check the page at both a desktop width and a narrow (~375px) width.
4. Tab through interactive elements and confirm the focus ring is visible.
5. If you touched `feed.xml`, confirm it still parses as RSS (e.g. open it
   in a browser or feed reader, or run it through an XML parser).
6. If you added or removed a page, update `sitemap.xml` to match.

A throwaway link-crawl script is fine for a one-off check but should not be
committed — there is no CI test suite for this repo.
