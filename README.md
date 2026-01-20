# knowledge-base

A centralized knowledge base for recording, learning, and sharing technical notes.

---

## Purpose

This repository is the **single source of truth** for my technical notes.

The goal is simple:

* Capture what I learn
* Organize it clearly
* Share it as readable documentation

Tools and automation exist **only to support the notes**, not the other way around.

---

## What This Repo Is

* A long-term store of technical knowledge
* Notes written in plain Markdown
* Structured for clarity, reuse, and growth
* Viewable as a documentation website

This repo is optimized for:

* Learning by writing
* Revisiting concepts over time
* Turning personal notes into shareable docs

---

## Repository Structure

```markdown
knowledge-base/
├── docs/          # All technical notes (source of truth)
├── site/          # Documentation site (Docusaurus)
├── automation/    # Scripts to sync/export notes (e.g., Notion)
├── README.md
└── .gitignore
```

### `docs/`

* Pure Markdown
* Organized by topic and domain
* No tool-specific assumptions

### `site/`

* Documentation website built with Docusaurus
* Renders the notes for browsing and sharing
* Can be replaced without touching the notes

### `automation/`

* Helper scripts for syncing notes to notion.
* We can view these notes via this website as well as in notion.

---

## Disclaimer

These notes reflect my understanding at the time of writing and may contain mistakes, outdated information, or incomplete explanations.

Always verify important details from official documentation or trusted sources

Do not blindly rely on these notes for production or critical decisions

Treat them as learning notes, not absolute truth

If you notice an error or have a better explanation, I’m open to corrections. Please point to the exact location and provide a reliable reference.

---

## Writing Philosophy

* Notes should be **clear and simple first**
* Prefer plain language over jargon
* Write for future-you, not just present-you
* Structure matters more than volume

If something can’t be explained simply, it isn’t understood well enough yet.

---

## Documentation Site

The notes can be viewed as a documentation website using Docusaurus.

Deployment is handled separately inside the `site/` directory.

The website is a **viewer**, not the source of truth.

---

## License

[MIT LICENSE](LICENSE)
