# 03 — Share card markup on the Product pages and 404

Status: pending
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

- [ ] All seven pages carry the ten tags (nine on `404.html`), in the position
      described, with the same tag order on every page.
- [ ] Every `og:title`, `og:description` and `og:url` matches that page's own
      `<title>`, description and canonical exactly.
- [ ] Every `og:image` is an absolute `https://mvdm.io/...` URL whose path
      matches the PNG step 02 renders for that page.
- [ ] `404.html` carries no `og:url`.
- [ ] Every `og:image:alt` reads as one sentence naming the page.
- [ ] Fetching each of the seven pages the way a crawler does returns those
      values, and each picture URL resolves to a real 1200 x 630 file rather
      than a 404 (after a local render, or against the deployed site).
- [ ] No page's visible content changed: no headline, description, title or
      canonical is reworded.
