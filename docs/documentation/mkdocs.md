---
title: MkDocs
---

# MkDocs

**Lightweight Markdown-based documentation site. Simple and fast.**

---

## What It Is

- Python-based static site generator
- Markdown input only
- Material theme (modern, beautiful)
- Fast build times
- Great for project documentation

---

## Install & Setup

```bash
# Install MkDocs
pip install mkdocs

# Install Material theme (optional but recommended)
pip install mkdocs-material

# Create new project
mkdocs new my-docs
cd my-docs

# Serve locally
mkdocs serve

# Build for production
mkdocs build

# Deploy
mkdocs gh-deploy  # GitHub Pages
```

---

## Project Structure

```bash
my-docs/
├── mkdocs.yml           # Configuration
├── docs/
│   ├── index.md         # Homepage
│   ├── getting-started.md
│   ├── installation.md
│   └── api/
│       ├── functions.md
│       └── classes.md
└── site/                # Generated (don't commit)
    ├── index.html
    ├── css/
    └── js/
```

---

## Configuration (mkdocs.yml)

```yaml
site_name: My Documentation
site_description: Project documentation
site_author: Your Name
site_url: https://mysite.com/

# Repo
repo_url: https://github.com/myorg/my-project
repo_name: my-project
edit_uri: edit/main/docs/

# Theme
theme:
  name: material
  language: en
  
  palette:
    - scheme: light
      primary: blue
      accent: blue
    - scheme: dark
      primary: blue
      accent: blue

  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.tabs.link

# Navigation
nav:
  - Home: index.md
  - Getting Started:
    - Installation: getting-started/installation.md
    - Quick Start: getting-started/quick-start.md
  - Guides:
    - Advanced Usage: guides/advanced.md
    - Best Practices: guides/best-practices.md
  - API:
    - Functions: api/functions.md
    - Classes: api/classes.md
  - Blog:
    - nav: '!import ./blog'

# Plugins
plugins:
  - search
  - blogging:
      dirs:
        - blog

# Extensions
markdown_extensions:
  - admonition
  - pymdownx.emoji
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.highlight
  - pymdownx.inlinehilite
  - tables
  - toc:
      permalink: true

# Extra CSS/JS
extra_css:
  - css/custom.css
extra_javascript:
  - js/custom.js

# Footer
copyright: Copyright &copy; 2024 My Project
```

---

## Writing Pages (Markdown)

Standard Markdown with extra features:

```markdown
---
title: Page Title
description: Page description
---

# Page Title

## Section

Content here.

## Code Examples

```python
def hello():
    print("Hello")
```

## Admonitions

```rst
!!! note
    This is a note.

!!! warning "Custom Title"
    This is a warning.

!!! danger
    Critical warning!

!!! tip
    Pro tip here.
```

## Tabs

=== "Python"

```python
print("Hello")
```

=== "JavaScript"

```javascript
console.log("Hello");
```

=== "Bash"

```bash
echo "Hello"
```

## Tables

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
| Data 3   | Data 4   |

## Task Lists

- [x] Completed
- [ ] Incomplete
- [ ] Another task

## Footnotes

Text with footnote[^1].

[^1]: This is the footnote content.

```markdown

---

## Plugins & Extensions

```yaml
plugins:
  - search              # Built-in search
  - blogging            # Blog support
  - minify              # Minify HTML/CSS/JS
  - i18n                # Multi-language

markdown_extensions:
  - admonition          # !!! note syntax
  - pymdownx.emoji      # Emoji support :smile:
  - pymdownx.superfences  # Code highlighting
  - pymdownx.inlinehilite # Inline code highlighting
  - pymdownx.tabbed     # Tab support
  - tables              # Markdown tables
  - toc                 # Table of contents
  - footnotes           # Footnote support
```

---

## Deployment

### GitHub Pages

```bash
# Configure in mkdocs.yml
site_url: https://yourusername.github.io/my-project/

# Deploy
mkdocs gh-deploy
```

### Netlify

1. Connect GitHub repo
2. Build command: `mkdocs build`
3. Publish directory: `site`

### Docker

```dockerfile
FROM python:3.10

RUN pip install mkdocs mkdocs-material

WORKDIR /docs

EXPOSE 8000

CMD ["mkdocs", "serve", "--dev-addr", "0.0.0.0:8000"]
```

```bash
docker build -t my-docs .
docker run -p 8000:8000 -v $(pwd):/docs my-docs
```

---

## Best For

- ✅ Simple project documentation
- ✅ Quick setup needed
- ✅ Lightweight sites
- ✅ Blog + docs
- ✅ Team documentation

---

## Pros ✅

- Very fast setup
- Simple configuration
- Beautiful Material theme
- Easy to customize
- Fast build times
- Great search

---

## Cons ❌

- Less customizable than Docusaurus
- No React components
- Limited plugins
- Python-based (needs pip)

---

## MkDocs vs Docusaurus

| Feature | MkDocs | Docusaurus |
| --------- | -------- | ----------- |
| Setup time | 5 minutes | 10 minutes |
| Complexity | Low | High |
| Customization | Limited | Extensive |
| React components | ❌ | ✅ |
| Performance | Excellent | Excellent |
| Multi-language | Plugin | Built-in |
| Versioning | Plugin | Built-in |

**Choose MkDocs if:** You need simple, fast documentation.
**Choose Docusaurus if:** You need advanced features & customization.

---

## Quick Checklist

- ✅ Install mkdocs + material theme
- ✅ Create project structure
- ✅ Write mkdocs.yml
- ✅ Create nav structure
- ✅ Write Markdown docs
- ✅ Test locally (`mkdocs serve`)
- ✅ Deploy to GitHub Pages (`mkdocs gh-deploy`)
