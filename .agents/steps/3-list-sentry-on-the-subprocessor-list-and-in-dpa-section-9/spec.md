# List Sentry on the Subprocessor list and in DPA section 9

## Problem Statement

The Subprocessor list at `https://mvdm.io/legal/subprocessors/` ends with a note: "Error tracking is self-hosted on mvdm.io's own machine. It is not a third party and is not listed." That note stops being true on the day the suite starts sending errors, traces, and logs to hosted Sentry (michielvandermeer/mvdmio-suite#212). From that deploy on, Sentry processes personal data for every Product. Each report carries request details and the signed-in person's identity.

The Data Processing Agreement incorporates the Subprocessor list by reference. Its section 9 ("International transfers") names the subprocessors that process data in the United States, and Sentry is not among them. An account owner who reads either page after that deploy reads a list that leaves out a third party that holds their users' data.

## Solution

The Subprocessor list names Sentry under "Every Product". The false note about self-hosted error tracking is gone. Section 9 of the Data Processing Agreement replaces its run-on sentence with a table. The table has one row per subprocessor and three columns: the subprocessor's name, the country its company is in, and the country where it stores the data. Sentry's row reads United States for the company and Germany for the data, which one sentence could not say cleanly. Both pages carry a new effective date: the day this change goes live. The change goes live on or before the day the suite's Sentry change deploys.

## User Stories

1. As an account owner, I want the Subprocessor list to name every third party that processes my users' data, so that the list I agreed to stays accurate.
2. As an account owner, I want to read that Sentry handles error tracking, traces, and logs, so that I know what Sentry receives.
3. As an account owner, I want to read that Sentry stores its data in its EU region in Germany, so that I know where error reports, traces, and logs are kept.
4. As an account owner, I want to read that the company behind Sentry is in the United States, so that the list states it the same way it states Cloudflare, Stripe, xAI, and the others.
5. As an account owner, I want the Subprocessor list to stop saying that error tracking is self-hosted, so that the page does not contradict itself.
6. As an account owner of mvdm.io Statistics, I want the Statistics section to count the shared providers correctly, so that I can see that Statistics uses the four shared providers and nothing else.
7. As someone who finds the Subprocessor list in a search result or a link preview, I want its description to name Sentry with the other shared providers, so that the summary matches the page.
8. As an account owner, I want section 9 of the Data Processing Agreement to name Sentry, so that the transfer terms I agreed to cover every United States company on the list.
9. As an account owner, I want section 9 to show each subprocessor's company country and data storage country in separate columns, so that I can see at a glance which companies are in the United States and where my data is stored.
10. As an account owner, I want Sentry's row to say that the company is in the United States and the data is stored in Germany, so that I do not read it as storing my data in the United States.
11. As an account owner, I want section 9 to say which transfers rely on standard contractual clauses, so that I know the legal basis for each transfer to the United States.
12. As an account owner reading on a phone, I want the section 9 table to fit the screen with its column headings still readable, so that I can read it without scrolling sideways.
13. As an account owner who uses a screen reader, I want the table's column headings marked as headings, so that each cell is read with the heading it belongs to.
14. As an account owner, I want each changed page's effective date to show the day it changed, so that I can tell which version applies.
15. As an account owner, I want the downloadable PDFs and the legal pack to match the pages, with the section 9 table printed in the Data Processing Agreement's PDF, so that the copy I file is current.
16. As the maintainer, I want both pages updated no later than the deploy that starts sending data to Sentry, so that neither page is ever out of date.

## Implementation Decisions

- **Where the work happens.** All of it is in this repository. It touches two Legal pages, the Subprocessor list (`/legal/subprocessors/`) and the Data Processing Agreement (`/legal/dpa/`), and the shared stylesheet. The suite repository needs no change for this Issue.
- **New entry under "Every Product".** The Subprocessor list gains a fourth entry after Hetzner, Cloudflare, and Stripe. It names Sentry (Functional Software, Inc.) for error tracking, traces, and logs. It says that the data is stored in Sentry's EU region in Germany, and that the company is in the United States. It follows the pattern of the existing entries, such as "Hetzner — hosting on a dedicated server in Nuremberg, Germany." and "Stripe — payments (United States).".
- **Statistics section.** Its line "Nothing beyond the shared three above." becomes "Nothing beyond the shared four above.", because "Every Product" now has four entries.
- **Page description.** The Subprocessor list's `<meta name="description">` and `og:description` both read "… Hetzner, Cloudflare and Stripe for every Product, …". Both add Sentry to that list of shared providers. The two tags stay identical to each other.
- **Note removed.** The paragraph "Error tracking is self-hosted on mvdm.io's own machine. It is not a third party and is not listed." is deleted. The other two paragraphs under "Notes" stay as they are. The first of them already says that mvdm.io emails account owners when the list changes, and that a customer who objects may end the contract.
- **Data Processing Agreement, section 9 becomes a table.** Today the section opens with a sentence on hosting in Nuremberg, Germany, and its second sentence lists the subprocessors that "process relevant data in the United States": Stripe, Cloudflare, xAI, Anthropic, and Qualys SSL Labs. Sentry does not fit that sentence: the company is in the United States, but the data is stored in Germany. The maintainer decided on 2026-10-06 to replace the sentence with a table.
  - **Columns.** Three: the subprocessor's name, the country its company is in, and the country where it stores the data.
  - **Rows.** One per subprocessor that serves a covered Product: Hetzner, Stripe, Cloudflare, xAI, Anthropic, Qualys SSL Labs, and Sentry. Hetzner is included so that the company column carries information. Without it, every row would read "United States" in that column. Google Books stays out, as it does today, because mvdm.io Commonplace sits outside this Data Processing Agreement. The sentence that explains that stays below the table.
  - **Values.** Hetzner: Germany and Germany, matching "a dedicated server in Nuremberg, Germany" on the Subprocessor list. Sentry: United States and Germany. Stripe, Cloudflare, xAI, Anthropic, and Qualys SSL Labs: United States in both columns. Those five values restate what section 9 says today; this change makes no new claim about where they store data.
  - **What each provider does.** The table drops the current bracketed notes, such as "(payments)". The Subprocessor list already says what each provider does, and section 9 is about where data goes.
  - **Text around the table.** A short sentence introduces the table. The sentence on standard contractual clauses follows it, and names the transfers it covers: those to the subprocessors whose company is in the United States. Sentry is one of them, because a company in the United States can be made to hand over data it stores in Germany. No other wording in the section changes.
- **Table styling.** No existing class fits. The only table on the site is the About page's two-column `.exp-table`, which hides its header row on narrow screens. That would leave three unlabeled columns. Following `AGENTS.md` ("Adding new shared UI"), the table gets a new shared class in the shared stylesheet, not a `<style>` block on the page. It uses the existing tokens: hairline rules and the mono, uppercase style of `.exp-table`'s headings. At about 375px wide the table fits without scrolling sideways, and every column keeps a visible heading. The print styles leave it readable in the PDF. The column headings are `<th scope="col">` cells.
- **Effective dates.** Both pages' effective dates change to the go-live date. The go-live date is the day this change deploys to mvdm.io. On each page, the visible date and the `datetime` attribute of its `<time>` element change together. Section 13 of the Data Processing Agreement says a replacement is published "with a new effective date", so its date must move even though only one sentence changes. The change deploys on or before the deploy of michielvandermeer/mvdmio-suite#212, as the Solution and Further Notes say.
- **PDFs and the legal pack.** The Pages deploy regenerates each Legal page's PDF and the legal pack zip. Nobody commits them by hand (`AGENTS.md`, "Legal documents").
- **Other Legal pages.** The Privacy Notice points to the Subprocessor list and names only Hetzner and Stripe, so it needs no change. The Terms of Service and Company details need no change. Before this change, the self-hosted note was the only text on the Legal pages about error tracking.
- **Precedent.** xAI and Anthropic are already listed as United States subprocessors for mvdm.io Compliance. Sentry gets no safeguards beyond what the list and the Data Processing Agreement already give them.

## Testing Decisions

No automated test covers the Legal pages, and this repository has no test suite. The check is the one in `AGENTS.md`, "How to verify a change": serve the repository root and read the pages.

- Before merging, serve the repository root locally and open `/legal/subprocessors/`. It lists Sentry as the fourth entry under "Every Product", it has no self-hosted note, the Statistics section says "shared four", and the effective date is the go-live date.
- On the same local server, open `/legal/dpa/`. Section 9 shows the table with seven rows, and Sentry's row reads United States and Germany. The sentence on standard contractual clauses names the United States companies. The Google Books sentence is still there. The effective date is the go-live date.
- Check `/legal/dpa/` at desktop width and at about 375px wide. At both widths the table fits, every column has a visible heading, and the page does not scroll sideways.
- With a screen reader, or the browser's accessibility inspector, move through the section 9 table. Each cell is announced with its column heading.
- Open the browser's print preview for `/legal/dpa/`. The table prints in full, with its headings, and the site's header and footer do not.
- View the Subprocessor list's page source. The `<meta name="description">` and `og:description` tags both name Sentry and match each other.
- After the site deploys, open `https://mvdm.io/legal/subprocessors/` and `https://mvdm.io/legal/dpa/` and repeat the checks on the live pages.
- After the deploy, download each page's PDF and the legal pack zip (`https://mvdm.io/legal/mvdmio-legal-pack.zip`). Both PDFs show the same wording and dates as the pages.

## Out of Scope

- The suite change that sends data to Sentry (michielvandermeer/mvdmio-suite#212).
- Retiring Bugsink, the self-hosted error tracker the suite uses today.
- The email to account owners that the Data Processing Agreement promises when the Subprocessor list changes. The maintainer sends it, and it is tracked in #5.
- Section 7 of the Data Processing Agreement, which says application logs are kept for 7 to 14 days. Whether that still holds once logs also go to Sentry is tracked in #4.
- Any change to the Privacy Notice, the Terms of Service, or Company details.

## Further Notes

- **Source.** This Spec comes from michielvandermeer/mvdmio-suite#213. That Issue also covers the email to account owners. Its claims about the current pages were checked against the pages on 2026-10-06 and hold.
- **Timing.** Land and deploy this change on or before the deploy of michielvandermeer/mvdmio-suite#212. The email to account owners follows once the pages are live.
- **Sentry region.** The Sentry organisation `mvdmio` was created in Sentry's EU region on 2026-10-06. That region is what "stored in Sentry's EU region in Germany" refers to.
- **Section 9 as a table.** suite #213 planned to add Sentry to the existing sentence. On 2026-10-06, during triage in this repository, the maintainer chose a table instead. That way Sentry's company country and data storage country can differ without a note in brackets.
- **Subprocessor list stays a list.** Only section 9 of the Data Processing Agreement becomes a table. The Subprocessor list keeps its bulleted entries.
- **Open question for the builder.** The Hetzner row (Germany, Germany) repeats section 9's opening sentence, "Application hosting is a dedicated server in Nuremberg, Germany." This Spec keeps that sentence, because it changes no other wording in the section. The builder may drop it instead, as part of the same change.

