# Isaac Huo's Blog

> 基于 VitePress 构建的个人博客，分享技术、生活与思考

[![Deploy](https://github.com/IsaacHuo/My_Blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/IsaacHuo/My_Blog/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 在线访问

**网站地址**: [https://isaachuo.github.io/My_Blog/](https://isaachuo.github.io/My_Blog/)

## ✨ 特性

- 🚀 **快速加载** - 基于 VitePress 的静态站点生成
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔍 **本地搜索** - 内置全文搜索功能
- 🏷️ **标签系统** - 文章分类和标签管理
- 🎨 **自定义主题** - 优雅的视觉设计
- ⚡ **自动部署** - GitHub Actions 自动化部署
- 📝 **Markdown 支持** - 完整的 Markdown 语法支持
- 💻 **代码高亮** - 多语言代码语法高亮

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - Vue 驱动的静态站点生成器
- **语言**: TypeScript + Markdown
- **样式**: CSS3 + 自定义主题
- **部署**: GitHub Pages + GitHub Actions
- **版本控制**: Git

## 📁 项目结构

```
My_Blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自动部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress 配置
│   │   └── theme/              # 自定义主题
│   │       ├── custom.css      # 自定义样式
│   │       └── index.ts        # 主题入口
│   ├── posts/                  # 文章目录
│   │   ├── index.md            # 文章列表页
│   │   └── *.md               # 各篇文章
│   ├── tags/                   # 标签页面
│   ├── about.md               # 关于页面
│   ├── index.md               # 首页
│   └── public/                # 静态资源
├── package.json               # 项目配置
└── README.md                  # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm 或 yarn

### 本地开发

```bash
# 克隆项目
git clone https://github.com/IsaacHuo/My_Blog.git
cd My_Blog

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:5173/My_Blog/
```

### 构建部署

```bash
# 构建静态文件
npm run docs:build

# 本地预览构建结果
npm run docs:preview
```

## 📝 写作指南

### 创建新文章

1. 在 `docs/posts/` 目录下创建新的 `.md` 文件
2. 添加 frontmatter 元信息：

```markdown
---
title: 文章标题
date: 2024-01-17
tags:
  - 标签1
  - 标签2
description: 文章简短描述
---

# 文章内容

这里是正文内容...
```

3. 更新 `docs/index.md` 和 `docs/posts/index.md` 中的文章列表
4. 提交代码，自动部署生效

### Markdown 扩展

- ✅ 标准 Markdown 语法
- ✅ 代码块语法高亮
- ✅ 数学公式支持
- ✅ 自定义容器
- ✅ 表格和列表
- ✅ 图片和链接

## 🔧 配置说明

### 站点配置

主要配置文件：`docs/.vitepress/config.ts`

```typescript
export default defineConfig({
  title: "Isaac Huo's Blog",
  description: "分享技术、生活与思考",
  base: '/My_Blog/',
  // 更多配置...
})
```

### 主题定制

自定义样式：`docs/.vitepress/theme/custom.css`

- 颜色主题
- 字体设置
- 布局样式
- 响应式设计

## 🚀 部署

### 自动部署

项目配置了 GitHub Actions 自动部署：

- **触发条件**: 推送到 `main` 分支
- **部署平台**: GitHub Pages
- **构建环境**: Ubuntu + Node.js 18
- **部署流程**: 自动构建 → 上传构件 → 部署到 Pages

### 手动部署

```bash
# 构建项目
npm run docs:build

# 部署到 GitHub Pages
# 构建文件位于 docs/.vitepress/dist/
```

## 📊 功能特性

### 已实现

- [x] 响应式设计
- [x] 文章管理系统
- [x] 标签分类
- [x] 本地搜索
- [x] 代码高亮
- [x] 自动部署
- [x] SEO 优化
- [x] 深色模式支持

### 计划中

- [ ] 评论系统
- [ ] 文章阅读统计
- [ ] RSS 订阅
- [ ] 多语言支持
- [ ] 文章归档页面

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。

## 📞 联系方式

- **GitHub**: [@IsaacHuo](https://github.com/IsaacHuo)
- **博客**: [Isaac Huo's Blog](https://isaachuo.github.io/My_Blog/)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
