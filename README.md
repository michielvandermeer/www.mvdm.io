# mvdm.io - Jekyll GitHub Pages Site

Professional blog of Michiel van der Meer - a seasoned software engineer, architect, and team lead.

## Local Development

### Prerequisites

- Ruby 2.7+ with Bundler
- Jekyll 4.3+

### Setup

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` in your browser.

## Structure

```
├── _config.yml          # Site configuration
├── _posts/              # Blog posts
├── _projects/           # Project pages collection
├── _products/           # Product pages collection
├── assets/images/       # All images
├── about.md             # About page
├── consultancy.md       # Consultancy page
├── open-source.md       # Open Source page
├── projects.html        # Projects listing
├── products.html        # Products listing
└── index.md             # Home page
```

## Deployment

This site is configured for GitHub Pages. Push to the `main` branch to deploy automatically.

### Custom Domain (Optional)

To use a custom domain (e.g., `mvdm.io`):

1. Create a `CNAME` file in the root with your domain:
   ```
   mvdm.io
   ```

2. Configure your DNS provider with:
   - A record pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or a CNAME record pointing to `michielvandermeer.github.io`

3. Enable HTTPS in the repository settings under Pages.

## License

Content is copyright Michiel van der Meer. All rights reserved.
