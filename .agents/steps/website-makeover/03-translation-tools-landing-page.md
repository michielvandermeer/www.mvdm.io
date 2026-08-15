# 03 — Translation Tools Landing page

Status: done

## What to build

The Translation Tools Landing page at `/products/translation-tools/`, replacing the old thin info page. A .NET developer lands here and can judge whether it fits their build: the `.resx`-first workflow, the AI auto-translation, and the NuGet/CLI clients are all shown, with the price visible.

Reuse the Landing-page anatomy and CSS patterns from step 02 with the sky accent (`#0284c7`): hero (name, benefit tagline, "Get started" → `https://translations.mvdm.io`, "Contact me" `mailto:michiel@mvdm.io`, price line), capability strip, three to six alternating feature sections with inline-SVG document frames (a translation grid is the natural signature illustration), ledger pricing table, closing CTA.

Copy is drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/TranslationTools/docs/` (`Project.md`, `CHANGELOG.md`, `Feature - Dotnet tool.md`, `Feature - Auto translation.md`, `Feature - Translation grid.md`, `Feature - KMP client.md`, `Feature - Term bank.md`, others as relevant), rewritten in buyer language for a .NET developer audience. Every claim traceable to the docs; nothing overstated; illustrative numbers obviously illustrative. Owner reviews all copy before ship — keep claims conservative.

Price: "€999 / year, excl. VAT", with the "€999" literal written in exactly one place in the page source.

Delete `_products/translation-tools.md` — this page replaces it at the same URL (`/products/translation-tools/`).

Same quality floor: responsive to phone widths, visible focus states, reduced motion, title + meta description.

## Footprint

Projects: mvdm.io static site (serve the repo root; all pages built so far render, links between them resolve)

- `products/translation-tools/index.html` — new Landing page
- `_products/translation-tools.md` — delete (replaced)
- `assets/css/site.css` — reuse step-02 landing patterns; extend only if a pattern is missing
- `/mnt/data/projects/mvdmio/mvdmio-suite/TranslationTools/docs/Project.md`, `CHANGELOG.md`, `Feature - *.md` — read-only copy sources
- `index.html` — homepage clause 02 links here; adjust only if a href is wrong

## Acceptance criteria

- [ ] `/products/translation-tools/` serves the new Landing page with the sky accent and the full Landing anatomy
- [ ] The `.resx` workflow, AI auto-translation, and the NuGet/CLI clients each get benefit-led coverage traceable to the TranslationTools docs
- [ ] "€999" appears exactly once in the page source, shown as "€999 / year, excl. VAT"
- [ ] "Get started" → `https://translations.mvdm.io`; "Contact me" is `mailto:michiel@mvdm.io`
- [ ] `_products/translation-tools.md` is deleted; the old URL `/products/translation-tools/` still resolves (now to the new page)
- [ ] Page is readable at 375px, keeps visible focus states, respects reduced motion, and has a title + meta description

## Outcome

Built `products/translation-tools/index.html` reusing the step-02 anatomy and shared `site.css` classes verbatim (`.hero`/`.frame`, `.strip`, `.section`/`.clause`/`.duo`/`.duo.rev`/`.list`, `.ledger`, `.close`), with `--acc: var(--acc-translation-tools)` (sky, `#0284c7`) set locally. No new CSS was needed — step 02's patterns (including the `.duo.rev` alternating modifier and the `.ledger .row a` pricing cross-reference link) covered everything this page needed.

Copy was drafted from `/mnt/data/projects/mvdmio/mvdmio-suite/TranslationTools/docs/Project.md`, `Feature - Dotnet tool.md`, `Feature - Auto translation.md`, `Feature - Translation grid.md`, and `Feature - Term bank.md`. Three feature sections, per the step's 3–6 range: (01) `.resx`-first workflow — `translations pull`/`push`/`--prune` behavior, origin-aware sync, sparse pushes that only send changed values; (02) AI auto-translation — daily + immediate reconciliation of empty non-default-locale cells only, existing human/import/API values never overwritten (including mid-fill races), grounded in the account term bank, "Auto translated" badge in grid/history; (03) NuGet client & CLI — source generator reading `.resx` `AdditionalFiles` directly into typed resource classes, runtime-cache-then-snapshot reads, the `translations` CLI's `init`/`pull`/`push` commands and single `.mvdmio-translations.yml` config, and WebSocket live updates. The old page's claims of "Git-native workflow" (clone-via-SSH), Azure DevOps integration, and Android/iOS/Rails file-format support were dropped — `Project.md`'s "Removed from scope" section confirms Git repo sync and Azure DevOps connections are gone from the current product, and the step scoped this page to the `.resx`/.NET-developer story specifically, so multi-platform format support (still real per `Project.md`'s "Multi-Platform Support" heading in the old copy, but not mentioned in the current docs' feature files) was left out rather than risk overstating current behavior.

"€999" appears exactly once in the page source (hero fee line, `id="price"`), with the ledger total row linking back via `<a href="#price">see fee ↑</a>`, matching step 02's pattern exactly.

Deleted `_products/translation-tools.md` via `git rm`. `/products/translation-tools/` now resolves to the new page (verified with `python -m http.server`: 200 on both the page and `site.css`, all internal links present and pointing at existing or not-yet-built-but-contracted paths per the spec).

Drift from footprint: none. `index.html`'s existing href to `/products/translation-tools/` (both nav and clause 02) was already correct and needed no change.
