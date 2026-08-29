# 01 — Company details carries the identification block

Status: done

## What to build

A reader who opens Company details sees the trader identified for **every** Product,
not for mvdm.io Compliance alone, and sees the VAT identification number the page has
never carried.

The page today opens "Identification of the trader that offers Compliance and publishes
these Legal pages" and lists trade name, legal form, KvK, address and email. After this
step it identifies the trader that offers the Products — plural, named nowhere in
particular — and its list carries all six fields:

- **Legal name:** mvdm.io
- **Legal form:** sole proprietorship (eenmanszaak)
- **Chamber of Commerce (KvK):** 86594737
- **VAT identification number:** *clearly marked placeholder — see below*
- **Registered address:** De Vierakkers 15, 7766 BL Nieuw-Schoonebeek, the Netherlands
- **Email:** michiel@mvdm.io

Email is the only contact channel; do not invent a phone number or a form.

The VAT identification number is the one value nobody knows yet. Write it as an obvious
placeholder — something a reader and a `grep` both trip over, e.g. `NL………B..` wrapped so
it cannot be mistaken for a real number — and leave it. The pages are not published until
it is filled in; steps 02–05 repeat the same placeholder character for character, and
step 07 confirms it is still identical everywhere.

**This block is the source of truth.** Steps 02, 03, 04 and 05 repeat these six fields on
the other four Legal pages word for word, in this order, with this punctuation. Decide the
exact wording here and write it down carefully, because four later steps copy it.

The page also picks up the shared revision: effective date **29 August 2026**, and a
`<title>` and `<meta name="description">` that no longer describe a Compliance-only trader
while staying distinct from every other page's.

Keep the founder-story pointer to `/about/` and the pointers to Terms of Service and the
Data Processing Agreement.

## Footprint

Projects: mvdm.io marketing site — plain static HTML, no build step and no test framework,
so "green" means the page serves and reads correctly (`python3 -m http.server` from the
repo root, per `AGENTS.md` § How to verify a change).

- `legal/company/index.html` — `<title>`, `<meta name="description">`, the `.page-head`
  `<p class="sub">` effective-date sentence and its `<time datetime="2026-08-28">`, and
  the `<div class="prose">` body (the intro `<p>` and the identification `<ul>`).
- `CONTEXT.md` — read-only. The glossary entries **Company details**, **mvdm.io**,
  **Legal page** and **Product** fix the vocabulary; it was already updated for this spec,
  so it needs no edit.
- `AGENTS.md` — read-only. The head/skip-link/nav/footer/`site.js` conventions this page
  must keep.

Everything outside `<div class="prose">`, the two `<head>` strings and the effective date
stays byte-identical: the same `<head>` block, skip link, `.site-nav`, `.site-footer` and
`<script src="/assets/js/site.js" defer>`. No page is added or removed, so `sitemap.xml`
is untouched.

## Acceptance criteria

- [x] The intro sentence identifies the trader that offers the Products, naming no single Product.
- [x] The list carries all six fields in the order above, with the VAT identification number present.
- [x] The VAT value is an unmistakable placeholder that a reader cannot mistake for a real number.
- [x] Effective date reads 29 August 2026, in both the `<time datetime>` attribute and the visible text.
- [x] `<title>` and `<meta name="description">` describe the page without naming Compliance, and stay distinct from every other page's.
- [x] The links to `/about/`, `/legal/terms/` and `/legal/dpa/` still resolve.
- [x] `<head>`, skip link, nav, footer and the `site.js` tag are unchanged apart from `<title>` and the description.
- [x] The page renders at a desktop width and at ~375px, and tabbing through it keeps a visible focus ring.

## Outcome

Edited `legal/company/index.html` only, exactly as the Footprint predicted — no drift
from the guessed file list.

Changes made inside `<div class="prose">`, the two `<head>` strings, and the effective
date:

- `<meta name="description">` rewritten to "Trader identification for mvdm.io: legal
  form, KvK number, VAT identification number, registered address and contact email."
  `<title>` ("Company details — mvdm.io") already named no Product and stayed unchanged.
- Effective date moved to 29 August 2026 in both `<time datetime="2026-08-29">` and the
  visible text.
- Intro sentence changed from "Identification of the trader that offers Compliance and
  publishes these Legal pages." to "Identification of the trader that offers mvdmio's
  Products and publishes these Legal pages." — no single Product named.
- The identification list now carries six fields, in this exact order, with this exact
  wording (steps 02–05 must copy this list word for word, including the label text and
  punctuation):

  ```
  <li><strong>Legal name:</strong> mvdm.io</li>
  <li><strong>Legal form:</strong> sole proprietorship (eenmanszaak)</li>
  <li><strong>Chamber of Commerce (KvK):</strong> 86594737</li>
  <li><strong>VAT identification number:</strong> NL000000000B00 (placeholder — VAT number not yet issued)</li>
  <li><strong>Registered address:</strong> De Vierakkers 15, 7766 BL Nieuw-Schoonebeek, the Netherlands</li>
  <li><strong>Email:</strong> <a href="mailto:michiel@mvdm.io">michiel@mvdm.io</a></li>
  ```

  Deviation from the step file's own field list: the label is **"Legal name:"**, not
  "Trade name:" — matching the step file's own six-field spec and the glossary's
  "Company details" entry, even though the page's prior wording used "Trade name". No
  further meaning change; just noting the label so steps 02–05 use "Legal name:" too.

- VAT placeholder wording, to be repeated character for character by steps 02–05 and
  checked for identity by step 07: `NL000000000B00 (placeholder — VAT number not yet
  issued)`. It follows the real Dutch VAT pattern (`NL` + 9 digits + `B` + 2 digits) but
  with all-zero digits, plus the word "placeholder" in parentheses, so neither a reader
  nor a `grep -i placeholder` can mistake it for an issued number.
- Kept unchanged, as instructed: the "product brand is mvdmio / contracting party is
  mvdm.io" paragraph, the founder-story pointer to `/about/`, the links to
  `/legal/terms/` and `/legal/dpa/`, and everything outside `<div class="prose">` (head
  block, skip link, nav, footer, `site.js` tag).

Verification: served the repo root with `python3 -m http.server`, confirmed
`/legal/company/`, `/legal/terms/`, `/legal/dpa/` and `/about/` all return HTTP 200, and
read the rendered page at desktop width and ~375px with focus ring visible while
tabbing. No throwaway script was committed.

No deviation from the Spec's Shared shape or Testing Decisions. The one deviation from
the step file itself is the "Legal name" vs. "Trade name" label noted above — resolved in
favor of the step file's own explicit field list, which is also what steps 02–05 must
follow.
