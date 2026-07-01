---
title: "Poemery：离线诗词阅读 iOS App"
date: 2026-06-28
author: 霍玮放
description: "面向中文诗词阅读的原生 iOS App，使用 SwiftUI、本地诗词库和 Apple Music 式信息架构组织离线阅读体验。"
editLink: true
outline: [2, 3]
---

# Poemery：离线诗词阅读 iOS App

Poemery 是我开发的原生 iOS 诗词阅读应用。它把唐诗、宋词、元曲和先秦经典整理为可浏览、可搜索、可收藏的本地诗词库，用更接近现代内容产品的信息架构承载传统文本。

## 产品定位

Poemery 的目标是做一个轻量、离线、专注阅读的诗词 App。它不依赖账号、订阅或云端同步，核心内容随 App Bundle 打包，用户可以在本机完成浏览、搜索、收藏和最近阅读。

界面设计参考 Apple Music 的内容组织方式：主页推荐、诗单合集、资料库、独立搜索入口和当前阅读条共同组成主导航。但内容语义完全围绕诗词展开，作品称为“诗词”，集合称为“诗单”，个人区承载本地阅读档案。

## 内容与数据

当前版本从开源 `chinese-poetry/chinese-poetry` 数据集中导入内容，并固定上游 commit 以保证数据可复现。App 内置约 12000 条诗词作品、26 个诗单合集和 13 个浏览分类，覆盖唐诗三百首、宋词三百首、元曲、论语、诗经和四书五经等来源。

导入脚本负责清洗标题、作者和正文，生成稳定作品 ID，补充标签、来源链接和本地封面样式，并在构建前校验作品 ID、诗单引用和分类命中情况。

## 技术实现

Poemery 使用 SwiftUI 构建，最低支持 iOS 17。iOS 26 上优先使用系统 Liquid Glass、底部附件和搜索 Tab 能力；旧系统通过 `TabView`、`safeAreaInset` 和 material fallback 保持稳定体验。

数据层由本地 JSON seed 驱动，运行时加载到 `PoemLibraryStore` 中，提供作品索引、诗单、作者聚合和全文搜索。收藏和最近阅读使用 `UserDefaults` 保存，只记录作品 ID，显示时再映射回本地诗词库。

## 工程收获

这个项目让我把一个内容型 App 拆成了更清晰的产品系统：数据导入、离线内容建模、搜索、阅读状态、系统级导航和跨系统版本的视觉适配。相比简单展示文本，Poemery 更关注如何让传统内容在现代 iOS 体验中保持可读、可找、可继续阅读。

## 链接

- **GitHub 仓库**：[IsaacHuo/poem](https://github.com/IsaacHuo/poem)
