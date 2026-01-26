---
title: Documentation
---

# Documentation

**Choose format based on project type and ecosystem.**

---

## Quick Decision Matrix

| Format | Best For | Complexity | Learning |
| -------- | ---------- | ----------- | ---------- |
| **Markdown** | README, simple docs | Low | Very Easy |
| **reStructuredText** | Python projects | High | Medium |
| **Sphinx** | Auto-generate Python API docs | High | Hard |
| **Swagger/OpenAPI** | REST API documentation | Medium | Easy |
| **Docusaurus** | Modern, feature-rich docs | High | Medium |
| **MkDocs** | Markdown-based site | Low | Easy |

---

## Format Overview

### 📝 Markdown

- **Syntax:** Simple, readable
- **Use:** README, GitHub Pages, general purpose
- **Speed:** Fastest to write
- **Output:** HTML, PDF

### 🔧 reStructuredText (RST)

- **Syntax:** Powerful but verbose
- **Use:** Python ecosystem, technical docs
- **Speed:** Slower, more markup
- **Output:** HTML, PDF, ePub

### 🐍 Sphinx

- **Syntax:** RST + special directives
- **Use:** Auto-generate Python API docs
- **Speed:** Automates code documentation
- **Output:** HTML, PDF, ePub

### 📡 Swagger/OpenAPI

- **Syntax:** YAML/JSON
- **Use:** REST API documentation
- **Speed:** Code-first approach
- **Output:** Interactive HTML

### 🚀 Docusaurus

- **Syntax:** Markdown + React
- **Use:** Modern, component-rich docs
- **Speed:** Fast build
- **Output:** Static HTML + SPA

### 📚 MkDocs

- **Syntax:** Markdown + YAML config
- **Use:** Simple, theme-based docs
- **Speed:** Very fast
- **Output:** Static HTML

---

## Choose Based On

**Personal Projects/README?**
→ Markdown

**Python Library API Documentation?**
→ Sphinx (auto-generates from docstrings)

**REST API?**
→ Swagger/OpenAPI

**Product Documentation?**
→ Docusaurus or MkDocs

**Simple Static Site?**
→ MkDocs (faster, less config)

**Complex Site with Custom Components?**
→ Docusaurus (React-based)

---

## See Also

- [Markdown](./markdown.md)
- [reStructuredText](./restructured_text.md)
- [Sphinx](./sphinx.md)
- [Swagger/OpenAPI](./swagger.md)
- [Docusaurus](./docusaurus.md)
- [MkDocs](./mkdocs.md)
