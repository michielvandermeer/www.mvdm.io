# 06 — Blog index, converted posts, and feed.xml

Status: done

## What to build

The blog moves off the homepage and becomes a sidenote: an index at `/blog/` and the ten existing posts at their old `/posts/:title/` URLs, so bookmarks, inbound links, and RSS readers keep working. Content is converted once from Markdown to HTML, unchanged — no rewriting, no new posts.

- `/blog/` — a simple index in the site design (step 01 stylesheet; add article/prose typography styles to `assets/css/site.css` as needed): post titles, dates, links. No search, no tags, no categories, no pagination — Chirpy's blog features are dropped.
- Ten post pages, one per file in `_posts/`, each at `/posts/<filename-slug-without-date>/` (Jekyll's `/posts/:title/` permalink used the filename slug):
  - `/posts/list-of-fully-remote-businesses/`
  - `/posts/improving-on-the-yearly-disappointment/`
  - `/posts/agile-bill-of-rights/`
  - `/posts/the-unwritten-rules-of-remote-communication/`
  - `/posts/you-can-only-make-a-first-impression-as-often-as-you-want/`
  - `/posts/you-cant-do-agile-without-a-customer/`
  - `/posts/what-it-takes-to-lead-software-development-teams/`
  - `/posts/developers-are-not-socially-awkward-introverts/`
  - `/posts/the-water-cooler-is-a-silly-place/`
  - `/posts/effective-dotnet-web-development/`
- Each post page keeps its title, date, author, header image (paths under `/assets/images/posts/` are unchanged), and body content converted faithfully to HTML. Internal links inside post bodies must point at live URLs on the new site (e.g. `_projects/jewel-software.md` links to a post via an old `/2023/05/27/...` style href — fix such hrefs to the `/posts/:title/` form during conversion).
- `/feed.xml` — a hand-maintained RSS 2.0 file listing the ten posts (title, link, pubDate, description), valid per an RSS validator/parser. Reference it from page heads with a `<link rel="alternate" type="application/rss+xml">`.
- Posts are written by Michiel; the byline stays personal — the company voice applies to the marketing pages, not to converting old posts.

Delete the `_posts/` directory once converted.

Same quality floor: responsive to phone widths, visible focus states, reduced motion, title + meta description on the index and every post.

## Footprint

Projects: mvdm.io static site (serve the repo root; all pages built so far render, links between them resolve)

- `blog/index.html` — new blog index
- `posts/<slug>/index.html` × 10 — converted posts at their preserved URLs
- `feed.xml` — new hand-maintained RSS file
- `_posts/*.md` × 10 — conversion sources; delete after converting
- `assets/css/site.css` — add prose/article typography for post bodies
- `assets/images/posts/` — existing images, paths unchanged
- `index.html` — nav "Blog" link now resolves

## Acceptance criteria

- [x] `/blog/` lists all ten posts with dates, newest first, in the site design
- [x] Each of the ten `/posts/:title/` URLs above serves the converted post with content, images, title, date, and author intact — content unchanged, only converted
- [x] Links inside post bodies resolve on the new site (no hrefs left pointing at retired Jekyll URL shapes)
- [x] `/feed.xml` exists, lists the ten posts, and parses as valid RSS (verify with a parser, e.g. Python's `xml.etree` plus a feed sanity check)
- [x] `_posts/` is deleted
- [x] Index and posts are readable at 375px, keep visible focus states, respect reduced motion, and each has a title + meta description

## Outcome

Built `blog/index.html` and ten `posts/<slug>/index.html` pages reusing the shared `assets/css/site.css` design system (nav, footer, `.wrap`, `.eyebrow`, `.mono`) with new typography classes added for this step: `.blog-head`/`.blog-list` for the index (title, dashed hairline separators, mono dates, serif titles) and `.post-head`/`.post-meta`/`.post-image`/`.prose` for post pages (centered eyebrow/title/meta block, bordered header image, and a `.prose` scope for converted body content — headings, paragraphs, lists, links, bold/italic, blockquote, and `<pre>` code blocks, all styled with the existing paper/ink/pine/hairline tokens rather than new colors). Both files carry `<link rel="alternate" type="application/rss+xml" href="/feed.xml">` in the head, per the spec's "reference it from page heads" instruction — scoped to the blog and post pages themselves rather than every page site-wide, since that's where a reader would discover the feed.

All ten posts from `_posts/*.md` were converted once, content unchanged, to their `/posts/<filename-slug-without-date>/` URLs (the ten slugs listed in the step file, verified against the actual `_posts/` filenames). Markdown (headings, lists, bold/italic/blockquote/code fences, links) was hand-converted to the equivalent HTML tags inside `.prose` — no rewriting of any sentence. Each page keeps title, ISO `<time>` + human-readable date, "Michiel van der Meer" as byline, and its original header image under `/assets/images/posts/` (paths unchanged). `blog/index.html` lists all ten, newest first, with dates and links, no search/tags/categories/pagination.

Fixed the one internal Jekyll-shaped link identified by the step: `_projects/jewel-software.md`'s `/2023/05/27/effective-dotnet-web-development.html` now points at `/posts/effective-dotnet-web-development/`. No other `/YYYY/MM/DD/...` or `.html`-suffixed internal hrefs exist anywhere in the served tree (verified with a repo-wide grep).

`feed.xml` is a hand-maintained RSS 2.0 file with all ten items (title, link, pubDate, description), newest first matching the blog index order; pubDate weekdays were cross-checked against the actual calendar dates with a Python script. Parsed successfully with `xml.etree.ElementTree` (10 items, all with title/link/pubDate present).

`_posts/` was deleted via `git rm -r`. Verified locally with `python3 -m http.server`: `/`, `/blog/`, all ten `/posts/<slug>/` URLs, `/feed.xml`, `site.css`, and a sample post image all return 200.

Drift from footprint: none of substance. The footprint's per-post ordering wasn't specified for the two 2022-05-11 posts (same date) — "you-can-only-make-a-first-impression..." was placed before "you-cant-do-agile-without-a-customer" in both the blog index and feed, an arbitrary but consistent tie-break (matches the alphabetical order the two files had in `_posts/`).
