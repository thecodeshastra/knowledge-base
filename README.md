# Knowledge Base 🧠

A living technical knowledge base for recording, learning, and sharing engineering insights.

---

## 🚀 Overview

This repository is the **single source of truth** for my technical journey. It captures implementation details, mental models, and debugging logs in a structured, searchable, and shareable format.

[**View the Documentation →**](https://thecodeshastra.github.io/knowledge-base/)

---

## 🛠 Project Structure

```bash
knowledge-base/
├── docs/               # Core technical notes (Standard Markdown)
├── site/               # Docusaurus documentation viewer
│   ├── src/            # Custom React components & layouts
│   ├── blog/           # Technical blog posts
│   └── static/         # Icons, logos, and static assets
├── docker/             # Containerization configs (Dev & Prod)
├── .github/            # GitHub Actions (CI/CD workflows)
├── automation/         # Integration scripts (e.g., Notion)
├── README.md           # System overview
└── .gitignore          # Environment-safe rules
```

### 📂 Directory Breakdown

* **`docs/`**: The heart of the project. Pure Markdown files organized by technical domains (e.g., `linux`, `programming`, `database`).
* **`site/`**: A Docusaurus-powered viewer that transforms raw notes into a premium documentation experience.
* **`docker/`**: Simplified environment management for both development and production builds.
* **`automation/`**: Python-based scripts for syncing notes with external tools like Notion.

---

## 💻 Tech Stack

* **Core**: Markdown (Long-term data persistence)
* **Viewer**: [Docusaurus v3](https://docusaurus.io/) (React, TypeScript)
* **Styling**: Infima CSS & Vanilla CSS
* **Deployment**: GitHub Actions & GitHub Pages
* **Infrastructure**: Docker & Docker Compose

---

## ⚡ Development & Deployment

### Local Development (with Docker)

```bash
docker compose up --build
```

Access the site at `http://localhost:7890/knowledge-base/`

### Manual Deployment

```bash
cd site/
yarn deploy
```

*Note: Uses SSH by default as configured in `package.json`.*

### Automated Deployment

Pushes to the `main` branch trigger the GitHub Actions workflow, which automatically builds and deploys the site to the `gh-pages` branch.

---

## 🎯 Philosophy

1. **Notes-First**: The value is in the record, not the tool. The content is written to be portable and future-proof.
2. **Continuous Refinement**: Notes are living documents. They evolve as understanding deepens.
3. **Clarity over Complexity**: If it can't be explained simply, it isn't understood well enough yet.
4. **Open to Learning**: This is an honest record of growth—mistakes are corrected, and insights are refined over time.

---

## 🛡 Disclaimer

These notes reflect my personal understanding at the time of writing. They may contain errors or outdated information. Always cross-reference with official documentation for production-critical decisions.

---

## 📄 License

[MIT LICENSE](LICENSE)
