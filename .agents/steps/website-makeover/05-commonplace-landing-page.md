# 05 — Commonplace Landing page

Status: done

## What to build

The Commonplace Landing page at `/products/commonplace/`, replacing the old info page and its outdated "$2.50/month" claim. Commonplace is the one consumer Product: the page reads plainer and warmer than the business pages, so an individual immediately understands this is a personal product, not a business tool.

Reuse the Landing-page anatomy and CSS patterns from step 02 with the amber accent (`#d97706`): hero (name, warm benefit tagline, "Get started" → `https://commonplace.mvdm.io`, "Contact me" `mailto:michiel@mvdm.io`, price line), capability strip, three to six alternating feature sections with inline-SVG document frames, ledger pricing table, closing CTA. The tone shift lives in the copy, not in a different layout.

Copy is drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/Commonplace/docs/` (`Project.md`, `CHANGELOG.md`, and the `Feature - *.md` files: Books, Notes, Quotes, Remarks, Contacts, Reminders, Overview dashboard, others as relevant), in plain warm language. Every claim traceable to the docs; owner reviews copy before ship.

Price: "€99 / year, incl. VAT" (VAT-inclusive because it sells to consumers), with the "€99" literal written in exactly one place in the page source. The old "$2.50/month" figure must not survive anywhere.

Delete `_products/commonplace.md` — this page takes over `/products/commonplace/`.

Same quality floor: responsive to phone widths, visible focus states, reduced motion, title + meta description.

## Footprint

Projects: mvdm.io static site (serve the repo root; all pages built so far render, links between them resolve)

- `products/commonplace/index.html` — new Landing page
- `_products/commonplace.md` — delete (replaced; carries the stale $2.50 claim)
- `assets/css/site.css` — reuse landing patterns; extend only if needed
- `/mnt/data/projects/mvdmio/mvdmio-suite/Commonplace/docs/Project.md`, `CHANGELOG.md`, `Feature - *.md` — read-only copy sources
- `index.html` — homepage three-card grid links here; adjust only if a href is wrong

## Acceptance criteria

- [x] `/products/commonplace/` serves the amber-accented Landing page in plainer, warmer language that reads as a personal product
- [x] "€99" appears exactly once in the page source, shown as "€99 / year, incl. VAT"; "$2.50" appears nowhere in the repo's served pages
- [x] Feature sections are drawn from and traceable to the Commonplace docs
- [x] "Get started" → `https://commonplace.mvdm.io`; "Contact me" is `mailto:michiel@mvdm.io`
- [x] `_products/commonplace.md` is deleted (leaving `_products/` empty — remove the empty directory); `/products/commonplace/` still resolves
- [x] Page is readable at 375px, keeps visible focus states, respects reduced motion, and has a title + meta description

## Outcome

Built `products/commonplace/index.html` reusing the step-02 anatomy and shared `site.css` classes verbatim (`.hero`/`.frame`, `.strip`, `.section`/`.clause`/`.duo`/`.duo.rev`/`.list`, `.ledger`, `.close`), with `--acc: var(--acc-commonplace)` (amber, `#d97706`) set locally. No new CSS was needed — the shared patterns already covered everything, matching steps 03-04's finding.

Copy was drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/Commonplace/docs/Project.md` and the `Feature - *.md` files (Books, Notes, Quotes, Remarks, Contacts, Reminders, Vision, Overview dashboard). The tone was deliberately shifted plainer and warmer than the business pages per the step's instruction — first person address ("the things you don't want to lose"), no register/audit/compliance-style vocabulary, contractions allowed. Four feature sections (within the spec's 3-6 range): (01) library — Google Books search-to-add, per-book status flags (favourite/owned/reading/completed), and the quotes collection with source attribution; (02) notebooks and remarks — grouped notebooks with rich text, plus the polymorphic remark that attaches a quick note to any book, contact, reminder, or quote; (03) contacts and reminders — upcoming-birthdays panel (living contacts only, 7-day window per `Feature - Contacts.md`), grouped/recurring reminders with drag-drop moves; (04) vision and the overview dashboard — the four-horizon vision page (this month / 1 / 5 / 10 years) and the `/Overview` dashboard's daily quote, currently-reading, due-today, and birthdays tiles. All illustration numbers/names (birthday counts, reminder examples, quote text) are marked "illustrative" in captions or aria-labels, or use clearly generic placeholder content (a public-domain-style quote, "Sam"/"Priya" as example names) rather than fabricated specific data.

"€99" appears exactly once in the page source (hero fee line, `id="price"`), with the ledger total row linking back via `<a href="#price">see fee ↑</a>`. The meta description was written to avoid a second literal occurrence (it reads "priced simply per year" instead of restating the figure) — this is a small deviation from the steps 02-04 pattern, which used the price literal in the meta description too; here it was necessary to keep the "exactly once" constraint since Commonplace's acceptance criteria explicitly call out the single-occurrence requirement. No "$2.50" string exists anywhere in the repo's served pages (only in this step file's own prose, which quotes the old claim to describe what was removed).

Deleted `_products/commonplace.md` via `git rm`; `_products/` is now empty and no longer present as a directory (git does not track empty directories, so no further action was needed). `/products/commonplace/` resolves. Verified locally with `python3 -m http.server`: `/`, `/products/commonplace/`, the other three product pages, and `/assets/css/site.css` all return 200. The homepage's existing `/products/commonplace/` links (nav and three-card grid) were already correct and needed no change.

Drift from footprint: none of substance.
