# 05 — Commonplace Landing page

Status: pending

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

- [ ] `/products/commonplace/` serves the amber-accented Landing page in plainer, warmer language that reads as a personal product
- [ ] "€99" appears exactly once in the page source, shown as "€99 / year, incl. VAT"; "$2.50" appears nowhere in the repo's served pages
- [ ] Feature sections are drawn from and traceable to the Commonplace docs
- [ ] "Get started" → `https://commonplace.mvdm.io`; "Contact me" is `mailto:michiel@mvdm.io`
- [ ] `_products/commonplace.md` is deleted (leaving `_products/` empty — remove the empty directory); `/products/commonplace/` still resolves
- [ ] Page is readable at 375px, keeps visible focus states, respects reduced motion, and has a title + meta description
