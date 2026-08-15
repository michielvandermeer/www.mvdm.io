# Website Makeover: Product-First Marketing Site

Status: ready-for-agent

## Problem Statement

mvdm.io was built to help its owner get hired: the homepage is a blog list, the navigation leads with a bio and consultancy, and the four product pages are thin info pages. The owner now sells software products instead. The flagship product, Compliance, is missing from the site entirely, and nothing on the site is written to convince a buyer. When the owner links someone to mvdm.io to sell them a product, the site works against that goal.

## Solution

Rebuild mvdm.io as a marketing website for the five mvdmio products (see `CONTEXT.md` for the terms used here). The site speaks with a company voice ("mvdmio offers"), leads with Compliance as the Flagship, and gives every Product a Landing page with benefit-led copy, a visible price, and clear calls to action. The resume, blog, and open-source pages stay, demoted to sidenotes. The Jekyll/Chirpy stack is replaced by plain static HTML and hand-written CSS with no build step.

## Prototype Verdict

A prototype answered the question: **what should the new site look like?** Three structurally different variants of the homepage and the Compliance Landing page were built and compared. The owner picked **Variant A ("Boardroom")** and rejected B and C as too crowded and too busy.

The prototype is kept at `.agents/prototypes/website-makeover/` as the design reference (open `index.html?variant=A` in a browser). It was written under prototype constraints — the real pages are built fresh from this spec, with the prototype as the visual target.

The winning design, in words:

- **Layout**: a classic top navigation bar over a narrative scroll. The homepage runs hero → framework strip → ranked product sections → three-card grid → open-source strip → footer. A Landing page runs hero → capability strip → alternating feature sections (text beside an illustration, sides swapping each section) → pricing table → closing call to action → footer.
- **Look**: light "paper" background (#fbfaf7), dark green-black ink (#10231c), deep pine (#0e3b2e) for buttons, emerald (#0a8754) as the Compliance accent, warm hairlines (#ddd8ca). Serif display type (Source Serif 4) for headings, Inter for body text, IBM Plex Mono for eyebrows, prices, and labels.
- **Signature**: audit-ledger styling. Thin ruled hairlines separate sections; each section carries a mono clause number ("01", "02") that encodes the real product ranking; pricing is set as a ledger table with dotted leader lines and a totals row.
- **Primary affordance**: a pine "Get started" button, always paired with a quieter "Contact me" button.
- **Illustrations**: hand-coded inline SVG scenes in white, hairline-bordered "document frames" with mono captions — a risk matrix, a translation grid, a crosswalk diagram, an assistant conversation, a task list, and so on. Abstract enough not to expose real product UI.

## User Stories

1. As a compliance officer comparing vendors, I want the Compliance Landing page to list every supported framework, so that I can tell in seconds whether it covers my certification needs.
2. As a compliance officer, I want to see the price (€999 / year, excl. VAT) on the Landing page, so that I can budget without a sales call.
3. As a compliance officer wary of self-serve signups, I want a "Contact me" option next to every "Get started" button, so that I can ask questions before committing.
4. As a .NET developer, I want a Translation Tools Landing page that shows the `.resx` workflow, the AI auto-translation, and the NuGet/CLI clients, so that I can judge whether it fits my build.
5. As a .NET developer, I want Health Check and Statistics pages that state what is monitored or measured and what it costs, so that I can compare them against the tools I use now.
6. As an individual, I want a Commonplace Landing page in plainer, warmer language with its €99 / year (incl. VAT) price, so that I understand it is a personal product, not a business tool.
7. As any visitor, I want the homepage to tell me what mvdmio is and lead me to the Flagship, so that I know within one screen what is being sold.
8. As any visitor, I want each "Get started" button to take me to that Product's own application domain, so that I land directly in the signup flow.
9. As a buyer doing due diligence, I want an About page that presents mvdmio's story and its founder, so that I know who is behind the products.
10. As a buyer doing due diligence, I want an open-source page listing the MIT-licensed packages under the products, so that I can inspect the engineering.
11. As a returning reader, I want the existing blog posts at their old `/posts/…` URLs and an index at `/blog/`, so that my bookmarks and inbound links keep working.
12. As an RSS subscriber, I want `/feed.xml` to keep existing, so that my feed reader does not break.
13. As someone checking the owner's background, I want the resume pages reachable from the About page and footer, so that past work is findable without cluttering the sales navigation.
14. As the site owner, I want the Consultancy page gone, so that the site no longer advertises a service I stopped offering.
15. As the site owner, I want every page to be a plain HTML file with no build step, so that I can edit anything with a text editor and push.
16. As the site owner, I want prices written in only one place per Landing page, so that adjusting a price later is a one-line edit.
17. As the site owner, I want the landing-page copy drafted from each app's project documentation, so that the marketing claims match what the products actually do.
18. As the site owner, I want to review all copy before it ships, so that nothing overstates what a product does.
19. As a visitor on a phone, I want every page readable and navigable on a small screen, so that a link opened from email or LinkedIn works.
20. As a visitor using a keyboard, I want visible focus states and working skip-order, so that the site is usable without a mouse.
21. As a search engine, I want each page to carry a title, meta description, and a sitemap entry, so that the products are findable by name.
22. As a prospective customer who saw the old site, I want `/products/:name/` URLs to keep working, so that old links land on the new Landing pages.
23. As a Compliance prospect, I want the page to explain registers, crosswalks, the AI assistant, and recurring tasks in buyer language, so that I understand the value without reading documentation.
24. As a cautious buyer, I want the AI assistant's copy to state that destructive actions wait for human confirmation, so that I trust it with my compliance records.
25. As a future contributor (human or agent), I want AGENTS.md and the editor commands to describe the new stack, so that the next change follows the new conventions instead of Jekyll's.

## Implementation Decisions

- **Stack**: plain static HTML and hand-written CSS. No generator, no Node, no Ruby, no build step. GitHub Pages serves the files directly; the Jekyll build workflow, Gemfile, and theme configuration are removed. Google Fonts is the only external dependency.
- **Design system**: Variant A from the prototype, exactly as described in Prototype Verdict. One shared stylesheet carries the tokens; each Product's Landing page sets its accent color (Compliance emerald `#059669`-family, Translation Tools sky `#0284c7`, Health Check teal `#0d9488`, Statistics indigo `#4f46e5`, Commonplace amber `#d97706`). The site is light-only — no dark mode and no theme toggle.
- **Pages**: homepage, five Landing pages under `/products/:name/` (Compliance is new), `/blog/` index, the ten existing posts under `/posts/:title/`, resume index and eight entries under `/projects/:name/` (labeled "Resume"), `/about/`, `/open-source/`, a 404 page.
- **Navigation**: top bar with the mvdmio wordmark, the five Products, Open source, Blog, About, and a "Get started" button. Resume links live on the About page and in the footer only. The owner flagged the prototype's top menu as "could be better"; improve its detailing during implementation without changing this structure.
- **Homepage order**: suite-level hero leading with Compliance, framework strip, clause-numbered sections for Compliance (01) and Translation Tools (02), a three-card grid for Health Check, Statistics, and Commonplace (03–05), open-source strip, footer.
- **Landing page anatomy** (every Product): hero with name, benefit tagline, "Get started" + "Contact me", price line; an SVG illustration in a document frame; three to six feature sections drawn from that app's project documentation and changelog; a ledger pricing table; a closing call to action.
- **Pricing display**: business Products show "€999 / year, excl. VAT"; Commonplace shows "€99 / year, incl. VAT". Prices are hand-maintained (they live in Stripe; no sync). The old "$2.50/month" Commonplace claim is replaced.
- **Calls to action**: "Get started" links to the Product's application domain (signup routes through the platform's central Auth). Button copy becomes "Start free trial" only once trials exist in the platform. "Contact me" is `mailto:michiel@mvdm.io` everywhere; no form service.
- **URL preservation**: `/posts/:title/`, `/projects/:name/`, `/products/:name/`, `/about/`, `/open-source/` all keep their paths as `index.html` files in matching folders. `/consultancy/` is deleted with no redirect. Chirpy's search, tags, and categories are dropped. `/feed.xml` survives as a hand-maintained RSS file.
- **Content conversion**: the ten posts and eight resume entries are converted from Markdown to HTML once, content unchanged. The About page is lightly reframed to the company voice — mvdmio's story with Michiel as founder — keeping the existing bio, photo, and experience table.
- **Voice**: company voice ("mvdmio") site-wide; Auth is internal plumbing and gets no page; the site stays English-only.
- **Copy source**: landing-page claims come from each app's `Project.md` and customer-facing changelog in the product monorepo; the owner reviews all copy before it ships. Illustration labels that imply live data (counts, percentages) are obviously illustrative, not fabricated customer claims.
- **Quality floor**: every page is responsive down to phone widths, keeps visible keyboard-focus states, and respects reduced-motion preferences.
- **Search engines**: every page carries a title and meta description; a hand-written `sitemap.xml` and `robots.txt` list the pages.
- **Conventions**: AGENTS.md, the editor command templates, and the README structure section are rewritten for the new stack.

## Testing Decisions

There is no test framework in this repo and a static site does not warrant one. Verification is:

- Serve the built tree locally (any static file server) and review every page visually at desktop and mobile widths.
- Run a one-off link crawl over the local site confirming (a) no internal link 404s and (b) every preserved URL from the old site resolves — the list in URL preservation is the contract.
- Confirm `/feed.xml` parses as valid RSS.

A good check exercises what a visitor experiences (URLs, links, rendered pages), not how files are organized on disk.

## Out of Scope

- Trials, billing changes, signup flow changes — anything inside the applications or Stripe.
- Automating price sync between Stripe and the site.
- Real product screenshots (revisit when the owner is happy with the product UI; the SVG document frames are shaped to accept screenshots later).
- Rewriting blog posts or resume content.
- Blog features: search, tags, categories, comments.
- Dutch localization.
- A redesign of the top navigation beyond light detailing — the owner deferred this.
- Analytics integration on the site itself.

## Further Notes

- The Commonplace price of €99 is treated as VAT-inclusive because it sells to consumers; if that turns out to be the excl.-VAT figure, only the suffix changes.
- The five accent colors mirror the product portal inside the platform, so the marketing site and the apps share a color identity.
- The domain glossary for this repo is `CONTEXT.md` at the root (Product, Flagship, Landing page, Resume, mvdmio).
