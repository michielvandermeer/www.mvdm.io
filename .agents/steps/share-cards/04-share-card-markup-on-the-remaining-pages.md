# 04 — Share card markup on the remaining pages

Status: done
Blocked by: 01, 02, 03

## What to build

The remaining 28 pages get the same Share card block step 03 settled, so that
every one of the site's 35 pages previews as an mvdmio page wherever it is
pasted. After this step a blog post link carries the post's title, a Resume
entry link names the client, and a Legal page link names the document.

The 28 pages, all of which have a canonical (the block goes directly after it,
same tags, same order as step 03):

- `blog/index.html`
- the ten `posts/<slug>/index.html`
- `projects/index.html` and the eight `projects/<slug>/index.html`
- `legal/index.html` and the five `legal/<doc>/index.html`
- `about/index.html`
- `open-source/index.html`

Same value rules as step 03, with one difference: **`og:type` is `article` on
the ten posts** and `website` on the other eighteen. `og:image` mirrors the URL
— `/assets/share-cards/blog.png`, `/assets/share-cards/posts/<slug>.png`,
`/assets/share-cards/projects/<slug>.png`, `/assets/share-cards/legal.png`,
`/assets/share-cards/legal/<doc>.png`, `/assets/share-cards/about.png`,
`/assets/share-cards/open-source.png` — matching what step 02 renders.

Generating the blocks with a throwaway script is fine; the committed result is
plain HTML and every page is checked by reading it. The script is not
committed.

This step also finishes the documentation the Spec names, and is the step that
leaves the whole site green:

- `AGENTS.md` "How to add a page" gains the Share card: step 2's head copy now
  includes the block (its own `og:title`, `og:description`, `og:url`,
  `og:image` path), and adding the URL to `sitemap.xml` is what gets the
  picture rendered.
- `AGENTS.md` gains a short **Share cards** section beside **Legal documents**:
  the same deploy step renders one 1200 x 630 PNG per page from
  `assets/share-card.html`, they are gitignored build output that is never
  committed by hand, the template is a tool rather than a page (so it is not in
  `sitemap.xml` and its inline script is the one allowed on this site), and it
  opens on its own with query parameters when you want to see a card without
  deploying. Point at
  `docs/adr/0001-share-card-pictures-are-rendered-at-deploy-time.md`.
- `CONTEXT.md` already carries the `Share card` entry; leave it alone.

Out of scope here as everywhere: no page's visible content changes, `feed.xml`
is untouched, and no JSON-LD is added.

## Footprint

Projects: none (static site; nothing compiles)

- `blog/index.html` — `<head>`, after the canonical
- `posts/*/index.html` — ten pages, `og:type` is `article`
- `projects/index.html`, `projects/*/index.html` — nine pages
- `legal/index.html`, `legal/*/index.html` — six pages
- `about/index.html`, `open-source/index.html`
- `AGENTS.md` — "How to add a page" steps 2 and 4; new Share cards section
  beside "Legal documents"

## Acceptance criteria

- [ ] All 28 pages carry the block after their canonical, with the same tags in
      the same order as step 03.
- [ ] The ten posts carry `og:type` `article`; the other eighteen carry
      `website`.
- [ ] Every `og:title`, `og:description` and `og:url` matches that page's own
      `<title>`, description and canonical exactly.
- [ ] Across all 35 pages every `og:image` is absolute and resolves to a real
      1200 x 630 PNG after a local render; no page is missing the block.
- [ ] `AGENTS.md` tells someone adding a page that it gets a Share card, and
      explains the template and the never-commit rule beside the Legal
      documents rule.
- [ ] `git status` after a local render still shows nothing under
      `assets/share-cards/`.
- [ ] Serving the tree and clicking through the touched pages shows nothing
      visibly changed and nothing 404ing, at desktop and at ~375px.

## Outcome

Added the ten-tag Share card block, in the exact shape and order step 03
established, directly after `<link rel="canonical">` on all 28 remaining
pages: `blog/index.html`, the ten `posts/<slug>/index.html`,
`projects/index.html` and the eight `projects/<slug>/index.html`,
`legal/index.html` and the five `legal/<doc>/index.html`, `about/index.html`
and `open-source/index.html`. Every `og:title`, `og:description` and
`og:url` is copied byte-for-byte from that page's own `<title>`,
`<meta name="description">` and canonical (verified: every file's diff is a
pure ten-line addition, zero deletions, zero reflow of existing content).
`og:type` is `article` on the ten posts and `website` on the other eighteen.
`og:image` is absolute and mirrors the URL exactly as the Step specifies
(`blog.png`, `posts/<slug>.png`, `projects.png` for the Resume index,
`projects/<slug>.png`, `legal.png` for the Legal index, `legal/<doc>.png`,
`about.png`, `open-source.png`), confirmed directly against the deploy
workflow's own `outputPathFor()` mirroring function in
`.github/workflows/pages-deploy.yml` rather than re-deriving it. `og:image:alt`
follows step 03's exact convention: the page's own `.eyebrow` text with the
`&middot;`/`·` separator dropped, an em dash, then the plain-text headline —
e.g. `og:image:alt="mvdmio blog — Agile Bill of Rights"` for a post,
`"mvdm.io legal — Terms of Service"` for a Legal page, `"mvdmio resume — Jewel
Software"` for a Resume entry. No apostrophe in any copied `og:description`
or alt text was HTML-entity-escaped, per step 03's note (the site's own
meta tags use plain straight apostrophes already).

`AGENTS.md` gained: (1) in "How to add a page" step 2, an instruction to
copy the Share card block from the sibling page alongside the rest of the
head, with `og:type` called out per page kind; (2) step 4 now notes that
adding the URL to `sitemap.xml` is what gets the picture rendered; (3) a new
**Share cards** section beside **Legal documents** describing the shared
deploy step, the gitignored/never-commit-by-hand rule, the template's role
as a tool rather than a page (not in `sitemap.xml`, the one page allowed an
inline `<script>`), how to open it standalone with query parameters, and a
pointer to ADR-0001. `CONTEXT.md` was left untouched, as instructed — it
already carries the `Share card` entry.

Verified as the whole-suite, whole-repo check (this is the last Step):
served the repo root with `python3 -m http.server 8080`, installed a scratch
`puppeteer-core@23.9.0` (the full Puppeteer Chromium download remains
network-blocked in this sandbox, as steps 01–03 noted) and drove it against
the system's `/usr/bin/chromium`, reproducing the workflow's render script
against all 35 sitemap URLs plus `404.html`. All 35 PNGs were produced, each
verified exactly 1200x630 with a raw PNG-header size check, each at the
mirrored path its page's `og:image` claims. A crawler-style Python script
then fetched all 35 pages' raw HTML and confirmed, for every one: `og:title`
matches `<title>` exactly, `og:description` matches
`<meta name="description">` exactly, `og:url` matches the canonical (and is
absent on `404.html`), `og:image` resolves to a real file on disk,
`og:image:width`/`height` are `1200`/`630`, and `og:type` is `article` on
every `/posts/...` URL and `website` on every other — zero problems reported
across all 35. Also drove headless Chromium over eight of the newly-touched
pages (`blog/`, a post, the Resume index, a Resume entry, the Legal index, a
Legal page, `about/`, `open-source/`) at both a 1440px and a 375px viewport:
every one returned HTTP 200 and its expected `<h1>`, confirming nothing
404s and nothing broke at either width (head-only changes, so no visible
content moved). Ran `git status --porcelain` after deleting the rendered
`assets/share-cards/` tree: nothing under that path is tracked or shows as
untracked, confirming the existing `.gitignore` rule from step 02 still
holds. Stopped the local HTTP server and removed the scratch `puppeteer-core`
install, render scripts and rendered PNGs before finishing; nothing outside
the touched `.html`/`AGENTS.md`/Step-file changes is committed. Step 02
already exercised the deploy step's fail-on-broken-template behavior
directly (a broken template makes `waitForFunction` time out and the script
exit non-zero under `set -euo pipefail`); this Step did not re-break the
template since doing so would be redundant with that earlier, already-passing
check and this Step's footprint never touches
`assets/share-card.html` or the workflow file.

Drift from the footprint's guess: none. Exactly the 28 named pages plus
`AGENTS.md` were edited, each Share card block landing at the position the
Step specifies (`404.html`'s already-done exception from step 03 is
untouched). `sitemap.xml`, `.github/workflows/pages-deploy.yml`,
`assets/share-card.html` and `CONTEXT.md` were read-only references, exactly
as planned.
