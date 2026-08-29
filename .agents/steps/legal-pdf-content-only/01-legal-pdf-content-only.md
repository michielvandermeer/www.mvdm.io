# 01 — Legal page PDFs contain only the document

Status: done

## What to build

A printed Legal page — the file a Customer downloads, and a browser print of the same page — is the document: the small label above the title, the title, the effective-date line, and the body that follows. The skip link, site navigation, website footer, and Download PDF control do not appear. Screen presentation does not change.

This is a print-media change, not a second document template. Headless Chromium already prints each Legal page at deploy and already applies print media. Teach the shared stylesheet to show the document and hide the website controls. Do not add a page-level style block or a second script.

In print, hide the skip link, the site navigation, and the website footer. That rule is site-wide; printing any page will also lose those controls. That side effect is accepted. In print, also hide the Download PDF control on each of the five Legal pages.

Mark that control with a shared class so the rule is explicit and does not hide unrelated buttons. Put the class on the existing wrapping paragraph around the Download PDF link on each of the five Legal pages (Terms of Service, Privacy Notice, Data Processing Agreement, Subprocessor list, Company details). Hide that wrapper in print so the button and the empty gap under the effective date both go. Use the same class name on all five: `print-hide`. Do not put that class on the legal index cards — those cards are not printed into a PDF; leave the index’s PDF links and the pack download as they are.

Leave the heading and the body visible, including trader identification that lives in the document itself and links that sit inside the body (for example a Terms of Service reference to Company details).

Tighten print spacing that exists only to clear screen controls: the extra bottom padding on `.prose` above the footer, and the screen `min-height` that pins the footer to the viewport. If hiding the nav leaves a large empty band above the heading, reduce `.page-head` top padding in print only enough that page one starts on the document heading. Do not otherwise restyle the document for print: no new letterhead, no running headers, no page numbers, no different type.

Do not change on-screen layout, focus rings, or reduced-motion rules. Each Legal page still offers Download PDF on screen. The website footer stays on screen. Tabbing the on-screen Legal page still shows a focus ring on the download control and on footer links.

Prefer not to change the deploy render script. Puppeteer’s `page.pdf` already uses print media; change the workflow only if a local render shows the print rules do not apply unless the script sets a media type or a viewport.

Do not change PDF file names, Legal page addresses, or the pack zip name and layout. Do not commit generated PDFs or the zip. The next deploy rebuilds them from the pages, as it does today.

Record in `AGENTS.md` under Legal documents that a PDF is the printed document body, not a print of the live page’s website controls, and that the wording in the PDF remains the wording on the page.

## Footprint

Projects: mvdm.io marketing site

- `assets/css/site.css` — no `@media print` today; skip-link, `.site-nav`, `.site-footer`, `.page-head`, `.prose`, `body` min-height / flex column, `:focus-visible`, `prefers-reduced-motion`
- `legal/terms/index.html` — wrapping `<p>` around Download PDF in `.page-head`
- `legal/privacy/index.html` — wrapping `<p>` around Download PDF in `.page-head`
- `legal/dpa/index.html` — wrapping `<p>` around Download PDF in `.page-head`
- `legal/subprocessors/index.html` — wrapping `<p>` around Download PDF in `.page-head`
- `legal/company/index.html` — wrapping `<p>` around Download PDF in `.page-head`
- `AGENTS.md` — Legal documents section

## Acceptance criteria

- [ ] Extracted text from each of the five generated PDFs does not contain “Download PDF”.
- [ ] Extracted text from each of the five generated PDFs does not contain the footer line “Built by Michiel van der Meer, the Netherlands”.
- [ ] Extracted text from each of the five generated PDFs does not contain the words “Skip to content”.
- [ ] Extracted text from each of the five generated PDFs does contain that page’s title and its effective-date line.
- [ ] The last page of each PDF ends on document text, not on footer links such as Resume or About.
- [ ] The first page of each PDF starts on the document heading, not on a menu control.
- [ ] On screen, each Legal page still shows Download PDF and the website footer.
- [ ] On screen, the legal index still links each PDF and the pack.
- [ ] Tabbing the on-screen Legal page still shows a focus ring on the download control and on footer links.
- [ ] A browser print of a Legal page matches the generated PDF: document only, no website controls.
- [ ] PDF file names, Legal page addresses, and the pack zip name are unchanged. No PDF or zip is committed.
- [ ] `AGENTS.md` Legal documents section states that a PDF is the printed document body, not a print of the live page’s website controls, and that the wording in the PDF remains the wording on the page.
- [ ] On-screen layout, reduced-motion behaviour, and focus rings are unchanged. Print rules live in the shared stylesheet, not in a page-level style block or a second script.

## Outcome

Print media in `assets/css/site.css` now hides `.skip-link`, `.site-nav`, `.site-footer`, and `.print-hide`, and drops screen-only spacing (`body` min-height / flex pin, `.prose` bottom padding, `.page-head` top padding). Each of the five Legal pages marks the Download PDF wrapper with `class="print-hide"`. The legal index cards were left alone. `AGENTS.md` Legal documents section records that a PDF is the printed document body, not a print of the live page’s website controls.

Local verification: served the tree, rendered the five Legal URLs to PDF with headless Chromium (same margins/format as Pages deploy; used system `/usr/bin/chromium` because the Puppeteer-bundled Chrome cache was incomplete). Extracted text from each PDF had the page title and effective date, and did not contain “Download PDF”, “Built by Michiel van der Meer, the Netherlands”, or “Skip to content”. First page started on the document heading; last content page ended on document text. Generated PDFs were deleted and remain gitignored. Deploy workflow was not changed — Puppeteer `page.pdf` already applies print media.

Footprint matched the code.
