# 03 — Share card markup on the Product pages and 404

Status: done
Blocked by: 02

## What to build

A crawler fetching the homepage, any of the five Landing pages, or `404.html`
gets a full Share card: a title, a description, a page URL and a picture URL
that resolves to a real 1200 x 630 PNG. Pasting one of those links into
LinkedIn, Slack or Mastodon shows the card for that page, in that Product's
colour.

Seven files: `index.html`, the five `products/*/index.html`, and `404.html`.
This step settles the exact shape of the block; step 04 copies it to the rest
of the site.

Each page gains ten tags, directly after its `<link rel="canonical">`:

```html
<meta property="og:title" content="Compliance — mvdmio">
<meta property="og:description" content="…the page's own meta description…">
<meta property="og:url" content="https://mvdm.io/products/compliance/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://mvdm.io/assets/share-cards/products/compliance.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="mvdmio Compliance — One compliance system. Every framework.">
<meta property="og:site_name" content="mvdmio">
<meta name="twitter:card" content="summary_large_image">
```

The rules behind those values:

- `og:title` is the page's own `<title>`, `og:description` its own
  `<meta name="description">`, `og:url` its own canonical. No new copy is
  written for any page, and no visible content changes.
- `og:site_name` is `mvdmio` everywhere. `og:type` is `website` on all seven
  pages in this step.
- `og:image` is always absolute (`https://mvdm.io/...`); relative paths are not
  read reliably by crawlers. The path mirrors the URL, matching what step 02
  renders: `/assets/share-cards/index.png` for the homepage,
  `/assets/share-cards/products/<slug>.png` for a Landing page,
  `/assets/share-cards/404.png` for 404.
- `og:image:alt` describes what the picture says, so a screen reader on
  LinkedIn or Mastodon is not silent. It is the page's eyebrow and headline
  joined into one sentence: the eyebrow with its `·` dropped, an em dash, then
  the headline as plain text (tags stripped, entities resolved).
- `twitter:card` is `summary_large_image`. No `twitter:site` and no
  `twitter:creator` — the site names no X account anywhere.

`404.html` is the exception: it has no canonical, so its block sits directly
after the `<meta name="description">`, and it carries **no `og:url`** — the
address it was served for is unknowable when the page is written. Its picture
is `https://mvdm.io/assets/share-cards/404.png` and its `og:image:alt` uses the
substitute eyebrow the card itself uses: `mvdmio 404 — This page doesn't
exist.`

## Footprint

Projects: none (static site; nothing compiles)

- `index.html` — `<head>`, after `<link rel="canonical">`
- `products/compliance/index.html` — same
- `products/translation-tools/index.html` — same
- `products/health-check/index.html` — same
- `products/statistics/index.html` — same
- `products/commonplace/index.html` — same
- `404.html` — `<head>`, after `<meta name="description">`; no `og:url`

## Acceptance criteria

- [x] All seven pages carry the ten tags (nine on `404.html`), in the position
      described, with the same tag order on every page.
- [x] Every `og:title`, `og:description` and `og:url` matches that page's own
      `<title>`, description and canonical exactly.
- [x] Every `og:image` is an absolute `https://mvdm.io/...` URL whose path
      matches the PNG step 02 renders for that page.
- [x] `404.html` carries no `og:url`.
- [x] Every `og:image:alt` reads as one sentence naming the page.
- [x] Fetching each of the seven pages the way a crawler does returns those
      values, and each picture URL resolves to a real 1200 x 630 file rather
      than a 404 (after a local render, or against the deployed site).
- [x] No page's visible content changed: no headline, description, title or
      canonical is reworded.

## Outcome

Added the ten-tag Share card block (nine on `404.html`) directly after
`<link rel="canonical">` on `index.html` and the five
`products/*/index.html` pages, and directly after
`<meta name="description">` on `404.html`, in the exact tag order the Step
specifies. Every `og:title`, `og:description` and `og:url` is copied verbatim
from that page's own `<title>`, `<meta name="description">` and canonical —
no new copy was written and no visible content changed (confirmed by `git
diff`: every file's diff is a pure addition, zero deletions). `og:image` is
absolute (`https://mvdm.io/assets/share-cards/...`) and mirrors the path step
02's renderer writes for that page (`index.png`,
`products/<slug>.png`, `404.png`); `og:image:width`/`height` are `1200`/`630`;
`og:site_name` is `mvdmio` and `og:type` is `website` on all seven.
`og:image:alt` is the page's own eyebrow with the `·` dropped, an em dash,
then the headline as plain text with `<em>` tags stripped (e.g. Compliance's
alt reads "mvdmio Compliance — One compliance system. Every framework.",
matching the Spec's own example verbatim). `404.html` carries no `og:url`
(its address is unknowable when the page is written) and its alt uses the
card's own substitute eyebrow: "mvdmio 404 — This page doesn't exist."

Verified by re-running (a scoped copy of) step 02's render script — serving
the repo root with `python3 -m http.server`, driving the same
`puppeteer-core@23.9.0` against the system's `/usr/bin/chromium` (the full
Puppeteer Chromium download remains network-blocked in this sandbox, as
steps 01 and 02 noted) — for exactly these seven pages: all seven PNGs were
produced, each verified 1200x630 with Pillow, each at the path this Step's
`og:image` values point to (`assets/share-cards/index.png`,
`assets/share-cards/products/<slug>.png`, `assets/share-cards/404.png`), and
each page's `data-product`/eyebrow/headline read back matched what its new
`og:image:alt` and `og:image` claim. The local HTTP server and the rendered
PNGs were removed after the check; nothing under `assets/share-cards/` is
committed.

Drift from the footprint's guess: none. Exactly the seven named files were
edited, each at the position the Step specifies; no other file changed.

One correction for step 04, which copies this shape to the rest of the site:
the homepage's `<meta name="description">` already carries a straight
apostrophe / plain ASCII punctuation in every page checked here, so
`og:description` values were copied byte-for-byte with only `&` and `"`
XML-escaped (no apostrophe escaping) to match the site's own existing meta
tags — for consistency, step 04 should do the same rather than HTML-entity
escaping apostrophes.
