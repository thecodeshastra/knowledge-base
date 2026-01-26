---
title: Docusaurus
---

# Docusaurus

**React-based documentation site. Modern, versioning, internationalization built-in.**

---

## What It Is

- React static site generator
- Built-in versioning
- Internationalization (multi-language)
- Blog support
- Highly customizable

---

## Install & Setup

```bash
# Install Docusaurus with template
npx create-docusaurus@latest my-docs classic

cd my-docs

# Serve locally
npm start

# Build for production
npm run build

# Deploy
npm run deploy  # GitHub Pages (auto-deploy)
```

---

## Project Structure

```bash
my-docs/
├── docusaurus.config.js     # Main configuration
├── package.json
├── docs/
│   ├── intro.md
│   ├── tutorial-basics/
│   │   ├── markdown-features.mdx
│   │   └── congratulations.md
│   └── ...
├── blog/
│   ├── 2024-01-01-hello.md
│   └── authors.yml
├── src/
│   ├── pages/
│   │   └── index.jsx
│   └── css/
│       └── custom.css
├── sidebars.js              # Navigation structure
└── static/                  # Images, fonts, etc.
    └── img/
```

---

## Configuration (docusaurus.config.js)

```javascript
// @ts-check
const {themes} = require('prism-react-renderer');

module.exports = {
  title: 'My Documentation',
  tagline: 'Project documentation site',
  url: 'https://mysite.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'myorg',
  projectName: 'my-project',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/myorg/my-docs/edit/main',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/myorg/my-docs/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'My Docs',
      logo: {
        alt: 'My Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          label: 'Docs',
          position: 'left',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/myorg/my-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['python', 'bash', 'sql'],
    },
  },
};
```

---

## Navigation (sidebars.js)

```javascript
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'intro',
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/advanced',
        'guides/best-practices',
        'guides/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/functions',
        'api/classes',
      ],
    },
  ],
};

module.exports = sidebars;
```

---

## Writing Pages (Markdown + MDX)

```markdown
---
title: Getting Started
description: How to get started
---

# Getting Started

This is a page.

## Code Examples

```python
def hello():
    print("Hello")
```

## React Components in Markdown (MDX)

```mdx
export const MyButton = () => (
  <button style={{backgroundColor: 'blue', color: 'white'}}>
    Click me!
  </button>
);

<MyButton />
```

## Admonitions

:::note
This is a note.
:::

:::tip
Pro tip here.
:::

:::warning
Be careful!
:::

:::danger
Critical warning!
:::

## Tabs

<!-- ```typescript
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python">

```python
print("Hello")
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```javascript
console.log("Hello");
```

  </TabItem>
</Tabs>
``` -->

## Images

`![Alt text](./img/my-image.png)`

## Links

```markdown
[Internal link](./another-page.md)
[External link](https://example.com)

```

---

## Blog Posts

**blog/2024-01-01-hello.md:**

```markdown
---
slug: my-first-post
title: My First Post
authors:
  name: John Doe
  title: Author
  url: https://github.com/johndoe
  image_url: https://github.com/johndoe.png
tags: [hello, world]
---

This is my first blog post!

<!-- truncate -->

More content here...
```

**blog/authors.yml:**

```yaml
johndoe:
  name: John Doe
  title: Author
  url: https://github.com/johndoe
  image_url: https://github.com/johndoe.png
```

---

## Deployment

### GitHub Pages

**docusaurus.config.js:**

```javascript
module.exports = {
  url: 'https://yourusername.github.io',
  baseUrl: '/my-project/',
  organizationName: 'yourusername',
  projectName: 'my-project',
};
```

```bash
npm run deploy
```

### Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `build`

### Docker

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve stage
FROM node:18

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  docusaurus:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm start

  # For production build
  docusaurus-prod:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

**Development with Docker:**

```bash
docker-compose up docusaurus
# Visit http://localhost:3000
```

**Production with Docker:**

```bash
docker-compose up docusaurus-prod
# Visit http://localhost:3000
```

**Build and push image:**

```bash
docker build -t my-docs:latest .
docker tag my-docs:latest myregistry/my-docs:latest
docker push myregistry/my-docs:latest

# Run on production server
docker run -p 3000:3000 myregistry/my-docs:latest
```

---

## Advanced Features

### Versioning

```bash
# Create new version (from docs/)
npm run docusaurus docs:version 1.0
```

### Internationalization (i18n)

```bash
# Initialize i18n
npm run write-translations -- --locale es
npm run write-translations -- --locale fr
```

### Search

Built-in Algolia search:

```javascript
// docusaurus.config.js
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'your_index_name',
  },
}
```

---

## Best For

- ✅ Complex documentation
- ✅ Need versioning
- ✅ Multi-language support
- ✅ Advanced customization
- ✅ React component integration

---

## Pros ✅

- Full React power
- Versioning built-in
- i18n support
- Beautiful defaults
- MDX for components
- Great performance

---

## Cons ❌

- Steeper learning curve
- Requires Node.js
- More complex setup
- Larger bundle size

---

## Quick Checklist

- ✅ Install Docusaurus
- ✅ Configure docusaurus.config.js
- ✅ Setup sidebars.js
- ✅ Write markdown/MDX docs
- ✅ Add blog posts
- ✅ Test locally (`npm start`)
- ✅ Deploy to GitHub Pages (`npm run deploy`)
- ✅ Optional: Setup Docker for consistency
