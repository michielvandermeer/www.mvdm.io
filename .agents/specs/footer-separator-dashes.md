# Footer dashes sit outside the links

Status: ready-for-agent

## Problem Statement

Each footer line uses a spaced dash to break one item from the next. Those dashes currently sit inside the links. A visitor sees the dash underlined with the label. Clicking the dash follows the next link. The dash is meant to be a break between items, not part of a link.

This shows on both footer lines: before the email on the identity line, and before every Legal page after Terms of Service on the second line. The same footer is on every page.

## Solution

Keep the two-line footer and keep the spaced dashes. Move each dash so it sits between items, not inside a link.

The dash is not underlined. The dash is not clickable. The link text still looks like a link and still opens the same destination.

The first item on each line still has no leading dash. Copy, destinations, order, wrapping, and type stay as they are. Every page keeps the same footer.

## User Stories

1. As a visitor, I want the dash between footer items not to look like part of a link, so that I can tell the break from the label.
2. As a visitor, I want clicking a dash to do nothing, so that the dash is only a break.
3. As a visitor, I want the email on the identity line to stay a mail link, so that I can still write to Michiel.
4. As a visitor, I want the dash before that email to sit outside the mail link, so that the dash is not part of the address.
5. As a visitor, I want each Legal page name on the second line to stay its own link, so that I can open that Legal page from any page.
6. As a visitor, I want the dash before each of those names to sit outside the link, so that the dash is not part of the Legal page name.
7. As a visitor, I want the wordmark on the identity line to have no leading dash, so that the line does not start with a break.
8. As a visitor, I want Terms of Service to have no leading dash, so that the Legal line does not start with a break.
9. As a visitor, I want a spaced dash still to sit before “Built by Michiel van der Meer”, so that the identity line still reads as three items.
10. As a visitor, I want that builder credit still not to be a link, so that only the email on that line is clickable.
11. As a visitor, I want the footer wordmark still not to be a link, so that the header wordmark remains the home link.
12. As a visitor, I want the underline to cover only the link text, so that the dash does not look clickable.
13. As a visitor, I want hovering a footer link to darken only the link text, so that the neighbouring dash does not change colour with it.
14. As a visitor on a narrow screen, I want each footer line to wrap on its own, so that identity does not mix into the Legal labels.
15. As a visitor on a narrow screen, I want a dash still to appear between two items that share a line after wrapping, so that a wrapped line still reads as a list.
16. As a keyboard user, I want Tab to land on the link text and not on the dash, so that the focus ring marks the control I will activate.
17. As a keyboard user, I want a visible focus ring on every footer link, so that I can see where I am.
18. As a visitor using a screen reader, I want the spoken link name to be the label only, so that the dash is not read as part of the link.
19. As a visitor, I want this footer on the homepage, every Landing page, the blog, a post, About, Open source, Resume, every Legal page, and the not-found page, so that the dashes are not part of the links anywhere.
20. As a Customer, I want print of a Legal page to keep hiding the website footer, so that the PDF is still the document body only.
21. As a visitor who prefers reduced motion, I want this fix not to add animation, so that a layout correction does not introduce motion.
22. As a maintainer adding a page, I want the copied footer to keep dashes outside links, so that a new page does not bring the bug back.

## Implementation Decisions

- Treat this as a correction to the shared two-line footer that already exists on every page. Do not add a generator, a shared include, a second stylesheet, or a second script.
- Keep generating the spaced dash in front of each item after the first on that line. The dash stays an en dash with a space on each side, in the same quiet colour as the footer text.
- That generated dash must belong to an element that is not a link. When the item is a link, wrap the link so the dash sits outside it. When the item is already not a link, leave that item as it is.
- Do not put the separator class on a link. A rule that only stops the underline on generated content is not enough: the dash would still sit inside the link and would still follow it.
- Copy the corrected footer onto every page, the way this site already copies one footer. Update the agent instructions that tell a later editor how to add a page, so they copy this footer and do not put the separator class on a link.
- Do not change labels, destinations, order, the two-line structure, wrapping, type, or design tokens. Hovering a footer link still darkens that link. The dash beside it does not follow the hover, because it is no longer inside the link. Do not add dark mode. Do not add animation. Keep visible focus rings.
- Keep the print rules that already hide the website footer on a Legal page.

## Testing Decisions

There is no test framework in this repository. Verification is serving the tree and looking, as the agent instructions already describe. Do not add a committed test suite.

A good check looks at what a visitor sees and can open, not at class names:

- On each footer line, a spaced dash sits between items. The first item on the line has no leading dash.
- The dash is not underlined. The link text still is.
- Clicking a dash does not open a page or a mail message. Clicking the email still opens a mail message. Clicking a Legal page name still opens that Legal page.
- Hovering a footer link darkens the label and not the dash beside it.
- The same footer appears on the homepage, one Landing page, one post, About, Open source, Resume, one Legal page, and the not-found page.
- At about 375px, each footer line still wraps on its own, and a dash still sits between two items that share a line.
- Tab order reaches each footer link. The focus ring sits on the link, not on the dash. The ring stays visible.
- Print preview of a Legal page still omits the footer.

Prior art: this repository has no automated tests for pages. The usual check is a static file server at the repository root, then click-through at a desktop width and at a phone width. Repeat that here, and include a click on a dash as well as on the neighbouring label. Include a Legal page print preview because print already hides the footer.

## Out of Scope

- Changing footer copy, destinations, or order.
- Changing the two-line footer into some other layout.
- Changing header links or any other dashes on the site.
- Restyling links site-wide, or removing underlines from footer link text.
- A site generator or a shared include for the header and footer.
- Dark mode, a theme toggle, or a new typeface.
- A committed test suite.

## Further Notes

The previous footer spec asked for a spaced dash between items so each line reads as a list. That intent still holds. This spec only moves the dash out of the link so the break is a break.

The identity line has one link (the email). The Legal line has five links. The wordmark and the builder credit stay text.
