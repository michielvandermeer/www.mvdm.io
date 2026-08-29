# 05 — Subprocessor list grouped by application

Status: done

## What to build

A customer of one Product opens the Subprocessor list and reads the shared providers plus
the one section for the Product they bought, instead of a flat list introduced as the third
parties used "when providing Compliance".

Today the page lists five providers under one *Current subprocessors* heading, places
Hetzner "in the EEA", names Cloudflare as email only, credits Anthropic with snapshot
prose, and omits Google Books and Qualys SSL Labs. After this step the list is grouped by
application: one section for what every Product uses, then a subheading per Product for
what only it uses.

**Every Product**
- Hetzner — hosting on a dedicated server in Nuremberg, Germany.
- Cloudflare — DNS, TLS proxy in front of every application, and transactional email.
  All traffic passes through it; the page should not leave a reader thinking it is only a
  mailer.
- Stripe — payments (United States).

**mvdm.io Compliance** — xAI (assistant, speech to text, text to speech); Anthropic
(Confluence import extraction). No snapshot prose.

**mvdm.io Translation Tools** — xAI (assistant and automatic translation).

**mvdm.io Commonplace** — Google Books (book search and metadata), so a reader knows a book
search leaves the building.

**mvdm.io Health Check** — Qualys SSL Labs (TLS grading of customer hostnames), so a reader
knows their hostnames are submitted for grading.

**mvdm.io Statistics** — nothing beyond the shared three. Say so explicitly rather than
leaving the section out; an absent heading reads as an oversight.

A provider used by more than one Product (xAI) is named under each Product that uses it,
with the use that Product makes of it; the shared three are stated once and not repeated
per Product.

**Notes.** Error tracking is **self-hosted on mvdmio's own machine** and is therefore not a
third party and not listed — say this, because a reader who has heard otherwise needs the
answer. Hosted error tracking is not listed either, because the browser script that still
loads it is being removed; step 06 records that gap in the application repository. Do not
mention the hosted tracker on the page.

The list must match the Data Processing Agreement's transfer clause (step 04) exactly:
every provider named there appears here, and no provider appears on one page and not the
other. The page also keeps its statement that it is the living list incorporated by
reference into the DPA, and picks up the DPA's new change process — account owners are
emailed when this list changes, and an objecting customer may end the contract.

**The identification block**, repeated word for word from `legal/company/index.html`
(step 01), so this page identifies the same trader as the other four. Today it identifies
the party by email alone.

Effective date **29 August 2026**, with a `<title>` and `<meta name="description">` that
describe a list covering every Product.

## Footprint

Projects: mvdm.io marketing site — no build step, no tests; verified by serving the tree
and reading the page.

- `legal/subprocessors/index.html` — `<title>`, `<meta name="description">`, the
  `.page-head` effective date and its `<time datetime>`, and the `<div class="prose">`
  body: the intro paragraph, the *Current subprocessors* `<h2>` and its single `<ul>`
  (which becomes an "Every Product" section plus one `<h3>` per Product), and the *Notes*
  section.
- `legal/dpa/index.html` — read-only, for the transfer clause roster and the
  subprocessor-change process written in step 04.
- `legal/company/index.html` — read-only, for the identification block.
- `CONTEXT.md` — read-only: **Subprocessor list**, **Product**, **mvdm.io**.

`<head>` apart from title and description, skip link, nav, footer and the `site.js` tag stay
byte-identical. `sitemap.xml` is untouched.

## Acceptance criteria

- [ ] The list is grouped by application: one "Every Product" section, then one subheading per Product.
- [ ] The shared section names Hetzner (Nuremberg, Germany), Cloudflare (DNS, TLS proxy in front of every application, transactional email) and Stripe (payments, United States), and states them once.
- [ ] mvdm.io Compliance names xAI (assistant, speech to text, text to speech) and Anthropic (Confluence import extraction), with no snapshot-prose claim.
- [ ] mvdm.io Translation Tools names xAI for the assistant and automatic translation.
- [ ] mvdm.io Commonplace names Google Books; mvdm.io Health Check names Qualys SSL Labs.
- [ ] mvdm.io Statistics has its own section saying it uses nothing beyond the shared three.
- [ ] The notes state that error tracking is self-hosted on mvdmio's own machine and therefore not listed, and no hosted error-tracking provider appears anywhere on the page.
- [ ] Every provider in the DPA's transfer clause appears here, and no provider appears on one page and not the other.
- [ ] The page describes the change process the DPA now sets out: account owners emailed on a change, objecting customer may end the contract.
- [ ] Searching the page for "EEA" returns nothing; searching for "backup" returns nothing.
- [ ] The identification block matches `legal/company/index.html` character for character.
- [ ] Each Product is written "mvdm.io <Name>" on first use in a section and bare afterwards.
- [ ] Effective date reads 29 August 2026 in both the `<time datetime>` and the visible text.
- [ ] Every in-body link resolves; the page renders at desktop and ~375px widths with a visible focus ring while tabbing.

## Outcome

Edited `legal/subprocessors/index.html` only, matching the Footprint's guessed file
exactly.

- `<title>` unchanged ("Subprocessor list — mvdm.io"); `<meta name="description">`
  rewritten to describe a list covering every Product, grouped by application.
- Effective date moved to 29 August 2026 in both `<time datetime="2026-08-29">` and the
  visible text.
- The identification `<ul>` from `legal/company/index.html` (step 01) is inserted
  immediately after the opening paragraph, word for word including the "Legal name:"
  label and the VAT placeholder character for character — replacing the page's prior
  email-only identification.
- The single flat "Current subprocessors" list is replaced by one "Every Product"
  section plus one `<h2>` subheading per Product (matching the existing heading level
  used by "Notes", rather than the `<h3>` level the Footprint guessed), exactly as the
  Spec's Subprocessor list section specifies:
  - **Every Product**: Hetzner (hosting on a dedicated server in Nuremberg, Germany),
    Cloudflare (DNS, the TLS proxy in front of every application, and transactional
    email — stated so a reader does not read it as mail-only), Stripe (payments, United
    States). Stated once, not repeated per Product.
  - **mvdm.io Compliance**: xAI (assistant, speech to text, text to speech), Anthropic
    (Confluence import extraction). No snapshot-prose claim.
  - **mvdm.io Translation Tools**: xAI (assistant and automatic translation).
  - **mvdm.io Commonplace**: Google Books (book search and metadata).
  - **mvdm.io Health Check**: Qualys SSL Labs (TLS grading of customer hostnames).
  - **mvdm.io Statistics**: its own section, stating explicitly it uses nothing beyond
    the shared three.
- Notes section rewritten: error tracking is self-hosted on mvdmio's own machine and is
  therefore not a third party and not listed (the hosted tracker is not mentioned
  anywhere on the page); the page still states it is the living list incorporated by
  reference into the DPA; and it now states the DPA's change process — account owners
  are emailed when the list changes, and an objecting customer may end the contract —
  cross-linking to the DPA and the Terms.
- Confirmed by search: no "backup" and no "EEA" survive anywhere on the page.
- `<head>` apart from the description, skip link, nav, footer and the `site.js` tag are
  byte-identical to before.

**Exact provider roster per Product, as published:**
- Every Product: Hetzner, Cloudflare, Stripe.
- mvdm.io Compliance: xAI, Anthropic (plus the shared three).
- mvdm.io Translation Tools: xAI (plus the shared three).
- mvdm.io Commonplace: Google Books (plus the shared three).
- mvdm.io Health Check: Qualys SSL Labs (plus the shared three).
- mvdm.io Statistics: the shared three only.

**Tension between this page and the DPA — reported, not papered over, for step 07.**
Step 04's DPA transfer clause (Spec: Data Processing Agreement decisions, "International
transfers") names exactly **Stripe, Cloudflare, xAI and Anthropic** as processing in the
United States, plus Hetzner named separately for hosting in Nuremberg. That is five
providers total. This Subprocessor list, built from the Spec's own Subprocessor list
section, names **seven**: the same five, plus **Google Books** (mvdm.io Commonplace) and
**Qualys SSL Labs** (mvdm.io Health Check). Every provider in the DPA's transfer clause
does appear here (the DPA-side half of the Testing Decisions' cross-read check holds),
but the reverse direction fails: Google Books and Qualys SSL Labs appear on this page and
not in the DPA's transfer clause, because mvdm.io Commonplace sits outside the DPA
entirely (step 04's section 1, "Roles and scope") and Health Check's only DPA-listed data
category is browser screenshots, not a Qualys transfer. This is expected given the
Spec's own DPA scope decision (Commonplace excluded) and is not a mistake in either page
taken alone — but it does leave the Testing Decisions' "no provider may appear on one
page and not the other" cross-read unsatisfied in the literal, page-pair sense. Step 07
must decide how to close this: either the DPA's transfer clause is read as covering only
the four Products the DPA itself scopes (so the check applies only within DPA-covered
Products, which it currently satisfies), or the DPA needs a note that Google Books and
Qualys SSL Labs sit outside its transfer clause the same way mvdm.io Commonplace sits
outside its scope. No DPA edit was made in this step, per instruction.

No deviation from the Spec's Shared shape or Testing Decisions in what was built. The one
Footprint drift: the step file's own Footprint description called the existing markup a
single `<h2>` with one `<ul>`; the rebuilt page uses one `<h2>` per section (Every Product
plus one per Product plus Notes) rather than `<h3>` subheadings under a single "Current
subprocessors" `<h2>`, matching the heading level already used by the page's own "Notes"
heading and keeping every section navigable at the same outline depth. This does not
change any wording the acceptance criteria specify.

Verification: served the repo root with `python3 -m http.server`, confirmed
`/legal/subprocessors/`, `/legal/terms/`, `/legal/dpa/`, `/legal/privacy/`,
`/legal/company/` and `/about/` all return HTTP 200 (every in-body link target), searched
the page for "backup" and "EEA" (no hits), and read the rendered page at desktop width
and ~375px with focus ring visible while tabbing (shared CSS/nav already verified in
step 01). No throwaway script was committed.
