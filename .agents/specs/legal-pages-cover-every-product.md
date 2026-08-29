# Legal pages cover every Product

Status: ready-for-agent

## Problem Statement

mvdmio sells five Products. All five are live, billed through Stripe, and share one
sign-in service. But the five Legal pages read as if Compliance were the only thing
mvdmio sells. The Terms of Service name Compliance as the service being licensed. The
Data Processing Agreement covers only Compliance records. The Subprocessor list is
introduced as the list of third parties used "when providing Compliance".

A customer who buys mvdm.io Statistics or mvdm.io Health Check therefore has no
contract, no processor agreement, and no subprocessor disclosure covering what they
bought.

Three further problems sit alongside that one.

The documents disagree with each other. Company details gives the trade name, legal
form, KvK number and address. The Terms give the trade name and KvK number. The DPA
gives the trade name and KvK number but no address. The Subprocessor list identifies
the party by email alone. A reader cannot tell whether these describe the same trader.

The documents disagree with the code. They describe backups that do not exist. They
place hosting vaguely "in the EEA" when it is one dedicated server in Nuremberg. They
send snapshot prose to Anthropic, which the application does not do. They omit
Cloudflare's role in front of every application, and omit Google Books and Qualys SSL
Labs entirely. They describe closed-licence retention as a Compliance rule when it
should be the rule for every Product.

The Products carry generic names. "Statistics" and "Compliance" on their own do not
identify whose product they are.

## Solution

One set of five Legal pages that covers every Product.

The general text is product-neutral. Where a rule holds for one Product alone, it goes
under a subheading naming that Product. The 30-day trial, per-Framework billing and AI
credit are Compliance rules, so they sit under a Compliance subheading. The 14-day right
of withdrawal is a Commonplace rule, so it sits under a Consumer purchase subheading.

Business identification is written once and repeated word for word on every page: legal
name, legal form, KvK number, VAT identification number, address and contact email.

Every claim in the documents matches what the applications actually do. Where a document
promised something the code does not do, the document changes — except for closed-licence
retention, which becomes a promise across every Product because mvdmio intends to build
it, and the two application changes it depends on are recorded as ideas in the
application repository.

A Product is named "mvdm.io Compliance" on first use in a section and stands bare after
that.

## User Stories

1. As a customer who bought mvdm.io Statistics, I want the Terms of Service to cover the
   Product I actually bought, so that I have a contract at all.
2. As a customer who bought mvdm.io Health Check, I want a Data Processing Agreement
   covering the screenshots it takes of my sites, so that I can answer my own auditor.
3. As a customer of any Product, I want one Terms of Service rather than five, so that I
   read the contract once.
4. As a customer of one Product who later buys a second, I want the same contract to
   carry over, so that buying more does not mean reading more.
5. As a reader of the Terms of Service, I want rules that apply to one Product only to
   sit under that Product's heading, so that I can tell what applies to me.
6. As an individual buying mvdm.io Commonplace, I want the 14 days to change my mind that
   the law gives me, so that a yearly fee is not an irreversible decision.
7. As an individual buying mvdm.io Commonplace, I want to be told by email when the terms
   change, so that a contract I agreed to does not change silently.
8. As a business customer, I want to see plainly that no refunds is the rule, so that I
   plan the purchase around a full year.
9. As any customer, I want the two exceptions to no refunds stated in the same clause as
   the rule, so that I do not have to hunt for them.
10. As any customer, I want a liability cap that does not try to exclude intent or gross
    negligence, so that the clause is one a court will honour.
11. As a buyer comparing suppliers, I want the trader's legal name, form, KvK number, VAT
    number and address on every Legal page, so that I know who I am contracting with.
12. As a finance officer, I want the VAT identification number published, so that I can
    process the invoice.
13. As a buyer, I want the same identification wording on every page, so that the pages
    obviously describe one trader.
14. As a data protection officer at a customer, I want to know that hosting is one
    dedicated server in Nuremberg, Germany, so that I can record the processing location.
15. As a data protection officer, I want the Data Processing Agreement to say which
    Products it covers, so that I know where my instruction runs.
16. As a data protection officer, I want to know that mvdm.io Commonplace sits outside the
    Data Processing Agreement, so that I do not expect a processor agreement that does not
    exist.
17. As a data protection officer, I want the technical measures list to describe measures
    that exist, so that I am not relying on a control that was never built.
18. As a data protection officer, I want to know there is no encryption at rest and no
    backup, so that I can assess the risk honestly instead of discovering it later.
19. As a data protection officer, I want to be emailed when the Subprocessor list changes,
    so that I can act before the change takes effect.
20. As a data protection officer who objects to a new subprocessor, I want the right to
    end the contract, so that objecting means something.
21. As a customer, I want the Subprocessor list grouped by application, so that I only read
    the entries for the Products I bought.
22. As a customer of several Products, I want the shared providers stated once rather than
    repeated under every Product, so that the page stays short enough to read.
23. As a customer of mvdm.io Commonplace, I want Google Books named as a recipient, so that
    I know a book search leaves the building.
24. As a customer of mvdm.io Health Check, I want Qualys SSL Labs named, so that I know my
    hostnames are submitted for grading.
25. As a customer of mvdm.io Translation Tools, I want xAI named for that Product, so that
    I know where my translation text goes.
26. As a customer, I want Cloudflare described as DNS, TLS proxy and email, so that the
    list reflects that all traffic passes through it.
27. As a customer, I want to know that error tracking is self-hosted on mvdmio's own
    machine, so that I do not count it as another third party.
28. As a customer whose licence ended, I want to know my data is kept for 365 days, so that
    I can come back without losing it.
29. As a customer whose licence ended, I want to know my data is deleted after 365 days, so
    that I can tell my auditor when the processing stops.
30. As a customer who renews inside those 365 days, I want the countdown to stop, so that a
    late renewal does not cost me my records.
31. As a customer, I want the same retention rule for every Product, so that I do not track
    five different clocks.
32. As a customer, I want to know I can ask for my data back by email, so that I am not
    locked in while no export feature exists.
33. As a person who signs in, I want the Privacy Notice to say what request analytics
    record, including that my email address may stand in for my name, so that I know what
    is logged about me.
34. As a person who signs in, I want to know the sign-in cookie is the only cookie mvdmio
    sets, so that I understand why there is no consent banner.
35. As a user of an assistant, I want to know a Platform Administrator can read those
    conversations, so that I do not treat the assistant as private.
36. As a user of an assistant, I want to know the AI providers are not promised never to
    train on my content, so that I decide what to paste in.
37. As a visitor to the marketing site, I want to know fonts load from Google, so that the
    one external request is disclosed.
38. As a customer, I want each Product written as "mvdm.io Compliance" on first use, so
    that a generic name is tied to its supplier.
39. As a reader, I want the prefix dropped after first use in a section, so that the
    contract stays readable.
40. As a customer, I want every Legal page to carry the same effective date after this
    revision, so that I can see they were revised together.
41. As mvdmio, I want a record in the application repository of the hosted error-tracking
    script still loading in four applications, so that the Subprocessor list becomes true.
42. As mvdmio, I want a record in the application repository of retention being missing
    from four Products, so that the retention promise becomes true.
43. As a customer, I want to know there is no service level agreement, so that I do not
    assume an uptime promise that was never made.
44. As a customer of mvdm.io Compliance, I want to know that anyone on my account can read
    a Person's notes, so that I decide what my team writes there.
45. As a customer, I want to be told I am responsible for the personal data I enter, so
    that the boundary between our roles is clear.
46. As a customer outside the Netherlands, I want to know Dutch law governs, with mandatory
    consumer and data-protection rights untouched, so that I know where I stand.
47. As a customer of mvdm.io Health Check using its Azure telemetry, I want to know that
    connection is to my own tenant, so that I do not treat Microsoft as mvdmio's
    subprocessor.

## Implementation Decisions

### Scope

- The change edits the five Legal pages under `legal/` in this repository, and adds two
  idea documents to the application repository. Nothing else in either repository
  changes.
- No Legal page is added or removed, so `sitemap.xml` is untouched.
- The homepage and the five Landing pages are untouched. Every price line keeps its
  existing VAT wording.
- The `mvdm.io ` name prefix applies to the Legal pages only in this pass. Applying it
  across the marketing site is a separate change.
- Extending the acceptance gate beyond mvdm.io Compliance is application work and is not
  part of this change.

### Shared shape

- Each page keeps its existing head block, skip link, nav, footer and script tag. Only
  the content inside `<div class="prose">`, the page's `<title>`, its
  `<meta name="description">`, and its effective date change.
- The effective date on all five pages becomes 29 August 2026.
- Business identification is one block of the same wording on every page: trade name
  mvdm.io, sole proprietorship (eenmanszaak), KvK 86594737, VAT identification number,
  De Vierakkers 15, 7766 BL Nieuw-Schoonebeek, the Netherlands, michiel@mvdm.io. Email is
  the only contact channel.
- The VAT identification number is the one value not yet known. Write it as a clearly
  marked placeholder and do not publish the pages until it is filled in.
- A Product is written "mvdm.io Compliance" on first use within a section and bare
  afterwards. The brand mvdmio and the trade name mvdm.io keep the meanings the glossary
  gives them.

### Terms of Service

- One contract covering mvdm.io Compliance, mvdm.io Translation Tools, mvdm.io Health
  Check, mvdm.io Statistics and mvdm.io Commonplace. The general text names no single
  Product.
- Compliance subheading: the 30-day trial, offered for that Product alone; billing per
  Framework; AI credit included with each Framework and buyable in packs.
- Consumer purchase subheading, covering mvdm.io Commonplace: a 14-day right of
  withdrawal with a refund, and notice of a replaced contract by email rather than by
  continued use.
- No refunds stays the general rule, stated with its two exceptions in the same clause —
  the consumer withdrawal right, and ending the contract after objecting to a new
  subprocessor.
- Liability keeps the twelve-month fee cap and the exclusion of indirect loss, with a
  carve-out for intent, gross negligence, death or personal injury, and rights that
  cannot be waived. The carve-out applies to every customer, not only consumers.
- Retention is one rule for every Product: 365 days from the licence end date, then
  deletion of that account's data for that Product. A new current licence inside the
  window stops the countdown. Sign-in accounts and users survive that deletion.
- Return of data is by email request during an active licence or the retention window,
  for every Product, because no export feature exists in any of them.
- The AI clause names xAI for the mvdm.io Compliance and mvdm.io Translation Tools
  assistants, and Anthropic for the mvdm.io Compliance import. It keeps the existing
  sentence that neither provider is promised never to train on content. The claim that
  snapshot prose goes to Anthropic is removed.
- Acceptable use gains a line making the customer responsible for the personal data they
  enter.
- No service level agreement is promised, for any Product.
- Every backup claim is removed.
- Dutch law and Dutch courts, keeping the existing rider on mandatory consumer and
  data-protection rights.

### Privacy Notice

- Controller processing across every application: sign-in and account administration,
  billing through Stripe, first-party request analytics, and the marketing site.
- Request analytics are described as they behave: the signed-in user's name, or their
  email address where no name is available; the full URL including its query string;
  timing; and tags. mvdm.io Commonplace sends nothing.
- The strictly necessary sign-in cookie is the only cookie mvdmio sets. No consent banner.
- Google Fonts on the marketing site stays.
- Platform Administrator read access to assistant conversations covers mvdm.io Compliance
  and mvdm.io Translation Tools.
- Hosting is a Hetzner dedicated server in Nuremberg, Germany.
- Retention points at the one closed-licence rule.

### Data Processing Agreement

- Covers mvdm.io Compliance, mvdm.io Statistics, mvdm.io Health Check and mvdm.io
  Translation Tools. mvdm.io Commonplace is named as outside it, because there mvdm.io
  decides the purposes itself and there is no customer organisation to instruct it.
- Data categories are described per Product: workforce records and free text in
  Compliance; the customer's own end users in Statistics; browser screenshots of the
  customer's sites, including pages behind a sign-in, in Health Check; translation text in
  Translation Tools.
- Technical measures list only measures that exist: transport encryption, bcrypt password
  hashing, account-scoped tenancy, sign-in through one dedicated service, hosting on a
  dedicated server in Germany, application logs kept 7 to 14 days, and deletion after the
  retention window. The agreement states plainly that there is no encryption at rest and
  no backup.
- mvdm.io Compliance has no field-level permission model: anyone on the account can read
  a Person's notes. The agreement says so.
- Subprocessor changes: mvdmio emails account owners when the Subprocessor list changes. A
  customer who objects may end the contract, with no refund for time already paid.
- International transfers name Stripe, Cloudflare, xAI and Anthropic as processing in the
  United States, relying on those providers' own standard contractual clauses.
- Health Check's optional Azure telemetry connects to the customer's own tenant, so
  Microsoft is not a subprocessor of mvdm.io.
- Every backup claim is removed, including the sentence placing backup media outside the
  deletion job.

### Subprocessor list

Grouped by application, not by provider.

- **Every Product**: Hetzner (hosting in Nuremberg, Germany), Cloudflare (DNS, TLS proxy
  in front of every application, and transactional email), Stripe (payments, United
  States).
- **mvdm.io Compliance**: xAI (assistant, speech to text, text to speech), Anthropic
  (Confluence import extraction).
- **mvdm.io Translation Tools**: xAI (assistant and automatic translation).
- **mvdm.io Commonplace**: Google Books (book search and metadata).
- **mvdm.io Health Check**: Qualys SSL Labs (TLS grading of customer hostnames).
- **mvdm.io Statistics**: nothing beyond the shared three.

Self-hosted error tracking runs on mvdmio's own machine and is not listed. Hosted error
tracking is not listed, because the browser script that still loads it is being removed.

### Application repository

Two idea documents under `.agents/ideas/shared/`, in the format the existing idea
documents use — an `# Idea — <name>` heading, a `Status: idea` line, then Motivation,
Goal, Decisions, Out of scope and Open questions.

1. Remove the hosted error-tracking browser script. It still loads in seven layout files
   across Auth, Health Check, Statistics and Translation Tools, although server-side error
   tracking moved to the self-hosted tracker. Until it is gone, every page load in those
   four applications sends a user's address to a third party the Subprocessor list does
   not name.
2. Extend closed-licence retention to the four Products that lack it. The retention job
   runs for Compliance only. The Legal pages now promise the same 365-day rule for every
   Product, so Translation Tools, Health Check, Statistics and Commonplace each need the
   equivalent deletion.

## Testing Decisions

This repository has no build step and no test framework, so verification is serving the
tree and reading it. The seam is the served page.

- Serve the repository root with a static file server and open each of the five Legal
  pages. Read each one end to end. These are contract documents; the check is whether the
  words are right, and no tool does that.
- Cross-read the five pages for the identification block. The legal name, form, KvK
  number, VAT number, address and email must be identical on every page, character for
  character.
- Cross-read for Product coverage. No general clause may name one Product, and every
  Product-specific rule must sit under a subheading naming that Product.
- Cross-read for the retention rule. The Terms, the Privacy Notice and the DPA must state
  the same 365-day rule in the same terms.
- Cross-read for subprocessors. Every provider in the DPA's transfer clause must appear on
  the Subprocessor list, and no provider may appear on one page and not the other.
- Search all five pages for the word "backup" and confirm no hit.
- Search for "EEA" and confirm hosting is named as Nuremberg, Germany instead.
- Follow every in-body link on each page and confirm none reaches a missing page. The
  five Legal pages link to each other and to the About page.
- Check each page at a desktop width and at roughly 375 pixels wide, and tab through the
  links to confirm the focus ring stays visible. This matches how the rest of the site is
  verified.
- Confirm the VAT placeholder is gone before publishing.

There is no prior art for automated tests here, because there are none. A throwaway
link-crawl script for the one-off check is fine and is not committed.

## Out of Scope

- Any change to the homepage or the five Landing pages, including every price line. The
  VAT wording on those pages stays as it is.
- Applying the `mvdm.io ` name prefix across the marketing site — nav, page titles,
  headings, meta descriptions. That is a separate pass with a visual result to look at.
- Any code change in the application repository. This change adds two idea documents
  there and nothing else.
- Extending the Terms and DPA acceptance gate beyond mvdm.io Compliance.
- Building backups, encryption at rest, data export, self-service account deletion, or the
  subprocessor-change mailing. The documents describe what exists, and the two promises
  that run ahead of the code are recorded as ideas.
- Adding, removing or renaming a Legal page.
- Tax advice. The VAT position stated is mvdmio's own: it charges VAT and will keep doing
  so.

## Further Notes

- The VAT identification number is the one blocker. Everything else can be written now.
- Two statements in these documents run ahead of the code, both knowingly. Closed-licence
  retention is promised for every Product but implemented for Compliance alone. The
  Subprocessor list omits hosted error tracking, which four applications still load in the
  browser. Both are recorded as ideas in the application repository, and both should be
  closed soon, because until they are the published pages are wrong.
- The application repository holds live secrets in plaintext, including a Stripe live key
  and several API keys. That is unrelated to this change and is not addressed by it, but
  it undercuts the technical measures the DPA describes and is worth handling on its own.
- The glossary in `CONTEXT.md` was updated during the session that produced this spec.
  Terms of Service, Data Processing Agreement, Subprocessor list, Legal page, Company
  details and mvdm.io were rewritten to cover every Product, and Closed-licence retention
  and Consumer purchase were added.
