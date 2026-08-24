# Compliance pay-per-Framework pricing

Status: ready-for-agent

## Problem Statement

A visitor who reads the public site is told Compliance costs one €999 organisation licence, with every Framework included. Live Stripe no longer sells that. Each Framework is now its own annual fee, with a small included AI credit and extra credit for purchase. The site and checkout disagree, and the Flagship fee on the homepage repeats the same false licence.

## Solution

The Compliance Landing page and the homepage Flagship fee line present pay-per-Framework pricing copied from live Stripe. The hero leads with the Flagship band. The pricing table lists three fee bands, the Frameworks in each band, the included AI credit per framework per year, unlimited users, and a line that extra credits are available for purchase. Copy that promised one annual licence, or that every Framework is included in that licence, comes off those surfaces. Other Products stay as they are. The site stays static: prices are written in by hand and are not fetched on page load.

## User Stories

1. As a visitor on the Compliance Landing page, I want the hero fee to say €999 / year per framework, excl. VAT, for ISO 27001, SOC 2 and ISO 9001, so that I am not sold one organisation licence.
2. As a visitor on the Compliance Landing page, I want that hero line to still link to the pricing table, so that I can read every Framework fee without guessing.
3. As a visitor on the homepage, I want the Flagship fee line to use the same €999 per-framework headline, so that the homepage and the Landing page do not contradict each other.
4. As a visitor who only reads the homepage, I want that headline to be the only Compliance price I see there, so that cheaper bands and AI credit amounts stay on the Landing page.
5. As a visitor on the Compliance Landing page, I want a pricing table with three bands (€999, €749, €199 / year, excl. VAT), so that I can see what each Framework costs.
6. As a visitor, I want the €999 band to list ISO 27001, ISO 9001 and SOC 2, so that I know which Frameworks sit at the Flagship fee.
7. As a visitor, I want the €749 band to list ISO 14001 and ISO 42001, so that I know those Frameworks cost less than the Flagship ones.
8. As a visitor, I want the €199 band to list EU GDPR, UK GDPR, the EU AI Act and Cyber Essentials, so that I know the lower-fee Frameworks.
9. As a visitor, I want ISO 14001 to appear once in the €749 band, so that I do not think the 2015 and 2026 catalogs are two fees.
10. As a visitor who still reads the feature copy, I want both ISO 14001 catalog editions named there as catalogs Compliance ships, so that “one Framework” is not mistaken for “one edition”.
11. As a visitor, I want each band to name its included AI credit — $10 per framework per year on the €999 and €749 bands, $5 on the €199 band — so that I know what assistant use is included.
12. As an organisation buying more than one Framework, I want that copy to say the credit is per framework, so that I understand the amounts add.
13. As a visitor, I want the table to include the line “Extra credits available for purchase”, so that I know included AI credit is not the whole allowance.
14. As a visitor, I do not want the three extra-credit pack sizes listed, so that the marketing table does not turn into a checkout for top-ups.
15. As a visitor, I want unlimited users still stated, so that I know seats are not billed.
16. As a visitor, I want no totals row that sums to one organisation price, so that I am not shown a bundle that Stripe does not sell.
17. As a visitor, I want Framework fees labelled excl. VAT, so that I know VAT is added at checkout.
18. As a visitor, I do not want the table, hero, or meta description to say every Framework catalog is included, so that I am not promised catalogs I must pay for separately.
19. As a visitor, I do not want “one annual licence” or “one licence, your whole organisation” on the Landing page or the homepage fee line, so that the old model is gone from the buying path.
20. As someone sharing or searching the Landing page, I want a meta description that no longer claims one annual licence, and that stays distinct from every other page, so that the snippet matches the new model.
21. As a visitor reading the feature sections, I still want to see that Compliance can run the listed catalogs from one set of records, so that capability copy is not stripped just because billing changed.
22. As a visitor considering Translation Tools, I want its price and table unchanged, so that a Compliance pricing change does not rewrite another Product.
23. As a visitor considering Health Check, I want its price and table unchanged.
24. As a visitor considering Statistics, I want its price and table unchanged.
25. As a visitor considering Commonplace, I want its price and table unchanged.
26. As a visitor on a narrow phone screen, I want the three band rows to stay readable, so that I can compare Framework fees without horizontal overflow.
27. As a keyboard user, I want the hero pricing link and the existing calls to action to keep a visible focus ring, so that I can tell what is selected.
28. As a visitor using the nav or footer on the pages that change, I want those links to still resolve, so that a pricing edit does not leave a dead path.
29. As someone who later edits prices, I want the house rule to allow Compliance to list each distinct Framework fee in the table while the hero holds the Flagship band, so that the next edit does not collapse the table back to one number.
30. As someone who later edits other Products, I want those Products to keep a single stated price, so that the Compliance exception does not leak.
31. As someone maintaining the site, I want these numbers copied from live Stripe by hand, so that a page load never calls Stripe.
32. As a visitor, I want the site to say “AI credit”, not “tokens” or “Assistant extra”, so that the public copy matches the glossary.
33. As a visitor, I want bands listed from highest fee to lowest, with Framework names in this order: ISO 27001, ISO 9001, SOC 2; then ISO 14001, ISO 42001; then EU GDPR, UK GDPR, EU AI Act, Cyber Essentials, so that the Flagship Frameworks come first.
34. As a visitor, I do not want inactive Stripe prices (the old €999-everywhere, $50-included amounts) shown, so that I am quoted what checkout actually charges.
35. As a reader of the product-facing changelog, I want an entry that Compliance is now billed per Framework, so that the public history matches the pages.

## Implementation Decisions

- The Compliance Landing page hero fee line becomes: €999 / year per framework, excl. VAT, naming ISO 27001, SOC 2 and ISO 9001, still linking down to the pricing table. The homepage Flagship fee line uses that same headline and does not list cheaper bands or AI credit amounts.
- The pricing table keeps the existing ledger look (dotted leaders, mono rows). It has three band rows from highest fee to lowest, then unlimited users, then the exact line “Extra credits available for purchase”. There is no totals row.
- Band contents, copied from live Stripe, excl. VAT:
  - €999 / year — ISO 27001, ISO 9001, SOC 2 — $10 AI credit per framework per year
  - €749 / year — ISO 14001, ISO 42001 — $10 AI credit per framework per year
  - €199 / year — EU GDPR, UK GDPR, EU AI Act, Cyber Essentials — $5 AI credit per framework per year
- Inside each band, Framework names are: ISO 27001, ISO 9001, SOC 2; ISO 14001, ISO 42001; EU GDPR, UK GDPR, EU AI Act, Cyber Essentials. ISO 14001 is listed once and covers both the 2015 and 2026 catalogs.
- The table may repeat the €999 figure. The house rule for stating prices is rewritten: for Compliance, the hero holds the Flagship band as a headline and the table lists every distinct Framework fee. Other Products still state a single price, at most once on the homepage. Prices stay hand-written against live Stripe; there is no runtime sync. A later Compliance price change edits the hero, the band table, and at most the homepage Flagship line.
- Copy that promised “every framework included”, “one annual licence”, or “one licence, your whole organisation” is removed from the Landing page hero, the pricing table, and the Landing page meta description. The meta description is rewritten so it stays distinct from every other page and no longer claims one licence. Feature copy that describes catalogs as capability (what Compliance can run, from one set of records) stays.
- Visitor-facing prose keeps sentence-case “framework”. It uses “AI credit”, not “tokens”, “Assistant extra”, or a token count. Extra-credit pack sizes (€10, €25, €100) are not listed.
- Other Product Landing pages and their homepage price mentions are not edited. Statistics and Commonplace have no live Stripe products; they stay as they are.
- No new page, no new JavaScript, no inline script, no dark mode, no new visual pattern beyond the existing ledger rows. Nav, footer, skip link, and focus styles stay as they are. If the longer band labels overflow on a narrow width, wrap them in the shared stylesheet; do not add a page-level style block.
- The glossary already defines Framework and AI credit. Add a product-facing changelog entry for the model change.

## Testing Decisions

A good check is what a visitor sees and can do, not how the markup is named.

This repo has no test suite. The prior art is the house verification list: serve the tree, click the pages you touched, check a desktop width and a narrow width, and tab through interactive elements for a visible focus ring.

The seam is the rendered marketing pages. There is one seam. Do not add a Stripe client, a snapshot test harness, or a committed crawler.

Confirm:

- The Compliance Landing page no longer claims a single organisation licence, and no longer claims that every Framework is included in one fee.
- The hero and the homepage Flagship line show the same €999 per-framework headline. The homepage does not list the cheaper bands or the AI credit amounts.
- The Landing page table shows the three band fees, the Frameworks in each band, the matching AI credit per framework, unlimited users, and “Extra credits available for purchase”. It does not show one organisation total.
- ISO 14001 appears once as a billed Framework. Both catalog editions may still appear in feature copy.
- Translation Tools, Health Check, Statistics and Commonplace still show their current prices.
- Nav, footer, and in-body links on the homepage and the Compliance Landing page still resolve.
- The table stays readable at a desktop width and at about 375px. Focus stays visible on the hero pricing link and the calls to action.

## Out of Scope

- Fetching Stripe when a page loads, or adding any price-sync job
- Changing Translation Tools, Health Check, Statistics, or Commonplace
- Listing extra-credit pack sizes, or building any top-up checkout on this site
- The Compliance Product itself: billing, meters, credit expiry, rollover, usage UI
- Inventing a token count Stripe does not store
- Per-seat pricing
- Splitting ISO 14001 into two billed Frameworks
- New pages, new JavaScript, dark mode, or a second stylesheet
- Recreating `/consultancy/`
- Creating live Stripe products for Statistics or Commonplace

## Further Notes

The live Stripe snapshot this spec copies (active prices only):

- Frameworks: ISO 27001, ISO 9001, SOC 2 at €999 / year with $10 included AI credit; ISO 14001, ISO 42001 at €749 / year with $10; Cyber Essentials, EU GDPR, UK GDPR, EU AI Act at €199 / year with $5.
- Extra AI is a one-time product named “Assistant extra” at €10 / €25 / €100. Those sizes stay off the marketing table.
- Translation Tools and Health Check remain €999 / year. Inactive Framework prices (the earlier €999 / $50-included amounts) are ignored.

The current house rule says a Landing page may state its price in exactly one place, and that the table total should link back instead of repeating the figure. That rule was written for a single licence. This spec replaces it for Compliance only.
