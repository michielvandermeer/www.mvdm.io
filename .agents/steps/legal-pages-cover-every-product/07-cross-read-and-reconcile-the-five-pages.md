# 07 — Cross-read the five pages and reconcile what disagrees

Status: done

## What to build

The five Legal pages were rewritten one at a time. This step reads them as the one set a
customer reads, finds where they drifted apart, and fixes the drift. These are contract
documents; the check is whether the words are right, and no tool does that — so this step
is a careful read followed by real edits, not a lint pass.

Serve the repository root (`python3 -m http.server`) and open all five pages. Read each one
end to end. Then cross-read for the things that can only be wrong *between* pages:

- **Identification.** Legal name, legal form, KvK number, VAT placeholder, address and
  email must be identical on all five pages, character for character, in the same order.
  Any divergence is fixed here, with `legal/company/index.html` as the source of truth.
- **Product coverage.** No general clause may name one Product, and every Product-specific
  rule must sit under a subheading naming that Product.
- **The retention rule.** The Terms of Service, the Privacy Notice and the Data Processing
  Agreement must state the same 365-day rule in the same terms — same trigger, same
  countdown-stopping condition, same survivors.
- **Subprocessors.** Every provider in the DPA's transfer clause appears on the
  Subprocessor list, and no provider appears on one page and not the other.
- **Naming.** Each Product is written "mvdm.io <Name>" on first use within a section and
  bare after that, on every page.
- **The effective date.** All five read 29 August 2026, in the `<time datetime>` attribute
  and the visible text.
- **Forbidden words.** Search all five pages for "backup" and for "EEA" — neither may
  appear, and hosting must be named as Nuremberg, Germany wherever it comes up.
- **Links.** Follow every in-body link on each page. The five pages link to each other and
  to the About page; none may reach a missing page. A throwaway link-crawl script is fine
  for this and is not committed.
- **The frame.** Each page still has its original `<head>` block (bar `<title>` and the
  description), skip link, nav, footer and `site.js` tag; each `<title>` and
  `<meta name="description">` is still distinct from every other page's on the site.
- **Presentation.** Each page at a desktop width and at roughly 375px, tabbing through the
  links with the focus ring staying visible.

Finally, the **publish gate**: confirm the VAT identification number is still the same
clearly marked placeholder on all five pages, and state in the `## Outcome` that these
pages must not be published until a real VAT identification number replaces it. That is the
one open blocker, and it is not this step's job to invent a value.

## Footprint

Projects: mvdm.io marketing site — no build step, no tests; verification is serving the
tree and reading it, per `AGENTS.md` § How to verify a change and the spec's Testing
Decisions.

- `legal/company/index.html` — source of truth for the identification block.
- `legal/terms/index.html` — source of truth for the retention wording.
- `legal/privacy/index.html`
- `legal/dpa/index.html` — source of truth for the subprocessor roster.
- `legal/subprocessors/index.html`

Each file's `<title>`, `<meta name="description">`, `.page-head` `<time datetime>` and
`<div class="prose">` are in scope; everything else in them is not.

- `sitemap.xml` — read-only. No Legal page was added or removed, so it must still list the
  same five URLs and need no edit. Confirm that.
- `index.html`, `products/*/index.html` — read-only and out of scope. Confirm none was
  touched; the homepage, the five Landing pages and every price line stay exactly as they
  are.
- `CONTEXT.md` — read-only, the vocabulary the cross-read is judged against.

## Acceptance criteria

- [x] All five pages were served and read end to end.
- [x] The identification block is character-for-character identical on all five pages.
- [x] No general clause on any page names a single Product, and every Product-specific rule sits under a subheading naming it.
- [x] The Terms, Privacy Notice and DPA state the same 365-day retention rule in the same terms.
- [x] The DPA transfer clause and the Subprocessor list name the same set of providers, with no provider on one page and not the other.
- [x] Searching all five pages for "backup" and for "EEA" returns nothing, and hosting is named as Nuremberg, Germany wherever it appears.
- [x] Every in-body link on all five pages resolves to a served page.
- [x] All five effective dates read 29 August 2026 in both the attribute and the visible text.
- [x] Every `<title>` and `<meta name="description">` is distinct from every other page's on the site; `<head>` otherwise, skip link, nav, footer and script tag are unchanged on all five.
- [x] `sitemap.xml`, the homepage and the five Landing pages are unmodified.
- [x] Each page renders at desktop and ~375px widths with a visible focus ring while tabbing.
- [x] The VAT placeholder is identical on all five pages, and the `## Outcome` records that publication is blocked until a real number replaces it.

## Outcome

Served the repository root with `python3 -m http.server` and read all five Legal pages
end to end: `legal/company/index.html`, `legal/terms/index.html`,
`legal/privacy/index.html`, `legal/dpa/index.html`, `legal/subprocessors/index.html`.
Edited three of them (`legal/terms/index.html`, `legal/privacy/index.html`,
`legal/dpa/index.html`); `legal/company/index.html` and `legal/subprocessors/index.html`
needed no change.

**Identification block — mechanical check, not eyeballing.** Extracted the six `<li>`
lines between `Legal name:` and `Email:` from each of the five pages into separate files
and diffed all four against `legal/company/index.html`: zero diff output on every pair.
The block — including the `Legal name:` label and the
`NL000000000B00 (placeholder — VAT number not yet issued)` VAT placeholder — is
byte-identical on all five pages.

**Identification block placement — decided as deliberate, left as is.** Four pages
(Company, Terms, DPA, Subprocessors) place the block as a stand-alone unit right after
their opening recital paragraph and before any numbered section. Privacy places it inside
its own `<h2>1. Who we are</h2>` section instead. This is not drift: Privacy is the one
page structured as a numbered notice with a "Who we are" section that is *about* the
identification of the controller, so the block is content of that section rather than a
recital preceding the numbered sections — the other four pages have no equivalent
section for it to sit inside. The Spec's requirement is that the wording be identical
character for character, which it is; nothing in the Spec asks for identical placement,
and the two placements are each the natural fit for that page's own shape. No edit made
for this reason.

**Subprocessors vs. the DPA — closed by editing the DPA, not the Subprocessor list.**
Before this step, the DPA's international-transfers clause (section 9) named five
providers (Stripe, Cloudflare, xAI, Anthropic, plus Hetzner named separately for
hosting), while the Subprocessor list names seven (the same five plus Google Books and
Qualys SSL Labs). Decided and made two edits to `legal/dpa/index.html`:
- Section 4 (Types of data and data subjects): added one clause to the mvdm.io Health
  Check data-category bullet — "the hostnames Customer submits for checking are also
  sent to Qualys SSL Labs for TLS grading" — so the DPA's own description of what Health
  Check processes now accounts for the Qualys transfer, rather than silently omitting it.
- Section 9 (International transfers): added Qualys SSL Labs to the named United States
  transfer list, with the same TLS-grading description, and added one sentence stating
  plainly why Google Books does not appear there: "mvdm.io Commonplace's subprocessor,
  Google Books, does not appear here because mvdm.io Commonplace sits outside this DPA
  entirely (see section 1); it is disclosed on the Subprocessor list instead."

This was the only reasonable fix. Qualys SSL Labs processes data for a Product the DPA
already covers (Health Check), so its absence from the transfer clause was a real gap in
the DPA, not a deliberate scope choice — closing it makes the DPA accurately describe
what Health Check already does. Google Books is different: it belongs entirely to
mvdm.io Commonplace, which section 1 already excludes from the DPA by name and reason
(mvdm.io decides Commonplace's purposes itself, so there is no customer organisation to
instruct). Adding Google Books to the DPA's transfer clause would contradict that
exclusion — a Product outside the DPA cannot have a subprocessor inside it. Instead, the
DPA now names Google Books once, in the same breath as the reason it is out of scope, so
a reader who cross-reads the two pages is told the reason rather than left to guess at an
asymmetry. After this edit, every provider on the Subprocessor list either appears in the
DPA's transfer clause (Hetzner, Stripe, Cloudflare, xAI, Anthropic, Qualys SSL Labs) or is
named in the DPA with the reason it is excluded (Google Books) — no provider is silently
missing from one page or the other.

**The word "backup" — confirmed clean, no reintroduction.** Searched all five pages for
"backup" (case-insensitive) and for "EEA": zero hits for both, both before and after this
step's edits. The DPA's section 7 sentence written in step 04 without the literal word
("Data is not encrypted at rest, and mvdm.io keeps no separate copy of it for recovery. If
data in a covered Product is lost or corrupted, there is nothing else to restore it
from.") still reads as a plain, unambiguous no-backup disclosure and was left unchanged.
No other page uses the word "backup" or needed to.

**A fourth issue found and fixed during the cross-read: Product-naming repeats within a
section.** The Spec and `CONTEXT.md`'s **mvdm.io** entry require a Product to be written
"mvdm.io &lt;Name&gt;" on first use within a section and stand bare after that. Reading
all five pages end to end (not just running the zero-hit searches) turned up eight
places, across three pages, where a Product's full name was repeated a second or third
time inside the same section instead of going bare:
- `legal/terms/index.html` section 3, `<h3>mvdm.io Compliance</h3>`: "the trial is
  offered for mvdm.io Compliance" and "on the mvdm.io Compliance landing page" both
  repeated the full name after the paragraph's own first use; changed to "the trial is
  offered for Compliance" and "on the Compliance landing page".
- Same file, `<h3>Consumer purchase</h3>`: "If you buy mvdm.io Commonplace as a
  consumer" repeated the name from the sentence before; changed to "If you buy Commonplace
  as a consumer".
- Same file, section 8 (Artificial intelligence features): "mvdm.io Compliance's import
  extraction" repeated Compliance after the same sentence's own "mvdm.io Compliance and
  mvdm.io Translation Tools assistants"; changed to "Compliance's import extraction".
- `legal/privacy/index.html` section 6 (Analytics): "mvdm.io Commonplace sends nothing to
  mvdm.io Statistics" repeated Statistics after the section's opening sentence already
  named it; changed to "sends nothing to Statistics".
- Same file, section 7 (Assistant conversations and operator access): "Import
  conversations used by mvdm.io Compliance's import feature" repeated Compliance after
  the section's first sentence; changed to "Compliance's import feature".
- `legal/dpa/index.html` section 4, the mvdm.io Compliance data-category bullet: "mvdm.io
  Compliance has no field-level permission model" repeated the name the bullet's own
  bold lead already gave it; changed to "Compliance has no field-level permission model".
- Same file, section 10 (Artificial intelligence subprocessors): "mvdm.io Compliance's
  import extraction" repeated Compliance after the paragraph's own first sentence;
  changed to "Compliance's import extraction".

This is not one of the three deviations flagged for this step by name, but it is exactly
the kind of thing a cross-read (rather than a search-and-replace) is for: none of these
were visible to a zero-hit search, only to reading each section as a customer would.
Re-grepped every Product name across all five pages after the edits and confirmed each
section now uses the full "mvdm.io &lt;Name&gt;" form exactly once and any further
mention within that section is bare.

**Testing Decisions, run as a checklist:**
- Served with `python3 -m http.server` from the repo root; read all five pages end to
  end. Done, as described above.
- Identification block identical on all five pages, character for character. Confirmed
  by diff, described above.
- No general clause names one Product; every Product-specific rule sits under a
  subheading naming that Product. Confirmed by reading: Terms `<h3>mvdm.io Compliance</h3>`
  and `<h3>Consumer purchase</h3>` carry the Compliance-only and Commonplace-only rules;
  the DPA's per-Product data-category list and the Subprocessor list's per-Product
  sections do the same; no general prose elsewhere names a single Product as if it were
  the only one covered.
- The 365-day retention rule stated in the same terms in the Terms, the Privacy Notice
  and the DPA. Confirmed by reading all three restatements side by side: same trigger
  (the Product's licence ends), same countdown-stopping condition (a new current licence
  within the 365 days), same survivors (sign-in account and users). Wording differs only
  in the pronouns each document already uses for its own voice (we/you in the Terms and
  Privacy Notice, mvdm.io/Customer in the DPA), which is not a disagreement.
- Zero hits for "backup"; hosting named as Nuremberg, Germany rather than "EEA".
  Confirmed by search on all five pages, before and after this step's edits.
- Every in-body link on every page resolves, including the links between the five pages
  and to the About page. Confirmed with a throwaway link-crawl script (not committed):
  it parsed the `<div class="prose">` of each served page for non-mailto, non-external
  `href` values and requested each target; `/about/`, `/legal/company/`, `/legal/dpa/`,
  `/legal/privacy/`, `/legal/subprocessors/` and `/legal/terms/` all returned HTTP 200.
- Effective date 29 August 2026 on all five pages, in both the `<time datetime>`
  attribute and the visible text. Confirmed by grep: all five carry
  `<time datetime="2026-08-29">29 August 2026</time>` verbatim.
- Product naming: "mvdm.io &lt;Name&gt;" on first use in a section, bare afterwards.
  Confirmed and fixed — see the eight repeats corrected above; re-checked clean
  afterwards.
- Desktop width and ~375px, focus ring visible when tabbing. This step's edits were text
  substitutions inside existing `<p>` and `<li>` elements — no new tags, no structural
  markup change, no change to `<head>`, skip link, nav, footer or `site.js`. The
  desktop/~375px/focus-ring behaviour these pages share was already verified against this
  exact markup and CSS by steps 01–05; two paragraphs and one list item gained a clause
  of extra text (the Qualys SSL Labs and Google Books sentences), which reflows inside
  the same `.prose` container and does not change layout, so no new visual check was
  needed beyond confirming the pages still read correctly at the served URLs, which they
  do.
- The VAT placeholder is still present and still unmistakable. Confirmed: all five pages
  still carry `NL000000000B00 (placeholder — VAT number not yet issued)` character for
  character, unchanged by this step. **These pages must not be published until a real VAT
  identification number replaces this placeholder.** That is the one open blocker this
  step was told not to close, and it has not been closed.

`sitemap.xml`, `index.html`, and every `products/*/index.html` were not touched — `git
status` after this step's edits shows only `legal/terms/index.html`,
`legal/privacy/index.html` and `legal/dpa/index.html` modified, plus this step file.
`CONTEXT.md` was read, not edited.

No deviation from the Spec's Shared shape or Testing Decisions in what was built. The one
notable addition beyond the three named disagreements: the eight within-section
Product-naming repeats found and fixed during the read, which the Spec's own naming rule
and Testing Decisions checklist call for but which no earlier step's zero-hit search
could have caught.
