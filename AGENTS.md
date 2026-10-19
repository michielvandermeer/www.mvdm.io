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
No generator, no Node, no Ruby, no Bundler, and no build step for the pages
themselves — GitHub Pages serves the repository root directly, exactly as
committed. The site has no external dependency: it serves its own fonts
(Source Serif 4, Inter, IBM Plex Mono) from `assets/fonts/` through the
`@font-face` rules at the top of `site.css`, and no page may request
`fonts.googleapis.com` or `fonts.gstatic.com` (see "How to add a page"
step 2 for the check). Don't
add inline `<script>` blocks to pages; if the site ever needs more
behavior, extend `site.js`. The one exception is a
`<script type="application/ld+json">` block: it is inert data, not
behavior, and the homepage, the five Landing pages and the Compliance
Framework page each carry one (see **Prices** and "How to add a page"
below; the Compliance page's and the Framework page's blocks also hold a
`FAQPage`). Executable inline scripts stay
forbidden.

The one exception is the Pages deploy workflow
(`.github/workflows/pages-deploy.yml`), which does run build steps
of its own: the legal pack (see **Legal documents** below), the Share cards
(see **Share cards** below), and the sitemap's `<lastmod>` dates (see **Page
/ URL structure** and "How to add a page" step 4).

## Page / URL structure

Every URL is a directory containing an `index.html`, so links never carry a
`.html` suffix:

```
index.html                         /            (homepage)
404.html                           served for unmatched paths
products/<name>/index.html         /products/<name>/   (5 Product Landing pages)
products/compliance/iso-27001/index.html   /products/compliance/iso-27001/   (Framework page)
blog/index.html                    /blog/       (post index)
posts/<slug>/index.html            /posts/<slug>/       (10 posts)
projects/index.html                /projects/   (Resume index)
projects/<slug>/index.html         /projects/<slug>/    (8 Resume entries)
legal/index.html                   /legal/      (lists the 5 legal pages, links the pack)
legal/<doc>/index.html             /legal/<doc>/        (5 Legal pages: terms,
                                   privacy, dpa, subprocessors, company)
legal/<doc>/<doc>.pdf              deploy-generated PDF beside each legal page
legal/mvdmio-legal-pack.zip        deploy-generated pack of all 5 (see
                                   Legal documents section below)
about/index.html                   /about/
open-source/index.html             /open-source/
feed.xml                           /feed.xml    (hand-maintained RSS)
sitemap.xml, robots.txt            search-engine files, served at root
llms.txt                           /llms.txt    (plain markdown summary for
                                   language models; no price in it, and
                                   not in sitemap.xml)
assets/css/site.css                the one shared stylesheet
assets/js/site.js                  the one shared script (mobile nav toggle)
assets/images/, assets/img/        images and favicons
```

`/consultancy/` is gone with no redirect — do not recreate it. There is no
`_tabs/`, `_posts/`, `_projects/`, `_config.yml`, `Gemfile`, or any other
Jekyll/Chirpy machinery; do not reintroduce any of it.

The committed `sitemap.xml` lists addresses only. The deploy adds
`<lastmod>` to every entry from git history (the date each page's own
`index.html` was last committed); nobody writes it by hand. The deploy fails if an
address in `sitemap.xml` has no page file, so removing or renaming a page
includes updating its sitemap entry.

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
  button), `.site-util` / `.site-util-inner` (header upper row: Open
  source, Blog, About, Resume), `.foot-inner` / `.foot-id` / `.foot-legal`
  / `.foot-sep` (two-line footer; spaced dashes are `.foot-sep::before`
  on a wrapper that is not a link — do not put `.foot-sep` on a link).
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
   Inter preload link (`<link rel="preload" as="font" type="font/woff2"
   crossorigin href="/assets/fonts/inter-latin.woff2">`, directly before
   the stylesheet link, and no other font preload), same favicon links,
   same `assets/css/site.css` link. A page never links Google Fonts; the
   check is `grep -rlE "googleapis|gstatic" --include=*.html
   --exclude-dir=.agents .`, which must list nothing. Give it its own `<title>` and `<meta name="description">`, both
   distinct from every other page's, and its own `<link rel="canonical">`.
   Copy the Share card block too (`og:title`, `og:description`, `og:url`,
   `og:image` and the rest) from that same sibling page, directly after the
   canonical link — `og:title`/`og:description` carry the share-preview
   wording, and `og:title` may differ from `<title>` (a Landing page's
   `<title>` carries the search keywords, its `og:title` stays brand-first
   "Product — mvdmio"); `og:description` mirrors this page's meta
   description, `og:url` its canonical, and its `og:image` path
   mirrors the new URL (see **Share cards** below). `og:type` is `article`
   for a post, `website` for everything else. A Landing page also copies
   the `<script type="application/ld+json">` block from a sibling Landing
   page, directly after the Share card block, and adapts it: one
   `SoftwareApplication` with the Product's `name`, canonical `url`, the
   page's own meta description, an `applicationCategory`, and its price
   as `offers` (see **Prices** below). The Compliance page's block also
   holds a `FAQPage` whose answers equal the visible answers of its
   `#faq` section, and so does the block of the Compliance Framework page
   (`products/compliance/iso-27001/`), which holds one `Offer` for its
   Framework. The homepage carries its own block
   (an `Organization` and a `WebSite`, no price); no other kind of page
   has one.
3. Reuse the shared skip link (`<a class="skip-link" href="#main">`, first
   element in `<body>`, pointing at `<main id="main">`), the two-row
   header, the two-line footer, and the `site.js` script tag from a
   sibling page exactly — don't invent a second nav. The header's upper
   row is `.site-util` (Open source, Blog, About, Resume); the lower row
   is `.site-nav-inner` / `#nav-links` (the five Product names, then Get
   started). Get started in that header always opens
   `https://compliance.mvdm.io`, including on a new Landing page — do not
   point it at that Product's own application. Hero and other in-page Get
   started buttons stay pointed where they belong. The footer is
   `.foot-inner`: identity on `.foot-id`, Legal pages on
   `.foot-legal`, which starts with a link to the `/legal/` hub that every
   copy must keep. Copy that footer wrap from a sibling page exactly —
   dashes are `.foot-sep::before` on a wrapper that is not a link. Do
   not put `.foot-sep` on a link. Every `<img>` carries `width` and
   `height` equal to the pixel size of the file its `src` serves (not the
   size it displays at), and `loading="lazy"` only when it starts below
   the first screen.
4. Add the new URL to `sitemap.xml` — this is also what gets the new page a
   Share card at the next deploy (see **Share cards** below). List the
   address only: the deploy adds `<lastmod>` from git history, and nobody
   writes it by hand.
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

Every other Product states a single price in its hero price line (`<p
class="fee" id="price">…`; business Products: "€999 / year, excl. VAT";
Commonplace: "€99 / year, incl. VAT"). The ledger's totals row on those
pages repeats the number as it stands. Beyond that, the only other place
a price may appear is the page's JSON-LD block (see below) — do not
introduce it anywhere else on those pages (meta description, prose, etc.
must paraphrase around it or link to `#price` instead of repeating the
figure).

Each Landing page's JSON-LD block (`<script type="application/ld+json">`
in the `<head>`, after the Share card block) restates the price as
machine-readable data: `price` as a number, `priceCurrency` `EUR`, and a
`UnitPriceSpecification` with `valueAddedTaxIncluded` (false for the
business Products and Compliance, true for Commonplace) and a one-year
`billingDuration`. Compliance's block holds one `Offer` per band row of
the table, named by that row's Frameworks, each per Framework. The block
repeats only what the page shows: no ratings, no reviews, and the `Offer`
(price) entries carry no AI credit amounts. A `FAQPage` answer may name an
AI credit amount when it equals the visible answer. The homepage block
holds no price. The
Compliance page's block holds one `SoftwareApplication` and one `FAQPage`
(in a `@graph`); the `FAQPage`'s answers are the same strings as the
visible answers in the page's `#faq` section, with no markup in them, so
they carry whatever the visible answer says, including the cost answer's AI
credit sentence ("$10 or $5, billed in USD"). The FAQ's cost answer and its
billing example repeat the Compliance fees, and the cost answer names the
frameworks of each fee row, as the matching `Offer` does.

The homepage mentions each Product's price **at most once** (Compliance in
the hero fee line, Translation Tools in its clause tail, the other three on
their cards). Prices are hand-written against what's actually configured
in Stripe; there is no page-load fetch and no sync. A later Compliance
price change edits the hero, the band table, the matching `Offer` in the
page's JSON-LD block, the FAQ's cost answer and billing example (in the
visible FAQ and in the JSON-LD), and at most the homepage Flagship line. It
also edits the Framework page `products/compliance/iso-27001/`: its meta
description and `og:description` (which state the €999 fee and equal the
JSON-LD `description`), its Pricing and trial section with the €999 plus
€199 example, its FAQ cost answer (visible and in the JSON-LD) and its
`Offer`. A later change to an AI credit amount edits the `$10` and `$5` row
labels of the band table and the FAQ cost answer on
`products/compliance/index.html` (the cost answer exists twice: as visible
text and as the `FAQPage` answer in the page's JSON-LD block, whose last
sentence names the amounts). On `products/compliance/iso-27001/` it edits the
Pricing and trial section's sentence about included credit and the FAQ cost
answer, visible and in the JSON-LD. The `Offer` entries need no edit for it
(see the rule above). A later change to another Product edits its hero price line (and the ledger total
row), that page's JSON-LD block, and at most one line on the homepage.

## Legal documents

`/legal/` is where the deploy's build step renders PDFs. The five legal
pages (`legal/terms/`, `legal/privacy/`, `legal/dpa/`, `legal/subprocessors/`,
`legal/company/`) are ordinary hand-written pages like any other, but the
Pages deploy workflow (`.github/workflows/pages-deploy.yml`) additionally
renders each one to a PDF beside its `index.html` with headless Chromium,
then zips the five flat (no folder, no cover sheet, no manifest) into
`legal/mvdmio-legal-pack.zip` — before the artifact upload step, so the
published site carries them. That zip URL is a constant the six mvdmio
apps link at; don't rename it without checking `LegalPageUrls` in the
`mvdmio-suite` repo first.

A Legal page PDF is the printed document body — the heading (small label,
title, effective date) and the prose — not a print of the live page's
website controls. Print media in `assets/css/site.css` hides the skip
link, site navigation, website footer, and the Download PDF control
(`.print-hide`). The wording in the PDF remains the wording on the page.

**Never commit a PDF or the zip by hand.** They are build output, gitignored
(`legal/*/*.pdf`, `legal/mvdmio-legal-pack.zip`), and only ever correct as of
the last deploy — that's the point: a page and its PDF are always made
together, so they can't disagree. If you edit a legal page's content, the
next deploy regenerates its PDF and the pack automatically; there is
nothing else to do.

`legal/index.html` lists the five documents and links the pack; add a new
legal document to it (and to `sitemap.xml`) the same way you'd add any other
page — see "How to add a page" above.

## Share cards

Every page carries Open Graph/Twitter Card markup in its `<head>` pointing at
a 1200x630 picture of that page's own eyebrow and headline. The same deploy
step that renders the Legal PDFs (above) grows a second half that renders one
PNG per page — reading each page's `<h1>`, `.eyebrow` text and `data-product`
attribute, then screenshotting `assets/share-card.html` with those values —
into `assets/share-cards/<path>.png`, mirroring the URL
(`assets/share-cards/index.png` for the homepage,
`assets/share-cards/products/compliance.png` for the Compliance Landing
page). **Never commit a share card PNG by hand** — like the Legal PDFs, they
are gitignored (`assets/share-cards/`) build output, only ever correct as of
the last deploy.

A page missing an `<h1>` or a `.eyebrow` fails the deploy rather than
publishing a card that points at nothing — `404.html` is the one named
exception: it has no `.eyebrow` element, so the render step substitutes
`mvdmio · 404` for it alone. The homepage is also handled on its own: its
card reads its own `og:title` instead of its hero's Product-led `<h1>`/
`.eyebrow`, so the card speaks for mvdmio rather than for one Product.

`assets/share-card.html` is the template, not a page: it carries no header,
footer or Share card of its own, and it is not in `sitemap.xml`. **Tech
stack**'s "don't add inline `<script>` blocks to pages" governs pages a
reader visits, so it does not reach this file — it carries an inline
`<script>` that reads its three values (`eyebrow`, `headline`, `product`)
from its own URL's query string rather than from server-rendered content,
which also means it opens on its own, with no deploy and no Puppeteer, when
you want to see what a card looks like: serve the repo root and visit
`/assets/share-card.html?eyebrow=...&headline=...&product=...`. See
[ADR-0001](docs/adr/0001-share-card-pictures-are-rendered-at-deploy-time.md)
for why the pictures are deploy-time output rather than committed files.

## How to verify a change

There is no test framework, and no build step for the pages themselves (the
one exception is the Pages deploy workflow's own steps — see **Legal
documents** and **Share cards** above — and note the legal PDFs, zip, Share
cards and sitemap `<lastmod>` dates are deploy-time output you won't have
locally). Verification
means serving the tree and looking at it:

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
