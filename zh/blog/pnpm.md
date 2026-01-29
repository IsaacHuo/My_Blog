---
title: "pnpm: 高效、节省磁盘空间的包管理器"
date: 2026-01-29
author: 霍玮放
description: pnpm, nodejs, efficiency
---

如果说 Yarn 是为了解决 npm 的慢和不确定性，那么 **pnpm (Performant npm)** 的诞生则是为了解决 `node_modules` 这一“黑洞”对磁盘空间的吞噬，以及依赖管理的正确性问题。

## 1. 核心原理：硬链接与符号链接

传统 npm/Yarn 的扁平化结构虽然解决了嵌套过深的问题，但依然有两个大问题：
1.  **幽灵依赖 (Phantom Dependencies)**：你可以 require 一个你在 `package.json` 里根本没声明的包（因为它被你的依赖提升到了顶层）。
2.  **磁盘浪费**：如果你有 100 个项目都用了 `lodash`，你的电脑上就会存 100 份 `lodash` 的副本。

pnpm 使用了一种**内容寻址存储 (Content-addressable store)** 的策略来解决这些问题。

### 全局存储 Store
pnpm 在磁盘上有一个全局的存储区（通常在 `~/.local/share/pnpm/store`）。所有项目下载的包都存放在这里。

### 硬链接 (Hard Links)
当你在项目中安装 `lodash` 时，pnpm 不会复制文件，而是从全局 Store 创建一个**硬链接**到你的项目的 `node_modules/.pnpm` 目录。这意味着 100 个项目用 `lodash`，磁盘上实际上只有一份物理文件。这极大地节省了空间。

### 符号链接 (Symbolic Links)
你的项目的根 `node_modules` 里，不会直接存放包的文件，而是存放指向 `.pnpm` 目录下对应版本的**符号链接**。
且 pnpm **不进行扁平化**（默认情况下）。只有你在 `package.json` 里声明了的包，才会出现在根 `node_modules` 中。这完美解决了幽灵依赖问题——没声明就用不了。

## 2. 为什么选 pnpm？

*   **极速安装**：因为它只需要创建链接，几乎不需要复制文件 I/O，速度通常比 npm 和 Yarn 都要快。
*   **节省空间**：对于拥有几十上百个微服务或 demo 项目的开发者来说，能省下几十 GB 的 SSD 空间。
*   **严格性**：它强制你书写规范的依赖声明，避免代码在生产环境中因为缺失隐式依赖而崩溃。
*   **Monorepo 支持**：pnpm 的 workspace 支持非常优秀，且天然适合大仓项目。

## 总结

pnpm 是目前增长最快的包管理器之一。Vue 3、Vite 等大量知名开源项目都已经迁移到了 pnpm。如果你苦恼于 `node_modules` 占满了你的硬盘，或者受够了幽灵依赖带来的莫名其妙的 bug，pnpm 是你最好的选择。
