# 01 — Start Chromium without a sandbox when printing Legal pages

Status: done

## What to build

A push to the default branch must finish Pages deploy. The render step currently dies at `puppeteer.launch()` on GitHub-hosted Ubuntu 24.04 with "No usable sandbox", so upload and deploy never run. After this step, that launch starts Chromium without its process sandbox, the five Legal pages print, the legal pack is zipped, and the tree publishes — including `/legal/`, each Legal page's PDF, and `https://mvdm.io/legal/mvdmio-legal-pack.zip`.

The runner is an ephemeral, isolated virtual machine. The pages it prints are this repository's own Legal pages, served from localhost. Launch Chromium with these two flags and no others, keeping the existing `await` around the call:

```js
puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
```

A launch failure must still fail the step. Do not catch the error and continue. The zip must not run against missing files.

Nothing else about the legal pack changes. The five PDFs keep their names, A4 size, margins, and background printing. The pack stays a flat zip of those five files at the same URL. The five Legal pages and the legal index stay as committed. Puppeteer's version, the runner image, the workflow triggers, the local HTTP server, the wait for `/legal/`, the five directory-to-filename pairs, the zip command, and the upload and deploy steps stay as they are. Do not pin the runner to Ubuntu 22.04, do not install a setuid `chrome-sandbox`, and do not upgrade Puppeteer. Do not commit a PDF or the zip.

## Footprint

Projects: www.mvdm.io (static site; no test suite)

- `.github/workflows/pages-deploy.yml` — `puppeteer.launch` in the "Render legal PDFs and build the legal pack" step

## Acceptance criteria

- [x] `puppeteer.launch` in the Pages deploy workflow passes `args: ["--no-sandbox", "--disable-setuid-sandbox"]` and no other Chromium flags
- [x] A Chromium launch failure still fails the step; there is no catch-and-continue around launch, print, or zip
- [x] Workflow triggers, `runs-on: ubuntu-latest`, Puppeteer 23.9.0, the local HTTP server, the wait for `/legal/`, the five directory-to-filename pairs, PDF format/margins/`printBackground`, the zip command, and the upload and deploy steps are unchanged
- [x] No Legal page, legal index, PDF filename, or pack URL is added, removed, or renamed
- [x] Git still ignores `legal/*/*.pdf` and `legal/mvdmio-legal-pack.zip`; the commit contains neither
- [ ] After the change lands on the default branch, the "Render legal PDFs and build the legal pack" step exits 0 without "No usable sandbox", the zip succeeds, and upload and Pages deploy run
- [ ] After the public site updates, `/legal/`, the five Legal pages, each page's PDF at the filename that page already links, and `/legal/mvdmio-legal-pack.zip` return a document, not the site's 404 page
- [ ] One printed PDF matches its Legal page, is A4, and includes background paint

## Outcome

Edited only `.github/workflows/pages-deploy.yml`: `puppeteer.launch` now passes `args: ["--no-sandbox", "--disable-setuid-sandbox"]` and no other Chromium flags. The async IIFE still has no try/catch, so a launch, print, or zip failure still fails the step. Triggers, `ubuntu-latest`, Puppeteer 23.9.0, the localhost server, `/legal/` wait, the five doc pairs, PDF options, zip, upload, and deploy are unchanged. No Legal pages or the legal index were touched. Confirmed `.gitignore` still covers `legal/*/*.pdf` and `legal/mvdmio-legal-pack.zip`; neither is tracked or in this commit. Post-merge Actions success and live URL/PDF checks remain unverified here — they need a default-branch run (AppArmor failure is not reproducible locally per the spec).
