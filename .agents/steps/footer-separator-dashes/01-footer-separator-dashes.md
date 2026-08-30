# 01 — Move footer dashes outside the links

Status: done

## What to build

A visitor on any page of this site sees the same two-line footer as today, with a spaced dash still breaking one item from the next. Those dashes now sit between items, not inside links.

The dash is not underlined, not clickable, and not part of the spoken or focused link. Hovering a footer link darkens only that link's text. Clicking the email still opens a mail message; clicking a Legal page name still opens that Legal page. The wordmark and the builder credit stay text. The first item on each line still has no leading dash.

The wrap that makes this true: keep generating the dash on `.foot-sep::before` (en dash with a space on each side, in the footer text colour). Do not put `.foot-sep` on a link. When the item is a link, wrap the link so the dash sits outside it. When the item is already not a link, leave that item as it is. First items on a line stay without `.foot-sep`.

```html
<p class="foot-id">
  <span class="wordmark">mvdmio</span>
  <span class="foot-sep">Built by Michiel van der Meer</span>
  <span class="foot-sep"><a href="mailto:michiel@mvdm.io">michiel@mvdm.io</a></span>
</p>
<p class="foot-legal">
  <a href="/legal/terms/">Terms of Service</a>
  <span class="foot-sep"><a href="/legal/privacy/">Privacy Notice</a></span>
  <span class="foot-sep"><a href="/legal/dpa/">Data Processing Agreement</a></span>
  <span class="foot-sep"><a href="/legal/subprocessors/">Subprocessors</a></span>
  <span class="foot-sep"><a href="/legal/company/">Company details</a></span>
</p>
```

That block is the corrected footer this site already copies page to page. Labels, destinations, order, the two-line structure, wrapping, type, and design tokens stay as they are. A dash still sits between two items that share a line after wrapping. Print of a Legal page still hides the website footer. No animation, no dark mode, no generator, no shared include, no second stylesheet or script.

A later editor who copies the footer from a sibling page copies this wrap. Agent instructions say so, and say not to put `.foot-sep` on a link.

## Footprint

Projects: mvdm.io

- `index.html` — homepage `.site-footer`
- `404.html` — not-found `.site-footer`
- `about/index.html` — About `.site-footer`
- `blog/index.html` — blog index `.site-footer`
- `open-source/index.html` — Open source `.site-footer`
- `legal/index.html` — Legal index `.site-footer`
- `legal/terms/index.html` — Terms of Service `.site-footer`
- `legal/privacy/index.html` — Privacy Notice `.site-footer`
- `legal/dpa/index.html` — Data Processing Agreement `.site-footer`
- `legal/subprocessors/index.html` — Subprocessor list `.site-footer`
- `legal/company/index.html` — Company details `.site-footer`
- `products/compliance/index.html` — Compliance Landing page `.site-footer`
- `products/translation-tools/index.html` — Translation Tools Landing page `.site-footer`
- `products/health-check/index.html` — Health Check Landing page `.site-footer`
- `products/statistics/index.html` — Statistics Landing page `.site-footer`
- `products/commonplace/index.html` — Commonplace Landing page `.site-footer`
- `posts/agile-bill-of-rights/index.html` — post `.site-footer`
- `posts/developers-are-not-socially-awkward-introverts/index.html` — post `.site-footer`
- `posts/effective-dotnet-web-development/index.html` — post `.site-footer`
- `posts/improving-on-the-yearly-disappointment/index.html` — post `.site-footer`
- `posts/list-of-fully-remote-businesses/index.html` — post `.site-footer`
- `posts/the-unwritten-rules-of-remote-communication/index.html` — post `.site-footer`
- `posts/the-water-cooler-is-a-silly-place/index.html` — post `.site-footer`
- `posts/what-it-takes-to-lead-software-development-teams/index.html` — post `.site-footer`
- `posts/you-can-only-make-a-first-impression-as-often-as-you-want/index.html` — post `.site-footer`
- `posts/you-cant-do-agile-without-a-customer/index.html` — post `.site-footer`
- `projects/index.html` — Resume index `.site-footer`
- `projects/24green-climate-computer/index.html` — Resume entry `.site-footer`
- `projects/ect-electronic-order-handling-system/index.html` — Resume entry `.site-footer`
- `projects/jewel-software/index.html` — Resume entry `.site-footer`
- `projects/psa-quaycrane-ocr/index.html` — Resume entry `.site-footer`
- `projects/psa-yardcrane-automation/index.html` — Resume entry `.site-footer`
- `projects/psa-yardcrane-remote-control/index.html` — Resume entry `.site-footer`
- `projects/ridder-hortos/index.html` — Resume entry `.site-footer`
- `projects/vdmeer-software-websites-platform/index.html` — Resume entry `.site-footer`
- `assets/css/site.css` — `.foot-sep`, `.foot-id`, `.foot-legal`, `.site-footer`, print hide of `.site-footer`
- `AGENTS.md` — reusable `.foot-sep` note; How to add a page footer copy

## Acceptance criteria

- [x] On each footer line, a spaced dash sits between items. The first item on the line has no leading dash.
- [x] The dash is not underlined. Footer link text still is.
- [x] Clicking a dash does not open a page or a mail message. Clicking the email still opens a mail message. Clicking a Legal page name still opens that Legal page.
- [x] Hovering a footer link darkens the label and not the dash beside it.
- [x] The wordmark and “Built by Michiel van der Meer” are not links. Only the email on the identity line is clickable. The Legal line still has five links, with Terms of Service first and unprefixed.
- [x] The same corrected footer appears on the homepage, one Landing page, one post, About, Open source, Resume, one Legal page, and the not-found page — and on every other page that already copies that footer.
- [x] At about 375px, each footer line still wraps on its own, and a dash still sits between two items that share a line.
- [x] Tab order reaches each footer link. The focus ring sits on the link, not on the dash. The ring stays visible.
- [x] A screen reader names the email and each Legal page by the label only, without the dash as part of the link.
- [x] Print preview of a Legal page still omits the website footer.
- [x] No animation was added. No dark mode was added. Copy, destinations, order, type, and tokens are unchanged.
- [x] Agent instructions tell a later editor to copy this footer and not to put `.foot-sep` on a link.

## Outcome

Every page that already copies the two-line footer now wraps each dashed item so `.foot-sep` is never on a link. The identity line is still wordmark, then `span.foot-sep` for the builder credit, then `span.foot-sep` around the mailto. The Legal line still starts with an unprefixed Terms of Service link; later Legal pages sit inside `span.foot-sep`. `AGENTS.md` tells a later editor to copy this wrap and not to put `.foot-sep` on a link.

`assets/css/site.css` was listed in the footprint but was not changed. `.foot-sep::before` already emits the spaced en dash in footer text colour, `.foot-id` / `.foot-legal` already wrap each line on its own, and print already hides `.site-footer`. Moving the class off the `<a>` was enough for underline, hover, click, tab, and spoken name.

Verified from a static server at the repository root on the homepage, Compliance Landing page, one post, About, Open source, Resume, Terms of Service, and the not-found page, plus markup on the other 27 pages that copy the same footer. Dashes are not underlined; labels are. Clicking a dash does not navigate; clicking a Legal page name opens that page. Hover darkens the label only. At about 375px each footer line wraps on its own, and a dash still sits between items that share a line. Tab reaches the six footer links with a visible ring on the link, not the dash. Print media on Terms of Service still sets `.site-footer` to `display: none`.
