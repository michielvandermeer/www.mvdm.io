# mvdm.io

The public marketing website for mvdmio — Compliance, Translation Tools,
Health Check, Statistics and Commonplace. Plain static HTML and hand-written
CSS, no build step, deployed as-is to GitHub Pages.

## Structure

```
index.html                  Homepage
404.html                     Not-found page
products/<name>/index.html   The 5 Landing pages (compliance, translation-tools,
                              health-check, statistics, commonplace)
blog/index.html              Blog index
posts/<slug>/index.html      Blog posts
projects/index.html          Resume index
projects/<slug>/index.html   Resume entries (past client/employer work)
about/index.html             About page
open-source/index.html       Open-source packages page
feed.xml                     Hand-maintained RSS feed
sitemap.xml, robots.txt      Search-engine files
assets/css/site.css          The one shared stylesheet (design tokens, layout, components)
assets/images/, assets/img/  Images and favicons
```

See `CONTEXT.md` for the domain vocabulary and `AGENTS.md` for the full
conventions (design tokens, how to add a page, how prices are maintained,
how to verify a change).

## Local development

No install step and no dependencies beyond a static file server. From the
repository root:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000/`. Any other static file server (e.g.
`npx serve`, `php -S localhost:8000`) works the same way — the only
requirement is that it serves `<dir>/index.html` for `<dir>/` and serves
`404.html` for unmatched paths, matching GitHub Pages' behavior.

## Deployment

GitHub Pages serves the repository root directly on push to `main` — there
is no build step and no GitHub Actions build job to run first.

## License

Content is copyright Michiel van der Meer. All rights reserved.
