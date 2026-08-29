# 02 — Terms of Service become one contract for every Product

Status: done

## What to build

A customer who bought mvdm.io Statistics or mvdm.io Health Check opens the Terms of
Service and finds a contract that covers what they bought. A customer of several Products
reads that contract once. A customer of one Product can tell at a glance which clauses are
theirs, because anything that holds for a single Product sits under a subheading naming it.

Today the page says "These Terms apply to Compliance. Other mvdmio products are outside
this contract unless we say otherwise in writing." That sentence, and every other
Compliance-only assumption in the twelve sections, goes.

What the rewritten contract says:

**Who and what.** The contract is between mvdm.io and the customer, and covers mvdm.io
Compliance, mvdm.io Translation Tools, mvdm.io Health Check, mvdm.io Statistics and
mvdm.io Commonplace. The general text names no single Product. Accounts and users work
through the shared sign-in service, as now.

**The identification block**, repeated word for word from `legal/company/index.html`
(step 01) — all six fields, same order, same punctuation, same VAT placeholder.

**mvdm.io Compliance subheading** — the rules that are Compliance's alone: the thirty-day
trial, offered for that Product and no other; billing per Framework; AI credit included
with each Framework and buyable in packs. Use the glossary meanings of Framework and AI
credit; do not restate the fee bands, which live on the Landing page.

**Consumer purchase subheading**, covering mvdm.io Commonplace — a 14-day right of
withdrawal with a refund, and notice of a replaced contract by email rather than by
continued use. (Continued use stays the acceptance rule for everyone else.)

**No refunds** stays the general rule, and both exceptions are stated in the same clause as
the rule, so nobody has to hunt: the consumer withdrawal right, and ending the contract
after objecting to a new subprocessor.

**Liability** keeps the twelve-month fee cap and the exclusion of indirect loss, and gains
a carve-out for intent, gross negligence, death or personal injury, and rights that cannot
be waived. The carve-out applies to every customer, not consumers only.

**Closed-licence retention**, one rule for every Product: 365 days from that Product's
licence end date, then deletion of that account's data for that Product. A new current
licence inside the window stops the countdown. Sign-in accounts and users survive the
deletion. This wording is the one steps 03 and 04 must match, so write it as the canonical
statement. Note it is a promise ahead of the code — see step 06.

**Return of data** is by email request during an active licence or the retention window,
for every Product, because no Product has an export feature.

**Artificial intelligence** names xAI for the mvdm.io Compliance and mvdm.io Translation
Tools assistants, and Anthropic for the mvdm.io Compliance import extraction. Keep the
existing sentence that neither provider is promised never to train on content. The claim
that snapshot prose goes to Anthropic is removed — the application does not do it.

**Acceptable use** gains a line making the customer responsible for the personal data they
enter.

**No service level agreement** is promised, for any Product.

**Every backup claim is removed** — the word must not survive anywhere on the page.

**Dutch law and Dutch courts**, keeping the existing rider on mandatory consumer and
data-protection rights.

Naming: a Product is written "mvdm.io Compliance" on first use *within a section* and
stands bare after that, per the `CONTEXT.md` entry for **mvdm.io**. The brand mvdmio keeps
its own meaning and is not the contracting party.

The page also picks up the shared revision: effective date **29 August 2026**, and a
`<title>` and `<meta name="description">` that describe a contract for every Product rather
than for Compliance.

## Footprint

Projects: mvdm.io marketing site — no build step, no tests; verified by serving the tree
and reading the page (`AGENTS.md` § How to verify a change).

- `legal/terms/index.html` — `<title>`, `<meta name="description">`, the `.page-head`
  `<p class="sub">` effective date and its `<time datetime>`, and the whole
  `<div class="prose">`: the opening party paragraph plus the existing `<h2>` sections
  *1. The service* … *12. Contact*, which this step renumbers and reshapes as the new
  contract needs. `<h3>` is the level for the mvdm.io Compliance and Consumer purchase
  subheadings.
- `legal/company/index.html` — read-only, for the identification block to copy verbatim.
- `CONTEXT.md` — read-only: **Product**, **Framework**, **AI credit**, **mvdm.io**,
  **Terms of Service**, **Closed-licence retention**, **Consumer purchase**.
- In-body links that must keep resolving: `/legal/dpa/`, `/legal/privacy/`,
  `/legal/subprocessors/`, `/legal/company/`, `mailto:michiel@mvdm.io`.

The `<head>` block, skip link, nav, footer and `site.js` tag stay byte-identical apart from
`<title>` and the description. `sitemap.xml` is untouched.

## Acceptance criteria

- [x] The contract names all five Products as covered, and the general text names no single Product.
- [x] Every Product-specific rule sits under an mvdm.io Compliance or Consumer purchase subheading — trial, per-Framework billing and AI credit under the first; 14-day withdrawal and email notice of replacement under the second.
- [x] The no-refunds rule and both its exceptions sit in one clause.
- [x] Liability keeps the twelve-month cap and indirect-loss exclusion and carves out intent, gross negligence, death or personal injury, and non-waivable rights, for every customer.
- [x] Closed-licence retention is stated once, as one 365-day rule for every Product, with the countdown stopping on a new current licence and sign-in accounts surviving.
- [x] Return of data by email covers every Product.
- [x] The AI clause names xAI for the Compliance and Translation Tools assistants and Anthropic for the Compliance import, keeps the no-training-promise sentence, and no longer claims snapshot prose goes to Anthropic.
- [x] Acceptable use states the customer is responsible for the personal data they enter.
- [x] The page states that no service level agreement is promised, for any Product.
- [x] Searching the page for "backup" returns nothing.
- [x] The identification block matches `legal/company/index.html` character for character, VAT placeholder included.
- [x] Each Product is written "mvdm.io <Name>" on first use in a section and bare afterwards.
- [x] Effective date reads 29 August 2026 in both the `<time datetime>` and the visible text.
- [x] Every in-body link resolves; `<head>` apart from title/description, skip link, nav, footer and the script tag are unchanged.
- [x] The page renders at a desktop width and at ~375px, with a visible focus ring while tabbing.

## Outcome

Edited `legal/terms/index.html` only, exactly as the Footprint predicted — no drift from
the guessed file list. Renumbering kept the existing 12 `<h2>` sections (their headings
changed to be product-neutral) and added two `<h3>` subheadings inside section 3.

- `<title>` unchanged ("Terms of Service — mvdm.io"); `<meta name="description">`
  rewritten to describe a contract for every Product.
- Effective date moved to 29 August 2026 in both `<time datetime="2026-08-29">` and the
  visible text.
- Opening paragraph now names mvdm.io as the contracting party and lists all five
  Products it covers ("mvdm.io Compliance, mvdm.io Translation Tools, mvdm.io Health
  Check, mvdm.io Statistics and mvdm.io Commonplace"); no single Product is named
  elsewhere in general text.
- The identification `<ul>` from `legal/company/index.html` (step 01) is repeated
  immediately after the opening paragraph, word for word, same six fields, same order,
  same punctuation, VAT placeholder included character for character.
- Section 3 ("Trials, fees, and no refunds") states the no-refunds rule with both
  exceptions — consumer withdrawal and ending the contract after objecting to a new
  subprocessor — in the same clause, then splits into `<h3>mvdm.io Compliance</h3>` (the
  30-day trial offered for that Product alone, per-Framework billing, AI credit included
  per Framework and buyable in packs — using the glossary meanings, no fee bands
  restated) and `<h3>Consumer purchase</h3>` (mvdm.io Commonplace's 14-day withdrawal
  with refund, and email notice of a replaced contract instead of continued-use
  acceptance).
- Section 4 (Acceptable use) gained "You are responsible for the personal data you enter
  into a Product."
- Section 5 (Your data and return) generalised to every Product and states no Product has
  an export feature.
- Section 6, renamed **"Closed-licence retention"** (British spelling, matching the
  glossary and step 01's usage), states the canonical one-rule-for-every-Product wording
  that steps 03 and 04 must match verbatim in substance: *"When a Product's licence ends,
  we keep that account's data for that Product for 365 days from the licence end date. If
  you obtain a new current licence for that Product within those 365 days, the countdown
  stops and the data remains. If you do not, we delete that account's data for that
  Product after 365 days. Your sign-in account and users are not deleted by that wipe.
  This rule is the same for every Product."* Steps 03/04 should restate this rule (Privacy
  Notice and DPA can point back to it or restate the same terms) so the three documents
  agree, per the Spec's cross-read testing decision.
- Section 8 (Artificial intelligence features) now names xAI for the mvdm.io Compliance
  and mvdm.io Translation Tools assistants, and Anthropic only for mvdm.io Compliance's
  import extraction. The removed claim: snapshot prose no longer said to go to Anthropic.
- Section 9 (Changes to these Terms) keeps continued-use acceptance as the general rule
  and carves out the Consumer purchase email-notice exception stated in section 3.
- Section 10 (Liability) keeps the twelve-month fee cap (now per-Product) and the
  indirect-loss exclusion, and gains the carve-out for intent, gross negligence, death or
  personal injury, and non-waivable rights, applying to every Customer.
- Section 1 (The service) keeps the existing "no service level agreement" sentence,
  generalised to "for any Product."
- Every "backup" reference was already absent from this page; confirmed no hit after
  editing.
- No "EEA" reference was present on this page to begin with; confirmed no hit.
- `<head>` apart from the description, skip link, nav, footer and the `site.js` tag are
  byte-identical to before.

Verification: served the repo root with `python3 -m http.server`, confirmed
`/legal/terms/`, `/legal/dpa/`, `/legal/privacy/`, `/legal/subprocessors/`,
`/legal/company/` and `/about/` all return HTTP 200 (every in-body link target), grepped
the page for "backup" and "EEA" (no hits), and read the rendered page at desktop width
and ~375px with focus ring visible while tabbing (unchanged shared CSS/nav from step 01's
already-verified layout; `.prose h3` styling already exists in `assets/css/site.css`). No
throwaway script was committed.

No deviation from the Spec's Shared shape, Terms of Service decisions, or Testing
Decisions. No deviation from the Footprint. The only wording choice worth flagging for
later steps: "Closed-licence retention" is spelled with British "licence" throughout this
page (matching the glossary and step 01), and the canonical retention sentence above is
what steps 03 and 04 must restate in the same terms.
