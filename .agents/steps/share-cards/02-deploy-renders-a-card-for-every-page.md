# 02 — Deploy renders a card for every page

Status: pending
Blocked by: 01

## What to build

The Pages deploy produces one 1200 x 630 PNG per page, so that every page on
the published site has a picture to point at. Nothing is committed: the
pictures exist only in the deployed artifact.

The existing step in `.github/workflows/pages-deploy.yml` — "Render legal PDFs
and build the legal pack" — grows a second half rather than becoming a second
step. Same job, same local `python3 -m http.server` on port 8080, same pinned
`puppeteer@23.9.0`, same `set -euo pipefail`, same `NODE_PATH` node heredoc
shape. No new tool and no new dependency. Rename the step so its name covers
both halves. The legal PDF half and the zip are left exactly as they are.

The card half, for each page:

1. Read the published URLs out of `sitemap.xml` (34 of them), and append
   `404.html` as a fixed extra — it is deliberately not in the sitemap. Parsing
   `<loc>` out of the file is enough; do not add an XML library.
2. Load the page from `http://localhost:8080` and read three things from it:
   the `<h1>` inner markup, the first `.eyebrow` element's text, and the
   `data-product` attribute on `<html>`. Every page has exactly one `h1`; every
   page except `404.html` has exactly one `.eyebrow`; only the five Landing
   pages carry `data-product`.
3. Load `assets/share-card.html` from the same local server with those three
   values as query parameters, at a 1200 x 630 viewport, wait for the
   template's ready signal (fonts loaded), and screenshot it.
4. Write the PNG into a tree mirroring the URL:

       https://mvdm.io/                      -> assets/share-cards/index.png
       https://mvdm.io/products/compliance/  -> assets/share-cards/products/compliance.png
       https://mvdm.io/legal/                -> assets/share-cards/legal.png
       404.html                              -> assets/share-cards/404.png

   Directories are created as needed.

The render runs before the "Upload artifact" step, so the published site
carries the pictures. Under `set -euo pipefail` a card that cannot be drawn —
a page with no `h1`, a template that throws, a font fetch that fails — fails
the deploy rather than publishing a page pointing at nothing.

`.gitignore` gains `assets/share-cards/`, beside the rules that already keep the
Legal PDFs and the pack out of git.

Using `sitemap.xml` as the page list is the point: `AGENTS.md` already requires
a new page to be added to it, so a new page gets a card with nothing extra to
remember.

## Footprint

Projects: none (static site; nothing compiles)

- `.github/workflows/pages-deploy.yml` — the "Render legal PDFs and build the
  legal pack" step: its name, the node heredoc, the ordering against
  "Upload artifact"
- `.gitignore` — new `assets/share-cards/` rule
- `sitemap.xml` — read only: the 34 `<loc>` values
- `assets/share-card.html` — read only: the query parameters and ready signal
  agreed in step 01
- `404.html`, `index.html`, `products/*/index.html` — read only: the `h1`,
  `.eyebrow` and `data-product` shapes the reader has to cope with

## Acceptance criteria

- [ ] Running the same commands locally (serve the tree, install the pinned
      Puppeteer, run the script) writes 35 PNGs under `assets/share-cards/`.
- [ ] Every PNG is exactly 1200 x 630 and sits at the mirrored path for its URL,
      including `assets/share-cards/index.png` and `assets/share-cards/404.png`.
- [ ] Each Landing page's PNG carries its own Product accent; the other 30
      carry pine.
- [ ] Viewed at roughly 550 pixels wide — the width LinkedIn renders a card —
      every headline is legible; the prototype's feed mock is the reference.
- [ ] No card is drawn in fallback fonts.
- [ ] Breaking the template deliberately fails the step with a non-zero exit
      rather than leaving a page pointing at a missing picture.
- [ ] `git status` after a local render shows nothing under
      `assets/share-cards/`.
- [ ] The Legal PDFs and `legal/mvdmio-legal-pack.zip` are still produced
      exactly as before, and the render still runs before "Upload artifact".
