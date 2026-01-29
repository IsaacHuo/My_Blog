---
title: Yarn: 曾经的速度之王与创新者
date: 2026-01-29
author: 霍玮放
description: yarn, npm, package-manager
---

在 2016 年之前，npm (v2/v3) 占据着绝对的统治地位，但它的性能问题和非确定性安装让开发者苦不堪言。这时，Facebook（现 Meta）联合 Google、Exponent 和 Tilde 推出了 **Yarn**，彻底改变了前端包管理的格局。

## 1. 为什么 Yarn 会诞生？

早期的 npm 存在几个核心痛点：
*   **速度慢**：串行下载，没有充分利用网络带宽。
*   **不确定性**：依赖版本锁定机制不完善（shrinkwrap 很难用），导致“在我的机器上能跑，在你的机器上跑不了”。
*   **不能离线**：即使下载过，没网的时候还是装不了。

Yarn 的出现就是为了解决这些问题。

## 2. Yarn 的核心贡献

Yarn 为 JavaScript 生态引入了许多现在被视为“标准”的功能，实际上很多我们今天在 npm 享受到的特性，最初都是 Yarn 发明的。

### lock 文件的普及 (`yarn.lock`)
Yarn 引入了 `yarn.lock` 文件，强制锁定了每一个依赖的具体版本。这保证了无论何时何地安装，得到的 `node_modules` 结构都是完全一致的。这就是为什么现在的 npm 也有了 `package-lock.json`。

### 极致的速度
Yarn 引入了并行下载和更极致的缓存机制。它会在你第一次安装包时将其缓存下来，下次安装时无需联网，直接从缓存复制，也就是“离线模式”。

### Workspaces
Yarn 是最早原生支持 Monorepo（单体仓库）工作流的包管理器之一。通过 `workspaces` 配置，开发者可以轻松地在一个代码仓库中管理多个 package，并在通过软链在本地相互引用，方便了大型项目的开发。

## 3. Yarn v1 (Classic) vs Yarn v2+ (Berry)

Yarn 在发展过程中经历了一次巨大的断代升级。

*   **Yarn v1 (Classic)**：最经典的版本，兼容性最好，使用最广泛。它的逻辑和 npm 比较像，依然生成 `node_modules`。
*   **Yarn v2+ (Berry)**：一次彻底的重写。它引入了 **PnP (Plug'n'Play)** 模式，试图完全消灭 `node_modules` 文件夹。
    *   **PnP 原理**：不再把文件拷贝到 `node_modules`，而是生成一个 `.pnp.cjs` 文件，告诉 Node.js 去哪里（通常是全局缓存 zip 包）加载模块。
    *   **现状**：虽然理念先进（零安装、极速启动），但因为破坏了 Node.js 原有的模块解析潜规则，导致很多工具链不兼容。但现在的 Berry 版本也支持 `node-linker: node-modules` 用于回退到传统模式。

