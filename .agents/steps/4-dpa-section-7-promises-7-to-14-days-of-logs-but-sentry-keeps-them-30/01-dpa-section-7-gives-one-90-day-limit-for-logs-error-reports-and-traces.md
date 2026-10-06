# 01 — DPA section 7 gives one 90-day limit for logs, error reports, and traces

Status: done
Depends on: none

## What to build

An account owner who opens the Data Processing Agreement (`/legal/dpa/`) reads, in section 7 ("Technical and organisational measures"), one retention measure that covers every place mvdm.io's diagnostic data is kept. Today's list item "application logs kept for 7 to 14 days;" becomes exactly:

> application logs, error reports, and traces kept for at most 90 days;

It keeps the list's style: a lower-case start and a semicolon at the end. It names no subprocessor and no Sentry plan. The other six items in section 7's list, and the bold paragraph after the list, stay word for word as they are. Section 9 keeps the table #3 added. No other Legal page changes (Privacy Notice, Terms of Service, Company details, Subprocessor list, and the `/legal/` index all stay as they are).

The agreement's effective date is the day this change deploys. #3 already set it to 7 October 2026 (`<time datetime="2026-10-07">7 October 2026</time>` in the page head). Reading for this step: the deploy day is the day this step is built. If that is 7 October 2026, the date stays as it is. If it is a later day, the visible date and the `datetime` attribute both move to that day, together, in the same format.

The deploy regenerates the agreement's PDF and the legal pack; nothing is committed by hand (`AGENTS.md`, "Legal documents"). ADR-0002 already records why section 7 gives one upper limit; it does not change. The Changelog entry is not this step's to write.

## Footprint

Projects: none

- `legal/dpa/index.html` — section 7's `<ul>` item "application logs kept for 7 to 14 days;"; the effective-date `<time datetime>` in the page head's `<p class="sub">`
- `docs/adr/0002-dpa-states-one-upper-limit-for-logs-error-reports-and-traces.md` — read only; the reasoning the new line follows

## Acceptance criteria

- [ ] In `legal/dpa/index.html`, section 7's log item reads exactly "application logs, error reports, and traces kept for at most 90 days;".
- [ ] The other six items in section 7's list and the bold paragraph after it are unchanged (`git diff` touches only the log item and, if needed, the effective date).
- [ ] Section 9 still shows #3's `.legal-table`, unchanged.
- [ ] The effective date is the day this step is built: unchanged at `2026-10-07` / "7 October 2026" if built on 7 October 2026, otherwise both the `datetime` attribute and the visible date name the build day and agree with each other.
- [ ] A search of the whole repository outside `.agents/` finds no page that still says "7 to 14 days".
- [ ] No other Legal page, no PDF, and no zip is changed or committed.
- [ ] Served locally (`python3 -m http.server` from the repo root), `/legal/dpa/` shows the new line; at about 375px wide the changed item wraps like the other items and the page does not scroll sideways; the browser's print preview shows section 7 with the new line.

## Outcome

Section 7's log item in `legal/dpa/index.html` now reads exactly "application logs, error reports, and traces kept for at most 90 days;". Built on 7 October 2026, so the effective date stays `<time datetime="2026-10-07">7 October 2026</time>`. The other six items, the bold paragraph, and section 9's `.legal-table` are unchanged; `git diff` touches one line. No other page, PDF or zip changed; outside `.agents/`, no file still says "7 to 14 days". Served locally, the page renders at desktop and 375px widths with no sideways scroll, and Chromium's print-to-PDF of the page shows the new line in section 7. Footprint matched the code; no drift.

Checker: both review axes found nothing to fix. The Checker re-ran the Proof's steps on the served page (port 8765) and added two checks: the other six items are word for word as on `main`, in order, and the new line is the sixth item. Both passed. The same checks fail against `main`'s page. The print-to-PDF text holds the new line and "Effective 7 October 2026".

Safety fact: the served `/legal/dpa/` section 7 holds exactly seven items: the six old ones unchanged, plus the new 90-day line in the old log line's place. No "7 to 14 days" is left, and the effective date's `datetime` and text agree. If this is false, account owners read a retention promise mvdm.io does not keep once suite #212 sends data to Sentry (rung 4)
Proof: `bash /data/projects/mvdmio/www.mvdm.io/.git/proof/4-dpa-section-7-promises-7-to-14-days-of-logs-but-sentry-keeps-them-30/check-dpa.sh` exit 0 — PASS section 7 has 7 items / PASS new retention line present / PASS old '7 to 14 days' gone (dpa-desktop.png, dpa-narrow.png and dpa-print.pdf in the Proof folder)
