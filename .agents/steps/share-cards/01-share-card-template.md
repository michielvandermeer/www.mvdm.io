# 01 — Share card template

Status: done
Blocked by: none

## What to build

`assets/share-card.html` — the one committed file that draws a Share card. It is
a tool, not a page: no site header, no footer, no navigation, no Share card of
its own, and it is never added to `sitemap.xml` or `feed.xml`.

Open it in a browser with three query parameters and it draws one card at
1200 x 630, exactly as the deploy will screenshot it:

    /assets/share-card.html?eyebrow=mvdmio%20%C2%B7%20Compliance
      &headline=One%20compliance%20system.%20%3Cem%3EEvery%3C%2Fem%3E%20framework.
      &product=compliance

- `eyebrow` — plain text. Missing or empty falls back to `mvdmio · 404`.
- `headline` — the page's `<h1>` **inner markup**, so an `<em>` survives. It is
  written into the card as markup, not as text. This is build input taken from
  the site's own pages, never reader input.
- `product` — one of the five Product slugs, or absent. The template puts the
  value on its own `<html data-product="…">`, so `--acc` resolves through the
  registry that already lives in `assets/css/site.css` (around line 65). Absent
  or unknown means pine (`--pine`).

The card is variant **B, "Accent field"** from `.agents/prototypes/share-card/`,
with the URL line removed and the foot signed `mvdm.io`:

- Full-bleed colour field: the Product accent, or pine.
- Eyebrow top left — IBM Plex Mono, uppercase, wide letter-spacing, 72% white.
- Headline below it — Source Serif 4 weight 600, white, line-height ~1.08. An
  `<em>` keeps its italic and takes a translucent white underline, because the
  emerald the site uses for emphasis is invisible against an accent field.
- Signature bottom left — `mvdm.io` in Source Serif 4, white.
- An oversized `M` in the bottom-right corner at 7% white.
- No description and no URL anywhere on the picture.

The headline size is a ramp on the **plain-text** length of the headline (tags
stripped) — the decision the prototype settled, copied from its `render()`:

```js
len <= 20 ? 96 : len <= 35 ? 82 : len <= 50 ? 70 : len <= 65 ? 58 : 50   // px
```

The template links `/assets/css/site.css` so the card reads the site's own
tokens and cannot drift from the Boardroom palette, and loads the same Google
Fonts `<link>` every page uses. It carries its own card styles beside that —
the site's `.eyebrow` and `h1` rules are page rules, not card rules, so the
card's own styling has to win.

The template needs a small inline `<script>` to read the query string. That is
the one place on this site where an inline script is allowed, because the
template is not a page; say so in a comment so a later reader does not "fix" it.
A card must never be screenshotted in fallback fonts, so the template signals
when it is ready to shoot — wait on `document.fonts.ready`, then expose the
result (for example a `data-ready` attribute on `<html>`) for step 02 to poll.

## Footprint

Projects: none (static site; nothing compiles)

- `assets/share-card.html` — new file: the card markup, the card styles, the
  query-parameter script
- `assets/css/site.css` — read only: `--pine`, the `--acc-*` tokens and the
  `html[data-product="…"]` registry, `.eyebrow`, `h1`
- `.agents/prototypes/share-card/index.html` — read only: the variant B styles
  (`.v-b`, `.v-b .eyebrow`, `.v-b h1`, `.v-b h1 em`, `.v-b .foot`) and `ramp()`

## Acceptance criteria

- [x] Serving the repo root with `python3 -m http.server` and opening
      `/assets/share-card.html?...` at a 1200 x 630 viewport draws one card and
      nothing else.
- [x] The five-character headline ("Legal") and the 76-character headline (the
      "Developers are not socially awkward introverts" post) both look
      deliberate: nothing overflows, clips, or collides with the signature.
- [x] A headline carrying an `<em>` (Compliance) renders the emphasis as white
      italic with a translucent underline, not as emerald.
- [x] Each of the five `product` values draws its own accent; no value and an
      unknown value both draw pine.
- [x] No `eyebrow` parameter draws `mvdmio · 404`.
- [x] Side by side with `.agents/prototypes/share-card/?variant=B`, the built
      template matches the agreed variant — minus the URL line, signed
      `mvdm.io`.
- [x] The template references `/assets/css/site.css` rather than repeating any
      colour value, and sets no `--acc` of its own.
- [x] The template is absent from `sitemap.xml` and carries no site header,
      footer or nav.

## Outcome

Built `assets/share-card.html` exactly to spec: a standalone tool page (no
header/footer/nav, not in `sitemap.xml`) that reads `eyebrow`, `headline` and
`product` from the query string, draws variant B "Accent field" at
1200x630 (full-bleed `--acc`/`--pine` field, mono uppercase eyebrow at 72%
white, Source Serif 4 h1 in white with the length-keyed size ramp on the
plain-text length, `<em>` as white italic with a translucent underline, a
`mvdm.io` signature bottom-left, and a 7%-white oversized `M` bottom-right),
links `/assets/css/site.css` and the same Google Fonts `<link>` every page
uses, sets no `--acc` of its own, falls back to `mvdmio · 404` when `eyebrow`
is absent, and sets `data-product` on `<html>` so the existing `site.css`
registry resolves `--acc` (absent/unknown product falls through to `--pine`
via the layout's `var(--acc, var(--pine))`). It waits on `document.fonts.ready`
and then sets `data-ready="true"` on `<html>` for step 02's screenshotter to
poll.

Verified by serving the repo root with `python3 -m http.server` and driving
headless Chromium (system `/usr/bin/chromium` via `puppeteer-core`, since a
full Puppeteer-bundled Chromium download was blocked in this sandbox) at a
1200x630 viewport across the required range: the 5-char headline ("Legal"),
the 76-char post headline, the Compliance `<em>` headline, all five product
accents, and the no-eyebrow/404 case. All eight screenshots matched variant B
with nothing overflowing, clipping, or colliding with the signature; each
product accent matched its `site.css` token. No PNG or test tooling was
committed; the local static server and scratch npm install used for the
check were torn down before finishing.

Drift from the footprint's guess: none — `assets/share-card.html` is the only
file changed, matching the Footprint's "new file" line; `site.css` and the
prototype were read-only references as planned.
