# Isaac Huo's Blog

A bilingual personal blog built with VitePress, featuring dual language support (Chinese/English), responsive design, and integrated project documentation.

## Quick Start

### Requirements
- Node.js 16 or higher
- npm or yarn

### Installation and Development
```bash
# Clone repository
git clone https://github.com/IsaacHuo/My_Blog.git
cd My_Blog

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

### Bilingual Support
- Seamless Chinese/English language switching
- Separate content for each language
- Language-aware routing and navigation

### Content Sections
- **Blog**: Technical articles and personal insights
- **Projects**: Project portfolio with PDF documentation
- **List 100**: Personal goals and achievements tracking

### Technical Features
- Static site generation with VitePress
- Responsive design for desktop and mobile
- Integrated Giscus comments system (GitHub Discussions)
- Table of contents for articles
- ESLint integration for code quality

### Deployment
- Optimized for Cloudflare Pages deployment
- Automatic building and deployment on git push
- Zero-configuration deployment

## Project Structure

```
My_Blog/
├── .vitepress/
│   ├── config.ts                    # Site configuration
│   └── theme/
│       ├── components/              # Vue components
│       │   ├── ArticleLayout.vue    # Article layout with TOC
│       │   ├── ProjectsPage.vue     # Projects page
│       │   ├── Comments.vue         # Giscus comments
│       │   ├── HomePage.vue         # Homepage
│       │   └── [other components]
│       ├── custom.css               # Custom styles
│       └── index.ts                 # Theme entry point
├── en/                              # English content
│   ├── blog/                        # English blog articles
│   ├── list100/                     # English goals list
│   └── projects/                    # English projects page
├── zh/                              # Chinese content
│   ├── blog/                        # Chinese blog articles
│   ├── list100/                     # Chinese goals list
│   └── projects/                    # Chinese projects page
├── public/
│   ├── projects_pdf/                # Project PDF files
│   └── project-images/              # Project preview images
└── projects_pdf/                    # PDF resources (Giscus support)
```

## Content Management

### Adding Blog Articles

Create a new Markdown file in `en/blog/` or `zh/blog/` with frontmatter:

```markdown
---
layout: ArticleLayout
title: Article Title
date: 2024-11-24
tags: [tag1, tag2]
---

Article content...
```

### Adding Projects

Update the project configuration in `en/projects/index.md` or `zh/projects/index.md`:

```yaml
---
layout: ProjectsPage
title: Projects
thoughts:
  - title: Project Name
    url: /projects_pdf/filename.pdf
    image: /project-images/preview.jpeg
---
```

## Comments System

This blog uses Giscus for commenting, which stores comments as GitHub Discussions.

## Technology Stack

- **Framework**: VitePress 1.6.3
- **Language**: TypeScript, Vue 3
- **Styling**: CSS 3
- **Linting**: ESLint with Vue/TypeScript support
- **Comments**: Giscus (GitHub Discussions)
- **Deployment**: Cloudflare Pages

## Configuration

### Language Settings
- Default language: English
- Available languages: Chinese (zh-CN), English (en)
- Language switching in site navigation

### Build Configuration
- Base path: `/` (for Cloudflare Pages)
- Output directory: `.vitepress/dist`
- Public directory: `public/`

## Development

### Code Style
ESLint configuration enforces consistent code style. Run linting:

```bash
npx eslint .
```

### Customization
- Modify `.vitepress/theme/custom.css` for styling
- Add new components in `.vitepress/theme/components/`
- Update navigation and site config in `.vitepress/config.ts`

## License

MIT License

## Contact

- GitHub: [@IsaacHuo](https://github.com/IsaacHuo)
- Blog: [huoweifang.cn](https://huoweifang.cn)

---

Built with VitePress | Deployed on Cloudflare Pages
