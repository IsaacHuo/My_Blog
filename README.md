# Isaac Huo's Blog

一个基于 VitePress 构建的双语个人博客，支持中英文切换，响应式设计，专注于技术分享和个人思考。

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装与运行
```bash
# 克隆项目
git clone <repository-url>
cd My_Blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## ✨ 主要功能

### 🌐 双语支持
- 中英文无缝切换
- 独立的语言路由系统
- 语言特定的内容展示

### 📱 响应式设计
- 移动端优化的汉堡菜单
- 自适应布局设计
- 多分辨率兼容

### 📝 内容管理
- **博客文章**: 技术分享和个人思考
- **书籍推荐**: 精选书单和阅读笔记
- **清单100**: 个人目标和成就记录

### 🎨 用户体验
- 现代化UI设计
- 平滑过渡动画
- 深色/浅色主题适配

## 📁 项目结构

```
My_Blog/
├── .vitepress/          # VitePress 配置
│   ├── config.ts         # 站点配置
│   └── theme/            # 自定义主题
├── blog/                 # 英文博客文章
├── zh/                   # 中文内容
│   ├── blog/             # 中文博客文章
│   ├── books/            # 中文书籍页面
│   └── list100/          # 中文清单页面
├── books/                # 英文书籍页面
├── list-100/             # 英文清单页面
└── public/               # 静态资源
```

## 🛠️ 使用方法

### 添加新文章
1. 在 `blog/` (英文) 或 `zh/blog/` (中文) 目录下创建 `.md` 文件
2. 使用 Markdown 格式编写内容
3. 在文件头部添加 frontmatter 配置

### 自定义样式
- 编辑 `.vitepress/theme/custom.css` 修改样式
- 在 `.vitepress/theme/components/` 中添加自定义组件

### 部署
项目支持 GitHub Pages 自动部署，推送到主分支即可触发构建。

## 🔧 技术栈
- **框架**: VitePress
- **语言**: TypeScript, Vue 3
- **样式**: CSS3
- **部署**: GitHub Pages

## 📄 许可证
MIT License

> 基于 VitePress 构建的个人博客，分享技术、生活与思考

[![Deploy](https://github.com/IsaacHuo/My_Blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/IsaacHuo/My_Blog/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🚀 基于 VitePress 的静态站点生成
- 📱 响应式设计，完美适配桌面端和移动端
- 🔍 内置全文搜索功能
- 🏷️ 文章分类和标签管理
- ⚡ GitHub Actions 自动化部署

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/IsaacHuo/My_Blog.git
cd My_Blog

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建静态文件
npm run docs:build
```

## 📝 写作指南

在 `docs/blog/` 目录下创建新的 `.md` 文件，添加 frontmatter：

```markdown
---
title: 文章标题
date: 2024-01-17
tags: [标签1, 标签2]
description: 文章简短描述
---

文章内容...
```

##  许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。

## 📞 联系

- **GitHub**: [@IsaacHuo](https://github.com/IsaacHuo)
- **博客**: [Isaac Huo's Blog](https://isaachuo.github.io/My_Blog/)
