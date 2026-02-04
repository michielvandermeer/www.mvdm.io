# Personal Blog & Portfolio - mvdm.io

This is a Jekyll-based personal blog and portfolio website for Michiel van der Meer. The site showcases professional projects, personal products, and technical blog posts.

## Tech Stack

- **Jekyll 4.4.1** - Static site generator (Ruby-based)
- **jekyll-theme-chirpy 7.4.1** - Modern blog theme with dark mode
- **Ruby** - Runtime (2.7+ required, 3.3 used in CI)
- **Bundler** - Ruby dependency management
- **GitHub Actions** - CI/CD deployment to GitHub Pages

## Project Structure

```
├── _config.yml          # Main Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.html           # Home page (uses 'home' layout)
├── _posts/              # Blog posts (YYYY-MM-DD-slug.md format)
├── _projects/           # Professional project portfolio
├── _products/           # Personal products/SaaS projects
├── _tabs/               # Navigation pages (ordered by 'order' front matter)
└── assets/images/       # Images organized by type (posts/, projects/, products/)
```

## Content Conventions

### Blog Posts (`_posts/*.md`)

Posts must follow the naming convention: `YYYY-MM-DD-slug.md`

```yaml
---
layout: post
title: "Article Title"
date: YYYY-MM-DD
author: Michiel van der Meer
categories: [Category1, Category2]
tags: [tag1, tag2]
image:
  path: /assets/images/posts/image-name.jpg
---
```

Common categories: `Software Development`, `Business`
Common tags: `dotnet`, `web development`, `rails`, `hotwire`, `remote work`, `communication`, `leadership`, `scrum`, `agile`, `team management`

### Projects (`_projects/*.md`)

```yaml
---
layout: page
title: "Project Name"
description: "Short description"
image: /assets/images/projects/image.jpg
order: 1  # Controls display order
---
```

Include sections for Technologies, Responsibilities, and Challenges when relevant.

### Products (`_products/*.md`)

```yaml
---
layout: page
title: "Product Name"
description: "Short tagline"
image: /assets/images/products/image.jpg
external_url: https://product.mvdm.io
order: 1
---
```

### Tabs (`_tabs/*.md`)

Navigation pages with FontAwesome icons:

```yaml
---
layout: page
title: Tab Name
icon: fas fa-icon-name
order: 1  # Navigation order
---
```

## Development Workflow

### Local Development

```bash
bundle install              # Install dependencies
bundle exec jekyll serve    # Run dev server at localhost:4000
```

### Building

```bash
bundle exec jekyll build
```

### Deployment

- Automatic deployment via GitHub Actions on push to `main` or `master`
- Deploys to GitHub Pages

## Important Notes

- Use relative URLs with `| relative_url` filter in templates
- Images should be placed in `assets/images/` in the appropriate subdirectory
- The theme mode is set to dark by default
- Timezone is Europe/Amsterdam
- PWA is enabled
- Table of contents is enabled on posts by default
- Comments are disabled

## Files to Never Edit

- `_site/` - Generated output (gitignored)
- `.jekyll-cache/` - Build cache (gitignored)
- Files from the jekyll-theme-chirpy gem (override by creating local copies instead)

## When Adding Content

1. Place images in the appropriate `assets/images/` subdirectory first
2. Follow the front matter conventions exactly
3. Test locally with `bundle exec jekyll serve` before committing
4. Verify the site builds successfully
