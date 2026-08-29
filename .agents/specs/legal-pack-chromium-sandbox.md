# Legal pack deploy starts Chromium without a sandbox

Status: ready-for-agent

## Problem Statement

The Pages deploy workflow is the only build step on this site. On every push to the default branch it is supposed to print each of the five Legal pages to a PDF, zip those five files into the legal pack, and then publish the tree. That step currently fails before any PDF is written.

GitHub-hosted runners now use Ubuntu 24.04. That image's AppArmor policy blocks Chromium's usual sandbox. The workflow launches Chromium through Puppeteer with no extra flags, so Chromium exits with "No usable sandbox" and the job dies. Upload and Pages deploy never run.

The live site is therefore stuck on the last successful deploy. That deploy already has the five Legal pages, but it does not have the legal index, the five PDFs, or the pack. A visitor who follows a PDF link, or a Product or the sign-in service that fetches the pack at its stable URL, gets a missing page.

Failed run: GitHub Actions run 33267030685, 29 August 2026, on commit a370138. The render step installed Puppeteer 23.9.0, then died at `puppeteer.launch()`.

## Solution

On the GitHub-hosted runner, start Chromium without its process sandbox when the workflow prints the Legal pages.

The runner is an ephemeral, isolated virtual machine. The pages it prints are this repository's own Legal pages, served from localhost. Chromium's own error text names `--no-sandbox` as the immediate workaround for this AppArmor restriction. Pair it with `--disable-setuid-sandbox`, which is the usual companion flag in this situation.

Nothing else about the legal pack changes. The five PDFs keep their names, A4 size, margins, and background printing. The pack stays a flat zip of those five files at the same URL. The five Legal pages and the legal index stay as committed. Puppeteer's version, the runner image, and the local HTTP server stay as they are.

## User Stories

1. As a maintainer, I want a push to the default branch to finish the Pages deploy, so that the public site is not left on an older commit.
2. As a maintainer, I want the render step to start Chromium on Ubuntu 24.04, so that the job does not die at launch.
3. As a maintainer, I want a failed Chromium launch to still fail the job, so that a broken pack is never published.
4. As a maintainer, I want a successful run to write one PDF beside each Legal page, so that a page and its PDF are published together.
5. As a maintainer, I want those five PDFs zipped into the legal pack before upload, so that the pack is never older than the pages it contains.
6. As a visitor, I want `/legal/` to exist on the public site, so that I can find the five Legal pages and the pack from one place.
7. As a visitor, I want to download the Terms of Service as a PDF, so that I can keep the contract I agreed to.
8. As a visitor, I want to download the Privacy Notice as a PDF, so that I can file how mvdm.io processes personal data.
9. As a visitor, I want to download the Data Processing Agreement as a PDF, so that I can give it to my auditor.
10. As a visitor, I want to download the Subprocessor list as a PDF, so that I can record which third parties process customer data.
11. As a visitor, I want to download Company details as a PDF, so that I can record who I am contracting with.
12. As a visitor, I want one zip of all five, so that I do not download each document by hand.
13. As a visitor, I want each PDF URL to stay where the Legal page already points, so that a bookmark I make today still works after this fix.
14. As a Product or the sign-in service that links the pack, I want the pack URL to stay `https://mvdm.io/legal/mvdmio-legal-pack.zip`, so that I do not have to change the URL I already ship.
15. As a data protection officer, I want the PDF of a Legal page to show the same wording as the HTML page, so that I am not holding two different contracts.
16. As a data protection officer, I want the PDF to include the page's print background, so that the document still looks like the published page.
17. As a reader of a printed Legal page, I want A4 with the same margins the workflow already chose, so that this fix does not reflow the document.
18. As a maintainer, I want the PDFs and the zip to stay out of git, so that a page and its PDF cannot drift by a later hand edit.
19. As a maintainer, I want the workflow to keep serving the checkout over HTTP while it prints, so that root-relative stylesheets and navigation still resolve.
20. As a maintainer, I want to be able to run the same workflow by hand, so that I can republish the pack without a dummy commit.
21. As a maintainer, I want this change to keep using Ubuntu latest, so that we do not pin an older runner image that will itself go away.
22. As a maintainer, I want this change to keep the Puppeteer version already in the workflow, so that a sandbox fix is not mixed with an upgrade.
23. As a visitor, I want the five Legal pages themselves unchanged, so that a contract I already read does not move while we fix the printer.
24. As a maintainer, I want later Legal page edits to still rebuild the PDFs and the pack on the next deploy, so that the original point of the pack remains.

## Implementation Decisions

- The only edit is the Chromium launch in the Pages deploy workflow's "Render legal PDFs and build the legal pack" step.
- Launch Chromium with these two flags and no others:

```js
puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
```

- A launch failure must still fail the step. Do not catch the error and continue. The zip must not run against missing files.
- Do not pin the runner to Ubuntu 22.04. That only hides the AppArmor restriction until the image goes away.
- Do not install a setuid `chrome-sandbox` and point `CHROME_DEVEL_SANDBOX` at it. That needs root on the runner and another moving part. The pages being printed are this site's own Legal pages on localhost, so disabling the process sandbox on an ephemeral GitHub-hosted runner is the fit.
- Do not upgrade Puppeteer. The deprecation warning on 23.9.0 is not why the job fails.
- Do not change the workflow triggers, the local HTTP server, the wait for `/legal/`, the five directory-to-filename pairs, the PDF format, the zip command, or the upload and deploy steps.
- Do not add, remove, or rename a Legal page, a PDF filename, or the pack URL.
- Do not commit a PDF or the zip. They remain gitignored deploy output.

## Testing Decisions

This repository has no test framework. The Pages deploy workflow is the only build. The check is therefore a real run of that workflow, then the published URLs.

There is no prior art for an automated test of this step. The workflow runs on push to `main` or `master`, and on `workflow_dispatch`. A pull request does not exercise it. The proof is a successful run after the change lands on the default branch.

- The "Render legal PDFs and build the legal pack" step must exit 0. Chromium must not print "No usable sandbox".
- The zip command in that step must succeed. If a PDF is missing, the job fails, as it does today.
- The upload and Pages deploy steps must run. A green render step that then skips deploy is not done.
- After the public site updates, each of these URLs must return a document, not the site's 404 page:
  - the legal index
  - each of the five Legal pages
  - each Legal page's PDF, at the filename that page already links
  - the legal pack zip
- Open one PDF and confirm it is the matching Legal page, A4, with background paint. Do not re-check layout of pages this change does not touch.
- Confirm git still ignores the PDFs and the zip. No new PDF or zip appears in the commit.
- Do not try to reproduce the AppArmor failure on a developer machine. The failure is a property of the GitHub-hosted Ubuntu 24.04 image.

## Out of Scope

- Upgrading Puppeteer, Node, or the `actions/checkout` / `actions/configure-pages` versions. Those show deprecation warnings; they are not this failure.
- Pinning `runs-on` to Ubuntu 22.04.
- Adding a pull-request check or a test suite for the legal pack.
- Changing Legal page copy, the legal index, prices, or any other page.
- Filling in the VAT identification placeholder on the Legal pages.
- Renaming the pack URL. The Products and the sign-in service already treat that URL as a constant.
- Printing anything other than the five Legal pages.
- Dark mode, theming, or any visual change to the HTML site.

## Further Notes

- Chromium's launch error on the failed run pointed at Ubuntu 23.10+ AppArmor user-namespace restrictions and named `--no-sandbox` as the immediate workaround. Puppeteer's troubleshooting page records the same restriction for Chrome-for-Testing binaries on those distros.
- The live `/legal/` URL 404s today because the legal index landed in the same commit as the broken render step. Fixing launch is what first publishes that index, the PDFs, and the pack. The five Legal page URLs are already live from the previous successful deploy.
- `LegalPageUrls` in the `mvdmio-suite` repository is the consumer of the pack URL. This spec does not change that URL.
