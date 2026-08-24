# 02 — Present pay-per-Framework pricing

Status: done

## What to build

A visitor who opens the Compliance Landing page or the homepage Flagship fee is quoted live Stripe's pay-per-Framework model, not one organisation licence. Copy that promised one annual licence, or that every Framework is included in that licence, comes off those buying surfaces. Other Products stay as they are. Prices are written in by hand.

**Hero and homepage.** The Landing page hero fee (`<p class="fee" id="price">`) becomes €999 / year per framework, excl. VAT, naming ISO 27001, SOC 2 and ISO 9001, still linking down to `#pricing`. The homepage Flagship fee line uses that same headline and does not list cheaper bands or AI credit amounts. It is the only Compliance price on the homepage.

**Ledger.** Keep the existing dotted-leader, mono-row look. No totals row. Highest fee to lowest, then unlimited users, then the exact line “Extra credits available for purchase”. Band contents (active Stripe only, excl. VAT):

```
€999 / year — ISO 27001, ISO 9001, SOC 2 — $10 AI credit per framework per year
€749 / year — ISO 14001, ISO 42001 — $10 AI credit per framework per year
€199 / year — EU GDPR, UK GDPR, EU AI Act, Cyber Essentials — $5 AI credit per framework per year
```

ISO 14001 appears once in the €749 band (one Framework, both catalog editions). Extra-credit pack sizes stay off the table. Visitor-facing prose uses sentence-case “framework” and “AI credit”, never “tokens” or “Assistant extra”.

**Copy that stays.** Feature copy that names catalogs as capability — including both ISO 14001 editions as catalogs Compliance ships, and running them from one set of records — stays. The homepage hero sub and clause 01 are capability copy; only the Flagship fee line on that page changes.

**Surfaces around the fee.** Rewrite the Landing page meta description so it no longer claims one annual licence or that every Framework catalog is included, and so it stays distinct from every other page. If the longer band labels overflow at about 375px, wrap them in the shared stylesheet — no page-level style block, no new visual pattern, no new JavaScript. Nav, footer, skip link, and focus styles stay as they are.

**Public history.** Prepend a product-facing changelog entry that Compliance is now billed per Framework.

## Footprint

Projects: mvdm.io

- `products/compliance/index.html` — `meta name="description"`, `.fee#price`, `#pricing` ledger
- `index.html` — Flagship hero `.fee`
- `assets/css/site.css` — `.ledger .row` (narrow wrap only, if band labels overflow)
- `CHANGELOG.md` — newest product-facing entry

## Acceptance criteria

- [ ] The Landing page hero says €999 / year per framework, excl. VAT, for ISO 27001, SOC 2 and ISO 9001, and still links to the pricing table.
- [ ] The homepage Flagship fee line uses that same headline and does not list cheaper bands or AI credit amounts; it is the only Compliance price on the homepage.
- [ ] The ledger shows the three bands above (highest to lowest), unlimited users, and the exact line “Extra credits available for purchase”; it has no organisation-total row.
- [ ] ISO 14001 appears once as a billed Framework in the €749 band; both 2015 and 2026 catalog editions still appear in feature copy.
- [ ] Each band names its included AI credit per framework per year ($10 / $10 / $5); pack sizes and the name “Assistant extra” do not appear.
- [ ] The Landing page hero, ledger, and meta description no longer say “one annual licence”, “one licence, your whole organisation”, or that every Framework catalog is included.
- [ ] The meta description is distinct from every other page on the site.
- [ ] Translation Tools, Health Check, Statistics and Commonplace still show their current prices and tables.
- [ ] The three band rows stay readable at a desktop width and at about 375px with no horizontal overflow.
- [ ] The hero pricing link and existing calls to action keep a visible focus ring; nav and footer links on the homepage and the Compliance Landing page still resolve.
- [ ] CHANGELOG.md has an entry that Compliance is billed per Framework.

## Outcome

Updated the Compliance Landing page hero, `#pricing` ledger, and meta description for pay-per-Framework billing; matched the homepage Flagship fee to the same €999 headline; prepended a CHANGELOG entry; and taught `.ledger .row` labels to wrap (with a 480px stack) so band rows stay readable. Feature copy still names both ISO 14001 catalog editions; other Product prices were left alone. Footprint matched the step guess — no page-level styles or new JS. Verified by serving the tree: content/link checks on home + Compliance + the other four Landing pages; puppeteer overflow checks at 1280px and 375px (no horizontal overflow); keyboard focus shows the shared `:focus-visible` ring on CTAs. Acceptance criteria met.
