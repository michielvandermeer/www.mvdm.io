# Share cards for every page

Status: ready-for-agent

## Problem Statement

Pasting a link to mvdm.io into LinkedIn produces a bare result. The reporter
pasted `https://mvdm.io/products/compliance/` and got the page title and a
scrap of text, with no picture at all.

The cause is that no page on the site carries Open Graph or Twitter Card
markup. Fetching the Compliance Landing page as LinkedIn's crawler sees it
returns a `<head>` with no `og:image`, `og:title`, `og:description`, `og:url`,
`og:type` and no `twitter:card`. With nothing to read, LinkedIn falls back to
the `<title>` and the `<meta name="description">`.

This is not specific to one page. All 35 pages on the site are missing the
markup, and no image in the repository is sized for a link preview. A link to
this site therefore looks worse in a feed than a link to almost anything else,
which matters because the site's job is to sell the Products and those links
are what gets pasted into posts and proposals.

## Solution

Every page on the site gets a Share card: a block of markup in its `<head>`,
and a 1200 x 630 picture that the block points at.

The picture is different on every page. It carries that page's own headline in
white over a full-bleed colour field — the Product accent on a Landing page,
pine everywhere else — with the page's eyebrow above it and `mvdm.io` at the
foot. A reader scrolling a feed sees which Product or post the link is for
before they read anything.

Nobody draws 35 pictures. They are rendered during the Pages deploy by the
headless Chromium that already turns the Legal pages into PDFs. The renderer
reads each page's own headline, so a card can never advertise copy the page no
longer carries.

## User Stories

1. As someone who pastes a Compliance link into a LinkedIn post, I want a wide
   picture to appear, so that my post looks like it came from a real company.
2. As someone sharing any of the five Landing pages, I want each Product's card
   to be its own colour, so that a reader can tell the Products apart at a
   glance.
3. As someone sharing a blog post, I want the card to carry the post's title, so
   that a reader knows what they are being offered before they click.
4. As someone sharing a Resume entry, I want the card to name the client, so
   that a recruiter sees the relevant work immediately.
5. As someone sending a Legal page to a customer's procurement team, I want the
   card to name the document, so that the link looks deliberate rather than
   pasted by accident.
6. As someone sharing the homepage, I want a card that speaks for mvdmio rather
   than for one Product, so that the brand leads.
7. As a reader scrolling LinkedIn on a phone, I want the headline on the card to
   be legible at thumbnail size, so that I can read it without opening the link.
8. As a reader using a screen reader on LinkedIn or Mastodon, I want the card
   picture to carry alt text, so that the card is not silent.
9. As someone pasting a link into Slack, I want the same card to appear there,
   so that the site looks consistent wherever it is shared.
10. As someone whose link lands on a page that no longer exists, I want the 404
    page to still preview as an mvdmio page, so that the link does not look
    broken or hostile.
11. As the maintainer, I want the card to be generated from each page's own
    headline, so that editing a page's copy cannot leave a card advertising the
    old wording.
12. As the maintainer, I want a new page to get a card by adding its URL to
    `sitemap.xml`, so that I do not have to remember a separate list.
13. As the maintainer, I want the pictures to be build output rather than
    committed files, so that I never hand-commit something that can go stale.
14. As the maintainer, I want a card that fails to render to fail the deploy, so
    that a page never ships pointing at a missing picture.
15. As the maintainer, I want the card drawn with the site's own stylesheet, so
    that the card cannot drift from the Boardroom palette when the tokens change.
16. As the maintainer, I want no new kind of tool in the repository, so that the
    deploy stays one job with one dependency.
17. As the maintainer, I want the markup to reuse each page's existing title and
    description, so that there is no second set of copy to keep in step.
18. As the maintainer, I want a five-character headline and a seventy-six
    character headline to both look deliberate, so that no page needs a special
    case.
19. As the maintainer, I want the `AGENTS.md` page-adding steps to mention the
    Share card, so that the next page is not added without one.
20. As a future reader of this repository, I want an ADR explaining why pages
    point at pictures that are not committed, so that I do not assume it is a
    mistake and try to fix it.

## Implementation Decisions

### Scope

All 35 pages get Share card markup: the homepage, 5 Landing pages, 10 posts,
the blog index, the Resume index and 8 Resume entries, the Legal index and 5
Legal pages, About, Open source, and 404.

### The markup in each page's head

Each page gains a block carrying `og:title`, `og:description`, `og:url`,
`og:type`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`,
`og:site_name`, and `twitter:card`.

- Values reuse what the page already has. `og:title` is the page's `<title>`,
  `og:description` is its `<meta name="description">`, `og:url` is its
  canonical URL. No new copy is written for any page.
- `og:site_name` is `mvdmio` on every page.
- `og:type` is `article` on the ten posts and `website` on the other 25.
- `og:image` is an absolute `https://mvdm.io/...` URL. Relative paths are not
  read reliably by crawlers.
- `og:image:width` is `1200` and `og:image:height` is `630`.
- `og:image:alt` describes what the picture says, so a screen reader on LinkedIn
  or Mastodon is not silent. It is the page's eyebrow and headline joined into
  one sentence — for the Compliance Landing page, "mvdmio Compliance — One
  compliance system. Every framework." It is written into the head alongside
  the other values, not rendered.
- `twitter:card` is `summary_large_image`. There is no `twitter:site` or
  `twitter:creator`, because the site names no X account anywhere.
- The block sits directly after the canonical link. `404.html` is the only page
  without a canonical, so its block sits after the description instead, and it
  carries no `og:url` — the address it was served for is unknown when the page
  is written.

Every head on the site is already the same shape, so this is the same
copy-a-sibling-page edit that adding a title or a canonical already is.

### What a card looks like

The design was settled by prototype. The playable record is
`.agents/prototypes/share-card/`, which holds three variants and a LinkedIn
feed mock; the winning variant is **B, "Accent field"**, with the URL line
removed and the foot signed `mvdm.io`.

The card is 1200 x 630, PNG, and carries four things over a full-bleed colour
field:

- **The colour field.** The Product accent on the five Landing pages, read from
  the `data-product` attribute the page already sets on `<html>`. Pine on the
  other 30 pages.
- **The eyebrow**, top left: the page's own `.eyebrow` text, uppercase, in IBM
  Plex Mono at 72% white with wide letter-spacing. `404.html` has no eyebrow
  element, so its card uses `mvdmio · 404`.
- **The headline**, below it: the page's `<h1>`, in Source Serif 4 at weight
  600, white, on a size ramp keyed to plain-text length — roughly 96px under 20
  characters, 82px to 35, 70px to 50, 58px to 65, and 50px above that. An `<em>`
  in the headline keeps its italic and takes a translucent white underline,
  because the emerald the site uses for emphasis is invisible against an accent
  field.
- **The signature**, bottom left: `mvdm.io` in Source Serif 4. Read as the
  domain rather than the legal trade name. It is redundant on LinkedIn, which
  prints the host itself, and load-bearing on Slack, iMessage and in
  screenshots, where no host line appears.

An oversized `M` sits in the bottom-right corner at 7% white.

The card carries **no description and no URL**. Both are unreadable at the size
a feed renders a card, and `og:description` already places the description
beside the picture as selectable text.

### How the pictures are made

The Pages deploy workflow already runs one step that serves the checkout
locally, installs a pinned Puppeteer, and drives headless Chromium to render
the five Legal pages to PDF. That step grows a second half rather than becoming
a second step: same job, same local server, same pinned Chromium, no new
dependency.

The card half:

1. Reads the published URLs from `sitemap.xml`, and appends `404.html` as a
   fixed extra, since it is deliberately not in the sitemap.
2. For each URL, loads the page from the local server and reads three things
   from it: the `<h1>` inner markup, the `.eyebrow` text, and the
   `data-product` attribute on `<html>`.
3. Loads `assets/share-card.html` — a committed template that links
   `assets/css/site.css`, so a card is drawn with the site's own tokens and
   cannot drift from the palette — passing it those three values.
4. Screenshots the template at a 1200 x 630 viewport and writes the PNG.

`sitemap.xml` as the page list is deliberate: `AGENTS.md` already requires a new
page to be added to it, so a new page gets a card with no extra step to
remember.

The render runs before the artifact upload step, so the published site carries
the pictures. It runs under the step's existing `set -euo pipefail`, so a card
that cannot be drawn fails the deploy rather than publishing a page that points
at nothing.

### Where files live

- `assets/share-card.html` — the committed template. The one new file that is
  part of the site. It is a tool, not a page: it is not added to `sitemap.xml`,
  carries no Share card of its own, and carries none of the site's header,
  footer or navigation.
- `assets/share-cards/<path>.png` — the rendered pictures, in a tree mirroring
  the URL: `assets/share-cards/index.png` for the homepage,
  `assets/share-cards/products/compliance.png` for the Compliance Landing page,
  `assets/share-cards/404.png` for the 404 page.
- `.gitignore` gains `assets/share-cards/`. The pictures are build output and
  are never committed by hand — the rule `AGENTS.md` already states for the
  Legal PDFs and the pack. See
  [ADR-0001](../../docs/adr/0001-share-card-pictures-are-rendered-at-deploy-time.md).

### Documentation

- `CONTEXT.md` already carries the `Share card` entry, written during the
  grilling session that produced this Spec.
- `AGENTS.md` gains the Share card in its "How to add a page" steps, and a
  short section beside **Legal documents**, since both are now deploy-rendered
  output that must never be committed by hand.

## Testing Decisions

This repository has no test framework and no CI test suite, and `AGENTS.md`
states that verification means serving the tree and looking at it. That holds
here. A good check tests what a reader or a crawler actually gets — the bytes in
the `<head>`, the pixels in the PNG — not how the render script is structured.

**The one seam is the template.** `assets/share-card.html` is an ordinary page
served by the same static server as the rest of the site, so it opens in a
browser on its own. Every question about what a card looks like is answered
there, without running a deploy, without Puppeteer, and without GitHub Actions.
Build the template so the three values it needs arrive as URL query parameters,
and the whole design is checkable with one static server and an address bar.
Prefer this seam to any other; do not add a second one.

Checks to run before landing:

1. Serve the repository root and open the template directly with query
   parameters, at a 1200 x 630 viewport. Walk the range the site actually
   contains: the five-character headline ("Legal"), the 76-character headline
   (the "Developers are not socially awkward introverts" post), a headline
   carrying an `<em>` (Compliance), each of the five Product accents, and the
   404 page's substitute eyebrow. Confirm nothing overflows, clips, or collides
   with the signature.
2. Open `.agents/prototypes/share-card/` beside it and confirm the built
   template matches the agreed variant B.
3. Run the deploy render locally — serve the tree, then drive the same
   Puppeteer version the workflow pins — and confirm 35 PNGs appear, each
   1200 x 630, each in the right place in the mirror tree.
4. View each rendered PNG at roughly 550 pixels wide, the size LinkedIn shows a
   card, and confirm the headline is legible. The prototype's feed mock is the
   reference.
5. Fetch each page the way a crawler does and confirm what comes back: a title,
   description and URL matching that page's own, and a picture URL that
   resolves to a real 1200 x 630 file rather than a 404. A throwaway script is
   fine for this one-off check and should not be committed.
6. Confirm a crawler fetching `404.html` gets a card and a title but no page
   URL, since the address it was served for is unknowable.
7. Confirm a deliberately broken template fails the deploy step rather than
   passing with a missing picture.
8. Confirm no PNG has been committed: `git status` after a local render should
   show nothing under `assets/share-cards/`.

## Out of Scope

- **Changing any page's visible content.** No headline, description, title or
  canonical is reworded. The cards read what is already there.
- **JSON-LD or other structured data.** The site has none, and none is added.
- **`feed.xml`.** RSS readers do not read Open Graph markup, so the feed is
  untouched.
- **The four pictures in `assets/images/products/`.** They stay unused. None is
  the card shape, and there is none for Compliance.
- **The ten post photographs.** They keep their present job on the post pages
  and are not used on cards.
- **Per-page copy written for cards.** Rejected during grilling: 35 lines kept
  in step by hand is a list that drifts.
- **Screenshots of live pages as cards.** Rejected during grilling: the
  Boardroom palette is near-white, and a cropped page reads as a pale band with
  unreadable text at feed size.
- **An X account.** No `twitter:site` or `twitter:creator` until one exists.
- **Any change to how the Legal PDFs or the legal pack are built.** The card
  work sits beside them in the same step and leaves them alone.

## Further Notes

The prototype folder `.agents/prototypes/share-card/` answers the question "what
should a Share card look like?". It holds three structurally different variants
— Paper, Accent field, Split ledger — a picker carrying the real copy of nine
pages spanning the site's headline-length range, and a LinkedIn feed mock that
shows each card at the width the network actually renders it. Playing with it
settled three things: the feed-size view is the only one worth judging on, the
description earns no space on the picture, and the pale on-brand treatment that
looks best at full size disappears in a feed.

Two facts shaped the whole solution and are worth keeping in view. GitHub Pages
serves this repository exactly as committed, so nothing can be generated when a
crawler asks for a page. And the deploy already drives headless Chromium, so
rendering pictures at deploy time costs no new kind of tool.

The card is set in Source Serif 4 and IBM Plex Mono, both loaded from Google
Fonts. The render therefore needs network access at deploy time, exactly as the
Legal PDF render already does.
