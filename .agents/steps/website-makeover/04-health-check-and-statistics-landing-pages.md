# 04 — Health Check and Statistics Landing pages

Status: pending

## What to build

Two Landing pages replacing the old thin info pages: `/products/health-check/` and `/products/statistics/`. A .NET developer comparing these against the tools they use now can see exactly what is monitored or measured and what each costs.

Both reuse the Landing-page anatomy and CSS patterns from step 02, each with its own accent:

- **Health Check** (teal `#0d9488`, "Get started" → `https://healthcheck.mvdm.io`): what is monitored — draft from `/mnt/data/projects/mvdmio/mvdmio-suite/HealthCheck/docs/` (`Project.md`, `CHANGELOG.md`, `Feature - Uptime monitoring.md`, `Feature - DNS monitoring.md`, `Feature - Smoke Test Crawler.md`, others). A task-list or status-board style SVG document frame fits here.
- **Statistics** (indigo `#4f46e5`, "Get started" → `https://statistics.mvdm.io`): what is measured — draft from `/mnt/data/projects/mvdmio/mvdmio-suite/Statistics/docs/` (`Project.md`, `CONTEXT.md`, `CHANGELOG.md`, `Feature - Active Users.md`, others).

Each page: hero with price line, capability strip, three to six alternating feature sections with inline-SVG document frames, ledger pricing table, closing CTA, "Contact me" (`mailto:michiel@mvdm.io`) beside every "Get started". Buyer language for developers; every claim traceable to the docs; illustrative numbers obviously illustrative; owner reviews copy before ship.

Price on both: "€999 / year, excl. VAT", the "€999" literal written exactly once per page source.

Delete `_products/health-check.md` and `_products/statistics.md` — the new pages take over their URLs.

Same quality floor: responsive to phone widths, visible focus states, reduced motion, title + meta description.

## Footprint

Projects: mvdm.io static site (serve the repo root; all pages built so far render, links between them resolve)

- `products/health-check/index.html` — new Landing page
- `products/statistics/index.html` — new Landing page
- `_products/health-check.md`, `_products/statistics.md` — delete (replaced)
- `assets/css/site.css` — reuse landing patterns; extend only if needed
- `/mnt/data/projects/mvdmio/mvdmio-suite/HealthCheck/docs/` and `/mnt/data/projects/mvdmio/mvdmio-suite/Statistics/docs/` — read-only copy sources
- `index.html` — homepage three-card grid links here; adjust only if a href is wrong

## Acceptance criteria

- [ ] `/products/health-check/` serves the teal-accented Landing page stating what Health Check monitors, traceable to the HealthCheck docs
- [ ] `/products/statistics/` serves the indigo-accented Landing page stating what Statistics measures, traceable to the Statistics docs
- [ ] Each page shows "€999 / year, excl. VAT" with the "€999" literal exactly once in its source
- [ ] "Get started" → `https://healthcheck.mvdm.io` and `https://statistics.mvdm.io` respectively; "Contact me" is `mailto:michiel@mvdm.io` on both
- [ ] `_products/health-check.md` and `_products/statistics.md` are deleted; both old `/products/:name/` URLs still resolve to the new pages
- [ ] Both pages are readable at 375px, keep visible focus states, respect reduced motion, and have a title + meta description
