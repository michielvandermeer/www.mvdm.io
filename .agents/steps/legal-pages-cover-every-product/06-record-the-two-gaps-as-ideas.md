# 06 — Record the two gaps as ideas in the application repository

Status: done

## What to build

Two statements on the newly written Legal pages run ahead of the code, both knowingly.
Until the code catches up, the published pages are wrong. This step puts each gap on record
where the work will happen, so neither is discovered later by a customer.

**Idea 1 — Remove the hosted error-tracking browser script.** Server-side error tracking
moved to the self-hosted tracker, but the hosted tracker's browser script still loads in
seven layout files across Auth, Health Check, Statistics and Translation Tools. Until it is
gone, every page load in those four applications sends a user's address to a third party
the Subprocessor list (step 05) does not name. The motivation is exactly that: the
Subprocessor list becomes true when the script is gone.

**Idea 2 — Extend closed-licence retention to the four Products that lack it.** The
retention job runs for Compliance only. The Terms of Service, the Privacy Notice and the
Data Processing Agreement (steps 02–04) now promise the same 365-day rule for every
Product, so Translation Tools, Health Check, Statistics and Commonplace each need the
equivalent deletion, including what "the licence end date" means for each of them.

Both are **idea documents only**. This step changes no application code. Write them in the
format the existing idea documents use — an `# Idea — <name>` heading, a `Status: idea`
line, then Motivation, Goal, Decisions, Out of scope and Open questions. Read a sibling
first (`shared-audit-trail.md` is a good model) and match its voice and depth rather than
padding to a template.

## Footprint

Projects: mvdmio-suite (the application repository). Documentation only — no code, no
build, no tests run.

**Confirm this before writing anything.** The application repository is expected at
`/data/projects/mvdmio/mvdmio-suite` (also reachable as
`/home/mvdm/Data/projects/mvdmio/mvdmio-suite`, an additional working directory for this
run). It was present and on branch `master` when this step was planned. Check it is still
there and that `.agents/ideas/shared/` exists before creating files; if it is not, stop and
report rather than inventing a location. Note that this session runs inside the
`www.mvdm.io` worktree, so git operations against that other repository are refused —
create the two files, leave them uncommitted, and name them in the `## Outcome`.

- `/data/projects/mvdmio/mvdmio-suite/.agents/ideas/shared/` — two new files, kebab-case,
  named like their siblings (`hetzner-postgres-backups.md`,
  `page-state-alignment-remaining-apps.md`, `shared-audit-trail.md`,
  `shared-rich-text-blob-uploads.md`, `per-worktree-dev-environments.md`).
- `/data/projects/mvdmio/mvdmio-suite/.agents/ideas/shared/shared-audit-trail.md` —
  read-only, the format model.
- Facts to confirm while writing idea 1: the script is the Sentry loader
  `https://js-de.sentry-cdn.com/…min.js`, present in
  `Auth/src/mvdmio.Auth.Web/Pages/Shared/_Layout.cshtml`. The other layout candidates live
  in `HealthCheck/src/mvdmio.HealthCheck.Web/Pages/Shared/`,
  `Statistics/src/mvdmio.Statistics.Web/Pages/Shared/` and
  `TranslationTools/src/mvdmio.TranslationTools.Web/Pages/Shared/`. Confirm which seven
  actually carry the tag and list them in the idea.
- Facts to confirm while writing idea 2: the existing job is
  `Compliance/src/mvdmio.Compliance.Web/Jobs/ClosedLicenseRetentionJob.cs`. Read it for
  what "licence end date" and the 365-day window mean today, and for what the four other
  Products would each have to delete.
- `legal/terms/index.html`, `legal/subprocessors/index.html` in this repository —
  read-only, for the promises the ideas have to make true.

Nothing in the `www.mvdm.io` repository changes in this step.

## Acceptance criteria

- [ ] The application repository was confirmed present at the expected path before any file was written.
- [ ] `.agents/ideas/shared/` gains exactly two new files, named in the siblings' style.
- [ ] Each file opens with an `# Idea — <name>` heading and a `Status: idea` line, then Motivation, Goal, Decisions, Out of scope and Open questions.
- [ ] The error-tracking idea names the specific layout files that still load the script, and ties the motivation to the Subprocessor list being untrue until they are gone.
- [ ] The retention idea names `ClosedLicenseRetentionJob` as the Compliance-only implementation and the four Products that need the equivalent, and ties the motivation to the 365-day promise now published.
- [ ] No application code, configuration or layout file is modified.
- [ ] The `## Outcome` names both files by absolute path and states that they are uncommitted.

## Outcome

Confirmed the application repository at `/data/projects/mvdmio/mvdmio-suite`, on branch
`master`, with `.agents/ideas/shared/` already holding the five sibling idea documents
named in this step's Footprint. Read `shared-audit-trail.md`,
`hetzner-postgres-backups.md` and `page-state-alignment-remaining-apps.md` as format
models before writing.

Wrote two new files there, both uncommitted (confirmed via `git status --porcelain` —
both show as `??`, untracked):

1. `/data/projects/mvdmio/mvdmio-suite/.agents/ideas/shared/remove-hosted-error-tracking-browser-script.md`
   — claims the hosted Sentry browser loader (`js-de.sentry-cdn.com`) still loads in
   seven layout files across four applications. Verified by reading each layout file
   directly: `Auth/.../Pages/Shared/_Layout.cshtml` (1),
   `HealthCheck/.../Pages/Shared/_Layout.cshtml` and `_UnauthenticatedLayout.cshtml` (2),
   `Statistics/.../Pages/Shared/_Layout.cshtml` (1), and
   `TranslationTools/.../Pages/Shared/_Layout.cshtml`, `_UnauthenticatedLayout.cshtml`
   and `Pages/Admin/_AdminLayout.cshtml` (3) — seven files, matching the step file's
   claim exactly. Confirmed Commonplace and Compliance carry no such tag. Cross-checked
   against `docs/adr/0009-self-hosted-error-tracking-without-tracing.md`, which confirms
   server-side tracking moved to a self-hosted Bugsink instance but never mentions the
   front-end loader script — the ADR only changed the SDK's connection string, so the
   browser tag survived untouched. The idea cites this ADR directly and adds the
   `_UnauthenticatedLayout.cshtml` / `_AdminLayout.cshtml` files, which the step file's
   footprint did not name individually but which account for the difference between
   "four layout candidate directories" and the seven actual files.

2. `/data/projects/mvdmio/mvdmio-suite/.agents/ideas/shared/closed-license-retention-remaining-products.md`
   — names `Compliance/src/mvdmio.Compliance.Web/Jobs/ClosedLicenseRetentionJob.cs` as
   the sole implementation, confirmed by reading it: it filters
   `license.Application is not ApplicationType.Compliance` and skips every other row, so
   Translations, HealthCheck, Statistics and Commonplace licences are never acted on.
   Quotes the canonical rule from step 02's Outcome — actually restated here from the
   Spec's Terms of Service decision, which step 02 implemented word for word: "365 days
   from the licence end date, then deletion of that account's data for that Product. A
   new current licence inside the window stops the countdown." Confirmed against the
   code that `RetentionDays = 365`, that a renewed/future-dated licence row never
   qualifies (matching "a new current licence... stops the countdown"), and that Auth
   Users, Accounts, Licenses, Stripe rows and Legal Acceptance are left untouched by the
   wipe. Confirmed the four other `ApplicationType` values (`Translations`, `HealthCheck`,
   `Statistics`, `Commonplace`) exist in
   `Auth/src/mvdmio.Auth.Db/Data/Enums/ApplicationType.cs`.

Nothing the code said contradicted either claim in the step file; both were accurate as
written, and both idea documents state only claims checked against the code. No
application code, configuration or layout file was modified. The two new files are the
only change in `mvdmio-suite` and remain uncommitted there, as required — this session
did not attempt any git operation in that repository.
