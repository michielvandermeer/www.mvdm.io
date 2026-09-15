# 02 — Deploy renders a card for every page

Status: done
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

## Outcome

Grew the existing "Render legal PDFs and build the legal pack" step in
`.github/workflows/pages-deploy.yml` into "Render legal PDFs, build the legal
pack, and render share cards" — same job, same local `python3 -m http.server`
on port 8080, same `$TOOLDIR` with `puppeteer@23.9.0` pinned via
`npm install --prefix "$TOOLDIR"`, same `NODE_PATH="$TOOLDIR/node_modules"
node <<'NODE'` heredoc shape, same `set -euo pipefail`. The card half is a
second heredoc appended right after the `zip -j legal/mvdmio-legal-pack.zip`
line and before "Upload artifact": it parses `<loc>` out of `sitemap.xml` with
a regex (no XML library), appends `404.html` as a fixed extra, loads each page
from `http://localhost:8080`, reads `document.querySelector('h1').innerHTML`,
the first `.eyebrow` element's `textContent`, and `data-product` off
`<html>`, throws (failing the step) if a page has no `h1`, builds the query
string for `assets/share-card.html` from those three values, sets a
1200x630 viewport, navigates to the template, polls
`document.documentElement.getAttribute('data-ready') === 'true'` via
`page.waitForFunction` (15s timeout) so no card is ever shot in a fallback
font, and screenshots to a path mirroring the URL (`/` → `index.png`,
`/products/compliance/` → `products/compliance.png`, `404.html` →
`404.png`), creating directories as needed. The legal PDF/zip half and its
ordering against "Upload artifact" are untouched. `.gitignore` gained
`assets/share-cards/` beside the existing legal-pack rules.

Verified locally from this worktree: served the repo root with
`python3 -m http.server 8080`, installed `puppeteer-core@23.9.0` in a scratch
directory (the full Puppeteer Chromium download is network-blocked in this
sandbox, same constraint step 01 hit), and ran a copy of the workflow's node
script pointed at the system's `/usr/bin/chromium` via `executablePath`. It
wrote all 35 PNGs, every one exactly 1200x630 (confirmed with Pillow) and at
the mirrored path, including `assets/share-cards/index.png` and
`assets/share-cards/404.png`. Read back and visually inspected several —
each of the five Landing pages carries its own Product accent (checked
Compliance's emerald-green field, matching `--acc-compliance`), the other
pages carry `--pine`, the 76-character post headline and the five-character
"Legal" headline both size correctly and clear the signature, the Compliance
`<em>` renders as a white italic with the translucent underline, and
`404.html` (no `.eyebrow` element on that page) draws the `mvdmio · 404`
fallback with its own `h1` text as the headline. Confirmed the pinned
`set -euo pipefail` behavior: edited `assets/share-card.html` to look up a
nonexistent element id so the inline script throws before signaling
`data-ready`, reran the same render script, and it exited non-zero
(`TimeoutError: Waiting failed: 15000ms exceeded` from `waitForFunction`) —
a broken template fails the step rather than publishing a page pointing at a
missing picture. Reverted the template to its committed state immediately
after. `git status --porcelain` after the render showed nothing under
`assets/share-cards/`, confirming the new `.gitignore` rule. Deleted the
rendered PNGs, killed the local HTTP server, and removed the scratch
`puppeteer-core` install before finishing; no PNG, node_modules, or test
tooling is committed.

Drift from the footprint's guess: none. Only
`.github/workflows/pages-deploy.yml` and `.gitignore` were changed, matching
the Footprint exactly; `sitemap.xml`, `assets/share-card.html`, `404.html`,
`index.html` and the product `index.html` pages were read-only references as
planned. One clarification worth flagging for later steps: the homepage
(`index.html`) currently carries no `data-product` and its `<h1>`/`.eyebrow`
happen to read as Compliance-flavored marketing copy (mirroring
`products/compliance/index.html`) — its card therefore renders in pine with
Compliance's own headline/eyebrow text, which is exactly what the existing
page markup says today. This is pre-existing page content, out of this
Step's footprint, and not something the render script should special-case;
flagging it only in case a later Step (Spec markup work) expected the
homepage to read as brand-neutral copy.
