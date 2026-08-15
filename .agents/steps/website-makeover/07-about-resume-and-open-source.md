# 07 — About, Resume, and Open-source pages

Status: pending

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
