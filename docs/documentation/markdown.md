---
title: Markdown
---

# Markdown

**Simple, readable markup. The modern standard for documentation.**

---

## Basic Syntax

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading

**bold text**
*italic text*
~~strikethrough~~
`inline code`

[Link text](https://example.com)
![Alt text](image.jpg)
```

---

## Lists

```markdown
# Unordered
- Item 1
- Item 2
  - Nested item

# Ordered
1. First
2. Second
3. Third

# Task lists
- [x] Completed
- [ ] Not done
```

---

## Code Blocks

```markdown
# Inline
`code here`

# Block with syntax highlighting
```python
def hello():
    print("Hello")
```

```bash
echo "Hello"
```

```json
{"key": "value"}
```

```markdown

---

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

# Alignment
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |    R  |
```

---

## Quotes & Blockquotes

```markdown
> Single quote

> Quote line 1
> Quote line 2

>> Nested quote
```

---

## Advanced

### Footnotes

```markdown
Text with footnote[^1].

[^1]: Footnote definition.
```

### Horizontal Rule

```markdown
---
***
___
```

### Expandable Details

```markdown
<details>
<summary>Click to expand</summary>

Hidden content here.

</details>
```

---

## Common Flavors

| Flavor | Use | Features |
| -------- | ----- | ---------- |
| **GitHub Flavored Markdown (GFM)** | GitHub, GitLab | Task lists, strikethrough, tables |
| **CommonMark** | Standard, portable | Clean spec, widely supported |
| **Markdown Extra** | Advanced features | Footnotes, attributes |
| **MultiMarkdown** | Academic | Footnotes, citations, math |

---

## Best For

- ✅ README files
- ✅ GitHub Pages
- ✅ Blog posts
- ✅ Documentation
- ✅ Static site generators (MkDocs, Docusaurus)

---

## Tools

```bash
# Convert Markdown to HTML
pandoc input.md -o output.html

# Convert to PDF
pandoc input.md -o output.pdf

# Lint Markdown
markdownlint *.md

# Check links
markdown-link-check document.md
```

---

## Pros ✅

- Simple, readable
- Version control friendly
- Fast to write
- Widely supported
- Converts to HTML, PDF, etc.

---

## Cons ❌

- Limited formatting options
- No native tables in standard Markdown
- Can't extend without HTML
- No auto-linking

---

## Pro Tips

**Use semantic Markdown:**

```markdown
✅ Use `code` for variables
✅ Use **bold** for emphasis
✅ Use `[links](url)` for references
```

**Organize large docs:**

```bash
docs/
├── README.md
├── getting-started.md
├── guides/
│   ├── installation.md
│   └── configuration.md
└── api/
    ├── endpoints.md
    └── examples.md
```

**Add HTML when needed:**

```markdown
Regular markdown text.

<details>
<summary>Advanced topic</summary>
Details go here.
</details>

More markdown text.
```
