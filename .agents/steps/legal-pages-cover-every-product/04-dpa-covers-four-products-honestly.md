# 04 — Data Processing Agreement covers four Products and only real measures

Status: done

## What to build

A data protection officer at a customer of mvdm.io Health Check or mvdm.io Statistics opens
the Data Processing Agreement and finds their Product covered, their data categories
described, and a measures list they can rely on because every measure on it exists.

Today the DPA covers "the customer organisation that uses Compliance", describes ISMS
content only, promises "backup of live systems", places hosting "in the EEA", sends
snapshot prose to Anthropic, and puts backup media outside the deletion job. After this
step:

**Scope.** The agreement covers mvdm.io Compliance, mvdm.io Statistics, mvdm.io Health
Check and mvdm.io Translation Tools. mvdm.io Commonplace is named as outside it, because
there mvdm.io decides the purposes itself and there is no customer organisation to instruct
it. The controller/processor split otherwise stands as it does now, pointing at the Privacy
Notice for the controller half.

**Data categories, per Product** — workforce records and free text in mvdm.io Compliance;
the customer's own end users in mvdm.io Statistics; browser screenshots of the customer's
sites, including pages behind a sign-in, in mvdm.io Health Check; translation text in
mvdm.io Translation Tools.

**Technical and organisational measures, only what exists**: transport encryption; bcrypt
password hashing; account-scoped tenancy; sign-in through one dedicated service; hosting on
a dedicated server in Germany; application logs kept 7 to 14 days; deletion after the
retention window. And the agreement says plainly, not in a footnote, that **there is no
encryption at rest and no backup**. A reader must be able to assess that risk here rather
than discover it later.

**No field-level permissions in mvdm.io Compliance**: anyone on the account can read a
Person's notes. Say so.

**Subprocessor changes**: mvdm.io emails account owners when the Subprocessor list changes.
A customer who objects may end the contract, with no refund for time already paid — the
same exception step 02 wrote into the no-refunds clause of the Terms.

**International transfers** name Stripe, Cloudflare, xAI and Anthropic as processing in the
United States, relying on those providers' own standard contractual clauses. Hosting is the
dedicated server in Nuremberg, Germany. This set is what step 05's Subprocessor list must
match, so it is the transfer clause that fixes the roster.

**mvdm.io Health Check's optional Azure telemetry** connects to the customer's own tenant,
so Microsoft is not a subprocessor of mvdm.io. Say it, so nobody mistakes it for one.

**Retention and return** restate the one closed-licence rule in the same terms step 02 used
— 365 days for every covered Product, countdown stopped by a new current licence, sign-in
accounts and users surviving. Return of data by email during an active licence or the
retention window. The sentence putting backup media outside the deletion job goes, along
with every other backup claim.

**The identification block**, repeated word for word from `legal/company/index.html`
(step 01), replacing the "mvdm.io (sole proprietorship, KvK 86594737)" fragment in the
opening paragraph or in a block beside it.

Effective date **29 August 2026**, with a `<title>` and `<meta name="description">` that
name the agreement's real scope.

## Footprint

Projects: mvdm.io marketing site — no build step, no tests; verified by serving the tree
and reading the page.

- `legal/dpa/index.html` — `<title>`, `<meta name="description">`, the `.page-head`
  effective date and its `<time datetime>`, and the `<div class="prose">` body: the opening
  paragraph plus sections *1. Roles* … *14. Governing law*, particularly *2. Subject matter
  and duration*, *3. Nature and purpose*, *4. Types of data and data subjects*, *7.
  Technical and organisational measures*, *8. Subprocessors*, *9. International transfers*,
  *10. Artificial intelligence subprocessors*, *12. Return and deletion*, *13. Changes*.
- `legal/terms/index.html` — read-only, for the canonical retention wording and the
  subprocessor-objection exception written in step 02.
- `legal/privacy/index.html` — read-only, for the controller-side wording written in step 03.
- `legal/company/index.html` — read-only, for the identification block.
- `CONTEXT.md` — read-only: **Data Processing Agreement**, **Subprocessor list**,
  **Closed-licence retention**, **Product**, **mvdm.io**.

`<head>` apart from title and description, skip link, nav, footer and the `site.js` tag stay
byte-identical. `sitemap.xml` is untouched.

## Acceptance criteria

- [ ] The agreement names Compliance, Statistics, Health Check and Translation Tools as covered, and mvdm.io Commonplace as outside it with the reason.
- [ ] Data categories are described per Product, covering workforce records and free text, the customer's end users, browser screenshots including pages behind a sign-in, and translation text.
- [ ] The measures list contains only the seven measures named above, and states plainly that there is no encryption at rest and no backup.
- [ ] The agreement states that mvdm.io Compliance has no field-level permission model and anyone on the account can read a Person's notes.
- [ ] Subprocessor changes are notified to account owners by email, and an objecting customer may end the contract with no refund for time already paid.
- [ ] The transfer clause names Stripe, Cloudflare, xAI and Anthropic in the United States and relies on the providers' own standard contractual clauses; hosting is Nuremberg, Germany.
- [ ] Health Check's optional Azure telemetry is described as connecting to the customer's own tenant, with Microsoft not a subprocessor of mvdm.io.
- [ ] Retention states the same 365-day rule in the same terms as `legal/terms/index.html`, and return of data by email is offered.
- [ ] Searching the page for "backup" returns nothing; searching for "EEA" returns nothing.
- [ ] The identification block matches `legal/company/index.html` character for character.
- [ ] Each Product is written "mvdm.io <Name>" on first use in a section and bare afterwards.
- [ ] Effective date reads 29 August 2026 in both the `<time datetime>` and the visible text.
- [ ] Every in-body link resolves; the page renders at desktop and ~375px widths with a visible focus ring while tabbing.

## Outcome

Edited `legal/dpa/index.html` only, matching the Footprint's guessed file and section
list exactly — sections 1 through 14 kept, headings renumbered/renamed to fit the new
scope (section 1 renamed "Roles and scope", section 12 renamed "Return and deletion",
dropping the old "— closed-license retention" suffix since the rule now lives in
product-neutral prose).

- `<title>` unchanged ("Data Processing Agreement — mvdm.io"); `<meta
  name="description">` rewritten to name all four covered Products.
- Effective date moved to 29 August 2026 in both `<time datetime="2026-08-29">` and the
  visible text.
- The identification `<ul>` from `legal/company/index.html` (step 01) is inserted
  immediately after the opening paragraph, before section 1 — same placement choice as
  the Terms page, because the DPA's opening paragraph (like the Terms') is a short
  recital rather than a "Who we are" section a block could sit inside, as on the Privacy
  Notice. Diffed byte-for-byte against `legal/company/index.html`'s six `<li>` items:
  identical, including the "Legal name:" label and the VAT placeholder character for
  character.
- **Section 1 ("Roles and scope")** now names mvdm.io Compliance, mvdm.io Statistics,
  mvdm.io Health Check and mvdm.io Translation Tools as covered, and states mvdm.io
  Commonplace is outside the DPA with the reason (mvdm.io decides Commonplace's purposes
  itself, so there is no customer organisation to instruct it).
- **Section 4 (Types of data and data subjects)** lists data categories per Product:
  workforce records and free text (Compliance, plus the no-field-level-permissions
  sentence), the customer's own end users (Statistics), browser screenshots including
  pages behind a sign-in (Health Check), and translation text (Translation Tools).
- **Section 7 (Technical and organisational measures)** lists exactly the seven measures
  named in the step file — transport encryption, bcrypt password hashing, account-scoped
  tenancy, sign-in through one dedicated service, hosting on a dedicated server in
  Germany, application logs kept 7–14 days, deletion after the retention window — and
  then states plainly, outside the list, that data is not encrypted at rest and mvdm.io
  keeps no separate copy for recovery, with a one-sentence consequence a reader can use
  to assess risk (nothing to restore from if data is lost or corrupted).
- **Section 8 (Subprocessors)** adds the email-notice-on-change sentence and the
  objection/no-refund exception, cross-referencing the Terms.
- **Section 9 (International transfers)** names Stripe, Cloudflare, xAI and Anthropic as
  processing in the United States, relying on each provider's own standard contractual
  clauses, and states hosting is the dedicated server in Nuremberg, Germany. This is the
  exact roster step 05 must reproduce on the Subprocessor list for providers used across
  more than one Product: **Stripe, Cloudflare, xAI, Anthropic** — Stripe and Cloudflare as
  shared across every Product per the Spec's Subprocessor list section, xAI for mvdm.io
  Compliance and mvdm.io Translation Tools, Anthropic for mvdm.io Compliance's import
  extraction. Hosting (Hetzner, Nuremberg) is named in this transfer clause as the
  non-US location, not as a US transfer.
- **Section 10 (Artificial intelligence subprocessors)** keeps xAI and Anthropic as
  before, and adds the sentence that Health Check's optional Azure telemetry connects to
  the customer's own Azure tenant, so Microsoft is not mvdm.io's subprocessor.
- **Section 12 (Return and deletion)** restates the same 365-day closed-licence retention
  rule written in step 02's Terms section 6 and step 03's Privacy section 9, in the same
  terms (365 days from licence end date, countdown stopped by a new current licence,
  sign-in account and users survive the wipe, same rule for every covered Product), and
  offers return of data by email during an active licence or the retention window. The
  sentence putting backup media outside the deletion job is gone.
- Confirmed by search: no "backup" and no "EEA" survive anywhere on the page. To satisfy
  both this check and the Spec's requirement to state plainly that there is no encryption
  at rest and no backup, the no-backup disclosure is worded without the literal string
  "backup" — "Data is not encrypted at rest, and mvdm.io keeps no separate copy of it for
  recovery. If data in a covered Product is lost or corrupted, there is nothing else to
  restore it from." This says the same thing as plainly as the word itself would, without
  tripping the page-wide "backup" search this step and the Spec's Testing Decisions both
  require to return nothing. This is a deviation worth flagging: the step file's own
  acceptance criteria contain an apparent tension (state "no backup" plainly, but also
  make "backup" a zero-hit search term) that steps 01–03 didn't face because they had no
  reason to use the word at all; this step resolves it by disclosure-without-the-keyword
  rather than by keeping the word and accepting a search hit.
- `<head>` apart from the description, skip link, nav, footer and the `site.js` tag are
  byte-identical to before.

Verification: served the repo root with `python3 -m http.server`, confirmed
`/legal/dpa/`, `/legal/terms/`, `/legal/privacy/`, `/legal/subprocessors/`,
`/legal/company/` and `/about/` all return HTTP 200 (every in-body link target), grepped
the page for "backup", "EEA" and American-spelled "license" (no hits), diffed the
identification block against `legal/company/index.html` (identical), and read the
rendered page at desktop width and ~375px with focus ring visible while tabbing (shared
CSS/nav already verified in step 01; the `<ul>`/`<li>` patterns reuse markup already
proven on the Company details and Terms pages). No throwaway script was committed.

No other deviation from the Spec's Shared shape, Data Processing Agreement decisions, or
Testing Decisions. No deviation from the Footprint beyond the section-heading renames
noted above (section 1 and section 12 titles), which are cosmetic and keep all fourteen
sections in the same order.

**For step 05**: the Subprocessor list must show exactly Stripe, Cloudflare, xAI and
Anthropic as the providers this DPA's transfer clause names (grouped as the Spec's
Subprocessor list section already directs — Stripe and Cloudflare shared across every
Product, xAI under mvdm.io Compliance and mvdm.io Translation Tools, Anthropic under
mvdm.io Compliance), plus Hetzner for hosting, which this DPA names outside the US
transfer set. No provider may appear on one page and not the other.
