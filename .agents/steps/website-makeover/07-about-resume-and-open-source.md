# 07 — About, Resume, and Open-source pages

Status: done

## What to build

The demoted sidenote pages, all in the site design, and the end of the Consultancy page.

**About** (`/about/`): reframed from `_tabs/about.md` into the company voice — mvdmio's story with Michiel as founder. Keep the existing bio substance, the photo (`assets/images/profielfoto-cropped.jpg`), and the experience table; drop the consultancy mention entirely; retarget the old links: "projects" becomes the Resume at `/projects/`, product mentions point at the `/products/:name/` Landing pages, the blog link points at `/blog/`. A buyer doing due diligence should come away knowing who is behind the products. Resume pages are reachable from here.

**Resume** (`/projects/` index + eight entries): the pages describing past client and employer work, labeled "Resume" (never "Projects" or "portfolio" — see `CONTEXT.md`). Convert the eight `_projects/*.md` files once, content unchanged, to their preserved URLs:

- `/projects/24green-climate-computer/`
- `/projects/ect-electronic-order-handling-system/`
- `/projects/jewel-software/`
- `/projects/psa-quaycrane-ocr/`
- `/projects/psa-yardcrane-automation/`
- `/projects/psa-yardcrane-remote-control/`
- `/projects/ridder-hortos/`
- `/projects/vdmeer-software-websites-platform/`

The index lists the eight entries (titles, descriptions, images from `assets/images/projects/`) in their front-matter `order`. Resume is linked from the About page and the footer only — it stays out of the top nav. Fix in-body hrefs to live URLs during conversion (e.g. `jewel-software.md` links to a blog post via an old `/2023/05/27/...` href — retarget to `/posts/effective-dotnet-web-development/`).

**Open source** (`/open-source/`): convert `_tabs/open-source.md` — already card-styled HTML listing the MIT-licensed `mvdmio` GitHub repositories — into the new design's card grid, content unchanged. The homepage open-source strip links here.

**Consultancy**: delete `_tabs/consultancy.md`. No `/consultancy/` page, no redirect — the 404 page catches old links.

Delete `_tabs/` and `_projects/` once converted (also `_tabs/products.md` and `_tabs/projects.md`, whose roles are taken by the homepage and the Resume index).

Same quality floor: responsive to phone widths, visible focus states, reduced motion, title + meta description on every page.

## Footprint

Projects: mvdm.io static site (serve the repo root; all pages built so far render, links between them resolve)

- `about/index.html` — new, reframed from `_tabs/about.md`
- `projects/index.html` — new Resume index
- `projects/<slug>/index.html` × 8 — converted Resume entries at preserved URLs
- `open-source/index.html` — new, converted from `_tabs/open-source.md`
- `_tabs/` (about, consultancy, open-source, products, projects) and `_projects/*.md` × 8 — sources; delete after converting
- `assets/images/projects/`, `assets/images/profielfoto-cropped.jpg` — existing images, paths unchanged
- `index.html`, `assets/css/site.css` — footer Resume link and nav About/Open source links now resolve; card grid styles reused/extended
- `CONTEXT.md` — glossary: the label is "Resume"; do not edit

## Acceptance criteria

- [ ] `/about/` speaks as mvdmio with Michiel as founder, keeps the bio substance, photo, and experience table, links to the Resume, and mentions no consultancy
- [ ] `/projects/` lists the eight Resume entries under the label "Resume"; all eight preserved `/projects/:name/` URLs serve their converted content unchanged
- [ ] Resume is reachable from the About page and the footer, and absent from the top nav
- [ ] `/open-source/` lists the open-source repositories with working GitHub links
- [ ] `/consultancy/` does not exist and no page links to it
- [ ] `_tabs/` and `_projects/` are deleted; no in-body href points at a retired URL shape
- [ ] All pages readable at 375px, visible focus states, reduced motion respected, title + meta description each

## Outcome

Built `about/index.html`, `projects/index.html` (Resume index), the eight `projects/<slug>/index.html` Resume entries, and `open-source/index.html`, all reusing the shared `assets/css/site.css` design system (nav, footer, `.wrap`, `.eyebrow`, `.prose`, `.post-head`/`.post-image` for the Resume entries). Added new CSS to `site.css`: `.about-head`/`.about-body`/`.about-photo`/`.about-copy`/`.about-experience`/`.exp-table` for the About page (including a mobile stacked-table fallback under 700px), a `.tiles`/`.tile`/`.tile-img`/`.tile-body` two-column card grid reused by both the Resume index (image + title + description, whole card links) and the Open source page (title link + description + a new `.btn.sm` "View repository" button, no image), and a generic `.page-head` header block reused by the Resume index and Open source page.

About (`about/index.html`) is reframed to company voice: "mvdmio is built and run by Michiel van der Meer..." keeps the bio substance (industrial automation, shipping/horticulture sectors, Jewel Software tech-lead role), the photo (`assets/images/profielfoto-cropped.jpg`), and the experience table unchanged. All consultancy language is dropped. Links are retargeted: "projects" → Resume at `/projects/`, personal-project mentions → the five `/products/:name/` Landing pages, blog → `/blog/`. Resume and blog are reachable from About; About/Resume are cross-linked from the footer (footer links were already wired in step 01).

Resume: the eight `_projects/*.md` files were converted once, content unchanged, to their preserved `/projects/<slug>/` URLs, in front-matter `order` (jewel-software, ridder-hortos, vdmeer-software-websites-platform, psa-quaycrane-ocr, psa-yardcrane-remote-control, psa-yardcrane-automation, ect-electronic-order-handling-system, 24green-climate-computer). The label "Resume" is used everywhere (nav is untouched — Resume stays out of it, per spec). The one in-body link needing retargeting (`jewel-software.md`'s reference to a blog post) had already been fixed by step 06 to `/posts/effective-dotnet-web-development/` — verified present and correct, no further change needed. `ridder-hortos.md`'s external link to `https://ridder.com/hortos/` and `vdmeer-software-websites-platform.md`'s external signup link were left as external URLs (not old-site-shaped, out of scope to touch).

Open source (`open-source/index.html`): converted `_tabs/open-source.md`'s five MIT-licensed repo cards (Database.PgSQL, ASP.Jobs, Hotwire.NET, Tailwind.NET, ValueConversion) and the philosophy paragraph into the tile grid, content unchanged, all GitHub links preserved with `target="_blank" rel="noopener"`.

`_tabs/consultancy.md` and all of `_tabs/`/`_projects/` were deleted via `git rm -r`; no `/consultancy/` page exists and nothing links to it (grepped the whole served tree).

Verified locally with `python3 -m http.server`: `/about/`, `/projects/`, all eight `/projects/<slug>/` URLs, `/open-source/`, every referenced image, and `assets/css/site.css` return 200; `/consultancy/` returns 404. Grepped the tree for "consultancy" and for retired `/YYYY/MM/DD/...` or `.html`-suffixed internal hrefs — none found.

Drift from footprint: none of substance. The footprint's `index.html`/footer bullet said this step would make the footer's Resume/About links "now resolve" — those links were actually already wired into `index.html`, `404.html`, `blog/index.html` and the post pages back in steps 01/06; this step's job was only to make their targets (`/about/`, `/projects/`) exist, which is now done. No edit to `index.html` itself was needed.
