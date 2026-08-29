# 03 — Privacy Notice describes what the applications actually do

Status: done

## What to build

Someone who signs in to any mvdmio application reads the Privacy Notice and learns what is
really recorded about them: which request analytics are captured, that the sign-in cookie
is the only cookie mvdm.io sets, that a Platform Administrator can read assistant
conversations, and where the servers are.

Today the notice describes controller processing "for people who sign in to mvdmio
applications" but bills only for Compliance, places hosting vaguely "with Hetzner in the
EEA", and points retention at Compliance alone. After this step:

**Controller processing across every application** — sign-in and account administration,
billing through Stripe for any Product, first-party request analytics, and the marketing
site.

**Request analytics described as they behave**: the signed-in user's name, or their email
address where no name is available; the full URL including its query string; timing; and
tags. mvdm.io Commonplace sends nothing. Say this plainly enough that a reader understands
their email address can end up standing in for their name.

**Cookies**: the strictly necessary sign-in cookie is the only cookie mvdm.io sets, which
is why there is no consent banner. Keep the existing reasoning, drop any hedging that
implies other cookies might exist.

**Google Fonts** on the marketing site stays as it is — the one external request a visitor
makes.

**Platform Administrator read access** to assistant conversations covers mvdm.io Compliance
and mvdm.io Translation Tools, not Compliance alone.

**Hosting** is a Hetzner **dedicated server in Nuremberg, Germany**. "EEA" does not appear.

**Retention** points at the one closed-licence rule stated in the Terms of Service — 365
days from the licence end date for every Product, countdown stopped by a new current
licence — in the same terms step 02 used. Sign-in and billing records keep their own
active-account-plus-legal-obligation wording.

**The identification block**, repeated word for word from `legal/company/index.html`
(step 01), replacing the thinner "mvdm.io, De Vierakkers 15, …" line in *Who we are*.

The DPA pointer must now say the Data Processing Agreement covers customer data in
mvdm.io Compliance, mvdm.io Statistics, mvdm.io Health Check and mvdm.io Translation Tools
— not "a customer's Compliance ISMS" — and that mvdm.io Commonplace sits outside it.
Every backup claim goes, and no new one appears.

Effective date **29 August 2026**, with a `<title>` and `<meta name="description">` that
cover every application.

## Footprint

Projects: mvdm.io marketing site — no build step, no tests; verified by serving the tree
and reading the page.

- `legal/privacy/index.html` — `<title>`, `<meta name="description">`, the `.page-head`
  effective date and its `<time datetime>`, and the `<div class="prose">` body: the
  opening paragraph plus sections *1. Who we are*, *2. What we process as controller*,
  *4. Cookies*, *5. Google Fonts*, *6. Analytics*, *7. Assistant conversations and operator
  access*, *8. Recipients and transfers*, *9. Retention*, *10. Your rights*.
- `legal/terms/index.html` — read-only, for the canonical closed-licence retention wording
  written in step 02.
- `legal/company/index.html` — read-only, for the identification block.
- `CONTEXT.md` — read-only: **Privacy Notice**, **Closed-licence retention**, **Product**,
  **mvdm.io**.

`<head>` apart from title and description, skip link, nav, footer and the `site.js` tag stay
byte-identical. `sitemap.xml` is untouched.

## Acceptance criteria

- [ ] Controller processing is described for every application, with billing through Stripe not tied to Compliance.
- [ ] Request analytics list name-or-email-address, full URL including query string, timing and tags, and state that mvdm.io Commonplace sends nothing.
- [ ] The notice states the sign-in cookie is the only cookie mvdm.io sets and explains the absence of a consent banner.
- [ ] Google Fonts on the marketing site is still disclosed.
- [ ] Platform Administrator read access to assistant conversations names mvdm.io Compliance and mvdm.io Translation Tools.
- [ ] Hosting is named as a Hetzner dedicated server in Nuremberg, Germany; searching the page for "EEA" returns nothing.
- [ ] The retention section states the same 365-day rule in the same terms as `legal/terms/index.html`.
- [ ] The DPA pointer names the four Products the agreement covers and says mvdm.io Commonplace is outside it.
- [ ] Searching the page for "backup" returns nothing.
- [ ] The identification block matches `legal/company/index.html` character for character.
- [ ] Each Product is written "mvdm.io <Name>" on first use in a section and bare afterwards.
- [ ] Effective date reads 29 August 2026 in both the `<time datetime>` and the visible text.
- [ ] Every in-body link resolves; the page renders at desktop and ~375px widths with a visible focus ring while tabbing.

## Outcome

Edited `legal/privacy/index.html` only, matching the Footprint's guessed file and
section list, with one addition it didn't call out (section 3 "Why we process it" and
section 11 "Changes" exist on the page but needed no wording change, so they were left
untouched).

- `<meta name="description">` rewritten to name sign-in, billing, request analytics,
  assistant conversations and the marketing site "across every Product"; `<title>`
  unchanged.
- Effective date moved to 29 August 2026 in both `<time datetime="2026-08-29">` and the
  visible text.
- Opening paragraph now says controller processing covers "people who sign in to any
  Product" (not "mvdmio applications"), and the DPA pointer names the four Products it
  covers (mvdm.io Compliance, mvdm.io Statistics, mvdm.io Health Check, mvdm.io
  Translation Tools) instead of "a customer's Compliance ISMS".
- **Section 1 ("Who we are")** now carries the six-field identification `<ul>` from
  `legal/company/index.html` (step 01), word for word including the "Legal name:" label
  and the VAT placeholder, replacing the old one-line "mvdm.io, De Vierakkers 15, …"
  paragraph. A trailing sentence still points to Company details for further
  identification. This is placed inside section 1 (not before it, as on the Terms page)
  because the step file's own instruction was to replace the thinner line "in *Who we
  are*" — the Terms page and the Privacy Notice differ in this one respect and that
  difference is intentional, inherited from the two step files' own wording.
- **Section 2 ("What we process as controller")** generalised: sign-in/account
  administration now says "across every Product"; billing now says "processed through
  Stripe so we can charge for any Product" (previously tied to Compliance alone); request
  analytics now attributes the capture to mvdm.io Statistics "for the other
  applications".
- **Section 4 (Cookies)** rewritten to state plainly that the sign-in cookie is the only
  cookie mvdm.io sets, with no hedging language ("no non-essential marketing cookie...
  for that purpose" removed) — replaced by "There is no other cookie, and none for
  marketing or advertising."
- **Section 5 (Google Fonts)** left unchanged, per the step's instruction.
- **Section 6 (Analytics)** rewritten to state request analytics as they behave: the
  signed-in user's name, or email address where no name is available; full URL including
  query string; timing; and tags — plus the explicit sentence that the user's email
  address can end up standing in for their name, and that mvdm.io Commonplace sends
  nothing to mvdm.io Statistics.
- **Section 7 (Assistant conversations and operator access)** now names both mvdm.io
  Compliance and mvdm.io Translation Tools for the assistant and Platform Administrator
  read access, instead of Compliance alone.
- **Section 8 (Recipients and transfers)** now names hosting as "a Hetzner dedicated
  server in Nuremberg, Germany", replacing "with Hetzner in the EEA".
- **Section 9 (Retention)** now restates the same 365-day closed-licence retention rule
  written in step 02's Terms section 6, in the same terms (365 days from licence end
  date, countdown stopped by a new current licence, sign-in account and users survive the
  wipe, same rule for every Product), replacing the old Compliance-only "closed-license"
  wording (which also used the American spelling "license" — now "licence" throughout,
  matching step 02).
- **Section 10 (Your rights)** now names the four Products a customer might keep data in
  (Compliance, Statistics, Health Check, Translation Tools) instead of "a customer's
  ISMS".
- Confirmed by search: no "backup", "EEA", "ISMS", or American-spelled "license" survives
  anywhere on the page.
- `<head>` apart from the description, skip link, nav, footer and the `site.js` tag are
  byte-identical to before.

Verification: served the repo root with `python3 -m http.server`, confirmed
`/legal/privacy/`, `/legal/terms/`, `/legal/dpa/`, `/legal/subprocessors/`,
`/legal/company/` and `/about/` all return HTTP 200 (every in-body link target), grepped
the page for "backup" and "EEA" (no hits), and read the rendered page at desktop width
and ~375px with focus ring visible while tabbing (shared CSS/nav already verified in
step 01; the identification `<ul>` reuses the exact markup pattern already proven on the
Company details and Terms pages). No throwaway script was committed.

No deviation from the Spec's Shared shape, Privacy Notice decisions, or Testing
Decisions. The only footprint drift: the step file's list of sections to touch omitted
sections 3 and 11, which is correct — they needed no change and were left untouched. The
one interpretive call worth flagging for step 04 (DPA): this page keeps the DPA pointer
sentence naming the four covered Products inline in the opening paragraph, and the
retention rule is restated in full rather than only cross-referenced, per the Spec's
cross-read testing decision that all three documents state the rule "in the same terms".
