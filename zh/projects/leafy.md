---
title: "MyLeafy：通用型校园 iOS 应用"
date: 2026-07-01
author: 霍玮放
description: "通用型校园 iOS 应用，首个上线校园为北京林业大学，以课表为核心整合教务数据、社区、评教和校园工具。"
editLink: true
outline: [2, 3]
---

# MyLeafy：通用型校园 iOS 应用

MyLeafy 是我开发的通用型校园 iOS 应用。项目的内部代码名、target 和部分类型命名仍沿用 `Leafy`，但产品展示名已经更新为 MyLeafy。当前首个上线校园是北京林业大学，教务连接器直连北林强智教务系统。

<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: flex-start;">
  <img src="/project-images/myleafy/calendar.jpg" alt="MyLeafy 课表展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/grade.jpg" alt="MyLeafy 成绩展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/xuefen.jpg" alt="MyLeafy 学分展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/zongsu.jpg" alt="MyLeafy 综素测算展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/sharecal.jpg" alt="MyLeafy 共享课表展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/community.jpg" alt="MyLeafy 社区展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/color.jpg" alt="MyLeafy 主题色展示" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
</div>

## 项目定位

MyLeafy 的核心目标是把学生最常用的校园信息重新组织成更适合移动端的体验。App 以课表为入口，向外连接成绩、考试安排、教学培养、自习室、校历、社区、通知、反馈和评教等场景。

系统边界保持清晰：学号和学校教务系统仍是教务身份与数据来源；Supabase 承接社区资料、帖子、评论、点赞、通知、公告、反馈、教师评分和共享课表快照等非教务业务。

## 已实现能力

当前 App 以三个根 Tab 组织功能：

- **课表**：周视图、周次切换、课程详情、今日课程摘要、单日课程分享图和天气信息。
- **发现**：成绩、考试安排、教学培养、自习室、校历、社区、通知和评教。
- **我的**：社区资料、个人内容、收藏、共享课表、主题设置、反馈和退出登录。

教务侧已经实现学号、密码、验证码登录，显式 Cookie 会话管理，课表、成绩、考试、培养方案等页面的抓取与解析，并用 SwiftData 做本地缓存。课表链路保留 WKWebView 兜底，以应对教务页面跳转和结构变化。

社区侧基于 Supabase，包含匿名会话与学号绑定、profile 持久化、发帖、图片、评论、点赞、通知、公告、反馈、评教老师列表、星级评分和共享课表授权。

## 技术实现

MyLeafy 使用 SwiftUI 构建，部署目标是 iOS 17。本地持久化使用 SwiftData，学校网络请求基于 URLSession 和 HTTPCookieStorage，HTML 解析使用 SwiftSoup。非教务业务由 Supabase Auth、Database、Storage 和 Edge Functions 支撑。

项目还包含 React + Vite + TypeScript 的运营后台，用于社区指标、帖子、评论、用户、反馈、公告、教师和评分管理。高权限管理操作通过 Supabase Edge Functions 执行，避免直接把管理权限暴露给前端。

## 工程收获

这个项目让我更系统地处理了真实校园系统的复杂性：验证码登录、Cookie 会话、HTML 结构变动、移动端缓存、解析失败提示、社区数据权限和后台管理边界。它也让我从单个功能开发转向完整产品链路：从数据源、客户端体验、后端权限，到运营后台和 TestFlight 检查清单。

## 链接

- **GitHub 仓库**：[IsaacHuo/leafy](https://github.com/IsaacHuo/leafy)
