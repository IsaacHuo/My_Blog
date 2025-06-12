---
title: VitePress 搭建个人博客指南
date: 2024-01-16
tags: [VitePress, 博客搭建, Vue]
description: VitePress 是一个基于 Vue 的静态网站生成器，非常适合搭建个人博客和文档网站。本文详细介绍了如何使用 VitePress 搭建个人博客。
---

# VitePress 搭建个人博客指南

VitePress 是一个基于 Vue 的静态网站生成器，专为编写文档而生，同时也非常适合搭建个人博客。本文将详细介绍如何使用 VitePress 搭建一个现代化的个人博客。

## 什么是 VitePress？

VitePress 是 VuePress 的下一代版本，具有以下特点：

- 🚀 **极快的开发体验**：基于 Vite 的快速热重载
- 📱 **响应式设计**：在所有设备上都有良好的阅读体验
- 🎨 **可定制主题**：支持自定义主题和样式
- 🔍 **内置搜索**：本地搜索功能
- ⚡ **静态生成**：输出静态 HTML，易于部署

## 项目初始化

### 1. 安装 VitePress

```bash
# 创建项目目录
mkdir my-blog
cd my-blog

# 初始化 package.json
npm init -y

# 安装 VitePress
npm install --save-dev vitepress
```

### 2. 项目结构

创建以下目录结构：

```
my-blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   │       ├── index.ts
│   │       └── custom.css
│   ├── posts/
│   │   ├── index.md
│   │   └── first-post.md
│   ├── about.md
│   └── index.md
└── package.json
```

## 配置文件

### VitePress 配置

在 `docs/.vitepress/config.ts` 中配置网站信息：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "我的博客",
  description: "分享技术与生活",
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username' }
    ]
  }
})
```

### 自定义主题

在 `docs/.vitepress/theme/index.ts` 中导入自定义样式：

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

## 部署到 GitHub Pages

### 1. GitHub Actions 配置

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with VitePress
        run: npm run docs:build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
```

### 2. 启用 GitHub Pages

1. 进入仓库设置页面
2. 找到 "Pages" 选项
3. 选择 "GitHub Actions" 作为部署源

## 写作技巧

### Markdown 扩展

VitePress 支持丰富的 Markdown 扩展：

```markdown
::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::
```

### Front Matter

在每篇文章开头添加元数据：

```yaml
---
title: 文章标题
date: 2024-01-16
tags: [标签1, 标签2]
description: 文章描述
---
```

## 性能优化

### 1. 图片优化
- 使用 WebP 格式
- 适当压缩图片大小
- 使用 CDN 加速

### 2. 代码分割
VitePress 会自动进行代码分割，确保快速加载。

### 3. SEO 优化
- 设置合适的 meta 标签
- 使用语义化的 HTML 结构
- 添加网站地图

## 常见问题

### Q: 如何添加评论系统？
A: 可以集成 Giscus、Gitalk 等基于 GitHub 的评论系统。

### Q: 如何自定义主题样式？
A: 通过修改 `custom.css` 文件来自定义样式。

### Q: 如何添加谷歌统计？
A: 在 `config.ts` 的 `head` 配置中添加统计代码。

## 总结

VitePress 是一个优秀的静态博客生成器，具有以下优势：

- ✅ 开发体验优秀
- ✅ 性能表现出色
- ✅ 部署简单便捷
- ✅ 生态丰富完善

希望这篇指南能帮助你快速搭建自己的博客！

---

*发布日期：2024年1月16日*
