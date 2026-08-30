# 02 — Same header and footer on every remaining page

Status: done

## What to build

Every remaining page uses the same header and the same footer the homepage now has. A visitor who moves from the homepage to a Landing page, a post, About, Open source, Resume, a Legal page, or the not-found page does not relearn the chrome.

Copy the homepage’s header markup and footer markup onto each page below. Do not invent a second nav. Do not change page bodies, prices, Legal wording, in-page CTAs, or existing addresses. Resume stays at `/projects/`. There is still no Products index and no dropdown.

Four Landing pages currently point the header Get started button at that Product’s own application (Translation Tools, Health Check, Statistics, Commonplace). Those headers join every other page: Get started opens Compliance. Hero and other in-page Get started buttons on those Landing pages stay pointed where they are.

After the copy, no page still has the eight-link bar, “the Netherlands” in the footer, or About, Resume, Blog, or Open source in the footer. Drop stylesheet rules that only served that old chrome, now that no page uses it. Keep the print hide list, the 900px menu, the skip link, visible focus rings, and no new animation.

Update the agent instructions that tell a later editor how to add a page so they copy this two-row header and two-line footer, not the old eight-link bar. Say that Get started in that header always opens the Compliance application, including on a new Landing page. If the stylesheet gained named header or footer classes, name them in the shared-stylesheet notes so a later page does not grow a page-level style block. The shared script stays the phone menu toggle.

Do not ship the prototype. Do not add a generator or a shared include.

## Footprint

Projects: mvdm.io marketing site

- `404.html`
- `about/index.html`
- `blog/index.html`
- `open-source/index.html`
- `legal/index.html`
- `legal/terms/index.html`
- `legal/privacy/index.html`
- `legal/dpa/index.html`
- `legal/subprocessors/index.html`
- `legal/company/index.html`
- `products/compliance/index.html`
- `products/translation-tools/index.html` — header `.nav-cta` currently `https://translations.mvdm.io`
- `products/health-check/index.html` — header `.nav-cta` currently `https://healthcheck.mvdm.io`
- `products/statistics/index.html` — header `.nav-cta` currently `https://statistics.mvdm.io`
- `products/commonplace/index.html` — header `.nav-cta` currently `https://commonplace.mvdm.io`
- `projects/index.html`
- `projects/24green-climate-computer/index.html`
- `projects/ect-electronic-order-handling-system/index.html`
- `projects/jewel-software/index.html`
- `projects/psa-quaycrane-ocr/index.html`
- `projects/psa-yardcrane-automation/index.html`
- `projects/psa-yardcrane-remote-control/index.html`
- `projects/ridder-hortos/index.html`
- `projects/vdmeer-software-websites-platform/index.html`
- `posts/agile-bill-of-rights/index.html`
- `posts/developers-are-not-socially-awkward-introverts/index.html`
- `posts/effective-dotnet-web-development/index.html`
- `posts/improving-on-the-yearly-disappointment/index.html`
- `posts/list-of-fully-remote-businesses/index.html`
- `posts/the-unwritten-rules-of-remote-communication/index.html`
- `posts/the-water-cooler-is-a-silly-place/index.html`
- `posts/what-it-takes-to-lead-software-development-teams/index.html`
- `posts/you-can-only-make-a-first-impression-as-often-as-you-want/index.html`
- `posts/you-cant-do-agile-without-a-customer/index.html`
- `index.html` — only if step 01’s homepage chrome drifted from what this step copies
- `assets/css/site.css` — old single-row `.site-nav-inner` / wrapping `.foot-inner` rules once unused; print hide list stays
- `assets/js/site.js` — only if a migrated page would otherwise break the toggle
- `AGENTS.md` — “How to add a page” step 3 (skip link, nav, footer); shared-stylesheet notes if new header/footer classes landed

## Acceptance criteria

- [x] The same header and footer appear on the homepage, one Landing page, one post, About, Open source, Resume, one Legal page, and the not-found page.
- [x] Every page in the footprint uses that header and footer. None still lists Open source, Blog, or About inside the Product navigation, or About, Resume, Blog, or Open source in the footer.
- [x] Header Get started on every Landing page, including Translation Tools, Health Check, Statistics, and Commonplace, opens `https://compliance.mvdm.io`. In-page Get started buttons on those Landing pages are unchanged.
- [x] Each header and footer link opens the matching page or mail message. None 404. Resume is still `/projects/`.
- [x] At about 375px on a Landing page and on 404, the upper row is still visible, the Product names and Get started are behind the menu button, and the wordmark remains visible.
- [x] Tab order on a Legal page still reaches the skip link first, then the upper row, then the wordmark and Product links. Every header and footer control shows a focus ring.
- [x] Print preview of a Legal page still omits the header and the footer.
- [x] A reduced-motion preference does not leave a new animation running in the header or footer.
- [x] `AGENTS.md` tells a later editor to copy this header and this footer, with Get started always opening Compliance.
- [x] Nothing from the prototype folder is linked or copied into the site.

## Outcome

Copied the homepage two-row header and two-line footer onto every remaining page (34 HTML files plus the already-done homepage). Header Get started is `https://compliance.mvdm.io` on every page, including Translation Tools, Health Check, Statistics, and Commonplace; those Landing pages’ in-page Get started buttons still open each Product’s own application.

Dropped unused old-chrome CSS: wrapping `.foot-inner` row, `.nav-links { flex-wrap: wrap }`, and the `.site-nav:has(.site-util)` nowrap guard. Layout now lives on `.site-util` / `.site-util-inner` and `.foot-inner.foot-stack` / `.foot-id` / `.foot-legal` / `.foot-sep`. Print still hides `.site-nav` and `.site-footer`. `assets/js/site.js` unchanged.

`AGENTS.md` “How to add a page” and the reusable-class list now name this chrome and say header Get started always opens Compliance.

Verified by serving the tree: desktop chrome on homepage, a Landing page, a post, About, Open source, Resume, a Legal page, and 404; 375px menu on a Landing page and 404; Legal tab order skip → util → wordmark → Products; focus rings; Legal print omits header/footer. No prototype files copied.

Deviations: none.
