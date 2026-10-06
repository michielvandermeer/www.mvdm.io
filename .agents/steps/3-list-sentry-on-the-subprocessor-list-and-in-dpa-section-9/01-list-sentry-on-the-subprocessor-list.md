# 01 — List Sentry on the Subprocessor list

Status: done
Depends on: none

## What to build

An account owner who opens `/legal/subprocessors/` reads Sentry as a provider every Product uses. The page no longer claims that error tracking is self-hosted, and it carries a new effective date.

- **New entry under "Every Product".** A fourth `<li>` goes after Hetzner, Cloudflare, and Stripe. It follows the pattern of the existing entries: the provider name in `<strong>`, an em dash, then what the provider does. It names Sentry and its company, Functional Software, Inc. It says that Sentry handles error tracking, traces, and logs, that the data is stored in Sentry's EU region in Germany, and that the company is in the United States. One reading, which this run uses:
  `<li><strong>Sentry</strong> (Functional Software, Inc.) — error tracking, traces, and logs. The data is stored in Sentry&rsquo;s EU region in Germany; the company is in the United States.</li>`
- **Statistics section.** "Nothing beyond the shared three above." becomes "Nothing beyond the shared four above."
- **Page description.** The `<meta name="description">` and the `og:description` both change "Hetzner, Cloudflare and Stripe for every Product" to "Hetzner, Cloudflare, Stripe and Sentry for every Product". The rest of each tag stays as it is, and the two tags stay identical to each other.
- **Note removed.** The paragraph "Error tracking is self-hosted on mvdm.io's own machine. It is not a third party and is not listed." is deleted. The other paragraphs under "Notes" stay word for word.
- **Effective date.** The effective date becomes the date this step is built, in the page's existing format: a day without a leading zero, the full month name, and the year, such as "6 October 2026". The `datetime` attribute of the same `<time>` element changes with it, such as `2026-10-06`. Record the date in the Outcome: step 02 gives the Data Processing Agreement the same date.

No other Legal page changes in this step. The Privacy Notice, Terms of Service, Company details, and the `/legal/` index card stay as they are. Do not commit a PDF or the legal pack zip; the deploy builds them.

## Footprint

Projects: none

- `legal/subprocessors/index.html` — `<meta name="description">`, `og:description`, the effective-date `<time>` in `.page-head`, the "Every Product" list, the "mvdm.io Statistics" paragraph, the "Notes" section

## Acceptance criteria

- [ ] Served locally (`python3 -m http.server` from the repository root), `/legal/subprocessors/` lists Sentry as the fourth entry under "Every Product", after Stripe.
- [ ] The Sentry entry names Functional Software, Inc., says error tracking, traces, and logs, says the data is stored in Sentry's EU region in Germany, and says the company is in the United States.
- [ ] The Statistics section reads "Nothing beyond the shared four above."
- [ ] The page has no text about self-hosted error tracking; the other two paragraphs under "Notes" are unchanged.
- [ ] `<meta name="description">` and `og:description` both name Sentry with Hetzner, Cloudflare and Stripe as the providers for every Product, and the two `content` values are identical.
- [ ] The visible effective date and the `<time datetime>` value show the same date, the date this step was built, and the Outcome records it.
- [ ] The page reads correctly at desktop width and at about 375px wide, with no sideways scroll.
- [ ] No PDF, zip, or share card PNG is committed.

## Outcome

`legal/subprocessors/index.html` now lists Sentry (Functional Software, Inc.) as the fourth entry under "Every Product", with the wording this Step proposed. The self-hosted note is gone, the Statistics section says "shared four", and both description tags read "Hetzner, Cloudflare, Stripe and Sentry for every Product" and still match each other. No PDF, zip, or share card PNG is committed.

Effective date: **7 October 2026** (`datetime="2026-10-07"`). Step 02 gives the Data Processing Agreement the same date. This Step was built with 6 October 2026; the Spec fixer moved both pages to 7 October 2026, the day the run lands and deploys, because the Spec sets the effective date to the go-live date.

The Footprint matched the code. No other file changed apart from the Run recipe.

Run recipe: written (`.agents/refs/run-recipe.md`: serve with `python3 -m http.server`, then use headless Chromium for the DOM dump and screenshots)

Safety fact: The served `/legal/subprocessors/` names Sentry (Functional Software, Inc.) as the fourth "Every Product" entry, with EU-region storage in Germany and a United States company, and no longer carries the self-hosted note; if either were false, the list account owners agreed to would leave out a third party holding their users' data (rung 4)
Proof: `bash /data/projects/mvdmio/www.mvdm.io/.git/proof/3-list-sentry-on-the-subprocessor-list-and-in-dpa-section-9/step01.sh /data/projects/mvdmio/www.mvdm.io/.claude/worktrees/3-list-sentry-on-the-subprocessor-list-and-in-dpa-section-9` exit 0 — 10 PASS lines, e.g. "PASS Every Product order ['Hetzner', 'Cloudflare', 'Stripe', 'Sentry']", "PASS no self-hosted text", "PASS effective date 2026-10-07"; step01-375.png in the Proof folder shows the page at 375px with no sideways scroll

Checker: the review kept "shared four" and Sentry's two-sentence entry, because the Spec asks for both. The Run recipe's Evidence section now says where the Proof folder is. The Statistics Landing page hero (`products/statistics/index.html`) still says "no third party ever sees your data"; the Spec does not cover Landing pages, so this run leaves it for the maintainer.
