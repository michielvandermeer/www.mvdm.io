# 01 — Allow Compliance to list each Framework fee

Status: done

## What to build

The house price rule currently treats every Product as one licence stated in one place. That fights pay-per-Framework billing: a later editor following it would collapse the Compliance table back to a single number. Rewrite the Prices section so Compliance is the exception and every other Product stays on the old rule. No visitor-facing page changes in this step.

The rewritten rule, from the spec's Implementation Decisions:

- Compliance's Landing page hero holds the Flagship band as a headline (one literal string in `<p class="fee" id="price">…`).
- The Compliance ledger lists every distinct Framework fee and may repeat the Flagship figure. It has no organisation-total row.
- Other Products still state a single price, in the hero, at most once on the homepage. Their ledger totals row still links back with `<a href="#price">see fee ↑</a>` instead of repeating the number.
- The homepage Flagship line uses the same Flagship-band headline as the Compliance Landing page and does not list cheaper bands or AI credit amounts.
- Prices stay hand-written against live Stripe; there is no runtime sync. A later Compliance price change edits the hero, the band table, and at most the homepage Flagship line. A later change to another Product is still one line on that Landing page plus at most one line on the homepage.

Do not leak the Compliance exception into other Products' rules. Do not edit Landing pages, the homepage, or the changelog here.

## Footprint

Projects: mvdm.io

- `AGENTS.md` — `## Prices`

## Acceptance criteria

- [ ] The Prices section allows the Compliance Landing page to list each distinct Framework fee in the ledger while the hero holds the Flagship band.
- [ ] The Prices section still requires every other Product to state a single price, at most once on the homepage.
- [ ] The Prices section still says prices are hand-written against live Stripe with no page-load fetch.
- [ ] No visitor-facing markup, stylesheet, or changelog entry changes in this step.

## Outcome

Rewrote `AGENTS.md` `## Prices` so Compliance may list each Framework fee in the ledger (hero holds the Flagship band; no organisation-total row) while other Products keep a single hero price and `#price` ledger link. Prices remain hand-written against live Stripe with no page-load fetch. Footprint matched: only `AGENTS.md` changed; no Landing pages, homepage, stylesheet, or changelog edits. Acceptance criteria met.
