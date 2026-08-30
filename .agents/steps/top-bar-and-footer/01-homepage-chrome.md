# 01 — Two-row header and two-line footer on the homepage

Status: done

## What to build

A visitor opening the homepage sees the new site chrome. The skip link is still the first control. The site header then has two rows, and the site footer has two lines. Other pages keep the eight-link bar and the wrapping footer they have today.

Header, in this order in the document (that is also the tab order after the skip link):

1. An upper row of links: Open source, Blog, About, Resume. Resume opens `/projects/`. The other three keep their current addresses. This row is a list of links, not a second navigation landmark.
2. The wordmark, still a link to the homepage.
3. The existing menu button, still named "Toggle menu" and still connected to the Product list the same way (`aria-controls` on the Product list, `data-open` on the existing site header).
4. The existing navigation landmark, now holding only Compliance, Translation Tools, Health Check, Statistics, Commonplace, then Get started. Get started still opens the Compliance application. Product links still use each Product’s name and still open that Product’s Landing page.

The upper row sits inside the existing site header, above the wordmark row, so print rules that already hide `.site-nav` still hide both rows. On a wide screen the upper row is quieter than the Product links: the site’s mono small-caps voice, existing tokens, no Product accent, no dark mode. It sits toward the end of the row (the playable record’s utility row). A hairline separates the two header rows. The Product names and Get started sit on one lower row and do not wrap into the upper row.

On a phone (the existing 900px breakpoint) the upper row stays visible and may wrap on its own. The wordmark stays visible. The menu button hides and shows only the Product navigation and Get started. Opening the menu still puts Get started at the end of that list. Do not add a dropdown, a “More” menu, or a Products index.

Footer, two stacked lines, each wrapping on its own:

1. The wordmark as text (not a link), “Built by Michiel van der Meer”, then a mailto link for michiel@mvdm.io. The country is not here.
2. Terms of Service, Privacy Notice, Data Processing Agreement, Subprocessors, Company details — those labels, that order, those existing Legal page addresses. The legal index is not in the footer. About, Resume, Blog, and Open source are not in the footer.

A spaced dash separates items on each line (the playable record’s `mvdmio – Built by… – email` reading). The footer does not grow a second home link.

Keep visible focus rings. Do not add animation or transition on this chrome; the existing reduced-motion guard stays. Do not change the homepage body, prices, or any other page. Do not ship anything from `.agents/prototypes/top-bar-reachability/`. Do not add a generator or a shared include.

The shared stylesheet carries the new layout as additional rules so pages still on the current markup keep their current look. The shared script stays the phone menu toggle. Change it only if the new homepage markup would otherwise break the toggle, and keep the toggle working on pages that still have the old header. Existing ids and classes the script and print CSS already use (`#site-nav`, `.site-nav`, `.nav-toggle`, `#nav-links`, `.nav-links`, `.site-footer`) stay the contract for those two files.

## Footprint

Projects: mvdm.io marketing site

- `index.html` — skip link, `.site-nav` / `#site-nav`, `.nav-toggle`, `#nav-links`, `.nav-cta` Get started, `.site-footer` / `.foot-inner`
- `assets/css/site.css` — `.skip-link`, `:focus-visible`, `prefers-reduced-motion`, `.site-nav`, `.site-nav-inner`, `.wordmark`, `.nav-links`, `.nav-cta`, `.nav-toggle`, `@media (max-width: 900px)` nav rules, `.site-footer`, `.foot-inner`, `@media print` hide list
- `assets/js/site.js` — `#site-nav` menu toggle (`data-open`, `aria-expanded`) only if the new homepage markup requires it

## Acceptance criteria

- [x] On a wide view of `/`, the header shows an upper row of Open source, Blog, About, and Resume, and a lower row of the five Product names and Get started.
- [x] Each of those links opens the matching page or, for Get started, `https://compliance.mvdm.io`. None 404.
- [x] The header wordmark opens `/`. The skip link is still the first control and still points at `#main`.
- [x] Tab order on the homepage is skip link, then the upper row, then the wordmark, then the Product links and Get started. Every interactive control in the header and footer shows a focus ring.
- [x] At about 375px, the upper row is still visible, the wordmark is still visible, and the Product names and Get started are behind the menu button. Opening the button shows them, with Get started last.
- [x] The homepage footer has two lines. Line 1 is the wordmark, “Built by Michiel van der Meer”, and the email. Line 2 is the five Legal labels. The wordmark does not navigate. The email opens a mail message. The footer does not contain About, Resume, Blog, Open source, the country, or the legal index.
- [x] A reduced-motion preference does not leave a new animation running in the header or footer.
- [x] A Landing page, a Legal page, and 404 still show the current eight-link bar and wrapping footer.
- [x] Print preview of the homepage still omits the header and the footer.
- [x] Nothing from the prototype folder is linked or copied into the site.

## Outcome

Homepage only. `index.html` now has the two-row header and two-line footer; other pages still use the eight-link bar and wrapping footer.

Header: `.site-util` / `.site-util-inner` is a list of links (not a second `nav`) as the first child of `#site-nav`, then the existing `.site-nav-inner` with wordmark, `.nav-toggle` (`aria-controls="nav-links"`, `aria-label="Toggle menu"`), and `#nav-links` holding the five Product names plus Get started → `https://compliance.mvdm.io`. Upper-row order: Open source, Blog, About, Resume (`/projects/`).

Footer: `.foot-inner.foot-stack` with `.foot-id` (wordmark as `<span>`, “Built by Michiel van der Meer”, mailto) and `.foot-legal` (Terms of Service, Privacy Notice, Data Processing Agreement, Subprocessors, Company details). Spaced dashes are `.foot-sep::before` with NBSP so flex does not collapse the spaces.

CSS in `assets/css/site.css` is additional rules keyed off those new classes, so old markup is unchanged. Existing `.site-nav` print hide still covers both header rows. `assets/js/site.js` was not changed; the toggle still keys off `#site-nav` / `.nav-toggle` / `data-open` on old and new headers.

Footprint drift: JS untouched. New classes for step 02 to copy: `.site-util`, `.site-util-inner`, `.foot-stack`, `.foot-id`, `.foot-legal`, `.foot-sep`. No deviations.
