# Legal PDFs contain only the document

Status: ready-for-agent

## Problem Statement

A Legal page PDF is a print of that page, made at deploy. The published PDFs currently include website controls as well as the document: the Download PDF button, the site navigation (a wordmark and a menu control), and the website footer (the “Built by Michiel van der Meer…” line and the footer links).

A person who downloads Terms of Service, the Privacy Notice, the Data Processing Agreement, the Subprocessor list, Company details, or the legal pack therefore gets a website printout, not a document. The button in the PDF does nothing useful. The footer is site navigation, not legal text.

The live pages on screen should keep the button and the footer. Only the generated PDFs — and a browser print of the same pages — should drop those website controls.

## Solution

When a Legal page is printed, the output is the document: the heading (the small label above the title, the title, and the effective date) and the body. The skip link, site navigation, website footer, and Download PDF control do not appear.

Screen presentation does not change. Each Legal page still offers Download PDF. The legal index still links each PDF and the pack. PDF addresses and the pack zip stay as they are. The next deploy rebuilds the five PDFs and the pack from the pages, as it does today.

## User Stories

1. As a Customer, I want a Legal page PDF to contain only that document, so that I can file or share it as the published text rather than as a screenshot of the website.
2. As a Customer, I want the Download PDF button omitted from the PDF, so that a dead control does not sit in a filed document.
3. As a Customer, I want the website footer omitted from the PDF, so that site links and the “Built by…” line are not part of the legal text.
4. As a Customer, I want the site navigation omitted from the PDF, so that a wordmark and a menu control do not sit above the document title.
5. As a Customer, I want the skip link omitted from the PDF, so that the on-screen “Skip to content” control does not appear in the file.
6. As a Customer, I want the document title and effective date to remain in the PDF, so that I can see which Legal page I have and from which date it applies.
7. As a Customer, I want the body of the Legal page — including trader identification that lives in the document itself — to remain in the PDF, so that the file matches the published page wording.
8. As a Customer, I want links that sit inside the document body to remain, so that a reference from the Terms of Service to Company details is still there.
9. As a Customer, I want every one of the five Legal page PDFs to follow this rule, so that I do not get a clean Terms of Service and a Privacy Notice that still includes the website frame.
10. As a Customer, I want the legal pack zip to contain the same five cleaned PDFs, so that downloading the pack is equivalent to downloading each file.
11. As a visitor on the website, I want Download PDF still visible on each Legal page, so that I can fetch the file from the screen.
12. As a visitor on the website, I want the website footer still visible on every page, so that I can still reach the Legal pages and contact from the screen.
13. As a visitor on the legal index, I want each card’s PDF link and the pack download still visible, so that I can fetch files from the index.
14. As a visitor who prints a Legal page from the browser, I want the same document-only output as the generated PDF, so that Print and Download PDF agree.
15. As a person who uses an mvdmio Product, I want the pack address the applications already link to stay the same, so that in-app legal downloads do not break.
16. As a maintainer, I want the PDFs still generated at deploy from the live pages, so that a page and its PDF cannot disagree.
17. As a maintainer, I want a later edit to a Legal page to rebuild its PDF without a second process, so that I only change the page.
18. As a maintainer, I want the PDFs and the pack still never committed by hand, so that git does not hold a stale file.
19. As a maintainer, I want on-screen layout, focus rings, and reduced-motion behaviour unchanged, so that this print fix does not restyle the website.
20. As a visitor who prints a non-legal page, I accept that site navigation and the footer may also disappear in print, so that one print rule can serve the Legal page PDFs.

## Implementation Decisions

- Classify this as a print problem, not a second document template. Headless Chromium already prints each Legal page to PDF at deploy, and it already applies print media. Teach print media to show the document and hide the website controls.
- Put the print rules in the shared stylesheet. Do not add a page-level style block. Do not add a second script.
- In print, hide the skip link, the site navigation, and the website footer. That rule is site-wide. Printing any page will also lose those controls. That side effect is accepted.
- In print, hide the Download PDF control on each of the five Legal pages. Mark that control with a shared class so the rule is explicit and does not hide unrelated buttons. Hide the wrapping element around the button too, so print does not leave an empty gap under the effective date.
- Leave the heading and the body visible: the small label above the title, the title, the effective date, and the prose that follows.
- Tighten print spacing that exists only to clear screen controls (for example extra bottom padding above the footer). Do not otherwise restyle the document for print: no new letterhead, no running headers, no page numbers, no different type.
- Do not change on-screen layout, focus rings, or reduced-motion rules.
- Prefer not to change the deploy render script. Change it only if print rules do not apply unless the script sets a media type or a viewport.
- Do not change PDF file names, Legal page addresses, or the pack zip name and layout. The applications that already link the pack keep that address.
- Do not commit generated PDFs or the zip. The next deploy rebuilds them.
- Record in the site’s agent instructions for Legal documents that a PDF is the printed document body, not a print of the live page’s website controls. The wording in the PDF remains the wording on the page.

## Testing Decisions

There is no test framework in this repository. Verification is a local print of the Legal pages, the same way deploy prints them, plus a check of the screen pages. Do not add a committed test suite.

A good check looks at the file a person downloads, not at stylesheet selectors:

- Extracted text from each of the five generated PDFs does not contain “Download PDF”.
- Extracted text from each of the five generated PDFs does not contain the footer line “Built by Michiel van der Meer, the Netherlands”.
- Extracted text from each of the five generated PDFs does not contain the words “Skip to content”.
- Extracted text from each of the five generated PDFs does contain that page’s title and its effective-date line.
- The last page of each PDF ends on document text, not on footer links such as Resume or About.
- The first page of each PDF starts on the document heading, not on a menu control.
- On screen, each Legal page still shows Download PDF and the website footer.
- On screen, the legal index still links each PDF and the pack.
- Tabbing the on-screen Legal page still shows a focus ring on the download control and on footer links.

Prior art: the Pages deploy workflow already prints each Legal page with headless Chromium. Repeat that render locally (serve the tree, print the five Legal page URLs to PDF). The live Terms of Service PDF at the current site was used to confirm the bug: it contains “Download PDF” on the first page and the website footer on the last page.

## Out of Scope

- A separately authored PDF template, letterhead, cover sheet, or running header and footer.
- Page numbers, a table of contents, or print-only bookmarks.
- Changing any PDF or pack URL, or renaming the pack zip.
- Removing Download PDF or the website footer from the screen.
- Generating a PDF of the legal index.
- Hiding in-body links or trader identification that is part of the document text.
- Committing PDFs or the zip.
- Dark mode or a print colour theme.
- Changing Legal page wording.

## Further Notes

Confirmed against the published Terms of Service PDF on 29 August 2026: six A4 pages, “Download PDF” under the effective date, site wordmark and menu control at the top of page one, website footer at the bottom of page six. The shared stylesheet has no print rules today. The render step prints the page as-is.

The legal index lists Download PDF on each card. Those cards are not printed into a PDF. Leave them alone.

Trader identification appears twice on some Legal pages: once in the document body, and again as links in the website footer. The body copy stays. Only the footer goes.
