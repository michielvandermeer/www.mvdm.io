# The Data Processing Agreement gives one upper limit for logs, error reports, and traces

Section 7 of the Data Processing Agreement says "application logs, error reports,
and traces kept for at most 90 days". A reader who checks the suite finds that
the server's own log files go after 14 days. That reader may want to tighten the
number to 14, or to list each system's period. Don't do either. The number has
to cover every place this data is kept, and most of those places are not
mvdm.io's server.

The suite sends its errors, traces, and logs to hosted Sentry. Sentry keeps logs
and traces for 30 days. It keeps error reports for 30 days on its Developer plan
and 90 days on its Team plan. A new organisation starts on a trial with Team
retention, and Sentry fixes the period when the data arrives. Sentry offers no
setting that shortens these periods, and no API that deletes logs or traces.
Each error report also carries the log lines written just before the error, so
log lines stay at Sentry for as long as the error report does. A 14-day promise
would therefore be untrue. Keeping logs out of Sentry would not make it true,
because the error reports would still carry them.

We chose one upper limit over a period for each place. A period for each place
ties the Data Processing Agreement to Sentry's pricing page. When Sentry changes
a period, or mvdm.io moves between the Developer and Team plans, the page is
wrong until someone notices. Every fix is then a new version of the agreement,
with a new effective date and possibly an email to account owners. One limit of
90 days stays true across those changes. It still gives a customer's reviewer a
number to check. Dropping the number altogether ("kept only as long as needed")
would never go out of date, but it would leave section 7 with no retention
measure anyone can check.

The limit counts data that mvdm.io and Sentry keep live. It does not count
Sentry's backups, which Sentry deletes 90 days after creating them. The
agreement treats every other subprocessor's backups the same way.

## Consequences

- Moving to Sentry's Business plan adds 13 months of sampled trace data. Revisit
  section 7 before moving.
- Any new place the suite keeps logs, error reports, or traces must keep them
  for 90 days or less, or section 7 must change first. That includes another
  subprocessor, or a self-hosted store such as Bugsink, which keeps events
  with no age limit.
