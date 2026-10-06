# 02 — Show Data Processing Agreement transfers as a table

Status: done
Depends on: 01

## What to build

An account owner who opens `/legal/dpa/` finds section 9 ("International transfers") as a table. Each row is a subprocessor of a covered Product. The columns show where its company is and where it stores the data. Sentry's row reads United States for the company and Germany for the data. The table fits a phone screen with its headings visible, a screen reader announces each cell with its column heading, and it prints in the Data Processing Agreement's PDF.

**Section 9, top to bottom:**

1. The opening sentence stays word for word: "Application hosting is a dedicated server in **Nuremberg, Germany**." The Spec left keeping or dropping it to the builder; this run keeps it. A short sentence follows in the same paragraph and introduces the table. One reading: "The table below shows, for each subprocessor of a covered Product, the country its company is in and the country where it stores the data."
2. The table. Three columns, in this order, with these headings as `<th scope="col">` cells in a `<thead>`: "Subprocessor", "Company in", "Data stored in". Seven rows in a `<tbody>`, in this order, each a plain `<td>` per cell:

   | Subprocessor    | Company in    | Data stored in |
   |-----------------|---------------|----------------|
   | Hetzner         | Germany       | Germany        |
   | Stripe          | United States | United States  |
   | Cloudflare      | United States | United States  |
   | xAI             | United States | United States  |
   | Anthropic       | United States | United States  |
   | Qualys SSL Labs | United States | United States  |
   | Sentry          | United States | Germany        |

   The table carries no notes on what each provider does. The current bracketed notes, such as "(payments)", are dropped; the Subprocessor list already says what each provider does. Google Books is not a row.
3. A paragraph after the table. Its first sentence replaces "Transfers to these providers rely on their own standard contractual clauses." It names the transfers it covers: those to the subprocessors whose company is in the United States, listed by name. One reading: "Transfers to the subprocessors whose company is in the United States — Stripe, Cloudflare, xAI, Anthropic, Qualys SSL Labs, and Sentry — rely on their own standard contractual clauses." The Google Books sentence follows word for word, with its link to the Subprocessor list.

No other wording in the Data Processing Agreement changes, apart from the effective date.

**Effective date.** The visible date and the `datetime` attribute of the `<time>` in the page head change to the date step 01 recorded in its Outcome. Both Legal pages must show the same date.

**Shared table class.** No existing class fits. `.exp-table` on the About page hides its header row on narrow screens, which would leave three unlabeled columns. Do not reuse or change it. Add one new shared class for document tables to `assets/css/site.css`, not a `<style>` block on the page (`AGENTS.md`, "Adding new shared UI"). It uses the existing tokens: hairline rules (`--hairline`), body text in `--ink-soft`, and the mono, uppercase heading style of `.exp-table th`. It spans the `.prose` column and keeps the same space below it as a `.prose` paragraph. At about 375px wide, the three columns fit without sideways scrolling: tighten the cell padding at the narrow breakpoint, and let cell text wrap. Every column heading stays visible at every width. In print, the table prints in full with its headings, and a row does not split across pages. The class adds no animation or transition.

Do not commit a PDF or the legal pack zip; the deploy builds them.

## Footprint

Projects: none

- `legal/dpa/index.html` — the effective-date `<time>` in `.page-head`, the paragraph under `<h2>9. International transfers</h2>`
- `assets/css/site.css` — new document-table class beside `.exp-table`; its narrow-width rule in a `@media (max-width: …)` block; the `@media print` block if the table needs a print rule

## Acceptance criteria

- [ ] Served locally (`python3 -m http.server` from the repository root), section 9 of `/legal/dpa/` shows a table with the three headings and the seven rows above, in that order, and Sentry's row reads United States and Germany.
- [ ] The opening sentence on Nuremberg, Germany, is still there, and a sentence introduces the table.
- [ ] The sentence on standard contractual clauses comes after the table and names Stripe, Cloudflare, xAI, Anthropic, Qualys SSL Labs, and Sentry as the subprocessors whose company is in the United States.
- [ ] The Google Books sentence and its link to `/legal/subprocessors/` are unchanged.
- [ ] No other section of the Data Processing Agreement changed.
- [ ] Each column heading is a `<th scope="col">`, and the browser's accessibility inspector shows each body cell tied to its column heading.
- [ ] At desktop width and at about 375px wide, the table fits, every column heading is visible, and the page does not scroll sideways.
- [ ] The table's styles live in one new class in `assets/css/site.css`, built on the existing tokens, with no hardcoded colours and no `<style>` block on the page; `.exp-table` and the About page look the same as before.
- [ ] The browser's print preview of `/legal/dpa/` shows the full table with its headings, and hides the site header, footer, and Download PDF control.
- [ ] The visible effective date and the `<time datetime>` value on `/legal/dpa/` match the date on `/legal/subprocessors/` from step 01.
- [ ] No PDF, zip, or share card PNG is committed.

## Outcome

Section 9 of `legal/dpa/index.html` is now a table with the three `<th scope="col">` headings ("Subprocessor", "Company in", "Data stored in") and the seven rows in the order this Step gave; Sentry's row reads United States and Germany. The Nuremberg sentence stays word for word, followed in the same paragraph by the sentence that introduces the table. After the table, the standard contractual clauses sentence names Stripe, Cloudflare, xAI, Anthropic, Qualys SSL Labs, and Sentry, and the Google Books sentence and its link are unchanged. The effective date is **7 October 2026** (`datetime="2026-10-07"`), the go-live date, the same as the Subprocessor list (the Spec fixer moved it from 6 October 2026).

`assets/css/site.css` gains one shared class, `.doc-table`, beside `.exp-table`. It uses `--hairline` rules, `--ink-soft` text and the mono, uppercase heading style of `.exp-table th`, and it has 20px of space below it, like a `.prose` paragraph. At `max-width: 480px` the padding and font size get smaller; that narrow rule sits in its own `@media (max-width: 480px)` block directly after the base `.doc-table` rules, because in the shared 480px block above them it lost to the later base rules and never applied. In print, the header row repeats and a row does not split across pages. It has no animation or transition. `.exp-table` and the About page are untouched.

The Footprint matched the code. Whole-site check: a local link crawl of 67 URLs found no broken links (PDFs, the zip, and share cards are deploy-time output, so the crawl skipped them), and `feed.xml` and `sitemap.xml` parse. Step 01's Proof still passes (10 PASS).

Checker fixes: the narrow-width `.doc-table` rule moved after the base rules (it was dead CSS), and a stray change to `.ledger .row > span:first-child` (`overflow-wrap: anywhere` to `break-word`) was reverted, so the Landing page ledgers are as on `main`. Review left as is: `.doc-table th` repeats the `.exp-table th` declarations instead of sharing a selector, because this Step says not to change `.exp-table`; the standard contractual clauses sentence keeps naming the six companies, because the Spec asks it to name the transfers it covers. Checker re-run: a local link crawl of 63 URLs found no broken links, `feed.xml` and `sitemap.xml` parse, and Step 01's checks pass (10 PASS).

Run recipe: unchanged

Safety fact: The served `/legal/dpa/` section 9 table lists all seven covered-Product subprocessors, with Sentry as United States company and Germany storage, the standard contractual clauses sentence names all six United States companies, and the table stays readable with headings and tightened padding at 375px and in print; if any of this were false, the transfer terms account owners agreed to would leave out Sentry, or would misstate where its data is stored (rung 4)
Proof: `bash /data/projects/mvdmio/www.mvdm.io/.git/proof/3-list-sentry-on-the-subprocessor-list-and-in-dpa-section-9/step02.sh /data/projects/mvdmio/www.mvdm.io/.claude/worktrees/3-list-sentry-on-the-subprocessor-list-and-in-dpa-section-9` exit 0 — 20 PASS lines, e.g. "PASS seven rows in order; Sentry row ['Sentry', 'United States', 'Germany']", "PASS 375px: cell padding-right and font-size ('10px', '14px'), want ('10px', '14px')", "PASS DPA date matches Subprocessor list, 2026-10-07", "PASS site.css diff only adds doc-table rules (0 stray, 0 removed)"; step02-375.png, step02-desktop.png and step02-print.pdf are in the Proof folder
