# 04 — Health Check and Statistics Landing pages

Status: done

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

## Outcome

Built `products/health-check/index.html` (teal, `--acc-health-check`) and `products/statistics/index.html` (indigo, `--acc-statistics`), reusing the step-02/03 anatomy and `site.css` classes verbatim (`.hero`/`.frame`, `.strip`, `.section`/`.clause`/`.duo`/`.duo.rev`/`.list`, `.ledger`, `.close`). No CSS changes were needed — the shared patterns already covered everything.

Health Check copy (four feature sections, per the step's 3–6 range) was drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/HealthCheck/docs/Project.md`, `Feature - Uptime monitoring.md`, `Feature - DNS monitoring.md`, and `Feature - Smoke Test Crawler.md`: (01) uptime + DNS monitoring — every-minute polling, the 10-second re-check before a DOWN is recorded, CNAME/A/AAAA resolution and DNS-change alerts; (02) SSL certificates + SSL Labs grading — daily checks, 14-day expiry warning, A+–F grading; (03) the smoke test crawler — headless-Chromium crawl up to 500 pages/10 hops, per-page status/load-time/errors/screenshot, form-chain filling, webhook trigger for CI/CD, and the three-state Passed/Issues/Failed run outcome (explicitly calling out that a 404-only run is "Issues," matching the docs' emphasis that 4xx is a problem, not a pass); (04) the NuGet client's custom telemetry, the Monday weekly summary email, and public status pages. The illustration for section 01 is a status-board/task-list style SVG as suggested by the step, and section 03's illustration is a task list of crawled pages with pass/issue/fail markers.

Statistics copy (three feature sections) was drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/Statistics/docs/Project.md`, `CONTEXT.md` (for exact terminology — Request, Tag, Interval, Group by), and `Feature - Active Users.md`: (01) active users — DAU/WAU/MAU via the Interval selector, calendar-aligned MAU buckets even for partial-month ranges, period/year-over-year comparison, tag group-by/filter; (02) throughput + response time — requests/min per day and P50/P95/P99 percentiles per normalized path, same tag filtering; (03) the request log and the drop-in NuGet client — server-side search/sort/pagination, tags as a free-form no-catalog dimension pulled live from in-window requests, and the client's automatic interception/tag-capture with static and unauthenticated traffic excluded. Illustration numbers (chart bars, percentile values, example usernames) are marked illustrative in captions/aria-labels; example request-log usernames use generic `user_NN` placeholders rather than any real or real-looking name.

"€999" appears exactly once in each page's source (hero fee line, `id="price"`), with each ledger's total row linking back via `<a href="#price">see fee ↑</a>`, matching the pattern from steps 02–03.

Deleted `_products/health-check.md` and `_products/statistics.md` via `git rm`. Verified locally with `python3 -m http.server`: `/`, `/products/health-check/`, `/products/statistics/`, and `/assets/css/site.css` all return 200; the homepage's three-card-grid links to both pages were already correct (`index.html` lines 167 and 186) and needed no change.

Drift from footprint: none of substance. No new CSS was required (the footprint said "extend only if needed"). Statistics' feature-section count (3) and Health Check's (4) both fall within the spec's 3–6 range; Health Check used 4 because uptime/DNS, SSL/grading, smoke tests, and reporting/telemetry are each large enough per the docs to warrant a separate clause rather than being merged.
