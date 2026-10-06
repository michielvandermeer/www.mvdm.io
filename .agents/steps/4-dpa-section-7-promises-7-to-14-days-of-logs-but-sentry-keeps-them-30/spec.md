# DPA section 7 promises 7 to 14 days of logs, but Sentry keeps them 30

## Problem Statement

Section 7 of the Data Processing Agreement ("Technical and organisational measures") lists this measure: "application logs kept for 7 to 14 days". That stops being true when the suite deploys michielvandermeer/mvdmio-suite#212. From then on, every suite application sends three kinds of data to hosted Sentry, in Sentry's EU region in Germany:

- its errors;
- its traces;
- its logs at Information level and above.

Sentry keeps logs and traces for 30 days. It keeps error reports for up to 90 days. It has no setting that shortens those periods, and no API that deletes logs or traces. Each error report also carries the log lines written just before the error. So log lines stay at Sentry for up to 90 days, even if Sentry Logs were turned off.

The promise is already loose today:

- In production, the log files on the server are kept for 14 days. The "7" came from a setting on the developer's own machine.
- Bugsink, the self-hosted error tracker the suite uses now, keeps error reports with no age limit.

An account owner who reads section 7 after suite #212 deploys reads a promise that mvdm.io does not keep.

## Solution

Section 7's log line becomes one upper limit that covers every place this data is kept: "application logs, error reports, and traces kept for at most 90 days;". The limit holds in three places:

- the server's own log files, which are kept for 14 days;
- Sentry's logs and traces, which are kept for 30 days;
- Sentry's error reports, which are kept for up to 90 days.

The limit stays true when Sentry changes its periods, and when mvdm.io moves between Sentry's Developer and Team plans.

#3 went live on 7 October 2026 on its own, with section 7 unchanged. This change follows it as its own release, as soon as it is built. The email to account owners waits until this change is live, so one email still covers both changes. This change goes live on or before the day suite #212 deploys.

## User Stories

1. As an account owner, I want section 7 to say how long application logs are kept in a way that mvdm.io actually keeps, so that the measures I agreed to are true.
2. As an account owner, I want section 7 to cover error reports and traces as well as logs, so that I know how long every kind of diagnostic record about my users is kept.
3. As an account owner, I want the limit to hold for the data sent to Sentry, not only for mvdm.io's own server, so that the promise covers everywhere the data goes.
4. As an account owner, I want one number rather than a period for each system, so that I can check the promise against one figure.
5. As a customer's reviewer, I want section 7's retention measure to keep a number, so that I can still check it during a supplier review.
6. As an account owner, I want the other measures in section 7 to stay as they are, so that I can see that only the log line changed.
7. As an account owner, I want one email that covers both the new subprocessor and the section 7 change, so that I learn of everything the move to Sentry changed at once.
8. As an account owner, I want the effective date to show the day the change went live, so that I can tell which version applies.
9. As an account owner, I want the email to account owners to say that section 7 changed and what it now says, so that I learn of the longer period without rereading the agreement.
10. As an account owner, I want the downloadable PDF and the legal pack to show the new line, so that the copy I file matches the page.
11. As an account owner reading on a phone, I want the changed line to read like the other items in the list, so that the list stays easy to scan.
12. As the maintainer, I want the line to name no subprocessor and no Sentry plan, so that a change to Sentry's periods or a move between Developer and Team does not make the agreement wrong.
13. As the maintainer, I want this change to go live on or before the day suite #212 deploys, so that section 7 is never wrong.
14. As the maintainer, I want this change to follow #3 as soon as it is built, so that the agreement keeps 7 October 2026 as its effective date if both go live that day.
15. As a future maintainer, I want a decision record that says why section 7 gives one upper limit, so that I do not tighten the number to the server's 14 days and make the page wrong again.

## Implementation Decisions

- **Where the work happens.** All of it is in this repository. It changes one Legal page, the Data Processing Agreement (`/legal/dpa/`). The suite repository needs no change for this Issue.
- **The new line.** In section 7's list of measures, the item "application logs kept for 7 to 14 days;" becomes exactly "application logs, error reports, and traces kept for at most 90 days;". It keeps the list's style: a lower-case start and a semicolon at the end. No other item in the list changes. The bold paragraph after the list does not change either.
- **Why 90 days.** The number covers the longest period anywhere this data is kept:
  - The server's log files are kept for 14 days in production, rolled daily.
  - Sentry keeps logs for 30 days on every plan.
  - Sentry keeps traces for 30 days on the Developer and Team plans.
  - Sentry keeps error reports for 30 days on Developer and 90 days on Team. A new organisation starts on a trial with Team retention, and Sentry fixes the period when the data arrives. So error reports are kept for up to 90 days on any plan mvdmio would use.
- **Error reports and traces are named.** Each error report carries the log lines written just before the error. A line that limited only "logs" would understate how long those log lines are kept.
- **No subprocessor is named.** Section 9 (as #3 changes it) and the Subprocessor list already say where the data goes.
- **What the limit counts.** It counts data that mvdm.io and Sentry keep live. It does not count Sentry's backups. Sentry deletes those 90 days after creating them, under its own published security policy. The agreement treats every other subprocessor's backups the same way.
- **A release of its own, straight after #3.** The plan was for #3 and this change to reach `main` in one push. #3 landed on its own instead, on 7 October 2026 (commit `edc0f7a`), and its Pages deploy published the agreement with the old section 7 line. The maintainer decided on 2026-10-07 that this change ships as its own release, as soon as it is built. The old line stays true until suite #212 deploys, because nothing reaches Sentry before then. So the short gap between the two releases does no harm.
- **Effective date.** The agreement's effective date is the day this change deploys. On the page, the visible date and the `datetime` attribute of its `<time>` element change together. #3 already moved the date to 7 October 2026 (`2026-10-07`). If this change deploys on 7 October, the date stays. The site then carried two texts under that one date for a few hours, which the maintainer accepted. If this change deploys later, it moves the date to the deploy day. Section 13 of the agreement says a replacement is published "with a new effective date".
- **The email to account owners.** It has not gone out yet. It waits until this change is live, then covers both #3 and section 7. The sentence it adds about section 7 is in a comment on #5, posted on 2026-10-07. The maintainer sends the email. No agent sends mail as mvdm.io.
- **PDFs and the legal pack.** The Pages deploy regenerates the agreement's PDF and the legal pack. Nobody commits them by hand (`AGENTS.md`, "Legal documents").
- **Other Legal pages.** The Privacy Notice gives no period for logs. It says only that sign-in and billing records are kept "for as long as needed for security, accounting, and legal obligations". So nothing in it becomes untrue, and it does not change. The Terms of Service and the Company details do not change. The Subprocessor list changes only as #3 changes it.
- **Decision record.** ADR-0002, "The Data Processing Agreement gives one upper limit for logs, error reports, and traces", records why section 7 gives one upper limit rather than a period for each place. It was written and committed with this Spec.
- **Sentry plan.** The line holds on the Developer and Team plans. The Business plan adds 13 months of sampled trace data, so section 7 must be revisited before any move to Business.

## Testing Decisions

No automated test covers the Legal pages, and this repository has no test suite. The check is the one in `AGENTS.md`, "How to verify a change": serve the repository root and read the pages.

- Before merging, serve the repository root locally and open `/legal/dpa/`:
  - The log item in section 7 reads exactly "application logs, error reports, and traces kept for at most 90 days;".
  - The other six items and the bold paragraph after the list read as they did before.
  - Section 9 still shows #3's table.
  - The effective date shows the planned deploy day, and the visible date matches the `datetime` attribute.
- On the same local server, check `/legal/dpa/` at desktop width and at about 375px wide. The changed item wraps like the other items, and the page does not scroll sideways.
- Open the browser's print preview for `/legal/dpa/`. Section 7 prints with the new line.
- Search the whole site for "7 to 14 days". No page still says it.
- After the site deploys, open `https://mvdm.io/legal/dpa/` and repeat the checks on the live page.
- After the deploy, download the agreement's PDF and the legal pack zip (`https://mvdm.io/legal/mvdmio-legal-pack.zip`). Both show the new line and the same effective date as the page.

## Out of Scope

- Section 9 of the Data Processing Agreement and the Subprocessor list. #3 changes both.
- The email to account owners itself. The maintainer sends it, as #5 describes.
- The suite change that sends data to Sentry (michielvandermeer/mvdmio-suite#212). It keeps sending logs to Sentry as specified.
- Which personal data the suite sends to Sentry, such as live session cookies and email addresses in sign-in log lines. michielvandermeer/mvdmio-suite#216 tracks this. It should be settled before suite #212 deploys.
- Retiring Bugsink (michielvandermeer/mvdmio-suite#214). A comment on it, posted on 2026-10-07, asks for it to finish by 30 October 2026, or to cap Bugsink's event age at 90 days before then.
- Capping the console output of the application containers. Docker can cap it by size only, not by age. Each application keeps its last three containers, and no application has gone more than 16 days without a deploy since June 2026. So in practice that output stays well inside 90 days.
- Any change to the Privacy Notice, the Terms of Service, or Company details.
- A move to Sentry's Business plan.

## Further Notes

- **Source.** This Spec comes from a grilling of this Issue on 2026-10-07. Triage named three ways forward:
  - a period for each place;
  - one maximum period;
  - keeping logs out of Sentry.

  The maintainer chose one maximum period. Keeping logs out of Sentry was dropped, because error reports carry log lines and Sentry keeps those for up to 90 days anyway.
- **Timing.** This change goes live on or before the deploy of suite #212. On 2026-10-07, suite #212 was not yet pushed or merged, and its log forwarding to Sentry was not yet built.
- **When to start.** Straight away. #3's work is already on `main` (commit `edc0f7a`), so build this change on top of `main`.
- **Bugsink's oldest events.** Bugsink received its first event on 2026-08-02. Its oldest events therefore turn 90 days old on 31 October 2026. If suite #214 has not run by then, and Bugsink's age cap is not set, section 7 is untrue for those events until one of the two happens.
- **Sentry facts.** The retention periods, the lack of a setting to shorten them, and the 90-day deletion of backups come from Sentry's "Data Retention Periods" page (https://docs.sentry.io/security-legal-pii/security/data-retention-periods/) and its Security page (https://sentry.io/security/). Both were checked on 2026-10-06.

