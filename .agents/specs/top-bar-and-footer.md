# Quieter top bar and footer

Status: ready-for-agent

## Problem Statement

The top bar lists too many links. All five Products sit beside Open source, Blog, About, and a Get started button. On a wide screen the row wraps. On a phone every one of those links sits behind the same menu button.

The footer is a single wrapping row of mixed jobs: the wordmark, a “Built by…” line, About, Resume, Blog, five Legal pages, and an email. About and Blog appear in both the top bar and the footer. Resume appears only in the footer. Open source appears only in the top bar.

A visitor who wants a Product has to pick it out of that pile. A visitor who wants a Legal page has to pick it out of the same pile as Resume and Blog.

## Solution

Give the top bar two rows, and give the footer two lines.

The upper row of the header holds Open source, Blog, About, and Resume. That row stays visible on a phone. The lower row holds the five Product names and Get started. On a phone, a menu button hides only that lower row. Get started still opens Compliance.

The footer has two lines. The first line is the wordmark, “Built by Michiel van der Meer”, and the email. The wordmark is not a link. The country is not in the footer. The second line is the five Legal pages, in this order, under these labels: Terms of Service, Privacy Notice, Data Processing Agreement, Subprocessors, Company details. About, Resume, Blog, and Open source do not appear in the footer.

Every page uses this header and this footer. Page bodies, prices, Legal wording, and existing addresses stay as they are. Resume stays at its current address. There is no Products index and no dropdown.

A prototype of four reachability patterns, including the rejected ones, is in `.agents/prototypes/top-bar-reachability/`. Playing with it settled variant C (the two-row header) and then the two-line footer.

## User Stories

1. As a visitor, I want the five Products listed by name in the header, so that I can open a Landing page without opening a menu or another index.
2. As a visitor, I want Get started still in the header, so that I can start Compliance in one click.
3. As a visitor, I want Get started to open Compliance from every page, so that the button does not change meaning as I move around the site.
4. As a visitor, I want Open source in the header’s upper row, so that I can reach it without scrolling to the footer.
5. As a visitor, I want Blog in the header’s upper row, so that I can reach the posts without scrolling to the footer.
6. As a visitor, I want About in the header’s upper row, so that I can reach the founder page without scrolling to the footer.
7. As a visitor, I want Resume in the header’s upper row, so that I can reach past client and employer work from every page.
8. As a visitor, I do not want About, Blog, Resume, or Open source in the footer, so that the footer is not a second copy of the header.
9. As a visitor on a phone, I want Open source, Blog, About, and Resume still visible without opening a menu, so that those pages are not buried with the Products.
10. As a visitor on a phone, I want a menu button that reveals the five Products and Get started, so that the Product names do not crowd the first screen.
11. As a visitor on a phone, I want the wordmark still visible beside that menu button, so that I can return home without opening the menu.
12. As a visitor, I want the header wordmark to open the homepage, so that I can start again from anywhere.
13. As a visitor, I want the same header on the homepage, every Landing page, the blog, a post, About, Open source, Resume, every Legal page, and the not-found page, so that I do not relearn the site when the page changes.
14. As a visitor, I want the same footer on all of those pages, so that Legal pages and the email are always in the same place.
15. As a visitor, I want the footer’s first line to name mvdmio, say who built the site, and give the email, so that I can see who I am dealing with and write to them.
16. As a visitor, I want the footer wordmark not to be a link, so that I do not have two competing home links stacked at the bottom of the page.
17. As a visitor, I want the footer email to open a mail message, so that I can contact Michiel without copying the address.
18. As a visitor, I want the footer’s second line to list Terms of Service, so that I can read the contract from any page.
19. As a visitor, I want the footer’s second line to list the Privacy Notice, so that I can read how personal data is handled.
20. As a visitor, I want the footer’s second line to list the Data Processing Agreement, so that I can read the processor terms.
21. As a visitor, I want the footer’s second line to list Subprocessors, so that I can open the Subprocessor list.
22. As a visitor, I want the footer’s second line to list Company details, so that I can open the identification page.
23. As a visitor, I want those five Legal labels written in full, so that I do not have to guess what “DPA” or “Legal” means.
24. As a visitor, I want a spaced dash between items on each footer line, so that the two lines read as lists rather than as a paragraph.
25. As a visitor on a narrow screen, I want each footer line to wrap on its own, so that identity does not mix into the Legal labels.
26. As a visitor, I do not want “the Netherlands” in the footer, so that the first line stays the three facts: brand, builder, email.
27. As a Customer, I want print of a Legal page to keep hiding the header and the footer, so that the PDF is still the document body only.
28. As a keyboard user, I want a visible focus ring on every header and footer link and on the menu button, so that I can see where I am.
29. As a keyboard user, I want the skip link still first, so that I can jump to the page body without tabbing the new upper row.
30. As a keyboard user, I want to tab the upper row, then the wordmark, then the Product links and Get started, so that the reading order matches the layout.
31. As a visitor who prefers reduced motion, I want the header and footer not to add new animation, so that this cleanup does not introduce motion.
32. As a visitor, I do not want a dropdown or a “More” menu, so that every Product name stays visible on a wide screen.
33. As a visitor, I do not want a Products index, so that a Product link goes straight to that Product’s Landing page.
34. As a visitor following an old Resume address, I want `/projects/` still to work, so that bookmarks and search results do not break.
35. As a visitor on a Landing page, I want the header Product links still to use each Product’s name, so that the link matches the page I am about to open.
36. As a visitor who opens the phone menu, I want Get started still at the end of that list, so that the primary action is where it is today.
37. As a maintainer adding a page, I want one header and one footer to copy, so that I do not invent a second nav.
38. As a maintainer, I want the shared stylesheet to carry the new header and footer layout, so that a later page does not grow a page-level style block.
39. As a maintainer, I want the shared script to stay the phone menu toggle, so that this cleanup does not add a second behaviour file.

## Implementation Decisions

- Treat this as a change to the shared site header and footer that already exist on every page. That is the only place this change belongs. Do not add a generator, a component system, or a second stylesheet for one section of one page.
- Copy the same header markup and the same footer markup onto every page, as the site already does. Update the agent instructions that tell a later editor how to add a page, so they copy this header and footer rather than the old eight-link bar.
- Keep the skip link as the first control in the page. Do not move it into the new upper row.
- The header wordmark stays a link to the homepage.
- Put the upper row inside the existing site header, above the wordmark row. It is a list of links, not a second site navigation landmark. The existing navigation element still wraps the five Product links and Get started.
- On a phone, the existing menu button and the existing breakpoint stay. They hide and show only that Product navigation. The upper row stays visible. The button’s accessible name and its connection to the Product list stay as they are.
- Upper row labels and order: Open source, Blog, About, Resume. Resume still points at the current Resume address. Open source, Blog, and About still point at their current addresses.
- Lower row labels and order: Compliance, Translation Tools, Health Check, Statistics, Commonplace, then Get started. Get started still points at the Compliance application.
- Style the upper row in the site’s mono small-caps voice, quieter than the Product links. Use the existing design tokens. Do not hardcode a Product accent. Do not add dark mode.
- Footer structure is two stacked lines, not one wrapping row. Line 1: the wordmark as text (not a link), “Built by Michiel van der Meer”, then a mailto link for michiel@mvdm.io. Line 2: the five Legal pages in the order and labels listed in the Solution. A spaced dash separates items on each line. Each line wraps on its own on a narrow screen.
- Keep print rules that already hide the skip link, the site header, the website footer, and the Download PDF control. A two-row header and a two-line footer must still disappear in print.
- Keep visible focus rings. Do not add animation. If a transition is unavoidable, disable it when the visitor prefers reduced motion.
- Do not add a Products index. Do not add a dropdown or disclosure in the header or footer.
- Do not ship the prototype script, the prototype stylesheet, or the prototype Products index. The playable record is `.agents/prototypes/top-bar-reachability/`.
- The prototype’s floating switcher and dark “PROTOTYPE” strip are not part of the design.

## Testing Decisions

There is no test framework in this repository. Verification is serving the tree and looking, as the agent instructions already describe. Do not add a committed test suite.

A good check looks at what a visitor sees and can open, not at class names:

- On a wide screen, the header shows an upper row of Open source, Blog, About, and Resume, and a lower row of the five Product names and Get started.
- Each of those links opens the matching page or, for Get started, the Compliance application. None 404.
- The footer has two lines. Line 1 is the wordmark, “Built by Michiel van der Meer”, and the email. Line 2 is the five Legal labels. The wordmark in the footer does not navigate. The email opens a mail message.
- The footer does not contain About, Resume, Blog, or Open source.
- The same header and footer appear on the homepage, one Landing page, one post, About, Open source, Resume, one Legal page, and the not-found page.
- At about 375px, the upper row is still visible. The Product names and Get started are behind the menu button. Opening the button shows them. The wordmark remains visible.
- Tab order reaches the skip link first, then the upper row, then the wordmark and Product links. Every interactive control shows a focus ring.
- Print preview of a Legal page still omits the header and the footer.
- A reduced-motion preference does not leave a new animation running in the header or footer.

Prior art: this repository has no automated tests for pages. The usual check is a static file server at the repository root, then click-through at a desktop width and at a phone width. Repeat that here, and include a Legal page print preview because print already hides the header and footer.

## Out of Scope

- Changing page bodies, prices, or Legal wording.
- Renaming the Resume address, or renaming any other existing address.
- A Products index, a Products dropdown, a “More” menu, or any other disclosure in the header or footer.
- Putting the legal index in the footer.
- Changing where Get started goes.
- Marking the current page in the header.
- Dark mode, a theme toggle, or a new typeface.
- A site generator or a shared include for the header and footer.
- Shipping anything from the prototype folder.
- A committed test suite.

## Further Notes

The prototype asked how people reach pages that lose a primary place in the top bar. Four structurally different patterns were played on the real pages: a Products dropdown, a Products index, a two-row header, and Flagship products plus a More menu. The two-row header was the one that stuck. The footer was then set to the two lines above. The rejected patterns are still in the prototype folder so a later editor can see what was tried.

The Subprocessor list’s footer label is “Subprocessors”, matching the current site and the wording chosen in this session. The page it opens is still the Subprocessor list.
