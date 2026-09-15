# 04 — Share card markup on the remaining pages

Status: pending
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
