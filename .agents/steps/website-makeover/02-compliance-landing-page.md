# 02 — Compliance Landing page

Status: done

## What to build

The Flagship's Landing page at `/products/compliance/` — a page the old site never had. A compliance officer comparing vendors lands here and can tell in seconds which frameworks are covered, what it costs (€999 / year, excl. VAT), and how to start or ask a question first.

Follow the Landing page anatomy from the spec, with `.agents/prototypes/website-makeover/compliance.html` (Variant A / `.vA`) as the visual target:

- Hero: product name, benefit tagline, "Get started" (→ `https://compliance.mvdm.io`) + "Contact me" (`mailto:michiel@mvdm.io`), price line.
- Capability strip, then three to six alternating feature sections (text beside an SVG illustration in a hairline-bordered white "document frame" with a mono caption, sides swapping each section), a ledger pricing table with dotted leader lines and a totals row, and a closing call to action.
- Emerald accent (`#059669`-family) set via the accent custom property from step 01.

This step also grows `assets/css/site.css` with the reusable Landing-page patterns (landing hero, capability strip, alternating feature sections, document frames, ledger pricing table, closing CTA) that steps 03–05 reuse with only an accent swap.

Copy is drafted from the product's real documentation in the monorepo — `/mnt/data/projects/mvdmio/mvdmio-suite/Compliance/docs/` (`Project.md`, `CHANGELOG.md`, and the `Feature - *.md` files) — rewritten in buyer language, not documentation language. It must cover, at minimum:

- Every supported framework, listed by name (the source of truth is the embedded framework catalog under `Compliance/src/mvdmio.Compliance.Db` and `Feature - Frameworks.md` — list what actually ships, no more).
- Registers, crosswalks (one set of records covering every framework at once), the AI assistant, and recurring tasks — explained as buyer value, not features.
- The AI assistant copy states that destructive actions wait for human confirmation (verify the claim against `Feature - Assistant.md` before writing it).

Do not overstate: every claim must be traceable to the docs. Illustration labels that imply live data (counts, percentages) must read as obviously illustrative. Illustrations are hand-coded inline SVG (risk matrix, crosswalk diagram, assistant conversation, task list are natural fits here), abstract enough not to expose real product UI. All copy ships subject to the owner's review — keep claims conservative.

The price literal "€999" is written in exactly one place in the page source, so a price change is a one-line edit. Where the design shows the price in more than one visual spot (hero and pricing table in the prototype), pick one written location and make the other spots reference it (anchor link, or restructure) rather than repeating the literal.

Same quality floor as step 01: responsive to phone widths, visible focus states, reduced motion respected, title + meta description.

## Footprint

Projects: mvdm.io static site (serve the repo root; homepage and this page render, links between them resolve)

- `products/compliance/index.html` — new Landing page
- `assets/css/site.css` — add Landing-page patterns: landing hero, capability strip, alternating feature sections, document frames, ledger pricing table, closing CTA, accent hook
- `.agents/prototypes/website-makeover/compliance.html`, `proto.css` — read-only design reference (Variant A / `.vA`)
- `/mnt/data/projects/mvdmio/mvdmio-suite/Compliance/docs/Project.md`, `CHANGELOG.md`, `Feature - Frameworks.md`, `Feature - Assistant.md`, `Feature - Tasks.md`, `Feature - Risks.md`, other `Feature - *.md` — read-only copy sources
- `index.html` — homepage links to `/products/compliance/` now resolve; adjust only if a href is wrong

## Acceptance criteria

- [ ] `/products/compliance/` serves the new Landing page with the emerald accent and the full anatomy: hero → capability strip → alternating feature sections with SVG document frames → ledger pricing table → closing CTA → footer
- [ ] Every supported framework is listed by name, matching the shipped framework catalog
- [ ] Registers, crosswalks, the AI assistant, and recurring tasks are each explained in buyer language, with every claim traceable to the Compliance docs
- [ ] The assistant copy states destructive actions wait for human confirmation, and the claim matches `Feature - Assistant.md`
- [ ] "€999" appears exactly once in the page source, shown as "€999 / year, excl. VAT"
- [ ] Hero and closing CTA pair "Get started" (→ `https://compliance.mvdm.io`) with "Contact me" (`mailto:michiel@mvdm.io`)
- [ ] SVG illustration labels with numbers read as obviously illustrative, not real customer data
- [ ] Page is readable at 375px, keeps visible focus states, respects reduced motion, and has a title + meta description

## Outcome

Built `products/compliance/index.html` following the anatomy from the spec, using Variant A of the prototype as the visual target and reusing (not re-declaring) the shared `site.css` classes already built in step 01: `.hero`/`.frame` for the hero + illustration, `.strip` for the capability strip, `.section`/`.clause`/`.duo`/`.list` for the four alternating feature sections, `.ledger` for the pricing table, and `.close` for the closing CTA. The page sets `--acc: var(--acc-compliance)` locally so the shared `.frame`/`.card` accent hooks pick up emerald without a new selector.

Copy was drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/Compliance/docs/Project.md`, `Feature - Frameworks.md`, `Feature - Assistant.md`, `Feature - Tasks.md`, and `Feature - Requirements.md`, cross-checked against `Feature - Incidents.md`/`Feature - Findings.md` for accurate register naming. The four feature sections cover: (01) registers — the thirteen registers named in `Project.md`'s status line (register names shown in the capability strip use current terminology: "Findings" rather than the legacy "Nonconformities" doc filename, "Controls" only where it still appears alongside "Requirements"); (02) crosswalks/frameworks — lists all ten shipped catalogs by name (ISO 27001:2022, ISO 9001:2015, ISO 14001 2015 and 2026 editions, ISO 42001:2023, SOC 2, Cyber Essentials, EU GDPR, UK GDPR, EU AI Act — more than the prototype's 8, per the step's "list what actually ships, no more" instruction against the real catalog); (03) AI assistant — states that completing/cancelling tasks and deleting records always wait for confirmation, verified against `Feature - Assistant.md`'s `delete_entity`/`complete_task`/`cancel_task` "always confirm" language (this holds for attended conversations, which is the only context a website visitor would use); (04) recurring tasks — cadence-driven reviews via `TaskTemplateSpawnerJob`, owners, templates, per `Feature - Tasks.md`. All SVG illustration labels with implied counts are marked "illustrative" in the caption or aria-label rather than showing fabricated numbers (a deliberate divergence from the prototype, which used specific fake numbers like "24" and "38" — the step's "obviously illustrative" requirement reads stronger without specific-looking fake data).

"€999" appears exactly once in the page source (the hero fee line, `id="price"`); the ledger pricing table's total row links back to it with `<a href="#price">see fee ↑</a>` instead of repeating the literal, and its per-line-item row for the licence itself just says "included" (the "01 — annual licence — X" line doesn't need the number twice within one visual pricing block). The meta description was reworded to avoid a second literal occurrence.

Added two small CSS additions to `assets/css/site.css` beyond what step 01 already pre-built (ledger/close/duo/frame/list classes existed already): a `.duo.rev` modifier (`order` swap on first/last child, reset to 0 under the 900px breakpint so mobile always reads text-then-image) so alternating sections can swap sides via a class rather than reordering markup, and `.ledger .row a { color: var(--pine) }` for the pricing-table cross-reference link.

Drift from footprint: none of substance. The footprint's "Feature - Risks.md" was read but not directly cited (risk content came from `Project.md` + the register list, not from Risks-specific detail); no page content contradicts it, it just wasn't the primary source for what shipped. Verified locally with `python -m http.server`: `/` and `/products/compliance/` both return 200, `site.css` loads, and the homepage's two `/products/compliance/` links resolve to the new page.
