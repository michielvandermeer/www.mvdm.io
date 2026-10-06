# 01 — List Sentry on the Subprocessor list

Status: pending
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
